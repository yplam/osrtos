---
title: HighBoy Firmware
summary: A modular firmware platform for the ESP32-S3 SoC built using the ESP-IDF
  framework. It features a structured architecture divided into hardware drivers,
  services, core logic, and applications, utilizing the NimBLE Bluetooth stack for
  wireless connectivity.
slug: highboy-firmware
codeUrl: https://github.com/HighCodeh/TentacleOS
star: 222
lastUpdated: '2025-11-28'
rtos: freertos
libraries:
- nimble
topics:
- badusb
- ble
- bluetooth
- esp-idf
- esp32-c5
- esp32-s3
- espressif
- firmware
- hacking
- highboy
- highcode
- ir
- nfc
- rf
- rfid
- wifi
isShow: true
image: /202601/mao1.webp
createdAt: '2026-01-15'
updatedAt: '2026-01-15'
relatedProjects:
- esp-hack-fw
- pixlpal-m1-firmware
- unigeek-firmware
- esp32-bit-pirate
- poseidon
- m5-crystal
---

## Overview

HighBoy Firmware (formerly known as TentacleOS) is a modular development platform designed specifically for the ESP32-S3 microcontroller. Built on the Espressif IoT Development Framework (ESP-IDF), it provides a structured foundation for building complex embedded applications. The project aims to move beyond simple single-file codebases by implementing a scalable architecture that separates hardware concerns from application logic.

## Modular Architecture

The core strength of HighBoy Firmware lies in its organizational structure. Unlike many basic ESP32 examples that rely on a single `main.c`, this project divides the system into four distinct layers:

*   **Drives**: This layer handles low-level hardware drivers and peripheral interfaces, abstracting the physical hardware from the rest of the system.
*   **Services**: Implements support functionalities and auxiliary logic, such as communication protocols or background tasks.
*   **Core**: Contains the central system logic and main managers that coordinate the flow of data and control.
*   **Applications**: The top-level layer where specific user applications reside, utilizing the underlying modules to perform high-level tasks.

This division facilitates code reuse and makes it significantly easier to scale projects as they grow in complexity.

## Technical Implementation

The project is deeply integrated with the ESP-IDF build system and utilizes the underlying FreeRTOS kernel for task management and synchronization. A key feature of the current configuration is the inclusion of the NimBLE Bluetooth stack, a lightweight and memory-efficient alternative to the standard Bluedroid stack, which is ideal for resource-constrained IoT applications.

The `sdkconfig` reveals a highly optimized environment for the ESP32-S3, including support for dual-core processing, advanced power management, and a wide array of peripheral support including I2C, SPI, RMT, and USB Serial/JTAG. The project is configured to run at 160MHz by default, balancing performance with power efficiency.

## Hardware Support

Currently, the firmware officially supports the **ESP32-S3** target. This chip is particularly well-suited for the project due to its native USB support, AI acceleration capabilities, and extensive GPIO count. The modular nature of the code suggests that while the S3 is the primary focus, the architectural patterns could be adapted for other ESP32 variants in the future.

## Getting Started

HighBoy Firmware is intended to serve as a template or boilerplate for custom ESP32-S3 projects. Because it follows the standard ESP-IDF CMake build system, developers familiar with Espressif's tooling can easily integrate it into their workflow. The project structure is organized as follows:

```bash
├── components
│   ├── Drives
│   ├── Services
│   ├── Core
│   └── Applications
├── main
│   └── main.c
└── CMakeLists.txt
```

As the project is currently in its beta phase, it is subject to frequent updates and improvements. It represents an excellent starting point for developers looking to build professional-grade firmware with a clean, maintainable separation of concerns.
