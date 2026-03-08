---
title: Linmo
summary: Linmo is a lightweight, preemptive multi-tasking RTOS kernel designed as
  an educational showcase for resource-constrained systems. It features a shared address
  space model and a priority-based round-robin scheduler, specifically targeting the
  RISC-V architecture and QEMU emulation.
slug: sysprog21-linmo
codeUrl: https://github.com/sysprog21/linmo
star: 108
lastUpdated: '2026-02-04'
components:
- Scheduler
- Memory Management
- IPC
- Shell
platforms:
- RISC-V
- QEMU
licenses:
- MIT
createdAt: '2026-01-28'
updatedAt: '2026-03-08'
---

### Features


- Minimal kernel footprint optimized for resource-constrained environments.

- Lightweight task model where all tasks operate within a single shared address space.

- Support for both preemptive and cooperative multitasking modes based on application return values.

- Priority-based round-robin scheduling algorithm with eight distinct priority levels.

- Support for a user-defined real-time scheduler to override default policies for specific tasks.

- Task synchronization via counting semaphores and mutexes with condition variables.

- Inter-task communication using unidirectional, byte-oriented pipes.

- Message queue and event queue support for structured data exchange.

- Software timers with user-defined callback functionality for periodic events.

- Dynamic memory management providing standard malloc, calloc, realloc, and free operations.

- Dedicated stack allocation per task from a shared system heap.

- Hardware Abstraction Layer (HAL) to decouple kernel logic from architecture-specific code.

- Compact, built-in C library (LibC) to minimize binary size and external dependencies.

- Configurable task priorities ranging from Idle to Critical levels.

- Native support for the RISC-V RV32I architecture.



Linmo follows a monolithic-style kernel design where all tasks share a single address space, significantly reducing the overhead associated with memory management units (MMU) and context switching in resource-constrained environments. The kernel is structured around a Hardware Abstraction Layer (HAL) that isolates architecture-specific code—currently targeting RISC-V RV32I—from the core kernel logic, facilitating portability and testing via QEMU.

The core execution unit is the "Task," which is allocated a dedicated stack from the system heap during initialization. Scheduling is handled by a priority-based round-robin engine that supports both cooperative (yield-based) and preemptive (interrupt-driven) execution. A unique feature is the ability to hook a user-defined real-time scheduler to handle high-priority tasks, bypassing the default policy when specialized timing requirements are necessary.

**Core Components**
- **Scheduler**: Priority-based round-robin with support for custom real-time policies.
- **Memory Manager**: Dynamic heap allocator providing standard memory management functions.
- **IPC Subsystem**: Implements semaphores, mutexes, condition variables, pipes, and message queues.
- **HAL (Hardware Abstraction Layer)**: Manages CPU context, interrupts, and timer hardware for RISC-V.
- **Compact LibC**: A minimal implementation of standard C functions optimized for code size.

### Use Cases
This RTOS is ideal for:
- **Educational Platforms**: Specifically designed as a teaching tool for understanding RTOS internals, context switching, and scheduling on RISC-V.
- **Resource-Constrained IoT**: Suitable for simple microcontrollers where memory footprint is critical and full process isolation is not required.
- **Prototyping RISC-V Applications**: Provides a quick-start environment for testing RV32I code in a multi-tasking environment using QEMU.

### Getting Started
To begin developing with Linmo, you need a RISC-V cross-compilation toolchain (`riscv-none-elf`) and QEMU (`qemu-system-riscv32`). The build process is managed via Makefiles; running `make` generates the core kernel library `liblinmo.a`. Developers can create applications in the `app/` directory and link them against the kernel. The kernel's behavior (preemptive vs. cooperative) is determined by the return value of `app_main()`. Detailed contribution guidelines and source code structure are available in the repository's `CONTRIBUTING.md` and `README.md` files.
