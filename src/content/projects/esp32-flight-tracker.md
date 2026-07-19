---
title: ESP32 Flight Tracker
summary: A real-time aircraft tracking system built for the ESP32-S3 that visualizes
  live flight data from the OpenSky Network API. It utilizes a dual-core FreeRTOS
  architecture to handle concurrent networking and high-speed rendering across a dual-display
  setup, featuring a hybrid map system optimized for hardware with limited PSRAM.
slug: esp32-flight-tracker
codeUrl: https://github.com/emir173/ESP32-Flight-Tracker
version: v1.1
lastUpdated: '2026-07-02'
rtos: freertos
libraries:
- tft-espi
- u8g2
topics:
- arduino
- aviation
- esp32
- esp32-s3
- radar
- tft-display
- tracker
isShow: true
image: /202607/esp32-flight-tracker.webp
createdAt: '2026-07-18T14:32:12+00:00'
updatedAt: '2026-07-18T14:32:12+00:00'
---

## Real-Time Flight Tracking on the ESP32-S3

The ESP32 Flight Tracker is a sophisticated embedded project designed to bring live aviation data to a compact, dual-screen handheld device. Originally developed as a module for a custom gaming console, this standalone version leverages the ESP32-S3's dual-core capabilities to fetch, parse, and render aircraft positions from the OpenSky Network API in near real-time.

## Dual-Core Architecture and Performance

To maintain a smooth user experience while handling heavy network traffic, the project employs a FreeRTOS-based dual-core architecture. By splitting responsibilities between the two cores, the system avoids the common pitfall of UI freezing during data fetches:

*   **Core 0 (Networking):** Handles the heavy lifting of WiFi management and HTTP requests. It downloads and parses large, chunked JSON files from the OpenSky API without interrupting the visual output.
*   **Core 1 (Rendering):** Dedicated to the UI engine, achieving over 15 FPS. It manages map panning, aircraft sprite rotation, and dashboard updates.

## Innovative Hybrid Map System

One of the most impressive technical feats of this project is how it manages geographical data within the ESP32-S3's 8MB PSRAM limit. A high-resolution global map is too large to fit in memory, so the developer engineered a **Hybrid Map System**. 

The system loads a high-resolution regional map (2048x1024) specifically for Turkey and its surroundings—consuming roughly 6.5MB of PSRAM—while utilizing a low-resolution global fallback map (512x256) for the rest of the world. Both maps are stored on an SD card and loaded into PSRAM at boot, ensuring zero-latency panning when using the analog joystick.

## Visuals and User Interface

The tracker utilizes a dual-display setup for maximum information density:
*   **1.8" TFT Display:** Serves as the main radar screen, showing the map and aircraft.
*   **0.96" OLED Display:** Acts as a dedicated stats screen for flight details.

Aircraft are rendered using a custom sprite system consisting of 72 pre-rendered frames per color to provide smooth 5-degree rotation increments with anti-aliasing. To help users quickly identify flight patterns, the project features an **Altitude Heatmap**. Aircraft colors change dynamically based on their current flight level, ranging from yellow (low altitude) to purple (high cruising altitude).

## Technical Optimizations

The project recently underwent significant optimizations to reduce boot times from 30 seconds down to just 15 seconds. These improvements include:
*   **WiFi Optimization:** Disabling NVS flash writes and using fast-scan mode to connect to access points instantly.
*   **Stream Processing:** Bypassing chunked encoding in HTTP 1.1 to reduce parsing overhead.
*   **SD Throughput:** Increasing the SD card clock to 40 MHz and using direct PSRAM writes with 64KB chunks to maximize data transfer speeds.

## Hardware and Setup

The system is designed for the ESP32-S3 (specifically modules with at least 8MB of PSRAM). It requires a MicroSD card module for map storage, an analog joystick for navigation, and three push buttons for zooming and aircraft selection. The firmware utilizes a custom 16MB partition scheme to accommodate the large application size and OTA capabilities.
