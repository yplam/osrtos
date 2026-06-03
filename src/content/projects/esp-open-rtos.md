---
title: esp-open-rtos
summary: A community-developed open-source framework for ESP8266 microcontrollers
  based on FreeRTOS. It provides a complete development environment including the
  lwIP TCP/IP stack, mbedTLS, and a custom build system designed for both commercial
  and open-source projects.
slug: esp-open-rtos
codeUrl: https://github.com/SuperHouse/esp-open-rtos
star: 1570
version: 0.0.1
lastUpdated: '2020-08-17'
rtos: freertos
libraries:
- lwip
- lvgl
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- esp8266-rtos-software-development-kit-sdk
- rtos-wot
- openthread-rtos
- ameba-rtos-sdk
- onps-open-net-protocol-stack
- esp8266-mywidget
---

## Overview

esp-open-rtos is a community-driven, open-source framework designed for the ESP8266 WiFi-enabled microcontroller. While it was originally based on the Espressif IoT RTOS SDK, it has evolved into a substantially different and more transparent environment. The project aims to provide a professional-quality framework where as much of the stack as possible is open source, specifically targeting layers above the MAC layer.

At its core, the project integrates FreeRTOS to provide robust multitasking capabilities, allowing developers to manage complex WiFi applications with ease. It is intended for use in a wide range of applications, from simple IoT sensors to complex connected devices.

## Technical Architecture

The framework is organized into several distinct layers to ensure modularity and ease of maintenance:

- **FreeRTOS**: The project utilizes FreeRTOS V10.2.0, providing the standard scheduling and synchronization primitives required for real-time applications.
- **lwIP**: Networking is handled by lwIP v2.0.3, a widely used TCP/IP stack optimized for embedded systems. This allows for stable UDP and TCP communication.
- **Core Components**: The `core` directory contains low-level ESP8266 functions and peripheral drivers. These are designed with minimal dependencies on the RTOS to ensure they remain lightweight.
- **Extras**: A significant feature of esp-open-rtos is the `extras` directory, which contains optional components such as mbedTLS for secure connectivity, software I2C drivers, and rboot-ota for over-the-air updates.
- **Binary Libraries**: To maintain compatibility with the ESP8266 hardware, some binary libraries from Espressif are included. To prevent namespace conflicts and clearly distinguish between open and closed code, all binary SDK symbols are automatically prefixed with `sdk_` during the build process.

## Development Environment

The project uses a standard GNU Make build system. It is designed to work seamlessly with the `esp-open-sdk` toolchain. One of the primary goals of the build process is flexibility, allowing developers to easily adjust compilation settings and include only the components necessary for their specific project.

### Building a Project

To build an application, developers typically clone the repository recursively to include all submodules. A simple example of building and flashing an application looks like this:

```bash
# Define WiFi credentials in include/private_ssid_config.h
make flash -j4 -C examples/http_get ESPPORT=/dev/ttyUSB0
```

## Key Features

- **Open Source Focus**: Unlike the original vendor SDK, esp-open-rtos prioritizes open-source implementations of standard libraries like newlib and lwIP.
- **Thread Safety**: The included newlib v3.0.0 is patched with locking stubs to ensure thread-safe operation within the FreeRTOS environment.
- **Extensibility**: The 'extras' system makes it easy to add drivers for sensors (like the BMP180) or complex protocols (like TLS via mbedTLS) without cluttering the core framework.
- **Clean Upstream**: The project maintains a clear separation from upstream code, making it easier to pull in updates from FreeRTOS or lwIP.

## Community and Support

esp-open-rtos is an alpha-quality project that is actively developed by the community. It supports AP and STATION modes, as well as standard TCP/UDP client functionality. Documentation for the build process, third-party library integration, and libc configuration is maintained via the project's GitHub wiki.
