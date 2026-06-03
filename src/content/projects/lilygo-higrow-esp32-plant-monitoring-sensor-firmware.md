---
title: LilyGo HiGrow ESP32 Plant Monitoring Sensor Firmware
summary: A Mongoose OS-based firmware for the LilyGo HiGrow ESP32 Plant Monitoring
  Sensor (v1). It enables soil moisture, temperature, and humidity tracking with support
  for RPC, BLE, and WiFi connectivity.
slug: lilygo-higrow-esp32-plant-monitoring-sensor-firmware
codeUrl: https://github.com/mercdev/LilyGo-HiGrow-Sensor-v1
siteUrl: http://www.higrow.tech/en/
star: 7
lastUpdated: '2018-04-24'
rtos: mongoose-os
topics:
- ble
- dht11
- esp32
- higrow
- lilygo
- mongoose-os
- mongoose-os-app
- plant-monitoring
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lilygo-higrow-esp32-plant-monitoring-sensor-firmware-hardware-v1
- smart-plant-monitoring-system
- mongoose-os-configurable-sensor-node
- mongoose-os-environment-logger
- ruuvitag-firmware-for-zephyr-os
- iotea
---

## Overview

The LilyGo HiGrow ESP32 Plant Monitoring Sensor Firmware is a specialized application designed for the Hardware v1 version of the LilyGo HiGrow board. Built on the Mongoose OS framework, this firmware transforms the ESP32-based hardware into a connected plant monitoring system capable of tracking environmental conditions and reporting them via various protocols.

This specific codebase is tailored for the v1 hardware, which features soil moisture, temperature, and humidity sensing. Unlike later revisions, the v1 hardware does not include an integrated light sensor. The project emphasizes ease of deployment using the `mos` tool and provides a robust foundation for IoT gardening projects.

## Key Features

- **Environmental Sensing**: Integrates with DHT sensors for ambient temperature and humidity, alongside capacitive or resistive soil moisture probes.
- **Mongoose OS Integration**: Leverages the Mongoose OS ecosystem for simplified configuration, OTA updates, and filesystem management.
- **RPC Support**: Includes Remote Procedure Call (RPC) functionality, allowing for remote interaction and control of the device over various transports.
- **Connectivity Options**: Supports both WiFi (Station and AP modes) and Bluetooth Low Energy (BLE).
- **JavaScript (mJS) Support**: Utilizes the Mongoose OS mJS engine, allowing for high-level logic to be scripted while maintaining the performance of the underlying C-based RTOS.
- **Cloud Integration**: While it does not automatically track device IDs to the official HiGrow cloud by default, it provides the infrastructure to send records to the HiGrow API.

## Technical Details

The project is configured via a `mos.yml` manifest, which defines the hardware abstraction layer and software dependencies. It utilizes several Mongoose OS libraries to handle low-level tasks:

- **Networking**: WiFi and BLE stacks for communication.
- **Sensors**: Dedicated libraries for DHT sensors and Analog-to-Digital Conversion (ADC) for moisture readings.
- **System**: RPC services for filesystem access and UART communication, and a CA bundle for secure TLS connections.

### Hardware Configuration

The firmware targets the ESP32 WROOM module. A notable configuration detail in the build process is the adjustment of the deep sleep wakeup delay (`CONFIG_ESP32_DEEP_SLEEP_WAKEUP_DELAY=500`), which ensures system stability when waking from low-power modes to take sensor readings.

## Getting Started

To deploy this firmware, users utilize the `mos` tool. The configuration schema defined in `mos.yml` allows for easy customization of device parameters, such as WiFi credentials and Bluetooth device names. For compatibility with the official HiGrow mobile application, the Bluetooth device name should be prefixed with "Higrow".

```yaml
config_schema:
  - ["higrow.deviceId", "s", "", {title: "DeviceId"}]
  - ["wifi.sta.ssid", "Your_SSID"]
  - ["wifi.sta.pass", "Your_Password"]
  - ["bt.dev_name", "HiGrowBT_Sensor1"]
```

Once flashed, the device can be managed through the Mongoose OS Web UI or command-line interface, providing real-time access to sensor data and system logs.
