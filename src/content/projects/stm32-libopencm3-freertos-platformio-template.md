---
title: STM32 libopencm3 FreeRTOS PlatformIO Template
summary: A template and sample project for STM32 microcontrollers using the libopencm3
  framework and FreeRTOS. Designed for use with PlatformIO, it provides a 'blinky'
  example tested on the STM32F103C8T6 Blue Pill board.
slug: stm32-libopencm3-freertos-platformio-template
codeUrl: https://github.com/bjwschaap/platformio-libopencm3-freertos
star: 28
version: v0.3
lastUpdated: '2022-01-17'
rtos: freertos
topics:
- bluepill
- freertos
- libopencm3
- platformio
- platformio-ide
- stm32
- stm32f103
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32f103c8-freertos-cmsis-blink-example
- stm32-makefile-freertos-project-template
- stm32f107-makefile-freertos-template
- stm32f1-rtos-example-project
- micro-ros-stm32-template
- minimal-mbed-os-template-for-stm32f103
---

The `platformio-libopencm3-freertos` project serves as a foundational template for developers looking to combine the power of the libopencm3 hardware abstraction library with the FreeRTOS real-time operating system. Specifically tailored for the PlatformIO ecosystem, this repository provides a ready-to-use "blinky" example that demonstrates how to integrate these components on STM32 hardware.

### Project Foundation
The project is built upon the work of several contributors within the embedded community. It originated from example code by Warren Gay and was adapted for PlatformIO with assistance from Maximilian Gerhardt. Notably, the project has been updated to use FreeRTOS version 10.4.1, ensuring compatibility with modern RTOS features and improved stability.

### Technical Configuration
The repository is configured to target the popular "Blue Pill" board, which features the STM32F103C8T6 microcontroller. The build system is managed via PlatformIO, utilizing the `ststm32` platform and the `libopencm3` framework. 

Key build configurations defined in the `platformio.ini` include:
- **Cortex-M3 Optimization**: Flags are set for `-mcpu=cortex-m3` and `-mthumb` to match the ARM architecture.
- **Static Linking**: The project uses `--static` and `-fno-common` for efficient embedded execution.
- **Strict Compilation**: Includes various warning flags such as `-Wextra`, `-Wshadow`, and `-Wstrict-prototypes` to ensure high code quality and catch potential issues early.
- **Floating Point**: Configured for `-msoft-float`, appropriate for the F1 series which lacks a hardware FPU.

### Hardware and Tools
While the default configuration targets the STM32F103C8T6, the project serves as a generic template for other STM32 series chips supported by libopencm3. It is pre-configured for use with the STLINKv2 programmer, making it easy to flash and debug directly from the PlatformIO IDE or command line. The project also includes a Travis CI configuration, demonstrating how to set up continuous integration for embedded PlatformIO projects.

### Getting Started
To use this project as a template, developers can clone the repository and use it as a base for their own firmware. The structure follows the standard PlatformIO layout:
- `src/`: Contains the main application logic and FreeRTOS task definitions.
- `lib/`: Reserved for project-specific libraries.
- `include/`: For header files.
- `platformio.ini`: The central configuration file for managing dependencies and build targets.

This setup is ideal for developers who prefer the lightweight, open-source nature of libopencm3 over heavier vendor-provided HALs, while still requiring the robust multitasking capabilities provided by FreeRTOS.
