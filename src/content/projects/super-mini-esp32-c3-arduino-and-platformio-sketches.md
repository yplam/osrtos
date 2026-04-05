---
title: Super Mini ESP32-C3 Arduino and PlatformIO Sketches
summary: A comprehensive collection of example projects and hardware tests for the
  Super Mini ESP32-C3 development board. It covers a wide range of functionality including
  GPIO, ADC, deep sleep, serial communication, and wireless connectivity using the
  Arduino framework and PlatformIO.
slug: super-mini-esp32-c3-arduino-and-platformio-sketches
codeUrl: https://github.com/sigmdel/supermini_esp32c3_sketches
siteUrl: https://www.sigmdel.ca/michel/ha/esp8266/super_mini_esp32c3_en.html
version: v3.0.1_2024-10-14
lastUpdated: '2026-04-02'
licenses:
- 0BSD
rtos: freertos
libraries:
- lwip
topics:
- arduino
- esp32-arduino
- esp32-c3
- platformio
- supermini
isShow: false
createdAt: '2026-04-04T09:54:01+00:00'
updatedAt: '2026-04-04T09:54:01+00:00'
---

The Super Mini ESP32-C3 is a remarkably compact development board that brings the power of the RISC-V based ESP32-C3 microcontroller into a tiny 22x18 mm form factor. This repository serves as a technical companion to a deep dive into these boards, providing a structured set of sketches and projects that exercise nearly every facet of the hardware.

## Hardware Overview

The projects are tailored for the standard Super Mini ESP32-C3 and its variants, including the "Plus" version with an RGB LED and the version featuring an integrated 0.42" OLED display. Despite their small size, these boards break out 13 input/output pins and include essential components like a ceramic antenna, reset and boot buttons, and an onboard voltage regulator. The repository highlights the nuances between different manufacturers, noting differences in PCB thickness and component layout that can impact performance and durability.

## Comprehensive Peripheral Support

The collection is organized into logical categories that guide developers through the capabilities of the ESP32-C3:

*   **System Diagnostics**: Tools like `00_sys_info` and `12_macs` provide immediate feedback on the chip's internal state and unique identifiers.
*   **Digital and Analog I/O**: A suite of sketches tests everything from basic LED blinking and pulse width modulation (PWM) to complex interrupt handling and debouncing techniques. The analog section includes both standard and continuous ADC sampling examples.
*   **Serial Protocols**: Extensive tests for UART, SPI, and I2C are included. Notably, the repository provides both SPI Master and Slave firmware, allowing for board-to-board communication testing, as well as I2C implementations for real-time clocks (DS3231) and OLED displays.
*   **Power Management**: Examples for deep sleep demonstrate how to wake the device using either timers or external I/O signals, which is critical for the battery-powered applications these small boards often inhabit.

## Investigating Wireless Performance

One of the most valuable aspects of this project is the investigation into the Wi-Fi and Bluetooth performance of the Super Mini boards. The author includes a detailed benchmarking tool, `05_wifi_tx_power`, which records the time required to connect to a network at various transmission power levels. 

This data reveals significant variations between different board batches, likely due to antenna impedance mismatches or current-limited voltage regulators. By documenting these findings, the repository helps developers troubleshoot connectivity issues that are common with these specific low-cost modules, offering practical workarounds like adjusting the `WIFI_POWER` settings.

## Development Environment

To ensure accessibility, every project is designed to be dual-compatible. They can be compiled using the standard Arduino IDE (requiring version 3.3.7 or newer of the ESP32 core) or within the PlatformIO ecosystem using the `pioarduino` extension. The repository includes pre-configured `platformio.ini` files for each project, which manage board definitions, framework selection, and local library dependencies automatically. This makes it an excellent starting point for developers transitioning from simple Arduino sketches to more robust, professional development workflows.
