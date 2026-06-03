---
title: MicroPython for Kendryte K210 (LoBo Port)
summary: A comprehensive MicroPython port for the Kendryte K210 64-bit RISC-V SoC,
  built upon the Kendryte FreeRTOS SDK. It features dual-core support, advanced multi-threading,
  and extensive peripheral drivers for displays, networking, and file systems.
slug: micropython-for-kendryte-k210-lobo-port
codeUrl: https://github.com/loboris/MicroPython_K210_LoBo
siteUrl: https://github.com/loboris/MicroPython_K210_LoBo/wiki
star: 131
version: v1.12.02
lastUpdated: '2020-03-12'
rtos: freertos
libraries:
- littlefs
- lwip
- micropython
- spiffs
- sqlite
topics:
- k210
- kendryte
- maixpy
- micropython
- sipeed
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- micropython-for-esp32-with-psram-support-lobo-port
- kendryte-k210-freertos-sdk
- rt-thread-board-support-package-for-kendryte-k210
- micropython-for-pandora-iot-board
- rt-thread-smart-porting-for-risc-v-qemu-and-k210
- arduino-pico
---

## Overview

MicroPython for Kendryte K210 (LoBo Port) is a highly optimized and feature-rich implementation of MicroPython specifically designed for the Kendryte K210, a dual-core 64-bit RISC-V SoC with AI acceleration capabilities. While originally based on Sipeed's MaixPy, this project has diverged significantly to become a completely independent implementation, focusing on stability, performance, and a consistent API similar to other LoBo MicroPython ports.

The project is built on top of the **kendryte-freertos-sdk**, which has been modified and enhanced to provide better driver support and features necessary for a robust MicroPython environment. It leverages the latest MicroPython core, adapted for the unique 64-bit RISC-V architecture.

## Advanced Multi-Core and Threading

One of the standout features of this port is its sophisticated handling of the K210's dual cores. It supports running two independent MicroPython instances simultaneously, one on each core, with a rich set of functions provided for data exchange between them. 

Furthermore, the `_thread` module has been completely refactored. Based on the developer's previous work for the ESP32, it includes advanced features such as inter-thread notifications and messaging, making it one of the most capable threading implementations available in the MicroPython ecosystem.

## Robust File System and Storage

Storage reliability is a priority in this port. It uses **LittleFS** as the default file system for internal Flash, which is power-fail safe and designed for microcontrollers. It also supports **SPIFFS** and provides full support for **Fat32** on external SD cards. A notable addition is full file timestamp support across all file system types, which is often missing in other embedded Python implementations.

## Networking and Connectivity

The networking stack is exceptionally broad, providing support for both WiFi (via ESP8266/ESP8285 modules) and GSM modules. 

- **WiFi:** Includes a custom firmware for the ESP8266 to enable enhanced features and OTA updates.
- **GSM:** Features PPPoS support, SMS handling with callbacks, and a flexible AT command interface.
- **Protocols:** The port includes C-coded modules for `urequests` and `mqtt` for high performance, along with frozen modules for FTP and Web servers.

## Rich Peripheral and Hardware Support

The port provides comprehensive access to the K210's hardware:
- **Display Module:** A powerful port from the ESP32 version, supporting direct writes, framebuffers, JPEG/BMP/RAW images, and flexible font support.
- **Hardware Acceleration:** Uses the K210's hardware AES for `uhashlib` and `ucryptolib`.
- **Standard Peripherals:** High-level modules for UART (interrupt-based), I2C (master/slave), SPI (master/slave), PWM, Timers, and OneWire.
- **Specialty Modules:** Support for WS2812 (NeoPixel) via SPI and a built-in `usqlite3` module for database management on Flash or SD cards.

## Developer Experience

To facilitate development, the repository includes several tools and configuration options:
- **Boot Menu:** An external pin-invoked menu to help recover from boot loops or format the file system.
- **MPyTerm:** A specialized serial terminal emulator for MicroPython that supports file synchronization and time setting.
- **Eclipse Integration:** Pre-configured project files for developers who prefer a full IDE environment.
- **Customizable Build:** A `BUILD.sh` script and `menuconfig` interface allow users to tune heap sizes, stack sizes, CPU frequency, and log levels directly.
