---
title: WebScreen Software
summary: An open-source firmware stack for the WebScreen gadget, powered by an ESP32-S3
  and an AMOLED display. It integrates the Elk JavaScript engine with LVGL to provide
  a hackable runtime environment for custom apps, featuring robust WiFi, MQTT, and
  BLE connectivity.
slug: webscreen-software
codeUrl: https://github.com/HW-Lab-Hardware-Design-Agency/WebScreen-Software
siteUrl: https://webscreen.cc
star: 37
version: 2.0.7
lastUpdated: '2026-02-17'
rtos: freertos
libraries:
- lvgl
topics:
- arduino
- crowdsupply
- elk
- esp32
- lvgl
- lvgl-esp32
- lvgl9
- mqtt
- openhardware
- opensource
- oshwa
- webscreen
isShow: true
image: /202602/webscreen_black_1_500.webp
createdAt: '2026-02-24'
updatedAt: '2026-02-24'
---

WebScreen is a hackable, open-source gadget designed for gamers, makers, and creators who want a distraction-free way to stay in the zone. Built on the powerful ESP32-S3 platform, the WebScreen Software provides a complete ecosystem for running custom JavaScript applications on a high-resolution AMOLED display. The project emphasizes modularity, allowing users to easily bridge the gap between high-level scripting and low-level hardware control.

## A Modular Architecture for Embedded Apps

The software is structured into distinct layers to ensure stability and ease of development. At its core, the system manages hardware abstraction, networking, and a dedicated runtime environment. This architecture allows the device to handle complex tasks like SD card management with robust initialization, power management via smart button handling on GPIO 33, and optimized memory allocation utilizing the ESP32-S3's PSRAM.

One of the standout features of WebScreen is its dual-mode operation. If a valid JavaScript application is found on the SD card, the device enters a full dynamic runtime mode. If no script is available or if system errors occur, it gracefully transitions into a fallback mode, which includes a built-in notification app with scrolling text and GIF animations.

## JavaScript Runtime and UI Engine

WebScreen leverages the Elk JavaScript engine, providing a comprehensive set of API bindings that allow developers to write logic in a familiar language. The runtime environment is tightly integrated with the LVGL (Light and Versatile Graphics Library) to drive the RM67162 AMOLED display. This 536x240 screen uses a QSPI interface and supports 16-bit color depth with byte swapping for optimal performance.

The JavaScript API exposes a wide range of functions, including:
- **UI Drawing**: Functions like `draw_label()`, `create_image()`, and `animate_obj()` for building rich interfaces.
- **Networking**: Support for `http_get()`, `http_post()`, and secure HTTPS connections with certificate validation.
- **Hardware I/O**: Direct access to SD card file operations, display brightness, and BLE communication.
- **Messaging**: Full MQTT client support with publish/subscribe functionality for IoT integrations.

## Advanced Networking and Security

Connectivity is a first-class citizen in the WebScreen ecosystem. The software manages WiFi connections with built-in timeout handling and status monitoring. For secure communications, it supports certificate chain validation. Users can store full-chain PEM certificates on the SD card, enabling the JavaScript runtime to make secure requests to modern web APIs. Additionally, the integration of a Bluetooth Low Energy (BLE) stack opens up possibilities for interacting with mobile devices and other local peripherals.

## Interactive Development Workflow

For developers, WebScreen offers a sophisticated serial command system that turns the device into an interactive development console. Through a serial monitor, users can query system statistics, manage files on the SD card, and even write JavaScript code directly to the device. Commands like `/write` allow for an interactive editor experience, while `/load` enables switching between different applications without reflashing the firmware.

To simplify the initial setup, the project provides a Web Flasher, allowing beginners to install the latest firmware via a browser. Advanced users can utilize the Arduino IDE, where the project provides a custom `lv_conf.h` optimized for the ESP32-S3, featuring pre-configured Montserrat fonts and enabled layouts like Flexbox and Grid.
