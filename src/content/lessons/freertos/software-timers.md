---
title: Software timers in FreeRTOS
description: How the timer service task keeps its list of active timers, sleeps until the next one is due, runs the callbacks and processes the commands that xTimerStart and xTimerStop send it.
order: 11
scenario: software-timers
rtos: freertos
keyStep: { event: TimerStop, nth: 1 }
---

This walkthrough follows the [software timers lesson](/learn/software-timers/) through FreeRTOS's
`timers.c`. Everything about software timers in FreeRTOS happens in one task, the **[timer service
task](/learn/glossary/timer-service-task/)**: other tasks only send it commands. Set the step level
to **Line** to follow it.

## What a timer is

`xTimerCreate()` allocates a `Timer_t` and fills it in:

- `xTimerPeriodInTicks`, here 4.
- `ucStatus`: `tmrSTATUS_IS_AUTORELOAD` for an auto-reload timer, and `tmrSTATUS_IS_ACTIVE` while
  it runs. The timer card in the kernel panel shows both.
- `xTimerListItem`: the list item that links it into a list of active timers, with its expiry
  tick as the item's value.
- `pxCallbackFunction`, the callback.

The first `xTimerCreate()` also calls `prvCheckForValidListAndQueue()`, which sets up what the
timer service task works with: two lists of active timers, `xActiveTimerList1` and
`xActiveTimerList2`, and `xTimerQueue`, the command queue, `configTIMER_QUEUE_LENGTH` (here 5)
commands long. One list, `pxCurrentTimerList`, holds the timers due before the tick count wraps,
sorted by expiry; the other holds those due after it. This is the same trick as the two
[delayed lists](/learn/freertos/tick-overflow/).

The task itself is created by `vTaskStartScheduler()`, right after the idle task, when
`configUSE_TIMERS` is 1. It runs at `configTIMER_TASK_PRIORITY`, 4 here, above every task of the
scenario.

## Commands, not calls

`main()` calls `xTimerStart( xBlink, 0 )` before the scheduler starts. That does not start
anything. `xTimerStart()` is a macro for `xTimerGenericCommand()` with the command
`tmrCOMMAND_START` and the tick count of *now* as its value:

```kernel freertos:timers.c#xTimerGenericCommandFromTask
```

The message goes to the back of `xTimerQueue` with `xQueueSendToBack()`. Before the scheduler
runs nobody may wait, so it is sent with no block time; from a task it waits for room as long as
the caller allows. In the kernel panel the command shows in the queue as `start(Blink, 0)`.

Sending the tick count of the call matters: when the timer task gets round to the command, it
counts the period from the moment `xTimerStart()` was called, not from the moment it processes the
command. A start that is processed late still expires on time.

## The timer service task

The task's loop is three lines:

```kernel freertos:timers.c#prvTimerTask
```

`prvGetNextExpireTime()` reads the head of `pxCurrentTimerList`: the next timer due, or none.
Then `prvProcessTimerOrBlockTask()` either runs the timer that is due, or waits:

```kernel freertos:timers.c#prvProcessTimerOrBlockTask
```

At tick 0 no timer is active yet (the start command has not been processed), so the task waits
for a command with no time limit. But a command is already waiting, so
`vQueueWaitForMessageRestricted()` does not block, and the loop goes on to
`prvProcessReceivedCommands()`.

## Processing a command

```kernel freertos:timers.c#prvProcessReceivedCommands
```

The loop takes commands from the queue without waiting until it is empty. For `start(Blink, 0)`
it takes `Blink` out of any list it is in, marks it active, and calls
`prvInsertTimerInActiveList()` with the expiry `0 + 4`:

```kernel freertos:timers.c#prvInsertTimerInActiveList
```

Tick 4 is ahead, so `Blink` goes into `pxCurrentTimerList`. The function returns `pdTRUE` only
when the expiry has already passed, which happens when the command waited in the queue for a
whole period; the timer is then processed at once.

Back at the top of the loop, `prvGetNextExpireTime()` now finds `Blink` due at tick 4.
`prvProcessTimerOrBlockTask()` calls `vQueueWaitForMessageRestricted()` with a block time of 4.
That puts the task in the queue's `xTasksWaitingToReceive` list *and* in the delayed list until
tick 4: it wakes either when a command arrives or when the timer is due, whichever comes first.
The task card shows it blocked on `xTimerQueue`.

## An expiry

At [tick 4](#sim:tick=4) the tick takes the timer task out of the delayed list, and it is the most
urgent task, so it runs. This time `prvProcessTimerOrBlockTask()` finds the expiry time reached and
calls `prvProcessExpiredTimer()`:

```kernel freertos:timers.c#prvProcessExpiredTimer
```

`Blink` reloads, so `prvReloadTimer()` puts it back first, due one period after the expiry it is
processing (4 + 4 = 8): counted from when it was due, so the period does not drift even if the
task ran late. Only then is the callback called, in the timer task's own context, at its priority.
`vBlinkCallback()` gives `S`, which readies `Handler`, and the loop goes round to wait until tick 8.

If the task ran so late that the next expiry has passed too, `prvReloadTimer()` calls the callback
once for each missed expiry before it finds one in the future. Set **Timer task urgency** to 2 and
see the tick-8 callback run at tick 11, with the next expiry still at 12.

## A stop

At [tick 13](#sim:event=TimerStop:1) `Keys` calls `xTimerStop()`. The command `stop(Blink)` goes
into the queue, which wakes the timer task from its wait. It is more urgent than `Keys`, so it runs
before `xQueueSend()` even returns to `Keys`. `prvProcessReceivedCommands()` takes `Blink` out of
the list and clears `tmrSTATUS_IS_ACTIVE`; there is nothing more to do for a stop. With no timer
active, the task waits for a command with no time limit, in `xSuspendedTaskList`.

## What it costs

A timer costs a `Timer_t` and nothing else: one task and one queue serve every timer. The price is
that everything is serialised through that task. A long callback delays every other callback and
every command, and a timer task below a busy task delays them all. An interrupt can also send
commands, through `xTimerStartFromISR()` and friends, and so does
[`xEventGroupSetBitsFromISR()`](/learn/freertos/event-groups/), which hands its work to this task.
