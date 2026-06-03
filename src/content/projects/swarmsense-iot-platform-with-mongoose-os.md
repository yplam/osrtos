---
title: SwarmSense IoT Platform with Mongoose OS
summary: A reference implementation for connecting ESP32-based devices to the SwarmSense
  IoT Platform using Mongoose OS. It provides a pre-configured environment for MQTT
  communication and sensor data reporting.
slug: swarmsense-iot-platform-with-mongoose-os
codeUrl: https://github.com/gopalkildoliya/swarmsense-mongoose-test
star: 0
lastUpdated: '2018-03-12'
rtos: mongoose-os
topics:
- mongoose-os
- swarmsense
- swarmsense-iot-platform
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- mongoose-os-environmental-sensors-application
- losant-mqtt-mongoose-os-example
- losant-mqtt-example-for-mongoose-os
- mongoose-os-samples-for-esp32
- mongoose-os-programs-and-examples
- mongoose-os-environment-logger
---

## Overview

The SwarmSense Mongoose Test project provides a template for integrating embedded devices with the SwarmSense IoT Platform. By leveraging Mongoose OS, the project simplifies the process of connecting ESP32 hardware to cloud services, focusing on ease of configuration and reliable data transmission.

## Technical Architecture

The project is built on Mongoose OS, a purpose-built framework for IoT development. It specifically targets the ESP32 architecture, utilizing its built-in Wi-Fi and networking capabilities. The integration is managed through the `mos.yml` configuration file, which defines the project manifest, dependencies, and system settings.

### Configuration and Schema

A key feature of this implementation is the use of a configuration schema. This allows developers to define application-specific settings that can be managed through the Mongoose OS RPC mechanism or configuration files. The project includes custom settings for:
- **MQTT Connectivity**: Enabling and configuring the MQTT client for platform communication.
- **SwarmSense Settings**: Dedicated fields for sensor identification, such as the `sensor_id`.
- **Wi-Fi Management**: Standard station mode configuration for network access.

## Key Features

- **MQTT Integration**: Uses the Mongoose OS MQTT library to facilitate lightweight, asynchronous messaging between the sensor and the SwarmSense platform.
- **JavaScript Support**: Includes the `js-demo-bundle`, allowing for rapid prototyping using mJS (a restricted subset of JavaScript) alongside C code.
- **Filesystem Management**: Utilizes the Mongoose OS filesystem (`fs` directory) to store configuration files like `conf8.json`, which holds sensor-specific metadata.

## Getting Started

To use this project, developers typically use the `mos` tool to build and flash the firmware to an ESP32. The primary configuration happens within the `fs/conf8.json` file, where sensor details must be defined to match the requirements of the SwarmSense dashboard. Once flashed, the device automatically attempts to connect to the configured Wi-Fi network and begin its MQTT handshake with the platform backend.
