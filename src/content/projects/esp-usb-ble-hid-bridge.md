---
title: ESP USB BLE HID Bridge
summary: A firmware project for ESP32-S3 that acts as a USB-to-BLE HID bridge, allowing
  Bluetooth controllers like the Xbox Wireless Controller to be used with the Nintendo
  Switch. It utilizes ESP-IDF, FreeRTOS, and the TinyUSB stack to emulate a Nintendo
  Switch Pro Controller over USB while acting as a BLE GATT client.
slug: esp-usb-ble-hid-bridge
codeUrl: https://github.com/finger563/esp-usb-ble-hid
star: 11
version: v2.1.0
lastUpdated: '2025-10-31'
rtos: freertos
libraries:
- h2zero-esp-nimble-cpp
- littlefs
- lvgl
topics:
- ble
- ble-hid
- esp32
- nintendo-hacking
- nintendo-switch
- switch-pro-controller
- usb
- usb-hid
- xbox
- xbox-controller
isShow: true
image: /202601/esp-usb-ble-hid.webp
createdAt: '2026-01-22'
updatedAt: '2026-01-22'
relatedProjects:
- esp32-s3-usb-to-ble-keyboard-bridge
- usb-keyboard-and-mouse-bluetooth-adapter-esp32
- ds5-bridge
- m5-keyboard-and-mouse-emulator
- esp32-nimble-hid-client
- picogamepadconverter
---

## Overview

The ESP USB BLE HID project provides a sophisticated solution for using modern Bluetooth Low Energy (BLE) gamepads with consoles that typically require wired or proprietary wireless connections. Specifically designed for the Nintendo Switch, this project allows an ESP32-S3 microcontroller to act as a bridge: it connects to a wireless controller (like an Xbox Wireless Controller) via BLE and presents itself to the Switch as a wired Pro Controller via USB.

This bridge is particularly useful for players who prefer the ergonomics of specific third-party controllers but want to maintain the low latency and compatibility of a wired connection on the Switch. The project is optimized for compact hardware like the LilyGo T-Dongle S3 or the Adafruit QtPy ESP32-S3, making it a portable, plug-and-play dongle solution.

## Key Features

- **Wireless to Wired Translation**: Seamlessly converts BLE HID reports from gamepads into USB HID reports compatible with the Nintendo Switch Pro Controller protocol.
- **Multi-Device Memory**: The system can store up to five paired devices, automatically attempting to reconnect to the last known controller upon power-up.
- **Visual Feedback**: Supports LED status indicators and integrated displays (on supported hardware like the T-Dongle S3) to show pairing status and connection states.
- **Pairing Management**: Includes a dedicated pairing mode triggered by a physical button press, allowing users to easily bond new controllers without reflashing firmware.
- **Broad Hardware Support**: Configurable via ESP-IDF's menuconfig to target different ESP32-S3 development boards.

## Technical Implementation

The project is built on the ESP-IDF framework and leverages several powerful components to handle the complex timing requirements of HID bridging. At its core, it uses **FreeRTOS** to manage concurrent tasks for the Bluetooth stack, USB stack, and input translation logic.

### Bluetooth Stack
The project utilizes the **NimBLE** stack (via `esp-nimble-cpp`) to act as a GATT Client. It scans for devices exposing the HID Service, handles the bonding/pairing process, and subscribes to input reports. This choice of stack provides a more memory-efficient alternative to the standard Bluedroid stack, which is critical when running alongside a USB stack.

### USB Emulation
On the host side, the project uses the **TinyUSB** stack to emulate a Nintendo Switch Pro Controller. This involves implementing specific USB descriptors and handling subcommands required by the Switch to recognize the device as a valid "wired" controller. The translation logic maps Xbox-style button layouts and analog stick values to the format expected by the Switch Pro Controller protocol.

### Storage and Configuration
User pairings and system settings are persisted using **NVS** (Non-Volatile Storage) and a **LittleFS** partition. This ensures that once a controller is paired, the dongle remains functional across power cycles without user intervention.

## Getting Started

To use the project, users must enable the "Support Wired Pro Controller" setting in the Nintendo Switch system menu. Once the firmware is flashed to an ESP32-S3 device, the operation is straightforward:

1. **Pairing**: Press and hold the device button until the LED pulses blue to enter pairing mode. Put your BLE controller into pairing mode, and the dongle will automatically bond.
2. **Reconnection**: On subsequent uses, simply plug the dongle into the Switch dock. It will scan for and connect to the previously paired controller.
3. **Usage**: Once the LED indicates a solid connection, the controller functions as a standard Pro Controller.

Because the Nintendo Switch cuts power to its USB-C port during sleep (unless a USB-to-Ethernet adapter is present), the dongle cannot currently wake the console from sleep, but it provides a robust connection once the system is active.
