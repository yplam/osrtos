---
title: The tick and k_sleep in Zephyr
description: How k_sleep puts a thread on Zephyr's timeout list, why it wakes one tick later than asked, and how the tick announcement wakes it, in the real kernel source.
order: 1
scenario: blocking-idle
rtos: zephyr
keyStep: { event: Unblock, nth: 3 }
---

This page follows a sleep through the Zephyr source, as it is in v4.5.0: what `k_sleep()` does
when a thread asks to sleep, and what the [tick](/learn/glossary/tick/) does to wake it. The
[scheduling lesson](/learn/scheduling/) explains the idea. In the simulator above, set the step
level to **Line** and open the **Kernel** tab of the code panel.

The scenario has two threads. `Sensor` (priority 13) works for one tick and calls
`k_sleep(K_TICKS(4))`, twice. `Logger` (priority 14) works for two ticks, sleeps for six and works
for two more. In Zephyr a lower number is a more urgent [priority](/learn/glossary/priority/).

## One list for every kind of waiting

FreeRTOS has [delayed lists](/learn/glossary/delayed-list/) for tasks. Zephyr has something more
general: a single **timeout list** of `struct _timeout` entries, each with a function to call when it
expires. A sleeping thread is one entry (its function is `z_thread_timeout()`). A thread waiting for
a mutex with a time limit is another. The [time slice](/learn/glossary/time-slice/) timer is
another, and so are `k_timer` objects. The simulator's kernel structures panel shows this list as
`timeout_list`, with the slice timer as `slice_timeout`.

## k_sleep

`k_sleep()` is an inline function that calls the system call `k_sleep_ticks()`, which ends up here:

```kernel zephyr:kernel/sleep.c#z_impl_k_sleep_ticks
```

[At tick 1](#sim:event=Block:1), `Sensor` calls it. Reading from the top, past the `K_NO_WAIT` case
(which is a yield):

1. `z_sched_unready_locked(_current)` takes `Sensor` out of the run queue. Taking the running thread
   out is a reschedule point, so the scheduler also picks the next thread here: `Logger`. It is
   *recorded* as the next to run in `_kernel.ready_q.cache`; the switch itself comes at the end.
   Because a different thread will run, `Logger` gets a fresh time slice, which means the slice
   timer is removed from the timeout list and added again.
2. `z_add_thread_timeout()` adds `Sensor`'s own entry to the timeout list.
3. `z_mark_thread_as_sleeping()` sets a state flag. A sleeping thread is in no list at all except
   the timeout list; you can see the flag in `thread_state` on its task card.
4. `z_swap_locked()` switches to `Logger`. For `Sensor` the call returns when it runs again, and the
   function works out how many ticks were left (zero unless something woke it early with
   `k_wakeup()`).

## The extra tick

Every relative timeout goes through `z_add_timeout()`:

```kernel zephyr:kernel/timeout.c#z_add_timeout
```

The line that matters is the one that computes `dticks`:

```c
dticks = timeout.ticks + ticks_elapsed + (this_cpu_announcing() ? 0 : 1);
```

A thread calls `k_sleep()` at some moment *inside* a tick. If the kernel counted from the next tick
edge, a sleep of 4 could last only a little more than 3 tick periods. Zephyr promises at least the
time asked for, so it adds one tick. `Sensor` asked for 4 at tick 1 and will wake at 1 + 4 + 1 = 6.
FreeRTOS does not add the tick, so the same program wakes at tick 5 there; see
[the FreeRTOS version of this page](/learn/freertos/tick-and-delay/). In the simulator each call is
made right after a tick, so on Zephyr the sleep lasts exactly five periods.

The exception is a timeout added *while* the tick is being processed. Then "now" is exactly on a
tick edge and nothing is added. You will see both cases in the simulator's notes on the
`round-up` line: `Sensor`'s slice, set up while the tick wakes it at 6, gets no extra tick; a slice
set up from a thread gets one. A slice that `z_time_slice()` starts again after the timeouts have
run gets the extra tick too, but `slice_reset()` asks for one tick less to cancel it, so it also
lasts exactly one tick.

## The timeout list stores differences

```kernel zephyr:kernel/timeout/list.h#z_timeout_q_insert
```

The list is sorted by expiry, but no entry stores its expiry tick. Each stores `dticks`, the number
of ticks *after the entry before it*. Insertion walks the list subtracting each entry's `dticks`
from the new one until it finds a later entry, inserts there, and takes its own remainder off that
entry.

[At tick 3](#sim:event=Block:2), `Logger` goes to sleep for 6 ticks, until tick 10. The list then
holds `Sensor` (expires at 6, `dticks 3`) and `Logger` (expires at 10, `dticks 4`): 3 + 4 = 7 ticks
from tick 3. The simulator shows the expiry tick for reading and the stored `dticks` next to it.

The point of storing differences is the tick: only the first entry has to change.

## The tick announcement

On `native_sim` the system timer interrupt is delivered through `posix_irq_handler()`. The timer
driver's handler takes the timeout lock and tells the kernel how many ticks have passed (always one
here, because the simulated kernel is not tickless):

```kernel zephyr:kernel/timeout.c#sys_clock_announce_locked
```

The loop advances time towards the next event. `z_timeout_q_advance()` takes the elapsed ticks off
the first entry's `dticks`, and `curr_tick` grows. Then every entry whose `dticks` is now 0 is
removed and its function is called, with the timeout lock released so that the function may add
new timeouts. After the loop, `z_time_slice()` checks whether the running thread's time slice has
run out.

[At tick 4](#sim:tick=4) nothing is due: `Sensor`'s entry goes from `dticks 3` to `dticks 2` and that
is all. Zephyr's tick count, `curr_tick`, is 64 bits wide here (`CONFIG_TIMEOUT_64BIT`), so unlike
FreeRTOS it needs no second list for the wrap; see the
[tick overflow walkthrough](/learn/freertos/tick-overflow/).

## Waking up

[At tick 6](#sim:event=Unblock:3), `Sensor`'s entry reaches 0. Its function runs:

```kernel zephyr:kernel/sched.c#z_thread_timeout
```

```kernel zephyr:kernel/sched.c#z_sched_wake_thread_locked
```

`z_sched_wake_thread_locked()` is shared by every kind of timeout on a thread. If the thread was
waiting for an object, it is first taken off that object's [wait queue](/learn/glossary/wait-queue/)
(it gave up waiting). Then it is no longer sleeping, and `ready_thread()` puts it into the
[run queue](/learn/glossary/run-queue/) and updates the cache. `Sensor` is more urgent than the idle
thread, so it becomes the next to run; it also gets a new time slice, added from inside the tick and
so due one tick later, at 7.

The interrupt handler does the switch on its way out: it compares `_kernel.ready_q.cache` with
`_current` and calls `z_swap_irqlock()`. See [the context switch in Zephyr](/learn/zephyr/context-switch/).

## The time slice timer

Between the sleeps you can watch the other kind of entry. [At tick 3](#sim:tick=3), before `Logger`
sleeps, its slice timer is due. `slice_timeout()` only sets the flag `slice_expired`; `z_time_slice()`
then finds no other thread of priority 14 to give the CPU to and starts a new slice. The
[Zephyr scheduler walkthrough](/learn/zephyr/choosing-the-next-task/) follows a slice that does move
a thread.

## What to try

- Set the step level to **Tick** and step from tick 3 to tick 6: the first entry's `dticks` counts
  down, the second never changes.
- Compare the wake-up ticks with the FreeRTOS page: each wake-up here is one tick later, and so
  everything after it shifts.
