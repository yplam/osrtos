---
title: STM32CubeH7RS MCU Firmware Package
summary: A comprehensive embedded software platform for the STM32H7RS series microcontrollers.
  It integrates CMSIS, HAL-LL drivers, and a wide range of middleware including FreeRTOS,
  LwIP, and FatFS, supporting high-performance applications on STM32H7RS evaluation
  and Nucleo boards.
slug: stm32cubeh7rs-mcu-firmware-package
codeUrl: https://github.com/STMicroelectronics/STM32CubeH7RS
siteUrl: https://www.st.com/stm32cubeH7RS
star: 43
version: v1.3.0
lastUpdated: '2026-02-26'
rtos: freertos
libraries:
- lwip
- mcuboot
topics:
- stm32
- stm32cube-mcu-package
- stm32h7rs
isShow: false
createdAt: '2026-03-02'
updatedAt: '2026-03-02'
---

## Overview

The STM32CubeH7RS MCU Firmware Package is a highly integrated software solution designed to accelerate development for the STM32H7RS series of microcontrollers. As part of the broader STM32Cube initiative, this package provides a structured, multi-layered software architecture that abstracts hardware complexities while offering high-performance middleware and drivers. It is specifically tailored for the STM32H7R7, H7S7, H7R3, and H7S3 products, which are known for their high-performance ARM Cortex-M cores and advanced peripheral sets.

## Technical Architecture

The package is organized into several distinct layers, ensuring both portability across the STM32 portfolio and optimized performance for specific hardware features:

- **CMSIS Layer**: Includes the core and device modules corresponding to the ARM core implemented in the STM32H7RS series.
- **HAL and LL Drivers**: The Hardware Abstraction Layer (HAL) offers a set of APIs that ensure maximized portability, while the Low-Layer (LL) drivers provide a fast, light-weight, expert-oriented layer closer to the hardware.
- **BSP Drivers**: Support for specific evaluation and development boards, including the STM32H7S78-DK Discovery Kit and the NUCLEO-H7S3L8 Nucleo board.
- **Middleware**: A consistent set of libraries including FreeRTOS for task scheduling, LwIP for TCP/IP networking, FatFS for file system management, and comprehensive USB stacks (Device, Host, and Power Delivery).

## Key Features and Capabilities

One of the standout aspects of the STM32CubeH7RS package is its focus on security and external memory management. It includes specialized middleware for Root of Trust (ROT) applications, such as STiROT and OEMiROT, which are essential for secure boot and firmware update processes. The package also integrates the STM32 External Memory Manager and Loader, which are critical for systems utilizing high-speed external PSRAM or NOR Flash via the XSPI interface.

For networking and connectivity, the integration of LwIP (v2.2.1) and various USB libraries allows developers to implement complex communication protocols with ease. The inclusion of FreeRTOS (v10.6.2) provides a robust foundation for multi-threaded applications, enabling efficient resource management in real-time environments.

## Hardware Support

The firmware package is optimized for the latest STM32H7RS hardware platforms:
- **STM32H7S78-DK**: A discovery kit featuring advanced graphics, audio, and connectivity options.
- **NUCLEO-H7S3L8**: A flexible development board for rapid prototyping with the STM32H7RS series.

## Development and Integration

STM32CubeH7RS is designed to work seamlessly with major development toolchains, including IAR Embedded Workbench (EWARM), Keil MDK-ARM, and the GCC-based STM32CubeIDE. The repository uses a submodule-based structure, requiring a recursive clone to pull in all necessary components, including the HAL drivers and middleware libraries.

Developers can find a vast array of projects within the repository, ranging from basic peripheral examples to complex demonstrations of RTOS integration and secure boot sequences. This modular approach allows users to either start from a blank template or leverage existing application code to reduce time-to-market for industrial, consumer, and IoT applications.
