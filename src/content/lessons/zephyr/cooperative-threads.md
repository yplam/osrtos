---
title: Cooperative threads in Zephyr
description: A Zephyr thread with a negative priority is never preempted by another thread. How should_preempt decides it, and when cooperative threads are the right choice.
order: 4
scenario: cooperative-threads
rtos: zephyr
keyStep: { event: Unblock, nth: 5 }
---

In a [preemptive](/learn/preemption/) kernel, a task loses the CPU the moment a more urgent one
becomes ready. Zephyr lets you opt out of that, thread by thread. A thread with a **negative
priority** is *cooperative*: once it runs, no other thread takes the CPU from it. It keeps running
until it gives the CPU up itself, by sleeping, waiting for something, or yielding.

Zephyr's priorities form one scale:

| Priority | Kind | In this scenario |
|---|---|---|
| −16 to −1 | cooperative (`K_PRIO_COOP(0)` to `K_PRIO_COOP(15)`) | `Worker`: −1 |
| 0 to 14 | preemptible (`K_PRIO_PREEMPT(n)`) | `High`: 12, `Low`: 14, the main thread: 0 |
| 15 | the idle thread | |

A lower number is more urgent, so every cooperative priority is above every preemptible one. A
cooperative thread preempts any preemptible thread when it becomes ready; it is only the other way
round that does not happen.

## The three threads

- `Low` (14) starts at once and has six ticks of work.
- `Worker` (−1) sleeps until tick 2, then has four ticks of work, sleeps three ticks, and has one more.
- `High` (12) sleeps until tick 3 and has two ticks of work.

As always on Zephyr, a sleep of *n* ticks ends one tick later than the same `vTaskDelay()` on
FreeRTOS (see [scheduling](/learn/scheduling/#the-tick)), so `Worker` wakes at tick 3 and `High` at
tick 4.

## What happens

1. Tick 0: `Worker` and `High` start and go straight to sleep. `Low` runs ticks 0 to 2.
2. [Tick 3](#sim:tick=3): `Worker` wakes. It is more urgent than `Low`, and `Low` is preemptible, so
   the tick interrupt switches to `Worker`.
3. [Tick 4](#sim:event=Unblock:5): `High` wakes and enters the run queue ahead of `Low`. But the
   thread that is running is `Worker`, and `Worker` is cooperative. `should_preempt()` answers no,
   and `Worker` keeps the CPU. `High` is ready and waits during ticks 4, 5 and 6, although it is more
   urgent than every thread except `Worker`.
4. [Tick 7](#sim:tick=7): `Worker` calls `k_sleep()`. A thread that is going to sleep cannot keep
   the CPU, so the kernel switches to the most urgent ready thread, `High`, which runs ticks 7 and 8
   and ends.
5. `Low` runs ticks 9 and 10.
6. Tick 11: `Worker` wakes and again takes the CPU from `Low`. It works one tick and ends. `Low`
   runs its last tick, 12, and ends.

On FreeRTOS, or with `Worker` given a preemptible priority, `High` would have run at tick 4.

## Where the kernel decides

Every time a thread becomes ready, Zephyr's `update_cache()` picks the best candidate from the
[run queue](/learn/glossary/run-queue/) and asks whether it may replace the thread that is running:

```kernel zephyr:kernel/include/kthread.h#should_preempt
```

Read it in order:

1. `preempt_ok` is set when the running thread asked for a switch itself, as in `k_yield()`.
2. If the running thread can no longer run (it is pending on an object, sleeping or suspended), a
   switch is always allowed. This is how `Worker` gives up the CPU at tick 7.
3. Otherwise a switch is only allowed if the running thread is preemptible, or the new one is a
   special "meta-IRQ" thread (not used here).

The test for "preemptible" is a single comparison. Zephyr stores the thread's 8-bit priority and an
8-bit scheduler-lock count side by side in a 16-bit field, `base.preempt`. A negative priority sets
the top bit of the priority byte, so the field is 0x80 or more and the thread counts as
non-preemptible. `k_sched_lock()` sets the other byte, which makes the field even larger. That is
why a thread that has locked the scheduler behaves exactly like a cooperative thread until it calls
`k_sched_unlock()`. See [scheduler lock](/learn/glossary/scheduler-lock/).

Open the **Kernel** tab of the code panel and step by **Line** through tick 4. The simulator stops
on the line of `should_preempt()` that returns false.

## Interrupts are not threads

Being cooperative protects a thread from other threads, not from interrupts. The tick interrupt
still runs on every tick while `Worker` computes (it is what wakes `High`), and any other interrupt
handler runs too. If a cooperative thread shares data with an interrupt handler, it still needs to
lock interrupts around that data.

Cooperative threads also only work out if they give the CPU up often. A cooperative thread with a
long computation is a priority inversion built into the design: every preemptible thread, however
urgent, waits for it. Long work in a cooperative thread should call `k_yield()` now and then. A
yield from a cooperative thread only lets threads of the same or higher priority run, so to let
preemptible threads in, the thread has to sleep or wait.

## When to use them

- Code that is not safe to interrupt by other threads, without the cost of a mutex: a group of
  threads that share data and only switch at points they choose.
- Short, urgent work, often deferred from an interrupt, that must not be interrupted by application
  threads. Zephyr's own system work queue thread is cooperative by default.
- Porting code written for a cooperative scheduler.

Everywhere else, prefer preemptible threads and protect shared data with a
[mutex](/learn/glossary/mutex/): the scheduler can then keep its promise that the most urgent ready
thread runs.

## And FreeRTOS?

FreeRTOS has no per-task cooperative priority. Its nearest tools are:

- `configUSE_PREEMPTION 0`, which makes the **whole system** cooperative: no task is ever switched
  out by a tick or by another task becoming ready, only when it blocks or yields. The
  [preemption lesson](/learn/preemption/) lets you try it.
- `vTaskSuspendAll()` and `xTaskResumeAll()`, which stop task switches for a section of code while
  interrupts stay on. This is the counterpart of `k_sched_lock()`. The task must not block inside
  the section.
- `taskENTER_CRITICAL()`, which also masks interrupts. It is for very short sections; see
  [critical section](/learn/glossary/critical-section/).
- `vTaskPreemptionDisable()` exists in V11, but only in the multi-core (SMP) build.

## What to try

- Set **High urgency** to 4 or **High starts at tick** to 2. `High` still cannot run while `Worker`
  works: no preemptible priority is high enough.
- Set **Worker starts at tick** to 6. `High` wakes first and runs at once; `Worker` then takes the
  CPU from `Low`, not from `High`, because `High` has already finished.
