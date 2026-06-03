---
title: STM32F030 CMake CMSIS Project Skeleton
summary: A project template for developing STM32F030 applications using VSCode, CMake,
  and CMSIS. It provides a complete build system with Ninja, semihosting support,
  and integrated debugging configurations for ARM Cortex-M0 microcontrollers.
slug: stm32f030-cmake-cmsis-project-skeleton
codeUrl: https://github.com/JohnBerg60/stm32F030-cmake-cmsis
star: 6
lastUpdated: '2019-12-11'
rtos: cmsis
topics:
- cmake
- cmsis
- stm32
- vscode
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32-cmake-cmsis-project-skeleton
- stm32-base-project-template
- stm32-rtic-project-template
- stm32-makefile-freertos-project-template
- clion-for-stm32
- stm32-starter-project-for-arch-max
---

## Modern STM32 Development with VSCode and CMake

The STM32F030 CMake CMSIS project provides a robust skeleton for developers looking to move away from heavy, proprietary IDEs toward a more flexible, modern development environment. By combining Visual Studio Code, CMake, and the ARM GNU Toolchain, this project offers a streamlined workflow for targeting the STM32F030 series of microcontrollers.

## Core Components and Workflow

At the heart of this project is a CMake-based build system designed to work seamlessly with the Ninja build generator. This approach ensures fast compilation times and cross-platform compatibility. The project utilizes the CMSIS (Cortex Microcontroller Software Interface Standard) library as a submodule, providing a standardized hardware abstraction layer for the Cortex-M0 processor.

Key tools integrated into this workflow include:
- **GCC ARM Embedded Toolchain**: For cross-compilation of C, C++, and Assembly code.
- **OpenOCD**: For flashing and on-chip debugging.
- **Cortex Debug Extension**: To provide a professional debugging experience within VSCode.
- **Ninja**: A small build system with a focus on speed.

## Technical Implementation

The repository includes essential low-level files required for bare-metal STM32 development. This includes a custom linker script (`STM32F030F4Px_FLASH.ld`) that defines the memory layout for the 16KB Flash and 4KB RAM typical of the F030 series. It also provides the assembly startup code (`startup_stm32f030x6.s`) which handles the initial stack pointer setup, vector table initialization, and the transition to the C runtime.

The `CMakeLists.txt` is configured to handle the specific requirements of the Cortex-M0 architecture, including compiler flags for `-mcpu=cortex-m0` and `-mthumb`. It also automates the generation of `.bin` and `.hex` files post-build and invokes the size tool to provide immediate feedback on memory usage.

## Advanced Debugging with Semihosting

One of the standout features of this project setup is the pre-configured support for semihosting. Semihosting allows the embedded target to communicate directly with the host computer's debugger. This enables the use of standard library functions like `printf()` to send debug messages directly to the VSCode Output window over the ST-Link interface. This eliminates the need to dedicate a hardware UART peripheral and external serial monitor for basic logging, significantly speeding up the "quick and dirty" debugging phase of development.

## Getting Started

To use this skeleton, developers can clone the repository and initialize the CMSIS submodule. The project is designed to be easily adaptable; by modifying the `CMakeLists.txt` and the linker script, it can be ported to other members of the STM32F0 family. The README provides a comprehensive guide on setting up the environment on Windows 10, including path configurations for the toolchain and VSCode extension settings for IntelliSense and debugging.
