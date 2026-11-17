---
title: Event groups in FreeRTOS
description: How xEventGroupWaitBits stores what a task waits for in its own list item, how xEventGroupSetBits walks every waiting task with the scheduler suspended, and why an interrupt's setBits goes through the timer service task.
order: 10
scenario: event-group
rtos: freertos
keyStep: { event: GotBits, nth: 1 }
---

This walkthrough follows the [event groups lesson](/learn/event-groups/) through FreeRTOS's
`event_groups.c`. Set the step level to **Line** to follow it.

## What an event group is

`xEventGroupCreate()` allocates an `EventGroup_t` with two fields:

- `uxEventBits`: the bits. The kernel panel shows them by name, and the raw value.
- `xTasksWaitingForBits`: the tasks waiting for some of them.

`EventBits_t` is as wide as a tick count, here 32 bits, but the top 8 are reserved for control
flags, so a group has 24 bits for the application.

## Waiting: xEventGroupWaitBits

At tick 0 `Upload` calls
`xEventGroupWaitBits( E, BIT_DATA | BIT_LINK, pdTRUE, pdTRUE, portMAX_DELAY )`: clear on exit, wait
for all of them, with no timeout.

```kernel freertos:event_groups.c#xEventGroupWaitBits
```

1. `vTaskSuspendAll()`: the scheduler is suspended, not interrupts.
2. `prvTestWaitCondition()` checks the bits against what the task asks for, all or any. No bit is
   set yet, and `Upload` is willing to wait.
3. The flags for "clear on exit" and "wait for all" are added to the bits waited for, and
   `vTaskPlaceOnUnorderedEventList()` blocks the task.

```kernel freertos:tasks.c#vTaskPlaceOnUnorderedEventList
```

Where does the kernel keep what each task waits for? In the task's own event list item. For a
queue that item's value is the task's priority, which keeps the waiting list sorted. Here it holds
the bits and the two flags instead, marked with `taskEVENT_LIST_ITEM_VALUE_IN_USE` so that a
priority change leaves it alone. The list itself is *unordered*: `listINSERT_END()` puts the task
at the end, because every waiter will be looked at anyway. Then the task goes into a delayed list,
or with no timeout into `xSuspendedTaskList`, as for any wait.

`Status` does the same, asking for any of `LINK` and `ERR`. Both tasks are now in
`E.xTasksWaitingForBits`, each with its bits shown on its chip.

## Setting: xEventGroupSetBits

At [tick 6](#sim:event=GotBits:1) `Net` sets `LINK`:

```kernel freertos:event_groups.c#xEventGroupSetBits
```

1. The scheduler is suspended again. This function may wake many tasks, so it does not run with
   interrupts off.
2. `uxEventBits |= uxBitsToSet`: the group is now `DATA | LINK`.
3. The loop walks the whole list. For each task it reads the value of its list item, splits off the
   control flags, and tests the condition: `Upload` (all of `DATA` and `LINK`) is satisfied,
   `Status` (any of `LINK` and `ERR`) too.
4. `Upload` clears on exit, so its bits are added to `uxBitsToClear`. They are not cleared yet: every
   waiter is tested against the same bits.
5. Each satisfied task is woken by `vTaskRemoveFromUnorderedEventList()`:

```kernel freertos:tasks.c#vTaskRemoveFromUnorderedEventList
```

It stores the group's current bits, with the flag `eventUNBLOCKED_DUE_TO_BIT_SET`, in the task's
list item: that is what the task's call will return. Then it moves the task to its ready list. The
scheduler is suspended, so a more urgent task cannot run yet: `xYieldPending` is set instead.

6. After the walk, `uxBitsToClear` is applied: `E` is empty again.
7. `xTaskResumeAll()` finds the pending yield and switches to `Upload` at once.

## Waking up

`Upload` returns from its `taskYIELD_WITHIN_API()` inside `xEventGroupWaitBits()`.
`uxTaskResetEventItemValue()` reads the value that was stored for it and puts its priority back in
its list item. The flag says it was woken by bits, so the value, `DATA | LINK`, is returned as it
is. `Status` does the same when it runs at tick 8, and gets `DATA | LINK` as well: the bits as they
were when it was woken, cleared since by `Upload`.

When a wait ends *without* that flag, the timeout ran out (or the task was suspended and resumed).
The function then reads the bits as they are now and tests the condition once more. If the bits
arrived just after the timeout, the task gets them after all, and clears them if it asked to.

## From an interrupt

An interrupt handler calls `xEventGroupSetBitsFromISR()`:

```kernel freertos:event_groups.c#xEventGroupSetBitsFromISR
```

It does not touch the group. Walking `xTasksWaitingForBits` has no fixed length, so it must not be
done with interrupts masked. Instead it calls `xTimerPendFunctionCallFromISR()`, which sends a
message to the [timer service task](/learn/freertos/software-timers/): "call
`vEventGroupSetBitsCallback( E, BIT_DATA )`". The message goes into `xTimerQueue` like a timer
command (it shows as `setBits(E, DATA)`), and wakes the timer task.

At [tick 3](#sim:tick=3) the timer task is the most urgent task, so `portYIELD_FROM_ISR()` switches
to it as the interrupt returns. In `prvProcessReceivedCommands()` it finds a message with a negative
ID, a pended function rather than a timer command, and calls it: `vEventGroupSetBitsCallback()`
calls `xEventGroupSetBits()`, as any task would. In the event log the bits are set by `Tmr Svc`,
not by `Sensor`.

This is why event groups from interrupts need `configUSE_TIMERS` and
`INCLUDE_xTimerPendFunctionCall`, why the timer queue must have room for these messages, and why
the timer task's priority decides how soon the bits appear.
