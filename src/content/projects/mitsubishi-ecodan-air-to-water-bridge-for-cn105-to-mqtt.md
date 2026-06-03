---
title: Mitsubishi Ecodan Air-to-Water Bridge for CN105 to MQTT
summary: A comprehensive firmware for ESP32 and ESP8266 microcontrollers that interfaces
  with Mitsubishi Ecodan FTC controllers via the CN105 connector. It provides a bridge
  to MQTT for Home Assistant integration, featuring advanced control logic like onboard
  compensation curves and short-cycle protection.
slug: mitsubishi-ecodan-air-to-water-bridge-for-cn105-to-mqtt
codeUrl: https://github.com/F1p/Home-Assistant-Mitsubishi-Ecodan-CN105-to-MQTT
star: 28
version: v6.6.0
lastUpdated: '2026-02-17'
rtos: freertos
libraries:
- littlefs
topics:
- cn105
- controller
- ecodan
- home-assistant
- mitsubishi
- mqtt
isShow: false
createdAt: '2026-02-18'
updatedAt: '2026-02-18'
relatedProjects:
- comfosense-touch-zehnder-comfoair-q350-mqtt-bridge-controller
- esp32-jarolift-controller
- esp32-controller-for-charlton-jenrick-fireplace
- simplebus2-mqtt-bridge
- mel-ac-library-for-mongoose-os
- openhasp-firmware
---

## Overview

The Mitsubishi Ecodan Air-to-Water Bridge is a specialized firmware designed to unlock the monitoring and control capabilities of Mitsubishi Ecodan heat pumps. By connecting to the FTC (Flow Temperature Controller) via the proprietary CN105 connector—the same port used by official MELCloud WiFi adapters—this project translates the heat pump's internal communication into standard MQTT messages. This enables deep integration with Home Assistant and other smart home platforms without relying on cloud services.

## Hardware Support

The project is built to run on a variety of popular ESP-based hardware, including:
- **ESP32 Generation 2 WiFi**: Official and custom hardware variants.
- **ESP32 Ethernet (WT32-ETH01)**: For users requiring a stable wired connection.
- **ESP32 AtomS3 Lite**: A compact form factor for minimalist installations.
- **ESP8266 (Generation 1)**: Legacy support for older hardware revisions.

One of the most innovative hardware features is the **Proxy (Onward Forward)** mode. With appropriate hardware, the bridge can sit between the heat pump and an official MELCloud adapter, allowing users to keep their official cloud functionality while simultaneously enjoying local MQTT control.

## Key Features

### Home Assistant Integration
Through MQTT Discovery, the bridge automatically populates Home Assistant with a vast array of sensors and controls. This includes flow temperatures, tank levels, energy consumption data, and the ability to toggle modes (Heating, Cooling, DHW) or trigger boosts.

### Onboard Compensation Curve
While many heat pumps have built-in weather compensation, this project implements an **Onboard Compensation Curve**. This allows for much finer control over the flow temperature based on outdoor ambient conditions, calculated locally on the ESP32. It supports manual offsets, wind influence, and temperature offsets to optimize efficiency.

### Advanced Protection Logic
To ensure the longevity of the heat pump hardware, the firmware includes:
- **Short Cycle Protection**: Monitors compressor run times and prevents frequent start/stop cycles that can damage the unit.
- **Flow Temperature Overshoot Hysteresis**: Manages flow setpoints dynamically to prevent the outdoor unit from cycling during low-load conditions.
- **Defrost Handling**: Intelligently detects and reports defrost cycles to prevent false data readings during these periods.

## Technical Implementation

The project is implemented as a sophisticated state machine. It manages multiple concurrent streams of data, including the serial communication with the Heat Pump (FTC), the optional MELCloud proxy stream, and the MQTT network client. 

Key components include:
- **EcodanDecoder**: A robust parser for the Mitsubishi CN105 protocol, capable of extracting system statuses, energy reports, and service codes.
- **MQTTConfig**: Handles the complex mapping of internal variables to Home Assistant-friendly MQTT topics.
- **TimerCallBack**: A custom scheduling mechanism that ensures non-blocking execution of periodic tasks like sensor polling and heartbeat signals.

## Getting Started

To deploy the bridge, users can flash the pre-compiled binaries or compile the source using the Arduino IDE. The firmware utilizes `WiFiManager` for easy initial setup, providing a captive portal to configure WiFi credentials and MQTT broker details. Once connected, the device will automatically begin broadcasting discovery messages to Home Assistant, making the heat pump's data available for dashboards and automations immediately.
