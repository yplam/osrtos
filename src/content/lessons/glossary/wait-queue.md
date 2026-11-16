---
title: Wait queue
description: The list of tasks waiting for one kernel object, such as a mutex or semaphore, ordered by priority.
---

A **wait queue** holds the tasks that wait for one particular kernel object: a
[mutex](/learn/glossary/mutex/), a [semaphore](/learn/glossary/semaphore/), a queue. When the
object becomes available, the kernel takes a task from the front and makes it ready.

In **Zephyr** the type is `_wait_q_t`, and every object that threads can wait for has one
(`wait_q` in `struct k_mutex` and `struct k_sem`). With the default `CONFIG_WAITQ_SIMPLE` it is a
doubly linked list sorted by priority, built the same way as the
[run queue](/learn/glossary/run-queue/): a new waiter goes in front of the first less urgent one.

In **FreeRTOS** the waiting lists live on the queue that every semaphore and mutex is built on:
`xTasksWaitingToReceive` (tasks that want to take) and `xTasksWaitingToSend` (tasks that want to
give to a full queue). A waiting task is linked in by its `xEventListItem`, whose value is
`configMAX_PRIORITIES` minus its priority, so sorting by value puts the most urgent task first.

Two details that surprise people:

- **A waiting task is in two lists at once.** It is in the object's wait queue, and also in the
  structure that wakes it when its timeout ends: the [delayed list](/learn/glossary/delayed-list/)
  in FreeRTOS, the timeout list in Zephyr. Whichever happens first, the object or the timeout,
  removes it from both. The simulator's kernel panel shows a waiter in both places.
- **Equal priorities wait in arrival order.** Both kernels insert a new waiter behind the ones of
  its own priority, so the first to wait is the first served among equals, but a more urgent
  latecomer goes ahead of all of them. The [mutex handoff lesson](/learn/mutex-handoff/) has three
  waiters.
