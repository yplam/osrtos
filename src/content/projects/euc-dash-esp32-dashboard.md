---
title: EUC-Dash-ESP32 Dashboard
summary: A stand-alone Bluetooth dashboard for electric unicycles (EUCs) designed
  for the ESP32-based TTGO T-Watch 2020. It leverages the Arduino framework and FreeRTOS
  to provide real-time telemetry, power management, and system settings via a wearable
  interface. Currently supports KingSong wheels with features like speed monitoring,
  battery status, and OTA updates.
slug: euc-dash-esp32-dashboard
codeUrl: https://github.com/Pickelhaupt/EUC-Dash-ESP32
siteUrl: https://github.com/Pickelhaupt/EUC-Dash-ESP32/tree/master/src
star: 40
version: '0.31'
lastUpdated: '2021-08-24'
rtos: freertos
libraries:
- lwip
- spiffs
topics:
- arduino
- ble
- electric-unicycle
- electric-unicycles
- esp32
- gotway
- kingsong
- lilygo-ttgo-t-watch-2020
- lvgl
- platformio
- t-watch
- t-watch-2020
- ttgo-t-watch
- ttgo-watch2020
- twatch
- twatch-2020
- unicycle
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- lvgl-watch-firmware-for-open-smartwatch
- bbmonitor
- lunokiotwatch-firmware-for-lilygo-twatch-2020
- esp32-remote-for-victron
- alfa-romeo-giulia-dashboard-info-display-for-esp32-s3
- esphome-tesla-ble
---

## Overview

EUC-Dash-ESP32 is a specialized dashboard application for electric unicycle (EUC) enthusiasts, designed to run on the ESP32-powered TTGO T-Watch 2020. By transforming a wearable device into a dedicated telemetry hub, it allows riders to monitor their wheel's performance without needing to check a smartphone. The project provides a complete rewrite of the original codebase, moving from the Arduino IDE to a more robust PlatformIO-based architecture to handle the complexities of Bluetooth Low Energy (BLE) communication and multi-screen user interfaces.

## Real-Time Telemetry and BLE Integration

The core functionality of EUC-Dash-ESP32 revolves around its ability to read and decode BLE notifications directly from the unicycle. It currently features deep support for KingSong models, including the KS14, KS16, KS18, and KS-S18 series. By reverse-engineering the communication protocols (with inspiration from the WheelLogAndroid project), the dashboard can display a wide array of real-time data:

- **Performance Metrics**: Current speed, max speed, and voltage.
- **Power Monitoring**: Current draw, power output, and battery percentage.
- **Trip Statistics**: Total distance, trip distance, and time since power-on.
- **Safety & Health**: EUC temperature, cooling fan status, and speed alarm settings.

## A Wearable Interface for Riders

Designed for use while riding, the interface is optimized for visibility and ease of use. It features multiple dashboard layouts, ranging from a simple speed-focused view to a full dashboard containing detailed electrical and thermal data. The project utilizes a tile-based UI system (inspired by the My-TTGO-Watch project) that supports:

- **Clock and Date**: Standard watch functionality when not connected to a wheel.
- **Settings Management**: On-device configuration for BLE connectivity, display contrast, rotation, and wake-up timers.
- **Alerts**: Visual notifications for speed alarms and tiltback settings.
- **Interaction**: Support for long-press actions (such as toggling lights) and gesture-based wake-up using the onboard accelerometer.

## Power Efficiency and System Utilities

Since the target hardware is a battery-powered wearable, power management is a critical component of the project. The software implements deep sleep modes, allowing the device to last around three days in standby. When connected and actively riding, the battery provides approximately six hours of continuous use. The system can be configured to wake up via a physical button, a double-tap on the screen, or movement detected by the accelerometer.

Additionally, the project includes modern system utilities such as WiFi connectivity for Over-The-Air (OTA) firmware upgrades, ensuring that riders can update their dashboard without needing a physical USB connection.

## Technical Foundation

EUC-Dash-ESP32 is built on the Arduino framework for ESP32, running on top of the FreeRTOS kernel. This allows for efficient handling of concurrent tasks, such as maintaining a BLE connection while updating the display and monitoring sensors. The project relies on several key libraries to manage its data and networking:

```ini
; Key dependencies from platformio.ini
lib_deps = 
    TTGO TWatch Library@=1.4.2
    AsyncTCP@>=1.1.1
    ArduinoJson@>=6.18.3
```

The build configuration is managed through PlatformIO, which handles dependency resolution and environment setup for the TTGO T-Watch hardware. The use of `sdkconfig` reveals a highly tuned ESP-IDF backend, utilizing SPIFFS for file storage and LWIP for network stack management during WiFi operations.
