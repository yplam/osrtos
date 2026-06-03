---
title: OMOTE - Open Universal Remote
summary: An ESP32-based open-source universal remote firmware utilizing the Arduino
  framework and LVGL for its graphical user interface. It supports device control
  via Infrared, Bluetooth Low Energy keyboard emulation, and MQTT for smart home integration,
  featuring a cross-platform simulator for desktop-based UI development.
slug: omote-open-universal-remote
codeUrl: https://github.com/CoretechR/OMOTE
star: 1687
lastUpdated: '2025-12-14'
rtos: freertos
libraries:
- lvgl
- h2zero-esp-nimble-cpp
topics:
- ble
- esp32
- infrared
- lvgl
- remote
- wifi
isShow: true
image: /202601/OMOTE_assembled.webp
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- lvgl-watch-firmware-for-open-smartwatch
- openhasp-firmware
- electricitydisplay-mqtt-remote-control-for-esp8266-esp32
- open-display-firmware
- lunokiotwatch-firmware-for-lilygo-twatch-2020
- esp32-jarolift-controller
---

# OMOTE: The Open Source Universal Remote Firmware

OMOTE is a sophisticated firmware project designed for the ESP32, transforming it into a powerful, open-source universal remote control. By combining traditional infrared (IR) capabilities with modern wireless protocols like Bluetooth Low Energy (BLE) and MQTT, OMOTE serves as a bridge between legacy home entertainment systems and contemporary smart home ecosystems.

## A Multi-Protocol Control Hub

The core strength of the OMOTE firmware lies in its versatility. It is designed to handle a wide array of devices through different communication channels:

- **Infrared (IR):** Using the `IRremoteESP8266` library, it can decode and transmit IR signals to control televisions, amplifiers, and other traditional AV equipment.
- **Bluetooth Low Energy (BLE):** By acting as a BLE keyboard (via the NimBLE stack), the remote can control modern media players like the Amazon Fire TV or Apple TV, which often lack IR receivers.
- **MQTT:** For smart home enthusiasts, OMOTE integrates with MQTT brokers to control lights, switches, and other IoT devices, making it a central interface for home automation.

## High-Performance Graphical Interface

OMOTE features a rich, touch-based user interface powered by the **LVGL (Light and Versatile Graphics Library)**. The UI is designed to be responsive and visually appealing, utilizing the `LovyanGFX` driver for high-speed display updates. 

One of the most innovative aspects of the project is its **cross-platform simulator**. Developers can compile and run the exact same LVGL-based UI on Windows, Linux, or macOS using PlatformIO and SDL2. This allows for rapid prototyping, layout adjustments, and logic testing without the need to constantly flash physical hardware.

## Hardware Evolution and Support

The firmware supports multiple generations of OMOTE hardware. Early revisions (Rev 1-4) utilize the standard ESP32-WROOM modules, while the latest Revision 5 and higher transition to the **ESP32-S3**. This upgrade provides significant performance benefits, including:

- **PSRAM Support:** Allowing for larger memory buffers for the GUI.
- **8-Bit Parallel LCD Interface:** For smoother animations and higher frame rates.
- **TCA8418 Keypad Controller:** Offloading button scanning to dedicated hardware.

## Development and Customization

Built with **PlatformIO**, the project is highly modular. Users can define their own device pools, mapping specific IR codes or MQTT topics to UI elements. The `platformio.ini` configuration is extensively documented, providing toggles for features like WiFi, Bluetooth, and various logging levels. 

Whether you are looking to replace a drawer full of remotes or build a custom smart home controller, OMOTE provides a robust, extensible foundation for embedded developers and DIY enthusiasts alike. Detailed guides on modifying the firmware and using the software simulator are available in the project's documentation.
