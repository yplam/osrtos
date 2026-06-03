---
title: ESP32-S3 USB to BLE Keyboard Bridge
summary: This project transforms standard USB keyboards into wireless Bluetooth Low
  Energy (BLE) devices using the ESP32-S3's native USB-OTG hardware. It features multi-device
  switching for up to three paired hosts and utilizes the NimBLE stack for low-latency
  HID report forwarding.
slug: esp32-s3-usb-to-ble-keyboard-bridge
codeUrl: https://github.com/KoStard/ESP32S3-USB-Keyboard-To-BLE
star: 30
lastUpdated: '2026-01-05'
rtos: freertos
libraries:
- nimble
isShow: true
image: /202601/esp32s3-usb-keyboard-ble.webp
createdAt: '2026-01-06'
updatedAt: '2026-01-06'
relatedProjects:
- usb-keyboard-and-mouse-bluetooth-adapter-esp32
- esp-usb-ble-hid-bridge
- dshare-hid
- m5-keyboard-and-mouse-emulator
- nimble-hid-keyboard-and-mouse-example-for-esp32
- esp32-morse-keyer
---

## Overview

The ESP32-S3 USB to BLE Keyboard Bridge is a firmware solution designed to modernize wired peripherals. By leveraging the native USB-OTG (On-The-Go) capabilities of the ESP32-S3 microcontroller, this project allows users to plug a standard USB keyboard into the ESP32-S3 and have it function as a wireless Bluetooth keyboard. This bridge is compatible with a wide range of operating systems, including Windows, macOS, Linux, iOS, Android, and even Smart TVs.

## Key Features

One of the standout features of this project is its support for **Multi-Device Switching**. Users can pair the bridge with up to three different devices (such as a desktop, a laptop, and a tablet) and switch between them instantly using a keyboard shortcut (Scroll Lock + 1, 2, or 3). The active slot is saved to the ESP32's non-volatile storage, ensuring the connection is restored even after a reboot. 

Technical highlights include:
- **Native USB Host**: Unlike software-emulated solutions, this project uses the ESP32-S3's hardware USB-OTG peripheral for robust HID communication.
- **Low Latency**: Direct HID report forwarding ensures that keystrokes are transmitted to the host device with minimal delay.
- **Visual Feedback**: The system uses an onboard LED (GPIO 2) to blink the current device slot index, providing clear status indication.

## Technical Implementation

The project is built on the **Arduino framework** using **PlatformIO**. It integrates several key libraries to handle the complex task of bridging two different communication protocols:
- **ESP32_USB_Host_HID**: An Arduino port of the ESP-IDF USB Host HID driver, which manages the communication with the physical USB keyboard.
- **NimBLE-Arduino**: A lean Bluetooth stack that consumes significantly less memory than the standard ESP32 BLE stack, allowing for more efficient operation.
- **ESP32-BLE-Combo**: A library that facilitates the creation of BLE HID devices.

The firmware is configured to run on the `esp32-s3-devkitc-1` board by default, utilizing a specific partition scheme (`huge_app.csv`) to accommodate the BLE stack and USB host logic.

## Hardware Considerations

A critical aspect of using the ESP32-S3 as a USB host is power management. Most ESP32-S3 development boards do not automatically output 5V on their USB-C ports. To address this, the project documentation suggests several solutions:
- Using a powered USB hub between the ESP32 and the keyboard.
- Utilizing specialized boards like the **ESP32-S3-USB-OTG**, which includes a dedicated USB-A host port with proper power routing.
- Modifying standard dev kits to bridge 5V to the VBUS line.

## Getting Started

To deploy the bridge, users can clone the repository and build the project using PlatformIO. Configuration options, such as the device name and manufacturer string, are easily accessible in `src/Config.h`. Once flashed, the ESP32-S3 acts as a transparent bridge, requiring no special drivers on the host PC or mobile device.
