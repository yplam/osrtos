---
title: Priority
description: The number that tells the scheduler how urgent a task is, and why FreeRTOS and Zephyr count it in opposite directions.
---

A task's **priority** tells the scheduler how urgent it is. Whenever the scheduler chooses, it runs
the most urgent task that is ready; that is the whole rule behind [preemption](/learn/preemption/).
Tasks of equal priority share the CPU by [time slicing](/learn/glossary/time-slice/).

The two kernels count in opposite directions:

- **FreeRTOS**: a higher number is more urgent. The idle task has priority 0
  (`tskIDLE_PRIORITY`), and application tasks use 1 up to `configMAX_PRIORITIES` − 1. The
  simulator sets `configMAX_PRIORITIES` to 5.
- **Zephyr**: a lower number is more urgent. Priorities from 0 upwards are preemptible; negative
  priorities are cooperative, and a [cooperative thread](/learn/zephyr/cooperative-threads/) is
  never preempted by another thread. The idle thread has the least urgent priority, 15 in the
  simulated configuration.

The simulator's scenarios give each task an *urgency* (1 = least urgent) and translate it, so one
scenario runs on both kernels. The task cards show each kernel's own number.

Two details that surprise people:

- **A task has two priorities.** The one the application gave it (FreeRTOS `uxBasePriority`) and
  the one the scheduler uses (`uxPriority`). They differ while the task holds a
  [mutex](/learn/glossary/mutex/) that a more urgent task waits for: that is
  [priority inheritance](/learn/priority-inheritance/). Zephyr keeps the thread's own priority in
  `orig_prio` while it holds a mutex, and works out `base.prio` again on every unlock.
- **Priority is not importance.** It decides who runs first, nothing else. A low-priority task can
  wait forever if more urgent tasks never block, and a high-priority task can still wait for a
  low-priority one through a shared lock: [priority inversion](/learn/priority-inversion/).
