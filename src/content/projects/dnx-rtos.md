---
title: dnx RTOS
summary: dnx RTOS is a Unix-like operating system layer built on the FreeRTOS kernel,
  designed for 32-bit microcontrollers. It provides a modular architecture featuring
  a virtual file system (VFS), a C-standard compatible program layer, and support
  for multiple CPU architectures including STM32 and EFR32.
codeUrl: https://github.com/devdnl/dnx-rtos
siteUrl: http://www.dnx-rtos.org
isShow: false
rtos: freertos
libraries:
- lwip
- eefs
topics:
- command-line
- ethernet
- freertos
- freertos-distribution
- kernel
- lightweight
- lwip
- microcontroller
- rtos
- stm32f103
- unix-like
star: 17
version: Release-2.4.0
lastUpdated: '2020-12-19'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- minios-esp
- nuttx-real-time-operating-system
- apache-nuttx-rtos
- mos-rtos
- phoenix-rtos-project
- xc-os-a-lightweight-graphical-os-for-mcus
---

The dnx RTOS is a general-purpose operating system designed to bring Unix-like capabilities to small, resource-constrained microcontrollers. Rather than being a completely new kernel from scratch, dnx is built as a sophisticated layer on top of the well-known FreeRTOS kernel. You can think of it as a specialized distribution of FreeRTOS that provides the high-level abstractions typically found in larger operating systems.

### A Unix-Inspired Architecture
One of the standout features of dnx RTOS is its architectural inspiration. By modeling the system on Unix principles, the developers have created an environment that feels familiar to desktop developers. This includes a Virtual File System (VFS) layer, a modular driver system, and a program layer that maintains high compatibility with the C standard. This design makes it significantly easier to port existing C code from a PC environment to an embedded target.

### Key Features and Capabilities
Despite its small footprint, dnx RTOS offers a robust set of features:
- **User Terminal:** A built-in shell accessible via UART for system interaction.
- **Process Management:** The ability to run multiple instances of the same program simultaneously.
- **VFS Layer:** Support for various file systems, including FatFS, EEFS, and RomFS.
- **Dynamic Memory:** Includes a simple garbage collector for managing program memory.
- **Non-Masked Interrupts:** As a true RTOS, the system does not mask interrupts, ensuring deterministic real-time performance.
- **Modular Design:** Users can easily add their own drivers, virtual devices, and applications.

### Hardware Requirements and Support
The system is highly scalable, allowing it to run on very modest hardware. The minimal requirements to start the system with a basic software set are:
- **Flash Memory:** 64 KiB
- **RAM:** 16 KiB (20 KiB recommended)

The project provides extensive Board Support Packages (BSPs) for a wide range of popular development boards, particularly within the STM32 ecosystem. Supported boards include various NUCLEO models (F103RB, F303ZE, F429ZI, F767ZI, H753ZI) and others like the Olimex STM32F405 and EFR32-based platforms.

### Getting Started with dnx RTOS
The build system is based on standard GNU Make and includes a configuration tool to tailor the OS to specific hardware needs. To configure the project, users can run:

```bash
./configure
# or
make config
```

Once configured, compiling the project is as simple as running `make`. The repository is organized logically, with `src/system` containing the core kernel, drivers, and filesystem logic, while `src/application` houses user-level programs and libraries. For developers looking to expand the system, the `tools/` directory contains helpful scripts like `adddriver.sh` and `addprogram.sh` to automate the integration of new components.
