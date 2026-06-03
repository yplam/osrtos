---
title: Mongoose OS MLX90614 IR Temperature Monitor
summary: An IR temperature monitoring application for ESP8266 using Mongoose OS and
  the MLX90614 (GY-906) sensor. It features I2C communication with the sensor and
  publishes temperature data to MQTT topics with configurable reporting intervals.
slug: mongoose-os-mlx90614-ir-temperature-monitor
codeUrl: https://github.com/popstas/mongoose-mlx90614
star: 0
lastUpdated: '2020-12-15'
rtos: mongoose-os
topics:
- mlx90614
- mongoose-os
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- esp8266-mlx90614-temperature-monitor
- esp-temperature-to-losant-using-mongoose-os
- losant-temperature-sensor-for-mongoose-os
- ds18b20-mgos-test
- mongoose-os-environment-logger
- leilei-mongoose-os-sensing-device
---

## Overview

The `mongoose-mlx90614` project provides a ready-to-use firmware solution for monitoring infrared temperatures using the popular MLX90614 (GY-906) sensor. Built on the Mongoose OS framework and targeting the ESP8266 platform, this project simplifies the process of creating an IoT-connected thermometer for non-contact temperature measurement.

The MLX90614 is a sophisticated infrared thermometer capable of measuring both the object temperature (via IR) and the ambient temperature. This project integrates the sensor via the I2C protocol, utilizing the hardware abstraction layers provided by Mongoose OS to ensure reliable data acquisition and easy configuration.

## Hardware Integration

The project is designed to run on the ESP8266, specifically optimized for pin configurations common to development boards like the NodeMCU or Wemos D1 Mini. The default wiring configuration is as follows:
- **SCL**: Connected to GPIO 5 (D1)
- **SDA**: Connected to GPIO 4 (D2)
- **VCC**: 3.3V

These assignments are easily adjustable via the project's configuration schema, allowing for flexibility depending on the specific hardware layout or the use of other I2C-capable pins.

## Connectivity and Data Reporting

A key feature of this implementation is its efficient data reporting strategy via MQTT. To minimize network traffic and power consumption, the firmware does not publish data continuously. Instead, it is programmed to send updates only when a temperature change is detected or at a minimum heartbeat interval of once per minute.

The project utilizes a structured MQTT topic hierarchy for easy integration with home automation systems like Home Assistant or OpenHAB:
- `temp-ir/temp`: The primary infrared (object) temperature reading.
- `temp-ir/aux`: Auxiliary data, typically the ambient temperature of the sensor itself.
- `temp-ir/LWT`: The "Last Will and Testament" topic, which allows the MQTT broker to notify other clients if the sensor goes offline unexpectedly.

## Mongoose OS Framework

By leveraging Mongoose OS, the project benefits from a modular architecture and a robust build system. The `mos.yml` configuration file defines the project's dependencies, including standard libraries for I2C, MQTT, WiFi, and RPC services. 

One of the advantages of using Mongoose OS in this project is the inclusion of the `mjs` (Mongoose JavaScript) engine. This allows for high-level application logic to be written in JavaScript, which simplifies the handling of MQTT payloads and sensor logic compared to traditional C-based firmware development. The project also includes RPC services for configuration and file system management, enabling over-the-air (OTA) updates and remote configuration via the `mos` tool.

## Configuration and Customization

The project includes a comprehensive `config_schema` that makes it highly customizable without requiring code changes. Users can define:
- MQTT base topics and credentials.
- I2C pin assignments (SDA/SCL).
- MQTT reconnection timeouts and keep-alive settings.
- Debug levels for troubleshooting.

This makes the repository an excellent template for developers looking to deploy IR-based thermal monitoring in industrial, medical, or smart-home environments.
