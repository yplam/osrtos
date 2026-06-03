---
title: 'WT32-SqLn: WT32-SC01 Plus with SquareLine Studio and LVGL'
summary: A comprehensive starter project and documentation for the Wireless Tag WT32-SC01
  Plus board using ESP-IDF, LVGL, and SquareLine Studio. It provides detailed hardware
  setup guides, custom partition configurations for ESP32-S3, and integrated Over-the-Air
  (OTA) update functionality.
slug: wt32-sqln-wt32-sc01-plus-with-squareline-studio-and-lvgl
codeUrl: https://github.com/janick/WT32-SqLn
siteUrl: https://squareline.io
star: 92
lastUpdated: '2023-09-30'
rtos: freertos
libraries:
- lvgl
- lwip
topics:
- esp32
- esp32-s3
- lvgl
- wrover
- wt32-sc01
- wt32-sc01-plus
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- esp32-lvgl-8-x-sdspi-template
- bsp-for-wireless-tag-wt32-sc01-plus-sc01-esp-idf-5-x-lvgl-9-x
- sc01-plus-hmi-example-with-squareline-studio
- jc2432w328-microcontroller-board-documentation
- esp32-tux
- lvgl-8-on-wt32-sc01-with-arduino
---

## Overview

The WT32-SqLn project serves as a practical guide and template for developers working with Wireless Tag's WT32-SC01 Plus, an ESP32-S3 based HMI board. Born out of the frustration of navigating poorly documented hardware, this repository provides a clear path from initial unboxing to deploying a functional UI using modern embedded tools like LVGL and SquareLine Studio.

The project is built on the ESP-IDF v5.0 framework and utilizes LVGL v8.3.3 for its graphical interface. It addresses common hurdles such as serial communication issues, flashing procedures, and custom hardware interfacing, making it an ideal starting point for building sophisticated touch-screen applications.

## Hardware and Programming

The WT32-SC01 Plus is a powerful under-$30 device featuring an ESP32-S3 SoC and a high-quality display. However, programming it can be tricky due to the lack of dedicated physical buttons on some versions. This project documents three distinct ways to interface with the board:

- **WT Programmer**: Using the official custom programmer that connects to the DEBUG port.
- **USB-C Port**: Utilizing the onboard USB-C port, which requires manually shorting GPIO0 and GND to enter flashing mode if the device is unresponsive.
- **Custom USB-to-Serial**: A DIY approach for users who prefer using their own communication boards.

## UI Development with SquareLine Studio

A significant portion of this project focuses on the integration of SquareLine Studio. It includes custom board definition files that allow developers to design interfaces directly for the WT32-SC01 Plus. The project supports both portrait and landscape orientations, with simple configuration flags in the header files to swap between them.

## Advanced Features

Beyond simple UI rendering, the project implements several advanced system-level features:

### Over-the-Air (OTA) Updates
The application includes a built-in OTA update mechanism. By tapping the project name on the splash screen five times, the device triggers an upgrade process. A companion Python-based HTTPS server script is provided to host the firmware binaries, allowing for wireless updates without needing a physical serial connection.

### Custom Partition Management
To accommodate large UI assets and dual-OTA banks, the project uses a custom partition table. It configures the ESP32-S3 with two 4032KB app partitions, maximizing the available 8MB flash for application code and resources while maintaining safety through redundancy.

```text
# ESP-IDF Partition Table
nvs,      data, nvs,     0x9000,   16K,
otadata,  data, ota,     0xd000,   8K,
phy_init, data, phy,     0xf000,   4K,
ota_0,    app,  ota_0,   0x10000,  4032K,
ota_1,    app,  ota_1,   0x400000, 4032K,
```

### Extended I/O
The project documents the 8-pin MX1.25 PicoBlade interface, which exposes six GPIOs (GPIO 10, 11, 12, 13, 14, and 21) for external sensors or peripherals, making the board suitable for IoT gateway or industrial controller applications.

## Getting Started

To build the project, developers need ESP-IDF v5.0.2 and SquareLine Studio. The workflow involves initializing submodules, generating self-signed certificates for the OTA server, and configuring WiFi credentials within a `secrets.h` file. The project is designed to be compiled using the standard `idf.py build` and `idf.py flash` commands.
