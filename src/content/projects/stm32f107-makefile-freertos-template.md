---
title: STM32F107 Makefile FreeRTOS Template
summary: A comprehensive project template for the STM32F107VCT6 microcontroller integrating
  FreeRTOS V9.0 and LWIP 2.0.2. It features a modular Makefile-based build system
  designed for the GNU ARM GCC toolchain and STM32 Standard Peripheral Library.
slug: stm32f107-makefile-freertos-template
codeUrl: https://github.com/freelamb/stm32f107_makefile_freertos
siteUrl: http://www.freertos.org
star: 2
lastUpdated: '2019-07-04'
rtos: freertos
libraries:
- lwip
topics:
- freertos
- lwip
- makefile
- network
- stm32
- stm32f107
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32-makefile-freertos-project-template
- stm32-base-project-template
- stm32f429-nucleo-lwip-and-freertos-template
- air32f103-template-project
- stm32l475-freertos-iot-project
- micro-ros-stm32-template
---

## Overview

This project provides a robust starting point for developing embedded applications on the STM32F107VCT6 microcontroller using a purely open-source toolchain. By combining FreeRTOS for task management and LWIP for networking capabilities, it offers a professional-grade foundation for IoT and connectivity-focused firmware. Unlike many vendor-specific IDE projects, this repository utilizes a modular Makefile system, making it highly portable and suitable for continuous integration environments.

## Technical Architecture

The project is structured to separate core components into manageable Makefile fragments, ensuring that the build process remains transparent and easy to modify. The main build system is composed of:

- **Primary Makefile**: Handles the main toolchain definitions (arm-none-eabi-gcc), MCU-specific flags (Cortex-M3), and the final linking process.
- **makefile_freertos.mk**: Manages the inclusion of the FreeRTOS V9.0 kernel source, including the portable layer for ARM CM3 and the heap management strategy (heap_4.c).
- **makefile_std_lib.mk**: Integrates the STM32F10x Standard Peripheral Library (v3.5) and CMSIS core support, defining necessary hardware abstraction layers.

## Key Features

### RTOS Integration
The inclusion of FreeRTOS V9.0 allows for preemptive multitasking, enabling developers to build complex applications with multiple threads of execution. The project is configured for the Cortex-M3 architecture, utilizing the standard GCC port for the STM32F1 series.

### Networking with LWIP
With LWIP 2.0.2 integrated, the project is prepared for TCP/IP communication. This is particularly relevant for the STM32F107 "Connectivity Line" MCUs, which feature an integrated Ethernet MAC. The combination of LWIP and FreeRTOS provides a powerful stack for networked embedded devices.

### Hardware Support
While specifically targeting the STM32F107VCT6, the configuration can be adapted for other members of the STM32F10x family. The project includes a linker script (`stm32_flash.ld`) configured for 256K of Flash and 64K of RAM, and provides a basic hardware abstraction for UART logging and GPIO control (specifically targeting an LED on GPIOE13).

## Development Workflow

The project is designed to be used with the GNU ARM Embedded Toolchain. It includes built-in rules for common development tasks:

- **Building**: Compiling the source code into ELF, HEX, and BIN formats using `make`.
- **Flashing**: Deploying the firmware to the target hardware via `stlink` using `make flash`.
- **Maintenance**: Cleaning the build environment or erasing the MCU flash memory via dedicated make targets.

This template is ideal for developers who prefer a command-line centric workflow and require a stable, version-controlled environment for STM32 development without the overhead of heavy IDEs.
