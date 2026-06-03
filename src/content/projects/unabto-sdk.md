---
title: uNabto SDK
summary: An open-source C framework for secure, direct peer-to-peer communication
  between IoT devices and clients. It features NAT traversal, encrypted data transfer,
  and support for resource-constrained microcontrollers including STM32, ESP8266,
  and PIC32.
slug: unabto-sdk
codeUrl: https://github.com/nabto/unabto
siteUrl: https://developer.nabto.com
star: 66
version: v4.5.0
lastUpdated: '2024-05-28'
rtos: freertos
topics:
- freertos
- iot
- iot-framework
- iot-middleware
- iot-platform
- nabto-platform
- unabto
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- microlink-tailscale-vpn-for-esp32
- iotsharp-for-rt-thread
- iotconnect-azure-rtos-sdk
- mongoose-os
- esp-open-rtos
- esp8266-rtos-homekit-accessory
---

uNabto (pronounced 'micro nabto') is a lightweight C framework designed to facilitate secure, encrypted communication between IoT devices and clients. Developed by Nabto, this SDK is specifically tailored for resource-constrained environments where traditional heavy-duty communication stacks might not fit. It provides a robust infrastructure for peer-to-peer (P2P) connectivity, effectively bypassing NAT (Network Address Translation) hurdles through advanced traversal techniques.

### Core Architecture and Design

The uNabto SDK is built with a modular philosophy, allowing developers to port it to various hardware platforms with minimal friction. The repository is organized into three primary layers:

- **Core**: Located in `src/unabto/`, this contains the platform-independent logic required by all instances, handling the fundamental Nabto protocol.
- **Modules**: Found in `src/modules/`, these provide reusable implementations for common tasks such as encryption (AES), random number generation, timers, and utility functions. These modules simplify the process of implementing uNabto on new hardware.
- **Platforms**: The `src/platforms/` directory contains specific adapters for different operating systems and hardware abstraction layers, acting as the bridge between the core logic and the target hardware.

### Key Communication Patterns

uNabto supports several communication models to suit different IoT use cases:

- **RPC (Remote Procedure Call)**: Allows clients to invoke functions on the device and receive responses, ideal for control and status updates. This is handled via the `application_event()` callback.
- **Streaming**: Enables the transfer of large data sets or continuous data flows, such as video feeds or log files, using a segment-based pool system.
- **Push Notifications**: Supports modern notification services like Firebase and Webhooks to alert users even when a direct connection is not active.

### Hardware and OS Support

While the core SDK includes support for major desktop operating systems (Windows, Linux, and macOS) via CMake, its true strength lies in its embedded ecosystem. Nabto provides dedicated SDKs and examples for popular microcontrollers and development kits, including:

- **STM32 Discovery** (Ethernet)
- **ESP8266** (WiFi)
- **PIC32 Ethernet Starter Kit II**
- **CC3200** (WiFi)
- **Arduino** (Ethernet)

### Security and Testing

Security is a cornerstone of the Nabto platform. The SDK implements encrypted communication and provides modules for fingerprint-based Access Control Lists (ACL), allowing clients to connect securely using self-signed certificates. The framework is designed to ensure confidentiality and integrity across untrusted networks.

For integrators, the project includes a comprehensive testing guide (`TESTING.md`). This documentation outlines how to perform long-running network tests, verify connection resource exhaustion, and execute unit tests on target hardware to ensure stability in production environments. It covers testing local connections, P2P connections, and various relay scenarios.

### Getting Started with CMake

Integrating uNabto into a project is simplified through CMake. A typical static library project can be defined by including the project definition file provided in the repository:

```cmake
cmake_minimum_required(VERSION 2.8)
project(example)
include(${CMAKE_CURRENT_SOURCE_DIR}/build/cmake/unabto_project.cmake)

add_definitions(${unabto_definitions})
add_library(example ${unabto_src})
target_link_libraries(example ${unabto_link_libraries})
```

Note: uNabto (Nabto 4) is now considered a legacy SDK. While it remains a powerful tool for microcontrollers, Nabto recommends the next-generation Nabto 5/Edge for new projects, which offers enhanced features and updated security protocols.
