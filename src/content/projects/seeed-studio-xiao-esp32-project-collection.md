---
title: Seeed Studio XIAO ESP32 Project Collection
summary: A comprehensive development resource for the Seeed Studio XIAO ESP32 family,
  including the C3, S3, and C6 modules. It provides over thirty modular projects demonstrating
  hardware-specific features like LiPo battery monitoring, deep sleep optimization,
  and advanced wireless implementations such as BLE HID keyboards and WebSocket camera
  servers.
slug: seeed-studio-xiao-esp32-project-collection
codeUrl: https://github.com/pixelEDI/ESP32_XIAO
siteUrl: https://wiki.seeedstudio.com/XIAO_ESP32C3_Getting_Started/
lastUpdated: '2025-03-17'
licenses:
- MIT
rtos: freertos
libraries:
- littlefs
- nimble
- spiffs
topics:
- arduino
- esp32
- esp32-c3
- esp32-xiao
- oled
- seeedstudio
- ssd1306
- xiao
isShow: false
createdAt: '2026-04-02T23:23:26+00:00'
updatedAt: '2026-04-02T23:23:26+00:00'
---

The Seeed Studio XIAO series has gained significant popularity in the embedded world due to its thumb-sized form factor and impressive power-to-size ratio. This repository serves as an extensive library of practical implementations and firmware examples specifically tailored for the ESP32-based members of the XIAO family: the XIAO ESP32C3, the XIAO ESP32S3 (including the Sense variant), and the newer XIAO ESP32C6.

### Modular Project Architecture

The repository is structured into dozens of standalone projects, each targeting a specific peripheral or protocol. This modular approach allows developers to explore isolated features—ranging from basic LED blinking to complex IoT integrations—without the overhead of a monolithic codebase. Most projects are configured for PlatformIO, providing a consistent build environment that manages dependencies and board-specific settings automatically.

### Display and Visualization

A significant portion of the collection focuses on visual output, which is often a challenge on space-constrained boards. There are numerous examples for driving 0.42-inch OLED displays using the SSD1306 driver, including text rendering and bitmap battery indicators. Beyond standard OLEDs, the repository dives deep into e-Paper (e-ink) technology. Using the GxEPD2 library, these projects demonstrate how to render static text, background graphics, and custom fonts, making them ideal for low-power signage or wearable status displays.

### Advanced Wireless and Security

Leveraging the ESP32's native wireless capabilities, the repository includes several sophisticated connectivity examples:

*   **BLE HID Integration**: One standout project implements a Time-based One-Time Password (TOTP) generator. It uses the NimBLE-Arduino library to act as a Bluetooth Low Energy keyboard, allowing the XIAO to securely inject authentication codes directly into a host computer.
*   **Web-Based Streaming**: For the XIAO ESP32S3 Sense, there are multiple iterations of a Camera WebServer. These examples utilize WebSockets and mDNS to stream video data over a local network, with specific configurations for LiPo battery operation.
*   **IoT Protocols**: Integration with MQTT brokers is demonstrated through projects like an IoT Button and a Node-RED REST API interface, showing how to bridge small hardware nodes with larger automation ecosystems.

### Power Management and Peripherals

Since the XIAO boards are frequently used in battery-powered applications, power efficiency is a recurring theme. The repository provides deep sleep benchmarks and implementation guides for waking the device via GPIO. It also addresses a common hardware hurdle: battery monitoring. Since the XIAO ESP32C3 lacks a native battery-level sensing pin, the projects demonstrate how to implement external voltage dividers and use the `analogReadMilliVolts` API for accurate capacity tracking.

Furthermore, the collection explores modern ESP32 features such as the `analogContinuous` API for high-speed ADC sampling and the transition from SPIFFS to the more robust LittleFS for on-flash file storage.

### Getting Started

While the projects are optimized for PlatformIO, they remain compatible with the Arduino IDE. A typical `platformio.ini` configuration for these projects looks like this:

```ini
[env:seeed_xiao_esp32c3]
platform = espressif32
board = seeed_xiao_esp32c3
framework = arduino
monitor_speed = 115200
lib_deps =
      adafruit/Adafruit SSD1306 @ ^2.5.9 
      bblanchon/ArduinoJson @ ^7.0.4
```

This setup ensures that the correct RISC-V or Xtensa toolchains are used for the respective C3 or S3/C6 targets, while managing the specific partition tables required for features like Over-the-Air (OTA) updates and filesystem management.
