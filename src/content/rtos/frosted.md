---
title: Frosted
summary: Frosted (Free POSIX OS for Tiny Embedded Devices) is a POSIX-compliant RTOS
  designed for ARM Cortex-M microcontrollers, providing a Unix-like environment with
  kernel/userland separation. It features a modular architecture with a Virtual File
  System (VFS), integrated networking via picoTCP, and support for Binary Flat (BFLT)
  executables.
slug: frosted
codeUrl: https://github.com/insane-adding-machines/frosted
star: 222
version: old_hal_lpc
lastUpdated: '2019-06-14'
components:
- Scheduler
- Memory Management
- IPC
- FileSystem
- Network
- USBHost
- USBDevice
- Shell
- Cryptography
- IPv6
- TCP
- UDP
- DNS
- DHCP
- CAN
- Profiling
platforms:
- ARM
- ARM Cortex-M
- STM32
- LPC17xx
- nRF51
- nRF52
- LM3S
- QEMU
licenses:
- GPL-2.0
libraries:
- picoTCP
- FatFS
- unicore-mx
createdAt: '2025-12-29'
updatedAt: '2026-03-03'
---

### Features


- POSIX-compliant system call interface for standard C application compatibility

- Kernel and userland separation to enhance system stability and security

- Support for Binary Flat (BFLT) executable format for user applications

- Virtual File System (VFS) layer supporting multiple filesystem backends

- Execute-In-Place File System (XIPFS) for efficient memory utilization

- Integrated picoTCP network stack providing IPv4 and IPv6 connectivity

- Preemptive scheduler supporting tasks, tasklets, and synchronization primitives

- Unix domain sockets and PTY support for inter-process communication

- Memory Protection Unit (MPU) integration for hardware-level memory isolation

- Kconfig-based configuration system for modular and customizable builds

- Comprehensive driver support for STM32F4, STM32F7, LPC17xx, and nRF51/52 families

- Framebuffer support with built-in console and font rendering capabilities

- USB Host and Device stack support for various peripheral classes

- Cryptographic module including SHA256, AES, and Fortuna PRNG

- QEMU emulation support for LM3S6965 targets to facilitate rapid development

- Support for SDIO, SPI, I2C, UART, and Ethernet hardware interfaces



Frosted (Free POSIX OS for Tiny Embedded Devices) is designed as a modular, Unix-like operating system for microcontrollers. It employs a clear separation between the kernel and userland, utilizing the hardware's Memory Protection Unit (MPU) where available to enforce process isolation and system stability. The kernel provides a POSIX-compliant system call interface, allowing standard C applications to be ported to embedded targets with minimal modification. Its core is built around a preemptive scheduler that manages tasks, tasklets, and synchronization primitives like semaphores and mutexes.

The architecture features a robust Virtual File System (VFS) layer that abstracts hardware-specific storage into a unified directory tree. This allows the system to mount various filesystems such as FATFS for SD cards, SysFS for kernel parameters, and XIPFS for executing code directly from flash memory. Networking is handled by an integrated picoTCP stack, providing full TCP/IP capabilities through standard socket interfaces, while the build system uses Kconfig to allow developers to toggle features and drivers based on resource constraints.

#### Core Components
- **Kernel Core**: Preemptive scheduler, syscall table, and tasklet management.
- **VFS Layer**: Support for MemFS, XIPFS, FATFS, and SysFS.
- **Networking**: picoTCP integration with support for Unix and Inet sockets.
- **Device Drivers**: Comprehensive support for GPIO, UART, SPI, I2C, Ethernet, and USB.
- **Graphics**: Framebuffer driver with console support and multiple font options.

### Use Cases
This RTOS is ideal for:
- **IoT Gateways**: Devices requiring robust networking (picoTCP) and file management on ARM Cortex-M hardware.
- **Embedded Workstations**: Small-scale devices needing a terminal interface, framebuffer graphics, and POSIX-compliant shell environments.
- **Industrial Control**: Systems that leverage the MPU and preemptive scheduling for reliable execution of control logic on STM32 and LPC platforms.
- **Educational Platforms**: A simplified Unix-like environment for learning OS internals, system calls, and driver development on QEMU or Discovery boards.

### Getting Started
To begin developing with Frosted, developers should first configure the build environment using the Kconfig-based system. Running `make menuconfig` allows for the selection of target boards (such as STM32F4 Discovery or QEMU) and specific kernel features. The build process requires an `arm-frosted-eabi` cross-compiler toolchain. Once configured, a simple `make` command generates a combined `image.bin` containing both the kernel and the userland applications. For rapid testing without hardware, the project includes built-in support for QEMU emulation via `make qemu` for the LM3S6965 target.
