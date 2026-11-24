---
title: Critical section
description: A short stretch of code during which interrupts are masked, so nothing else can run and change shared data halfway through.
---

A **critical section** is a stretch of code that must not be interrupted, because it reads and
changes data that an interrupt handler or another task also uses: an interruption halfway would be
a [race condition](/learn/glossary/race-condition/). The kernel's own lists are the
main example: a tick that arrived while a task was halfway through moving itself between lists
would find them broken.

On one CPU the way to make code uninterruptible is to mask interrupts, and with no interrupts there
is no [tick](/learn/glossary/tick/) and no switch to another task.

In **FreeRTOS** the calls are `taskENTER_CRITICAL()` and `taskEXIT_CRITICAL()`. On the Cortex-M3
port they do not turn off every interrupt: `portDISABLE_INTERRUPTS()` raises the `BASEPRI`
register to `configMAX_SYSCALL_INTERRUPT_PRIORITY`, which masks the interrupts allowed to call the
kernel and leaves more urgent ones running. The port counts the nesting in `uxCriticalNesting`, so
critical sections can be nested and interrupts come back only at the outermost exit.

In **Zephyr** the old call is `irq_lock()` / `irq_unlock()`. The kernel itself protects its data
with spinlocks, `k_spin_lock()` and `k_spin_unlock()`. On a single CPU a spinlock does not spin at
all: it only masks interrupts. That is why the simulator does not model them.

Two details that surprise people:

- **Keep it short.** Every microsecond inside a critical section is added to the response time of
  every interrupt it masks. Long work belongs under a [mutex](/learn/glossary/mutex/) or the
  [scheduler lock](/learn/glossary/scheduler-lock/), which leave interrupts on.
- **Blocking inside one is a bug.** A task that sleeps or waits in a critical section stops the very
  tick that would wake it.
