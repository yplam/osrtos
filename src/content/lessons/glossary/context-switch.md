---
title: Context switch
description: Saving the CPU state of one task and restoring that of another, so each task continues as if it had never stopped.
---

A **context switch** is how a kernel changes which task the CPU executes. The kernel saves the
registers of the task that is running, chooses the next task, and restores the registers that task
had when it last stopped. The task continues with its next instruction and cannot tell it was
paused.

A switch is requested in two kinds of place:

- in a **kernel call** made by the running task, when the task blocks or makes a more urgent task
  ready;
- in an **interrupt**, most often the [tick](/learn/glossary/tick/), when it wakes a more urgent
  task. That case is [preemption](/learn/preemption/).

On ARM Cortex-M, the FreeRTOS port does the switch in the [PendSV](/learn/glossary/pendsv/) interrupt. Code that wants a
switch only sets PendSV pending. The handler, `xPortPendSVHandler`, runs once no other interrupt is
active: it pushes the registers on the outgoing task's stack, stores the stack pointer in its
[TCB](/learn/glossary/task-control-block/), calls `vTaskSwitchContext()` to choose `pxCurrentTCB`,
and pops the registers of the new task.

In Zephyr the switch is the architecture's `arch_swap()` (or `arch_switch()` on newer ports), called
from the scheduler once it has decided the current thread should not continue.

A context switch has a cost: tens to hundreds of CPU cycles for the registers, and more for the
caches the new task has to warm up again. That cost is the argument against very short
[time slices](/learn/time-slicing/).

In the simulator, the event log shows each switch as `A → B`, and you can break on **Context
switch**.
