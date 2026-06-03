---
title: WatchX-II Smart Watch
summary: An open-source smartwatch project based on the AT32F403A microcontroller
  and the LVGL graphics library. It features a 1.54-inch IPS display with a high-speed
  parallel interface, hardware-based pedometer tracking, and support for Arduiboy-compatible
  games.
slug: watchx-ii-smart-watch
codeUrl: https://github.com/FASTSHIFT/WatchX-II
star: 185
lastUpdated: '2021-07-10'
rtos: ''
libraries:
- lvgl
topics:
- lvgl
- smartwatch
- watchx
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- watchx-open-source-smartwatch
- ov-watch
- leta
- opentimewatch-os
- zswatch
- zephyrwatch
---

## Overview

WatchX-II is a redesigned, second-generation open-source smartwatch that combines high-performance embedded hardware with a sophisticated graphical user interface. Developed as a collaboration between FASTSHIFT and Trigger-CN, the project showcases the capabilities of the AT32F403A microcontroller in a wearable form factor. The watch is designed to provide a smooth user experience with a high-refresh-rate display and a variety of built-in applications ranging from productivity tools to gaming.

## Hardware Architecture

The heart of the WatchX-II is the AT32F403ACGU7, a high-performance ARM Cortex-M4 microcontroller running at 240MHz. This provides ample processing power for the LVGL-based UI and real-time sensor processing. 

**Key hardware components include:**
- **Display:** A 1.54-inch ST7789 IPS screen utilizing an 8-bit parallel interface. This configuration allows for a 60Hz refresh rate at 240x240 resolution, significantly smoother than standard SPI-based wearable displays.
- **Storage:** 4GBit (512MB) SD NAND (CSNP4GCR01), providing massive storage for assets, logs, and game data compared to traditional SPI Flash.
- **Sensors:** Includes a LIS2DS12 accelerometer with hardware-level pedometer output and a MAX30102 heart rate sensor.
- **Input:** A combination of an FT6336U capacitive touch screen and a physical side button.
- **Power Management:** A multi-rail system using LP5907 regulators and a TP5100 charging controller for the 3.7V Li-ion battery.

## Software and GUI

The project leverages **LVGL (Light and Versatile Graphics Library) version 7.7.1** to drive its user interface. The UI design, contributed by Trigger-CN, focuses on a modern smartwatch aesthetic with smooth transitions and interactive elements. 

One of the standout software features is the inclusion of a game engine. The WatchX-II supports games based on the Arduiboy platform, alongside a custom-built version of the classic 2048 game. This demonstrates the versatility of the system in handling both standard UI tasks and more intensive logic-driven applications.

## Functional Features

The current firmware implementation includes several core smartwatch functions:
- **Watch Faces:** Customizable time display interfaces.
- **Productivity:** Built-in calculator and stopwatch applications.
- **Fitness Tracking:** Pedometer functionality utilizing the hardware step-counting features of the LIS2DS12.
- **Gaming:** Support for Arduiboy-compatible titles and 2048.
- **System Settings:** On-device configuration for watch parameters.

While the UI for sleep monitoring, heart rate measurement, music control, and sports tracking is implemented, these modules are currently in development as UI-only placeholders, providing a roadmap for future firmware updates. The project remains an active platform for developers interested in wearable technology and high-performance embedded GUI development.
