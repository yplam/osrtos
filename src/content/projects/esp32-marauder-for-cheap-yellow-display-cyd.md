---
title: ESP32 Marauder for Cheap Yellow Display (CYD)
summary: A specialized port of the ESP32-Marauder firmware tailored for the Cheap
  Yellow Display (CYD) hardware family. It provides a comprehensive suite of WiFi
  and Bluetooth testing tools, including wardriving, packet capture, and signal analysis,
  optimized for various ESP32 and ESP32-S3 touch screen modules.
slug: esp32-marauder-for-cheap-yellow-display-cyd
codeUrl: https://github.com/Fr4nkFletcher/ESP32-Marauder-Cheap-Yellow-Display
siteUrl: https://fr4nkfletcher.github.io/Adafruit_WebSerial_ESPTool/
star: 1459
version: v1.4.3
lastUpdated: '2025-11-15'
rtos: freertos
libraries:
- lwip
- spiffs
- littlefs
- tft-espi
topics:
- cheap-yellow-display
- cst820
- cyd
- esp32
- esp32-1732s019
- esp32-2432s024c
- esp32-2432s024r
- esp32-2432s028r
- esp32-2432s032c
- esp32-2432s032r
- esp32-3248s035c
- esp32-3248s035r
- gt911
- ili9341
- marauder
- st7789
- st7796
- sunton
- xpt2046
isShow: true
image: /202602/SX466.webp
createdAt: '2026-02-19'
updatedAt: '2026-02-19'
relatedProjects:
- esp32-marauder-for-esp32-3248s035c
- marauder-centauri
- esp-hack-fw
- esp32-cheap-yellow-display-micropython-lvgl
- ghost-esp
- unigeek-firmware
---

## Overview

The ESP32 Marauder for Cheap Yellow Display (CYD) project brings the powerful wireless auditing capabilities of the original Marauder firmware to the highly accessible and affordable CYD hardware ecosystem. By porting this firmware, developers and security enthusiasts can transform a standard ESP32-based development board with an integrated display into a portable network testing tool without the need for complex custom hardware assembly.

## Key Features and Capabilities

This port maintains the core functionality of the ESP32-Marauder while adding specific optimizations for the various display and touch controllers found in the CYD lineup. The firmware enables a wide range of wireless interactions and security testing features directly from a handheld interface.

**Wireless Auditing and Analysis:**
- **WiFi Scanning:** Advanced AP scanning including security checks, WPS detection, and manufacturer identification.
- **Packet Capture:** Raw capture capabilities with detailed statistics and logging to SD cards.
- **Signal Analysis:** Integrated WiFi and BLE analyzers with graphical channel displays.
- **Wardriving:** Full support for GPS-integrated wardriving, allowing users to map wireless networks with external GPS modules.

**Bluetooth and BLE Tools:**
- **BLE Sniffing:** Capabilities for detecting and analyzing Bluetooth Low Energy devices.
- **Specialized Sniffing:** Support for detecting Flipper Zero devices, AirTags, and Pwnagotchi units.
- **BLE Spamming:** Features for testing BLE responsiveness, including Flipper BLE spam simulations.

**Advanced Network Testing:**
- **Evil Portal:** Support for hosting captive portals for educational security demonstrations.
- **MAC Randomization:** Ability to generate random MAC addresses for both AP and Station interfaces.
- **Deauthentication Testing:** Standard Marauder features for network stress testing and authorization verification.

## Hardware Compatibility

One of the primary strengths of this project is its broad support for the "Cheap Yellow Display" ecosystem. It has been validated across a variety of screen sizes and controller types, including:

- **1.9" ESP32-S3:** Non-touch models using the ST7789 controller.
- **2.4" to 3.5" Displays:** Support for both Capacitive (GT911, CST820) and Resistive (XPT2046) touch screens.
- **Display Controllers:** Compatibility with ILI9341, ST7789, and ST7796 drivers.
- **Peripheral Support:** Integrated support for SD cards for logging and 4-pin connectors for external GPS modules.

## Technical Implementation

The project is built upon the Arduino framework for ESP32, utilizing FreeRTOS for task management and concurrency. A critical component of the project's success is the integration of a specialized fork of the TFT_eSPI library, which allows the firmware to run on various CYD hardware revisions without requiring manual hardware modifications or complex pin remapping by the user.

The firmware manages complex radio operations for both 2.4GHz WiFi and Bluetooth, handling packet injection and sniffing while simultaneously maintaining a responsive touch-based user interface. Memory management has been a focus of recent updates, ensuring that the feature-rich environment fits within the constraints of standard ESP32 modules.

## Getting Started

Users can deploy the firmware using several methods. The recommended approach is via a dedicated Web Flasher, which simplifies the process by allowing browser-based flashing without requiring a local development environment. For advanced users, the project supports manual flashing via `esptool.py` or compilation through the Arduino IDE, provided the environment is configured with the necessary libraries and the correct partition schemes for the ESP32.
