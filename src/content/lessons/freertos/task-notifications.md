---
title: Task notifications in FreeRTOS
description: How a task notification signals a task directly, without a semaphore, how the count tells the task how many signals it got, and what Zephyr offers instead.
order: 13
scenario: task-notification
rtos: freertos
keyStep: { event: NotifyTake, nth: 2 }
---

Most signals in a program go to one task that is known in advance: the UART interrupt always wakes
the UART handler. A [semaphore](/learn/semaphores/) does that job, but it is an object of its own,
with a queue structure, a list of waiters and a call through `xQueueGenericSend()`. FreeRTOS has a
lighter way: every task has a **[notification](/learn/glossary/task-notification/)** value of its
own, and anyone who has the task's handle can signal the task directly.

- `xTaskNotifyGive( xHandler )` adds one to `Handler`'s notification value, and wakes `Handler` if
  it is waiting for a notification. From an interrupt: `vTaskNotifyGiveFromISR()`.
- `ulTaskNotifyTake( xClearCountOnExit, xTicksToWait )` waits until the value is not zero, and
  returns it. With `pdTRUE` the value goes back to 0, so one take collects every notification that
  came; with `pdFALSE` it goes down by one, which makes it a counting semaphore.

There is no object to create, and no list of waiters: only the task itself can wait for its
notifications. That is the limit: a notification has one receiver, and it cannot be shared by two
waiting tasks the way a semaphore can.

## The scenario

- `Handler` (urgency 3) loops for ever: it takes its notifications with `pdTRUE` and works three
  ticks on them.
- `Main` (urgency 2) computes for five ticks, notifies `Handler`, and computes for four more.
- The `UART` interrupt notifies `Handler` at ticks 3, 4 and 5.

## What happens

1. Tick 0: `Handler` calls `ulTaskNotifyTake()`. Its value is 0, so it waits: its notify state
   becomes `taskWAITING_NOTIFICATION` and, with no timeout, it goes into `xSuspendedTaskList`. It is
   in no object's waiting list, because there is no object. Its task card shows
   `ulNotifiedValue 0`.
2. Tick 3: the interrupt notifies it. `vTaskNotifyGiveFromISR()` adds one to the value, sees that
   `Handler` was waiting, moves it to its ready list and sets `xHigherPriorityTaskWoken`.
   `portYIELD_FROM_ISR()` switches to it as the interrupt returns. `Handler` takes the value, 1, and
   clears it.
3. Ticks 4 and 5: two more interrupts. `Handler` is busy, not waiting, so each one only adds one:
   the value is 2. Nobody is woken, and nothing is lost.
4. [Tick 6](#sim:event=NotifyTake:2): `Handler` loops and calls `ulTaskNotifyTake()` again. The
   value is 2, so it does not wait: it returns **2** and clears the value. One pass of `Handler`
   learns that two interrupts happened.
5. Tick 9: `Handler` waits again, and `Main` runs. At tick 11 `Main` notifies `Handler` with
   `xTaskNotifyGive()`; `Handler` is more urgent and preempts it straight away.

Compare the [deferred interrupt lesson](/learn/interrupts/) with **Yield from ISR** off, where a
binary semaphore given twice before the handler took it simply stayed given: the second interrupt
was lost. A notification taken with `pdTRUE` behaves like a binary semaphore that still says how
many gives it missed.
With `pdFALSE` it is a counting semaphore: `Handler` would wake once per notification, and take
them one at a time.

## Why it is lighter

The kernel code is short. `xTaskGenericNotify()` sets the target's state to
`taskNOTIFICATION_RECEIVED`, adds one to its value, and, if the target was waiting, moves it from
its delayed or suspended list to its ready list:

```kernel freertos:tasks.c#xTaskGenericNotify
```

The wait is just as short. There is no object to lock and no waiting list to join: the task marks
itself as waiting and goes into a delayed list, or with no timeout into `xSuspendedTaskList`.

```kernel freertos:tasks.c#ulTaskGenericNotifyTake
```

Step through a take and a give at the **Line** level and count the steps, then do the same in the
[semaphores lesson](/learn/semaphores/). The FreeRTOS documentation quotes notifications as
considerably faster and smaller than a binary semaphore, and the source shows why. The price is
generality: one receiver, which must be known by handle, and no priority inheritance (a
notification is not a [mutex](/learn/glossary/mutex/)).

The same value can also carry data instead of a count: `xTaskNotify()` with `eSetBits` makes it a
small event group, and with `eSetValueWithOverwrite` a mailbox of one 32-bit value. The simulator
models the give-and-take form only.

## Suspending a waiting task

The notify state has to be kept right when a waiting task is suspended. `vTaskSuspend()` sets it
back to `taskNOT_WAITING_NOTIFICATION`: the task was waiting, but now it is suspended, so a
notification must not wake it. And `vTaskResume()` must not resume a task that only *looks*
suspended because it waits for a notification without a timeout (it is in `xSuspendedTaskList`
too): `prvTaskIsTaskSuspended()` checks the notify state before it says yes.

## What Zephyr offers instead

Zephyr has no per-thread notification. The usual replacements:

- A `k_sem` that only one thread takes, defined next to that thread. It costs a small object, and
  gives the same counting behaviour (`k_sem_take()` takes one; `k_sem_reset()` clears the count).
- A [`k_event`](/learn/zephyr/events/), when the signal should carry a few bits rather than a
  count.
- `k_poll()` with a `k_poll_signal`, when one thread waits for several sources.

None of them is attached to the thread: the sender needs the object, not the thread's handle.

## What to try

- Untick **Yield from ISR**: at tick 3 `Handler` is woken but not switched to. It runs only at
  tick 4, when the tick finds the switch pending; by then the tick-4 interrupt has notified it
  again, and its first take returns 2.
- Lower **Handler urgency** to 1: `Main` runs first and keeps the CPU until it ends at tick 9.
  `Handler` has not even started to wait, but nothing is lost: its first take returns 4, the
  three interrupts and `Main`'s notification. A notification sent before the receiver waits is
  kept, like a semaphore given before anyone takes it.
