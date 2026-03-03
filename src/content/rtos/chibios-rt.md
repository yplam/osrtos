---
title: ChibiOS/RT
slug: chibios-rt
summary: ChibiOS is a modular, high-performance development environment for embedded
  systems, featuring a dual-kernel architecture with the full-featured RT kernel and
  the ultra-compact NIL kernel. It provides a comprehensive Hardware Abstraction Layer
  (HAL), a Virtual File System (VFS), and advanced sandboxing capabilities, making
  it highly suitable for functional safety and multicore ARM Cortex-M applications.
codeUrl: https://github.com/ChibiOS/ChibiOS
siteUrl: http://www.chibios.org/dokuwiki/doku.php
star: 826
version: ver21.11.4
lastUpdated: '2026-03-02'
components:
- FileSystem
- Shell
- FunctionalSafety
- USBDevice
- Storage
- Bootloader
platforms:
- ARM
- ARM Cortex-M
- ARM Cortex-A
- ARM Cortex-R
- ARM7
- ARM9
- ARM11
- POSIX
licenses:
- GPL-3.0
libraries:
- LittleFS
- FatFS
- CMSIS
- NASA OSAL
createdAt: '2025-12-22'
updatedAt: '2026-03-03'
---

### Features


- Dual-kernel architecture offering the full-featured RT kernel and the ultra-compact NIL kernel for varying resource constraints.

- Comprehensive Hardware Abstraction Layer (HAL) providing a unified interface for MCU peripherals across multiple vendors.

- Dedicated functional safety module (SFT) implementing system and list integrity checks for high-reliability applications.

- Support for multicore and NUMA architectures using specialized memory class modifiers to handle non-coherent caches.

- Advanced sandboxing capabilities including para-virtualized ports, virtual IRQ mechanisms, and memory protection.

- Virtual File System (VFS) integration supporting LittleFS and FatFS with per-sandbox instance visibility.

- Optimized context switching for ARM Cortex-M that avoids FPU register saving for threads not utilizing the floating-point unit.

- Dynamic thread management featuring a thread registry garbage collector and customizable dispose functions.

- Managed Flash Storage (MFS) driver with flash-level mutual exclusion and wear-leveling support.

- POSIX-compatible mini shell (msh) and enhanced XShell for command-line interaction and sub-app execution.

- Support for loading and executing ELF files within isolated sandboxed environments.

- Static MPU initialization for ARMv7-M and ARMv8-M architectures to enforce memory boundaries at boot.

- Virtual timers with runtime delta recalculation for high-precision timing and reduced jitter.

- Object-oriented framework (OOP) in C for structured and modular OS module development.

- Support for CMSIS-RTOS and NASA OSAL emulation layers for legacy code compatibility.

- Extensive test suite including kernel tests, HAL integration tests, and MISRA-C compliance checks.



### Architecture

ChibiOS is designed with a highly modular and layered architecture that centers around its unique dual-kernel approach. The system provides two distinct kernels: the **RT (Real-Time)** kernel, which is a full-featured, high-performance preemptive RTOS, and the **NIL** kernel, which is an ultra-compact implementation designed for extremely resource-constrained microcontrollers. Both kernels share a common API philosophy and can utilize the same high-level OS libraries (OSLIB), allowing developers to scale their applications based on hardware capabilities without rewriting core logic.

Beyond the kernels, the architecture includes a robust **Hardware Abstraction Layer (HAL)** that provides a standardized interface for peripherals like GPIO, UART, I2C, and SPI across different MCU families. A specialized **Virtual File System (VFS)** layer abstracts storage devices, while the **Sandbox (SB)** component enables application isolation through memory protection and para-virtualization. The system also incorporates an object-oriented framework (OOP) written in C, which facilitates the development of structured and maintainable OS modules.

### Use Cases

This RTOS is ideal for:

- **Industrial Automation**: High-performance real-time control using the RT kernel's low-latency context switching and deterministic scheduling.
- **Functional Safety**: Applications requiring high reliability, leveraging the dedicated SFT module for runtime integrity checks and MISRA-C compliance.
- **Resource-Constrained IoT**: Deploying the NIL kernel on small microcontrollers to minimize RAM and Flash footprint while maintaining RTOS capabilities.
- **Secure Edge Computing**: Utilizing sandboxing and MPU-based isolation to run untrusted or third-party applications securely.
- **Automotive Systems**: Leveraging multicore and NUMA support for complex Electronic Control Unit (ECU) development on modern ARM architectures.
- **Embedded Storage Solutions**: Implementing robust data logging using the Managed Flash Storage (MFS) and VFS with LittleFS or FatFS.

### Getting Started

ChibiOS is organized into a clear directory structure where the `os/` folder contains the core components and `demos/` provides platform-specific examples for various evaluation boards. To begin development, it is recommended to select a demo project that matches your hardware target; these demos typically include pre-configured Makefiles and project files for ChibiStudio or other GCC-based toolchains. 

Key configuration is handled through header files: `chconf.h` for kernel settings, `halconf.h` for peripheral driver selection, and `mcuconf.h` for clock and DMA configurations. The root directory contains a `documentation.html` file which serves as the primary entry point for the Doxygen-generated API reference. Developers can also find extensive test suites in the `test/` directory to verify kernel and HAL integrity on their specific hardware ports.
