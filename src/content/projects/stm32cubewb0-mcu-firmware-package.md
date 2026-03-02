---
title: STM32CubeWB0 MCU Firmware Package
summary: A comprehensive embedded software platform for the STM32WB0 series microcontrollers.
  It includes CMSIS modules, HAL and LL abstraction layers, BSP drivers for evaluation
  boards, and middleware such as FreeRTOS, FatFs, and the STM32 BLE stack.
slug: stm32cubewb0-mcu-firmware-package
codeUrl: https://github.com/STMicroelectronics/STM32CubeWB0
siteUrl: https://www.st.com/en/microcontrollers-microprocessors/stm32wb0-series.html
star: 18
version: v1.4.0
lastUpdated: '2025-11-21'
rtos: freertos
topics:
- stm32
- stm32cube-mcu-package
- stm32wb0
isShow: false
createdAt: '2026-03-02'
updatedAt: '2026-03-02'
---

## Overview

The STM32CubeWB0 MCU Package is a fundamental component of the STM32Cube initiative, designed to streamline the development process for the STM32WB0 series of wireless microcontrollers. This package provides a highly modular and portable software environment, allowing developers to focus on application logic rather than low-level hardware complexities.

## Architecture and Components

The package is built on a multi-layered architecture that ensures both ease of use and high performance. At the lowest level, it includes **CMSIS modules** (core and device) that provide the necessary interface to the ARM Cortex-M core. Above this sits the **STM32 HAL (Hardware Abstraction Layer)** and **LL (Low-Layer) drivers**. The HAL offers a high-level, portable API, while the LL drivers provide a lightweight, expert-oriented layer for developers who need direct control over hardware peripherals with minimal overhead.

For specific hardware targets, the package includes **Board Support Package (BSP)** drivers for various evaluation platforms, including:
- NUCLEO-WB05KZ
- NUCLEO-WB07CC
- NUCLEO-WB09KE

## Wireless Connectivity and Middleware

As part of the STM32WB (Wireless Bluetooth) family, the STM32CubeWB0 package places a strong emphasis on connectivity. It integrates the **STM32 BLE stack**, which supports Bluetooth Low Energy (BLE) version 4.1 in its latest releases. This stack is complemented by a variety of wireless-focused demonstrations and applications, such as power consumption tests, radio throughput examples, and transparent mode utilities for RF testing.

Beyond connectivity, the package includes essential middleware components:
- **FreeRTOS**: A popular real-time operating system for task management and synchronization.
- **FatFs**: A generic FAT file system module for small embedded systems.
- **Utilities**: Specialized modules like `tiny_lpm` for low-power management, a task sequencer, and advanced tracing tools (`adv_trace`).

## Development Workflow

STM32CubeWB0 is designed to work seamlessly with the **STM32CubeMX** graphical configuration tool. Developers can use CubeMX to initialize peripherals, configure the clock tree, and manage middleware stacks through a visual interface. The tool generates initialization C code that can be imported into major integrated development environments (IDEs), including:
- **STM32CubeIDE** (GCC-based)
- **IAR Embedded Workbench** (EWARM)
- **Keil Microcontroller Development Kit** (MDK-ARM)

The repository is structured using Git submodules, ensuring that dependencies like HAL drivers and CMSIS modules are maintained at the correct versions. This rolling release process on GitHub often provides updates ahead of the static packages found on the official ST website.

## Getting Started

To get started, developers should clone the repository recursively to ensure all submodules are downloaded. The `Projects` directory contains a wealth of examples ranging from basic peripheral toggling to complex BLE applications. These projects are organized by board and toolchain, providing a ready-to-use foundation for custom firmware development. Detailed documentation, including user manuals for the HAL/LL drivers (UM3363) and BLE application development (AN5977), is available to guide users through the ecosystem.
