---
title: RTOX IoT Development Platform
summary: RTOX is an IoT development platform built for the Nuvoton NUM487KM_DEVB board.
  It integrates FreeRTOS with essential middleware including the lwIP TCP/IP stack,
  LittleFS for flash storage, and uLog for logging, providing a robust foundation
  for Cortex-M4 based IoT applications.
slug: rtox-iot-development-platform
codeUrl: https://github.com/cy023/rtox
star: 1
lastUpdated: '2023-04-16'
rtos: freertos
libraries:
- littlefs
- lwip
topics:
- arm-cortex-m4f
- dp83848
- freertos
- iot-platform
- littlefs
- lwip-ethernet
- segger-system-view
- spi-nor-flash
- ulog
- w25q128
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- openthread-rtos
- stm32l475-freertos-iot-project
- ameba-rtos-sdk
- nxp-i-mx-rt-development-platform
- rtos-wot
- stm32f429-nucleo-lwip-and-freertos-template
---

RTOX is a comprehensive IoT development platform designed specifically for the Nuvoton NUM487KM_DEVB evaluation board. It serves as a pre-integrated stack for developers looking to jumpstart their embedded IoT projects on the Nuvoton M480 series microcontrollers. By combining a real-time operating system with networking, file system management, and advanced debugging tools, RTOX provides a "batteries-included" environment for Cortex-M4 development.

## Core Architecture and Middleware

The platform is built upon a solid foundation of industry-standard middleware. At its core, FreeRTOS manages task scheduling and synchronization, ensuring deterministic behavior for time-critical IoT applications. For connectivity, the project integrates the lwIP (lightweight TCP/IP) stack, enabling Ethernet networking via the onboard DP83848 PHY.

Data persistence is handled by LittleFS, a fail-safe filesystem designed specifically for microcontrollers. RTOX includes a dedicated driver for the W25Q128JV SPI NOR Flash, allowing LittleFS to manage non-volatile storage reliably even in the event of power loss. For system observability, the platform incorporates uLog for structured logging and Segger SystemView RTT, which allows developers to visualize RTOS scheduling and interrupt behavior in real-time.

## Hardware Integration

The platform targets the Nuvoton M487KM, a high-performance microcontroller featuring an ARM Cortex-M4F core with DSP extensions and a Floating Point Unit (FPU). The build system is optimized for this architecture, utilizing the hard-float ABI and thumb mode to maximize performance. The repository includes necessary startup code, linker scripts, and peripheral drivers (CMSIS and Nuvoton StdDrivers) to interface with GPIO, UART, SPI, and the system clock.

## Development Workflow

RTOX utilizes a standard GNU Makefile build system, making it compatible with the `arm-none-eabi` toolchain. The project structure is organized to separate core application logic from middleware and hardware abstraction layers:

- **Core/**: Contains the main application logic.
- **Drivers/**: Includes the Nuvoton Standard Drivers and specific hardware drivers for the W25Q128JV flash.
- **Middleware/**: Houses the ports for FreeRTOS, lwIP, LittleFS, and SEGGER tools.
- **Config/**: Centralizes configuration files for the RTOS and middleware components.

The Makefile provides several utility targets beyond simple compilation, including unit testing support, memory usage analysis, and serial-based firmware uploading. This makes RTOX not just a collection of code, but a complete development environment for Nuvoton-based IoT devices.
