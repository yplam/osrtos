---
title: Eclipse ThreadX
summary: Eclipse ThreadX is an industrial-grade real-time operating system (RTOS)
  featuring a non-layered picokernel architecture designed for deeply embedded, resource-constrained
  IoT applications. It provides deterministic scheduling, advanced multicore support
  through Symmetric Multiprocessing (SMP), and optional memory protection via a modular
  deployment system.
slug: threadx
codeUrl: https://github.com/eclipse-threadx/threadx
siteUrl: https://threadx.io/
star: 3390
version: v6.5.0.202601_rel
lastUpdated: '2026-03-06'
components:
- Scheduler
- Memory Management
- IPC
- Profiling
- FunctionalSafety
- Network
- FileSystem
- Graphics
- USBDevice
- USBHost
- Cryptography
- OTA
- Shell
platforms:
- ARM Cortex-M
- ARM Cortex-A
- ARM Cortex-R
- RISC-V
- Xtensa
- MIPS
- RX
- Arc
- Linux
- Windows
- ARM7
- ARM9
- ARM11
- AArch32
- AArch64
- x86
- Simulator
- QEMU
licenses:
- MIT
libraries:
- NetX Duo
- FileX
- GUIX
- USBX
- TraceX
- OpenAMP
createdAt: '2025-09-28'
updatedAt: '2026-03-22'
---

### Features


- Picokernel architecture eliminates unnecessary function call overhead by plugging services directly into the core.

- Preemption-threshold scheduling reduces context switches and helps guarantee system schedulability.

- Automatic scaling ensures only the services used by the application are included in the final link-time image.

- Symmetric Multiprocessing (SMP) support provides dynamic load balancing across multiple processor cores.

- ThreadX Modules enable dynamic loading of application threads with optional MPU/MMU memory protection.

- Event chaining allows applications to register notify callbacks for every communication or synchronization object.

- Sub-microsecond context switching and fast boot times in fewer than 120 cycles for high-performance requirements.

- Full determinism ensures consistent performance regardless of the number of threads in the ready state.

- Execution Profile Kit (EPK) provides real-time performance metrics and system event tracing.

- Separate interrupt stack management reduces the RAM footprint required for individual thread stacks.

- MISRA-C: 2004 and 2012 compliance for safety-critical and industrial-grade software development.

- Adaptation layers provide compatibility for legacy APIs including FreeRTOS, POSIX, and OSEK.

- Advanced memory management includes both fixed-size block pools and variable-size byte pools.

- Priority-based preemptive scheduling supports up to 1024 priority levels for complex task management.

- Run-time stack analysis detects and prevents stack overflow conditions during execution.



Eclipse ThreadX is designed with a non-layered **picokernel architecture**, where services are integrated directly into the core rather than being built in layers. This design minimizes function call overhead and results in a highly efficient, small-footprint kernel (as small as 2KB instruction area). The system is highly modular, utilizing automatic scaling to ensure that only the specific services invoked by the application are included in the final binary image.

The architecture supports both **Asymmetric Multiprocessing (AMP)** and **Symmetric Multiprocessing (SMP)**. In SMP mode, the kernel performs dynamic load balancing across available cores while allowing all resources, such as queues and semaphores, to be accessed by any thread on any core. For security and reliability, the **ThreadX Modules** subsystem allows for the dynamic loading of code into separate address spaces, protected by hardware Memory Protection Units (MPU) or Memory Management Units (MMU).

**Core Components**
- **Thread Manager**: Handles priority-based preemptive and cooperative scheduling.
- **Communication Objects**: Includes message queues, counting semaphores, and mutexes with priority inheritance.
- **Event Flags**: Provides synchronization through logical AND/OR combinations of event bits.
- **Memory Pools**: Manages both fixed-block and variable-byte memory allocation.
- **Timer Management**: High-resolution software timers and optimized interrupt processing.

### Use Cases

This RTOS is ideal for:
- **Industrial Automation**: High-reliability control systems requiring MISRA compliance and TÜV safety certifications.
- **Consumer Electronics**: Resource-constrained devices like printers and wearables that benefit from a 2KB minimal footprint.
- **Medical Devices**: Safety-critical applications requiring deterministic response times and memory protection.
- **IoT Gateways**: Multicore systems utilizing SMP for dynamic load balancing and complex networking stacks.

### Getting Started

To begin developing with Eclipse ThreadX, it is recommended to use the **CMake-based build system** which supports various toolchains including the **Arm GNU Toolchain**, IAR, and AC6. Developers should start by defining system-wide configurations in a `tx_user.h` file, using the provided `tx_user_sample.h` as a template. The repository includes a `samples/` directory containing `demo_threadx.c`, which demonstrates basic thread creation and IPC usage. Comprehensive documentation is available in the `docs/` folder and the official [Eclipse ThreadX Documentation](https://github.com/eclipse-threadx/rtos-docs) repository.
