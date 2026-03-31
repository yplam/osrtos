---
title: Saturn
summary: Saturn is a multi-functional firmware for the M5Stack Cardputer designed
  for wireless security testing, infrared device interaction, and portable utility
  tasks. Built on the ESP32-S3 platform, it features Wi-Fi deauthentication tools,
  Bluetooth LE spoofing, and a comprehensive infrared remote control library.
slug: saturn
codeUrl: https://github.com/henriquesebastiao/saturn
version: v1.3.0
lastUpdated: '2025-11-02'
licenses:
- GPL-3.0
image: /202603/saturn_0.avif
rtos: freertos
libraries:
- lwip
topics:
- arduino
- cardputer
- esp32
- esp32-s3
- hardware
- m5cardputer
- m5stack
- m5stack-cardputer
- stamps3
isShow: true
createdAt: '2026-03-31'
updatedAt: '2026-03-31'
---

## Overview

Saturn is a versatile, open-source firmware designed specifically for the M5Stack Cardputer. It serves as a portable "Swiss Army Knife" for developers and security enthusiasts, combining vulnerability analysis tools with practical everyday utilities. Built upon the ESP32-S3 architecture, Saturn leverages the device's integrated Wi-Fi, Bluetooth, and Infrared capabilities to interact with the environment in unique ways.

Drawing inspiration and code from the Nemo project, Saturn expands on those foundations with a refined user interface, rounded corners, and localized support for both English and Portuguese (pt-BR). The project is designed to be accessible, offering multiple installation methods including the M5Burner desktop tool and manual flashing via `esptool.py`.

## Key Features

### Wireless Security & Analysis
Saturn includes a robust suite of Wi-Fi and Bluetooth tools. For Wi-Fi, it supports signal level monitoring with audible feedback, beacon attacks (including funny or random SSID generation), and deauthentication attacks. It also features captive portal cloning, which can be combined with deauthentication to simulate rogue access point scenarios for educational purposes.

On the Bluetooth front, the firmware implements several well-known BLE (Bluetooth Low Energy) interaction scripts, such as:
*   **AppleJuice**: Proximity pairing notification spoofing.
*   **Swift Pair**: Microsoft Windows pairing pop-up simulation.
*   **Android Spam**: Google Fast Pair notifications.
*   **SourApple Crash**: Testing device resilience against specific BLE sequences.

### Infrared Control
The firmware turns the Cardputer into a universal remote. It includes pre-configured IR codes for major television manufacturers like Samsung, Philips, and Toshiba. Users can navigate menus, adjust volume, and switch channels directly from the Cardputer’s keyboard. The project is designed for extensibility, allowing contributors to add new manufacturers and device types (like air conditioners or sound systems) via the `src/infrared.h` file.

### Multimedia and Utilities
Beyond security testing, Saturn includes several functional "day-to-day" features:
*   **Voice Recorder**: Capture audio and play it back using the Cardputer's built-in hardware.
*   **Buzzer Music**: A collection of chiptune-style renditions of famous themes, including Mario Bros, Star Wars, and DOOM.
*   **Customization**: Users can choose between standard and "silent" builds, the latter of which disables all startup and interaction sounds for discreet operation.

## Technical Architecture

Saturn is developed using the Arduino framework and is optimized for the ESP32-S3. Because it targets the M5Stack ecosystem, it relies heavily on the `M5Cardputer` library for display and input management, alongside `IRRemoteESP8266` for signal modulation. 

The repository is organized into a clean modular structure:
*   `src/infrared.h`: A central repository for IR protocol hex codes.
*   `src/language.h`: Handles string localization for a multi-language UI.
*   `src/settings.h`: Manages user preferences, color schemes (like `MAIN_COLOR` and `BG_COLOR`), and hardware definitions.

Due to the size of the firmware and its various assets, Saturn requires a specific partition scheme, typically the "Huge APP" or "No OTA" setting, providing up to 3MB of flash space for the application binary.

## Getting Started

For most users, the easiest way to install Saturn is through **M5Burner**. Simply search for "Saturn" under the Cardputer category and flash the latest version. For developers looking to customize the firmware, the project supports compilation via the Arduino IDE or the `arduino-cli`.

```bash
# Example compilation using arduino-cli
arduino-cli compile --fqbn m5stack:esp32:m5stack_cardputer \
  -e --build-property build.partitions=huge_app \
  --build-property upload.maximum_size=3145728 ./saturn.ino
```

Once flashed, the device presents a menu-driven interface navigable via the Cardputer's physical keyboard. The project remains under active development, with a focus on adding more IR protocols and refining the wireless attack modules.
