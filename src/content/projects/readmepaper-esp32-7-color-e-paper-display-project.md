---
title: 'ReadMePaper: ESP32 7-Color e-Paper Display Project'
summary: An ESP32-based firmware for displaying 24-bit BMP images on a Waveshare 7-color
  e-Paper module. It features a REST API to receive image URLs over WiFi, stores them
  in SPIFFS, and renders them on the display using the Arduino framework.
slug: readmepaper-esp32-7-color-e-paper-display-project
codeUrl: https://github.com/kc1r74p/ReadMePaper
star: 15
lastUpdated: '2021-03-01'
rtos: freertos
libraries:
- spiffs
topics:
- 7color
- acep
- arduino
- bitmap
- eink
- esp32
- rest-api
- spiffs
- waveshare-eink
- wifi
isShow: true
image: /202601/epaper_example.webp
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- 7-color-e-paper-digital-photo-frame
- open-display-firmware
- esp-e-paper-component
- animated-gif-on-a-320x240-lcd-display-ili9341-with-the-esp32
- tibber-price-e-ink-display
- e-paper-esp32-c6-firmware
---

## Overview

ReadMePaper is an embedded project designed to bridge the gap between web-based image content and multi-color e-ink displays. Built for the ESP32 platform, it specifically targets the Waveshare 5.65-inch 7-color e-Paper module (F), which utilizes Advanced Color ePaper (ACeP) technology to display seven different colors without a filter array. 

The project provides a streamlined pipeline for fetching high-quality 24-bit BMP images over a network and rendering them on the e-ink hardware. By leveraging the ESP32's integrated WiFi and flash storage capabilities, it creates a standalone IoT display that can be updated remotely via simple HTTP requests.

## Key Features

- **WiFi Connectivity**: Automatically connects to a local network on startup to listen for incoming image update requests.
- **RESTful Interface**: Supports image updates via a simple GET request, allowing users to pass a URL-encoded path to a non-compressed 24-bit BMP image.
- **Local Storage**: Utilizes the ESP32's SPIFFS (SPI Flash File System) to temporarily store downloaded images before processing them for the display.
- **High-Color Support**: Specifically optimized for the 7-color Waveshare module, handling the color mapping required for the ACeP display technology.
- **PlatformIO Integration**: Configured for development within the PlatformIO ecosystem, ensuring easy dependency management and build reproducibility.

## Technical Implementation

The firmware is built on the Arduino framework for ESP32, which runs on top of FreeRTOS. The system architecture follows a linear workflow: when a REST request is received, the ESP32 downloads the specified BMP file from the provided URL, saves it to the internal SPIFFS partition, and then reads the file back to drive the e-Paper display via SPI.

### Hardware Configuration

The project is designed to run on the Adafruit ESP32 Feather, though it can be adapted to other ESP32 boards. Pin definitions for the SPI interface and e-Paper control lines (Busy, Reset, DC, CS) are managed in the `epdif.h` header file. This modular approach allows for easy hardware adjustments depending on the specific wiring used in a build.

### Image Handling

Because e-Paper displays have slow refresh rates and specific color palettes, the project expects 24-bit non-compressed BMP images. These images, typically around 700kb for the target resolution, are processed directly from the flash storage to minimize RAM usage, which is critical given the memory constraints of embedded microcontrollers when handling large image buffers.

## Getting Started

To deploy the project, users need to configure their WiFi credentials within the `main.cpp` file. Once the device is powered and connected to the network, images can be pushed to the display using any standard REST client or even a web browser. 

```
GET: http://<esp32_ip>/load?path=<urlencode(BMP_URL)>
```

This makes ReadMePaper an ideal foundation for digital signage, weather stations, or photo frames that need to be updated dynamically over a local network or the internet.
