---
title: Priority inheritance
description: How a mutex bounds priority inversion by lending the waiter's priority to the task that holds the lock.
order: 6
scenario: priority-inversion-mutex
rtos: [freertos, zephyr]
keyStep: { event: PrioChange, nth: 1 }
---

[Priority inversion](/learn/priority-inversion/) happens because the kernel does not know which
task a blocked task is waiting for. A **mutex** records its owner, so the kernel does know, and it
can do something about it: while a more urgent task waits for a mutex, the task that holds the mutex
runs at the waiter's priority. This is **priority inheritance**.

The simulator above runs the same three tasks as the priority inversion lesson. The only change is
that the lock `M` is a mutex.

## What happens (FreeRTOS)

1. Tick 0: `Low` takes `M` and does the first tick of its work.
2. Tick 1: `Med` wakes and preempts `Low`.
3. Tick 2: `High` wakes, preempts `Med` and asks for `M`. `Low` holds it.
4. Before `High` blocks, the kernel raises `Low` from priority 1 to priority 3, the priority of
   `High`. The task card shows `1 → 3`, and the `Low` chip moves to the ready list of priority 3.
5. `High` blocks. The most urgent ready task is now `Low`, not `Med`.
6. `Low` runs ticks 2, 3 and 4 and gives `M` back at tick 5. Its priority returns to 1 at that
   moment.
7. `High` takes `M`, runs at tick 5 and ends.
8. `Med` gets the CPU at tick 6.

`High` waited three ticks: exactly the time `Low` still needed inside its critical section. `Med`
no longer has any say in it. With the semaphore the wait was eight ticks and grew with the work of
`Med`.

## What inheritance promises, and what it does not

The wait of the high-priority task is now bounded by the length of the critical sections of the
tasks it shares mutexes with. It is not zero. The rule that follows for the application is: **keep
the time a mutex is held short**, and never sleep or wait for something slow while holding one.

Inheritance also has a cost on the other side: `Med` was delayed by `Low`, a task less urgent than
itself. That is the intended effect, but it means the timing of every task between the holder and
the waiter depends on the critical section too.

## The two kernels do it differently

Switch between FreeRTOS and Zephyr in the simulator and step through tick 2 (tick 3 on Zephyr,
where every wake-up is a tick later).

- **FreeRTOS** stores the task's own priority in `uxBasePriority` and the priority it runs at in
  `uxPriority`. It restores the base priority only when the task holds **no** mutex at all
  (`uxMutexesHeld` is 0). See the [FreeRTOS walkthrough](/learn/freertos/priority-inheritance/).
- **Zephyr** keeps a list of the mutexes each thread holds. Every time one is unlocked it works the
  priority out again from the waiters of the mutexes that remain, and it raises a whole chain of
  owners if the holder is itself waiting for another mutex. See the
  [Zephyr walkthrough](/learn/zephyr/priority-inheritance/).
- When the mutex is unlocked, Zephyr makes `High` its owner before `High` has run; FreeRTOS only
  makes `High` ready. [Mutex handoff](/learn/mutex-handoff/) shows a program where that changes the
  outcome.

The difference in when the priority drops shows with nested mutexes. In the
[nested mutexes scenario](/learn/playground/?scenario=nested-mutexes), `Low` holds two mutexes and
`High` waits for the inner one. On Zephyr, `Low` drops back as soon as it releases that one. On
FreeRTOS it keeps the raised priority until it has released both.

## What to try

- Change **M is a** to *binary semaphore* to get the inversion back.
- Give `Med` an urgency of 4, above `High`. Inheritance changes nothing now, and it should not:
  `Med` is entitled to run before both.
