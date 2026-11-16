---
title: Semaphore
description: A counter that tasks take and give, used to signal between tasks and to count resources, with no owner.
---

A **semaphore** is a counter kept by the kernel. Taking it decrements the count; when the count is
0 the task waits in the semaphore's [wait queue](/learn/glossary/wait-queue/). Giving it increments
the count, or wakes a waiter.

- A **binary semaphore** counts only to 1. It is the usual way for one task, or an interrupt
  handler, to **signal** another: the waiting task takes an empty semaphore and sleeps until someone
  gives it. The [semaphores lesson](/learn/semaphores/) shows it.
- A **counting semaphore** counts up to a maximum, for example the free slots of a pool of
  buffers.

A semaphore has **no owner**. Any task may give it, not only one that took it; that is exactly what
signalling needs. The price is that the kernel cannot help when a semaphore is used as a lock: it
does not know whom a waiting task is waiting for, so there is no priority inheritance.
[Priority inversion](/learn/priority-inversion/) shows what that costs; a
[mutex](/learn/glossary/mutex/) is the fix.

In **FreeRTOS** a semaphore is a queue with items of size zero: the count is the queue's
`uxMessagesWaiting`. `xSemaphoreCreateBinary()` creates it empty, `xSemaphoreCreateCounting()` with
a maximum and a start value. In **Zephyr** it is `struct k_sem` with `count`, `limit` and `wait_q`;
`K_SEM_DEFINE(name, initial, limit)` defines one.

Two details that surprise people:

- **Giving to a waiter works differently.** Zephyr's `k_sem_give()` hands the give straight to the
  most urgent waiter and leaves the count at 0. FreeRTOS increments the count and wakes the waiter,
  which takes it when it runs.
- **Gives can be lost.** Giving a binary semaphore that is already 1 changes nothing, so two signals
  before the taker runs count as one.
