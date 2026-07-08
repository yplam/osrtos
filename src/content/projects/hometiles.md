---
title: HomeTiles
summary: HomeTiles is a tile-based firmware for ESP32-P4 touch displays designed to
  function as a highly configurable Home Assistant dashboard. It utilizes LVGL for
  its touch-first UI and FreeRTOS for task management, providing features like MQTT
  integration, web-based drag-and-drop configuration, and on-device OTA updates. The
  project targets high-performance hardware including the M5Stack Tab5 and various
  Waveshare MIPI-DSI displays.
slug: hometiles
codeUrl: https://github.com/GalusPeres/HomeTiles
siteUrl: https://galusperes.github.io/HomeTiles/
version: v0.3.0
lastUpdated: '2026-07-07'
licenses:
- MIT
image: /202607/HomeTiles_0.avif
rtos: freertos
libraries:
- littlefs
- lvgl
topics:
- dashboard
- esp32-p4
- home-assistant
- lvgl
- mqtt
isShow: true
createdAt: '2026-07-08T00:12:02+00:00'
updatedAt: '2026-07-08T00:12:02+00:00'
---

HomeTiles is a comprehensive firmware solution for ESP32-P4 touch displays, transforming them into dedicated smart home control panels. Formerly known as the ESP32-P4-HomeAssistant-Display, the project has evolved into a polished, tile-based dashboard system that integrates seamlessly with Home Assistant via MQTT. It provides a bridge between high-performance hardware and a user-friendly configuration experience through a built-in web administration panel.

### Project Evolution and Requirements
The transition to the HomeTiles branding brought several quality-of-life improvements, such as a new boot splash screen and more reliable atomic storage for tile grids to prevent data corruption. To operate, the system requires a Home Assistant instance, an MQTT broker, and the dedicated HomeTiles Bridge integration. This bridge serves as the essential link, handling entity data and ensuring the display receives real-time updates from the smart home ecosystem.


### Dashboard and UI Experience
The core of the firmware is its touch-first, tile-based interface. Users can interact with a variety of tile types, including sensors, switches, media players with cover art, and energy statistics. The UI supports nested folder structures, allowing for organized navigation across different rooms or functions. Performance is a key focus, with recent releases introducing hardware-accelerated rotation and optimized draw paths for supported displays like the M5Stack Tab5 and Waveshare 8-inch models.

![Folder view](/202607/HomeTiles_1.avif)

### Web-Based Configuration
One of the standout features is the built-in web admin panel. This interface eliminates the need for manual code changes when adjusting the dashboard layout. Users can add, move, or resize tiles using a drag-and-drop editor directly in their browser. Beyond layout management, the web panel handles WiFi and MQTT settings, time zone configuration, and even provides a microSD file manager for uploading or deleting assets.

![Web admin interface](/202607/HomeTiles_10.avif)

### Supported Hardware
HomeTiles is specifically optimized for the ESP32-P4 platform. Currently supported devices include:
- **M5Stack Tab5**: A compact IoT development kit.
- **Waveshare ESP32-P4-WIFI6-Touch-LCD-4B**: A 4-inch MIPI-DSI display.
- **Waveshare ESP32-P4-WIFI6-Touch-LCD-8**: A larger 8-inch variant.

The firmware leverages the ESP32-P4's power to handle complex rendering tasks, though users should note specific hardware quirks. For example, the M5Stack Tab5 requires careful brightness management when running in Access Point mode without a battery to prevent brownouts, while Waveshare displays may experience minor cosmetic flickering during flash writes due to current limitations in PSRAM access during MIPI-DSI operations.

### System Features and Setup
The firmware supports a robust set of system-level features, including on-device WiFi scanning with an on-screen keyboard and an Access Point mode with QR code support for easy commissioning. Firmware updates are simplified through an on-device updater that checks GitHub releases directly, as well as a web-based OTA upload tool.

![Settings view](/202607/HomeTiles_2.avif)

For storage, the project utilizes the internal LittleFS partition for runtime configuration, making a microSD card optional. When present, the SD card enables additional functionality like screenshot exports and extended file management. The system also includes companion tooling, such as an Electron-based desktop app for sending PC metrics or simulated keyboard commands to the device, further extending its utility as a versatile desktop companion.
