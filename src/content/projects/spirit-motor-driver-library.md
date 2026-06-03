---
title: spirit Motor Driver Library
summary: A C++ library designed for controlling motor drivers via CAN communication
  between microcontrollers. It supports Arduino and Mbed OS 6 across multiple architectures
  including ESP32, STM32, and RP2040, featuring a hardware-independent core for easier
  automated testing.
slug: spirit-motor-driver-library
codeUrl: https://github.com/yutotnh/spirit
siteUrl: https://yutotnh.github.io/spirit
star: 2
lastUpdated: '2024-04-26'
rtos: mbed-os
topics:
- arduino
- arduino-library
- cmake
- cpp
- mbed-libraries
- mbed-os
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- xiaomi-cybergear-arduino-library
- mbed-os-maxon-epos4-motor-controller-driver
- serialbridge
- spektrum-receiver-library-for-mbed
- arduino-dronecan
- mcp2515-can-testing-app-for-mongoose-os
---

spirit is a specialized C++ library designed to facilitate the control of motor drivers through inter-microcontroller communication. Primarily focused on CAN bus architectures, it establishes a clear hierarchy between a central controller and multiple peripheral motor drivers. This structure allows a single controller to manage a fleet of motors by sending commands to dedicated peripheral microcontrollers that interface directly with motor driver hardware.

## Cross-Platform Architecture

One of the standout features of spirit is its design philosophy regarding environment independence. While the library is intended for use on embedded platforms like Mbed OS and Arduino, the core logic is decoupled from hardware-specific APIs. This abstraction allows developers to run automated tests on non-embedded systems (like a standard Linux or Windows development machine) using Google Test, ensuring the reliability of the control logic before deploying to hardware.

Currently, the library supports a wide range of popular embedded platforms:
- **Arduino**: ESP32, Portenta, Raspberry Pi Pico (RP2040), and STM32.
- **Mbed OS 6**: LPCxxxx and STM32 series microcontrollers.

## Technical Implementation

The library is organized into a core component and platform-specific implementations. The core handles data conversion, motor state management, and protocol logic, while platform-specific modules (found in `src/spirit/platform`) handle hardware peripherals like PWM output, digital I/O, and interrupts. 

Key components within the library include:
- **Data Converters**: Specialized classes for handling PWM, speed, and motor data conversion.
- **Communication**: Support for CAN message structures and fake UDP converters for testing.
- **Hardware Drivers**: Support for specific driver ICs like the A3921.

## Development and Integration

For developers looking to integrate spirit into their projects, the repository provides a modern development workflow. It utilizes CMake with predefined presets for Debug and Release builds, and includes support for VS Code Dev Containers to provide a consistent, pre-configured environment for all contributors. Documentation is automatically generated using Doxygen, providing both a high-level API overview for general users and a deep-dive technical reference for developers.

To see spirit in action, the project maintainer provides reference implementations for Mbed-based CAN motor controllers and peripherals, demonstrating how to bridge the library with real-world CAN bus hardware.
