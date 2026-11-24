---
title: Mutex
description: A lock with an owner, used to give one task at a time access to a shared resource, and the kernel help that ownership makes possible.
---

A **mutex** (mutual exclusion) is a lock that one task at a time can hold. A task takes it before it
touches a shared resource and gives it back afterwards, so no other task can change the resource
halfway (a [race condition](/learn/glossary/race-condition/)); others wait meanwhile in the
mutex's [wait queue](/learn/glossary/wait-queue/).

What sets a mutex apart from a binary [semaphore](/learn/glossary/semaphore/) is that it has an
**owner**, and the kernel knows who it is. That lets the kernel do two things:

- **Priority inheritance.** When a more urgent task waits, the owner runs at that task's
  [priority](/learn/glossary/priority/) until it gives the mutex back, so a medium-priority task
  cannot keep everyone waiting. See [priority inheritance](/learn/priority-inheritance/).
- **Checks.** Only the owner may give the mutex back.

In **FreeRTOS** a mutex is a queue of length one whose single item means "free".
`xSemaphoreCreateMutex()` creates it, and the queue's `xMutexHolder` field records the owner. Giving
it from another task trips a `configASSERT` in `xTaskPriorityDisinherit()`. A plain mutex cannot be
taken twice by the same task; that needs a recursive mutex (`xSemaphoreCreateRecursiveMutex()`).

In **Zephyr** it is `struct k_mutex` with `owner`, `lock_count` and a `wait_q`. It is recursive: the
owner may lock it again, and must unlock it as many times. `k_mutex_unlock()` from another thread
returns `-EPERM`. The thread keeps its own priority in `orig_prio` and a list of the mutexes it
holds, `held_mutexes`.

Two details that surprise people:

- **The kernels differ on unlock.** Zephyr hands the mutex straight to the most urgent waiter;
  FreeRTOS frees it and the waiter must take it when it runs. The
  [mutex handoff lesson](/learn/mutex-handoff/) shows the difference.
- **A mutex is not for interrupts.** A handler is not a task and cannot own one; both kernels'
  documentation rules it out. Signal from an interrupt with a semaphore.
