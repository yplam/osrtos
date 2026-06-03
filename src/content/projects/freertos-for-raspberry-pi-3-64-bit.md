---
title: FreeRTOS for Raspberry Pi 3 (64-bit)
summary: A 64-bit port of FreeRTOS for the Raspberry Pi 3, based on the Xilinx Cortex-A53
  port. It supports execution on QEMU and provides a basic environment for running
  FreeRTOS tasks on ARMv8-A hardware.
slug: freertos-for-raspberry-pi-3-64-bit
codeUrl: https://github.com/eggman/FreeRTOS-raspi3
star: 21
lastUpdated: '2021-09-19'
rtos: freertos
topics:
- aarch64
- freertos
- raspberrypi
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- freertos-port-for-raspberry-pi
- freertos-port-for-risc-v
- raspberry-pi-rtos-rpi-rtos
- apache-nuttx-rtos-on-64-bit-risc-v
- apache-nuttx-rtos-for-pine64-star64
- rp2040-freertos-template
---

## Overview

The `FreeRTOS-raspi3` project provides a functional port of the FreeRTOS real-time operating system to the Raspberry Pi 3, specifically targeting the 64-bit ARMv8-A architecture. While many Raspberry Pi projects focus on Linux, this repository offers a bare-metal alternative for developers looking to leverage the deterministic scheduling and low-overhead nature of FreeRTOS on the Cortex-A53 SoC.

## Architecture and Porting

This port is derived from the Xilinx Cortex-A53 FreeRTOS port, adapted to the specific peripherals and memory map of the Raspberry Pi 3 (BCM2837). It utilizes the AArch64 execution state, providing a foundation for high-performance embedded applications. The project includes the necessary startup code, exception vectors, and tick configuration required to get the FreeRTOS kernel running on the Broadcom SoC.

## Hardware and Emulation

The project is designed to run on Raspberry Pi 3 hardware, though the primary testing environment documented is QEMU 6.1.0. Using the `raspi3` machine model in QEMU, developers can simulate the environment without needing physical hardware. The build system generates a `kernel8.elf` file, which is the standard naming convention for 64-bit ARM kernels on the Raspberry Pi.

## Technical Implementation

The build process is managed via a standard Makefile and requires an `aarch64-none-elf` cross-compilation toolchain. The project includes a custom linker script, `raspberrypi3.ld`, which defines the memory layout. The code is configured to start at address `0x80000`, the default load address for 64-bit kernels on the Pi 3.

Key memory sections defined in the linker script include:
- **.text**: Contains the exception vectors and boot code.
- **.data**: For initialized global variables.
- **.bss**: For uninitialized data, which is zeroed out during startup.

## Getting Started

To build the project, users simply need to install the AArch64 toolchain and run `make`. The repository includes a basic demo that initializes a UART for serial output, allowing for "hello world" style debugging and verification of the scheduler.

```bash
# To build the kernel
make

# To run in QEMU
make run
```

The demo output confirms the kernel is running by printing to the serial console, demonstrating that the UART driver and the FreeRTOS scheduler are functioning correctly in the emulated environment. This project serves as an excellent starting point for developers interested in ARMv8-A bare-metal development or those needing a lightweight RTOS for Raspberry Pi-based industrial or control applications.
