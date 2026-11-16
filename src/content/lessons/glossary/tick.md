---
title: Tick
description: The periodic timer interrupt that gives an RTOS kernel its sense of time, and the unit that delays and timeouts are counted in.
---

The **tick** is a timer interrupt that fires at a fixed rate, and also the time between two of
those interrupts. A kernel configured for 1000 ticks per second has a tick of one millisecond.
Delays and timeouts are counted in ticks, so the tick rate is the resolution of the kernel's clock.

On every tick the kernel:

- adds one to its tick count (`xTickCount` in FreeRTOS, `curr_tick` in Zephyr);
- wakes the tasks whose delay or timeout ends at this tick;
- switches to another task if a more urgent one became ready, or if
  [time slicing](/learn/time-slicing/) says the running task's turn is over.

In FreeRTOS this work is done by `xTaskIncrementTick()`, in Zephyr by `sys_clock_announce()`.

Two details that surprise people:

- **A delay of *n* ticks is not *n* tick periods.** A call made in the middle of a tick is already
  partway to the next tick edge. FreeRTOS counts edges, so `vTaskDelay(n)` lasts between *n* − 1 and
  *n* periods. Zephyr adds one tick so that `k_sleep()` never returns early, and lasts between *n*
  and *n* + 1. The [scheduling lesson](/learn/scheduling/) shows both.
- **The tick count overflows.** FreeRTOS handles a 32-bit count wrapping round with two delayed
  lists that swap roles; the [tick overflow scenario](/learn/playground/?scenario=tick-overflow)
  shows the swap. Zephyr counts ticks in 64 bits.

A kernel can also run **tickless**: instead of interrupting at a fixed rate, it programs the timer
for the next moment something is due, so an idle system can sleep longer. Zephyr does this by
default; the simulator turns it off so that every tick is visible.
