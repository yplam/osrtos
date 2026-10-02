---
title: POOM Multitool Platform
summary: POOM is an open-source multitool platform for ESP32-C5 and ESP32-C6 microcontrollers,
  designed for wireless security testing, IoT automation, and portable gaming. It
  leverages the ESP-IDF framework with FreeRTOS, OpenThread, and lwIP to provide a
  modular environment for Wi-Fi/BLE analysis and hardware interaction.
slug: poom-multitool-platform
codeUrl: https://github.com/The-POOM/the_poom
siteUrl: https://poom.stellar-iot.com
lastUpdated: '2026-06-16'
rtos: freertos
libraries:
- lwip
- open-thread
topics:
- arduboy
- arduboy-game
- cybersecurity
- esp-idf
- esp32
- ethical-hacking
- iot
- matter
- wifi-security
- zigbee
- zigbee-sniffer
isShow: false
createdAt: '2026-08-06T11:22:06+00:00'
updatedAt: '2026-08-06T11:22:06+00:00'
relatedProjects:
- ghostesp
- unigeek-firmware
- esp-hack-fw
- marauder-centauri
- bruce-firmware
- project-starbeam
---

## Overview

POOM is an ambitious open-source multitool platform designed for the modern embedded enthusiast. Whether you are a security researcher, a maker, or a gamer, POOM provides a versatile hardware-software environment to explore wireless protocols, automate tasks, and build custom interactions. Built on the robust ESP-IDF framework, it targets the latest generation of Espressif chips, specifically the ESP32-C5 and ESP32-C6, leveraging their native multi-protocol capabilities to bridge the gap between different wireless ecosystems.

The project is designed to be more than just a firmware; it is a portable laboratory. By combining high-level application logic with low-level hardware drivers, POOM allows users to transition seamlessly from scanning I2C sensors to performing authorized penetration testing on Wi-Fi networks.

## Four Pillars of Operation

The platform is organized into four distinct operating domains, each catering to a different aspect of embedded development and security research:

*   **Maker Mode**: Focuses on peripheral discovery and automation. It features an I2C scanner for rapid Qwiic-style peripheral discovery and pipelines for streaming sensor data to automation platforms like n8n, Node-RED, or Home Assistant. It also includes integration for Edge Impulse, allowing for data collection and feature testing for machine learning models at the edge.
*   **ZEN Mode**: Transitions the device into a sleek interaction tool. This mode supports BLE MIDI for motion-based music control, NFC experimentation workflows, and a controller mode for managing media, presentations, or mobile applications.
*   **Beast Mode**: This is the security-focused toolkit. It provides capabilities for Wi-Fi scanning, deauthentication testing, ARP spoofing, and BLE proximity tracking. It also supports advanced captures for Zigbee, Thread, and 802.15.4 protocols, making it a powerful ally for drone research and IoT security auditing.
*   **Gamer Mode**: Leverages the device's hardware for entertainment. With Arduboy library support and IMU-based motion control, users can play compact games or use the device as a BLE gamepad.

## Technical Architecture

The repository follows a highly modular structure that separates core logic from hardware-specific implementations. The `applications/` directory contains end-user features like `poom_wifi_captive` and `poom_ble_keyboard`, while the `modules/` directory provides reusable components for firmware updates, secret storage, and display management. 

Hardware abstraction is handled within the `drivers/` directory, which includes support for:
*   **OLED Displays**: Managed via I2C and specialized transport layers.
*   **IMU Sensors**: Integration with the LSM6DS3 for motion tracking.
*   **Storage**: SD card support via FATFS for data logging and browser functionality.
*   **Visual Feedback**: WS2812 RGB LED drivers for status indication.

## Advanced Networking and Connectivity

POOM takes full advantage of the ESP32-C6's wireless stack. By integrating **OpenThread**, the platform can participate in Thread mesh networks as a Full Thread Device (FTD) or Radio Co-Processor (RCP). The inclusion of **lwIP** and a specialized **PCAP** module allows for sophisticated network traffic analysis and host export pipelines. 

For developers who want to extend the platform without deep C programming, POOM integrates a **Lua** scripting engine. This allows for rapid prototyping of logic and automation directly on the device. Furthermore, the system includes a captive portal implementation and an mDNS manager to simplify network service discovery and interaction in the field.

## Getting Started

As an ESP-IDF project, POOM is built using the standard `idf.py` toolchain. It currently defaults to the `esp32c6` target but maintains compatibility with the `esp32c5`. 

```bash
# Build for ESP32-C6
idf.py set-target esp32c6
idf.py build

# Flash and monitor
idf.py flash monitor
```

The project emphasizes a production-grade C style with clear APIs, ensuring that contributors can easily add new modules or drivers while maintaining system stability. Whether you are building a custom drone controller or a portable Wi-Fi analyzer, POOM provides the modular foundation necessary for advanced embedded workflows.
