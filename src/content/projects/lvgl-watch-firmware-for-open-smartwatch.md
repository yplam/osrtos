---
title: LVGL Watch Firmware for Open-Smartwatch
summary: A third-party firmware for the Open-Smartwatch platform based on LVGL 8.0
  and the Arduino framework. It targets the ESP32-PICO-D4 and includes support for
  hardware features like vibration motors and infrared remote control. The project
  is managed via PlatformIO and focuses on providing a modern graphical interface
  for wearable devices.
slug: lvgl-watch-firmware-for-open-smartwatch
codeUrl: https://github.com/lxydiy/lvgl-watch
star: 59
version: 1.3.0
lastUpdated: '2022-01-22'
rtos: freertos
libraries:
- lvgl
topics:
- arduino
- esp32
- lvgl
- open-smart-watch
- platformio
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- twatch-v3-firmware-for-esp32
- lunokiotwatch-firmware-for-lilygo-twatch-2020
- chronos-watchy
- opentimewatch-os
- zephyrwatch
- omote-open-universal-remote
---

The `lvgl-watch` project provides a custom firmware implementation for the Open-Smartwatch hardware platform. Developed using the Arduino framework and the PlatformIO build system, this project leverages the powerful LVGL (Light and Versatile Graphics Library) version 8.0 to create a sophisticated user interface for wearable devices. While the project is currently in a paused development state, it offers a functional foundation for developers looking to customize their ESP32-based smartwatches.

### Hardware Integration

The firmware is specifically configured for the ESP32-PICO-D4 (pico32) board, a common choice for compact wearables due to its integrated flash and small footprint. It extends the base functionality of the Open-Smartwatch by utilizing specific GPIO pins for peripheral control:
- **Haptic Feedback**: Support for a vibration motor is configured on GPIO2.
- **Infrared Control**: The firmware includes capabilities for infrared (IR) remote control functionality. This requires an IR LED connected between the 3.3V rail and GPIO4.

### Software Architecture

Built on the Espressif32 platform, the project utilizes the Arduino framework, which runs on top of FreeRTOS. This allows for efficient task management and hardware abstraction. The project structure is optimized for PlatformIO, ensuring a consistent build environment across different development setups. 

Key technical configurations include:
- **Partitioning**: The project uses a `huge_app.csv` partition table to accommodate the substantial memory footprint of the LVGL library and application logic.
- **Dependencies**: Beyond the core UI library, it integrates the `sunset` library for astronomical calculations, which is useful for time-aware watch faces or automatic brightness adjustments.

### Development and Deployment

Unlike standard Arduino projects, this repository is designed for PlatformIO. Developers can compile the source code using the VSCode PlatformIO extension or the command-line interface. The `platformio.ini` file defines the environment, setting a high upload speed of 921,600 baud for rapid development cycles and a monitor speed of 115,200 for debugging.

For users who prefer not to set up a full compilation environment, the project documentation provides instructions for flashing pre-compiled binaries using the `esptool` utility. This process involves writing several components to the ESP32 flash, including the bootloader, partition table, and the main firmware binary:

```bash
esptool --baud 921600 write_flash -z --flash_mode dio --flash_freq 40m --flash_size detect 0x1000 ./bootloader_dio_40m.bin 0x8000 ./partitions.bin 0xe000 ./boot_app0.bin 0x10000 ./firmware.bin
```

### Key Features

- **Modern UI**: Powered by LVGL 8.0, supporting complex widgets and smooth animations on a small screen.
- **Customizable Hardware Support**: Dedicated logic for vibration motors and IR transmitters.
- **PlatformIO Optimized**: Clean project structure with managed dependencies and board-specific configurations.
- **ESP32 Performance**: Leverages the dual-core capabilities of the ESP32-PICO-D4 for responsive UI and background tasks.
