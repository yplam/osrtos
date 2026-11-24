---
title: Deadline
description: The time by which a job must be finished, counted from its release; why the kernel does not check it, and hard vs soft deadlines.
---

A **deadline** is the time by which a job must be done, usually counted from the moment the job is
released. A periodic task that samples a sensor every 5 ms might have to deliver each sample within
4 ms of the start of its [period](/learn/glossary/period/).

A **deadline miss** is a job that is not finished in time. Whether that matters depends on the
system:

- A **hard** deadline must never be missed: a late result is a failure, as with an airbag or a
  motor's current limit.
- A **soft** deadline may be missed now and then at the cost of quality: a dropped video frame, a
  slower user interface.

Neither FreeRTOS nor Zephyr knows about deadlines. Their scheduler runs the most urgent ready task;
whether that meets every deadline is up to the priorities the designer gave the tasks. Checking it
before the system runs is **schedulability analysis**
([rate-monotonic scheduling](/learn/glossary/rate-monotonic-scheduling/) comes with a simple test);
a running system can detect a miss itself,
by comparing the time at the end of each job, or with a watchdog. (Zephyr has an optional
earliest-deadline-first scheduler, `CONFIG_SCHED_DEADLINE`, which orders threads of equal priority
by a deadline the application sets; it is off in the baseline configuration.)

The [periodic tasks lesson](/learn/periodic-tasks/) shows a deadline missed because a more urgent
task overran; the simulator marks the miss, which the kernel does not.
