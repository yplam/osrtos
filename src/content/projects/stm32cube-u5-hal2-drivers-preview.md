---
title: STM32Cube U5 HAL2 Drivers Preview
summary: A major update to the STM32Cube ecosystem, providing the next-generation
  HAL2 drivers for the STM32U5 series. It features enhanced API usability, performance
  optimizations, and improved integration with RTOS environments like FreeRTOS and
  middleware such as FileX.
slug: stm32cube-u5-hal2-drivers-preview
codeUrl: https://github.com/STMicroelectronics/STM32CubeU5-V2-Preview
siteUrl: https://dev.st.com/stm32cube-docs/stm32u5-hal2/2.0.0-beta.1.1/index.html
star: 21
lastUpdated: '2025-07-17'
rtos: freertos
libraries:
- filex
topics:
- dfp
- drivers
- examples
- hal2
- stm32
- stm32cube
- stm32u5
isShow: false
createdAt: '2026-01-12'
updatedAt: '2026-01-12'
relatedProjects:
- stm32cubeh7rs-mcu-firmware-package
- x-cube-azrtos-h7-azure-rtos-software-expansion
- stm32cuben6-mcu-firmware-package
- stm32-framework
- x-cube-azrtos-l5-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-g0-azure-rtos-software-expansion-for-stm32cube
---

## Introduction to STM32Cube HAL2

The STM32Cube U5 HAL2 Drivers Preview represents a significant evolution in STMicroelectronics' software ecosystem. This release is a major update to the standard STM32Cube HAL drivers, specifically designed for the STM32U5 series of ultra-low-power microcontrollers. The goal of HAL2 is to enhance the daily workflow of embedded developers by improving API usability and performance while maintaining the portability and reuse principles that have made the STM32Cube ecosystem a standard in the industry.

As a preview release, this package is intended for evaluation and experimentation, allowing the STM32 community to explore new features and provide feedback before the official production release. It introduces not only updated drivers but also a shift in how external components and system utilities are handled.

## Key Features and Enhancements

The transition from HAL1 to HAL2 brings several architectural improvements aimed at modern embedded development:

- **Enhanced Usability and Performance**: The API has been refined to be more intuitive for developers, reducing boilerplate code and optimizing execution paths for better performance on the Cortex-M33 core.
- **RTOS Integration**: HAL2 is designed with better native support for Real-Time Operating Systems, ensuring smoother integration with kernels like FreeRTOS and Azure RTOS components.
- **Part Drivers**: A significant change in this version is the introduction of Part Drivers, which replace the traditional Board Support Package (BSP) component drivers. Part drivers are standalone and abstracted from the specific microcontroller, allowing them to be used independently of the board hardware through an agnostic IO interface.
- **C Standard Compliance**: Improved adherence to modern C standards ensures better compatibility with various toolchains and static analysis tools.

## Technical Components

The package is comprehensive, covering the entire software stack required for STM32U5 development:

### Core Drivers and DFP
The Device Family Pack (DFP) provides the essential descriptor files, startup code, and linker scripts required by IDEs. Alongside this, the HAL and LL (Low-Layer) drivers provide the primary interface to the STM32U5 hardware peripherals.

### System Utilities
Several new utilities are included to simplify common tasks:
- **Sequencer**: A task scheduler designed for systems that do not require a full RTOS, helping manage execution flow in bare-metal applications.
- **Basic_STDIO**: Provides simple logging capabilities, essential for debugging during the early stages of development.
- **Syscalls**: Implements the operating system interface required by newlib, facilitating standard C library usage.

### Middleware Support
While the focus is on the HAL2 drivers, the package is designed to work seamlessly with a consistent set of middleware, including FreeRTOS, USBX, FileX, OpenBootloader, and TF-M (Trusted Firmware-M).

## Hardware and Toolchain Support

This preview specifically targets the STM32U5 series, including the U535, U545, U575, U585, and the high-performance U59x/U5Ax lines. It has been validated on several popular development platforms:
- **B-U585I-IOT02A Discovery kit**
- **NUCLEO-U545RE-Q**
- **NUCLEO-U575ZI-Q**

For development, the project supports modern workflows including **CMake** and **Visual Studio Code** via the STM32Cube extension, as well as the **IAR Embedded Workbench for ARM**. 

## Getting Started

Developers looking to experiment with HAL2 can find a variety of examples in the repository that demonstrate the new API patterns. ST has also launched a new online documentation platform to provide a more intuitive browsing experience for the HAL2 API references and user manuals. Because this is a beta release, users should be aware of breaking changes compared to the original HAL and are encouraged to use the provided Project Extractor utility to manage example projects effectively.
