---
title: OpenFIRE Firmware for ESP32
summary: An ESP32S3 port of the OpenFIRE light gun firmware, providing open-source
  light gun capabilities with IR tracking and force feedback. It introduces wireless
  connectivity using the ESP-NOW protocol and supports both ESP32S3 and RP2040 microcontrollers.
slug: openfire-firmware-for-esp32
codeUrl: https://github.com/alessandro-satanassi/OpenFIRE-Firmware-ESP32
star: 11
version: v6.0-RC6
lastUpdated: '2026-01-16'
rtos: freertos
libraries:
- littlefs
- spiffs
topics:
- arduino
- esp32
- lightgun
- platformio
isShow: true
image: /202601/openfire.webp
createdAt: '2026-01-20'
updatedAt: '2026-01-20'
relatedProjects:
- openfire-the-open-four-infa-red-emitter-light-gun-system
- lvgl-watch-firmware-for-open-smartwatch
- beamstalker
- omote-open-universal-remote
- esp32-bit-pirate
- esp32-bus-pirate
---

## Overview

OpenFIRE-Firmware-ESP32 is a specialized port of the original OpenFIRE project, an open-source Light Gun system designed for modern gaming. While the original project targeted the RP2040 and RP2350 architectures, this repository adapts the firmware for the ESP32S3 microcontroller. It maintains the core functionality of the OpenFIRE system—which uses a four-point infrared (IR) emitter array for high-precision tracking—while adding significant new features like wireless connectivity.

The project is developed using the PlatformIO ecosystem and the Arduino framework, leveraging the dual-core capabilities of the ESP32S3 to handle input polling and peripheral processing efficiently. 

## Key Features and Capabilities

The firmware transforms a microcontroller into a fully-featured light gun controller with several advanced peripherals and tracking methods:

- **Advanced IR Tracking**: Supports multiple IR layouts, including double lightbars and diamond configurations. It utilizes realtime perspective-adjusted tracking to ensure accuracy regardless of the player's angle to the screen.
- **Wireless Connectivity**: A standout feature of this port is the implementation of the ESP-NOW protocol. By using a dedicated ESP32S3 dongle (available in a companion repository), the gun can communicate wirelessly with a PC without the system detecting any difference from a standard USB connection.
- **Robust Peripheral Support**: The system manages solenoid and rumble force feedback, TMP36 temperature monitoring, and WS2812B NeoPixel lighting for visual feedback.
- **Flexible Input Mapping**: It provides outputs for Keyboard, 5-button Absolute Positioning Mouse, and dual-stick gamepads, all configurable through a robust button mapping system.
- **OLED Integration**: Supports SSD1306 I2C displays to provide visual feedback for in-game elements like life counts and ammunition.

## Technical Implementation

The project is built on the Arduino framework, which on the ESP32 platform runs atop FreeRTOS. This allows the firmware to manage concurrent tasks such as IR camera data processing, USB HID reporting, and wireless transmission via ESP-NOW. 

The build configuration is managed via `platformio.ini`, which defines environments for various boards including the Waveshare ESP32-S3-PICO and the YD-ESP32-S3-WROOM-1. It utilizes several key libraries for its functionality:
- **Adafruit TinyUSB**: For handling USB HID profiles (Mouse, Keyboard, Gamepad).
- **LovyanGFX & Adafruit GFX**: For driving the OLED displays and UI elements.
- **LittleFS/SPIFFS**: For storing calibration profiles and user settings on the internal flash memory.

## Hardware Support

While optimized for the ESP32S3, the codebase maintains compatibility with the RP2040. On the RP2040, the firmware supports direct USB connections, while the ESP32S3 version enables the full wireless suite. The system is designed to work with the DFRobot IR Positioning Camera (SEN0158) and custom-built IR LED emitters.

## Getting Started

To compile the project, users must clone the repository recursively to include all necessary submodules. Because it uses PlatformIO, the environment handles dependency management automatically based on the selected board profile. For wireless operation, users must also flash the companion 'OpenFIRE-DONGLE-ESP32' firmware onto a separate ESP32S3 module to act as the PC receiver.
