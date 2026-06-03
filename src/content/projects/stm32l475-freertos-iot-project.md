---
title: STM32L475 FreeRTOS IoT Project
summary: A comprehensive implementation of FreeRTOS v10.4.4 on the STM32L475 microcontroller,
  specifically targeting the Pandora development board. It supports both Keil MDK-ARM
  and GNU GCC toolchains, providing a robust foundation for IoT application development
  with pre-configured peripheral support via STM32CubeMX.
slug: stm32l475-freertos-iot-project
codeUrl: https://github.com/AirMaxSys/stm32l475_freertos_iot
siteUrl: https://www.freertos.org/a00110.html
star: 4
lastUpdated: '2023-11-02'
rtos: freertos
topics:
- fatfs
- freertos
- iot-device
- lvgl
- lwip
- mqtt-client
- stm32
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32l475-pandora-board-bsp-for-rt-thread
- stm32-lwip-mqtt-demo
- stm32f107-makefile-freertos-template
- iotsharp-pandora-stm32l475-bsp
- practice-project-for-stm32f746g-discovery
- micropython-for-pandora-iot-board
---

## Overview

The stm32l475_freertos_iot project is a dedicated firmware template and example for developers working with the STM32L475 microcontroller. Built around the FreeRTOS v10.4.4 kernel, this project provides a structured environment for developing low-power IoT applications. It is specifically tailored for the STM32L475 Pandora board, integrating essential hardware drivers and RTOS configurations to jumpstart development.

## Development Environment and Toolchains

One of the project's strengths is its flexibility regarding development tools. It provides full support for two major ecosystems:

*   **Keil MDK-ARM:** Configured for version 5.29.0.0 using the ArmClang (Compiler 6.13.1) toolchain. This is ideal for developers who prefer the integrated debugging and optimization features of the ARM-native environment.
*   **GNU GCC:** For those preferring open-source tools, the project includes a CMake-based build system compatible with the GNU Arm Embedded Toolchain. This allows for cross-platform development and integration into modern CI/CD pipelines.

## RTOS Implementation and Porting

The project utilizes FreeRTOS v10.4.4. The implementation follows the standard porting procedure for the ARM Cortex-M4F architecture, which includes hardware floating-point support. Key technical aspects of the RTOS integration include:

*   **Port Selection:** The project uses the GCC portable layer even when compiling with ArmClang, as specified in the configuration documentation.
*   **Memory Management:** It defaults to the `heap_4.c` algorithm, which is generally recommended for most embedded applications as it provides efficient memory allocation while preventing fragmentation.
*   **Interrupt Handling:** The `FreeRTOSConfig.h` is configured to map the standard STM32 interrupt handlers (`PendSV_Handler`, `SVC_Handler`, and `SysTick_Handler`) to the FreeRTOS kernel, ensuring seamless context switching and system timing.

## Hardware Configuration

The project is configured via STM32CubeMX (using the `stm32l475_freertos_iot.ioc` file), which defines a wide array of peripheral interfaces ready for IoT use cases:

*   **Connectivity:** Support for USB OTG FS, USART (for debugging and serial communication), and SPI/I2C for external sensors.
*   **Storage:** SDMMC1 configuration for SD card access and QUADSPI for external Flash memory.
*   **Audio and UI:** SAI (Serial Audio Interface) for audio processing, along with GPIO configurations for LEDs (Red, Green, Blue), buttons, and a beep buzzer.
*   **Sensors:** Pre-defined pins for common board components like the AHT10 humidity sensor and NRF wireless modules.

## Getting Started

To use this project, developers can choose their preferred toolchain. For Keil users, the project file is located in the `MDK-ARM` directory. For GCC users, the project can be built using CMake. The repository structure separates the core logic (`Core`), hardware abstraction layers (`Drivers`), and board-specific support (`BSP`), making it easy to navigate and extend for custom IoT applications.
