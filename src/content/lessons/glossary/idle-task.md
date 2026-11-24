---
title: Idle task
description: The lowest-priority task every kernel creates, which runs whenever no application task is ready.
---

The **idle task** (idle thread in Zephyr) is created by the kernel itself at the lowest priority. It
is always ready, so there is always something for the scheduler to pick, and it runs exactly when
no application task can.

It usually does two things:

- **Housekeeping.** In FreeRTOS, a task that deletes itself cannot free its own stack while it is
  still running on it. It is put on the list `xTasksWaitingTermination`, and the idle task frees it
  later. If the idle task never gets to run, that memory is never freed.
- **Saving power.** The idle task is where the CPU is put to sleep until the next interrupt, and
  with [tickless idle](/learn/glossary/tickless-idle/) for several ticks at a time.

Two things follow for the application. An application task that never blocks starves the idle
task, and every task below its own priority. And the share of time the idle task runs is a direct
measure of how much CPU capacity is left.

In FreeRTOS the idle task has priority 0, and with `configIDLE_SHOULD_YIELD` it gives way at once
to application tasks that share priority 0. In Zephyr the idle thread has the numerically highest,
least urgent, priority (15 in the simulated configuration).

The [scheduling lesson](/learn/scheduling/) has a run where the idle task fills the gaps while two
tasks sleep.
