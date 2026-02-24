---
title: IntrOS
slug: intros
summary: IntrOS is a lightweight, cooperative operating system designed for deeply
  embedded applications, featuring a task model inspired by state machine concepts.
  It provides a comprehensive suite of synchronization primitives and communication
  mechanisms while maintaining a small footprint suitable for 8-bit to 32-bit microcontrollers.
codeUrl: https://github.com/stateos/IntrOS
siteUrl: https://github.com/stateos/IntrOS
star: 43
version: v5.0
lastUpdated: '2026-02-08'
platforms:
- ARM Cortex-M
- ARM Cortex-M0
- ARM Cortex-M3
- ARM Cortex-M4
- ARM Cortex-M7
- STM8
- AVR8
licenses:
- MIT
createdAt: '2025-12-23'
updatedAt: '2026-02-24'
---

### Features


- Exclusively cooperative (non-preemptive) multitasking to ensure deterministic execution without complex race conditions.

- State-machine inspired task execution where functions are called within an infinite loop with immediate state change capabilities.

- Support for 16, 32, or 64-bit timer counters to accommodate various hardware capabilities.

- Tick-less operation mode to maximize power efficiency during idle periods.

- Basic MPU-based protection for detecting null pointer dereferences and stack overflows.

- Asynchronous communication primitives for safe interaction with unmasked interrupt handlers.

- Comprehensive synchronization suite including spin locks, once flags, and barriers.

- Advanced signal management with protection masks and event handling.

- Flexible flag system supporting 'any', 'all', and 'new' condition logic.

- Multiple semaphore types including binary, limited, and counting semaphores.

- Mutexes with built-in error checking and support for condition variables.

- Read/write locks for efficient resource sharing in multi-reader scenarios.

- Memory management via fixed-size memory pools and raw buffers.

- Diverse queue implementations including message, mailbox, event, and job queues.

- Support for both one-shot and periodic software timers.

- Built-in hierarchical state machine (HSM) framework for complex logic management.

- Native C++ wrapper for object-oriented application development.



### Architecture

IntrOS is built on a cooperative multitasking model, meaning tasks voluntarily yield control to the scheduler. This design eliminates the need for complex context-switching logic found in preemptive kernels, making it highly portable and predictable for deeply embedded systems. The architecture is heavily influenced by state machine theory; instead of tasks being simple linear threads, they are designed as state handlers that execute within an infinite loop. This allows for immediate state transitions via dedicated kernel functions, facilitating the implementation of complex logic through a built-in Hierarchical State Machine (HSM) framework.

The kernel core manages task states, timers, and a wide array of synchronization primitives. It supports a tick-less mode where the system timer is adjusted to wake the CPU only when the next task or timer event is scheduled, significantly reducing power consumption. Memory protection is handled via basic MPU configurations to catch common programming errors like stack overflows or null pointer access. The system also provides specialized functions for asynchronous communication, allowing safe data exchange between unmasked interrupt handlers and the cooperative kernel.

### Use Cases

This RTOS is ideal for:

- **Low-Power Sensors**: Battery-operated devices utilizing tick-less mode to maximize sleep duration and extend operational life.
- **State-Driven Applications**: Systems with complex logic that can be naturally modeled as hierarchical state machines.
- **Resource-Constrained MCUs**: 8-bit (AVR8, STM8) and small 32-bit (Cortex-M0) microcontrollers with very limited RAM and Flash memory.
- **Deterministic Control Systems**: Scenarios where non-preemptive execution simplifies resource sharing and eliminates common race conditions.
- **Educational Platforms**: A clean and simple codebase for learning RTOS fundamentals and state-machine-based software design.

### Getting Started

To begin developing with IntrOS, developers should clone the main repository and review the C++ wrapper or C API documentation, which is contained directly within the source files. Since IntrOS is designed to be tiny, it is typically integrated by including the kernel source files directly into the target project. Developers can find board-specific templates for platforms such as the STM32F746G-Discovery, ATtiny817-Xplained-Mini, and EK-LM4F120XL in the StateOS GitHub organization. These templates provide pre-configured build environments and example task structures to accelerate the initial setup process.
