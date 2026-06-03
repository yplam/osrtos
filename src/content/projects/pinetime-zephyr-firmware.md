---
title: PineTime Zephyr Firmware
summary: A Zephyr RTOS-based firmware for the PineTime smartwatch featuring LVGL 8.2.0.
  It provides a Pebble-inspired API and supports advanced features like Apple Media
  and Notification Services (AMS/ANCS).
slug: pinetime-zephyr-firmware
codeUrl: https://github.com/ck-telecom/pinetime
star: 12
version: v0.1.0
lastUpdated: '2022-07-10'
rtos: zephyr
libraries:
- littlefs
- lvgl
topics:
- ble
- iot
- lvgl
- nrf52832
- pinetime
- zephyr
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- hypnos
- infinitime
- zephyrwatch
- bosmoment-pinetime-firmware-applications
- pinetime-rs
- twatch-v3-firmware-for-esp32
---

## Overview

This project provides a modern, Zephyr-based firmware for the PineTime smartwatch. Originally succeeding the Hypnos project, it serves as a comprehensive home for developers looking to build wearable applications on the PineTime hardware using the Zephyr RTOS ecosystem. The project is built on Zephyr version 3.0.0 and utilizes LVGL 8.2.0 for its graphical user interface.

## Hardware and Software Foundation

The firmware is specifically optimized for the PineTime's hardware, which features 512KB of flash memory. By leveraging the Zephyr RTOS, the project benefits from a robust hardware abstraction layer and a modular build system. The user interface is powered by LVGL, enabling smooth animations and a sophisticated touch-based experience on the watch's display.

One of the most unique aspects of this project is its inspiration from RebbleOS. The developers aim to provide an API that is closely aligned with the Pebble API, making it easier for developers familiar with the Pebble ecosystem to create apps. This includes planned or implemented support for AppMessage, AppWorker, Event Services, and Timers.

## Key Features and Capabilities

The firmware includes several high-level features that enhance the smartwatch experience, particularly for users within the Apple ecosystem:

- **Apple Media Service (AMS) Client**: Allows the watch to control media playback on connected iOS devices.
- **Apple Notification Service (ANCS) Client**: Enables the watch to receive and display notifications from an iPhone.
- **Time Synchronization**: Support for Current Time Service (CTS) and Alert Notification Service (ANS).
- **Built-in Applications**: Includes core apps such as a Clock, Passkey management, and a Music controller.
- **Haptic Feedback**: Integrated vibration support for notifications and alerts.

## Technical Implementation

The project uses the Zephyr `west` tool for workspace management. The `west.yml` manifest defines dependencies on several key modules, including:
- **hal_nordic**: For interfacing with the nRF52 series SoC.
- **littlefs**: For robust file system management on the internal flash.
- **tinycrypt**: For cryptographic operations.
- **LVGL**: For the graphics stack.

## Development and Build Process

Developers can initialize the environment using the standard Zephyr workflow. The project targets the `pinetime_devkit0` board definition. The build system is managed via CMake and Kconfig, allowing for granular control over which features and drivers are included in the final binary. 

```bash
# Build the application
west build -p auto -b pinetime_devkit0 app

# Flash to the device
west flash
```

With its focus on Pebble-like API compatibility and modern RTOS features, this project provides a powerful platform for the PineTime community to develop custom watchfaces and applications.
