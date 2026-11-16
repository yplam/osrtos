---
title: How Zephyr chooses the next thread
description: Zephyr's run queue, next_up and the cache, and how a time slice moves a thread behind its equals, in the real kernel source.
order: 3
scenario: time-slicing
rtos: zephyr
keyStep: { event: ContextSwitch, nth: 2 }
---

Every context switch needs an answer to one question: which thread runs next? The
[scheduling lesson](/learn/scheduling/) gives the rule, the most urgent ready thread. This page reads
how Zephyr v4.5.0 keeps its ready threads so that the answer costs almost nothing, and how
[time slicing](/learn/time-slicing/) makes threads of one priority take turns.

The scenario: three threads `A`, `B` and `C`, all priority 14, each with four ticks of work, and a
[time slice](/learn/glossary/time-slice/) of one tick. In the simulator, set the step level to
**Line**, open the **Kernel** tab and watch `_kernel.ready_q.runq`.

## One sorted queue

Zephyr offers several run queue implementations. The simulated configuration uses the default for
small systems, `CONFIG_SCHED_SIMPLE`: one doubly linked list, `_kernel.ready_q.runq`, holding every
ready thread sorted by priority. (`CONFIG_SCHED_SCALABLE` uses a balanced tree for systems with
many threads, and `CONFIG_SCHED_MULTIQ` an array of lists, one per priority, much like FreeRTOS.)

A thread joins the queue here:

```kernel zephyr:kernel/include/priority_q.h#z_priq_simple_add
```

It walks the queue from the front and inserts the new thread before the first thread that is *less*
urgent (`z_sched_prio_cmp()` returns a positive number when its first argument is more urgent). It
never stops at a thread of the same priority, so a thread joins **behind** its equals: among threads
of one priority the queue is first come, first served.

At start-up the main thread starts the three static threads in the order of their names.
[`B` is added](#sim:event=Unblock:2) behind `A`, and `C` behind `B`. The queue is then `main`, `A`,
`B`, `C`: the main thread, at priority 0, is still running and still in the queue.

That last point is a uniprocessor detail worth knowing: **the running thread stays in the run
queue**. It is not taken out when it starts running, only when it stops being ready. You can see
`A` in the queue the whole time it runs.

## The answer: next_up

```kernel zephyr:kernel/sched.c#next_up
```

Most of the function is for multiprocessor systems and is compiled out (greyed). What remains is
one line: the first thread in the run queue, or the CPU's idle thread if the queue is empty. Because
the running thread is in the queue too, "the first thread" is already the right answer, and nobody
has to compare it with `_current`. The cost of choosing is constant; the cost moves to insertion,
which walks the queue.

`next_up()` is called by `update_cache()`, which also asks `should_preempt()` whether the chosen
thread may take the CPU now, and records the answer in `_kernel.ready_q.cache`. The
[context switch walkthrough](/learn/zephyr/context-switch/) reads both. The short version:

- A preemptible thread that is running loses the CPU as soon as a more urgent one is first in the
  queue.
- A [cooperative thread](/learn/zephyr/cooperative-threads/) (negative priority), or one that holds
  the [scheduler lock](/learn/glossary/scheduler-lock/), keeps the CPU until it gives it up, even
  when it is no longer first. At start-up you can see this: the main thread has locked the
  scheduler, and `should_preempt()` answers no each time a thread is started.

## Taking turns: the slice

The [first switch](#sim:event=ContextSwitch:1) gives the CPU to `A`, the first of the three in the
queue, and starts its slice: `slice_timeout` appears in the timeout list (see
[the tick and k_sleep](/learn/zephyr/tick-and-delay/) for that list). When the slice timer fires,
its function only sets the flag `slice_expired`. At the end of the tick's processing the kernel calls:

```kernel zephyr:kernel/timeslicing.c#z_time_slice
```

If the slice has expired and the current thread can still run, it calls
`move_current_to_end_of_prio_q()`:

```kernel zephyr:kernel/sched.c#move_current_to_end_of_prio_q
```

`runq_yield()` is, for the simple queue:

```kernel zephyr:kernel/include/priority_q.h#z_priq_simple_yield
```

It takes the current thread out of the queue and walks on from where it was, putting it back before
the first less urgent thread: behind every thread of its own priority. Then `update_cache(1)` picks
the new first thread, with `preempt_ok` set because the current thread is giving way on its own.

[At tick 2](#sim:event=ContextSwitch:2) this happens to `A`. The queue goes from `A`, `B`, `C` to
`B`, `C`, `A`. `next_up()` returns `B`, which gets a fresh slice, and the switch itself happens on
the way out of the tick interrupt. At tick 3 `B` moves behind `A`, at tick 4 `C` moves behind `B`,
and so on.

Where FreeRTOS leaves its ready list in place and moves a walking index (see
[how FreeRTOS chooses the next task](/learn/freertos/choosing-the-next-task/)), Zephyr physically
moves the thread to the back. The effect is the same rotation.

If no other thread of the same priority is ready, `z_priq_simple_yield()` puts the thread back where
it was, the cache does not change, and `z_time_slice()` simply starts a new slice for it.

## Why A gets two ticks first

`A` runs ticks 0 and 1, and every slice after that lasts one tick. A slice is a timeout like any
other. `A`'s first slice was started from a thread (the main thread, as it ended), so
`z_add_timeout()` added its usual extra tick: due at 0 + 1 + 1 = 2. Later slices are started inside
the tick's own processing, right on a tick edge, where `slice_reset()` asks for one tick less to
cancel that extra tick, so they last exactly one tick. This was checked on the real kernel.

The extra tick has a visible effect at the end. `A` has done its four ticks of work at tick 8, but at
that moment its slice is also over and it moves behind the others. It only gets the CPU again, and
ends, [at tick 10](#sim:event=TaskEnd:1).

## What to try

- Set the **slice length** to 2. `A` runs ticks 0 to 2, then each thread gets two ticks.
- Turn **Time slicing** off. No slice timer is ever started: `A` runs until it ends at tick 4, then
  `B`, then `C`. A thread of the same priority that becomes ready joins the back of the queue and
  waits.
- Give `B` an urgency of 2 (priority 13). When it is started it is inserted ahead of `A`, and it runs
  ticks 0 to 3 alone. Then `A` and `C` take turns.
