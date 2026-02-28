---
title: BetterMochi
summary: An enhanced firmware for the Mochi car pet device, targeting ESP32-based
  hardware like the M5Dial. It adds features such as a GPS-based speed gauge, real-time
  clock, and customizable settings using the TFT_eSPI library and ESP-NOW for sensor
  data transmission.
slug: bettermochi
codeUrl: https://github.com/NeoDoggy/BetterMochi
star: 33
version: v0.3.3
lastUpdated: '2025-07-27'
rtos: freertos
libraries:
- tft-espi
topics:
- animation
- arduino
- c
- cpp
- esp32
- esp32-s3
- gps
- m5dial
- m5stack
- mochi
isShow: true
image: /202602/better-mochi.webp
createdAt: '2026-02-28'
updatedAt: '2026-02-28'
---

## Overview

BetterMochi is an open-source firmware project designed to enhance the functionality of Dasai's Mochi, a popular "car pet" display device. While the original Mochi is known for its cute animations and expressions, it often lacks utility. BetterMochi transforms the device into a functional automotive companion by adding a GPS-driven speed gauge, a real-time clock, and a settings interface, all while maintaining the charm of the original animations.

The project is primarily designed for the M5Dial—an ESP32-S3 based development module with a round display and rotary encoder—but it can be adapted to any vanilla ESP32 or ESP32-S3 paired with a GC9A01 round TFT display.

## Key Features

BetterMochi expands the device's capabilities through several integrated modules:

- **Animated Expressions**: Retains the core "pet" experience by playing GIF-based facial animations.
- **Speed Gauge**: Utilizes a Neo6M GPS module to provide real-time speed tracking, styled as a digital gauge.
- **Real-Time Clock**: Displays time synchronized via GPS or NTP, ensuring accuracy even without a constant satellite lock.
- **Interactive UI**: Supports touch-screen brightness adjustments and rotary encoder navigation for switching between pages (Mochi, Gauge, Clock).
- **ESP-NOW Integration**: Uses a dual-MCU setup where a secondary ESP32 acts as a "datasender," transmitting GPS data wirelessly to the main display unit.

## Technical Implementation

The project leverages the ESP32's dual-core architecture using FreeRTOS. The firmware splits tasks between the two cores to ensure smooth UI performance and responsive data handling. For instance, `loop0` is pinned to Core 0 to handle background tasks like buzzer melodies, rotary encoder interrupts, and WiFi/NTP synchronization, while the main application logic runs on Core 1.

### Communication and Data Handling

Data is transmitted between the GPS receiver and the display unit using the ESP-NOW protocol, which allows for low-latency wireless communication without the overhead of a full WiFi connection. The data structure includes speed and timestamp information:

```cpp
typedef struct struct_message {
  int speed;
  char nowtime[15]; // Format: YYYYMMDDHHMMSS + Status Digit
} struct_message;
```

### Display and Graphics

The project utilizes the `TFT_eSPI` library for high-performance rendering on the GC9A01 round display. It also incorporates the `AnimatedGIF` library to handle the pet's expressions. The UI is designed to be interactive, allowing users to swipe the screen to adjust backlight levels or use the M5Dial's rotary encoder to cycle through different functional pages.

## Hardware Requirements

To build a BetterMochi instance, the following components are typically used:
- **M5Dial** (or an ESP32-S3 with a GC9A01 display)
- **Neo6M GPS Receiver**
- **Secondary ESP32** (for the data sender module)
- **CH340 UART to USB connector** (for GPS configuration)

## Getting Started

The installation process involves configuring the `TFT_eSPI` library with specific pin definitions for the GC9A01 driver and setting up the ESP-NOW broadcast addresses. Users must also configure the Neo6M GPS module to a 5Hz update rate using U-center software to ensure the speed gauge remains responsive during driving. Detailed configuration for NTP and WiFi credentials can be managed through a `conf.secret.h` file, allowing the internal RTC to stay synchronized even in areas with poor GPS reception.
