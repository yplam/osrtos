---
title: The tick and vTaskDelay in FreeRTOS
description: How vTaskDelay puts a task in a delayed list and how xTaskIncrementTick wakes it, line by line in the FreeRTOS source.
order: 1
scenario: blocking-idle
rtos: freertos
keyStep: { event: Unblock, nth: 1 }
---

This page follows a delay through the FreeRTOS source: what `vTaskDelay()` does when a task asks to
sleep, and what the [tick](/learn/glossary/tick/) interrupt does to wake it. The
[scheduling lesson](/learn/scheduling/) explains the idea; here we read the code. In the simulator
above, set the step level to **Line** and open the **Kernel** tab of the code panel.

The scenario has two tasks. `Sensor` (priority 2) works for one tick and calls `vTaskDelay(4)`, twice.
`Logger` (priority 1) works for two ticks, calls `vTaskDelay(6)`, and works for two more.

## vTaskDelay: leave the ready list

```kernel freertos:tasks.c#vTaskDelay
```

The function is short because the work is done elsewhere. It suspends the scheduler with
`vTaskSuspendAll()`, calls `prvAddCurrentTaskToDelayedList()`, resumes the scheduler and then
yields, because the calling task is no longer ready and something else must run.

Suspending the scheduler is not the same as disabling interrupts. Interrupts still arrive, and the
tick interrupt still counts. But while `uxSchedulerSuspended` is not zero, `xTaskIncrementTick()`
only adds to `xPendedTicks` and leaves the lists alone, and no context switch happens.
`xTaskResumeAll()` processes the pended ticks afterwards. In the simulator a tick never arrives
inside a kernel call, so you will see `uxSchedulerSuspended` go to 1 and back to 0, but no pended
tick.

## Into the delayed list

```kernel freertos:tasks.c#prvAddCurrentTaskToDelayedList
```

