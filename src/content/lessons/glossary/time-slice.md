---
title: Time slice
description: The share of CPU time a task gets before the kernel lets the next task of the same priority run.
---

A **time slice** is how long a task may run before the kernel gives the CPU to the next ready task
of the **same** priority. Time slicing is round robin among equals; it never lets a less urgent task
run, and a more urgent task does not wait for a slice to end: it preempts at once.

**FreeRTOS** slices on every [tick](/learn/glossary/tick/). With `configUSE_PREEMPTION` and
`configUSE_TIME_SLICING` both 1, `xTaskIncrementTick()` asks for a switch whenever the ready list of
the running task's priority holds more than one task. The slice is therefore always one tick, and
the next task is simply the next entry in that [ready list](/learn/glossary/ready-list/).

**Zephyr** has `CONFIG_TIMESLICING` and a slice length, `CONFIG_TIMESLICE_SIZE`, in milliseconds.
The kernel's default is 20 ms; the simulator uses 1 so that slices are visible in short scenarios.
The slice is a timer of its own: `slice_timeouts[cpu]` is an entry in the kernel's timeout list,
armed when a thread starts running. When it fires, its handler `slice_timeout()` marks the slice as
expired, and `z_time_slice()` then moves the running thread behind the others of its priority.

Two details that surprise people:

- **Not every thread is sliced in Zephyr.** Cooperative threads never are, nor threads more urgent
  than `CONFIG_TIMESLICE_PRIORITY`, nor a thread that holds the
  [scheduler lock](/learn/glossary/scheduler-lock/).
- **A slice is not always the length you set.** In Zephyr the first slice of a thread that starts
  running from thread context is one tick longer, because a timeout set between two ticks gets an
  extra tick. The [time slicing lesson](/learn/time-slicing/) shows it, and why a slice that is
  too short wastes time in [context switches](/learn/glossary/context-switch/).
