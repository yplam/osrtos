---
title: Interrupt service routine (ISR)
description: The function the CPU runs when a peripheral raises an interrupt, ahead of every task, and why it should be short.
---

An **interrupt service routine** (ISR), or interrupt handler, is the function the CPU runs when
hardware raises an interrupt: a byte has arrived, a timer has expired, a pin has changed. The CPU
stops the running task, saves enough state to resume it, and runs the ISR. When the ISR returns, the
interrupted code continues, unless the kernel decides that another task should run now.

An ISR runs ahead of **every** task, whatever its [priority](/learn/glossary/priority/). The
[tick](/learn/glossary/tick/) itself is delivered this way. That has consequences:

- **Keep it short.** While an ISR runs, no task runs, and interrupts of the same or lower priority
  wait. Long work belongs in a task: see
  [deferred interrupt handling](/learn/glossary/deferred-interrupt-handling/).
- **Never block.** An ISR is not a task: it cannot wait for a semaphore or a mutex, because there is
  nothing to switch back to it later. Kernel calls from an ISR must be ones that never wait.
  FreeRTOS has a separate set of them, ending in `FromISR`; Zephyr's calls take a timeout and must
  be given `K_NO_WAIT` in an ISR, and calls such as `k_sem_give()` are safe as they are.
- **Do not switch inside it.** If the ISR wakes a more urgent task, the switch happens on the way
  out: FreeRTOS's handler asks for it with `portYIELD_FROM_ISR()` (on Cortex-M, by setting
  [PendSV](/learn/glossary/pendsv/) pending), Zephyr's interrupt exit checks every time.

The time from the interrupt to the moment the task that handles it starts running is the
**interrupt-to-task latency**. With a well-written ISR and a task of high enough priority, it is
the length of the ISR plus a [context switch](/learn/glossary/context-switch/). The
[interrupts lesson](/learn/interrupts/) shows it at zero ticks, and at one tick when the FreeRTOS
handler forgets to yield.
