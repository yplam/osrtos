---
title: Queues in FreeRTOS
description: How xQueueSend and xQueueReceive copy items through a ring of slots, how a task waits for room or for an item, and why the queue is locked while it does.
order: 8
scenario: producer-consumer
rtos: freertos
keyStep: { event: Block, nth: 1 }
---

This walkthrough follows the [producer and consumer](/learn/queues/) through FreeRTOS's
`queue.c`. Set the step level to **Line** and go to [tick 4](#sim:tick=4): the queue `Q` is full,
`Producer` is about to send its fourth item and `Consumer` has not run yet.

## What a queue is

`xQueueCreate( 3, sizeof( uint32_t ) )` allocates one block: the `Queue_t` header followed by the
storage for 3 items of 4 bytes. The fields that matter here are shown in the kernel panel:

- `uxLength` and `uxItemSize`: 3 slots of 4 bytes.
- `uxMessagesWaiting`: how many slots hold an item.
- `pcWriteTo`: the slot the next item is copied into.
- `pcReadFrom`: the slot the *last* item was read from. The next read moves it on by one first.
- `xTasksWaitingToSend` and `xTasksWaitingToReceive`: the tasks blocked on a full and on an empty
  queue, each list ordered by priority.

Both pointers wrap round at the end of the storage, so the slots form a ring. The panel draws the
slots in memory order, with the oldest item marked "out" and the slot `pcWriteTo` points at marked
"in". Mutexes and semaphores are the same structure with `uxItemSize` 0: nothing is copied, and
only `uxMessagesWaiting` counts.

## Sending: xQueueGenericSend

`xQueueSend()` is a macro for `xQueueGenericSend()`, which also implements `xQueueSendToFront()`,
`xQueueOverwrite()` and, with no item, `xSemaphoreGive()`.

```kernel freertos:queue.c#xQueueGenericSend
```

The function is a loop. Each pass first looks for room inside a critical section:

1. At ticks 1 to 3 there is room. `prvCopyDataToQueue()` copies the item and raises
   `uxMessagesWaiting`; nobody is waiting to receive, so the call returns `pdPASS`.
2. At tick 4 `uxMessagesWaiting` equals `uxLength`. `Producer` passed `portMAX_DELAY`, so it is
   willing to wait: `vTaskInternalSetTimeOutState()` notes when the wait began.

Then it leaves the critical section and prepares to block, which takes longer:

3. `vTaskSuspendAll()` stops the scheduler, so no other task runs while the lists are changed.
   Interrupts still can.
4. `prvLockQueue()` sets `cRxLock` and `cTxLock`. An interrupt that sends to or receives from the
   queue now still moves items, but leaves the waiting lists alone and only counts what it did in
   the lock. This is how FreeRTOS keeps its critical sections short: the slow work is done with
   interrupts on.
5. `xTaskCheckForTimeOut()` confirms the wait has not run out (it never does with
   `portMAX_DELAY`), and `prvIsQueueFull()` confirms that the queue is still full.
6. `vTaskPlaceOnEventList()` puts `Producer` into `xTasksWaitingToSend`, and, because it waits
   without a timeout, into `xSuspendedTaskList` rather than a delayed list.
7. `prvUnlockQueue()` replays anything an interrupt counted in the locks (here nothing), and
   `xTaskResumeAll()` restarts the scheduler. `Producer` is no longer ready, so
   `taskYIELD_WITHIN_API()` switches to `Consumer`.

When `Producer` runs again it will be at the bottom of the loop, and go round to try again.

## Receiving: xQueueReceive

`Consumer` now calls `xQueueReceive()`, which has the same shape:

```kernel freertos:queue.c#xQueueReceive
```

`uxMessagesWaiting` is 3, so it takes the fast path. `prvCopyDataFromQueue()` moves `pcReadFrom`
on by one slot (from slot 2 it wraps round to slot 0) and copies `Producer#1` out:

```kernel freertos:queue.c#prvCopyDataFromQueue
```

The count drops to 2. Then `xQueueReceive()` looks at `xTasksWaitingToSend`. A slot has just been
freed and `Producer` waits for one, so `xTaskRemoveFromEventList()` takes it off the list and puts
it back in its ready list. `Producer` is more urgent than `Consumer`, so
`queueYIELD_IF_USING_PREEMPTION()` asks for a switch, and PendSV switches to `Producer` before
`Consumer` even returns from its call.

## Back in the send loop

`Producer` resumes in `xQueueGenericSend()` and goes round its loop. Now there is room, and
`prvCopyDataToQueue()` copies `Producer#4`:

```kernel freertos:queue.c#prvCopyDataToQueue
```

`pcWriteTo` wrapped to slot 0 after the third item, so `Producer#4` lands in slot 0, the slot
`Producer#1` was just read from. Look at the panel: the items read `Producer#4`, `Producer#2`,
`Producer#3` in memory order, with "out" on slot 1. The order in which they will be received is
still `#2`, `#3`, `#4`.

Note what the receive did *not* do: it did not send `Producer#4` on the producer's behalf. It only
woke the producer, which sent the item itself when it ran. If a third task had filled the slot
first, `Producer` would have found the queue full again and blocked again. Zephyr does it the
other way round, as [its walkthrough](/learn/zephyr/message-queues/) shows; the
[queue handoff lesson](/learn/queue-handoff/) shows the same choice on the receiving side.

## A timeout that runs out

With a timeout, `xTaskCheckForTimeOut()` may say the wait is over. A send then unlocks the queue,
resumes the scheduler and returns `errQUEUE_FULL` without looking again, even if a slot was freed
in the meantime. A receive is more forgiving: it looks once more with `prvIsQueueEmpty()`, and goes
round the loop if an item arrived after all.
