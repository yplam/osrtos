---
title: SK-MSTM32F107 Demo Board Example
summary: A sample project demonstrating the integration of the libopencm3 hardware
  abstraction library with the lwIP TCP/IP stack on STM32F107-based microcontrollers.
  It provides a foundation for developing networked embedded applications on Cortex-M3
  hardware using open-source tools.
slug: sk-mstm32f107-demo-board-example
codeUrl: https://github.com/b00bl1k/sk-mstm32f107-example
star: 3
lastUpdated: '2016-09-15'
rtos: ''
libraries:
- lwip
topics:
- demo-board
- embedded
- libopencm3
- lwip
- stm32
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- lwip-tcp-ip-stack-on-stm32-microcontroller
- stm32f429-nucleo-lwip-and-freertos-template
- stm32f4-display-and-ethernet-example
- stm32-lwip-mqtt-demo
- rtems-lwip-stm32-integration
- stm32f1-rtos-example-project
---

## Overview

The SK-MSTM32F107 Demo Board Example is a reference project designed to showcase how to implement a networking stack on STM32 microcontrollers using entirely open-source tools. By combining **libopencm3**, a low-level hardware abstraction library, with **lwIP** (lightweight IP), this project provides a functional template for developers looking to move away from proprietary vendor HALs while maintaining robust TCP/IP capabilities.

## Technical Architecture

The project targets the STM32F107, a connectivity line microcontroller from STMicroelectronics featuring an ARM Cortex-M3 core. The software stack is built upon two primary pillars:

*   **libopencm3**: This library provides a free and open-source firmware library for various ARM Cortex-M microcontrollers. It replaces the standard peripheral libraries or HALs provided by manufacturers, offering a more consistent API across different hardware families.
*   **lwIP**: A widely used open-source TCP/IP stack designed for embedded systems. It is optimized to reduce RAM usage while still providing a full-scale API, making it ideal for the resource-constrained environment of the STM32F1 series.

## Hardware Integration

Beyond the MCU, the project includes specific support for the **KSZ8721** Physical Layer (PHY) transceiver, as evidenced by the inclusion of `src/ksz8721if.c`. This file acts as the interface between the STM32's MAC (Media Access Control) peripheral and the external PHY chip, enabling Ethernet communication. 

## Development Environment

The project utilizes a modern CMake-based build system, which simplifies the management of submodules and cross-compilation for the ARM architecture. It is configured to use the `arm-none-eabi-gcc` toolchain. For debugging and flashing, the project includes an OpenOCD configuration tailored for J-Link programmers using the SWD (Serial Wire Debug) transport protocol.

### Building the Project

The build process follows standard CMake conventions:

```sh
$ mkdir build && cd build
$ cmake ..
$ make
$ make flash
```

This workflow compiles the `libopencm3` dependency as a custom target, links the `lwIP` core and IPv4 sources, and generates a binary ready for the STM32F107 target. The inclusion of `openocd.cfg` allows for seamless flashing and resetting of the hardware directly from the build directory.
