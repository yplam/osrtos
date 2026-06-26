---
title: Apex
summary: Apex is a monolithic real-time operating system (RTOS) designed for 32-bit
  embedded systems with limited resources, typically requiring at least 1MiB of ROM
  and RAM. It provides a Linux-compatible environment by implementing a subset of
  the Linux syscall interface and utilizing the musl C library, allowing developers
  to run Linux-compatible applications on hardware where full Linux is too large.
slug: apex
codeUrl: https://github.com/apexrtos/apex
star: 35
lastUpdated: '2022-05-30'
components:
- Bootloader
- FileSystem
- Shell
- Storage
- Memory Management
- Scheduler
- IPC
platforms:
- ARM Cortex-M
- ARMv7-M
- RISC-V
- QEMU
licenses:
- NOASSERTION
libraries:
- musl
- libc++
createdAt: '2026-06-09'
updatedAt: '2026-06-26'
---

### Features

- Monolithic kernel architecture designed for efficiency and small-to-medium scale systems.
- Implementation of a subset of the Linux syscall interface for application portability.
- Integration with the musl C library to provide a standard C environment with small footprints.
- Binary compatibility with Linux-compiled applications when using musl libc.
- Support for 32-bit architectures including ARMv7-M (Cortex-M3/M7) and RISC-V (RV32).
- Targeted resource footprint of approximately 1MiB for the kernel and userspace tools.
- Modular build system based on Project, Machine, and CPU configuration files.
- Native bootloader included within the core repository for system initialization.
- Support for both C and C++ development within the kernel and userspace libraries.
- Comprehensive device driver framework located in the sys/dev subsystem.
- Integrated file system support via a dedicated sys/fs architectural layer.
- Real-time synchronization primitives including mutexes and semaphores in sys/sync.
- Virtual platform support for QEMU emulation (ARM MPS2 and RISC-V Virt).
- Physical hardware support for NXP i.MX RT1050 and RT1060 evaluation boards.
- Familiar userspace environment for Linux developers using standard shell and tools.

Apex is designed as a monolithic kernel, a strategic shift from the microkernel architecture of its predecessor, Prex. By housing core services—including the scheduler, memory management, and file systems—within a single address space, Apex achieves higher efficiency and reduced overhead, making it suitable for 32-bit microcontrollers with roughly 1MiB of memory. The system architecture is modularly organized, separating architecture-specific code (sys/arch) from core kernel logic (sys/kern) and hardware-specific device drivers (sys/dev).

The kernel's primary design goal is to bridge the gap between traditional RTOSes and full-scale Linux. It achieves this by providing a Linux-compatible syscall interface. This allows developers to utilize standard Linux toolchains and libraries, specifically the musl C library, to build applications that can be tested on Linux and then deployed to Apex with minimal modification. This approach significantly reduces the learning curve and dependency issues often associated with proprietary RTOS libraries.

**Core Components**
- **Kernel Core (kern):** Manages process execution, scheduling, and core system logic.
- **Memory Management (mem):** Handles allocation and protection for kernel and userspace resources.
- **Synchronization (sync):** Implements real-time primitives for task coordination.
- **File Systems (fs):** Provides structured data storage and access layers.
- **Device Drivers (dev):** Offers a standardized abstraction layer for peripheral hardware.
- **Bootloader (boot):** A custom loader integrated into the repository for system startup.

### Use Cases
This RTOS is ideal for:
- **Edge Computing**: Deploying Linux-compatible applications on resource-constrained 32-bit hardware where full Linux distributions exceed memory limits.
- **Industrial Automation**: Systems requiring real-time responsiveness combined with a familiar POSIX-like development environment and shell tools.
- **IoT Gateways**: Small-scale devices that need to run standard networking or data processing libraries with minimal power and memory overhead.
- **Legacy Migration**: Porting existing Linux-based application logic to smaller, more cost-effective microcontrollers without a complete rewrite of the application layer.

### Getting Started
To begin developing with Apex, it is recommended to use the `apex-examples` repository, which contains the necessary submodules and configuration scripts for a quick start. Developers must utilize a toolchain based on `musl-cross-make`, specifically configured for the target architecture (e.g., `armv7m-linux-musleabi`). The build process involves creating a build directory and running the `configure` script with specific project and machine parameters (such as `qemu/arm/mps2-an385`). For testing without physical hardware, the system can be emulated using `qemu-system-arm` (version 3.0.0 or higher), which supports the integrated shell and basic kernel functions.
