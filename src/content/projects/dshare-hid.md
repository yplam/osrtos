---
title: DShare-HID
summary: DShare-HID is a high-performance utility that enables sharing keyboard and
  mouse inputs with mobile devices using an ESP32-C3 Supermini as a hardware bridge.
  It converts desktop input events into Bluetooth Low Energy (BLE) HID signals, allowing
  seamless control of iOS and Android devices without additional software on the target.
  The project is a derivative of Deskflow and supports Windows, macOS, and Linux hosts.
slug: dshare-hid
codeUrl: https://github.com/lockekk/dshare-hid
star: 110
version: v1.25.0
lastUpdated: '2026-02-03'
rtos: ''
topics:
- bluetooth
- bluetooth-low-energy
- deskflow
- esp32
- hid
- kvm
isShow: true
image: /202602/esp32-c3-supermini.webp
createdAt: '2026-02-05'
updatedAt: '2026-02-05'
relatedProjects:
- usb-keyboard-and-mouse-bluetooth-adapter-esp32
- esp32-s3-usb-to-ble-keyboard-bridge
- m5-keyboard-and-mouse-emulator
- nimble-hid-keyboard-and-mouse-example-for-esp32
- esp-usb-ble-hid-bridge
- ds5-bridge
---

## Overview

DShare-HID is an innovative open-source project designed to solve a common productivity bottleneck: the inability to share physical peripherals with mobile devices. While traditional software KVM (Keyboard, Video, Mouse) solutions like Deskflow work seamlessly between desktop computers, mobile operating systems such as iOS and Android impose strict security restrictions that prevent background applications from simulating system-wide input events. 

DShare-HID overcomes this limitation by introducing a hardware bridge. By utilizing an affordable ESP32-C3 Supermini development board, the project translates desktop input events into standard Bluetooth Low Energy (BLE) HID signals. To the mobile device, the bridge appears as a native Bluetooth keyboard or mouse, requiring no special apps or drivers on the target device.

## The Hardware Bridge Solution

The core of the DShare-HID ecosystem is the **ESP32-C3 Supermini**. This budget-friendly microcontroller acts as the physical intermediary between your computer and your mobile device. The desktop application captures your mouse and keyboard movements and sends them to the ESP32-C3 via USB. The board then broadcasts these movements over BLE.

This architecture provides several advantages:
- **Native Experience**: Since the mobile device sees a standard Bluetooth peripheral, it supports native system features like iPadOS's cursor and Android's hardware keyboard settings.
- **Ultra-Low Latency**: Direct BLE communication ensures a highly responsive experience compared to network-based remote desktop solutions.
- **Universal Compatibility**: It works with any device that supports Bluetooth HID, including iPhones, iPads, and Android smartphones.

## Key Features

- **Cross-Platform Host Support**: The desktop client is compatible with Windows, macOS (Intel and Apple Silicon), and Linux.
- **Multi-Device Pairing**: The system can securely pair with and toggle between up to six different mobile devices, allowing for a sophisticated multi-screen setup.
- **Consumer Key Support**: Beyond standard typing, the project supports media keys, including Play/Pause, Volume control, and Mute.
- **Deskflow Integration**: Built upon the Deskflow (formerly Barrier/Synergy) architecture, it maintains compatibility with official upstream clients.

## Getting Started

To use DShare-HID, users must first prepare the hardware bridge. The desktop application includes a built-in firmware management interface accessible via `File -> Firmware`. 

### Hardware Setup
1. Connect an ESP32-C3 Supermini to your computer via USB.
2. Use the **Factory Mode** tab in the DShare-HID app to flash the initial factory firmware.
3. For full functionality, users can request a per-device application firmware which enables specific licensing and OTA (Over-The-Air) update capabilities.

### Permissions
On macOS, the application requires **Accessibility** access to intercept input events. On Linux, users must ensure their account is part of the `dialout` group to communicate with the USB serial port:

```bash
sudo usermod -a -G dialout $USER
```

## Technical Implementation

The project is written in C++ and utilizes the Qt framework for its graphical user interface. It leverages modern system APIs such as `libei` and `libportal` on Linux for input emulation and portal management. The build system is managed via CMake, ensuring a consistent development environment across different operating systems. While the desktop application is fully open-source under the GPL-2.0 license, the project also provides a streamlined path for firmware updates and device activation to ensure long-term maintenance and support.
