---
title: Timers in Zephyr
description: How a k_timer is a timeout in the same list as every sleeping thread, how its expiry function runs inside the tick interrupt, and how its period is kept from drifting.
order: 9
scenario: software-timers
rtos: zephyr
keyStep: { event: TimerExpire, nth: 1 }
---

This walkthrough follows the [software timers lesson](/learn/software-timers/) through Zephyr's
`kernel/timer.c`. Where FreeRTOS gives timers a task of their own, a Zephyr timer is only an entry
in the kernel's timeout list, the same list that wakes sleeping threads. Set the step level to
**Line** to follow it.

## What a timer is

`K_TIMER_DEFINE(Blink, Blink_expiry, NULL)` defines a `struct k_timer` at build time. The fields
that matter here are on the timer card in the kernel panel:

- `timeout`: a `struct _timeout`, the entry it puts in the timeout list.
- `period`: how long until the next expiry after one has happened; `K_NO_WAIT` for a one-shot
  timer.
- `status`: how many times it has expired since it was started (or since `k_timer_status_get()`
  last read it).
- `expiry_fn` and `stop_fn`: the functions called when it expires and when it is stopped. Here
  `stop_fn` is `NULL`.
- `wait_q`: threads blocked in `k_timer_status_sync()` until the next expiry. Nobody waits here.

## Starting it

`main()` calls `k_timer_start(&Blink, K_TICKS(4), K_TICKS(4))`: the first expiry 4 ticks from now,
then every 4 ticks. Zephyr's main thread runs `main()` after it has started the static threads, at
tick 0.

```kernel zephyr:kernel/timer.c#z_impl_k_timer_start
```

A timer that is running is first taken out of the timeout list by `z_try_abort_timeout()`, so
starting it again restarts it. Then `z_add_timeout()` puts its timeout in the list, exactly as a
thread's `k_sleep()` does:

```kernel zephyr:kernel/timeout.c#z_add_timeout
```

The duration is relative and the call comes from a thread, which may be anywhere inside the
current tick, so one tick is added to make the wait *at least* 4 full ticks: the timer is due at
0 + 4 + 1 = 5. The timeout list in the kernel panel shows `Blink` beside the threads that sleep,
each entry with the ticks it waits after the entry before it (`dticks`).

## Expiring

At [tick 5](#sim:tick=5) the timer interrupt calls `sys_clock_announce()`. It moves the tick count
on and calls the handler of every timeout that is now due:

```kernel zephyr:kernel/timeout.c#sys_clock_announce_locked
```

For a timer the handler is `z_timer_expiration_handler()`, and it runs right there, in the
interrupt:

```kernel zephyr:kernel/timer.c#z_timer_expiration_handler
```

1. The period is not `K_NO_WAIT`, so the timer is started again first. With
   `CONFIG_TIMEOUT_64BIT` the next expiry is an **absolute** tick: the uptime plus the period.
   Inside the tick's processing, the uptime is exactly the tick the timer was due (5), so the next
   expiry is tick 9, with no extra tick. If the interrupt itself came late, the timer would still
   keep its rhythm.
2. `status` counts the expiry.
3. `expiry_fn` runs: `Blink_expiry()` gives `S`. It is an interrupt handler, so `k_sem_give()`
   readies `Handler` and hands it the semaphore, but does not switch threads.
4. Any thread in `k_timer_status_sync()` would be woken now.

The switch to `Handler` comes when the interrupt returns, in `posix_irq_handler()`, as for any
[interrupt](/learn/zephyr/interrupts/). At tick 9 the same happens while `Worker` runs, and
`Handler`, less urgent, waits for it.

So the first expiry gets the extra tick, because the timer was started from a thread, and the
later ones do not: Blink expires at 5, 9 and 13, every 4 ticks after the first. On FreeRTOS the
same program expires at 4, 8 and 12.

## Stopping it

`Keys` sleeps until tick 13 (plus the extra tick: it wakes at 14) and calls `k_timer_stop()`:

```kernel zephyr:kernel/timer.c#z_impl_k_timer_stop
```

`z_try_abort_timeout()` takes the timeout out of the list, and the expiry that was due at tick 17
is gone. A timer that was not running is left alone. With a `stop_fn`, it would be called now, in
the stopping thread; then any thread in `k_timer_status_sync()` is woken, since the timer will not
expire again.

## What it costs, and what it buys

A timer costs one `struct k_timer` and no thread. Its expiry function runs in the timer interrupt,
so it runs on time whatever the threads are doing, and nothing is queued or delayed behind a
busy task. The price is that it runs with the restrictions of an interrupt handler: it must not
block, and it delays every thread and every other timeout due on that tick. Work that takes time
belongs in a thread, which the expiry function wakes, as `Blink_expiry()` does by giving `S`. For
work that must run in a thread, Zephyr also has the system work queue: `k_work_schedule()` runs a
function after a delay in the work queue's thread, which is close to what FreeRTOS's timer
service task does.
