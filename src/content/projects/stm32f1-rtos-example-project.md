---
title: STM32F1 RTOS Example Project
summary: An example project demonstrating the implementation of CMSIS-RTOS2 (RTX v5)
  on an STM32F107-based Cortex-M3 microcontroller. It utilizes the GNU ARM toolchain
  and provides a complete build system for compiling, flashing, and debugging RTOS-based
  firmware.
slug: stm32f1-rtos-example-project
codeUrl: https://github.com/fcayci/stm32f1-rtos
star: 4
lastUpdated: '2017-05-20'
rtos: cmsis
topics:
- arm
- c
- cmsis
- cortex-m3
- rtos
- stm32f107
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- qemu-emulation-for-ti-lm3s6965-cortex-m3
- stm32f103c8-freertos-cmsis-blink-example
- cmsis-rtos-on-micro-bit
- stm32f107-makefile-freertos-template
- stm32-makefile-freertos-project-template
- stm32-libopencm3-freertos-platformio-template
---

## Overview

The stm32f1-rtos repository provides a streamlined example for developers looking to run CMSIS-RTOS2 on STM32F1 series microcontrollers. Specifically targeting the STM32F107 (Cortex-M3), this project serves as a foundational template for building real-time applications using the Keil RTX5 implementation of the CMSIS-RTOS2 API. The project is designed to be built with the open-source GNU ARM toolchain, making it accessible for developers working on Linux, macOS, or Windows environments.

## Technical Architecture

The project integrates several core components essential for modern embedded development:

- **CMSIS-RTOS2 (RTX v5):** The project uses the Keil RTX5 real-time operating system, which is a full-featured RTOS kernel that implements the CMSIS-RTOS v2 API. This allows for deterministic multitasking, thread management, and inter-thread communication.
- **CMSIS-5 Library:** The project depends on the ARM CMSIS-5 library for hardware abstraction and standardized access to the Cortex-M3 core.
- **GNU ARM Toolchain:** Unlike many STM32 projects that rely on proprietary IDEs, this project uses a standard `makefile` approach with `arm-none-eabi-gcc`.
- **Hardware Control:** The example application demonstrates basic GPIO manipulation by toggling pins 14 and 15 on PORTE, providing a visual confirmation of the RTOS scheduler's operation.

## Key Configuration Files

Understanding the project structure is straightforward thanks to its clean organization:

- **RTX_Config.h & RTX_Config.c:** These files contain the kernel configuration, including tick frequency (defaulted to 1000Hz), round-robin timeout settings, and memory management options for threads, mutexes, and semaphores.
- **stm32.ld:** A custom linker script that defines the memory layout for the STM32F107, specifying 64KB of RAM and 256KB of Flash.
- **startup_ARMCM3.S:** The assembly-level startup code that handles the vector table, stack initialization, and the transition to the C runtime.
- **makefile:** A comprehensive build script that manages compilation, hex/bin generation, and provides targets for flashing (`make burn`) and debugging (`make debug`).

## Development Workflow

The project is optimized for a command-line driven workflow. Once the toolchain and the STLink utility are installed, developers can initialize the environment by pulling the CMSIS-5 library via Git submodules. 

Compilation is handled via a simple `make` command, which produces the `main.elf` binary along with memory usage statistics. For deployment, the project includes a `burn` target that uses `st-flash` to write the binary to the microcontroller's flash memory. 

Debugging is supported through `gdb` and `st-util`. By running `make debug`, developers can launch a TUI-based debugging session with pre-configured commands to connect to the target and display assembly and register layouts, providing a robust environment for troubleshooting RTOS-level issues.
