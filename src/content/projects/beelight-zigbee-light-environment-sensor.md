---
title: BeeLight - Zigbee Light & Environment Sensor
summary: An open-source Zigbee-based environmental sensor platform powered by the
  nRF54L MCU and running the Zephyr RTOS. It monitors temperature, humidity, pressure,
  air quality (IAQ, VOC, CO2), and light intensity, designed for integration with
  Home Automation systems via Zigbee2MQTT.
slug: beelight-zigbee-light-environment-sensor
codeUrl: https://github.com/Kampi/BeeLight
star: 12
lastUpdated: '2025-11-10'
rtos: zephyr
libraries:
- zephyrproject-rtos-zscilib
topics:
- electronics
- home-assistant
- home-automation
- kibot
- kicad
- ncs
- nrf-connect-sdk
- nrf54
- nrf54l15
- pcb
- zephyr
- zigbee
- zigbee-board
- zigbee-herdsman
- zigbee-protocol
- zigbee2mqtt
isShow: true
image: /202602/beelight.webp
createdAt: '2026-02-26'
updatedAt: '2026-02-26'
---

## Overview

BeeLight is a comprehensive open-source project designed to create a high-performance, low-power environmental sensor for home automation. Built around the cutting-edge Nordic Semiconductor nRF54L MCU, the device leverages the Zephyr RTOS to provide a robust and energy-efficient firmware foundation. The project is fully integrated into the Zigbee2MQTT ecosystem, allowing users to monitor a wide array of environmental parameters within platforms like Home Assistant.

## Technical Features and Sensing

The BeeLight sensor is designed to be powered by a single coin cell battery, making it ideal for discreet placement around a home. Despite its small footprint (40x42x20 mm), it packs significant sensing capabilities. The device can measure:

- **Climate**: Temperature, Humidity, and Atmospheric Pressure.
- **Air Quality**: IAQ (Indoor Air Quality), VOC (Volatile Organic Compounds) equivalent, and CO2 equivalent.
- **Ambient Conditions**: Light intensity.
- **System Health**: Battery voltage monitoring.

The hardware is designed for accessibility, featuring a basic electronic layout that can be assembled by hand. The project includes a KiCad 9 project for the PCB and a 3D-printable housing optimized for PLA filament.

## Firmware and RTOS Integration

The firmware is built on the Zephyr RTOS, utilizing the `west` meta-tool for project management, building, and flashing. This architecture ensures that the device benefits from Zephyr's advanced power management features and modular driver support. 

Building the firmware involves a standard Zephyr workflow:

```sh
west build --build-dir build . --pristine --board beelight@1/nrf54l15/cpuapp -- -DNCS_TOOLCHAIN_VERSION=NONE -DEXTRA_CONF_FILE=config/debug.conf -DBOARD_ROOT=.
```

One unique aspect of the BeeLight deployment is the requirement for a production configuration. Before the device can join a Zigbee network, a specific hex file containing the Zigbee configuration (including the extended address and offsets) must be generated using `nrfutil` and flashed to the device. This ensures that each sensor has a unique identity on the mesh network.

## Zigbee Implementation

BeeLight utilizes a mix of standard and custom Zigbee clusters to report data. While temperature, pressure, humidity, and light use standard ZCL (Zigbee Cluster Library) IDs, the air quality metrics (IAQ, VOC, and CO2) are handled via custom clusters. 

To support these custom clusters in Zigbee2MQTT, the project provides external converters. Users must manually adjust their `zigbee-herdsman` definitions to recognize the specific IDs for IAQ (0x1A0A), VOC (0x1A0B), and CO2 (0x1A0C). This level of customization allows the sensor to report high-resolution data that standard Zigbee profiles might not support natively.

## Hardware and Housing

The repository is a complete "hardware-to-software" solution. It includes:
- **Hardware**: KiCad 9 PCB designs with automated output generation via Kibot.
- **3D Printing**: STL and CAD files for a compact, two-part housing.
- **Documentation**: Detailed block diagrams, schematics, and BOMs.

By combining modern silicon like the nRF54L with the flexibility of Zephyr and Zigbee, BeeLight offers a professional-grade DIY alternative to commercial environmental sensors.
