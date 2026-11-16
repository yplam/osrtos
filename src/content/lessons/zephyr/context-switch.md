---
title: The context switch in Zephyr
description: How Zephyr decides that another thread should run, where it actually switches, and what arch_swap does on the native_sim board, in the real kernel source.
order: 2
scenario: preemption
rtos: zephyr
keyStep: { event: ContextSwitch, nth: 3 }
---

A [context switch](/learn/glossary/context-switch/) stops one thread and resumes another where it
left off. Zephyr splits the job into two parts that happen at different times: **deciding** which
thread should run, and **switching** to it. This page reads both in the Zephyr v4.5.0 source. In the
simulator above, set the step level to **Line**, open the **Kernel** tab, and watch two variables
under the kernel structures: `_current` and `_kernel.ready_q.cache`.

The scenario: `Low` (priority 14) computes for eight ticks. `High` (priority 13, more urgent) first
sleeps for three ticks, then computes for two and ends.

## Deciding: the cache

`_current` is the thread the CPU is executing. `_kernel.ready_q.cache` is the thread that *should*
be executing. The scheduler code that changes the [run queue](/learn/glossary/run-queue/) (a thread
made ready, a thread taken out, a thread moved behind its equals) ends with a call to
`update_cache()`:

```kernel zephyr:kernel/sched.c#update_cache
```

It asks `next_up()` for the best thread in the run queue (see
[how Zephyr chooses the next thread](/learn/zephyr/choosing-the-next-task/)) and then asks
`should_preempt()` whether that thread may take the CPU from `_current`:

```kernel zephyr:kernel/include/kthread.h#should_preempt
```

The answer is yes if:

- the caller says so (`preempt_ok`): the current thread is giving up the CPU itself, by sleeping,
  waiting, yielding or ending;
- the current thread cannot run anyway (it is pending, suspended or dead);
- the current thread is preemptible: not a cooperative thread, and not holding a
  [scheduler lock](/learn/glossary/scheduler-lock/).

If the answer is yes, the cache gets the new thread (and, with time slicing on, the new thread gets a
fresh slice). If not, the cache keeps `_current`. Nothing has switched yet. The cache is only a
note: "when you next get the chance, run this one".

## Switching: at a reschedule point

The switch happens at the next **reschedule point**, where the kernel compares the cache with
`_current`. There are three kinds in this run.

**A thread gives up the CPU.** [At tick 0](#sim:event=ContextSwitch:2), `High` calls
`k_sleep(K_TICKS(3))`. `z_impl_k_sleep_ticks()` takes it out of the run queue (the cache becomes
`Low`), adds its timeout, and calls `z_swap_locked()`. A thread that blocks always switches, there
and then.

**An interrupt made another thread ready.** [At tick 4](#sim:event=Unblock:3), the tick wakes
`High`. `ready_thread()` puts it in the run queue and calls `update_cache()`: `High` is more urgent and
`Low` is preemptible, so the cache becomes `High`. But the tick is an interrupt, and Zephyr never
switches threads in the middle of an interrupt handler. The switch waits for the way out:

```kernel zephyr:boards/native/native_sim/irq_handler.c#posix_irq_handler
```

This is the `native_sim` board's model of the interrupt controller. After the handlers have run
(`vector_to_irq()`), and only if no other interrupt is still being handled, it checks
`_kernel.ready_q.cache != _current` and calls `z_swap_irqlock()`.
[That is where `Low` stops](#sim:event=ContextSwitch:3), in the middle of its work. This is
[preemption](/learn/preemption/). On a Cortex-M board the same check happens on interrupt exit
through the PendSV exception, much as in FreeRTOS.

**A thread ends.** [At tick 6](#sim:event=ContextSwitch:4), `High`'s entry function returns, the
kernel aborts the thread, and `z_thread_halt()` switches to `Low`, the thread in the cache.

A fourth kind does not switch in this run, but it is the most common in real programs. A kernel call
that makes *another* thread ready from thread context, such as `k_sem_give()` or `k_mutex_unlock()`,
ends with `z_reschedule()`, which is another name for `reschedule()`:

```kernel zephyr:kernel/sched.c#reschedule
```

`resched()` checks that interrupts were enabled when the caller locked them and that the code is not
in an interrupt; `need_swap()` compares the cache with `_current`. If both are true, the caller is
switched out right there, inside its own `k_sem_give()`. Called from an interrupt handler,
`resched()` is false and the switch is left to the interrupt's exit, as above. At start-up you can
see one `reschedule()` that does not switch: when the main thread unlocks the scheduler, it is still
the most urgent thread, so it continues.

## arch_swap on native_sim

Every switch ends in the architecture's `arch_swap()`. On `native_sim`, the board the simulator
models and the conformance harness runs on, each Zephyr thread is a thread of the host operating
system, and only one of them is allowed to run at a time:

```kernel zephyr:arch/posix/core/swap.c#arch_swap
```

1. It stores the interrupt key and a default return value, `-EAGAIN`, in the outgoing thread.
2. `z_current_thread_set()` makes the cached thread `_current`. The simulator raises the
   **ContextSwitch** event on this line.
3. `posix_swap()` lets the incoming thread's host thread continue and blocks the outgoing one. There
   are no registers to save: as the comment says, the host operating system keeps each thread's
   registers and stack. On real hardware this is where they would be saved and restored.
4. When the outgoing thread is chosen again, possibly much later, `posix_swap()` returns *in that
   thread*. It unlocks interrupts and returns the stored value.

The return value is how a waiting thread learns why it woke. A thread that sleeps or waits gets
`-EAGAIN` unless whoever woke it set something else: `k_sem_give()` wakes a waiter with the value 0,
so the waiter's `k_sem_take()` returns 0; a timeout leaves `-EAGAIN`, and `k_sem_take()` returns
that.

## Decide early, switch late

In FreeRTOS, `vTaskSwitchContext()` chooses the next task inside the switch itself. Zephyr has
already chosen by the time it switches: `arch_swap()` only reads the cache. That keeps the
interrupt-exit path short (one comparison) and means that any number of changes inside one interrupt
cost one switch at most. Compare [the context switch in FreeRTOS](/learn/freertos/context-switch/),
where every switch goes through the PendSV handler.

## What to try

- Step through tick 4 at the **Line** level and watch the two variables: the cache becomes `High`
  in `update_cache()`, several lines before `_current` does in `arch_swap()`.
- Set the step level to **Event**. Switches 2 and 4 come from `High`'s own calls; switch 3 comes from
  the interrupt exit.
