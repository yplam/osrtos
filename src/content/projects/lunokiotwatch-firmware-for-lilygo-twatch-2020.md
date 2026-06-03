---
title: lunokIoTWatch Firmware for LilyGo TWatch 2020
summary: A comprehensive open-source firmware for the LilyGo TWatch 2020 series based
  on the ESP32 and Arduino framework. It features a custom UI engine, Lua scripting,
  BLE/WiFi connectivity, and integration with Gadgetbridge for smartphone notifications.
slug: lunokiotwatch-firmware-for-lilygo-twatch-2020
codeUrl: https://github.com/lunokjod/watch
star: 50
lastUpdated: '2024-10-01'
rtos: freertos
libraries:
- h2zero-esp-nimble-cpp
- sqlite
- tft-espi
- littlefs
topics:
- arduino
- banglejs
- ble
- cpp11
- engine3d
- esp32
- esp32-arduino
- gadgetbridge
- games
- gpl3
- handwriting-recognition
- lilygo
- littlefs
- lua
- nvs
- ota-update
- spiffs
- sqlite3
- stepcounter
- wifi
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- lvgl-watch-firmware-for-open-smartwatch
- chronos-watchy
- dt78-esp32-firmware
- twatch-v3-firmware-for-esp32
- watchx-open-source-smartwatch
- opentimewatch-os
---

## Overview

The lunokIoTWatch project is a sophisticated firmware designed for the LilyGo TWatch 2020 series, a popular ESP32-based smartwatch platform. This project transforms the TWatch into a highly customizable wearable device, offering features ranging from basic timekeeping and weather updates to advanced capabilities like Lua scripting and 3D graphics rendering. Built on the Arduino framework and leveraging the ESP32's dual-core architecture, the firmware provides a responsive user interface and robust connectivity options.

## Hardware Support and Integration

The firmware is designed to support the entire LilyGo TWatch 2020 lineup, including versions V1, V2, and V3. It provides deep integration with the watch's hardware components:

- **Power Management**: Full support for the AXP202 PMU, including battery monitoring and charging status.
- **Sensors**: Integration with the BMA423 triaxial accelerometer for step counting and gesture recognition (such as wake-on-wrist-tilt).
- **Display**: High-performance rendering on the ST7789V TFT display using the TFT_eSPI library.
- **Audio**: MP3 playback support via the MAX98357A I2S DAC.
- **Connectivity**: WiFi for NTP time synchronization and OpenWeatherMap updates, alongside Bluetooth Low Energy (BLE) for smartphone integration.

## Key Features

One of the standout features of lunokIoTWatch is its versatility. It includes a custom UI engine (LuI) that supports rich controls and layouting, and even a 3D engine for rendering graphics on the wrist. For developers, the inclusion of a Lua scripting environment allows for rapid application development without needing to reflash the entire firmware.

**Notable capabilities include:**
- **Gadgetbridge Compatibility**: The watch can act as a BangleJS-compatible device, allowing it to receive Android notifications and sync data with the Gadgetbridge app.
- **Handwriting Recognition**: An AI-driven freehand character recognition system that can be trained to learn user-specific patterns.
- **WiFi Provisioning**: Easy setup of network credentials using standard Espressif SoftAP provisioning apps for Android and iOS.
- **Power Optimization**: Advanced sleep modes, including a unique "face-down" deep sleep trigger and gesture-based wakeup.
- **Media & Tools**: Includes a media player, color themes, multiple watchfaces, and an OTA (Over-the-Air) update system.

## Technical Architecture

The project is managed using PlatformIO, which handles the complex dependency tree and build configurations for different hardware versions. It utilizes the NimBLE-Arduino library for efficient Bluetooth LE communication, which is significantly more memory-efficient than the standard ESP32 BLE stack. Data persistence is handled via ArduinoNvs and an SQLite3 library, allowing for complex data storage on the device's flash memory.

## Getting Started

To build the project, developers use the PlatformIO CLI. The build process is environment-specific, requiring the user to select the correct environment (e.g., `Release-twatch2020_V3`) based on their hardware version. A unique requirement for the build is the presence of an `openWeatherKey.txt` file, which ensures that weather synchronization features are functional upon first boot. The firmware also makes extensive use of the SPIFFS/LittleFS filesystem to store assets like sounds, certificates, and UI configuration files.
