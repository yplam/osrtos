---
title: 'Leilei: Mongoose OS Sensing Device'
summary: An ESP8266-based sensing application built on Mongoose OS, featuring MQTT
  connectivity and I2C sensor support. It provides a robust framework for Cyber-Physical
  Systems (CPS) with support for both C and JavaScript logic.
slug: leilei-mongoose-os-sensing-device
codeUrl: https://github.com/elzup/leilei
star: 0
lastUpdated: '2018-03-26'
rtos: mongoose-os
topics:
- i2c
- mjs
- mongoose-os
- mqtt
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- mongoose-os-configurable-sensor-node
- iot-framework-for-nodemcu
- mongoose-os-mlx90614-ir-temperature-monitor
- losant-mqtt-example-for-mongoose-os
- coffee-bin-mqtt
- mongoose-os-programs-and-examples
---

## Overview

Leilei is an embedded firmware project designed for the ESP8266 microcontroller, utilizing the Mongoose OS framework. Described as a "CPS lab server," it provides a foundation for building sensing devices that require robust networking and hardware integration. The project is structured to allow developers to implement logic using either C or JavaScript (via the mJS engine), making it highly flexible for rapid prototyping and deployment in Cyber-Physical Systems.

## Key Features

The application comes pre-configured with several essential features for IoT development:

- **MQTT Connectivity**: Integrated support for MQTT, with default configurations pointing to ThingSpeak, enabling easy data logging and remote monitoring.
- **Hardware Interfacing**: Built-in support for I2C and SPI protocols, allowing for seamless connection to various sensors and peripherals. The I2C interface is enabled by default in the configuration schema.
- **Remote Management**: Includes RPC (Remote Procedure Call) services for GPIO, I2C, and filesystem management, facilitating remote debugging and control.
- **Over-the-Air (OTA) Updates**: Support for OTA updates via HTTP, ensuring that devices can be updated in the field without physical access.
- **Web & RPC Services**: A built-in HTTP server and RPC loopback service provide multiple avenues for interacting with the device over a network.

## Technical Architecture

Leilei leverages the modular nature of Mongoose OS. The `mos.yml` configuration file defines the project's dependencies, including libraries for WiFi, MQTT, and the mJS JavaScript engine. This architecture allows the project to remain lightweight while providing high-level abstractions for complex networking tasks.

The project targets the ESP8266 architecture, a popular choice for low-cost WiFi-enabled sensing nodes. By utilizing the Mongoose OS VFS (Virtual File System) and SPI flash drivers, it ensures reliable data storage and management on the device's flash memory. The configuration schema also allows for easy adjustment of system parameters without modifying the core source code.

## Getting Started

To deploy Leilei, users typically configure their environment variables for the serial port and WiFi credentials to prepare the build environment:

```bash
export MOS_PORT=/dev/tty.xxx
export MOS_SSID=Your_WiFi_SSID
export MOS_PASS=Your_WiFi_Password
```

The project is then built and flashed using the `mos` tool, which handles dependency resolution and compilation for the ESP8266 target. Once running, the device can connect to an MQTT broker and begin transmitting sensor data or responding to RPC commands. Developers can extend the functionality by adding scripts to the `fs` directory for JavaScript execution or by adding C source files to the `src` directory.
