---
title: ZephyrWatch
summary: An open-source smartwatch firmware built on the Zephyr RTOS and LVGL graphics
  library. It targets the ESP32-S3-Touch-LCD-1.28 hardware, featuring BLE time synchronization,
  device information services, and a real-time counter for time tracking.
slug: zephyrwatch
codeUrl: https://github.com/electricalgorithm/zephyr-watch
star: 17
version: 0.1.0
lastUpdated: '2025-10-12'
rtos: zephyr
libraries:
- lvgl
topics:
- bluetooth-low-energy
- esp32-s3
- lvgl
- smartwatch
- zephyr-rtos
isShow: true
image: /202603/300px-ESP32-S3-Touch-LCD-1.28.webp
createdAt: '2026-03-22'
updatedAt: '2026-03-22'
---

ZephyrWatch is an open-source smartwatch project designed to bring a modern, modular firmware experience to wearable hardware. Built on the Zephyr Real-Time Operating System (RTOS), it leverages a robust ecosystem of drivers and stacks to create a functional and extensible timepiece. The project specifically targets the Waveshare ESP32-S3-Touch-LCD-1.28, a circular display module that combines a powerful dual-core SoC with a capacitive touch interface.

## Core Features and Capabilities

The firmware provides the essential building blocks of a smartwatch experience, focusing on timekeeping, connectivity, and user interface:

- **Time Synchronization**: Using the Bluetooth Low Energy (BLE) Current Time Service (CTS), the watch can synchronize its internal Real-Time Counter with a connected smartphone or computer.
- **Graphics and UI**: The Light and Versatile Graphics Library (LVGL) is used for all rendering, providing a smooth and responsive interface. The project includes several Montserrat font weights to ensure high-quality typography on the 1.28-inch display.
- **Device Metadata**: It implements the BLE Device Information Service (DIS), allowing host devices to identify the hardware model, manufacturer, and firmware revision.
- **System Reliability**: A hardware watchdog is integrated to handle unexpected software hangs, ensuring the device remains operational in the field.

## Technical Architecture

ZephyrWatch is built using the Zephyr `west` build system and follows a modular architecture. The configuration is managed through Zephyr's Kconfig system, enabling various subsystems such as:

- **Input Subsystem**: Handles touch events from the circular LCD.
- **Settings Subsystem**: Utilizes Non-Volatile Storage (NVS) and the Flash Map to persist user settings and pairing information across reboots.
- **Bluetooth Stack**: Implements a peripheral role with support for Security Manager Protocol (SMP) and privacy features to allow secure pairing with mobile devices.

One of the project's core philosophies is the Single-Responsibility Principle. Developers are encouraged to isolate subsystem logic, making components self-sufficient and testable. For inter-component communication, the project utilizes a specialized "devicetwin" subsystem to share attributes like date and time between different parts of the firmware.

## Hardware Support

The primary target is the ESP32-S3-Touch-LCD-1.28 from Waveshare. This board is a popular choice for DIY wearables due to its integrated ESP32-S3 chip, which provides both Wi-Fi and BLE, and its compact form factor. The project includes specific Devicetree overlays and board configurations to support the display controller and touch interface out of the box.

## Getting Started

To build the project, developers need the Zephyr SDK and the Espressif HAL (obtained via `west blobs fetch`). The build process uses standard Zephyr commands:

```sh
west build -p always . --board esp32s3_touch_lcd_1_28/esp32s3/procpu
west flash
```

For developers looking to contribute or customize the watch, the project maintains a Kanban board and clear contribution guidelines focusing on code quality and responsibility isolation.
