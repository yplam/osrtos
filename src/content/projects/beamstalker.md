---
title: BeamStalker
summary: An open-source RF experimentation firmware for ESP32 and ESP32-S3 microcontrollers.
  It enables WiFi deauthentication, beacon spamming, and BLE advertising, specifically
  targeting portable hardware like the M5Cardputer and HeltecV3.
slug: beamstalker
codeUrl: https://github.com/Retr0Kr0dy/BeamStalker
siteUrl: https://retr0kr0dy.github.io/BeamStalker
star: 13
version: v0.2.8
lastUpdated: '2025-04-19'
rtos: freertos
topics:
- esp32
- firmware
- hacking
- m5cardputer
- microcontroller
- radio
- rf
isShow: true
image: /202603/m5-cardputer.webp
createdAt: '2026-03-02'
updatedAt: '2026-03-02'
---

BeamStalker is a versatile, open-source firmware designed for ESP32 and ESP32-S3 microcontrollers, specifically tailored for RF experimentation and security auditing. It serves as a collaborative platform for developers and enthusiasts to explore wireless protocols, including WiFi and Bluetooth Low Energy (BLE), in an ethical and educational context.

Built on the ESP-IDF v4.4 framework, BeamStalker leverages the powerful radio capabilities of Espressif SoCs to perform tasks that are often restricted by standard firmware. One of the project's unique aspects is its requirement for a custom patch to the ESP-IDF WiFi library. By weakening sanity checks on raw 802.11 frames via a provided shell script, the firmware gains the ability to inject and sniff packets more effectively, enabling advanced features like deauthentication and beacon spamming.

### Core Capabilities

The firmware currently implements several high-impact features for wireless exploration:

- **WiFi Deauther**: This tool allows users to send deauthentication frames to specific clients or broadcast them to nearby access points, effectively testing the resilience of WiFi networks against common disconnection attacks.
- **Beacon Spam**: Users can generate numerous "dumb" WiFi access points, filling the airwaves with custom SSID names to demonstrate how client devices perceive and list available networks.
- **WiFi Sniffer**: A dedicated sniffer mode allows for the capture and analysis of 802.11 frames based on user-defined filters, providing deep insight into local wireless traffic.
- **BLE Spam**: This feature targets Bluetooth Low Energy devices by flooding the vicinity with advertising frames, which can be used to test how mobile devices and IoT hardware handle high volumes of BLE traffic.

Future updates aim to expand these capabilities into the Sub-GHz spectrum, with planned support for recording and replaying RF frames as well as forging TPMS (Tyre Pressure Monitoring System) data.

### Hardware and Portability

BeamStalker is designed with portability in mind, supporting a variety of popular development boards:

- **M5Cardputer**: A compact, keyboard-equipped device that makes for an ideal portable hacking tool.
- **Heltec WiFi LoRa 32 V3**: A board that combines ESP32-S3 power with LoRa capabilities.
- **Standard ESP32/ESP32-S3**: Generic modules can also be used, provided they are configured correctly.

The project also integrates gracefully with the M5Launcher project, allowing users to easily switch between different firmware payloads on supported M5Stack hardware.

### Control and Interaction

The firmware offers three primary methods of interaction to suit different hardware configurations:

1. **GPIO Buttons**: The intended way to use the firmware is via physical buttons on the board, allowing for standalone operation in the field.
2. **Main ESP Button**: A secondary method using the built-in "Boot" or "EN" buttons, though this is currently noted as a work-in-progress.
3. **Serial Console**: For those without integrated displays or buttons, the firmware can be controlled via a serial connection from a computer or smartphone, providing a command-line interface for all features.

BeamStalker represents a community-driven effort to demystify RF technology, encouraging users to poke around, modify the code, and share their findings to push the boundaries of what is possible with low-cost embedded hardware.
