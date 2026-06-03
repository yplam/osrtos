---
title: Chronos Watchy
summary: Chronos Watchy is an alternative firmware for the Watchy e-ink smartwatch,
  built using the LVGL graphics library and the Arduino framework for ESP32. It enables
  advanced features like turn-by-turn navigation, smartphone notifications, and activity
  tracking through integration with the Chronos companion app.
slug: chronos-watchy
codeUrl: https://github.com/fbiego/chronos-watchy
siteUrl: https://chronos.ke/
star: 24
version: v1.1.0
lastUpdated: '2025-10-27'
rtos: freertos
libraries:
- littlefs
- lvgl
topics:
- ble
- chronos
- e-ink
- esp32
- lvgl
- smart-watch
- watchy
isShow: true
image: /202601/chronos-watchy.webp
createdAt: '2026-01-22'
updatedAt: '2026-01-22'
relatedProjects:
- dt78-esp32-firmware
- inkwatchy
- lunokiotwatch-firmware-for-lilygo-twatch-2020
- chrz-watch-firmware
- lvgl-watch-firmware-for-open-smartwatch
- zephyrwatch
---

Chronos Watchy represents a significant evolution for the Watchy open-source e-ink smartwatch ecosystem. Designed as a modern, feature-complete alternative firmware, it transforms the ESP32-based wearable into a highly functional companion device. By leveraging the LVGL (Light and Versatile Graphics Library), Chronos Watchy provides a polished user interface that defies the typical limitations of e-ink displays.

### Seamless Integration with the Chronos App
The core of the Chronos Watchy experience is its deep integration with the Chronos companion app. Unlike many DIY smartwatch projects that require manual configuration for every feature, Chronos Watchy uses Bluetooth Low Energy (BLE) to sync time, weather, and user settings automatically. This connection enables a suite of smart features including:

- **Notifications**: Real-time alerts from smartphone applications.
- **Navigation**: Turn-by-turn directions pushed directly from Google Maps or OsmAnd.
- **Media Controls**: Remote management of music playback and camera shutter.
- **Find Phone**: A utility to locate a misplaced smartphone.

### Health and Activity Tracking
Beyond simple notifications, the firmware includes robust activity tracking capabilities. It monitors steps, estimates distance traveled, and calculates calorie burn based on user profiles (age, height, and weight) configured in the app. Historical data is maintained, allowing users to track their progress over time. The firmware also supports a dedicated Sleep Mode, which can be scheduled via the app to reduce power consumption during the night.

### Technical Foundation
Built on the Arduino framework for the ESP32, Chronos Watchy utilizes several high-performance libraries to manage its hardware. The display is driven by the GxEPD2 library, ensuring crisp updates on the e-ink panel. UI elements are rendered using LVGL 9, which allows for sophisticated layouts and animations. Data persistence and configuration are handled via LittleFS, while ArduinoJson manages the complex data structures required for weather and settings synchronization.

The project is optimized for Watchy v2.0 hardware and has been verified on various hardware iterations, including popular USB Type-C clones. Developers can customize the experience further by installing additional watchfaces at runtime via BLE, utilizing the watchy_faces repository.

### Getting Started
For users looking to upgrade their Watchy, the project offers two primary paths. The recommended approach is using the browser-based ESP flasher, which allows for firmware updates directly via Chrome without installing a full development environment. For developers, the project is fully compatible with PlatformIO, providing a streamlined build and upload process. Once flashed, pairing is simplified through a QR code system displayed directly on the watch face, allowing the Chronos App to identify and configure the device in seconds.
