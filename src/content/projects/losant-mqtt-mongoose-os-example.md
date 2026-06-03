---
title: Losant MQTT Mongoose OS Example
summary: An example Mongoose OS application designed to connect ESP32 and ESP8266
  microcontrollers to the Losant IoT platform via MQTT. It demonstrates secure MQTT
  communication with SSL/TLS encryption and utilizes the Mongoose OS modular library
  system for hardware abstraction. The project provides a streamlined workflow for
  configuring WiFi and Losant credentials using the mos tool.
slug: losant-mqtt-mongoose-os-example
codeUrl: https://github.com/Losant/losant-mqtt-mongoose-os
siteUrl: https://www.losant.com
star: 7
lastUpdated: '2017-08-21'
rtos: mongoose-os
topics:
- esp32
- esp8266
- losant
- mongoose-os
- mqtt
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- losant-mqtt-example-for-mongoose-os
- swarmsense-iot-platform-with-mongoose-os
- mongoose-os-programs-and-examples
- mongoose-os-samples-for-esp32
- electricitydisplay-mqtt-remote-control-for-esp8266-esp32
- esp-temperature-to-losant-using-mongoose-os
---

## Overview

The Losant MQTT Mongoose OS example provides a robust starting point for developers looking to integrate ESP32 or ESP8266 devices with the Losant IoT platform. By leveraging Mongoose OS—an IoT firmware development framework—this project simplifies the complexities of network configuration, security, and cloud connectivity.

## Hardware and Platform Support

This example is specifically tested and optimized for the following hardware:
- **ESP32**: A powerful SoC with integrated Wi-Fi and dual-mode Bluetooth.
- **ESP8266**: A cost-effective Wi-Fi microchip with a full TCP/IP stack.
- **CC3200**: Support is also indicated in the project configuration for Texas Instruments' SimpleLink Wi-Fi wireless microcontroller.

## Core Functionality

The application focuses on establishing a secure MQTT connection to Losant's message broker. Mongoose OS handles the underlying networking stack, while the project configuration defines the specific parameters required for Losant:

- **MQTT with SSL/TLS**: The project is configured to use `broker.losant.com` on port 8883, ensuring that data transmitted between the device and the cloud is encrypted.
- **Modular Architecture**: It utilizes several Mongoose OS libraries, including `wifi` for connectivity, `http-server` for local management, and various `rpc-service` modules for remote procedure calls over MQTT or UART.
- **JavaScript and C Support**: While the core logic can be written in C, the inclusion of the `mjs` library allows for embedded JavaScript scripting, providing flexibility in how developers implement their business logic.

## Getting Started

To use this project, developers utilize the `mos` tool, which manages the build and flash process. The workflow involves building the firmware for the specific architecture (e.g., `mos build --arch esp32`) and flashing it to the device.

### Configuration

One of the strengths of Mongoose OS is its configuration system. Once the firmware is flashed, you can set your WiFi and Losant credentials directly from the command line without recompiling the code:

```bash
# Configure WiFi
mos wifi WIFI_SSID WIFI_PASSWORD

# Configure Losant Connection
mos config-set device.id=LOSANT_DEVICE_ID \
mqtt.client_id=LOSANT_DEVICE_ID \
mqtt.user=LOSANT_ACCESS_KEY \
mqtt.pass=LOSANT_ACCESS_SECRET
```

You obtain the `LOSANT_DEVICE_ID`, `LOSANT_ACCESS_KEY`, and `LOSANT_ACCESS_SECRET` values from the Losant platform dashboard, allowing the device to authenticate and begin streaming data to Losant workflows.

## Monitoring and Debugging

The project supports real-time log streaming via `mos console`, which is essential for debugging connection issues or monitoring sensor data throughput. Additionally, the `mos` Web UI provides a graphical interface for managing the device's file system and configuration settings.
