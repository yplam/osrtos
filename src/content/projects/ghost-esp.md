---
title: Ghost ESP
summary: A specialized security auditing and wireless monitoring firmware for ESP32
  devices. Built on the ESP-IDF framework and FreeRTOS, it provides tools for BLE
  wardriving, WiFi deauthentication testing, and device detection for hardware like
  AirTags and Flipper Zero.
slug: ghost-esp
codeUrl: https://github.com/Spooks4576/Ghost_ESP
siteUrl: https://ghostesp.net
star: 1132
version: VA1.4.8
lastUpdated: '2025-04-22'
rtos: freertos
libraries:
- lvgl
- nimble
- lwip
topics:
- esp32
- esp32-c3
- esp32-c6
- esp32-wroom
- esp32s2
- flipperzero
- wifi-dev-board
isShow: true
image: /202603/ghostfront-600x800.webp
createdAt: '2026-03-04'
updatedAt: '2026-03-04'
---

## Overview

Ghost ESP is a comprehensive firmware suite designed for the ESP32 platform, specifically targeting security research, wireless auditing, and environmental interaction. Developed using the ESP-IDF (Espressif IoT Development Framework), the project leverages the multitasking capabilities of FreeRTOS to handle concurrent operations such as network scanning, packet capture, and user interface management.

While the project is currently archived, its final iterations introduced a robust set of features for mobile security auditing. It transforms standard ESP32 development boards into portable tools capable of monitoring the wireless spectrum and interacting with various IoT protocols.

## Key Features & Capabilities

Ghost ESP is packed with features that cater to both network security and hardware hacking enthusiasts:

- **Wireless Auditing**: Includes advanced deauthentication attack capabilities with bidirectional frames, proper 802.11 sequencing, and packet rate logging.
- **BLE & Wardriving**: Supports Bluetooth Low Energy (BLE) packet capture and wardriving, allowing users to map the BLE landscape.
- **Device Detection**: Specialized routines for detecting and alerting users to the presence of AirTags, card skimmers, and Flipper Zero devices. The system can provide visual feedback, such as pulsing LEDs orange when a Flipper is detected.
- **Web-Based Interface**: A sophisticated WebUI that includes a remote terminal for sending commands and receiving real-time logs, optimized for speed and low memory footprint.
- **Hardware Support**: Extensive support for various ESP32-based hardware, including the "Cheap Yellow Display" (CYD) models, TWatch S3, and devices with integrated GPS modules.

## Technical Implementation

The project is built on the ESP-IDF framework, utilizing a custom partition table to manage memory effectively. The memory layout includes dedicated sections for Non-Volatile Storage (NVS) to persist credentials and settings, a large factory application partition, and a coredump area for debugging.

For the user interface, Ghost ESP utilizes the **LVGL** (Light and Versatile Graphics Library) to drive on-device displays. This allows for a rich graphical menu system and a terminal view with efficient scrolling logic. The networking stack is powered by **lwIP**, while BLE functionality is handled via the **NimBLE** stack, which is often preferred in ESP32 projects for its lower memory consumption compared to the default Bluedroid stack.

## Hardware & Integration

Ghost ESP is designed to be highly configurable. Through the command line or WebUI, users can reconfigure RGB LED pins, adjust display timeouts, and manage WiFi credentials. It supports external peripherals such as:

- **GPS Modules**: Integrated via UART to provide location data for wardriving logs.
- **RGB LEDs**: Support for various LED orders (RGB/GRB) and visual effects like strobe or police siren easing.
- **Display Modules**: Specific configurations are provided for various 2.4-inch and 3.5-inch touch displays commonly used in the ESP32 ecosystem.

## Getting Started

As an ESP-IDF project, Ghost ESP is compiled using CMake. It requires the ESP-IDF environment to be set up on the development machine. Users can define specific target hardware (such as the ESP32-S3 or standard ESP32) via environment variables during the build process. The project uses a `sdkconfig.defaults` file to ensure the RTOS and networking stacks are tuned for the high-performance requirements of packet injection and monitoring tasks.
