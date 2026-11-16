---
title: PendSV
description: The ARM Cortex-M exception that RTOS ports use to perform the context switch once every other interrupt has finished.
---

**PendSV** ("pendable service call") is an exception of ARM Cortex-M processors that software can
make pending by writing one bit. RTOS ports use it for one job: the
[context switch](/learn/glossary/context-switch/).

The trick is its priority. The FreeRTOS port gives PendSV the lowest priority there is
(`portNVIC_PENDSV_PRI`, built from 255), so it never interrupts another interrupt. Code that wants a
switch only marks it pending:

- `portYIELD()` writes `portNVIC_PENDSVSET_BIT` to the interrupt control register, from a task
  that blocks or wakes a more urgent one;
- `xPortSysTickHandler()` does the same when the [tick](/learn/glossary/tick/) asks for a switch.

The switch then happens in `xPortPendSVHandler` once no other exception is active. It saves the
registers of the outgoing task on its stack, calls `vTaskSwitchContext()` to choose the next task,
and restores that task's registers. The
[FreeRTOS context switch walkthrough](/learn/freertos/context-switch/) shows each step.

Two details that surprise people:

- **Asking for a switch does not switch.** Between `portYIELD()` and the switch, the rest of the
  interrupt or kernel code still runs; if interrupts are masked, the switch waits until they are
  unmasked. Several requests in a row cause one switch.
- **A switch never lands in the middle of an interrupt.** Because PendSV only runs when every other
  interrupt handler has returned, no handler is ever left half-finished on the stack of a task that
  is being switched out.

Zephyr's Cortex-M port has a PendSV handler too, `z_arm_pendsv`. The simulator's Zephyr, though,
runs on `native_sim`, the POSIX architecture that the conformance checks use, where the switch is
`arch_swap()` and there is no PendSV. See the
[Zephyr context switch walkthrough](/learn/zephyr/context-switch/).
