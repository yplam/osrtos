---
title: Enterprise STM32 Platform Development
summary: A comprehensive embedded software stack and template for STM32 microcontrollers,
  focusing on enterprise-level development practices. It features a layered architecture
  supporting both bare-metal and RTOS-based applications using FreeRTOS or ThreadX.
  The project integrates modern build systems like CMake and Meson with advanced tooling
  for unit testing and mocking.
slug: enterprise-stm32-platform-development
codeUrl: https://github.com/coder137/STM32-Repo
star: 15
lastUpdated: '2021-01-27'
rtos: freertos
topics:
- arm
- baremetal
- c
- cmake
- cmsis
- cpp
- freertos
- stm32
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32-base-project-template
- stm32f107-makefile-freertos-template
- stm32-makefile-freertos-project-template
- stm32f030-cmake-cmsis-project-skeleton
- stm32-framework
- stm32-rtic-project-template
---

## Overview

The Enterprise STM32 Platform Development repository is a sophisticated framework designed to bridge the gap between hobbyist firmware and professional, enterprise-grade embedded software. It provides a structured approach to developing firmware from the ground up, offering developers total control over every aspect of the system—from custom linker scripts to high-level application logic.

By moving away from proprietary IDEs and vendor-locked tools, the project utilizes modern build systems like **CMake** and **Meson** combined with the **Ninja** build tool. This approach ensures a development environment that is independent of any specific IDE, reducing maintenance costs and improving the portability of the software stack.

## Layered Architecture

The core of the project is its highly modular, layered architecture. This structure is specifically designed to minimize the effort required when porting code between different microcontroller architectures or hardware boards. The layers are organized as follows:

- **L0 Low-level**: Contains ARM CMSIS components, device-specific headers, and startup code. This layer is tightly coupled to the hardware and the specific ARM architecture.
- **L1 Third-Party Device Dependent**: Houses external software that requires device-specific configuration, such as **FreeRTOS** or **Microsoft ThreadX**.
- **L2 Drivers & Board**: Includes basic peripheral drivers (GPIO, UART, SPI, I2C) and board-specific initialization code.
- **L3 Functional Libraries**: Platform-independent third-party code, such as ring buffers or JSON parsers.
- **L4 Modules**: High-level drivers for sensors, actuators, and communication protocols that rely on the platform-agnostic L2 driver interfaces.
- **L5 Application**: The top-level application logic and the `main.c` entry point.

## Modern C++ in Embedded Systems

For developers looking to use C++, the project provides a strict set of guidelines for **Modern C++17** in an embedded context. To maintain performance and predictability, the project enforces several constraints:
- **Static Memory Only**: No dynamic allocation is permitted to avoid heap fragmentation and runtime failures.
- **No Standard Library (STL)**: Avoids the overhead and non-deterministic behavior of the standard C++ library (e.g., strings or iostreams).
- **Composition over Inheritance**: Encourages better design patterns for resource-constrained environments.
- **Constexpr and Inline**: Heavy use of compile-time evaluation to reduce runtime overhead.

## Tooling and Quality Assurance

A significant focus of this repository is the integration of professional tooling to ensure code quality. The roadmap includes support for:
- **Unit Testing**: Integration with the **Unity** framework.
- **Mocking**: Using the **Fake Function Framework (FFF)** for isolating hardware dependencies during testing.
- **Static Analysis**: Support for Clang-format and static analysis tools to maintain code standards.
- **Debugging**: Seamless integration with **OpenOCD**, **GDB**, and **Cortex-Debug** for VSCode.

## Hardware Support

The project includes specific examples and configurations for popular STM32 development boards, including the **B-L475E-IOT01A** (STM32L4) and the **NUCLEO-F746ZG** (STM32F7). By following the provided templates, developers can easily adapt the stack to other STM32 families or even different ARM-based microcontrollers.
