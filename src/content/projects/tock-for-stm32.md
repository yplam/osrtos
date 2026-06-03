---
title: Tock for STM32
summary: A port of the Tock operating system for STM32 microcontrollers and development
  boards. It provides support for the Nucleo-F103RB and STM32F4DISCOVERY boards, leveraging
  Tock's secure kernel architecture for embedded systems.
slug: tock-for-stm32
codeUrl: https://github.com/tock/tock-stm32
siteUrl: https://www.tockos.org/
star: 23
lastUpdated: '2021-01-22'
rtos: tock
topics:
- stm32
- stm32f1
- tock
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- mbed-os-6-port-for-weact-stm32h743vit6
- blackpill-stm32f401ce-support-for-mbed-os-6
- pinetime-tock
- mbed-os-6-support-for-weact-black-pill-stm32f401cc
- mbed-os-6-support-for-weact-black-pill-stm32f411ce
- bluepill-board-support-for-mbed-os-6
---

## Overview

Tock for STM32 is a specialized port of the Tock operating system, a secure, embedded OS designed for microcontrollers. Tock is unique in the embedded landscape because it uses a kernel written in Rust to provide memory safety and isolation. It separates the kernel (capsules) from user-space applications (processes), allowing for a robust and secure multi-tenant environment on resource-constrained hardware like the STM32 series.

While this specific repository is now archived—as support has been upstreamed to the main Tock repository—it remains a significant reference for the initial porting efforts of Tock to the STM32 ecosystem. It demonstrates how the kernel's architecture is adapted for the specific memory maps and peripheral sets of the STMicroelectronics hardware.

## Hardware Support

The project specifically targeted popular development platforms that are staples in the embedded community:

- **Nucleo-F103RB**: Based on the ARM Cortex-M3 core, this board is widely used for general-purpose prototyping.
- **STM32F4DISCOVERY**: Featuring the ARM Cortex-M4 core with floating-point support, this board is often used for signal processing and more intensive embedded tasks.

Beyond these specific boards, the Tock ecosystem supports a wide array of other STM32-based hardware through its main development branch.

## Technical Implementation

The repository is structured to separate chip-specific logic from board-specific configurations. The `chips/` directory contains the peripheral drivers and hardware abstraction layers for the STM32 family, while the `boards/` directory contains the pin mappings and system initialization code for specific development kits.

The build system is managed via a root Makefile that provides several utility targets:
- `allboards`: Compiles the kernel for all supported STM32 boards.
- `alldoc`: Generates technical documentation for the various board implementations.
- `format`: Ensures code consistency by running `rustfmt` across the source tree.

## Getting Started

To work with Tock on STM32, developers typically need the Rust toolchain configured for cross-compilation to ARM Cortex-M targets. The project relies on the `tockloader` utility for flashing binaries and managing applications on the hardware. 

Building for a specific board is straightforward. For example, to build for the Nucleo-F103RB, a developer would navigate to the board's directory and execute:

```bash
cd boards/nucleo_f103
make
```

Loading the kernel onto the hardware is usually handled via `make program` or `make flash`, depending on the specific board's debug interface (typically ST-LINK).

## Legacy and Upstreaming

As noted in the project documentation, mainstream STM32 support has been moved into the main Tock kernel repository. This archival status indicates that the STM32 port has reached a level of maturity where it is now maintained alongside the core Tock components, ensuring better integration with the latest kernel features and security updates.
