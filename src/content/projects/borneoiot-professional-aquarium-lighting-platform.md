---
title: 'BorneoIoT: Professional Aquarium Lighting Platform'
summary: A full-stack open-source solution for smart aquarium LED control featuring
  ESP32-based hardware, ESP-IDF firmware, and a Flutter mobile application. It provides
  high-resolution PWM dimming, sunrise/sunset simulation, and efficient CoAP/CBOR
  communication for professional-grade lighting management.
slug: borneoiot-professional-aquarium-lighting-platform
codeUrl: https://github.com/borneo-iot/borneo
siteUrl: https://www.borneoiot.com
star: 67
version: release-app-latest
lastUpdated: '2026-03-12'
rtos: freertos
libraries:
- lwip
- nimble
topics:
- aquarium
- aquarium-controller
- aquarium-lights
- dart
- electronics
- embedded
- esp-idf
- esp32
- flutter
- iot
- iot-application
- iot-device
- led
- led-controller
- open-hardware
- sota
isShow: true
image: /202603/borneo.webp
createdAt: '2026-03-12'
updatedAt: '2026-03-12'
---

## Overview

BorneoIoT is a production-grade, open-source ecosystem designed specifically for professional aquarium LED lighting. Unlike many hobbyist projects, BorneoIoT provides a complete vertical stack—from OSHWA-certified hardware designs and robust embedded firmware to a cross-platform mobile application and a Python SDK for automation. The project aims to bridge the gap between DIY weekend builds and commercial-grade product integration, offering features like flicker-free dimming and millisecond-smooth environmental transitions.

## Hardware Architecture

The heart of the BorneoIoT platform is its custom PCB designs, which target the ESP32 family (specifically ESP32-C3 and ESP32-C5). The hardware is designed for high-performance dimming, featuring:

- **High-Resolution PWM**: Supports 6 to 10 channels with 12-bit resolution (4096 steps), operating at frequencies up to 19kHz. This ensures flicker-free operation, which is critical for aquarium photography and the health of sensitive aquatic life.
- **Compact Form Factor**: The core module measures just 22×30mm, allowing it to be integrated into slim, modern LED fixtures.
- **Connectivity**: Native support for WiFi and Bluetooth LE (BLE) for local and remote management.
- **Thermal Management**: Includes active cooling control with temperature-based fan throttling to protect high-power LED arrays.

The hardware is OSHWA certified (CN000017) and licensed under CERN-OHL-S-2.0, ensuring full transparency and freedom for users to modify or manufacture their own units.

## Firmware and Protocol

The firmware is built on the ESP-IDF framework, leveraging FreeRTOS for task management and the lwIP stack for networking. It implements a sophisticated control logic tailored for aquatic environments:

- **Environmental Simulation**: Implements sunrise and sunset curves with millisecond-smooth transitions, preventing the stress caused to fish by sudden light changes.
- **Efficient Communication**: Uses the CoAP (Constrained Application Protocol) combined with CBOR (Concise Binary Object Representation). This combination provides a low-latency, low-overhead communication protocol that is much more efficient than traditional HTTP/JSON for embedded devices.
- **Time Synchronization**: Automatic SNTP time synchronization ensures that lighting schedules remain accurate without manual intervention.
- **Reliability**: Features built-in OTA (Over-The-Air) update capabilities, allowing for seamless firmware improvements and bug fixes.

## Software Ecosystem

BorneoIoT extends beyond the device itself with a comprehensive software suite:

- **Mobile App**: A cross-platform application built with Flutter, available for iOS, Android, and Windows. It provides real-time dimming control, schedule management, and group control for multi-device setups without requiring a cloud connection.
- **Python SDK (borneopy)**: For power users and researchers, the Python client library allows for advanced automation, data logging, and integration into larger smart home or laboratory systems.

## Getting Started

One of the standout features of BorneoIoT is its accessibility. While the project is technically sophisticated, it offers a "no toolchain required" entry point. Users can flash the latest firmware directly from a Chrome or Edge browser using the Borneo Web Flasher. This significantly lowers the barrier to entry for users who may not be familiar with the ESP-IDF development environment but want to utilize professional-grade hardware and firmware.
