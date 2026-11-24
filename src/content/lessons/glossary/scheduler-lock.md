---
title: Scheduler lock
description: Keeping the running task on the CPU without masking interrupts, so it can work on shared data that only tasks use.
---

A **scheduler lock** stops the kernel from switching to another task, while interrupts keep
running. It sits between a [critical section](/learn/glossary/critical-section/), which masks
interrupts, and a [mutex](/learn/glossary/mutex/), which only keeps out the tasks that ask for it.

In **FreeRTOS** the calls are `vTaskSuspendAll()` and `xTaskResumeAll()`. Suspending only
increments `uxSchedulerSuspended`. While it is not 0:

- the [tick](/learn/glossary/tick/) interrupt still fires, but does not process the tick: it adds
  one to `xPendedTicks`;
- a task that an interrupt makes ready is put on `xPendingReadyList`, not in its
  [ready list](/learn/glossary/ready-list/);
- a switch that is asked for is remembered, not done.

`xTaskResumeAll()` then moves the pending tasks to their ready lists, replays the pended ticks and
switches if a more urgent task is ready. A task must not block while it holds the lock.

In **Zephyr** the calls are `k_sched_lock()` and `k_sched_unlock()`. They make the running thread
temporarily cooperative: `base.sched_locked` is decremented, and the scheduler treats the thread like
a [cooperative thread](/learn/zephyr/cooperative-threads/). Unlike FreeRTOS, a Zephyr thread may
sleep while it holds the lock; it is still non-preemptible when it runs again. `k_sched_unlock()` is
a reschedule point.

Two details that surprise people:

- **The simulator uses one at start-up.** Zephyr's main thread starts every static thread in
  `z_init_static_threads()` between `k_sched_lock()` and `k_sched_unlock()`, so none of them runs
  before all have started. The unlock is the first moment one can.
- **It is not a lock on data.** Interrupts still run, so data an interrupt handler touches needs a
  critical section as well, or a [race condition](/learn/glossary/race-condition/) remains.
