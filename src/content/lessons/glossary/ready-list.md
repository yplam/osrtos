---
title: Ready list
description: The kernel structure that holds the tasks able to run, organised so the most urgent one is found quickly.
---

The **ready list** (or run queue) holds every task that could run right now. The scheduler's job is
to pick the most urgent one from it, so it is organised to make that fast.

**FreeRTOS** uses an array of lists, `pxReadyTasksLists[ configMAX_PRIORITIES ]`, one list per
priority. `uxTopReadyPriority` remembers the highest priority that may have a ready task. Picking a
task means walking down from there to the first list that is not empty and taking the next entry.
Each list has a `pxIndex` pointer that advances on every pick, which gives tasks of the same
priority their turns ([time slicing](/learn/time-slicing/)).

**Zephyr** offers several implementations. The default, used by the simulator, is one doubly linked
list sorted by priority (`CONFIG_SCHED_SIMPLE`): the best thread is the first entry, and inserting
is a walk along the list. For systems with many threads there are a red-black tree and a
multi-queue variant that resembles the FreeRTOS array. Zephyr also keeps the chosen thread in
`_kernel.ready_q.cache`, so the context switch code does not search.

Both kernels keep the running task in the ready structure. A task leaves it only when it sleeps,
waits, is suspended or ends.

The [scheduling lesson](/learn/scheduling/) shows both structures changing tick by tick.
