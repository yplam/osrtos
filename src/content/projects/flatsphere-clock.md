---
title: FlatSphere Clock
summary: An ESP32-S3 powered smart clock project featuring a round touch display,
  Text-to-Speech capabilities, and integrated battery monitoring. Built using the
  ESP-IDF framework and LVGL graphics library, it serves as a comprehensive hardware
  abstraction layer and demo for the WaveShare 1.85-inch Touch LCD development board.
slug: flatsphere-clock
codeUrl: https://github.com/d4rkmen/flatsphere
star: 10
version: v1.1
lastUpdated: '2025-12-23'
rtos: freertos
libraries:
- lvgl
- lwip
topics:
- esp-idf
- esp32-s3
- st77916
- tts
isShow: true
image: /202602/flatsphere.webp
createdAt: '2026-02-04'
updatedAt: '2026-02-04'
relatedProjects:
- smart-flask-thermos-with-round-display-and-esp32-c3
- desk-weather-clock-geekmagic-s3
- gateway-smartwatch
- esp32-s3-smart-home-control-panel
- elekstube-ips-custom-firmware
- lilygo-t-display-s3-boilerplate
---

## Overview

FlatSphere is a sophisticated smart clock application designed specifically for the WaveShare ESP32-S3 Touch LCD 1.85C development board. More than just a simple timepiece, it serves as a robust demonstration project and a Hardware Abstraction Layer (HAL) for developers looking to build on this specific hardware platform. The project integrates high-quality graphics, interactive touch controls, and local audio synthesis to create a modern embedded user experience.

## Hardware Capabilities

The project is built around the ESP32-S3 SoC, leveraging its dual-core Xtensa LX7 processor and significant memory resources (16MB Flash and 8MB PSRAM). The primary interface is a 1.85-inch round IPS LCD with a 360x360 resolution, driven by the ST77916 QSPI controller. 

**The FlatSphere HAL includes drivers for a wide array of onboard peripherals:**
- **Display & Touch**: ST77916 QSPI LCD and CST816S capacitive touch controller.
- **Audio**: I2S-based speaker output and microphone input.
- **Timekeeping**: PCF85063 Real-Time Clock (I2C) for persistent time tracking.
- **Storage**: SDMMC interface for SD card support and USB Host (MSC) capabilities.
- **Power Management**: ADC-based battery voltage monitoring with voice announcements.
- **Expansion**: TCA9554PWR I2C GPIO expander for additional I/O management.

## Software Architecture

FlatSphere is built on the Espressif IoT Development Framework (ESP-IDF) v5.5.1 and utilizes FreeRTOS for task management. The graphical user interface is powered by LVGL v9.4.0, with the visual design created in SquareLine Studio. This combination allows for smooth animations, such as the sweeping second hand on the analog watch face, and responsive touch interactions for setting the time and date.

One of the most unique features of the project is the integration of the SVOX Pico Text-to-Speech (TTS) engine. This allows the clock to announce the time and battery status vocally. Due to the memory-intensive nature of TTS, the project includes specific configurations to utilize the 8MB of SPIRAM (PSRAM) for memory allocation, ensuring the system remains stable during audio synthesis.

## Key Features

- **Analog Watch Face**: A beautiful, round clock display featuring smooth second-hand animations.
- **Voice Feedback**: Local PicoTTS engine announces the time every minute and provides battery level updates.
- **Interactive Settings**: Dedicated UI screens for adjusting time and date directly on the device.
- **Audio Feedback**: Includes boot sounds and tactile button feedback for a polished user experience.
- **Connectivity**: Integrated WiFi management for future network-synchronized features.

## Getting Started

To build FlatSphere, developers need the ESP-IDF environment (v5.5.1 or later). The project uses a standard CMake build system. A critical technical note for users is the requirement for memory allocation modification in the PicoTTS library; the engine must be directed to use SPIRAM (`MALLOC_CAP_SPIRAM`) to accommodate its memory footprint without exhausting internal RAM.

```cpp
// Example of the required PicoTTS memory allocation modification
picoMemArea = heap_caps_malloc(PICO_MEM_SIZE, MALLOC_CAP_SPIRAM);
```

The repository is organized with a clean HAL structure, making it easy to extract individual drivers for use in other ESP32-S3 projects targeting similar hardware components.
