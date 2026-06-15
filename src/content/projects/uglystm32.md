---
title: UglySTM32
summary: A lightweight development environment for STM32 microcontrollers focusing
  on the STM32F4 series. It utilizes only CMSIS and Makefiles, intentionally avoiding
  HAL and LL libraries to provide a clean and simple bare-metal programming experience.
slug: uglystm32
codeUrl: https://github.com/michaeldaranto/UglySTM32
star: 0
lastUpdated: '2022-05-04'
rtos: cmsis
topics:
- bare-metal
- cmsis
- stm32
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32f1xx-bare-metal-template
- stm32f103-cmsis-libraries-and-projects
- stm32-bare-metal-learning-labs
- embedded-systems-bare-metal-programming-ground-up
- minimal-mbed-os-template-for-stm32f103
- stm32-bare-metal-code-generator
---

## Overview

UglySTM32 is a minimalist development environment designed for STM32 microcontrollers, specifically targeting the STM32F4xx series (with a focus on the affordable STM32F411). The project's core philosophy is simplicity and transparency, adhering to a "No HAL & LL" approach. Instead, it relies exclusively on CMSIS (Cortex Microcontroller Software Interface Standard) and standard Makefiles to manage the build process. 

Forked from the STM32-base project, UglySTM32 aims to provide a "clean and ugly" foundation for developers who prefer to work closer to the hardware without the overhead or abstraction layers provided by STMicroelectronics' Hardware Abstraction Layer (HAL) or Low-Layer (LL) APIs.

## Project Structure and Philosophy

The repository is organized into a clear, logical hierarchy that separates the core architecture from user projects:

- **Base**: Contains the essential linker scripts, common Makefiles, and startup assembly files required for the STM32F4xx family.
- **CMSIS**: Includes the standard ARM CMSIS headers and STM32-specific device headers and system source files.
- **Projects**: A dedicated space for user applications, where each project contains its own source code and local Makefile.
- **Tools**: A placeholder directory for the GNU Arm Embedded Toolchain (`arm-none-eabi`), ensuring that the compiler and utilities are kept close to the project environment.

By stripping away the complex middleware often found in modern embedded IDEs, UglySTM32 allows developers to see exactly how their code interacts with the register map and the hardware's startup sequence.

## Technical Workflow

The environment is built around a traditional command-line workflow. Developers use a standard GNU Makefile system to manage their builds. The primary commands include:

- `make`: Compiles the source code into binary and ELF formats.
- `make flash`: Uploads the compiled firmware to the STM32 chip.
- `make clean`: Removes object files and binaries to ensure a fresh build.

This approach is highly portable and avoids the "vendor lock-in" associated with specific Integrated Development Environments (IDEs). It encourages a deep understanding of the compilation pipeline, from source code to the final binary image.

## Hardware and Extensibility

While the project comes pre-configured for the STM32F411, it is designed to be extensible. The documentation provides a roadmap for adding support for other chips, such as the STM32F1 or STM32F7 series. This involves integrating the relevant CMSIS device files from STMicroelectronics and obtaining the appropriate linker and startup files from the STM32-base project. 

Because it uses standard CMSIS, the code written within this environment is highly portable across different ARM Cortex-M microcontrollers, provided the developer manages the peripheral register access directly. This makes UglySTM32 an excellent choice for educational purposes, high-performance applications where overhead must be minimized, or for developers who simply enjoy the control offered by bare-metal programming.
