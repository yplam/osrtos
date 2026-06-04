---
title: Herald for C++
summary: A C++17 implementation of the Herald Bluetooth Protocol and Payload for native
  platforms, including Zephyr RTOS and Windows. It provides a privacy-preserving proximity
  detection and data exchange framework specifically optimized for Nordic Semiconductor
  nRF52 and nRF53 series microcontrollers.
slug: herald-for-c
codeUrl: https://github.com/theheraldproject/herald-for-cpp
star: 13
version: v2.0.0
lastUpdated: '2024-08-29'
rtos: zephyr
libraries:
- mcuboot
topics:
- bluetooth
- bluetooth-beacons
- bluetooth-connection
- bluetooth-devices
- bluetooth-le
- bluetooth-low-energy
- bluetooth-mesh
- contact-tracing
- cpp
- cpp17
- digital-contact-tracing
- herald
- herald-library
- nordic-bluetooth
- nordicsemi
- zephyr
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- openhaystack-zephyr-firmware
- zephyr-c-20-framework-zpp
- cr95hf-mbed-library
- zj-ble-rt-thread-and-nimble-for-nordic-nrf52
- arduino-serial-ble
- zephyr-native-meshtastic-stack
---

## Overview

Herald for C++ is a native implementation of the Herald Bluetooth Protocol, designed to provide reliable, privacy-preserving proximity detection and data exchange. While the protocol is also available for iOS and Android, this C++ version targets native platforms, specifically focusing on embedded systems running Zephyr RTOS and desktop environments like Windows 10. 

The library is a core component of the Herald ecosystem, enabling interoperability between mobile phones and dedicated hardware devices such as wearables and venue beacons. It was introduced in Herald v1.2 to support the growing need for high-performance, low-power proximity solutions in the embedded space.

## Key Features and Capabilities

The Herald protocol is built to overcome the limitations of standard Bluetooth proximity sensing, particularly regarding background operation and cross-platform reliability. Key features of the C++ implementation include:

- **Cross-Platform Compatibility**: Supports Windows 64-bit (Clang) and Zephyr RTOS (GCC) for ARM Cortex-M microcontrollers.
- **Memory Safety and Predictability**: The codebase is heavily refactored to avoid smart pointers and dynamic memory allocation, favoring references and templates to ensure memory use can be predicted at compile time.
- **Optimized for Nordic Hardware**: Specifically tested on the Nordic nRF52840, nRF52832, and nRF5340 platforms using the nRF Connect SDK.
- **Privacy-First Design**: Implements the Herald Bluetooth Protocol for secure, anonymous proximity tracking.

## Technical Implementation

Herald for C++ leverages modern C++17 techniques while remaining mindful of the constraints imposed by embedded toolchains. Because Zephyr RTOS does not support Run-Time Type Information (RTTI), the library avoids `dynamic_pointer_cast` and uses `noexcept` instead of C++ exceptions. 

In version 2.0, the project underwent a significant architectural shift to remove internal use of `std::unique_ptr` and `std::shared_ptr`. By utilizing templates and static sizes for components like SensorDelegates, the library significantly reduces SRAM usage and avoids potential memory management bugs common in resource-constrained RTOS environments.

## Hardware and Platform Support

The primary development board for the project is the Seeed nRF52840MK-USB-Dongle, but the library is compatible with a wide range of Zephyr-supported boards. The team provides direct support for:
- **Windows**: 64-bit with Clang 10.0+.
- **Zephyr RTOS**: ARM-based boards using arm-none-eabi-gcc 8.3+, with specific focus on the Nordic nRF Connect SDK variant.

## Demonstration Applications

The repository includes several example applications that demonstrate the library's utility in real-world scenarios:
- **herald-wearable**: A Zephyr-based app for wearable devices, serving as the hardware equivalent to the Herald mobile apps.
- **herald-venue-beacon**: A specialized application for fixed-location beacons, intended to supplement or replace QR code scanning in public venues.
- **herald-tests**: A comprehensive suite of API tests to ensure core functionality across different platforms.

## Getting Started

Developers can integrate Herald into their projects by including the core library or calling the provided CMake configuration directly. For Zephyr-based projects, the repository includes shell scripts (`make-all-zephyr.sh`) and dependency installers for Ubuntu to streamline the setup of the nRF Connect SDK environment. The project follows a GitFlow management strategy, and contributions are welcomed through the project's developer certificate of origin (DCO) process.
