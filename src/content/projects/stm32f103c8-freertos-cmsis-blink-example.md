---
title: STM32F103C8 FreeRTOS CMSIS Blink Example
summary: A foundational blink example for the STM32F103C8 microcontroller using FreeRTOS
  and CMSIS. It provides a clean project structure for Keil µVision, incorporating
  the official FreeRTOS V202012.00 and standard peripheral drivers.
slug: stm32f103c8-freertos-cmsis-blink-example
codeUrl: https://github.com/mhdfasilwyd/STM32F103C8_FreeRTOS_CMSIS
star: 0
lastUpdated: '2021-02-06'
rtos: freertos
topics:
- cmsis
- freertos
- stm32
- stm32f103
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32-libopencm3-freertos-platformio-template
- stm32f1-rtos-example-project
- lpc43xx-freertos-led-blinking-example
- stm32f103rb-templates-and-examples
- seal-test-bare-bones-example
- stm32l475-freertos-iot-project
---

## Overview

The STM32F103C8 FreeRTOS CMSIS project is a clean, "from scratch" implementation of a blink example for the popular STM32F103C8 microcontroller, often found on "Blue Pill" development boards. While the primary demonstration is a simple LED blink, the repository is structured as a comprehensive template that includes all necessary standard files and configurations to serve as a starting point for more complex RTOS-based embedded applications.

## Technical Stack

The project is built using professional-grade embedded development tools and middleware:
- **Microcontroller**: STM32F103C8 (ARM Cortex-M3)
- **RTOS**: FreeRTOS V202012.00 (Official Version)
- **Hardware Abstraction**: CMSIS (Cortex Microcontroller Software Interface Standard) and STM32 Standard Peripheral Drivers
- **IDE/Toolchain**: Keil µVision V5.29.0 using the ARMCC compiler

## Project Structure

The repository is organized into logical groups that reflect a standard embedded project architecture:
- **CMSIS**: Contains the core Cortex-M3 support files and the STM32F10x standard peripheral drivers (GPIO, RCC).
- **FreeRTOS**: Includes the full source code for the FreeRTOS kernel, including task management, queue handling, and timers. It specifically uses `heap_1.c` for memory management.
- **Code**: Houses the application-specific logic, such as the `blink.c` source file.
- **Startup**: Contains the assembly startup code required for the microcontroller's boot sequence.

## Key Features

The project provides a pre-configured environment where the FreeRTOS scheduler is already integrated with the STM32 hardware. This includes the necessary porting files that bridge the FreeRTOS kernel with the ARM Cortex-M3 architecture. By using the Standard Peripheral Library (StdPeriph), the project offers a traditional approach to hardware register abstraction, which is widely documented and understood in the STM32 community.

## Getting Started

To use this project, developers can open the `Blink_RTOS.uvprojx` file in Keil µVision. The project is set up to generate a HEX file upon compilation, which can then be flashed to an STM32F103C8 board using a programmer like an ST-Link. Because it includes the standard peripheral drivers and a full FreeRTOS implementation, users can easily extend the `blink.c` file to include additional tasks, queues, or hardware interactions without having to manually import the RTOS kernel or driver files.
