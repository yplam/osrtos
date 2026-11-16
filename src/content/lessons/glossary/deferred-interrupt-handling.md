---
title: Deferred interrupt handling
description: Splitting interrupt work into a short handler that signals and a task that does the rest, at a priority of the designer's choosing.
---

**Deferred interrupt handling** splits the work caused by an interrupt in two:

1. The [ISR](/learn/glossary/isr/) does only what cannot wait: read the data register before the
   next byte overwrites it, clear the interrupt flag, and **signal a task**, usually by giving a
   [semaphore](/learn/glossary/semaphore/) or sending to a queue.
2. A task, blocked on that semaphore, wakes and does the rest: parse the message, update state,
   talk to other tasks.

The ISR stays short, so other interrupts are not held up. The task runs at a
[priority](/learn/glossary/priority/) chosen for the work, can be preempted by more urgent tasks,
and can use any kernel call, including ones that block.

Two things must be right for it to work:

- **The task must be urgent enough.** If a more urgent task keeps the CPU, the handling task does
  not run, however quickly the ISR signalled it.
- **The signal must not lose events.** A binary semaphore remembers one: if the interrupt fires
  twice before the task takes it, the task sees one event. A counting semaphore or a queue keeps
  them all.

The [interrupts lesson](/learn/interrupts/) shows both. Zephyr also offers work queues
(`k_work_submit()` from the ISR), which run the deferred work in a kernel thread without a semaphore
of your own; FreeRTOS's `xTimerPendFunctionCallFromISR()` does the same through the timer service
task.
