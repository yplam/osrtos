---
title: Run queue
description: Zephyr's structure of ready threads, a list sorted by priority with the next thread cached.
---

The **run queue** is Zephyr's name for the structure that holds the threads able to run. It is the
same idea as the FreeRTOS [ready lists](/learn/glossary/ready-list/), built differently.

The kernel keeps it in `_kernel.ready_q`. With the default `CONFIG_SCHED_SIMPLE`, which the
simulator uses, `ready_q.runq` is one doubly linked list sorted by priority. `z_priq_simple_add()`
walks the list and inserts a thread in front of the first one that is less urgent, so a thread
lands behind every thread of its own priority. The best thread is always the first entry. A thread
that is sliced or yields is moved behind its equals by `z_priq_simple_yield()`.

Next to the list is `ready_q.cache`: the thread the next context switch will go to. `update_cache()`
fills it whenever the run queue changes. It is usually the first entry, but not always: a
[cooperative thread](/learn/zephyr/cooperative-threads/), or one that holds the
[scheduler lock](/learn/glossary/scheduler-lock/), stays in the cache while it keeps running, even
when a more urgent thread is first in the list. `should_preempt()` makes that decision.

Two details that surprise people:

- **The running thread is in the run queue.** It leaves only when it sleeps, waits, is suspended or
  ends. Being first in the queue and running are different things, as the cache shows.
- **Other run queues exist.** For many threads Zephyr offers a red-black tree
  (`CONFIG_SCHED_SCALABLE`) and an array of lists per priority (`CONFIG_SCHED_MULTIQ`), which is
  close to the FreeRTOS design. The scheduler calls them through the same `_priq_run_*` macros.

The [Zephyr walkthrough on choosing the next thread](/learn/zephyr/choosing-the-next-task/)
follows the cache line by line.
