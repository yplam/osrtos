---
title: 'TamaFi: WiFi-Powered Virtual Pet'
summary: An autonomous virtual pet application for the ESP32-S3 that 'feeds' on nearby
  WiFi networks. It features a full-color UI on an ST7789 display, persistent state
  management via Preferences, and a custom behavior engine that evolves the pet based
  on environmental factors.
slug: tamafi-wifi-powered-virtual-pet
codeUrl: https://github.com/cifertech/TamaFi
siteUrl: https://cifertech.net/tamafi-reviving-the-classic-virtual-pet-with-a-tech-twist/
star: 272
version: v2.0.0
lastUpdated: '2025-12-01'
rtos: freertos
libraries:
- tft-espi
topics:
- esp32
- game
- handheld-devices
- retro
- tamagotchi
- virtual-pet
isShow: true
image: /202603/TamaFi.webp
createdAt: '2026-03-17'
updatedAt: '2026-03-17'
---

## Overview

TamaFi is a modern, WiFi-aware virtual pet project that reimagines the classic handheld digital pet experience for the 21st century. Powered by the ESP32-S3, TamaFi doesn't just sit in a loop; it interacts with its digital environment by "feeding" on nearby WiFi signals. The project combines custom PCB design, a sophisticated behavior engine, and a vibrant color UI to create a device that feels like a finished consumer product.

## The WiFi-Fed Mechanic

The core innovation of TamaFi is its relationship with the wireless environment. The pet's stats—hunger, happiness, and health—are directly influenced by the WiFi networks it detects. It runs a decision engine that evaluates the number of nearby networks, their signal strength (RSSI), and whether they are open or hidden. 

**The pet performs several autonomous actions based on these factors:**
- **Hunt:** Scans for WiFi networks to "feed," adjusting hunger and health stats.
- **Explore:** Reacts to network diversity and hidden SSIDs.
- **Rest:** Enters a sleep cycle for recovery, accompanied by unique animations.
- **Idle:** Displays mood-based animations on the home screen when not actively engaged.

## Technical Architecture

TamaFi is built on the ESP32-S3 using the Arduino framework. It leverages the dual-core capabilities of the S3 to maintain a responsive UI while handling background tasks like WiFi scanning and sound generation. 

### Graphics and UI
The project utilizes the `TFT_eSPI` library to drive a 240x240 ST7789 full-color display. To ensure a flicker-free experience, all rendering is handled through a framebuffer using `TFT_eSprite`. The UI includes a comprehensive menu system for checking pet status, environment diagnostics, and system settings like brightness and sound toggles.

### Behavior and Evolution
The pet's logic is driven by a state machine that tracks age in real-time (minutes, hours, and days). As the pet ages, it evolves through four distinct stages: Baby, Teen, Adult, and Elder. This evolution is not just time-based; it is influenced by the quality of care (average stats) and the quality of the WiFi environment the pet has inhabited.

### Hardware Integration
The V2 hardware stack is highly integrated, featuring:
- **ESP32-S3:** Provides native USB for flashing and high performance for animations.
- **WS2812-2020 NeoPixels:** Four addressable LEDs provide ambient feedback on the pet's mood and activity (e.g., specific patterns for hunger or resting).
- **Non-blocking Sound:** A retro sound engine uses the ESP32's LEDc PWM peripheral to play chiptune-style sequences without interrupting the main logic loop.
- **Power Management:** Includes a TP4056 charger for Li-Po batteries and MOSFET-controlled backlight dimming for power efficiency.

## Persistence and State

To ensure the pet's progress isn't lost, TamaFi uses the `Preferences` library to store stats, age, and settings in the ESP32's non-volatile storage (NVS). This allows the pet to "survive" reboots and battery swaps, maintaining its personality and growth stage over long periods of time.
