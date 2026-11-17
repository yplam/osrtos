---
title: Software timer
description: A kernel service that calls a function after a delay (one-shot) or every period (auto-reload), without a task of its own.
---

A **software timer** calls a function, its *callback*, when a time set in ticks has passed. It is
"software" because it is kept by the kernel in a list, counted down by the
[tick](/learn/glossary/tick/), not by a hardware timer of its own, so a program can have many.

- A **one-shot** timer expires once, a period after it is started.
- An **auto-reload** (periodic) timer expires every period until it is stopped. Both kernels
  count each period from when the timer was *due*, not from when its callback ran, so a callback
  that runs late does not shift the ones after it.
- **Starting** a running timer again restarts its period from now. A one-shot timer that is
  restarted on every key press expires only once the keys have been quiet for a whole period.

The callback must be short and must not block: give a [semaphore](/learn/glossary/semaphore/), send
to a queue, set an [event bit](/learn/glossary/event-group/), and let a task do the work.

The [software timers lesson](/learn/software-timers/) shows a timer that wakes a task every four
ticks on both kernels.

In **FreeRTOS** (`configUSE_TIMERS` 1): `xTimerCreate( name, period, autoReload, id, callback )`,
`xTimerStart()`, `xTimerReset()`, `xTimerStop()`. The calls send commands to the
[timer service task](/learn/glossary/timer-service-task/), which runs every callback.
In **Zephyr**: `K_TIMER_DEFINE( name, expiry_fn, stop_fn )` and `k_timer_start( timer, duration,
period )` with `K_NO_WAIT` as the period for a one-shot timer, `k_timer_stop()`. The expiry
function runs in the timer interrupt, and a thread can also wait for the next expiry with
`k_timer_status_sync()`.
