---
title: UART Out Test App
summary: A skeleton application for Mongoose OS designed to test UART output functionality.
  It provides a basic structure for building C-based firmware with built-in support
  for RPC services and UART communication.
slug: uart-out-test-app
codeUrl: https://github.com/Podnet/uart-out-mgos-test
star: 0
lastUpdated: '2020-06-01'
rtos: mongoose-os
topics:
- c
- esp32
- esp8266
- mongoose-os
- mongoose-os-app
- uart
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- empty-mongoose-os-app
- mongoose-os-app-skeleton
- mcp2515-can-testing-app-for-mongoose-os
- mongoose-os-app-on-stm32f446re
- websocket-client-for-mongoose-os
- max17263-test-app-for-mongoose-os
---

## Overview

The UART Out Test App is a foundational skeleton for developing applications on Mongoose OS. While it serves as an empty starting point, it is pre-configured with essential libraries to facilitate UART communication and remote management via RPC (Remote Procedure Call). This project is designed for developers who need a clean, minimal environment to begin building custom IoT firmware from scratch while maintaining access to the powerful features of the Mongoose OS ecosystem.

## Technical Configuration

The project is managed through the `mos.yml` configuration file, which defines the build environment, dependencies, and hardware settings. It is specifically set up for C development and utilizes the Mongoose OS build system to manage cross-compilation for various target platforms. 

The application includes several core libraries that provide immediate functionality:
- **rpc-uart**: Enables RPC communication over the UART interface, allowing for remote command execution and debugging.
- **rpc-service-config**: Provides remote configuration management, allowing settings to be modified without a full firmware upgrade.
- **rpc-service-fs**: Allows for remote filesystem access and management.
- **ca-bundle**: Includes a bundle of Certificate Authority certificates, ensuring the device is ready for secure cloud communication.

## Architecture and Development

As a Mongoose OS application, this project follows a standard structure where source code is located in the `src` directory and device filesystem files are placed in `fs`. The project also includes a `Doxyfile`, indicating a structure ready for automated API documentation generation using Doxygen.

Mongoose OS provides a robust environment for IoT development, offering features like over-the-air (OTA) updates, a web-based UI for device management, and support for multiple hardware platforms including ESP32, ESP8266, and STM32. This skeleton app allows developers to skip the initial setup phase and move directly into implementing custom logic, particularly for projects requiring serial output or UART-based interfacing.

## Getting Started

To use this project, developers typically use the `mos` tool to build and flash the firmware to a supported microcontroller. The included RPC services allow for immediate interaction with the device's filesystem and configuration settings without writing additional boilerplate code. Because it is a skeleton app, the `src` directory serves as the primary entry point for adding custom C code to handle specific hardware peripherals or business logic.
