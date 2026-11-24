---
title: Stack overflow
description: A task using more stack than it was given and overwriting the memory next to it, how each kernel detects it, and how the high-water mark helps size stacks.
---

A **stack overflow** happens when a task's calls, local variables and saved registers need more
room than its stack has. The stack grows past its end and overwrites whatever lies next to it:
another task's stack or [TCB](/learn/glossary/task-control-block/), or global data. The program
then fails somewhere else, often much later.

The **high-water mark** is the least free space a stack has ever had. Both kernels find it the
same way: they fill each new stack with a known byte, and later look for how far it was
overwritten.

In **FreeRTOS**, `configCHECK_FOR_STACK_OVERFLOW` selects a check made at every context switch:

- **1**: has the saved stack pointer gone past the end of the stack?
- **2**: also, do the last 16 bytes still hold the fill pattern (`0xa5`)? This catches an overflow
  that has already unwound by the time of the switch.
- **3**: only on some ports, such as RISC-V: also checks the separate interrupt stack, and fails a
  `configASSERT()` instead of calling the hook.

A task stack that has overflowed is reported to
`vApplicationStackOverflowHook( xTask, pcTaskName )`, which the application writes.
`uxTaskGetStackHighWaterMark( xTask )` returns the high-water mark in **words**.

In **Zephyr**, `CONFIG_STACK_SENTINEL` keeps a magic value at the lowest address of each stack and
checks it at context switches and interrupt exits. `CONFIG_HW_STACK_PROTECTION` uses the hardware:
on Cortex-M a stack-limit register where the CPU has one, otherwise an MPU guard region
(`CONFIG_MPU_STACK_GUARD`), so the overflowing instruction itself faults. With
`CONFIG_INIT_STACKS`, `k_thread_stack_space_get( thread, &unused )` gives the free space in
**bytes**.

Two details that surprise people:

- **The checks are not proof.** A software check runs only at certain moments, and a large local
  array can jump past the guard bytes without touching them.
- **The hook runs on a damaged system.** The overflow may already have hit another task, so the
  hook should only report and stop.

The simulator's tasks have no real stacks.
[Tasks and stacks](/learn/basics/tasks-and-stacks/#how-big-should-a-stack-be) explains how to size
a stack.
