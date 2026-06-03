---
title: Mongoose-OS Samples for ESP32
summary: A collection of example projects demonstrating the use of Mongoose-OS on
  the ESP32 microcontroller. These samples provide a reference for building IoT applications,
  covering hardware interfacing and cloud connectivity using the Mongoose-OS framework.
slug: mongoose-os-samples-for-esp32
codeUrl: https://github.com/douglaszuqueto/mongoose-os-samples
star: 1
lastUpdated: '2018-06-29'
rtos: mongoose-os
topics:
- aws-iot
- esp32
- iot
- mongoose-os
- mqtt
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- mongoose-os-programs-and-examples
- esp32-freertos-examples
- unipg-mbed-os-samples
- losant-mqtt-example-for-mongoose-os
- losant-mqtt-mongoose-os-example
- swarmsense-iot-platform-with-mongoose-os
---

## Overview

The `mongoose-os-samples` repository provides a practical starting point for developers looking to leverage Mongoose-OS on the ESP32 microcontroller. Mongoose-OS is an IoT Firmware Development Framework designed to reduce the complexity of building connected devices. By providing a collection of examples, this project demonstrates how to implement common IoT patterns and utilize the specific features of the ESP32 hardware.

## Mongoose-OS and ESP32

The ESP32 is a powerful SoC with integrated Wi-Fi and dual-mode Bluetooth, making it a popular choice for IoT applications. Mongoose-OS complements this hardware by providing a robust environment that supports both C and JavaScript (mJS) development. This allows for rapid prototyping while maintaining the performance required for production-grade firmware. 

By using Mongoose-OS, developers benefit from a framework that handles many of the low-level complexities associated with embedded networking and security, allowing them to focus on the application logic.

## Key Features of the Samples

While the specific samples vary, they typically focus on the core strengths of the Mongoose-OS ecosystem:

- **Cloud Integration**: Demonstrating connectivity to major IoT clouds like AWS IoT, Google IoT Core, and Microsoft Azure.
- **Networking**: Examples of Wi-Fi configuration, MQTT communication, and HTTP client/server implementations.
- **Hardware Interfacing**: Utilizing ESP32 peripherals such as GPIO, ADC, I2C, and SPI through the Mongoose-OS API.
- **Over-the-Air (OTA) Updates**: Showcasing the built-in mechanism for secure remote firmware updates, which is a critical requirement for deployed IoT devices.
- **Configuration Management**: Using the Mongoose-OS configuration system to manage device settings without hardcoding values.

## Getting Started

To use these samples, developers typically need the `mos` tool, which is the official command-line interface for Mongoose-OS. The standard workflow involves:

1. Installing the `mos` tool on a development machine.
2. Cloning the sample repository.
3. Building the firmware for the ESP32 target.
4. Flashing the firmware to the device via USB.

These samples serve as a valuable resource for understanding the project structure and the `mos.yml` configuration files required for Mongoose-OS projects. Because Mongoose-OS abstracts much of the underlying RTOS complexity, developers can often achieve complex networking tasks with significantly less code than traditional SDKs.
