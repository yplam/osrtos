---
title: embox
summary: Embox is a highly modular and configurable real-time operating system designed
  to execute Linux-compatible software on resource-constrained embedded systems and
  microcontrollers. It provides a POSIX-compliant environment, allowing developers
  to port complex desktop-grade libraries and applications like Qt, OpenCV, and PJSIP
  to platforms with limited RAM and ROM.
slug: embox
codeUrl: https://github.com/embox/embox
siteUrl: https://github.com/embox/embox
star: 1557
version: v0.7.0
lastUpdated: '2026-04-18'
components:
- Shell
- Network
- FileSystem
- Graphics
- GUI
- USBHost
- USBDevice
- GPIO
- I2C
- RTC
- FPGA
- Bootloader
- Scheduler
- Memory Management
- IPC
- Profiling
- Audio
platforms:
- ARM
- ARM Cortex-M
- ARM Cortex-A
- x86
- RISC-V
- MIPS
- SPARC
- PowerPC
- Microblaze
- AArch64
- QEMU
licenses:
- BSD
libraries:
- PJSIP
- Qt
- OpenCV
- Dropbear
- Mesa3D
- ZeroMQ
- Qpid
- FatFS
- libstdc++
- Python
- Lua
createdAt: '2025-12-22'
updatedAt: '2026-04-19'
---

### Features


- POSIX-compliant API layer for high portability of existing Linux and Unix software.

- Modular Mybuild build system allowing fine-grained configuration of included components and parameters.

- Support for multiple programming languages including Python, Java, Lua, Ruby, Lisp, and Tcl.

- Integrated TCP/IP stack with BSD socket support and protocols like HTTP, UDP, ARP, and NTP.

- Comprehensive file system support including FAT, ext2, ext3, and ext4.

- Advanced graphics support with integrations for Qt, Nuklear, LVGL, and Mesa3D.

- Real-time multitasking with support for preemptive and cooperative scheduling and priority inheritance.

- Cross-platform compatibility for architectures including ARM, RISC-V, x86, MIPS, SPARC, and PowerPC.

- Ability to run complex middleware like OpenCV and PJSIP on microcontrollers such as STM32.

- Unix-like shell utilities including ls, cat, mount, and ping for system interaction.

- Support for networking services such as SSH via Dropbear, Telnet, and HTTP servers.

- Static linking of modules to ensure system security and minimize the attack surface.

- USB support including both host and gadget modes for specific hardware platforms.

- Device tree support for hardware abstraction and simplified porting to new boards.

- Memory consumption analysis tools and autotest frameworks for development stability.



Embox is designed around a modular architecture that emphasizes flexibility and compatibility. The core philosophy is to provide a Linux-like environment on microcontrollers by implementing a robust POSIX layer. This allows developers to use standard C/C++ libraries and existing open-source software without the overhead of a full Linux kernel. The system is built using the 'Mybuild' engine, which treats every part of the OS—from device drivers to application code—as a discrete module that can be included or excluded at compile time to meet strict memory requirements.

The kernel supports multitasking with various scheduling policies, including preemptive and cooperative modes. It manages hardware through a structured subsystem approach, covering networking, file systems, and hardware interfaces like GPIO, I2C, and USB. By statically linking only the necessary modules, Embox creates a highly optimized binary image tailored specifically for the target hardware's capabilities.

### Use Cases

This RTOS is ideal for:

- **Multimedia IoT Devices**: Implementing VoIP phones using PJSIP or graphical interfaces using Qt on microcontrollers like the STM32F7.
- **Industrial Automation and Robotics**: Running complex control logic and computer vision tasks via OpenCV while maintaining real-time responsiveness for motor and sensor control.
- **Legacy Software Porting**: Transitioning existing Linux-based applications to cheaper, lower-power embedded hardware with minimal code changes due to POSIX compliance.
- **Secure Embedded Systems**: Creating fixed-function devices where the attack surface is minimized by excluding all unnecessary code and services at the build level.

### Getting Started

To begin developing with Embox, you must first set up a cross-compilation environment for your target architecture (e.g., arm-none-eabi-gcc for STM32). The build process involves selecting a configuration template using the `make confload-<template>` command, which populates the `./conf` directory with the necessary module definitions. Once configured, running `make` generates the system image. For rapid testing, developers can use the `x86/qemu` template to run Embox within a virtualized environment using the provided `./scripts/qemu/auto_qemu` script. Detailed guides for specific platforms and advanced features like Docker-based builds (Emdocker) are available in the [official Wiki](https://github.com/embox/embox/wiki).
