---
title: 'Acid Drop: Custom Firmware for LilyGo T-Deck'
summary: A custom firmware for the LilyGo T-Deck handheld device, featuring a graphical
  IRC client built with LVGL. It supports WiFi connectivity, audio playback, and various
  command-and-control features on the ESP32-S3 platform.
slug: acid-drop-custom-firmware-for-lilygo-t-deck
codeUrl: https://github.com/acidvegas/acid-drop
star: 142
version: v0.1.0-beta
lastUpdated: '2025-01-28'
rtos: freertos
libraries:
- lvgl
- lwip
- platformio-platformio-core
topics:
- embedded
- esp
- esp32
- firmware
- irc
- lilygo
- t-deck
isShow: true
image: /202603/acid-drop.webp
createdAt: '2026-03-07'
updatedAt: '2026-03-07'
---

## Overview

Acid Drop is an experimental custom firmware designed specifically for the LilyGo T-Deck, a standalone ESP32-S3 based handheld device featuring a built-in keyboard, screen, and trackball. The project aims to transform the T-Deck into a portable communication and utility tool, with a primary focus on providing a robust, mobile Internet Relay Chat (IRC) experience.

Currently in a beta status, Acid Drop leverages the power of the ESP32-S3's dual-core processor and PSRAM to deliver a rich graphical user interface and multi-functional applications. While the project is a work in progress, it already provides a functional environment for users looking to explore the capabilities of their T-Deck hardware beyond simple examples.

## Technical Foundation

The firmware is built using the Arduino framework within the PlatformIO ecosystem, targeting the `esp32s3box` board configuration. It utilizes several key libraries to manage its complex features:

- **LVGL (Light and Versatile Graphics Library):** Powers the enhanced UI, providing a sophisticated look and feel compared to standard terminal-based embedded interfaces.
- **ESP8266Audio:** Used for speaker support, enabling bootup sounds and audible notifications for IRC mentions.
- **ArduinoWebsockets & Wireguard-ESP32:** Provide the networking backbone for secure and flexible connectivity.

## Key Features

### Graphical IRC Client
At the heart of Acid Drop is a feature-rich IRC client. It supports standard IRC commands such as `/nick`, `/me`, and `/info`, along with a `/raw` command for advanced users to send data directly to the server. The client includes highlight support to notify users when their nickname is mentioned and supports 99-color formatting and full ASCII art rendering.

### System Utilities
Beyond chat, the firmware includes several system-level features:
- **WiFi Management:** A scanning and selection menu for connecting to local networks, with support for saved profiles.
- **Status Bar:** A persistent display for time, date, notifications, WiFi strength, and battery levels.
- **Power Management:** Automatic screen timeout to preserve battery life during inactivity.
- **Serial Debugging:** Integrated logs for on-device debugging via the USB-C port.

## Hardware Integration

Acid Drop is tailored to the unique hardware of the LilyGo T-Deck. It utilizes the device's keyboard for input, the speaker for notifications, and the ESP32-S3's internal flash and PSRAM for storing preferences and managing the UI buffer. The project roadmap includes expanding support to the onboard trackball, GPS modules, LoRa radio for off-grid communication, and SD card storage for logging and file management.

## Getting Started

For developers and enthusiasts, Acid Drop is designed to be flashed using PlatformIO or the standard `esptool.py` utility. The project uses a specific partition table (`default_16MB.csv`) to accommodate the firmware size and data requirements. 

On first boot, the device provides a clean interface for scanning WiFi networks. Users can navigate the menus using the keyboard (specifically 'u' for up and 'd' for down) and can wipe stored preferences by holding the 'w' key during the boot sequence. For those interested in the underlying operations, connecting via a serial monitor at 115200 baud provides real-time debug information.
