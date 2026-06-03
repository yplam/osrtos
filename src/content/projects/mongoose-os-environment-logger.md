---
title: Mongoose OS Environment Logger
summary: A complete environment logging application for ESP8266 and ESP32 microcontrollers
  using Mongoose OS. It collects temperature, humidity, and pressure data from a BME280
  sensor and transmits it to the ThingSpeak IoT platform.
slug: mongoose-os-environment-logger
codeUrl: https://github.com/anyhotcountry/mgos-environment-logger
star: 0
lastUpdated: '2017-07-15'
rtos: mongoose-os
topics:
- bme280
- esp32
- esp8266
- mongoose-os
- thingspeak
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- mongoose-os-environmental-sensors-application
- mqtt-demo-for-stm32-iot-discovery-board-with-thingsboard
- losant-temperature-sensor-for-mongoose-os
- esp-temperature-to-losant-using-mongoose-os
- esp32-ruuvitag-collector
- espmonitor-iot-environmental-monitoring-system
---

## Overview

The Mongoose OS Environment Logger is a practical implementation of an IoT edge device designed to monitor ambient conditions. Built on the Mongoose OS framework, this project demonstrates how to integrate sensor hardware with cloud-based data analytics platforms like ThingSpeak. It provides a robust foundation for building connected sensors that require reliable data transmission and remote management capabilities.

The application is primarily targeted at the ESP8266 and ESP32 microcontrollers, leveraging their built-in Wi-Fi capabilities to transmit sensor readings. At its core, the project interfaces with a BME280 sensor—a popular choice for measuring temperature, humidity, and barometric pressure with high precision.

## Hardware and Connectivity

The project utilizes the I2C protocol to communicate with the BME280 sensor. The configuration is handled through the Mongoose OS build system, which enables the I2C master and includes the necessary driver libraries. By using a dedicated BME280 driver, the application abstracts low-level register manipulation, providing a clean C/C++ interface for data retrieval.

For connectivity, the logger is designed to work with ThingSpeak. It uses the MQTT protocol (or HTTP as a fallback) to publish telemetry data. The integration allows users to visualize their environmental data in real-time through ThingSpeak's dashboarding tools.

## Technical Implementation

The project structure follows the standard Mongoose OS layout, ensuring modularity and ease of maintenance:

- **Source Code**: Located in the `src` directory, the logic handles sensor polling intervals and data formatting.
- **Filesystem**: The `fs` directory contains the device configuration. A template file (`conf6.json.template`) is provided to help users set up their specific credentials.
- **Build Configuration**: The `mos.yml` file defines the project dependencies, including RPC services for GPIO, I2C, and OTA updates.

One of the strengths of this implementation is its use of the Mongoose OS configuration schema. Users can define MQTT topics, debug settings, and hardware pins directly in the configuration files, allowing for flexible deployment across different hardware setups without modifying the core source code.

## Key Features

- **Multi-Platform Support**: Includes specific build configurations for both ESP8266 and ESP32.
- **Remote Management**: Leverages Mongoose OS RPC services, allowing for remote configuration and file system access.
- **OTA Updates**: Includes libraries for Over-the-Air updates, ensuring the firmware can be maintained after deployment.
- **Sensor Integration**: Pre-configured for the BME280 sensor via I2C.

## Getting Started

To deploy the logger, developers need to set up the Mongoose OS build tool (`mos`). The process involves renaming the configuration template in the `fs` folder to `conf6.json` and filling in the required Wi-Fi and ThingSpeak details. Once the configuration is set, the project can be built and flashed to the target microcontroller using standard `mos build` and `mos flash` commands. This workflow makes it an excellent example for developers transitioning from simple Arduino sketches to more professional RTOS-based IoT applications.
