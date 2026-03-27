---
title: Ultimate Remote for M5Cardputer
summary: A powerful universal remote control application for the M5Cardputer (ESP32-S3)
  supporting over 3,400 remote profiles and 30,000 commands. It features compatibility
  with Flipper-IRDB .ir files, automatic scanning for device discovery, and NVS-based
  favorites storage.
slug: ultimate-remote-for-m5cardputer
codeUrl: https://github.com/geo-tp/Ultimate-Remote
star: 154
version: v1.2
lastUpdated: '2025-09-11'
rtos: freertos
topics:
- cardputer
- esp32
- flipperzero
- infrared
- m5cardputer
- m5stack
- remote-control
isShow: true
image: /202603/ultimate-remote.webp
createdAt: '2026-03-24'
updatedAt: '2026-03-24'
---

## Overview

The Ultimate Remote is a sophisticated infrared (IR) control solution designed specifically for the M5Cardputer, a portable ESP32-S3 based development kit. By leveraging the M5Cardputer's integrated IR transmitter, keyboard, and display, this project transforms the device into a powerful universal remote capable of controlling thousands of consumer electronics devices.

At the heart of the Ultimate Remote is an extensive internal database containing nearly 3,500 remote profiles from over 600 different manufacturers. This database encompasses approximately 30,000 individual commands, covering a vast array of protocols including NEC, RC5, RC6, SIRC, and Samsung32.

## Key Features and Capabilities

One of the standout features of this project is its compatibility with the Flipper-IRDB ecosystem. Users can download `.ir` files formatted for the Flipper Zero and load them directly onto an SD card for use with the Ultimate Remote. This bridge between platforms significantly expands the device's utility, allowing users to tap into community-maintained IR signal repositories.

The application provides several modes of operation to enhance user experience:

- **Scan and Find Mode:** This mode is particularly useful for identifying unknown devices. It allows users to cycle through all available profiles for a specific manufacturer until the target device responds. Once a working profile is found, it can be saved to the favorites section.
- **Favorites Management:** Users can save up to 40 custom remotes in addition to the 40 default favorites. These are stored in the ESP32's Non-Volatile Storage (NVS), ensuring they persist across reboots even without an SD card inserted.
- **SD Card Browsing:** For users with massive collections of `.ir` files, the project supports browsing external files directly from an SD card, allowing for nearly unlimited expansion.

## Technical Implementation

The project is built using the Arduino framework on the ESP32-S3 platform, managed via PlatformIO. It utilizes the M5Cardputer library for hardware abstraction, managing the display, keyboard, and IR peripherals. The IR signal generation logic is based on an adapted version of MakeHex, ensuring high precision and compatibility with various infrared protocols.

The user interface is optimized for the M5Cardputer's form factor. Navigation is handled via the physical keyboard and directional keys, with a search function to quickly filter through the massive list of manufacturers. To make operation more intuitive, the project includes a standardized keymapping system where common functions like power, volume, and channel control are mapped to specific physical keys.

## Getting Started

Installation is streamlined through the M5Burner tool, allowing users to flash the firmware directly to their M5Cardputer. For developers, the project can be built from source using PlatformIO. Once installed, users can immediately begin using the internal database or expand their library by unzipping the Flipper-IRDB repository onto a microSD card. The application's 'Read Files' menu provides a seamless way to navigate these external resources and deploy IR commands on the fly.
