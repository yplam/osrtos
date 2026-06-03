---
title: NimBLE HID Keyboard and Mouse Example for ESP32
summary: A Bluetooth Low Energy (BLE) HID keyboard and mouse implementation for the
  ESP32 using the Apache Mynewt NimBLE stack. It demonstrates GATT server creation,
  HID report mapping, and GPIO button integration for sending keyboard scan codes
  and mouse movements.
slug: nimble-hid-keyboard-and-mouse-example-for-esp32
codeUrl: https://github.com/olegos76/nimble_kbdhid_example
star: 42
lastUpdated: '2020-10-16'
rtos: freertos
libraries:
- nimble
topics:
- ble
- ble-peripherals
- esp-idf
- esp32
- hid
- hid-keyboard
- nimble
isShow: false
createdAt: '2026-01-01'
updatedAt: '2026-01-04'
relatedProjects:
- esp32-nimble-hid-client
- usb-keyboard-and-mouse-bluetooth-adapter-esp32
- m5-keyboard-and-mouse-emulator
- micropython-human-interface-device-library
- hijelhid-blekeyboard
- esp32-s3-usb-to-ble-keyboard-bridge
---

## Overview

This project provides a comprehensive example of implementing a Bluetooth Low Energy (BLE) Human Interface Device (HID) on the ESP32 platform. Specifically, it demonstrates how to create a combined keyboard and mouse peripheral using the Apache Mynewt NimBLE stack instead of the traditional Bluedroid stack. The project is built on the ESP-IDF framework and is inspired by both the NimBLE peripheral examples and the Bluedroid HID device demos.

The application creates a GATT server and initiates BLE advertising. Once connected to a GATT client (such as a computer or smartphone), it can send keyboard scan codes and mouse data (clicks and movements) triggered by physical GPIO buttons. Additionally, it handles downstream events, such as toggling an LED when the GATT client sends a "CAPSLOCK on" notification.

## Why NimBLE on ESP32?

One of the primary motivations for this project is to showcase the advantages of using the NimBLE stack over the older Bluedroid stack on ESP32 hardware. The developer highlights several key benefits:

- **Reduced Binary Size**: The NimBLE-based implementation is significantly smaller. In comparisons using ESP-IDF v4.1, the NimBLE HID example resulted in a binary roughly 1.47 to 1.7 times smaller than the equivalent Bluedroid demo.
- **Faster Boot Times**: NimBLE demonstrates faster initialization. In testing, the NimBLE stack started advertising approximately 1.75 times faster than Bluedroid (1087ms vs 1915ms after boot).
- **Simplified Configuration**: The project suggests that describing BLE services and characteristics is more intuitive and convenient within the NimBLE framework.

## Technical Implementation

The project leverages the ESP32's Bluetooth controller and the NimBLE host. It adheres to several industry specifications, including the Bluetooth Core Specification v5.2, the HID Service Specification, and the HID Over GATT Profile (HOGP). 

Key technical components include:
- **GATT Server**: Manages the HID service, Device Information Service (DIS), and Battery Service.
- **Report Map**: Defines how the HID data is structured for the host operating system, allowing the device to be recognized as both a keyboard and a mouse.
- **GPIO Integration**: Maps physical pins to HID actions. For example, buttons can be configured to send specific keyboard scan codes or mouse displacements.
- **Security**: Supports various bonding methods, including "DISPLAY ONLY" I/O capabilities for secure pairing with a passkey.

## Getting Started

The project is compatible with ESP-IDF v4.1 and v3.3.4. Configuration is handled through the standard ESP-IDF `menuconfig` utility, where users can define parameters such as the device name, I/O capabilities for bonding, and the specific GPIO pin used for the CAPSLOCK LED indicator.

To build and flash the project, standard ESP-IDF commands are used:

```bash
# Configure the project
idf.py menuconfig

# Build, flash, and monitor
idf.py build flash monitor
```

Developers looking to customize the behavior can dive into the source code to modify the GPIO button mappings or extend the HID report descriptors to support additional multimedia keys or specialized input types. The project serves as an excellent starting point for developers looking to build lightweight, responsive BLE peripherals on ESP32 hardware.
