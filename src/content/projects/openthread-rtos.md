---
title: OpenThread RTOS
summary: An integration of the OpenThread networking protocol, LwIP TCP/IP stack,
  and FreeRTOS real-time operating system. It provides a framework for building Thread-enabled
  IoT applications with support for MQTT, HTTP, and TCP on platforms like the Nordic
  nRF52840 and Linux simulation.
slug: openthread-rtos
codeUrl: https://github.com/openthread/ot-rtos
star: 155
lastUpdated: '2023-01-03'
rtos: freertos
libraries:
- lwip
- open-thread
- jansson
topics:
- embedded
- freertos
- google
- ieee-802154
- internet-of-things
- iot
- ipv6
- lwip
- mesh-networks
- nest
- openthread
- wireless
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rtos-wot
- ameba-rtos-sdk
- eclipse-threadx-netx-duo
- freertos-mqtt-client-demo
- esp-open-rtos
- rtox-iot-development-platform
---

## Overview

OpenThread RTOS is a comprehensive integration project that brings together three powerful open-source components: OpenThread, LwIP, and FreeRTOS. By combining these technologies, the project provides a robust foundation for developing Internet of Things (IoT) applications that require both low-power Thread networking and standard TCP/IP connectivity.

The project serves as a middleware layer that simplifies the process of running OpenThread on top of a real-time operating system while simultaneously providing a full TCP/IP stack. This allows developers to build complex devices that can communicate over Thread mesh networks while also utilizing familiar application-layer protocols like MQTT and HTTP.

## Core Components

The architecture of OpenThread RTOS is built upon three primary pillars:

*   **OpenThread**: An open-source implementation of the Thread networking protocol, designed for low-power, secure, and reliable mesh networking.
*   **LwIP (Lightweight IP)**: A small, independent implementation of the TCP/IP protocol suite, optimized for use in embedded systems with limited resources.
*   **FreeRTOS**: A market-leading real-time operating system for microcontrollers, providing the task scheduling and synchronization primitives necessary for managing complex networking stacks.

## Key Features and Capabilities

OpenThread RTOS includes several application-layer demonstrations that showcase its versatility in IoT scenarios:

*   **MQTT Support**: Enables machine-to-machine (M2M) connectivity, allowing devices to publish and subscribe to data streams efficiently.
*   **HTTP Integration**: Provides the underlying protocol for web-based communication and services.
*   **TCP/UDP Transport**: Offers standard transport layer protocols for reliable or fast data transmission.
*   **NAT64 Utilities**: Includes frameworks for NAT64 translation and NTP time synchronization, essential for bridging Thread networks with the wider IPv4 internet.

## Hardware and Platform Support

The project is designed to be portable but provides first-class support for two primary environments:

1.  **Nordic nRF52840**: A popular SoC for Bluetooth Low Energy and Thread applications. The project includes specific toolchain configurations and linker scripts for the nRF52840 Development Kit.
2.  **Linux Simulation**: For rapid development and testing, the project can be compiled for Linux. This allows developers to build and run the OpenThread CLI and test applications directly on a workstation without needing physical hardware.

## Technical Implementation

The build system is powered by CMake, which manages the various submodules and third-party dependencies. The project structure is organized into several libraries:

*   `otr_core`: The heart of the integration, containing the network interface (netif) logic, FreeRTOS porting code, and system initialization.
*   `otr_frameworks`: Higher-level utilities including NAT64 helpers and NTP support.
*   `otr_core_utils`: Low-level utilities such as entropy management for security.

## Getting Started

To begin working with OpenThread RTOS, developers typically start by initializing the submodules and using CMake to generate the build files. For a Linux simulation, the process is straightforward:

```sh
git submodule update --init
mkdir build && cd build
cmake .. -DPLATFORM_NAME=linux
make -j12
```

For hardware targets like the nRF52840, a cross-compilation toolchain is required:

```sh
cmake .. -DCMAKE_TOOLCHAIN_FILE=../cmake/arm-none-eabi.cmake -DPLATFORM_NAME=nrf52
make -j12
```

This process generates binary files (such as `.hex` for Nordic) that can be flashed to the target device, providing a CLI for interacting with the Thread network or running pre-configured demo applications.
