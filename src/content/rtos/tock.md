---
title: Tock
slug: tock
summary: Tock is a secure, concurrent embedded operating system designed for ARM Cortex-M
  and RISC-V microcontrollers, prioritizing isolation between the kernel, device drivers,
  and applications. It leverages Rust's memory safety for its kernel and hardware
  Memory Protection Units (MPUs) to run multiple mutually distrustful applications
  on resource-constrained hardware with as little as 64kB of RAM.
codeUrl: https://github.com/tock/tock
siteUrl: https://github.com/tock/tock
star: 6273
version: release-2.2
lastUpdated: '2026-03-31'
components:
- IPC
- Storage
- Bootloader
- Cryptography
- Shell
- Profiling
- OTA
- SecureBoot
- HAL
platforms:
- ARM Cortex-M
- RISC-V
- QEMU
licenses:
- Apache-2.0
- MIT
createdAt: '2025-12-18'
updatedAt: '2026-04-07'
---

### Features


- Concurrent execution of multiple mutually distrustful applications on a single microcontroller

- Hardware-based process isolation using Memory Protection Units (MPUs)

- Kernel implementation in Rust to provide compile-time memory and type safety

- Isolation of device drivers from each other and from the core kernel

- Tiered trust security model specifically designed for embedded systems

- Hardware Abstraction Layer (HIL) for modular system design across different chips

- Capability-based security system to restrict access to sensitive kernel interfaces

- Support for both synchronous and asynchronous system call capsules

- Inter-Process Communication (IPC) mechanism for safe data exchange between applications

- Dynamic binary storage for runtime application loading and updates

- Grant mechanism for processes to safely allocate memory for kernel use

- Deferred call interface for hardware-independent asynchronous execution

- Introspection mechanisms for monitoring and inspecting kernel status

- Application credential checking to verify software before loading

- Efficient operation on hardware with memory constraints as low as 64kB RAM

- Support for multiprogramming in secure, low-power IoT environments

- In-kernel debugging support including GPIO and process slice debugging

- Standardized error handling through a unified ErrorCode system

- Flexible scheduling interface allowing for different kernel schedulers

- Static memory allocation for core kernel structures to ensure stability



### Architecture

Tock employs a unique multi-layered architecture designed to provide maximum security and reliability on resource-constrained microcontrollers. The system is split into three primary trust domains: the Core Kernel, Capsules, and Userland Processes. The **Core Kernel** is written in Rust and handles the most sensitive tasks, including the scheduler, memory management, and the Hardware Interface Layer (HIL). It uses Rust's ownership and borrowing rules to ensure memory safety without the overhead of a garbage collector.

**Capsules** are Tock's mechanism for implementing device drivers and system services. These are also written in Rust and reside within the kernel's address space but are isolated from the core via Rust's type system and visibility rules. This prevents a bug in a driver from compromising the entire system. **Userland Processes** are the least trusted layer; they are isolated from the kernel and each other using hardware Memory Protection Units (MPUs). This architecture allows Tock to support multiprogramming, where multiple independent applications can run concurrently even if they do not trust one another.

#### Core Components
- **Scheduler**: Manages the execution of both kernel-level capsules and userland processes.
- **Grant System**: A unique memory management tool that allows the kernel to use a portion of a process's RAM for storing state related to that process.
- **System Call Interface**: A standardized boundary (using Allow, Subscribe, Command, and Yield) between processes and the kernel.
- **Hardware Interface Layer (HIL)**: A set of Rust traits that define common interfaces for hardware peripherals like GPIO, UART, and SPI.

### Use Cases

This RTOS is ideal for:

- **Secure IoT Gateways**: Devices that must run multiple communication stacks and third-party applications while maintaining strict isolation.
- **Sensor Networks**: Low-power nodes requiring high reliability where driver failures must not crash the entire system.
- **Industrial Control Systems**: Environments where safety-critical tasks must be isolated from non-critical monitoring or logging applications.
- **Educational Platforms**: A modern foundation for teaching OS principles and Rust-based embedded development on hardware like the micro:bit v2 or Raspberry Pi Pico.
- **Cryptographic Tokens**: Systems requiring a 'Tiered Trust' model to protect sensitive keys from application-level vulnerabilities.

### Getting Started

To begin developing with Tock, the primary resource is **The Tock Book**, which provides comprehensive tutorials on setting up the environment and writing your first application. Developers will need the Rust toolchain installed, specifically targeting the `thumbv7em-none-eabi` or `riscv32imac-unknown-none-elf` architectures depending on the hardware. The `tockloader` utility is the standard tool for flashing the Tock kernel and applications onto supported boards.

Key documentation resources include:
- [The Tock Book](https://book.tockos.org): The official guide for users and developers.
- [Tock API Documentation](https://docs.tockos.org): Detailed Rust crate documentation for the kernel and capsules.
- [Getting Started with Secure Embedded Systems](https://link.springer.com/book/10.1007/978-1-4842-7789-8): A comprehensive textbook focusing on Tock and Rust for IoT.
