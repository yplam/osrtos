---
title: Hyperk
summary: Hyperk is a minimalist, high-performance WiFi LED driver for ESP8266, ESP32,
  and Raspberry Pi Pico W microcontrollers. It provides low-latency control for addressable
  LEDs like WS2812B and SK6812, featuring native integration with HyperHDR and Home
  Assistant. The firmware utilizes FreeRTOS and the lwIP stack to manage high-speed
  UDP streaming and a responsive web-based configuration interface.
slug: hyperk
codeUrl: https://github.com/awawa-dev/Hyperk
siteUrl: https://hyperk.hyperhdr.org
version: 0.0.2
lastUpdated: '2026-04-14'
licenses:
- MIT
image: /202604/Hyperk_0.avif
rtos: freertos
libraries:
- lwip
- littlefs
topics:
- ambilight
- esp32
- esp8266
- hyperhdr
- led-strips
- raspberry-pi-pico
- wireless
isShow: true
createdAt: '2026-04-19T08:44:52+00:00'
updatedAt: '2026-04-19T08:44:52+00:00'
---

Hyperk is a high-performance, minimalist firmware designed specifically for driving addressable LED strips over WiFi. While many LED controllers focus on a broad range of built-in effects, Hyperk takes a different approach by prioritizing speed, low latency, and seamless integration with external control software. It serves as a streamlined component that avoids unnecessary complexity, making it an ideal choice for bias lighting and home automation enthusiasts who require precision and responsiveness.

## Broad Hardware Compatibility

One of the project's strongest assets is its wide-ranging hardware support. Hyperk is built to run on almost the entire modern Espressif ecosystem, including the legacy ESP8266 and the full ESP32 family—from the standard ESP32 and S2/S3 variants to the newer Wi-Fi 6-capable C2, C3, C5, and C6 models. It also extends its reach to the Raspberry Pi Pico W, supporting both the RP2040 and the newer RP2350 microcontrollers. For those requiring wired stability, the WT32-ETH01 Ethernet-enabled board is also supported.

## Optimized for Real-Time Performance

At its core, Hyperk is optimized for HyperHDR, though it remains compatible with various other platforms. It supports several high-speed communication protocols to ensure that LED transitions are smooth and lag-free:

*   **DDP (Distributed Display Protocol):** A lightweight protocol for sending pixel data over UDP.
*   **UDP RealTime & Raw RGB:** Direct listeners for streaming color data with minimal overhead.
*   **WLED API Compatibility:** Hyperk can act as a drop-in replacement or addition to ecosystems already using WLED drivers.

A notable technical feature is the inclusion of white channel calibration for SK6812 (NeoPixel RGBW) LEDs, a feature inherited from the HyperSerial project. This ensures accurate color reproduction when mixing white and RGB channels. To maintain system reliability, the firmware includes a fail-safe mechanism where LEDs automatically turn off 6.5 seconds after a stream loss, preventing "frozen" lights if the source software crashes.

## Seamless Integration and Setup

User experience is a priority, starting from the installation process. Hyperk offers a browser-based flasher that utilizes the Web Serial API, allowing users to install the firmware directly from a website without downloading external tools. For RP2040/RP2350 devices, the firmware supports standard Mass Storage Mode (drag-and-drop) flashing.

Once flashed, the device enters an "Access Point" mode (Hyperk-Setup) if it cannot find a known network within 12 seconds. This allows for easy configuration of local Wi-Fi credentials via a modern Web GUI. For home automation users, Hyperk features automatic discovery in Home Assistant, providing immediate control over power, brightness, and color without manual configuration.

## Technical Architecture

The project is built on a modern codebase that leverages the power of FreeRTOS for task management on ESP32 and RP2040 platforms. It utilizes the lwIP stack for efficient network handling, ensuring that incoming UDP packets are processed with minimal jitter. Configuration data is handled via ArduinoJson, and the web interface is powered by ESPAsyncWebServer, providing a snappy and responsive management portal. For hardware-level LED control, the project utilizes high-performance libraries like NeoPixelBus and FastLED, ensuring compatibility with WS2812b, SK6812, and APA102 (DotStar) SPI-based LEDs.
