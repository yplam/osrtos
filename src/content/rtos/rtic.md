---
title: RTIC
slug: rtic
summary: RTIC (Real-Time Interrupt-driven Concurrency) is a hardware-accelerated Rust
  RTOS designed for building real-time systems with minimal software overhead. It
  leverages the hardware's interrupt controller to manage task scheduling and utilizes
  the Stack Resource Policy (SRP) to provide compile-time guarantees for deadlock-free
  execution and data race free memory sharing.
codeUrl: https://github.com/rtic-rs/rtic
siteUrl: https://rtic.rs/
star: 2255
version: v2.2.0
lastUpdated: '2026-02-15'
platforms:
- ARM Cortex-M
- RISC-V
- Xtensa
- QEMU
licenses:
- Apache-2.0
- MIT
createdAt: '2025-12-15'
updatedAt: '2026-03-03'
---

### Features


- Hardware-accelerated task scheduling using the system's interrupt controller.

- Support for both event-triggered tasks and software-spawned tasks.

- Message passing mechanism for transferring data to software tasks at spawn time.

- Integrated timer queue for scheduling tasks with specific delays or periodic execution.

- Preemptive multitasking based on user-defined task priorities.

- Data race free memory sharing via fine-grained, priority-based critical sections.

- Compile-time guarantees for deadlock-free execution using Stack Resource Policy (SRP).

- Highly efficient memory management where all tasks share a single call stack.

- Zero-cost abstractions with a minimal software footprint for the scheduler.

- No hard dependency on a dynamic memory allocator (heapless operation).

- Full support for the entire ARM Cortex-M microcontroller family.

- Support for most RISC-V devices with specific backend implementations.

- Amenability to formal Worst Case Execution Time (WCET) and scheduling analysis.

- Integration with Rust's ownership and type system for safety guarantees.

- Support for QEMU and ESP32 environments for testing and simulation.



### Architecture

RTIC is built on the **Real-Time For the Masses (RTFM)** framework, utilizing a declarative syntax to define tasks and resources. Its architecture is unique in that it lacks a traditional software-based scheduler; instead, it leverages the hardware's **Nested Vectored Interrupt Controller (NVIC)** or equivalent to manage task preemption and execution. This hardware-centric approach ensures that context switching occurs with the lowest possible latency, as the hardware itself handles the saving and restoring of registers.

The system operates on the **Stack Resource Policy (SRP)**, which allows all tasks to share a single call stack safely. By assigning static priorities to tasks and using priority ceilings for shared resources, RTIC guarantees at compile-time that deadlocks cannot occur and that data races are impossible. This design makes the system highly predictable and amenable to **Worst Case Execution Time (WCET)** analysis.

#### Core Components
- **Task Dispatcher**: Maps software and hardware tasks to specific interrupt vectors for hardware-accelerated scheduling.
- **Resource Manager**: Implements priority-based critical sections for safe data sharing between tasks of different priorities.
- **Timer Queue**: Manages scheduled and periodic tasks using hardware timers to trigger software tasks in the future.
- **Message Queue**: Facilitates asynchronous data transfer between tasks at the moment they are spawned.

### Use Cases

This RTOS is ideal for:

- **Industrial Automation**: Managing high-speed sensor data and actuator control with strict timing requirements.
- **Safety-Critical Systems**: Applications requiring formal guarantees against deadlocks and memory corruption at compile time.
- **Battery-Powered Devices**: Systems needing minimal CPU overhead to maximize sleep cycles and energy efficiency through hardware-driven wakeups.
- **Automotive Sensors**: Processing CAN bus or LIN bus signals where predictable latency and high reliability are mandatory.
- **Medical Instrumentation**: Real-time monitoring where deterministic behavior and memory safety are paramount.
- **Digital Signal Processing**: Handling high-frequency interrupts for audio or radio frequency applications with minimal jitter.

### Getting Started

To begin developing with RTIC, developers should first install the Rust toolchain and the appropriate target support for their hardware (e.g., `thumbv7m-none-eabi`). The primary entry point for documentation is the **RTIC Book** (https://rtic.rs), which provides a comprehensive guide from basic task spawning to advanced resource management. Projects are typically structured using the `#[rtic::app]` attribute, which allows developers to define local and shared resources along with task functions that respond to hardware interrupts. For rapid prototyping and testing, the framework supports **QEMU** and provides an `xtask` based workflow for running continuous integration checks and formatting locally.
