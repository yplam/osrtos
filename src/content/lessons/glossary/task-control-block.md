---
title: Task control block (TCB)
description: The structure in which a kernel keeps everything it knows about one task, such as its saved stack pointer, priority and list links.
---

A **task control block** is the kernel's record of one task. Everything the scheduler needs to stop
a task and continue it later, and to find it in the kernel's lists, is in or reachable from its TCB.

In FreeRTOS the type is `TCB_t`. The fields that matter for scheduling are:

- `pxTopOfStack`: where the task's stack pointer was when it last stopped running. The registers
  are saved on the task's own stack, so this one pointer is enough to restore them.
- `uxPriority` and `uxBasePriority`: the priority the task runs at and the one the application
  gave it. They differ during [priority inheritance](/learn/freertos/priority-inheritance/).
- `xStateListItem`: the link that places the task in one of the ready, delayed, suspended or
  waiting-termination lists. That list mostly decides the task's state; `eTaskGetState()` also
  looks at `xEventListItem` (and the notify state) to tell a task blocked forever from a suspended
  one.
- `xEventListItem`: a second link, used when the task also waits for a queue, semaphore or mutex.

The global `pxCurrentTCB` points at the TCB of the running task. A
[context switch](/learn/glossary/context-switch/) is, at its core, changing that pointer.

In Zephyr the equivalent is `struct k_thread`. Its `base` part holds the priority (`base.prio`), the
state flags (`base.thread_state`, shown on the task cards in the simulator), the links for the run
queue or a wait queue, and the thread's timeout. `_current` points at the running thread.
