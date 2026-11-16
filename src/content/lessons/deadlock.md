---
title: Deadlock
description: Two tasks, two mutexes, taken in opposite order. Why neither kernel notices, and how to design it away.
order: 10
scenario: deadlock
rtos: [freertos, zephyr]
keyStep: { event: Deadlock, nth: 1 }
---

A **deadlock** is a set of tasks in which each one waits for something that another one in the set
holds. None of them can ever run again. The rest of the system carries on, which makes a deadlock
look like a feature that silently stopped working.

## The program

Two tasks and two mutexes, `A` and `B`.

- `Low` locks `B`, works for two ticks, then locks `A`.
- `High` starts one tick later, locks `A`, works for one tick, then locks `B`.

Each task takes both mutexes, in the opposite order. This is known as the ABBA pattern.

## What happens (FreeRTOS)

1. Tick 0: `Low` locks `B`.
2. Tick 1: `High` wakes, preempts `Low` and locks `A`.
3. Tick 2: `High` asks for `B`. `Low` holds it, so `High` blocks. `Low` inherits the priority of
   `High`, which does not help.
4. `Low` runs its second tick of work and, at tick 3, asks for `A`. `High` holds it, so `Low`
   blocks.

From tick 3 the timeline shows both tasks blocked and the idle task running, until the simulation
stops. Under the mutexes, the simulator draws **who waits for whom**: `Low` waits for `A`, held by
`High`, which waits for `B`, held by `Low`. A closed chain is a deadlock.

## The kernel does not notice

The simulator reports the deadlock. The kernels do not. To either kernel these are two tasks that
are legitimately blocked; all its lists are consistent. A watchdog that is fed by the idle task, or
by any task not in the cycle, keeps being fed.

Zephyr can check for this. With `CONFIG_MUTEX_DEADLOCK_DETECT`, `k_mutex_lock()` follows the chain
of owners (the same walk it does for [priority inheritance](/learn/zephyr/priority-inheritance/))
and fails an assertion if the chain leads back to the caller and every wait in it is without a
timeout. The option is only on by default when assertions are enabled, so a debug build stops at the
deadlock and a release build does not. The simulator models the release configuration.

Priority inheritance is no cure: it shortens waits that will end. Here `Low` is raised to the
priority of `High` and still has nothing it can do.

## Why it is hard to find in testing

The deadlock needs `High` to arrive in the window where `Low` holds `B` but not yet `A`. In the
simulator, set the start of `High` to tick 4. `Low` is finished with both mutexes by then, and the
program runs to its end. The same code, with different timing, works. On real hardware that window
may be a few microseconds wide and be hit once a month.

## How to design it away

- **Lock ordering.** Give every mutex a rank and always take them in rank order. If both tasks took
  `A` before `B`, the second task would block on `A` and wait; a closed chain cannot form. This is
  the standard answer, and it works as long as everybody follows it.
- **One lock.** If two resources are always used together, protect them with one mutex.
- **A timeout.** Take the second mutex with a timeout. If it runs out, release the first mutex and
  try again later. The [mutex timeout lesson](/learn/mutex-timeout/) shows what
  each kernel does with the inherited priority when a wait times out.
- **No lock.** Give the resource to one task and let the others send it messages.

## What to try

- Move the start of `High` to 4 and watch the program complete; then move it back and step by
  **Event** to the moment the chain closes.
- Break on **Deadlock** and press *Run to breakpoint*.
