---
title: NuttX Porting for BBC micro:bit
summary: A collection of technical notes and documentation for porting the NuttX RTOS
  to the BBC micro:bit hardware. It focuses on the ARM Cortex-M0+ architecture and
  the NXP MKL26Z128VFM4 microcontroller used in the micro:bit interface.
slug: nuttx-porting-for-bbc-micro-bit
codeUrl: https://github.com/SaitoYutaka/nuttx_microbit
star: 0
lastUpdated: '2020-03-01'
rtos: nuttx
topics:
- memo
- microbit
- notes
- nuttx
- study
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- cmsis-rtos-on-micro-bit
- micropython-for-the-bbc-micro-bit
- stm32-m-nuttx-custom-board-mod
- apache-nuttx-rtos-for-pine64-star64
- nuttx-rtos-experiments
- arm-kl25z-mbed-ide-example-programs
---

## Overview

The nuttx_microbit project serves as a technical repository for developers interested in porting the Apache NuttX Real-Time Operating System (RTOS) to the BBC micro:bit. The project documents the specific hardware nuances of the micro:bit, particularly focusing on its ARM Cortex-M0 and M0+ architecture and the underlying NXP Kinetis microcontrollers.

## Hardware Architecture

The BBC micro:bit is a unique platform that utilizes multiple processors. While the main application processor is often associated with the Nordic nRF51 series, this project highlights the importance of the interface MCU, specifically the Freescale (NXP) MKL26Z128VFM4. This chip features an ARM Cortex-M0+ core, 128KB of Flash ROM, and 16KB of RAM, running at 16MHz. Understanding the differences between the Cortex-M0 and the M0+ is critical for a successful RTOS port, as the M0+ offers improved pipeline efficiency and lower power consumption.

## Porting Strategy with NuttX

The documentation provides a roadmap for integrating a new board into the NuttX build system. This involves several key steps:

- **Board Configuration**: Creating a new board directory within the NuttX structure (e.g., `boards/arm/kl/microbit`).
- **Kconfig Integration**: Modifying the `boards/Kconfig` file to allow the new board to be selectable via `make menuconfig`.
- **MCU Selection**: Configuring the system to recognize the specific MCU using flags like `CONFIG_ARCH_CHIP_MYMCU`.

## Serial Console and UART Drivers

A significant portion of the porting effort focuses on the serial console, which is essential for interacting with the NuttX shell (NSH). The project references the existing `freedom-kl25z` board configuration as a baseline. Since the micro:bit lacks on-board RS-232 drivers, the porting notes describe how to connect the UART pins to an external TTL-to-Serial USB adaptor or utilize the OpenSDA USB CDC/ACM port.

For the MKL26Z128VFM4, UART0 is typically used as the serial console. The documentation identifies specific pin mappings, such as PTA1 for RX and PTA2 for TX, which are accessible via the board's expansion headers. This level of detail is vital for developers needing to establish a reliable communication link with the RTOS kernel.

## Technical Resources

The repository acts as a curated list of resources, linking to the official NuttX Porting Guide, NXP documentation for the Kinetis KL2x series, and community blog posts regarding Cortex-M0 compilation. These resources provide the necessary context for handling the specific memory maps and peripheral registers required to bring up a stable NuttX environment on the micro:bit hardware.
