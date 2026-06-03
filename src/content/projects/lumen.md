---
title: Lumen
summary: Lumen is an open-source desktop hardware node based on the ESP32-C3 and FreeRTOS.
  It functions as a programmable interaction device similar to a Stream Deck, featuring
  a 240x240 display, rotary encoder, and integrated sensors for system monitoring
  and game state feedback.
slug: lumen
codeUrl: https://github.com/robcholz/Lumen
siteUrl: https://www.robcholz.com/2025/11/16/vision-ui/
star: 49
version: v1.2.1
lastUpdated: '2025-12-31'
rtos: freertos
libraries:
- u8g2
topics:
- cpp
- desktop
- embedded-systems
- esp-idf
- esp32c3
- finn-sheng
- freertos
- hardware
- iot
- lumen
- opensource-hardware
- robcholz
- rust
- ui
- usb-c
- vision-ui
isShow: false
createdAt: '2026-01-27'
updatedAt: '2026-01-27'
relatedProjects:
- bitclock
- deck
- tinycore-esp32-s3-learning-platform
- bbmonitor
- xiao-debug-mate
- project-aura
---

Lumen is a desktop-grade hardware interaction node designed to bring computer states, game data, and system information into the physical world. Positioned as a fully open-source and programmable alternative to devices like the Stream Deck, Lumen allows developers to create custom firmware that reacts to software events with physical feedback through its display, lights, and motion.

## Hardware Architecture

The project is built around the ESP32-C3 SoC, providing a compact yet capable core for handling both wireless connectivity and peripheral management. The hardware suite includes:

- **Display**: A 240x240 high-resolution screen for UI and status feedback.
- **Interaction**: A rotary encoder for navigation and a power switch.
- **Sensors**: An INA226 for high-precision power monitoring and an LSM6DSO 6-axis IMU for motion sensing.
- **Feedback**: An integrated buzzer for audible alerts.

## Software and Firmware Design

Lumen's firmware is designed with a layered driver structure to facilitate rapid development and reliable CI builds. It utilizes FreeRTOS as the underlying real-time operating system, ensuring stable task scheduling for concurrent operations like sensor polling and UI rendering. 

One of the most unique aspects of Lumen is its hybrid language approach. While much of the low-level hardware interaction uses C/C++, the project incorporates a Rust no-std integration layer for system logic. This provides the safety benefits of Rust without the overhead of a full standard library, ensuring the system remains lightweight.

For the visual experience, Lumen integrates the u8g2 graphics library and a custom UI framework called Vision-UI. This UI system is designed to be independent of the top-level logic, meaning changes to the interaction design do not interfere with the core functionality of the device.

## Versatile Use Cases

Lumen is intended to be a general-purpose hardware base rather than a single-function tool. Users have successfully built various applications, including:

- **Game Integration**: A physical Minecraft status display that reacts to in-game events with light and sound.
- **System Monitoring**: A desktop notifier for CPU usage, build status, or deployment errors.
- **Power Analysis**: A dedicated USB-C power monitor utilizing the onboard INA226 sensor.
- **Productivity**: Programmable macros and interaction shortcuts for professional software.

## Design Philosophy

The project prioritizes "long-term desktop use" over simple debugging convenience. The UI is designed to be fully functional without requiring a serial connection to a PC, ensuring the device retains its value as a standalone gadget. Furthermore, the project emphasizes reproducibility; all builds are automated via CI pipelines to eliminate dependencies on specific local development environments, making it accessible for users to flash and customize their own hardware in minutes.
