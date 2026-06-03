---
title: Mongoose OS App Skeleton
summary: A boilerplate project for developing Mongoose OS applications on ESP32 and
  ESP8266 microcontrollers. It provides a pre-configured environment with essential
  libraries for WiFi, RPC services, and OTA updates, supporting both C and JavaScript
  (mJS) development.
slug: mongoose-os-app-skeleton
codeUrl: https://github.com/kotelnikov/mgos_skeleton
star: 3
lastUpdated: '2023-06-22'
rtos: mongoose-os
libraries:
- lwip
topics:
- boilerplate
- esp32
- esp8266
- mongoose-os
- skeleton
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- mongoose-os-library-skeleton
- empty-mongoose-os-app
- websocket-client-for-mongoose-os
- mongoose-os-app-on-stm32f446re
- mongoose-os-programs-and-examples
- uart-out-test-app
---

## Overview

The Mongoose OS Skeleton is a foundational boilerplate designed to jumpstart the development of IoT applications using Mongoose OS. It provides a clean, structured starting point for developers targeting popular microcontrollers like the ESP32 and ESP8266. By offering a pre-configured environment, it allows developers to focus on application logic rather than the complexities of initial project setup.

## Project Structure and Configuration

The heart of the project is the `mos.yml` file, which serves as the manifest for the Mongoose OS build system. This file defines the project's metadata, including the versioning for libraries, modules, and the Mongoose OS core itself. The skeleton is currently configured for version 2.20.0, though it includes helpful documentation on downgrading to 2.19.1 to address specific compatibility issues with the mJS library on ESP8266 hardware.

The repository follows a standard Mongoose OS directory layout:
- **src/**: For C/C++ source files.
- **include/**: For header files.
- **fs/**: For files that will be uploaded to the device's internal filesystem (such as configuration files or web assets).
- **mos.yml**: The primary build and configuration manifest.

## Key Features and Integrated Libraries

The skeleton comes pre-loaded with a suite of essential libraries that provide the core functionality required by most modern IoT devices:

- **Networking**: Built-in support for WiFi (Station and Access Point modes) and optional support for PPPOS (Point-to-Point Protocol over Serial) for GSM module integration.
- **RPC Services**: Includes Remote Procedure Call (RPC) services for UART, filesystem management, configuration updates, and Over-the-Air (OTA) firmware updates.
- **Scripting Support**: Integration with mJS, a restricted subset of JavaScript designed specifically for microcontrollers with limited memory, allowing for rapid prototyping alongside C code.
- **Configuration Management**: A flexible configuration schema that allows developers to define custom application settings that persist across reboots.

## Hardware Support and Customization

While Mongoose OS is cross-platform, this skeleton provides specific guidance for the ESP32 and ESP8266 ecosystems. The `mos.yml` file includes commented-out sections for advanced hardware configurations, such as:
- Enabling SPIRAM support for ESP32-WROVER modules.
- Configuring flash sizes for 4MB, 8MB, or 16MB modules.
- Setting up GPIO pins for external peripherals like GSM modems.

## Getting Started

To use this skeleton, developers typically clone the repository and use the `mos` tool to build and flash the firmware. The project is designed to be highly extensible; users can uncomment sections in the `mos.yml` to enable additional features like MQTT, SNTP time synchronization, or the mDash IoT Cloud integration. The configuration schema also provides a template for storing application-specific data, such as memory slots or WiFi credentials, which can be modified via the Mongoose OS RPC interface or the command-line tool.
