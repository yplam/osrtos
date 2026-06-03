---
title: NuttX Real-Time Operating System
summary: NuttX is a standards-compliant real-time operating system (RTOS) designed
  for 8-bit to 32-bit microcontrollers. It features a modular architecture, POSIX/ANSI
  compatibility, and extensive support for diverse hardware architectures including
  ARM, RISC-V, and ESP32.
slug: nuttx-real-time-operating-system
codeUrl: https://github.com/XinLiGH/NuttX-Chinese
siteUrl: http://nuttx.org
star: 21
lastUpdated: '2018-08-11'
rtos: nuttx
libraries:
- lvgl
topics:
- nuttx
- rtos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- apache-nuttx-rtos
- apache-nuttx-for-sf2000
- phoenix-rtos-project
- dnx-rtos
- apache-nuttx-rtos-on-64-bit-risc-v
- apache-nuttx-rtos-for-pine64-star64
---

## Overview

NuttX is a mature, real-time operating system (RTOS) that emphasizes standards compliance and a small footprint. Originally released in 2007 by Gregory Nutt under a permissive BSD license, it has grown into a highly scalable system capable of running on environments ranging from 8-bit microcontrollers to high-performance 32-bit SoCs. The primary design goal of NuttX is to provide a Unix-like environment for deeply embedded systems, adhering closely to POSIX and ANSI standards.

## Standards Compliance and POSIX Integration

One of the defining characteristics of NuttX is its strict adherence to standards. By implementing POSIX and ANSI APIs, NuttX allows developers familiar with Unix or Linux environments to transition to embedded development with ease. It provides standard task management, named message queues, counting semaphores, signals, and clocks. For features where standard POSIX APIs are either unavailable or unsuitable for embedded constraints (such as the `fork()` system call), NuttX adopts APIs from other common RTOSs like VxWorks.

## Architecture and Modularity

NuttX is built with a modular, highly configurable architecture. It supports several memory configurations, including a flat embedded build, a protected build using an MPU (Memory Protection Unit), and a full kernel build using an MMU (Memory Management Unit). This flexibility allows it to scale from simple microcontrollers to complex processors requiring virtual memory management.

**Key architectural features include:**
- **Symmetric Multi-Processing (SMP):** Support for multi-core systems.
- **Pre-emptible Kernel:** Ensuring deterministic real-time behavior.
- **Loadable Kernel Modules:** Allowing for lightweight embedded shared libraries.
- **VFS (Virtual File System):** A unified interface for pseudo-file systems, block devices, and network-mounted volumes.

## Extensive Hardware Support

NuttX supports a vast array of processor architectures, making it one of the most versatile RTOSs available. Supported platforms include:
- **ARM:** Cortex-M0/M3/M4/M7, Cortex-A5/A8/A9, and Cortex-R4.
- **RISC-V:** Support for various RISC-V implementations.
- **Xtensa:** Native support for the Espressif ESP32.
- **Legacy Architectures:** Support for 80x86, Zilog Z80, MIPS, and Atmel AVR.

## Networking and Connectivity

The networking stack in NuttX is comprehensive, supporting IPv4, IPv6, TCP/IP, UDP, and ICMP. It includes a BSD-compatible socket interface and supports advanced features like 6LoWPAN for wireless networking, IP forwarding, and DNS resolution. It also provides a suite of network utilities including DHCP, SMTP, Telnet, FTP, and a THTTPD integration for embedded web serving.

## Graphics and User Interface

For devices requiring visual output, NuttX includes the NX Graphics subsystem, which provides a windowing system and font support. It also integrates with popular third-party libraries like LittlevGL (LVGL) for creating modern, high-performance graphical user interfaces. Support for framebuffers, LCD drivers (serial and parallel), and VNC servers allows for diverse display configurations.

## Development and Configuration

NuttX utilizes a Kconfig-based configuration system, similar to the Linux kernel. This allows developers to enable or disable specific features, drivers, and stack options through a menu-driven interface, ensuring that the final binary only contains the code necessary for the target application. The build system supports various environments, including Linux, macOS, and Windows (via Cygwin, MSYS2, or WSL).
