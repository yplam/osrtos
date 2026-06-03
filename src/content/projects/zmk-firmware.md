---
title: ZMK Firmware
summary: An open-source keyboard firmware built on the Zephyr Real Time Operating
  System. It provides a modern, wireless-first platform for mechanical keyboards,
  supporting Bluetooth Low Energy, split configurations, and extensive customization
  through a modular system of shields and behaviors.
slug: zmk-firmware
codeUrl: https://github.com/zmkfirmware/zmk
siteUrl: https://zmk.dev/
star: 3759
version: v0.3.0
lastUpdated: '2026-01-02'
rtos: zephyr
libraries:
- lvgl
- nanopb
topics:
- bluetooth
- hacktoberfest
- keyboard
- keyboard-firmware
- mechanical-keyboard
- wireless
- zephyr
- zmk
isShow: true
image: /202601/zmk.webp
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- aw-1-keyboard
- kmk-firmware
- zmk-tri-state-behavior
- highboy-firmware
- ruuvitag-firmware-for-zephyr-os
- m5-keyboard-and-mouse-emulator
---

## Overview

ZMK Firmware is a powerful, open-source keyboard firmware designed for modern mechanical keyboards. Built on the Zephyr™ Real Time Operating System (RTOS), ZMK aims to provide a wireless-first, feature-rich, and permissively licensed alternative to traditional keyboard firmwares. By leveraging Zephyr's sophisticated power management and hardware abstraction layers, ZMK offers exceptional battery life and broad hardware compatibility across various microcontroller architectures.

## Key Features

One of the defining characteristics of ZMK is its focus on wireless connectivity. It provides native support for Bluetooth Low Energy (BLE), allowing for multi-profile connectivity where users can switch between different paired devices seamlessly. This makes it a popular choice for custom split keyboards and portable builds where wires are a hindrance.

**Core capabilities include:**
- **Wireless-First Design**: Optimized for BLE with multi-device pairing and efficient power consumption.
- **Split Keyboard Support**: Handles both wireless split configurations (halves communicating over BLE) and wired split configurations (using UART or other protocols).
- **Modular Configuration**: Uses a system of "shields" to define keyboard layouts and "boards" to define the underlying microcontroller hardware.
- **Advanced Behaviors**: Includes support for macros, layers, sticky keys (oneshot modifiers), tap-dance, and mod-tap.
- **Display Integration**: Utilizes the LVGL (Light and Versatile Graphics Library) to drive displays for battery, connection, and layer status.

## Technical Implementation

The firmware architecture is highly modular, utilizing Zephyr's Device Tree (DTS) syntax for hardware configuration. This allows for a clean separation between the keyboard's physical layout and the microcontroller's pin definitions. ZMK supports a wide array of popular microcontrollers, including the Nordic Semiconductor nRF52 series and the Raspberry Pi RP2040.

For keyboards with visual interfaces, ZMK integrates with LVGL to provide real-time feedback. It also uses Nanopb for efficient data encoding, particularly useful in communication between split halves or with configuration tools. The firmware manages the synchronization of state between halves in split setups, ensuring a cohesive typing experience regardless of the physical connection.

## Customization and Community

ZMK introduces a flexible system of "behaviors" that handle key events. These are configured in the user's keymap file, providing a structured way to define complex logic without modifying the core firmware source code. Recent updates have also introduced "ZMK Studio," a tool aimed at making keymap customization more accessible to users who prefer a graphical interface over editing configuration files.

As an open-source project under the MIT license, ZMK has fostered a vibrant community. Development is active, with frequent updates adding support for new hardware, improving power efficiency, and expanding the library of available behaviors. The project maintains extensive documentation and an active community server to assist builders and developers in creating their ideal keyboard experience.
