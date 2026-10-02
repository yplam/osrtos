---
title: Slave I
summary: Slave I is a wireless research firmware for the M5Stack Tab5, utilizing a
  dual-chip architecture with the ESP32-P4 and ESP32-C6. It provides a toolkit for
  Wi-Fi, BLE, and 802.15.4 protocol analysis, built on FreeRTOS and featuring a sophisticated
  LVGL-based touch interface.
slug: slave-i
codeUrl: https://github.com/0day1day/Slave_I
siteUrl: https://0day1day.github.io/Slave_I/
version: v0.1.0
lastUpdated: '2026-07-10'
licenses:
- NOASSERTION
image: /202609/Slave_I_0.avif
rtos: freertos
libraries:
- lvgl
- nimble
- jansson
topics:
- ble
- esp32
- esp32-c6
- esp32-p4
- firmware
- ieee-802-15-4
- lvgl
- m5stack
- m5stack-tab5
- offensive-security
- pentesting
- red-team
- security-research
- wifi
isShow: true
createdAt: '2026-09-17T01:47:48+00:00'
updatedAt: '2026-09-17T01:47:48+00:00'
relatedProjects:
- esp-hack-fw
- unigeek-firmware
- marauder-centauri
- bruce-firmware
- poseidon
- m5-crystal
---

Slave I is a specialized firmware project designed for the M5Stack Tab5, serving as a comprehensive wireless research and education toolkit. The project is engineered to leverage the unique dual-MCU capabilities of the ESP32-P4 and ESP32-C6 platform, providing researchers with a powerful handheld device for protocol analysis and security auditing.

## Dual-Chip Architecture

The technical foundation of Slave I is its sophisticated split-processing architecture. The system orchestrates tasks between two distinct Espressif microcontrollers:

- **ESP32-P4**: Serves as the primary application processor, managing the high-resolution LVGL user interface, file system operations, and overall logic orchestration.
- **ESP32-C6**: Functions as the dedicated radio engine, executing low-level wireless tasks across Wi-Fi, Bluetooth Low Energy (BLE), and 802.15.4 (Zigbee/Thread) protocols.

These chips communicate via an RPC protocol over an `esp_hosted` SDIO link. This design ensures that the user interface remains responsive even during high-bandwidth radio operations or intensive signal processing tasks.

## Wireless Protocol Analysis

Slave I provides a suite of tools for interacting with and analyzing various wireless environments. Its capabilities include:

- **Wi-Fi Research**: Supports scanning across both 2.4 GHz and 5 GHz bands, handshake and EAPOL capture to `.pcap` format, and the deployment of captive portal templates for security testing.
- **BLE Discovery**: Features a scanner with vendor resolution, utilizing a built-in company-ID and OUI database to identify nearby Bluetooth devices.
- **802.15.4 / Zigbee**: Includes an energy scanner and device sniffer capable of identifying PAN IDs, EUI-64 addresses, and frame types. It supports raw frame capture for analysis in external tools like Wireshark.
- **Unified Radar**: A "Nearby" mode provides a real-time visualization of the local wireless spectrum, sorting Wi-Fi and BLE signals by signal strength (RSSI).

## User Interface and Development

The firmware features a touch-optimized UI built with the LVGL graphics library, supporting themes and live KPIs. Beyond the touch interface, Slave I is designed for field use with support for physical keyboard navigation via I2C or USB HID. 

For developers, the project includes a desktop emulator that uses SDL2 to render the UI on a standard PC. This allows for rapid iteration of the interface and domain logic without requiring physical hardware for every build. The firmware is built using the ESP-IDF 5.4.2 framework, leveraging FreeRTOS for task management and the NimBLE stack for Bluetooth connectivity. It also incorporates a robust file management system for handling captures and logs on a microSD card.
