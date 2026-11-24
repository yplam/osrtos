---
title: Semaphores in FreeRTOS
description: How FreeRTOS builds a counting semaphore on its queue, how xQueueSemaphoreTake waits when the count is 0, and why a woken task takes the count itself when it runs.
order: 9
scenario: counting-semaphore
rtos: freertos
keyStep: { event: Block, nth: 3 }
---

This walkthrough follows the [counting semaphore lesson](/learn/counting-semaphores/) through
FreeRTOS's `queue.c`. `Pool` counts two free buffers. `A` (priority 1), `B` (2) and `C` (3) each
take one, work, and give it back; `B` starts at tick 1 and `C` at tick 2. Set the step level to
**Line** and open the **Kernel** tab.

## A queue that holds nothing

`main()` creates the semaphore with `xSemaphoreCreateCounting( 2, 2 )`, a macro for:

```kernel freertos:queue.c#xQueueCreateCountingSemaphore
```

It is an ordinary queue, made by `xQueueGenericCreate()`, with an item size of
`queueSEMAPHORE_QUEUE_ITEM_LENGTH`, which is 0. The [queue walkthrough](/learn/freertos/queues/)
describes the fields; for a semaphore they mean:

- `uxLength`: the largest count, here 2.
- `uxMessagesWaiting`: the count itself. `xQueueCreateCountingSemaphore()` writes the start value
  straight into it: 2, both buffers free.
- `uxItemSize`: 0. The queue has no storage, so `xQueueGenericCreate()` allocates only the
  `Queue_t` header, and `pcWriteTo` and `pcReadFrom` are never used.
- `xTasksWaitingToReceive`: the tasks waiting for the count to rise above 0.

A binary semaphore is the same queue with a length of 1 that starts at 0
(`xSemaphoreCreateBinary()`). A mutex is one too, which also records its holder in
`xMutexHolder`; see [priority inheritance](/learn/freertos/priority-inheritance/).

## Taking: xQueueSemaphoreTake

`xSemaphoreTake()` is a macro for `xQueueSemaphoreTake()`. Unlike `xQueueReceive()`, it copies
nothing out.

```kernel freertos:queue.c#xQueueSemaphoreTake
```

The function is a loop, like the queue functions. Each pass first looks at the count inside a
critical section.

[At tick 0](#sim:event=Take:1) `A` takes `Pool`. The count is 2, so the fast path runs: the count
drops to 1, and the function returns `pdPASS`. The `xTasksWaitingToSend` check is for a task that waits to
*give*; nobody does here, because `xSemaphoreGive()` never waits. At tick 1 `B` takes the last
buffer the same way, and the count is 0.

[At tick 2](#sim:event=Block:3) `C` wakes and calls `xSemaphoreTake( Pool, portMAX_DELAY )`. The
count is 0 and `C` is willing to wait:

1. `vTaskInternalSetTimeOutState()` notes when the wait began.
2. The function leaves the critical section, suspends the scheduler and locks the queue with
   `prvLockQueue()`. An interrupt may still give or take now; it only counts what it did in the
   queue's locks.
3. `xTaskCheckForTimeOut()` confirms the wait has not run out (it never does with
   `portMAX_DELAY`), and `prvIsQueueEmpty()` confirms that the count is still 0.
4. The mutex branch is skipped: `Pool` is not a mutex, so nobody's priority is raised.
5. `vTaskPlaceOnEventList()` puts `C` into `xTasksWaitingToReceive`, sorted by priority, and,
   because it waits without a timeout, into `xSuspendedTaskList`.
6. `prvUnlockQueue()` and `xTaskResumeAll()` undo step 2, and `taskYIELD_WITHIN_API()` switches
   to `B`.

When `C` runs again, it will be at the bottom of this loop.

## Giving: xQueueGenericSend

`xSemaphoreGive()` is `xQueueGenericSend( xSemaphore, NULL, 0, queueSEND_TO_BACK )`: a send with no
item and a block time of 0.

```kernel freertos:queue.c#xQueueGenericSend
```

[At tick 4](#sim:event=Give:1) `B` gives its buffer back:

1. The count (0) is below `uxLength` (2), so there is room.
2. `prvCopyDataToQueue()` copies nothing, because the item size is 0, but it still adds one to
   `uxMessagesWaiting`: the count is 1. For a mutex this is also where the holder's priority is
   restored.

```kernel freertos:queue.c#prvCopyDataToQueue
```

3. `xTasksWaitingToReceive` is not empty, so `xTaskRemoveFromEventList()` takes `C` off it and puts
   it back in its ready list. `C` (3) is more urgent than `B` (2), so the function returns `pdTRUE`.
4. `queueYIELD_IF_USING_PREEMPTION()` asks for a switch, and `C` runs before `B` even returns from
   its call.

If the count were already at `uxLength`, there would be no room. The block time is 0, so the give
would return `errQUEUE_FULL` at once instead of waiting.

## The woken task takes the count itself

Note what the give did *not* do: it did not take the count for `C`. The count is 1 when `C` runs.
`C` resumes inside `xQueueSemaphoreTake()`, goes round the loop, finds the count at 1 and takes it
([the take at tick 4](#sim:event=Take:3), in `C`'s own context). Only then is the count 0 again.

Between the give and that take, the count is 1 and anyone could take it. Here nobody can, because
`C` runs at once. If `C` were not more urgent than the giver, the switch would wait, and another
task could take the buffer first; `C` would find the count at 0 and wait again. Zephyr does it the
other way round: see
[who takes the count](/learn/semaphores/#who-takes-the-count-freertos-and-zephyr-differ).

## What to try

- Set **Pool counts up to** 3. `C` finds the count at 1 at tick 2 and takes it on the fast path;
  `xTasksWaitingToReceive` stays empty for the whole run.
- Give `C` an urgency of 2, the same as `B`. At tick 4 `B`'s give still raises the count and makes
  `C` ready, but `xTaskRemoveFromEventList()` returns `pdFALSE`: `C` is not *more* urgent. `B` keeps
  the CPU with the count at 1 until the tick-5 time slice, and only then does `C` take it.
