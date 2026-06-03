---
title: Stick Firmware
summary: A MicroPython-based firmware for M5Stack devices including the M5StickC Plus
  2 and Cardputer. It provides a suite of features such as an app launcher, file explorer,
  IMU-based screen rotation, and RTC synchronization.
slug: stick-firmware
codeUrl: https://github.com/stickfirmware/stick
star: 9
version: v2.2.1
lastUpdated: '2026-01-09'
rtos: ''
libraries:
- micropython
topics:
- bruce
- cardputer
- esp32
- firmware
- flipperzero
- hacking
- m5stack
- m5stick
- m5stickc
- micropython
isShow: false
createdAt: '2026-01-28'
updatedAt: '2026-01-28'
relatedProjects:
- m5-crystal
- bruce-firmware
- sha2017-badge-firmware
- unigeek-firmware
- micropython-and-lvgl-firmware-for-esp32
- infiltra-firmware
---

Stick Firmware is an open-source project designed to unlock the potential of small-form-factor ESP32 devices, specifically targeting the M5Stack ecosystem. Described as a "powerful beast" in a small package, this firmware provides a structured environment for running applications on devices like the M5StickC Plus 2 and the M5Stack Cardputer.

Built primarily using MicroPython, the project offers a high-level abstraction that allows for rapid development and customization. It bridges the gap between simple scripts and a full-fledged operating environment, providing users with a graphical interface, file management, and hardware-specific optimizations.

## Core Capabilities and Features

The firmware is packed with features that leverage the specific hardware found in M5Stack devices. One of the standout features is the IMU-based screen auto-rotation, which ensures the display is always oriented correctly based on how the device is held. It also includes a clock system that synchronizes with an I2C Real-Time Clock (RTC), ensuring accurate timekeeping even after reboots.

For productivity and utility, Stick Firmware includes:
- **App Launcher**: Support for both built-in and custom user applications.
- **File Explorer**: A reader and explorer that supports the onboard flash and external SD cards.
- **Multimedia**: A music player designed for devices equipped with speakers, such as the Cardputer.
- **Power Management**: Support for lightsleep modes to extend battery life on portable "stick" devices.

## Hardware Integration

Stick Firmware is tailored to the unique input methods of its supported hardware. On the M5StickC Plus 2, navigation is handled via the three primary buttons (A, B, and C) for confirming, cycling through menus, and canceling actions. On the Cardputer, the firmware maps these functions to the Enter, Tab, and ESC keys, providing a consistent user experience across different form factors.

## Technical Implementation

The project is structured to be modular. The `src` directory contains the core logic, while the `configs` directory allows the firmware to be adapted to different hardware configurations. Because it runs on MicroPython, users can easily modify the source code or add new features without needing a complex C++ toolchain. The repository also includes various tools and translation sources, reflecting a focus on community accessibility.

## Getting Started

To get Stick Firmware running, users first need to install a compatible version of MicroPython on their ESP32 device. This can be done using standard tools like `esptool.py`, Thonny, or the M5Burner utility. Once the MicroPython environment is ready, the files from the `src` directory are copied to the device's filesystem. After a quick reboot, the device initializes into the Stick Firmware interface, ready for use.

The project also places a strong emphasis on internationalization, utilizing the Crowdin platform for community-driven translations. While it currently supports English and Polish, the framework is designed to accommodate more languages as the community contributes. Note that the current font support is limited to English characters, requiring some creative localization for other languages.