[At tick 1](#sim:event=Block:1), `Sensor` calls `vTaskDelay(4)`. Reading the function from the top:

1. `uxListRemove()` takes the task out of its ready list. A task has one `xStateListItem`, which is
   in exactly one of the ready, delayed or suspended lists, so it must leave one before it joins
   another.
2. The wake-up time is the current tick count plus the delay: `xTimeToWake = 1 + 4 = 5`. It is
   stored as the list item's value.
3. `vListInsert()` puts the item into the [delayed list](/learn/glossary/delayed-list/), sorted by
   that value. The earliest wake-up is always at the head.
4. If this task now wakes earlier than any other, `xNextTaskUnblockTime` is set to its wake-up time.

`xNextTaskUnblockTime` is the reason a tick costs almost nothing when nothing is due. Watch it in
the variables under the kernel structures: it is `portMAX_DELAY` when no task sleeps, and 5 after
`Sensor`'s call.

The overflow branch is for a wake-up time that wraps past the largest tick value. FreeRTOS keeps
**two** delayed lists, `xDelayedTaskList1` and `xDelayedTaskList2`. `pxDelayedTaskList` points at
the one for the current lap of the tick counter, `pxOverflowDelayedTaskList` at the one for the
next lap. A sorted list cannot hold "tick 3 after the wrap" after "tick 4 billion before it", so
those go in the other list, and the two swap when the count reaches 0. The
[tick overflow walkthrough](/learn/freertos/tick-overflow/) shows the swap.

[At tick 3](#sim:event=Block:2), `Logger` delays for 6 and gets wake-up tick 9. It is inserted
behind `Sensor`, whose wake-up (5) is earlier. `xNextTaskUnblockTime` stays 5.

Notice what does *not* change when a task leaves its ready list: `uxTopReadyPriority`. With the
generic task selection used here, it is only an upper bound, "the highest priority that *may*
have a ready task". It is lowered lazily by the next search; see
[choosing the next task](/learn/freertos/choosing-the-next-task/).

## The tick interrupt

On the Cortex-M3 port the tick comes from the SysTick timer. Its handler is small:

```kernel freertos:portable/GCC/ARM_CM3/port.c#xPortSysTickHandler
```

It calls `xTaskIncrementTick()`, and if that returns `pdTRUE` it does not switch tasks itself: it
sets the PendSV pending bit, and the [context switch](/learn/freertos/context-switch/) happens in the
PendSV exception after this interrupt returns.

## xTaskIncrementTick

```kernel freertos:tasks.c#xTaskIncrementTick
```

The function, with the parts the configuration compiles out set aside:

1. **Count.** `xTickCount` becomes `xConstTickCount`, the old value plus one. If it wrapped to 0,
   `taskSWITCH_DELAYED_LISTS()` swaps the two delayed lists.
2. **Anything due?** `if( xConstTickCount >= xNextTaskUnblockTime )`. On most ticks the answer is
   no, and the delayed list is not even looked at. [Tick 2](#sim:tick=2) is such a tick: four lines
   and the handler returns.
3. **The unblocking loop.** It looks at the head of the delayed list. If the head is not due yet,
   its wake-up time becomes the new `xNextTaskUnblockTime` and the loop stops: the list is sorted,
   so nothing behind it can be due either. If the list is empty, `xNextTaskUnblockTime` goes back to
   `portMAX_DELAY`. Otherwise the head task is removed from the delayed list (and from an event
   list, if it was also waiting for a semaphore or a queue with a timeout), and
   `prvAddTaskToReadyList()` puts it at the end of the ready list for its priority.
4. **Preemption check.** If the woken task's priority is *higher* than the running task's,
   `xSwitchRequired` becomes `pdTRUE`. Equal is not enough here.
5. **Time-slice check.** If the running task's ready list holds more than one task,
   `xSwitchRequired` becomes `pdTRUE` so the next task of that priority gets a turn. This is
   [time slicing](/learn/time-slicing/), and it is checked on every tick.
6. **A yield left pending.** `xYieldPendings[ 0 ]` is set whenever the kernel wakes a task more
   urgent than the running one but does not switch at once: an interrupt handler that did not call
   `portYIELD_FROM_ISR()`, or a switch asked for while the scheduler was suspended. The tick
   honours it now. [The interrupts walkthrough](/learn/freertos/interrupts/) shows it happen.

[At tick 5](#sim:event=Unblock:1) all of it runs. The count reaches `xNextTaskUnblockTime`, the
loop removes `Sensor` and makes it ready, and because `Sensor` (2) is more urgent than the idle
task (0) a switch is requested. The loop goes round once more, finds `Logger` at the head with
wake-up tick 9, stores 9 in `xNextTaskUnblockTime` and stops. The handler pends PendSV and
`Sensor` runs, returning from `vTaskDelay()`.

## Why vTaskDelay(n) wakes at tick + n

The wake-up time is the tick count at the call plus `n`, and the task is woken by the tick
interrupt that makes the count equal to it. FreeRTOS counts tick *interrupts*, not time. If the
task calls `vTaskDelay(4)` just before a tick interrupt, the first of its four ticks comes almost
at once, so the delay lasts between three and four tick periods. Code that needs at least a
certain time must ask for one tick more.

In this simulator a task's work is counted in whole ticks, so every call is made right after a
tick interrupt and the delay is exactly `n` periods. On Zephyr the same program wakes one tick
later, because Zephyr adds the extra tick itself: see the
[Zephyr version of this page](/learn/zephyr/tick-and-delay/).

## What to try

- Step through [tick 9](#sim:event=Unblock:2): `Logger` wakes, and `Sensor`'s second wake-up (10)
  becomes `xNextTaskUnblockTime`.
- Give `Logger` an urgency of 3. It now runs first, delays at tick 2 until tick 8, and at tick 8
  the preemption check takes the CPU from `Sensor`, which is running. Every wake-up time after that
  moves.
