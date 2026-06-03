---
title: ZSWatch
summary: An open-source smartwatch project built on the Zephyr RTOS and powered by
  the nRF5340 dual-core BLE SoC. It features a high-resolution round touch display,
  a comprehensive suite of Bosch environmental and motion sensors, and seamless smartphone
  integration via Gadgetbridge or iOS.
slug: zswatch
codeUrl: https://github.com/jakkra/ZSWatch
siteUrl: https://zswatch.dev/
star: 34
lastUpdated: '2025-12-06'
rtos: zephyr
libraries:
- lvgl
- mcuboot
- nimble
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- zephyrwatch
- gateway-smartwatch
- ov-watch
- leta
- opentimewatch-os
- watchx-open-source-smartwatch
---

## Overview

ZSWatch (Zephyr Smartwatch) is a sophisticated open-source hardware and software project that demonstrates the power of the Zephyr RTOS in wearable technology. Built from the ground up, ZSWatch combines a custom 4-layer PCB with high-end sensors and a dual-core ARM Cortex-M33 processor to create a fully functional, hackable smartwatch. The project is designed for developers who want a platform that is both powerful enough for modern UI requirements and efficient enough for long-term wearable use.

## Hardware Architecture

The heart of ZSWatch is the u-blox NORA-B10 module, which houses the Nordic nRF5340 SoC. This dual-core chip allows the system to split tasks between a 128 MHz application core and a 64 MHz network core, optimizing power consumption for Bluetooth LE operations. The hardware suite is remarkably dense for its 38mm diameter, featuring:

- **Display**: A 240x240 round IPS TFT LCD with a capacitive touch screen, driven via a high-speed 30 MHz SPI interface.
- **Sensors**: A comprehensive array including the Bosch BMI270 IMU for gesture recognition, the BME688 for AI-driven environmental sensing, the BMP581 for high-precision pressure/altitude tracking, and the LIS2MDL magnetometer for compass functionality.
- **Power Management**: The Nordic nPM1300 PMIC handles system power and battery management, while an RV-8263 RTC ensures accurate timekeeping even when the main processor is in deep sleep.
- **Storage**: 64 MB of external Macronix flash provides ample space for watchfaces, logs, and application data.

## Software and Ecosystem

Running on the Zephyr RTOS, ZSWatch leverages a modular software architecture. The UI is built using the LVGL graphics library, supporting dynamic watchfaces and a custom Application Manager. This manager allows users to toggle between various built-in apps such as music control, compass, and environmental monitors.

One of the project's standout features is its smartphone integration. For Android users, ZSWatch interfaces with the Gadgetbridge app, mimicking existing smartwatch protocols to provide notifications and music control without requiring a proprietary app. For iOS users, the watch communicates directly with the Apple Notification Center Service (ANCS) and Apple Media Service (AMS) over GATT, allowing for native-feeling integration with the iPhone ecosystem.

## Development and Customization

The project is highly accessible to the maker community. The PCB is designed in KiCad, and the casing is optimized for 3D printing or CNC machining. For developers, the ZSWatch Dock provides a specialized charging and programming interface, with options for an onboard SEGGER J-Link OB debugger to facilitate real-time firmware debugging.

ZSWatch also supports a variety of watchfaces, including compatibility with ESP32-based watchfaces from the community. The use of Zephyr's device tree and driver model makes it straightforward for developers to add new sensors or modify the hardware behavior without rewriting the core application logic.
