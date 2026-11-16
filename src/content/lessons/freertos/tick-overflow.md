---
title: Tick count overflow in FreeRTOS
description: How FreeRTOS keeps delays working when its 32-bit tick count wraps round to zero, with two delayed lists that swap roles.
order: 4
scenario: tick-overflow
rtos: freertos
keyStep: { event: Block, nth: 2 }
---

FreeRTOS counts time in a variable called `xTickCount`. In the simulated configuration, as on most
32-bit microcontrollers, it is a 32-bit unsigned number. At 1000 ticks per second it reaches its
largest value, `0xFFFFFFFF`, after 49.7 days, and the next tick sets it back to 0. A device that runs
for two months will see that happen, so the kernel must handle it, and so must any application code
that compares tick values.

This page shows how the kernel does it. Waiting 49 days in the simulator would be tedious, so the
scenario starts the count at `0xFFFFFFFA`, six ticks before the wrap, with the configuration option
`configINITIAL_TICK_COUNT`. The tick numbers in the text below count ticks since the start of the run
(tick 0 is the first column of the timeline), with the kernel's own count next to them, as the
controls show it.

## Why a wrap is a problem

A task that delays is put into a [delayed list](/learn/glossary/delayed-list/) sorted by the tick at
which it must wake. On every tick the kernel looks at the front of that list and wakes the tasks
whose time has come. See [tick and delay](/learn/freertos/tick-and-delay/) for the details.

Now suppose the count is `0xFFFFFFFC` and a task calls `vTaskDelay( 6 )`. The wake-up tick is
`0xFFFFFFFC + 6`, which does not fit in 32 bits and wraps to 2. In a single list sorted by value,
2 would come first, before tasks that wake at `0xFFFFFFFD`, and the kernel would think that it is
long overdue.

## Two lists

FreeRTOS keeps two delayed lists, `xDelayedTaskList1` and `xDelayedTaskList2`, and two pointers to
them:

- `pxDelayedTaskList` holds the tasks that wake before the count wraps;
- `pxOverflowDelayedTaskList` holds the tasks that wake after it.

`prvAddCurrentTaskToDelayedList()` chooses between them. It adds the delay to the current count; if
the sum is *smaller* than the count, the addition wrapped, and the task goes into the overflow list.

```kernel freertos:tasks.c#prvAddCurrentTaskToDelayedList
```

Only the `INCLUDE_vTaskSuspend == 1` half is compiled in the simulated configuration. Its first branch
is for waits without a timeout (`portMAX_DELAY`), which go to the suspended list instead. Note that
`xNextTaskUnblockTime`, the cached time of the next wake-up, is only updated for the current list: an
entry in the overflow list cannot be due before the wrap.

## What happens

The two tasks: `Early` (priority 2) works one tick, sleeps two, and works one more. `Late`
(priority 1) works one tick, sleeps six, and works one more.

1. Tick 0, count `0xFFFFFFFA`: `Early` runs.
2. [Tick 1](#sim:event=Block:1), count `0xFFFFFFFB`: `Early` calls `vTaskDelay( 2 )`. It wakes at
   `0xFFFFFFFD`, which does not wrap, so it goes into the current list. `Late` runs.
3. [Tick 2](#sim:event=Block:2), count `0xFFFFFFFC`: `Late` calls `vTaskDelay( 6 )`. The wake-up
   tick wraps to 2, so `Late` goes into the overflow list. Both tasks are delayed and the
   [idle task](/learn/glossary/idle-task/) runs. The kernel structures panel shows one task in each
   list.
4. Tick 3, count `0xFFFFFFFD`: `Early` wakes, runs its last tick and ends.
5. Tick 5, count `0xFFFFFFFF`: the last tick before the wrap. Nothing is due.
6. [Tick 6](#sim:tick=6): `xTaskIncrementTick()` adds one and the count becomes 0. Right after
   storing it, the function checks for exactly this case and calls `taskSWITCH_DELAYED_LISTS()`.
7. [Tick 8](#sim:tick=8), count 2: `Late` is at the front of what is now the current list, its time
   has come, and it wakes and runs.

Step through tick 6 with the step level set to **Line** to watch the two lists change names.

## The swap

```kernel freertos:tasks.c#taskSWITCH_DELAYED_LISTS
```

The macro swaps the two pointers. Nothing is copied: the list that was the overflow list, with `Late`
in it, becomes the current list, and the old current list, now empty, becomes the overflow list for
the next round. The `configASSERT` states why that is safe. Every task in the current list wakes at
some tick no later than `0xFFFFFFFF`, and that tick has just passed, so the list must be empty.

`xNumOfOverflows` counts the wraps. `xTaskCheckForTimeOut()` uses it to tell "the count is smaller
because time has wrapped" from "the count is smaller because the timeout has not started", which is
how a timeout on a mutex or a queue survives the wrap too.

Finally `prvResetNextTaskUnblockTime()` reads the wake-up tick of the new current list's first task,
2, into `xNextTaskUnblockTime`:

```kernel freertos:tasks.c#prvResetNextTaskUnblockTime
```

## In your own code

The kernel handles the wrap, but code that measures time with `xTaskGetTickCount()` has to as well.
Subtract, and compare the difference:

```c
TickType_t start = xTaskGetTickCount();
/* ... */
if( ( xTaskGetTickCount() - start ) >= xTimeout )   /* correct across the wrap */
```

Unsigned subtraction wraps the same way the count does, so the difference is right as long as the
interval is shorter than 2^32 ticks. Comparing the counts themselves (`now >= start + xTimeout`)
breaks near the wrap, and such bugs show up only after 49.7 days of uptime. FreeRTOS V11 can also be
built with a 64-bit tick type (`configTICK_TYPE_WIDTH_IN_BITS`), at the cost of slower tick handling
on a 32-bit CPU.

## Zephyr has no equivalent

Zephyr counts ticks in a 64-bit number. At 1000 ticks per second it would wrap after about 292
million years. Its timeout list does not store absolute wake-up ticks either: each entry holds the
number of ticks after the entry before it (see [tick and delay in Zephyr](/learn/zephyr/tick-and-delay/)).
So there is nothing to swap, and the scenario runs on FreeRTOS only.

## What to try

- Set **Late urgency** to 3. `Late` now runs first and goes into the overflow list at tick 1, while
  the current list is still empty; `Early` follows into the current list. The order of events
  changes, but each task lands in the same list as before, because the list depends only on whether
  its wake-up tick wraps.
