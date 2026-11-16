---
title: The context switch in FreeRTOS
description: How FreeRTOS on a Cortex-M3 saves one task's registers, picks the next task and restores its registers, in the PendSV handler.
order: 2
scenario: preemption
rtos: freertos
keyStep: { event: ContextSwitch, nth: 3 }
---

A [context switch](/learn/glossary/context-switch/) stops one task and resumes another exactly where
it left off. This page reads how FreeRTOS does it on an ARM Cortex-M3, the port the simulator models
and runs under QEMU. It assumes you know that every task has its own stack and
[task control block](/learn/glossary/task-control-block/); if not, start with
[tasks and stacks](/learn/basics/tasks-and-stacks/).

The scenario: `Low` (priority 1) computes for eight ticks. `High` (priority 2) first sleeps for
three ticks, then computes for two and ends. That gives three switches worth reading: one a task
asks for, one an interrupt causes, and one at the end of a task.

## Two ways in, one way through

There are two reasons to switch:

- **The running task cannot go on.** It delays, waits for a semaphore, or deletes itself. The
  kernel function it called ends with a yield.
- **An interrupt made a more urgent task ready.** For the tick, `xTaskIncrementTick()` returns
  `pdTRUE`.

Both end the same way. Neither switches directly; both *request* the PendSV exception. A yield
from a task is the `portYIELD()` macro:

```kernel freertos:portable/GCC/ARM_CM3/portmacro.h#portYIELD
```

It writes one bit, `PENDSVSET`, into the interrupt controller. The tick handler writes the same
bit. PendSV is configured at the lowest interrupt priority, so it runs when nothing more urgent is
executing: immediately after a yield from a task, or as soon as the tick handler returns (the
processor chains straight into it without returning to the task first). Doing every switch in one
place, at the lowest priority, means a switch never happens in the middle of another interrupt
handler.

## PendSV

```kernel freertos:portable/GCC/ARM_CM3/port.c#xPortPendSVHandler
```

It is written in assembly because it must touch registers that C code cannot control. Before the
first instruction runs, the hardware has already done part of the job. On exception entry the
Cortex-M3 pushes eight registers onto the stack the task was using (the process stack, PSP):
`r0`–`r3`, `r12`, the link register, the program counter and the status register. Those are the
registers a C function may change freely; the hardware saves them so that an interrupt handler can
be ordinary C.

The handler then:

1. **Reads the task's stack pointer** (`mrs r0, psp`).
2. **Saves the rest**: `stmdb r0!, {r4-r11}` pushes the eight remaining registers onto the same
   stack. The task's whole state is now on its own stack: sixteen words.
3. **Records where it stopped**: `str r0, [r2]` stores the new stack pointer in the first field of
   the current TCB, `pxTopOfStack`. That field must be first in the structure, precisely so this
   one instruction can find it.
4. **Picks the next task**: with interrupts that may call the kernel masked (`basepri`), it calls
   `vTaskSwitchContext()`, which changes `pxCurrentTCB`. See
   [choosing the next task](/learn/freertos/choosing-the-next-task/).
5. **Restores the other task**: it loads `pxTopOfStack` from the *new* `pxCurrentTCB`, pops
   `r4`–`r11` from that stack and sets PSP to what remains.
6. **Returns** with `bx r14`. The return from the exception makes the hardware pop the other eight
   registers, including the program counter, so the new task continues from the instruction where
   it was stopped.

The simulator collapses the register saving into two steps, shown at the lines where something you
can see changes: the call to `vTaskSwitchContext()` (step 4) and the `msr psp, r0` that makes the
new task's stack current (step 5). The **ContextSwitch** event is on the second one. In between,
the Kernel tab shows `vTaskSwitchContext()` and the search for the next task.

## A task asks for it

[At tick 0](#sim:event=ContextSwitch:2), `High` calls `vTaskDelay(3)`. `vTaskDelay()` moves it to
the delayed list and ends with `taskYIELD_WITHIN_API()`, which on this port is `portYIELD()`. PendSV
runs at once: `High`'s registers are saved on `High`'s stack, the search finds `Low`, and `Low`'s
registers are restored. `Low` has never run before, so where do its registers come from? When
`xTaskCreate()` made the task, it built a fake saved frame at the top of its new stack, with the
program counter set to the task's function. The first switch to a task "restores" that frame.

## An interrupt asks for it

[At tick 3](#sim:event=Unblock:1), the SysTick handler calls `xTaskIncrementTick()`, which finds
`High`'s wake-up time reached, moves it to the ready list and sees that it is more urgent than `Low`.
The function returns `pdTRUE`, and the handler pends PendSV with the same register write as
`portYIELD()`.

[When SysTick returns](#sim:event=ContextSwitch:3), PendSV runs. This time the registers it saves
are `Low`'s, in the middle of its computation; `Low` did nothing to deserve it, which is what
[preemption](/learn/preemption/) means. `High` continues inside `vTaskDelay()`, right after its
yield, and returns to its own code. Notice that `vTaskDelay()` did not return at tick 0: from
`High`'s point of view the call simply took three ticks.

## A task that ends

[At tick 5](#sim:event=TaskEnd:1), `High` has finished and calls `vTaskDelete( NULL )`. The function
moves it to `xTasksWaitingTermination` and yields like `vTaskDelay()` did. PendSV saves `High`'s
registers one last time, onto a stack that nobody will ever restore. The task cannot free that
stack itself, because it is still running on it; the
[idle task](/learn/glossary/idle-task/) frees it later.

## What a switch costs

On a Cortex-M3 a switch is a few dozen instructions plus the search in `vTaskSwitchContext()`: two
exception entries and exits, sixteen words copied each way. Nothing in it depends on how many
tasks exist, except the search, and with the generic selection that search is bounded by the number
of priorities (here five). That is why an RTOS can switch tasks thousands of times a second.

Zephyr does the same job very differently on the simulated board, where each thread is a host
thread: see [the context switch in Zephyr](/learn/zephyr/context-switch/).

## What to try

- Turn **Preemption** off (`configUSE_PREEMPTION 0`). At tick 3 `xTaskIncrementTick()` still
  wakes `High`, but the preemption check is not compiled in, so the function returns `pdFALSE` and
  nothing pends PendSV. `High` waits until `Low` ends at tick 8 and its `vTaskDelete()` yields.
- Set the step level to **Event** and step through: every stop with a **ContextSwitch** is the
  `msr psp, r0` line of the PendSV handler.
