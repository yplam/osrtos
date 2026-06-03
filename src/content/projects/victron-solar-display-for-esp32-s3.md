---
title: Victron Solar Display for ESP32-S3
summary: An ESP32-S3 firmware for monitoring Victron SmartSolar chargers and battery
  monitors via Bluetooth. It decrypts BLE advertisements using AES-128 and displays
  real-time metrics on a 3.5-inch LCD using the LVGL library.
slug: victron-solar-display-for-esp32-s3
codeUrl: https://github.com/wytr/VictronSolarDisplayEsp
star: 24
version: v1.3.0
lastUpdated: '2025-10-20'
rtos: freertos
libraries:
- lvgl
- nimble
- spiffs
topics:
- ble
- captive-portal
- display
- embedded
- esp32
- firmware
- iot
- lvgl
- solar
- spiffs
- victron
- webui
isShow: false
createdAt: '2026-01-30'
updatedAt: '2026-01-30'
relatedProjects:
- esp32-remote-for-victron
- clawdmeter
- pixlpal-m1-firmware
- e-paper-esp32-c6-firmware
- open-display-firmware
- esphome-tesla-ble
---

## Overview

VictronSolarDisplayEsp is a specialized firmware project designed for the ESP32-S3, specifically targeting the Guition JC3248W535 3.5-inch capacitive touch display module. The project serves as a real-time monitor for Victron Energy hardware, such as SmartSolar chargers and Battery Monitors (SmartShunt, BMV series). By leveraging Bluetooth Low Energy (BLE) telemetry, the device provides a dedicated hardware dashboard for off-grid power systems without requiring a full GX device or a smartphone app for constant monitoring.

## Technical Implementation

The project is built on the ESP-IDF (v5.4.1) framework, utilizing the NimBLE stack for efficient Bluetooth communication. Because Victron broadcasts its telemetry in an encrypted format, the firmware implements AES-128 CTR decryption using the `esp_aes` hardware accelerator. It currently supports parsing two primary record types:
- **Solar Charger (0x01):** Voltage, current, PV yield, and system state.
- **Battery Monitor (0x02):** State-of-charge (SOC), time-to-go, current, and auxiliary metrics.

The user interface is powered by LVGL, featuring a modular architecture where different device views are registered in a factory pattern. This allows the UI to dynamically adapt its layout based on the detected device type, hiding irrelevant fields (like solar yield on a battery-only monitor) to maintain a clean display.

## Key Features

- **Real-time BLE Decryption:** Scans and decrypts 128-bit AES encrypted Victron advertisements.
- **Modular UI:** A 320x480 dark-themed dashboard built with LVGL that updates automatically based on the connected device class.
- **On-Device Configuration:** Includes a Settings tab for adjusting brightness, viewing the BLE MAC address, and entering AES keys directly on the touchscreen.
- **Captive Portal Setup:** On first boot, the device creates a Wi-Fi Access Point (`VictronConfig`). Users can connect via smartphone to access a web-based configuration interface (hosted via SPIFFS) to set the AES encryption key.
- **Persistent Storage:** Configuration data, including Wi-Fi credentials, AES keys, and display settings, are stored securely in Non-Volatile Storage (NVS).

## Hardware and Assembly

The project is optimized for the Guition JC3248W535 module, an integrated ESP32-S3 board with a built-in display. For mobile or marine installations, the repository includes a comprehensive hardware build guide featuring:
- 3D-printable enclosure designs for surface mounting.
- Wiring diagrams for DC-DC buck converters to power the unit from a 12V battery system.
- Instructions for creating custom wiring harnesses using PicoBlade-compatible connectors.

## Extensibility

One of the project's strengths is its modular approach to Victron's protocol. The repository provides a clear roadmap for adding support for additional Victron BLE record types, such as Inverters, DC/DC converters, or SmartLithium batteries. By extending the `victron_ble.c` parser and implementing a new view module in the `ui/` directory, developers can easily adapt the display for the entire Victron ecosystem.
