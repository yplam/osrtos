---
title: X-TRACK Open Source GPS Bicycle Computer
summary: An open-source GPS bicycle computer featuring offline maps, real-time track
  recording, and GPX export. It is built on the high-performance AT32F435 microcontroller
  and utilizes the LVGL V8 library for a sophisticated graphical interface, supported
  by custom page management and data distribution frameworks.
slug: x-track-open-source-gps-bicycle-computer
codeUrl: https://github.com/FASTSHIFT/X-TRACK
star: 6138
version: v2.7
lastUpdated: '2025-11-08'
rtos: ''
libraries:
- lvgl
topics:
- bicycle
- gps
- gps-tracking
- gpx
- lvgl
- mcu
- mvp
- offline-maps
- speedometer
isShow: true
image: /202601/x-track.webp
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- watchx-ii-smart-watch
- gps-tracker
- esp32-offline-osm-maps
- esp32-sdr-gps-receiver
- ubxgpsi2c
- motolink
---

X-TRACK is a high-performance, open-source GPS bicycle computer designed to provide cyclists with professional-grade features in a DIY-friendly package. The project stands out by offering offline map capabilities and real-time trajectory tracking, features typically reserved for high-end commercial cycling computers.

## Hardware Architecture

The system is powered by the Artery AT32F435CGU7 microcontroller, which boasts a high clock frequency of 288MHz, 512KB of RAM, and 1MB of ROM. This processing power is essential for handling the rendering of offline maps and managing real-time GPS data. The visual interface is delivered via a 1.54-inch ST7789 IPS display with a 240x240 resolution, achieving a smooth 60Hz refresh rate.

Key hardware components include:
- **GPS Module**: ATGM336H supporting multiple constellations (BDS, GPS, GLONASS, GALILEO, QZSS, SBAS).
- **Sensors**: LSM6DSM accelerometer for hardware step counting and LIS3MDL magnetometer for heading.
- **Storage**: Micro SD card support (up to 32GB) for map tiles and track logs.
- **Power**: 700mAh Li-ion battery with dedicated power management (LP5907 and MCP73831).

## Software Framework

X-TRACK utilizes a modern software stack centered around LVGL V8 for its graphical user interface. To manage the complexity of a multi-page navigation system, the project introduces two custom frameworks:

1.  **PageManager**: A dedicated "Page Lifecycle Management" system that handles transitions, initialization, and resource cleanup for different UI screens.
2.  **DataCenter**: A "Message Subscription and Publishing Framework" that decouples data providers (like the GPS or sensors) from data consumers (the UI pages), ensuring a clean and maintainable codebase.

## Key Features

Beyond basic speed and distance tracking, X-TRACK provides a comprehensive suite of cycling tools:
- **Offline Maps**: Supports displaying real-time position on pre-loaded map tiles with zoom functionality.
- **Track Management**: Records movement trajectories and exports them in the standard GPX format for use in external analysis tools like GPXSee.
- **Data Persistence**: Automatically saves user data in JSON format upon power-down.
- **RTC Synchronization**: Automatically calibrates the internal real-time clock using GPS time signals.
- **Simulation Support**: Includes a PC-based simulator (Release x86) allowing developers to debug UI and logic without needing the physical hardware.

## Development and Customization

The project is highly modular, with the enclosure designed for 3D printing (SLA/Light Curing). For developers, the inclusion of a Visual Studio-based simulator significantly lowers the barrier to entry for UI customization. The repository provides detailed documentation on troubleshooting and map downloading, supported by a community of contributors who have provided tools for image conversion and map tile generation.
