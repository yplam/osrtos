---
title: Priority inversion
description: How a medium-priority task can keep a high-priority task waiting for a lock it has nothing to do with.
order: 4
scenario: priority-inversion
rtos: [freertos, zephyr]
keyStep: { event: Block, nth: 3 }
---

**Priority inversion** is the situation where a high-priority task waits while a lower-priority
task runs. A short inversion is unavoidable whenever tasks share a lock. The dangerous kind is the
one shown above, where the wait has no upper limit.

## The three tasks

- `Low` starts first, takes the binary semaphore `S` as a lock, and needs four ticks of work before
  it gives `S` back.
- `Med` wakes at tick 1 and has six ticks of work. It never touches `S`.
- `High` wakes at tick 2, needs `S` for one tick of work, and is the most urgent task in the system.

## What happens (FreeRTOS)

1. Tick 0: `Low` takes `S` and does the first tick of its work.
2. Tick 1: `Med` wakes and preempts `Low`. That is correct: `Med` is more urgent.
3. Tick 2: `High` wakes and preempts `Med`. It asks for `S`, which `Low` holds, so it blocks.
4. The scheduler now runs the most urgent ready task. That is `Med`, not `Low`.
5. `Med` runs until it is finished, at tick 7. All that time `Low` cannot run, so it cannot
   release `S`, so `High` cannot run.
6. `Low` finally runs ticks 7 to 9 and gives `S` back at tick 10. `High` runs at tick 10.

`High` waited eight ticks. Three of them were for `Low` to finish with the lock, which is the price
of sharing. The other five were for `Med`, a task of lower priority that has nothing to do with the
lock. If `Med` had sixty ticks of work, `High` would have waited sixty-three. Nothing in the
program limits it.

On Zephyr every wake-up is one tick later (see [the scheduling lesson](/learn/scheduling/#the-tick)),
but the result is the same: `High` gets the semaphore at tick 10.

## Why the kernel cannot help here

A binary semaphore has no owner. Any task may give it, not only the one that took it; that is what
makes semaphores useful for signalling from one task to another. So when `High` blocks on `S`, the
kernel has no idea that `Low` is the task everyone is waiting for. In the simulator's kernel
structures panel, the semaphore shows only a count and a list of waiters.

## The best-known case

In 1997 the Mars Pathfinder lander kept resetting itself on the surface of Mars. A high-priority
task that managed its data bus shared a mutex with a low-priority task that collected weather data.
Medium-priority tasks sometimes ran while the low one held the mutex. The bus task waited too long,
a watchdog noticed, and the watchdog reset the computer. The engineers reproduced it on a copy of
the lander on Earth and fixed it by remote update, by turning on an option of the mutex: priority
inheritance.

## The fix

In the simulator, change **S is a** from *binary semaphore* to *mutex* and run it again. `High` now
gets the lock at tick 5. A mutex has an owner, and the kernel uses that knowledge:
[Priority inheritance](/learn/priority-inheritance/) explains how.

## What to try

- Give `Med` an urgency of 1, the same as `Low`. The two now take turns, so `Low` releases the lock
  sooner (at tick 7), but `High` still waits for work that is none of its business.
- Move the start of `Med` to tick 6, after `Low` has released the lock. The inversion needs `Med`
  to arrive while `Low` holds the lock, which is why such bugs show up rarely and are hard to
  reproduce.
