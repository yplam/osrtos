---
title: Tickless idle
description: Stopping the periodic tick while nothing is due, so an idle CPU can sleep for longer, and how each kernel catches up on the time that passed.
---

**Tickless idle** stops the periodic [tick](/learn/glossary/tick/) interrupt while no task needs
the CPU. A ticked kernel wakes the CPU every tick, even when the next task is not due for a second,
and each of those wake-ups costs power. A tickless kernel instead programs the timer for the next
moment something is actually due, sleeps until then, and on waking adds all the ticks that passed
in one step.

In **FreeRTOS** it is set with `configUSE_TICKLESS_IDLE` (0 by default). The
[idle task](/learn/glossary/idle-task/) works out how long nothing will be ready, with
`prvGetExpectedIdleTime()`. If that is at least `configEXPECTED_IDLE_TIME_BEFORE_SLEEP` ticks (2 by
default, and never less), it suspends the scheduler and calls
`portSUPPRESS_TICKS_AND_SLEEP( xExpectedIdleTime )`. With the value 1, the Cortex-M ports supply
`vPortSuppressTicksAndSleep()`, which reprograms SysTick and sleeps; with 2, the application
provides its own, often on a low-power timer. On waking, `vTaskStepTick()` moves the tick count on
by the ticks that were skipped.

In **Zephyr** it is `CONFIG_TICKLESS_KERNEL`, on by default for every timer driver that supports it
(`native_sim`'s does). The kernel does not stop the tick only when idle: the timer is always set to
the next expiry in the timeout list, through `sys_clock_set_timeout()`, and `sys_clock_announce()`
reports however many ticks have passed. The idle thread then calls `k_cpu_idle()`, or the power
management subsystem with the time until that expiry.

Two details that surprise people:

- **Time still counts in ticks.** Delays and timeouts keep their tick resolution; only the
  interrupts in between are left out.
- **Waking up is not free.** Leaving a deep sleep state takes time, so a kernel sleeps only when
  the gap is long enough: that is what `configEXPECTED_IDLE_TIME_BEFORE_SLEEP` is for.

The simulator models a **ticked** kernel: its FreeRTOS has `configUSE_TICKLESS_IDLE` 0 and its
Zephyr has `CONFIG_TICKLESS_KERNEL` off, so every tick is a step you can see. The
[Zephyr tick and delay walkthrough](/learn/zephyr/tick-and-delay/) shows the announcement of one
tick at a time that this gives.
