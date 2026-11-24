---
title: Race condition
description: Two tasks update the same data and one update is lost, because a task can be stopped between reading a value and writing it back.
---

A **race condition** is a bug whose outcome depends on the exact timing of tasks or interrupt
handlers that share data. The classic case is a read-modify-write. `count++` looks like one step,
but the CPU loads `count`, adds one and stores it back, and a task can be
[preempted](/learn/preemption/) between any two of those:

```text
Task A                     Task B
r = count;        /* 5 */
      -- the tick wakes B, which is more urgent --
                           r = count;        /* 5 */
                           count = r + 1;    /* 6 */
count = r + 1;    /* 6 */
```

Two increments, and `count` went up by one. The bug needs a switch inside a window of a few
instructions, so it can pass every test and still fail in the field.

The cure is to make the read-modify-write indivisible for everything else that touches the data:

- A [critical section](/learn/glossary/critical-section/) masks interrupts, so nothing runs in
  between. It is needed when an interrupt handler shares the data, and must be very short.
- The [scheduler lock](/learn/glossary/scheduler-lock/) keeps other tasks off the CPU but lets
  interrupts run. It is enough when only tasks share the data.
- A [mutex](/learn/glossary/mutex/) keeps out only the tasks that take the same mutex. It is the
  usual choice for longer work.

In **FreeRTOS** the calls are `taskENTER_CRITICAL()`, `vTaskSuspendAll()` and `xSemaphoreTake()`
on a mutex; in **Zephyr**, `k_spin_lock()`, `k_sched_lock()` and `k_mutex_lock()`. For a single
counter both have atomic operations: `Atomic_Increment_u32()` and `atomic_inc()`.

Two details that surprise people:

- **`volatile` does not help.** The compiler then loads and stores the variable every time, but the
  load, add and store are still three instructions.
- **A mutex cannot guard data an interrupt shares.** A handler cannot wait for one; only a critical
  section keeps it out.

The simulator does not model data, so a race never shows in it.
[Main loop vs RTOS](/learn/basics/superloop-vs-rtos/#what-the-kernel-costs) explains why
preemption brings the problem.
