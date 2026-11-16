---
title: Priority inheritance in FreeRTOS
description: How xTaskPriorityInherit raises a mutex holder and xTaskPriorityDisinherit lowers it again, line by line in the real kernel source.
order: 5
scenario: priority-inversion-mutex
rtos: freertos
keyStep: { event: PrioChange, nth: 1 }
---

This page follows [priority inheritance](/learn/priority-inheritance/) through the FreeRTOS source.
In the simulator above, set the step level to **Line** and use the **Kernel** tab of the code panel
to see each of these functions execute.

The scenario: `Low` (priority 1) holds the mutex `M`. `Med` (priority 2) is running. At tick 2,
`High` (priority 3) wakes and calls `xSemaphoreTake( M, portMAX_DELAY )`.

## A mutex is a queue

FreeRTOS builds semaphores and mutexes on its queue. A mutex is a queue that can hold one item of
size zero. "The mutex is free" means the queue holds one item (`uxMessagesWaiting` is 1); taking the
mutex removes it. A mutex-type queue also uses one of its fields to store the task that holds it,
`xMutexHolder`, which you can see in the simulator's kernel structures panel. That field is what a
binary semaphore lacks.

## Two priorities per task

With `configUSE_MUTEXES` set to 1, each task control block has two priority fields:

- `uxPriority`: the priority the scheduler uses.
- `uxBasePriority`: the priority the application gave the task.

They are equal except while the task has inherited a priority. The task also counts the mutexes it
holds in `uxMutexesHeld`.

## Raising the holder

`xSemaphoreTake()` is `xQueueSemaphoreTake()` in `queue.c`. When the mutex is not available and the
caller is willing to wait, it calls `xTaskPriorityInherit()` with the holder, before it puts the
caller to sleep.

```kernel freertos:tasks.c#xTaskPriorityInherit
```

Reading it from the top:

1. It acts only if the holder's priority is lower than the caller's (`pxCurrentTCB` is `High`).
2. It updates the holder's event list item, which carries the priority used to sort lists of
   waiting tasks, unless that value is in use for something else.
3. If the holder is in a ready list, it must change lists, because there is one ready list per
   priority. The holder is removed from the list of its old priority, its `uxPriority` is set to
   the caller's, and `prvAddTaskToReadyList()` appends it to the list of the new priority. This is
   the branch the scenario takes: `Low` was ready, preempted by `Med`.
4. If the holder is not ready (it may be delayed, or blocked on another mutex), only `uxPriority`
   changes. The new priority takes effect when the task becomes ready.

`uxBasePriority` is not touched. After this function, `High` is placed on the mutex's
`xTasksWaitingToReceive` list and a context switch runs `Low`, now the most urgent ready task.

## Lowering it again

When `Low` calls `xSemaphoreGive()`, `xQueueGenericSend()` copies the item into the queue with
`prvCopyDataToQueue()`, which sees that the queue is a mutex and calls `xTaskPriorityDisinherit()`.

```kernel freertos:tasks.c#xTaskPriorityDisinherit
```

The function decrements `uxMutexesHeld` and then restores `uxBasePriority` only if **two**
conditions hold: the task's priority differs from its base priority, and it now holds no mutexes at
all.

The second condition is a deliberate simplification. If a task
holds two mutexes and inherited its priority through one of them, FreeRTOS does not work out which.
It keeps the raised priority until the last mutex is given back. The task may run at a high
priority for longer than strictly needed, but never for less. Try the
[nested mutexes scenario](/learn/playground/?scenario=nested-mutexes&rtos=freertos) to see `Low`
keep priority 3 after it has released the mutex that `High` wanted.

After the priority is restored, `xQueueGenericSend()` makes the most urgent waiter ready. It does
not make it the owner; see [Mutex handoff](/learn/mutex-handoff/).

## When the waiter gives up

A task can wait for a mutex with a timeout. If the timeout runs out, the holder may be running at a
priority it inherited from a task that is no longer waiting. `xQueueSemaphoreTake()` handles this
on the waiter's way out by calling `vTaskPriorityDisinheritAfterTimeout()` with the highest priority
among the tasks still waiting.

```kernel freertos:tasks.c#vTaskPriorityDisinheritAfterTimeout
```

It lowers the holder to the greater of its base priority and that remaining waiter's priority, and
again only if the holder holds exactly one mutex. The
[mutex timeout scenario](/learn/playground/?scenario=mutex-timeout&rtos=freertos) runs this path:
`High` gives up at tick 4 and `Low` drops back to priority 1 while it still holds `M`.

## Limits worth knowing

- Inheritance is one level deep. If the holder is itself blocked on a second mutex, the holder of
  that one is not raised. Zephyr follows the chain; see the
  [Zephyr walkthrough](/learn/zephyr/priority-inheritance/).
- Mutexes must not be used from interrupt handlers: an interrupt has no task priority to lend.
- A binary semaphore created with `xSemaphoreCreateBinary()` gets none of this. Use
  `xSemaphoreCreateMutex()` for mutual exclusion.
