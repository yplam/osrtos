---
title: Events in Zephyr
description: How k_event_wait records what a thread waits for in the thread itself, how k_event_post walks the wait queue and hands each waiter the events that satisfied it, and what the _safe variants clear.
order: 10
scenario: event-group
rtos: zephyr
keyStep: { event: GotBits, nth: 2 }
---

This walkthrough follows the [event groups lesson](/learn/event-groups/) through Zephyr's
`kernel/events.c`. Zephyr's event object, `k_event`, is its event group. Set the step level to
**Line** to follow it.

## What an event object is

`K_EVENT_DEFINE(E)` defines a `struct k_event`:

- `events`: 32 bits, all of them the application's.
- `wait_q`: the threads waiting, sorted by priority like every Zephyr wait queue.

There are four ways to wait: `k_event_wait()` for any of a set of events, `k_event_wait_all()` for
all of them, and the `_safe` variants of each, which consume the events they get (clear them as
the wait ends). Each one calls `k_event_wait_internal()` with its options.

## Waiting

At tick 0 `Upload` calls `k_event_wait_all_safe(&E, BIT_DATA | BIT_LINK, false, K_FOREVER)`.

```kernel zephyr:kernel/events.c#k_event_wait_internal
```

1. `are_wait_conditions_met()` matches the events against the ones the thread wants. It returns
   the events that satisfy the wait, or 0: for "all", 0 unless every one of them is there.
2. Nothing is set, so the thread must wait. It writes what it waits for into its *own* thread
   object (`thread->events` and `thread->event_options`), not into the event object.
3. `z_pend_curr()` puts it in `E.wait_q` and switches away, as for any
   [wait](/learn/zephyr/tick-and-delay/).

`Status` waits with `k_event_wait(&E, BIT_LINK | BIT_ERR, false, K_FOREVER)`. It is less urgent, so
it queues behind `Upload`.

## Posting

At [tick 3](#sim:tick=3) the `Sensor` interrupt calls `k_event_post(&E, BIT_DATA)`, right in the
handler. `k_event_post()` and `k_event_clear()` both go through one function:

```kernel zephyr:kernel/events.c#k_event_post_internal
```

The new events are worked out under a mask: a post sets the bits it names, a clear posts nothing
under the mask of the bits it clears. Then `z_sched_waitq_walk()` calls `event_walk_op()` for
every waiting thread:

```kernel zephyr:kernel/events.c#event_walk_op
```

At tick 3 `DATA` alone satisfies nobody. At tick 7 `Net` posts `LINK`, and both threads match:

- `Upload` gets `DATA | LINK`; `Status`, which wanted any of `LINK` and `ERR`, gets only `LINK`.
  `thread->events` is overwritten with the events that matched: that is what the thread's call will
  return.
- `Upload` consumes its events, so they are added to `clear_events`, to be cleared after the walk;
  `Status` still sees them.
- Each matched thread's timeout is taken out of the timeout list, its return value is set to 0, and
  `z_sched_wake_thread_locked()` takes it out of the wait queue and makes it ready.

After the walk the consumed events are cleared, and `z_reschedule()` switches to `Upload`, the
most urgent thread now ready. In an interrupt handler, `z_reschedule()` does not switch; the
interrupt's exit does.

## Waking up

`Upload` returns from `z_pend_curr()` with 0, reads `thread->events`, and returns `DATA | LINK`.
[`Status`](#sim:event=GotBits:2) returns `LINK`, only what satisfied its wait. FreeRTOS returns the
whole group instead, as it was when the task was woken; with Zephyr's form, the caller does not
have to mask the result.

A wait that times out returns 0: `z_pend_curr()` returns `-EAGAIN`, and the events are not looked
at again. If the events arrive a moment later, they stay set for the next wait (FreeRTOS looks once
more after a timeout and takes them).

## Who clears what

`k_event_wait()` without `_safe` leaves the events set: `Status` could wait for `LINK` again and
return at once. The `reset` argument (`false` here) is different again: it clears *all* events
before the wait starts, so only events posted from then on count. In FreeRTOS terms, `_safe` is
`xClearOnExit`, and `reset` has no counterpart.
