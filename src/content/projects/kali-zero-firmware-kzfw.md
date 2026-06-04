---
title: Kali Zero Firmware (KZFW)
summary: A French-localized firmware for the Flipper Zero based on Xtreme Firmware.
  It features an enhanced asset management system, a 30-level progression system,
  and advanced Bluetooth spoofing capabilities for Bad Keyboard attacks.
slug: kali-zero-firmware-kzfw
codeUrl: https://github.com/Flipper76/Kali-Zero-Firmware
star: 27
version: Main_23.03.2024_06h40
lastUpdated: '2024-10-12'
rtos: freertos
libraries:
- nanopb
- littlefs
topics:
- alternative-firmware
- armv7m
- ble
- custom-firmware
- firmware-flipper-zero
- flipper
- flipper-plugins
- flipper-zero
- flipperzero
- french
- infrared
- kali-zero-firmware
- nfc
- onewire
- rfid
- stm32
- subghz
isShow: true
image: /202602/kali-zero.webp
createdAt: '2026-02-19'
updatedAt: '2026-02-19'
relatedProjects:
- bruce-firmware
- infiltra-firmware
- poseidon
- crumble
- zmk-firmware
- ghost-esp
---

## Overview

Kali Zero Firmware (KZFW) is a community-driven firmware distribution for the Flipper Zero, primarily focused on providing a comprehensive French translation and feature-rich extension of the Xtreme Firmware. It aims to make the Flipper Zero more accessible to French-speaking users while introducing several powerful modules that expand the device's capabilities in customization, gamification, and security research.

## Key Features

### Kali Zero Settings
At the heart of the firmware is a dedicated configuration application. This tool allows users to customize almost every aspect of the Flipper Zero interface, from desktop animations and main menu layouts to lock screen styles. It also serves as the control center for hardware-specific features, such as managing the RGB backlight and configuring device-specific identifiers.

### Enhanced Asset Pack System
KZFW introduces a sophisticated system for managing visual assets. Unlike the standard firmware where icons and animations are often static, KZFW allows users to create and browse "Asset Packs" directly from the SD card. By organizing files into specific folders (`SD/asset_packs/PackName/Anims` or `Icons`), users can swap themes and animations on the fly without needing to recompile or reflash the device.

### Advanced Bad Keyboard (BadKB)
One of the most significant technical additions is the enhanced Bad Keyboard application. While standard BadUSB functionality is limited to wired connections, KZFW enables Bluetooth-based HID attacks. A key feature of this implementation is the ability to spoof the device's MAC address and Bluetooth Name. This allows the Flipper Zero to masquerade as common consumer electronics, such as a JBL speaker or a Razer wireless keyboard, facilitating more discreet payload delivery.

### Expanded Leveling System
The firmware replaces the basic 3-level progression system found in the official firmware with a much deeper 30-level system. This progression is tied directly to the animation engine; as the user gains XP and levels up, new animations are unlocked. The "Level Minimum" variable in the manifest files determines which animations are visible, providing a gamified incentive to use the device's various functions.

## Technical Implementation

KZFW is built upon the Furi abstraction layer, which runs on top of **FreeRTOS**. It targets the STM32WB55 microcontroller, utilizing its dual-core architecture to handle both the main application logic and the wireless (Bluetooth/Sub-GHz) stacks. 

The build system uses `fbt` (Flipper Build Tool), which is based on SCons. This allows for modular compilation of applications (FAPs) and the core firmware. The project also utilizes **nanopb** for efficient protocol buffer serialization and **littlefs** for robust flash memory management.

## Getting Started

Installation can be performed using the qFlipper tool with the provided `.tgz` packages or manually via the SD card using the `.zip` archive. For developers, the firmware supports a full compilation environment using the `./fbt` script, allowing for the creation of custom packages or the direct launching of specific applications over USB.
