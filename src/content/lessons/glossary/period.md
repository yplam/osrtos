---
title: Period
description: The fixed time between the starts of a periodic task's jobs, and why it is kept with a delay until a point in time, not a delay from now.
---

A periodic task does its work again and again at a fixed rate. The time between the starts of two
successive **jobs** is its **period**: a 1 kHz control loop has a period of 1 ms. The moment a job
may start is its **release**. Under
[rate-monotonic scheduling](/learn/glossary/rate-monotonic-scheduling/), the period also sets the
task's priority: the shorter it is, the more urgent the task.

To keep the period, the task must sleep until the next release, not for a fixed time:

- `vTaskDelay()` and Zephyr's `k_sleep(K_TICKS(n))` sleep for `n` ticks from **now**. The real
  period becomes the delay plus the work plus any time the task was preempted, and the task drifts.
- FreeRTOS's `xTaskDelayUntil()` and Zephyr's `k_sleep(K_TIMEOUT_ABS_TICKS(next))` sleep until an
  **absolute** time, which the task moves on by exactly one period each time. The releases stay on
  a fixed grid.

Even on a grid, a job does not always start at its release: a more urgent task may be running.
That variation is [jitter](/learn/glossary/jitter/). The [periodic tasks lesson](/learn/periodic-tasks/)
shows both kinds of loop side by side, and the walkthroughs read the code:
[FreeRTOS](/learn/freertos/delay-until/), [Zephyr](/learn/zephyr/periodic-sleep/).
