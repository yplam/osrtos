---
title: QEMU Emulation for TI LM3S6965 Cortex-M3
summary: A project demonstrating how to emulate the Texas Instruments LM3S6965 Cortex-M3
  microcontroller using QEMU. It provides a complete cross-compilation environment
  using the GNU Arm Embedded Toolchain and integrates CMSIS, including support for
  RTX and RTX2 RTOS kernels.
slug: qemu-emulation-for-ti-lm3s6965-cortex-m3
codeUrl: https://github.com/Introduction-To-System-On-Chip/QEMU_lm3s6965evb
siteUrl: https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-rm/downloads
star: 14
lastUpdated: '2021-03-21'
rtos: cmsis
topics:
- arm
- cmsis
- lm3s6965evb
- makefile
- mpu
- qemu
- rtos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32f1-rtos-example-project
- cmsis-rtos-on-micro-bit
- cortex-m33-trustzone-experiments-on-qemu-an505
- tiva-tm4c1294-launchpad-freertos-demo
- seal-test-bare-bones-example
- echronos-on-stm32f4x-nucleo-board
---

## Overview

This project provides a comprehensive environment for emulating the Texas Instruments LM3S6965, a Cortex-M3-based microcontroller, using QEMU. It is designed as an educational resource for understanding System-on-Chip (SoC) development without requiring physical hardware. By leveraging the Arm-v7-M architecture emulation in QEMU, developers can write, compile, and debug firmware for a real-world embedded target on a standard Linux machine.

## Technical Architecture

The project is built around the GNU Arm Embedded Toolchain (`gcc-arm-none-eabi`) and the CMSIS (Cortex Microcontroller Software Interface Standard) framework. The build system is managed via a detailed Makefile that handles the cross-compilation of C and Assembly source files into an ELF binary suitable for the LM3S6965 platform.

Key technical components include:
- **Startup Code**: Custom startup routines and CMSIS-provided initialization files for the ARMCM3 device.
- **Linker Configuration**: A specialized linker script (`gcc_arm.ld`) that defines the memory layout, including Flash (256KB) and RAM (64KB) boundaries, stack placement, and heap allocation.
- **Semihosting**: Support for ARM semihosting, allowing the guest code to communicate with the host machine for logging and basic I/O operations.
- **UART Drivers**: Basic peripheral drivers for serial communication on the LM3S6965.

## RTOS Integration

One of the most powerful features of this repository is its built-in support for CMSIS-RTOS. The Makefile includes specific targets and source configurations for both **CMSIS RTX** and **CMSIS RTX2**. This allows users to experiment with real-time scheduling, task management, and synchronization primitives within the emulated environment. The project includes the necessary HAL and SVC table assembly files required to port these RTOS kernels to the Cortex-M3 target.

## Debugging and Emulation

The project emphasizes a robust debugging workflow. QEMU is configured to act as a GDB server, allowing developers to connect `arm-none-eabi-gdb` to the running emulation. This setup supports:
- Instruction-level stepping
- Breakpoint management
- Inspection of CPU registers and memory
- Exception tracing (e.g., Data Aborts or MemManage violations)

## Getting Started

The project is designed for Linux environments (like Ubuntu). After cloning the repository with submodules to include CMSIS, users can compile the project using `make`. The environment is pre-configured to target the `lm3s6965evb` machine in QEMU. 

```c
// Example of the semihosting implementation used for logging
void semihost(int sys_id, const void *arg)
{
  register int r0 __asm__ ("r0") = sys_id;
  register const void *r1 __asm__ ("r1") = arg;
  __asm__ volatile ("bkpt 0xab");
  (void) r0;
  (void) r1;
}
```

By providing a bridge between high-level C code and low-level hardware emulation, this project serves as an excellent starting point for those looking to explore ARM firmware development and RTOS internals.
