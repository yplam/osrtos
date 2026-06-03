---
title: Học lập trình STM32F1
summary: A comprehensive educational repository for learning STM32F1 microcontroller
  programming. It covers multiple development approaches including CMSIS, Standard
  Peripheral Library (StdPeriph), Hardware Abstraction Layer (HAL), and Low-Layer
  (LL) drivers for ARM Cortex-M3 devices.
slug: h-c-l-p-tr-nh-stm32f1
codeUrl: https://github.com/phatvu1294/hoc-lap-trinh-stm32f1
star: 16
lastUpdated: '2025-04-29'
rtos: cmsis
topics:
- cmsis
- cmsis-os
- cmsis-os-2
- freertos
- hal
- hoc
- lap-trinh
- ll
- low-layer
- rtos
- rtos-2
- stdperiph
- stm32f1
- stm32f103c8t6
- study
- tu-hoc
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- learning-stm32
- stm32f4-cmsis-lessons
- stm32-cortex-m4-code-examples
- cmsis-for-stm32-development
- stm32-cmsis-zero-to-hero
- bare-metal-programming-guide
---

## Overview

Học lập trình STM32F1 is a structured educational resource designed for developers looking to master the STM32F1 series of microcontrollers. The project provides a clear learning path and code examples for various firmware development methodologies, ranging from high-level abstractions to low-level register access. 

The repository serves as a central hub for several sub-projects, each focusing on a specific library or driver set. This allows learners to understand the trade-offs between ease of use and execution efficiency. The suggested learning path begins with the Hardware Abstraction Layer (HAL) for rapid development, followed by the Standard Peripheral Library (StdPeriph), Low-Layer (LL) drivers, and finally CMSIS for bare-metal register-level programming.

## Technical Scope

The project covers the full spectrum of STM32 development environments and libraries:

- **HAL (Hardware Abstraction Layer):** High-level APIs designed for portability across the STM32 family.
- **StdPeriph (Standard Peripheral Library):** The legacy library for STM32F1, offering a balance between abstraction and performance.
- **LL (Low-Layer) Drivers:** Light-weight, fast, and efficient drivers that are closer to the hardware than HAL.
- **CMSIS (Cortex Microcontroller Software Interface Standard):** Direct register access for the ARM Cortex-M3 core, providing the highest level of control.
- **CMSIS-RTOS2:** Integration and examples for real-time operating system implementations using the CMSIS-RTOS V2 standard.

## Supported Hardware and Tools

The examples and documentation target the STM32F1 series, specifically mentioning the popular STM32F103CBT6 and STM32F103RC microcontrollers. These chips are based on the ARM Cortex-M3 core and are widely used in industrial and hobbyist applications.

To support the development process, the project references a suite of industry-standard tools:
- **IDE:** Keil MDK-ARM V5 (including Legacy support).
- **Configuration:** STM32CubeMX for peripheral initialization and code generation.
- **Programming/Debugging:** STM32CubeProg, ST-Link Utility, and ST-Link drivers.
- **Analysis:** Hercules/RealTerm for USART debugging and specialized tools for USB HID development.

## Learning Resources

Beyond code samples, the repository provides links to essential technical documentation, including the STM32F1 Reference Manual (RM0008) and the Cortex-M3 Programming Manual (PM0056). It also includes specific documentation for Timer peripherals and USB communication, making it a complete starting point for anyone entering the world of professional STM32 firmware development.
