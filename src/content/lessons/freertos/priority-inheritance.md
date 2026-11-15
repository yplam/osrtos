---
title: Priority inheritance in FreeRTOS
description: How xTaskPriorityInherit raises the priority of a mutex holder, in the real kernel source.
scenario: priority-inversion-mutex
rtos: freertos
keyStep: { event: PrioChange, nth: 1 }
---

A low-priority task holds a mutex. A high-priority task tries to take the same mutex and has to wait.
If a medium-priority task is ready at that moment, it runs instead of the low-priority task, and the
high-priority task ends up waiting for work that has nothing to do with the mutex. This is priority
inversion.

FreeRTOS mutexes limit the damage with priority inheritance: while the high-priority task waits, the
task that holds the mutex runs at the waiter's priority.

## Where it happens

A mutex in FreeRTOS is a queue, and taking one goes through `xQueueSemaphoreTake()` in `queue.c`. When
the mutex is already held and the caller is about to block, that function calls
`xTaskPriorityInherit()` with the task that holds the mutex.

```kernel freertos:tasks.c#xTaskPriorityInherit
```

## What the function does

The function compares the holder's priority with the priority of the running task, which is the one
asking for the mutex. It only acts when the holder's priority is lower.

If the holder is in a ready list, it is removed from the list for its old priority, given the new
priority, and added to the ready list for that priority with `prvAddTaskToReadyList()`. If the holder is
not ready (for example, it is delayed), only its priority field changes.

The holder's original priority stays in `uxBasePriority`, so the kernel can restore it when the mutex is
given back.
