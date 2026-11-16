---
title: Periodic sleep in Zephyr
description: How k_sleep with an absolute timeout keeps a periodic thread on a fixed grid, why it gets no extra tick, and what happens when the end of the period has already passed.
order: 7
scenario: periodic-tasks
rtos: zephyr
keyStep: { event: Block, nth: 2 }
---

The [periodic tasks lesson](/learn/periodic-tasks/) shows why a periodic thread should sleep until
the next period instead of for a fixed time. Zephyr has no `xTaskDelayUntil()`; the application
keeps the time itself and sleeps to an **absolute** timeout. In the simulator, `Sensor` is the
periodic thread:

```c
int64_t next = k_uptime_ticks();
for (;;) {
    compute(2);
    next += 5;
    k_sleep(K_TIMEOUT_ABS_TICKS(next));
}
```

`next` is the application's own variable; the thread's card shows it. Absolute timeouts need
`CONFIG_TIMEOUT_64BIT`, which is on by default: ticks are counted in 64 bits and never wrap in
practice.

## The starting point

```kernel zephyr:kernel/timeout.c#sys_clock_tick_get
```

`k_uptime_ticks()` returns `curr_tick` plus the time since the last announced tick, which is zero
when the kernel is not tickless. `Sensor` reads 0.

## The same sleep, a different timeout

[At tick 2](#sim:event=Block:2) `Sensor` sleeps until tick 5. `k_sleep()` does exactly what it does
for a relative sleep, described in [the tick walkthrough](/learn/zephyr/tick-and-delay/): take the
thread out of the run queue, add a timeout, mark it sleeping, switch.

```kernel zephyr:kernel/sleep.c#z_impl_k_sleep_ticks
```

The difference is all in `z_add_timeout()`:

```kernel zephyr:kernel/timeout.c#z_add_timeout
```

- A **relative** timeout takes the `Z_IS_TIMEOUT_RELATIVE` branch. Outside the tick's own
  processing, "now" may be anywhere inside the current tick, so the kernel adds one tick to make
  sure the thread sleeps at least the time it asked for. That is the extra tick of `k_sleep(K_TICKS(5))`.
- An **absolute** timeout takes the `else` branch: `dticks = Z_TICK_ABS(timeout.ticks) - curr_tick`,
  5 − 2 = 3. Nothing is added. A point in time is a tick edge, not a length of time, so there is
  nothing to round.

So `Sensor` wakes at 5, 10, 15… exactly, while `Poll`, which sleeps with `k_sleep(K_TICKS(5))`, gets
6 ticks every time and drifts more than it does on FreeRTOS. Watch the timeout list: `Sensor`'s
entry stores the 3 ticks of `dticks`, which is all the list ever keeps.

## When the end of the period has passed

`Burst` wakes at tick 12 and runs until 16. `Sensor`'s third job, released at 10, has done its work
by tick 12 but is preempted before it reaches its sleep, and the job
[misses its deadline at tick 14](#sim:event=DeadlineMiss:1). At tick 16 it calls
`k_sleep(K_TIMEOUT_ABS_TICKS(15))`:

- `dticks` = 15 − 16 = −1.
- `dticks = max(1, dticks)` makes it 1. A timeout cannot fire in the past or at the current tick,
  which has already been announced, so it fires on the next tick.
- `Sensor` sleeps until tick 17 and starts its fourth job there.

FreeRTOS's `xTaskDelayUntil()` would not have slept at all. On Zephyr the thread always gives up the
CPU for at least one tick, which lets the threads it held back run in between, at the price of one
more tick of lateness. Either way the grid survives: the application added exactly one period to
`next`, so the following wake-ups are 20, 25 and 30.

The kernel does not see the missed deadline: it only sees a timeout in the past. A thread that
needs to know can compare `k_uptime_ticks()` with `next` before it sleeps. Zephyr also has
`k_timer`, a kernel timer that can wake a thread periodically; that is the subject of a later lesson.
