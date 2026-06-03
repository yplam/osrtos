---
title: LekaOS
summary: LekaOS is an embedded operating system built on Arm Mbed OS for the Leka
  smart toy. It targets STM32F7 microcontrollers and integrates MCUBoot for secure
  bootloading, featuring a modular architecture with support for various sensors and
  state-machine-driven logic.
slug: lekaos
codeUrl: https://github.com/leka/LekaOS
star: 18
version: v2.0.0
lastUpdated: '2025-02-19'
rtos: mbed-os
libraries:
- mcuboot
topics:
- arm-none-eabi
- cmake
- cpp
- cpp17
- embedded
- embedded-systems
- mbed
- mbed-os
- rtos
- stm32
- stm32f7
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- arm-control-framework-acorns-rover
- tock-for-stm32
- enterprise-stm32-platform-development
- texas-aimbots-embedded-development
- mos-rtos
- xc-os-a-lightweight-graphical-os-for-mcus
---

## Overview

LekaOS is the core software platform powering Leka, an interactive robotic companion designed to assist in the development and education of children with neurodevelopmental disorders. Built upon the robust Arm Mbed OS framework, LekaOS provides a high-level abstraction layer for managing the robot's hardware, including its sensors, actuators, and interactive features.

The project is maintained by APF France handicap and is designed with a strong emphasis on modern C++ practices, reliability, and comprehensive testing. It serves as a complete firmware solution that includes a bootloader, the main operating system, and a suite of drivers tailored for the Leka hardware platform.

## Technical Architecture

LekaOS leverages a modern development stack to ensure code quality and maintainability. The system is built using C++20, taking advantage of contemporary language features for better performance and safety. The project structure is managed by CMake, allowing for flexible configuration across different hardware targets, such as the `LEKA_DISCO` (discovery board) and the production-ready `LEKA_V1_2_DEV` board.

### Core Components

- **Mbed OS Integration**: The system uses Mbed OS as its foundational RTOS, providing thread management, hardware abstraction, and networking capabilities.
- **Bootloader & Security**: Integration with MCUBoot ensures secure and reliable firmware updates, a critical feature for consumer-facing robotic devices.
- **State Machine Logic**: The project utilizes `boost-ext/sml` (State Machine Language) to handle complex behavioral logic, ensuring that the robot's interactions are predictable and well-defined.
- **Driver Support**: LekaOS includes dedicated drivers for various components, including the STMicroelectronics HTS221 humidity and temperature sensor, the LSM6DSOX inertial measurement unit (IMU), and custom motor controllers.

## Hardware Support

The primary target for LekaOS is the STM32F7 series of microcontrollers. Specifically, it is optimized for high-performance ARM Cortex-M7 cores which handle the robot's real-time processing requirements, from sensor fusion (using the Fusion library) to driving the interactive LED displays and motor systems.

## Development and Quality Assurance

One of the standout aspects of LekaOS is its rigorous approach to software quality. The repository is configured with a sophisticated CI/CD pipeline that includes:

- **Unit Testing**: Extensive use of GoogleTest and `boost-ext/ut` for verifying individual components.
- **Functional Testing**: Dedicated tests to ensure hardware-software integration works as expected.
- **Static Analysis**: Integration with SonarCloud and Clang-Tidy to maintain high code standards and catch potential bugs early.
- **Code Coverage**: Detailed coverage reporting via Codecov and Gcovr to ensure that the majority of the codebase is exercised by tests.

## Getting Started

For developers looking to contribute or explore the system, the project provides a comprehensive `Makefile` and CMake configuration. The build system supports various options, such as enabling debug logs, system statistics, and fast sleep modes for testing. Developers can flash the firmware using OpenOCD, which is pre-configured for ST-Link interfaces and STM32F7 targets. Detailed documentation regarding pin mapping, SPI clock frequencies, and test execution is available within the repository's `docs` directory.
