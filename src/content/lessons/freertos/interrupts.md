---
title: Interrupts in FreeRTOS
description: How xSemaphoreGiveFromISR wakes a task without switching, how portYIELD_FROM_ISR asks for the switch, and what xYieldPending does when the handler does not ask.
order: 6
scenario: deferred-interrupt
rtos: freertos
keyStep: { event: Interrupt, nth: 1 }
---

This walkthrough follows one interrupt through the FreeRTOS source, from the handler's give to the
task switch after the interrupt returns. The [interrupts lesson](/learn/interrupts/) explains the
idea. Set the step level to **Line** and jump to [tick 3](#sim:event=Interrupt:1), where the `UART`
interrupt fires while `Main` runs and `Handler` waits for the semaphore `S`.

The handler in the application tab is three lines:

```c
void UART_IRQHandler( void )
{
    BaseType_t xHigherPriorityTaskWoken = pdFALSE;
    xSemaphoreGiveFromISR( S, &xHigherPriorityTaskWoken );
    portYIELD_FROM_ISR( xHigherPriorityTaskWoken );
}
```

## Why a separate API

A task that calls `xSemaphoreGive()` may be switched out inside the call, and may block if it waits
for space in a queue. An ISR can do neither: it is not a task, it runs on the interrupted task's
context, and nothing could resume it later. So every call an ISR may use has a `FromISR` twin that
never blocks and never switches. Instead it tells the caller whether a switch would be needed.

The interrupt's priority matters too. On a Cortex-M, FreeRTOS masks interrupts up to
`configMAX_SYSCALL_INTERRUPT_PRIORITY` while it changes its lists. An interrupt above that level is
never masked, so it must not call FreeRTOS at all; one at or below it may call the `FromISR`
functions. That is why the application sets the UART's priority to
`configLIBRARY_MAX_SYSCALL_INTERRUPT_PRIORITY` in `main()`.

## xQueueGiveFromISR

`xSemaphoreGiveFromISR()` is a macro for `xQueueGiveFromISR()`, the semaphore form of a queue send.

```kernel freertos:queue.c#xQueueGiveFromISR
```

1. `taskENTER_CRITICAL_FROM_ISR()` raises the interrupt mask. An ISR cannot suspend the scheduler,
   as `vTaskDelay()` does; masking interrupts is the only way to keep the lists still.
2. `S` is empty (`uxMessagesWaiting` is 0, and the length of a semaphore is 1), so there is room.
   The count becomes 1.
3. A task waits in `xTasksWaitingToReceive`, so `xTaskRemoveFromEventList()` wakes it.
4. It returns `pdTRUE` because the woken task is more urgent than the interrupted one, and the
   function stores `pdTRUE` in `*pxHigherPriorityTaskWoken`.

The `queueUNLOCKED` test is for a queue that a task is in the middle of using: the ISR then leaves
the lists alone and only counts the give in `cTxLock`, and the task processes it when it unlocks
the queue. In the simulator an interrupt never arrives inside a kernel call, so the queue is always
unlocked here.

```kernel freertos:tasks.c#xTaskRemoveFromEventList
```

Two things happen in `xTaskRemoveFromEventList()` that matter for interrupts. `Handler` goes back
into its ready list (the scheduler is not suspended, so it can go straight there instead of into
`xPendingReadyList`). And because it is more urgent than `pxCurrentTCB`, `xYieldPendings[ 0 ]` is
set to `pdTRUE`: the kernel itself remembers that a switch is due, whatever the ISR does next.

## portYIELD_FROM_ISR

```kernel freertos:portable/GCC/ARM_CM3/portmacro.h#portEND_SWITCHING_ISR
```

On the Cortex-M3 port, `portYIELD_FROM_ISR()` is `portEND_SWITCHING_ISR()`, and yielding only means
setting the PendSV exception pending. PendSV has the lowest priority of all, so it waits until the
tick interrupt and the UART handler have both returned. Then it runs
[the context switch](/learn/freertos/context-switch/): `vTaskSwitchContext()` picks `Handler`, and
`Handler` returns from the `xSemaphoreTake()` it was blocked in. It takes `S` as its retry loop goes
round, still at tick 3.

In this simulator the tick handler may have set PendSV pending too (to wake a delayed task or to
time-slice). There is still only one switch: PendSV runs once, after every interrupt has returned.

## When the handler does not yield

Turn **Yield from ISR** off and step through tick 3 again. Everything up to the end of
`xQueueGiveFromISR()` is the same: `Handler` is ready and `xYieldPending` is `pdTRUE` in the
variables. But the ISR returns without setting PendSV, and `Main` carries on.

The pending flag is not forgotten. Two places act on it:

- The next tick: `xTaskIncrementTick()` returns `pdTRUE` when `xYieldPendings[ 0 ]` is set, so the
  tick interrupt requests the switch. That is what happens [at tick 4](#sim:tick=4).
- The next time a task resumes the scheduler: `xTaskResumeAll()` switches at once when the flag is
  set. A task that calls `vTaskDelay()` right after such an interrupt is switched out inside
  `xTaskResumeAll()`, before `vTaskDelay()` gets to its own yield.

```kernel freertos:tasks.c#xTaskResumeAll
```

The cost is latency: up to one tick before the woken task runs. In this run it costs an interrupt
too. At tick 8 `Handler` is woken but not switched in; at tick 9 the next interrupt finds `S` still
given, and `xQueueGiveFromISR()` takes the `errQUEUE_FULL` branch. That event is lost.

Leaving out the yield is occasionally done on purpose, to batch several interrupts before the task
runs, but it is more often a bug: the woken task runs late, and nothing in the code says why.
