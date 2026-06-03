---
title: MicroPython Human Interface Device Library
summary: A library for MicroPython that implements Human Interface Device (HID) functionality
  over Bluetooth Low Energy (BLE). It provides ready-to-use classes for Keyboards,
  Mice, and Joysticks, specifically optimized for ESP32 microcontrollers.
slug: micropython-human-interface-device-library
codeUrl: https://github.com/Heerkog/MicroPythonBLEHID
siteUrl: https://hgroefsema.nl
star: 314
version: v2.1
lastUpdated: '2025-10-06'
rtos: ''
libraries:
- micropython
topics:
- hid
- joystick
- keyboard
- library
- micropython
- mouse
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- nimble-hid-keyboard-and-mouse-example-for-esp32
- hijelhid-blekeyboard
- esp32-nimble-hid-client
- micropython-library-for-the-cheap-yellow-display-cyd
- uble-lightweight-bluetooth-low-energy-driver-for-micropython
- semito-v-micropython-compatibility-layer-mcl
---

## Overview

The MicroPython Human Interface Device (HID) library is a specialized toolset designed to enable Bluetooth Low Energy (BLE) HID capabilities on microcontrollers running MicroPython. By leveraging the BLE GATT (Generic Attribute Profile), this library allows an ESP32 or similar hardware to act as a peripheral device—such as a keyboard, mouse, or joystick—that can interact with central devices like PCs, tablets, or smartphones.

While MicroPython provides low-level Bluetooth access, implementing the specific descriptors and report maps required for HID can be complex. This project abstracts that complexity into a set of clean, well-documented Python classes, making it accessible for developers to create custom input hardware or automation tools.

## Supported HID Profiles

The library comes with built-in support for the three most common HID device types:

*   **Keyboard**: Implements standard keystroke reporting, including support for modifiers (Shift, Ctrl, Alt, GUI) and multiple simultaneous key presses.
*   **Mouse**: Provides a standard three-button mouse implementation with a vertical scroll wheel and X/Y axis movement.
*   **Joystick**: Offers a joystick profile with two axes and eight buttons, suitable for game controllers or custom industrial interfaces.

One of the project's strengths is its focus on extensibility. It is not designed to cover every niche HID configuration out of the box; instead, it provides a robust base class (`HumanInterfaceDevice`) that developers can extend. For instance, if a project requires a gaming mouse with eight buttons and horizontal scrolling, the existing `Mouse` class can be easily subclassed and its HID report descriptor overwritten.

## Technical Architecture

The library is structured around a hierarchical class system. The `HumanInterfaceDevice` superclass manages the core BLE operations, including the Device Information Service (DIS), Battery Service (BAS), and the initial advertisement logic. Subclasses like `Keyboard` or `Mouse` then layer the specific HID Service (HIDS) and report maps on top of this foundation.

Key components include:
*   **hid_services.py**: The core logic containing the GATT service definitions and HID report logic.
*   **hid_keystores.py**: Manages security keys for Bluetooth bonding. It includes a `JSONKeyStore` for standard file-based storage and an `NVSKeyStore` for utilizing the ESP32's Non-Volatile Storage, which is more resilient for power-cycling scenarios.
*   **Advertiser**: An internal utility that handles the generation of advertising payloads, ensuring the device is correctly identified by the central host during the discovery phase.

## Requirements and Compatibility

To use this library, the hardware must support BLE and have sufficient resources to run the MicroPython Bluetooth stack. The primary target is the **ESP32** chip, specifically requiring:
*   Integrated Bluetooth support.
*   At least 512 kB of SRAM.
*   MicroPython firmware version 1.18 or higher.

The library has been extensively tested using the TinyPICO development board acting as the peripheral and Windows 10 as the central host.

## Security and Bonding

Modern operating systems often require secure connections for HID devices to prevent keystroke injection or sniffing. This library supports Bluetooth bonding and LE Secure connections by default. For devices that need to remember their paired hosts across reboots, the library provides mechanisms to save and load "secrets" (security keys). If a device fails to reconnect after a power cycle, the library allows users to switch to an NVS-based keystore:

```python
from hid_keystores import NVSKeyStore

ks = NVSKeyStore()
self.keyboard.set_keystore(ks)
```

## Getting Started

The repository includes both simple and asynchronous examples for all supported device types. For developers looking to integrate these features into complex projects, the `async` examples demonstrate how to handle HID events without blocking the main execution loop, which is critical for responsive embedded applications.
