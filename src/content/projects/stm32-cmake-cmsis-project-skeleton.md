---
title: STM32 CMake CMSIS Project Skeleton
summary: A comprehensive project skeleton and workflow for developing STM32 applications
  using VSCode, CMake, and CMSIS. It provides a pre-configured environment for building,
  flashing, and debugging STM32 microcontrollers with support for semihosting and
  the Ninja build system.
slug: stm32-cmake-cmsis-project-skeleton
codeUrl: https://github.com/JohnBerg60/stm32-cmake-cmsis
star: 10
lastUpdated: '2019-12-12'
rtos: cmsis
topics:
- cmake
- cmsis
- ninja
- stm32
- stm32f103
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32f030-cmake-cmsis-project-skeleton
- stm32-base-project-template
- clion-for-stm32
- stm32-starter-project-for-arch-max
- stm32-makefile-freertos-project-template
- stm32-rtic-project-template
---

## Overview

Developing for STM32 microcontrollers often involves complex IDEs or manual Makefile management. This project provides a modern, lightweight alternative by leveraging Visual Studio Code and CMake. It serves as a skeleton project that integrates the ARM GNU Toolchain, OpenOCD for debugging, and the CMSIS hardware abstraction layer into a cohesive development environment.

## Workflow and Toolchain

The core of the project is its CMake-based build system. By using `arm-none-eabi-gcc` and the Ninja build generator, it offers fast, cross-platform compilation. The configuration is designed to be flexible, allowing developers to easily switch between different STM32 families, such as the Cortex-M3 based STM32F103 or the Cortex-M0 based STM32F030. 

The workflow is optimized for Windows 10 users using VSCode, but it relies on standard open-source tools including:
- **GCC ARM Embedded Toolchain**: For cross-compilation.
- **MinGW-W64**: Used for build utilities.
- **OpenOCD**: For flashing and on-chip debugging.
- **Ninja**: For high-performance build execution.

## Key Features

One of the standout features of this setup is the integration of **semihosting**. This allows developers to use standard C library functions like `printf` to send debug information directly to the VSCode output window via the ST-Link interface. This eliminates the need to configure a dedicated UART peripheral and external serial monitor for basic debugging tasks, significantly speeding up the initial development phase.

### Technical Implementation

The project includes essential low-level components required for bare-metal development:
- **Linker Scripts**: Custom `.ld` files for memory layout management (e.g., STM32F103C8Tx with 64KB Flash and 20KB RAM).
- **Startup Code**: Assembly files (`.s`) containing the vector table and initial system setup.
- **CMSIS Integration**: Managed via Git submodules to provide standardized access to peripheral registers.
- **SVD Support**: Includes System View Description files for peripheral-aware debugging within the VSCode environment.

## Debugging and Development

For debugging, the project utilizes the Cortex-Debug extension for VSCode, providing a rich interface for stepping through code, inspecting registers, and viewing memory. The provided `launch.json` and `tasks.json` files automate the process of building and flashing the firmware, making the "edit-compile-debug" cycle seamless.

### Getting Started

To use this skeleton, developers clone the repository and initialize the CMSIS submodule. The build process is handled through CMake:

```sh
$ cd build
$ cmake -DCMAKE_TOOLCHAIN_FILE=../cmake/arm-none-eabi.cmake -G Ninja ..
$ ninja
```

The project also defines several useful commands for the development lifecycle, such as `make flash` for firmware deployment and `make info` to retrieve details about the connected target device. This setup ensures that developers can focus on application logic rather than build system maintenance.
