---
title: Twatch v3 Firmware for ESP32
summary: A firmware project for the ESP32-based Ligo Twatch v3 that implements Pebble-style
  health APIs. It utilizes the Zephyr RTOS and a BMA423 accelerometer to provide health
  tracking features and event services. The project focuses on bringing familiar Pebble
  smartwatch functionality to modern ESP32 hardware.
slug: twatch-v3-firmware-for-esp32
codeUrl: https://github.com/ck-telecom/twatch
star: 8
lastUpdated: '2022-04-16'
rtos: zephyr
topics:
- ble
- esp32
- ligo-twatch
- lvgl
- smart-watch
- zephyr
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- lvgl-watch-firmware-for-open-smartwatch
- zephyrwatch
- lunokiotwatch-firmware-for-lilygo-twatch-2020
- chrz-watch-firmware
- dt78-esp32-firmware
- pinetime-zephyr-firmware
---

## Overview

The Twatch project is a specialized firmware implementation for the Ligo Twatch v3, an ESP32-based wearable device. The primary objective of this repository is to port and implement the Pebble Health API, allowing developers to leverage familiar smartwatch development patterns on modern hardware. By utilizing the BMA423 accelerometer, the project enables health-tracking capabilities similar to those found in the original Pebble ecosystem.

Built on the Zephyr RTOS, the project takes advantage of a robust, scalable real-time operating system designed for resource-constrained devices. The use of Zephyr's `west` meta-tool simplifies the management of dependencies and the build process, ensuring a consistent development environment across different platforms.

## Hardware and Integration

The core of the Twatch v3 is the ESP32 SoC, providing ample processing power and connectivity for wearable applications. To handle motion sensing and step counting, the project integrates the BMA423 accelerometer. The software stack is designed to interface with this hardware through Zephyr's driver model, providing a foundation for the Pebble-inspired Health Service.

## Pebble Health API Support

One of the most interesting aspects of this project is its focus on the Pebble Health API. This implementation aims to provide a compatible interface for developers who are accustomed to the Rebble/Pebble development environment. Key areas of focus include:

- **Health Service**: Tracking physical activity and health metrics using the onboard accelerometer.
- **Event Service**: Managing system and user-defined events for a responsive user interface.
- **Vibes**: Controlling haptic feedback for notifications and alerts (currently implemented).
- **Timer and Storage**: Providing essential utilities for time-sensitive operations and persistent data management.

While some features are still under development, the project serves as an ongoing effort to bring the full suite of Pebble's Foundation services to the ESP32 platform.

## Development Workflow

Developers familiar with the Zephyr ecosystem will find the workflow intuitive. The project uses `west` for initialization and module updates, specifically targeting the `twatch_v3` board definition. 

To set up the environment, users follow the standard Zephyr getting started guide but initialize the workspace using the local application folder:

```bash
$ git clone --recursive https://github.com/ck-telecom/twatch.git
$ cd twatch
$ west init -l app/
$ west update
$ west espressif update
```

The build process is streamlined for the ESP32 target, allowing for rapid iteration and flashing to the device using standard `west build` and `west flash` commands. This structure makes it an excellent starting point for those looking to build custom smartwatch applications or experiment with health-tracking algorithms on the ESP32.
