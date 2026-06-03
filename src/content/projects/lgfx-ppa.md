---
title: LGFX_PPA
summary: A hardware-accelerated graphics layer for the ESP32-P4 that integrates the
  Pixel-Processing Accelerator (PPA) with LovyanGFX and M5GFX. It provides high-performance
  image rotation, scaling, mirroring, and blending for MIPI/DSI display panels.
slug: lgfx-ppa
codeUrl: https://github.com/tobozo/LGFX_PPA
star: 14
version: v0.2.2
lastUpdated: '2025-09-24'
rtos: freertos
topics:
- 2d-graphics
- arduino-library
- esp-idf
- esp32
- esp32p4
- hardware-acceleration
- lovyangfx
- m5gfx
- m5unified
- platformio-library
isShow: false
createdAt: '2026-01-29'
updatedAt: '2026-01-29'
relatedProjects:
- lvgl-port-for-esp32
- lvgl-for-raspberry-pi-pico-hub75-led-matrix
- lvgl-port-for-m5stack-core2
- esp32-tux
- lilygo-t-display-s3-boilerplate
- lvgl-8-on-wt32-sc01-with-arduino
---

## Overview

LGFX_PPA is a specialized graphics library designed to unlock the hardware acceleration capabilities of the ESP32-P4 microcontroller. It acts as a performance-oriented layer for the popular LovyanGFX and M5GFX libraries, specifically targeting the Pixel-Processing Accelerator (PPA) module. The PPA is a dedicated hardware block in the ESP32-P4 designed to offload intensive image manipulation tasks from the CPU, such as scaling, rotating, and blending pixels.

By integrating this hardware acceleration into the familiar LGFX/M5GFX API, developers can achieve significantly higher frame rates and smoother transitions on high-resolution displays, such as the MIPI/DSI panels found on the M5Stack Tab5.

## Key Features and Capabilities

The library focuses on providing hardware-backed implementations of common graphics operations that are traditionally CPU-intensive:

- **Fast Image Rotation and Mirroring**: Leverages the PPA hardware to flip or rotate sprites without taxing the main processor.
- **Hardware Scaling**: Efficiently resizes images and sprites in real-time.
- **Advanced Blending**: Accelerates alpha-blending and image composition tasks.
- **Optimized Sprite Management**: Introduces the `PPA_Sprite` class, which inherits from `LGFX_Sprite` but ensures the underlying memory buffers are correctly aligned for PPA hardware operations.

## Technical Requirements

To utilize LGFX_PPA, specific hardware and software configurations are required:

- **Hardware**: An ESP32-P4 SoC is mandatory, as the PPA peripheral is unique to this chip. The project also requires at least 4MB of PSRAM to handle the large framebuffers associated with high-resolution MIPI/DSI panels.
- **Software Framework**: The library requires ESP-IDF version 5.4 or higher. It is compatible with both the native ESP-IDF environment and the Arduino-ESP32 core (specifically versions 3.2.1 and later).
- **Color Depth**: PPA operations are optimized for high-quality graphics, limiting bit depth to 16-bit, 24-bit, and 32-bit color modes.

## Implementation Details

The core of the library is the `PPA_Sprite`. While it maintains compatibility with the standard `LGFX_Sprite` API, it handles the complexities of memory alignment required by the ESP32-P4's DMA and PPA engines. This allows developers to drop LGFX_PPA into existing LovyanGFX projects with minimal code changes while gaining immediate performance benefits.

## Current Development Status

As the ESP32-P4 is a newer platform, LGFX_PPA is actively tracking updates in the Espressif ecosystem. Users should be aware of specific version requirements for the best experience. For instance, certain PPA operations may trigger screen flashes in arduino-esp32 v3.3.0, leading the maintainer to recommend v3.2.1 or waiting for fixes in v3.3.1. These nuances are critical for developers building production-grade firmware on the P4 platform.

For those looking to get started, the repository includes an examples folder demonstrating how to initialize the PPA-backed sprites and perform accelerated transformations.
