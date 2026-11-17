---
title: Counting semaphore
description: A semaphore whose count can go above 1, for a pool of identical resources or for events that may arrive faster than they are handled.
---

A **counting semaphore** is a [semaphore](/learn/glossary/semaphore/) with a maximum count larger
than 1. Taking it decrements the count, or waits while the count is 0; giving it increments the
count, up to the maximum, or wakes a waiting task instead.

It is used in two ways, which differ in where the count starts:

- **A pool of resources.** The count starts at the number of resources, say four buffers, and
  means "how many are free". A task takes before it uses one and gives when it is done. Up to four
  tasks proceed at once; a fifth waits. The [counting semaphores lesson](/learn/counting-semaphores/)
  shows a pool of two with three tasks.
- **Counting events.** The count starts at 0 and means "how many events have not been handled". An
  interrupt handler gives once per event, and a task takes once per event it handles. Unlike a
  binary semaphore, it does not lose an event that arrives while the previous one is still pending,
  until the count reaches its maximum. The [interrupts lesson](/learn/interrupts/) lets you switch
  between the two.

Like any semaphore it has **no owner**, so a task waiting for a resource from a pool does not raise
the priority of the tasks that hold one: there is no
[priority inheritance](/learn/priority-inheritance/). It only counts; it does not say *which*
resource is free, so a pool still needs a way to hand out the buffers themselves.

In **FreeRTOS**, `xSemaphoreCreateCounting( uxMaxCount, uxInitialCount )` creates a queue of
`uxMaxCount` items of size zero, with `uxMessagesWaiting` set to the initial count. Taking and
giving use the same functions as a binary semaphore. In **Zephyr**,
`K_SEM_DEFINE( name, initial, limit )` defines a `struct k_sem`; a binary semaphore is one with a
limit of 1.
