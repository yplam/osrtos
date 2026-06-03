---
title: Bruce Firmware
summary: A versatile ESP32-based firmware designed for offensive security and Red
  Team operations. It supports a wide range of hardware including M5Stack and Lilygo
  devices, providing features for WiFi attacks, BLE manipulation, RF/RFID interaction,
  and a built-in JavaScript interpreter.
slug: bruce-firmware
codeUrl: https://github.com/BruceDevices/firmware
siteUrl: https://bruce.computer
star: 4854
version: '1.14'
lastUpdated: '2026-02-02'
rtos: freertos
libraries:
- littlefs
- h2zero-esp-nimble-cpp
topics:
- bruce
- cardputer
- embedded-systems
- esp32-c5
- esp32-s3
- flipperzero
- hardware
- iot
- lilygo
- m5stack
- m5stack-cardputer
- m5stack-stickc
- nfc
- offsec
- open-hardware
- pcbway
- radio
- rf
isShow: true
image: /202602/bruce-devices.webp
createdAt: '2026-02-11'
updatedAt: '2026-02-11'
relatedProjects:
- infiltra-firmware
- unigeek-firmware
- esp-hack-fw
- ghostesp
- ghost-esp
- saturn
---

## Overview

Bruce is a comprehensive open-source firmware for ESP32 microcontrollers, specifically designed to facilitate offensive security and Red Team operations. Inspired by the versatility of tools like the Flipper Zero, Bruce leverages the robust ESP32 ecosystem to provide a modular and affordable alternative for security researchers. It is compatible with a wide array of popular development kits, including the M5Stack Cardputer, StickC Plus, and Core series, as well as Lilygo's T-Deck and T-Embed products.

## Key Features & Capabilities

Bruce transforms standard ESP32 hardware into a multi-tool for wireless and physical security testing. Its feature set is organized into several specialized modules:

### WiFi and Networking
Bruce includes a sophisticated suite of WiFi tools ranging from basic connectivity to advanced offensive maneuvers. It supports beacon spamming, targeted deauthentication attacks, and Evil Portal creation. For network reconnaissance, it offers wardriving capabilities, TCP port scanning, and host discovery. It also includes built-in clients for Telnet and SSH, as well as support for WireGuard tunneling to secure outgoing traffic.

### Bluetooth Low Energy (BLE)
The firmware provides extensive BLE functionality, including scanning and various "spam" attacks targeting iOS, Windows, Samsung, and Android devices. It also features a "Bad BLE" mode, allowing the device to act as a wireless HID (Human Interface Device) to execute Ducky scripts, effectively turning the ESP32 into a remote keyboard injector.

### Radio Frequency (RF) and RFID
With the appropriate hardware modules (like the CC1101 or PN532), Bruce can interact with Sub-GHz RF and RFID systems. It supports scanning, copying, and replaying RF signals, as well as jamming capabilities. For RFID, it can read, clone, and write tags (125kHz and NFC), and even supports Amiibolink and Chameleon emulation.

### Scripting and Extensibility
One of the most powerful features of Bruce is its integrated JavaScript interpreter, powered by mquickjs. This allows users to write and execute custom scripts directly on the device, providing access to I2C, SPI, and UART buses for custom hardware interactions without needing to recompile the entire firmware.

## Hardware Support

Bruce is designed to be highly portable across the ESP32 family. It features specific optimizations for:
- **M5Stack**: Cardputer, StickC Plus/Plus2, Core Basic/Core2/CoreS3.
- **Lilygo**: T-Embed, T-Deck, T-Watch-S3, and T-Display series.
- **Custom Boards**: Support for the Bruce RF Reaper and Smoochiee V2 PCBs.
- **Modern SoCs**: The project is currently transitioning to support the ESP32-C5, enabling 5GHz WiFi capabilities.

## Technical Implementation

The project is built using the Arduino framework on top of FreeRTOS, managed via PlatformIO. It utilizes a modular architecture where features are enabled or disabled based on the target hardware's capabilities. For storage, it employs LittleFS to manage internal files and scripts. The UI is designed to be responsive across various display types, from small OLEDs on the M5Stick to the larger TFT screens on the T-Deck.

## Getting Started

The easiest way to deploy Bruce is through the official Web Flasher, which allows users to install the firmware directly from a browser. Alternatively, the project provides pre-compiled binaries for local flashing using `esptool.py`. For developers, the repository is structured for PlatformIO, with a comprehensive `platformio.ini` file defining environments for dozens of different ESP32 board configurations.
