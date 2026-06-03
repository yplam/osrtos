---
title: LilyGo HiGrow ESP32 Plant Monitoring Sensor Firmware (Hardware v1)
summary: A Mongoose OS-based firmware for the LilyGo HiGrow ESP32 Plant Monitoring
  Sensor v1.0. It provides sensor data collection for soil moisture, temperature,
  and humidity, featuring RPC support and Bluetooth configuration for integration
  with the HiGrow ecosystem.
slug: lilygo-higrow-esp32-plant-monitoring-sensor-firmware-hardware-v1
codeUrl: https://github.com/mongoose-os-apps/LilyGo-HiGrow-Sensor-v1
siteUrl: http://www.higrow.tech/en/
star: 4
version: 2.18.0
lastUpdated: '2018-04-24'
rtos: mongoose-os
topics:
- ble
- dht11
- esp32
- esp32-arduino
- higrow
- iot
- iot-device
- lilygo
- mongoose-os
- mongoose-os-app
- plant-monitoring
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lilygo-higrow-esp32-plant-monitoring-sensor-firmware
- smart-plant-monitoring-system
- mongoose-os-environment-logger
- mongoose-os-environmental-sensors-application
- mongoose-os-configurable-sensor-node
- esp32-ruuvitag-collector
---

## Overview

The LilyGo HiGrow ESP32 Plant Monitoring Sensor Firmware is a specialized application designed for the first-generation HiGrow hardware. Built on the Mongoose OS framework, this firmware transforms the ESP32-based board into a smart plant monitoring system capable of tracking environmental conditions and communicating via Bluetooth and WiFi.

This specific version focuses on the v1 hardware, which is characterized by its lack of a light sensor compared to later revisions. It provides a robust foundation for obtaining sensor readings and controlling on-board LEDs, while maintaining compatibility with the broader HiGrow ecosystem.

## Technical Architecture

The project leverages the modular nature of Mongoose OS, utilizing several key libraries to handle hardware abstraction and networking. The firmware is configured to manage:

- **Environmental Sensing**: Integration with DHT sensors for ambient temperature and humidity, alongside ADC-based soil moisture monitoring.
- **Connectivity**: Support for WiFi station and access point modes, as well as Bluetooth Low Energy (BLE) for device configuration.
- **Remote Management**: Inclusion of RPC (Remote Procedure Call) services over UART and FS, allowing for remote configuration and file system access.
- **Scripting**: Utilization of the mJS engine, enabling logic to be written in JavaScript for faster iteration and flexibility.

## Hardware Integration

The firmware is optimized for the ESP32 WROVER/WROOM modules found on the LilyGo HiGrow boards. A notable technical detail in the configuration is the adjustment of the deep sleep wakeup delay (`CONFIG_ESP32_DEEP_SLEEP_WAKEUP_DELAY=500`), which ensures stable hardware initialization when the device wakes up from low-power states to take periodic measurements.

## Configuration and Setup

Device behavior is primarily managed through the `mos.yml` configuration schema. This allows users to set specific parameters such as:

- **Bluetooth Identity**: The `bt.dev_name` must be prefixed with "Higrow" to ensure compatibility with the official HiGrow mobile application.
- **Network Credentials**: WiFi SSID and password settings for cloud connectivity.
- **Device Metadata**: Custom device IDs for tracking individual sensors within a larger deployment.

## Getting Started

To deploy this firmware, developers use the Mongoose OS `mos` tool. The workflow involves importing the project, building the firmware for the ESP32 architecture, and flashing it to the board. Because the project uses the Mongoose OS configuration system, most adjustments can be made via the command line or the `mos` UI without modifying the underlying source code. For those looking to integrate with the HiGrow cloud, it is important to note that this specific version does not automatically track and send device IDs to the HiGrow cloud API, offering a more private or customizable alternative to the stock firmware.
