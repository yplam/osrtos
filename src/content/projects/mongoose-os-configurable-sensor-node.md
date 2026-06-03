---
title: Mongoose OS Configurable Sensor Node
summary: A general-purpose sensor node firmware built on Mongoose OS for ESP8266 and
  ESP32 microcontrollers. It features MQTT connectivity, a configurable pin layout,
  and support for OTA updates and remote configuration via RPC.
slug: mongoose-os-configurable-sensor-node
codeUrl: https://github.com/nielswart/mos-esp8266
star: 0
lastUpdated: '2017-12-25'
rtos: mongoose-os
topics:
- automation
- esp8266
- iot
- mongoose-os
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- iot-framework-for-nodemcu
- leilei-mongoose-os-sensing-device
- mongoose-os
- esp-temperature-to-losant-using-mongoose-os
- mongoose-os-programs-and-examples
- lilygo-higrow-esp32-plant-monitoring-sensor-firmware
---

## Overview

This project provides a flexible and configurable sensor node firmware designed to run on ESP8266 and ESP32 microcontrollers. Built using Mongoose OS, it leverages the framework's robust networking and configuration capabilities to create a reliable IoT edge device. The firmware is designed to be easily adapted for various sensor types and hardware layouts without requiring significant code changes for every new deployment.

## Hardware Support

The software is optimized for the ESP8266 and ESP32 architectures. It has been specifically tested on the NodeMCU ESP8266 board, though it is compatible with most standard modules based on these chips. The project utilizes the Mongoose OS hardware abstraction layer to manage GPIOs for LEDs, buttons, and sensors.

## Key Features

- **MQTT Connectivity**: Integrated support for MQTT allows the device to publish sensor data and subscribe to control topics. It includes RPC-over-MQTT for remote management.
- **Flexible Configuration**: The project uses a schema-based configuration system. Users can define pin layouts for LEDs and buttons, as well as specific sensor and relay configurations directly in the `mos.yml` or via JSON configuration files.
- **Remote Management**: By including RPC services for configuration, file system access, and UART, the device can be managed remotely without a physical connection.
- **OTA Updates**: Built-in support for Over-the-Air updates ensures that the firmware can be updated in the field.
- **JavaScript Support**: The inclusion of the `mjs` library allows for logic to be written in JavaScript, providing a high-level scripting environment alongside C code.

## Technical Implementation

The project structure follows the standard Mongoose OS application layout. The `mos.yml` file defines the project metadata, architecture targets, and a comprehensive list of library dependencies. 

### Configuration Schema

One of the core strengths of this project is its use of the Mongoose OS configuration schema. This allows developers to define custom settings that are compiled into a C structure, accessible throughout the application. For example:

```yaml
config_schema:
  - ["mqtt.enable", true]
  - ["pins", "o", {title: "Pins layout"}]
  - ["pins.led", "i", 13, {title: "LED GPIO pin"}]
  - ["pins.button", "i", 0, {title: "Button GPIO pin"}]
  - ["sensor", "o", {title: "Sensor Configuration"}]
  - ["relay", "o", {title: "Relay Configuration"}]
```

### Build and Deployment

The project is managed using the `mos` tool. To configure a specific device, users can add a `conf#.json` file (where # is 1-9) to the `fs` directory. This file contains network credentials, MQTT broker details, and unique device identifiers.

To build the firmware:
```bash
mos build --clean
```

To flash the firmware to a connected device:
```bash
mos flash
```

## Ecosystem and Libraries

The firmware relies on several official Mongoose OS libraries to provide its core functionality:
- **ca-bundle**: For SSL/TLS certificate management.
- **http-server**: To provide a local web interface for configuration.
- **wifi**: For managing wireless connectivity.
- **mqtt & rpc-mqtt**: For cloud communication and remote procedure calls.
- **rpc-service-ota**: To enable remote firmware updates.
