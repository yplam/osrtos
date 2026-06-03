---
title: Apache NuttX RTOS for Pine64 Star64
summary: A comprehensive port of the Apache NuttX RTOS to the Pine64 Star64 64-bit
  RISC-V single-board computer. It provides hardware support for the StarFive JH7110
  SoC, including PLIC interrupts, UART, and display controller integration, supported
  by automated daily builds and extensive technical documentation.
slug: apache-nuttx-rtos-for-pine64-star64
codeUrl: https://github.com/lupyuen/nuttx-star64
siteUrl: https://nuttx.apache.org/docs/latest/platforms/risc-v/jh7110/boards/star64/index.html
star: 32
version: nuttx-star64-2026-01-04
lastUpdated: '2025-01-31'
rtos: nuttx
topics:
- jh7110
- nuttx
- riscv
- riscv64
- star64
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- apache-nuttx-rtos-on-64-bit-risc-v
- apache-nuttx-rtos-for-pinephone
- pinedio-stack-bl604-on-apache-nuttx-rtos
- pinephone-usb-driver-for-apache-nuttx-rtos
- mbed-os-6-port-for-weact-stm32h743vit6
- micropython-for-kendryte-k210-lobo-port
---

The Pine64 Star64 is a high-performance 64-bit RISC-V single-board computer powered by the StarFive JH7110 SoC. This repository documents the ongoing effort to port and optimize the Apache NuttX Real-Time Operating System (RTOS) for the Star64, offering a lightweight, POSIX-compliant alternative to Linux for developers working on RISC-V hardware.

## Hardware and SoC Integration

The StarFive JH7110 SoC at the heart of the Star64 features a quad-core SiFive U74 RISC-V processor. Because the Star64 shares a similar architecture with the StarFive VisionFive 2, this port provides broad compatibility across the JH7110 ecosystem. The project focuses on low-level hardware enablement, including the Platform-Level Interrupt Controller (PLIC), 8250-compatible UART registers, and the complex display controller.

## The Boot Sequence and U-Boot Compatibility

One of the most critical technical challenges addressed in this project is the integration with standard bootloaders. The Star64 typically boots using OpenSBI (Supervisor Binary Interface) and U-Boot. To ensure NuttX can be loaded seamlessly by U-Boot—which is often configured to expect a Linux kernel—the NuttX kernel image is built with a RISC-V Linux Header. This header includes the necessary magic numbers and offsets to allow U-Boot to load the RTOS binary into RAM at the standard address of `0x40200000` and execute it as if it were a standard kernel.

## Key Technical Features

The repository serves as a hub for several deep-dive technical experiments and implementations:

- **Interrupt Handling**: Implementation of RISC-V PLIC interrupts to manage hardware events across the SoC.
- **Serial I/O**: Configuration of the DesignWare APB UART for system console and debugging.
- **Display Controller**: Initializing the StarFive JH7110 display pipeline to enable graphical output.
- **Semihosting and RAM Disks**: Support for RISC-V semihosting to facilitate debugging and the use of initial RAM disks for file system access before external storage is fully initialized.
- **Privilege Levels**: Managing transitions between RISC-V Machine, Supervisor, and User modes within the RTOS context.

## Automated Development Workflow

To maintain high code quality and track the rapid development of the upstream Apache NuttX project, this repository features an automated daily build system powered by GitHub Actions. These workflows automatically compile the NuttX kernel and application suite for the Star64 target, generating fresh releases that developers can download and test on their hardware immediately.

## Getting Started

For developers looking to deploy NuttX on their own Star64 or VisionFive 2 boards, the project provides a wealth of resources. The documentation includes guides on using Ghidra for decompiling kernel images, configuring TFTP for network booting, and setting up serial consoles for real-time debugging. The project also provides Device Tree Source (DTS) files that define the hardware layout for the JH7110, which are essential for proper peripheral initialization.
