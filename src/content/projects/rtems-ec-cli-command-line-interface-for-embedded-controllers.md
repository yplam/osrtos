---
title: 'RTEMS EC-CLI: Command Line Interface for Embedded Controllers'
summary: A command-line interface framework for embedded controllers built on the
  RTEMS Real-Time Operating System. It provides a modular CLI environment for x86
  and ARM-based systems, supporting advanced boot configurations like coreboot and
  SeaBIOS.
slug: rtems-ec-cli-command-line-interface-for-embedded-controllers
codeUrl: https://github.com/maxpoliak/rtems-ec-cli
star: 5
version: v1.1
lastUpdated: '2021-11-09'
rtos: rtems
topics:
- cli
- console-application
- coreboot
- embedded-controller
- embedded-systems
- rtems
- rtos
- x86
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- breadboardos
- picoshell
- chibios
- arm-control-framework-acorns-rover
- mos-rtos
- minios-esp
---

## Overview

RTEMS EC-CLI is a command-line interface (CLI) application designed for embedded controllers running the RTEMS (Real-Time Executive for Multiprocessor Systems) RTOS. RTEMS is a high-performance, open-source real-time operating system used extensively in space exploration, automotive electronics, and robotics. This project serves as a foundational base for developing embedded applications that require a robust interactive console for monitoring and control.

The project is based on the `ile-cli` framework, adapting it to work within the RTEMS environment. It is particularly focused on x86-based embedded systems and ARM microcontrollers, providing a bridge between the RTOS kernel and user-facing diagnostic tools.

## Key Features

RTEMS EC-CLI offers several features tailored for embedded development and system management:

- **Modular CLI Structure**: Built on a command tree architecture, allowing for organized and hierarchical command sets.
- **Terminal Emulation**: Includes support for virtual terminals with features like command history and colorized output.
- **Cross-Platform Compatibility**: While primarily tested on x86 (pc386) and ARM, the architecture is designed to be portable across various RTEMS-supported architectures.
- **Advanced Boot Support**: Detailed configurations for booting via GRUB2, as well as integration with coreboot and SeaBIOS for x86 hardware.
- **Simulation Ready**: Full support for testing within the QEMU emulator, facilitating rapid development without physical hardware.

## Technical Implementation

The project utilizes the Waf build system, a Python-based tool common in the RTEMS ecosystem. The build process is orchestrated through a comprehensive `build.sh` script that manages the entire lifecycle of the software, including:

1.  **Cross-Compiler Toolchain**: Building the necessary RTEMS Source Builder (RSB) tools.
2.  **RTEMS Kernel**: Configuring and compiling the RTEMS OS for specific Board Support Packages (BSPs) like `pc386`.
3.  **Application Logic**: Compiling the CLI application and linking it against the RTEMS libraries.

The core logic is implemented in C, with `main.c` and `init.c` handling the RTEMS initialization tasks and the CLI loop. The project also demonstrates how to package the resulting executable into bootable disk images using GRUB2.

## Hardware and Booting

A unique aspect of this project is its focus on modern x86 embedded booting. Beyond standard BIOS loading, it provides instructions and scripts for running RTEMS on hardware initialized by coreboot and SeaBIOS. This makes it a valuable reference for developers working on open-source firmware stacks for industrial or embedded x86 platforms.

## Getting Started

The repository includes a `docker.sh` script to provide a consistent build environment, avoiding dependency issues on the host system. A typical build workflow involves preparing the source tree and running the build script:

```bash
./build.sh all
```

This command automates the compilation of the cross-compiler, the RTEMS kernel, and the CLI application. Once built, the system can be tested immediately in QEMU using the provided `run.sh` script, which simulates an i386 target. For real hardware deployment, the project includes scripts to create virtual boot disk images and install the GRUB2 bootloader.
