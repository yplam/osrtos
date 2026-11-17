---
title: Timer service task
description: The task FreeRTOS creates to run every software timer callback and to process the commands that start and stop timers. Also called the timer daemon.
---

The **timer service task** (or *timer daemon*, named `Tmr Svc`) is a task that FreeRTOS creates
when the scheduler starts, if `configUSE_TIMERS` is 1. It runs at `configTIMER_TASK_PRIORITY`, with
a stack of `configTIMER_TASK_STACK_DEPTH`.

It owns every [software timer](/learn/glossary/software-timer/):

- It keeps the active timers in a list sorted by expiry time, and blocks until the first one is
  due, or until a command arrives, whichever comes first.
- It **runs every timer callback**, one after another, in its own context and at its own priority.
  A callback that blocks or runs long holds up all the others.
- Tasks never change a timer themselves: `xTimerStart()`, `xTimerStop()` and the rest send a
  **command** through a queue (`xTimerQueue`, `configTIMER_QUEUE_LENGTH` long), and the task carries
  it out when it runs. A command carries the time it was sent, so a late command still starts the
  period on time.
- It also runs functions that interrupt handlers defer to it with `xTimerPendFunctionCallFromISR()`,
  which is how `xEventGroupSetBitsFromISR()` sets bits outside the interrupt.

Its priority is a trade-off: high, and callbacks run on time but preempt the application's tasks;
low, and a busy task delays every callback and command. The
[software timers lesson](/learn/software-timers/) has it as a parameter, and the
[FreeRTOS walkthrough](/learn/freertos/software-timers/) follows its loop through `timers.c`.

Zephyr has no such task: a `k_timer` expiry function runs in the timer interrupt. Its *system work
queue* thread, with `k_work_schedule()`, plays a similar role for work that must run in a thread.
