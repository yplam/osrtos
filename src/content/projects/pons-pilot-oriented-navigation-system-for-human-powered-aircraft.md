---
title: 'PONS: Pilot Oriented Navigation System for Human-Powered Aircraft'
summary: A specialized GNSS navigation system designed for human-powered aircraft
  pilots, specifically optimized for the Japan International Birdman Rally at Lake
  Biwa. It features a dual-core architecture on the Raspberry Pi Pico 2 to handle
  high-speed TFT map rendering, GPS tracking, and SD card data logging simultaneously.
slug: pons-pilot-oriented-navigation-system-for-human-powered-aircraft
codeUrl: https://github.com/MasaoC/GPS-TFT-Map_PONS
star: 12
version: '0.87'
lastUpdated: '2026-02-26'
rtos: ''
libraries:
- tft-espi
topics:
- arduino
- raspberry-pi-pico
- rp2350
- tft-display
isShow: true
image: /202602/gps-tft.webp
createdAt: '2026-02-28'
updatedAt: '2026-02-28'
---

## Overview

PONS (Pilot Oriented Navigation System) is a specialized navigation device designed specifically for pilots of human-powered aircraft (HPA). Developed to support competitors in the Japan International Birdman Rally at Lake Biwa, the system provides critical flight data including GNSS-based positioning, ground speed, and magnetic heading on a high-refresh-rate TFT display. 

The project is currently in its fifth and sixth iterations, moving to the Raspberry Pi Pico 2 (RP2350) to take advantage of its increased processing power and dual-core architecture. This allows the system to maintain a responsive user interface while simultaneously handling background tasks like SD card logging and high-fidelity audio playback.

## Key Features

- **Specialized Navigation Display**: Features a 2.8-inch or 2.4-inch TFT display with a custom UI optimized for high-stress flight environments. It provides real-time mapping, track-up or north-up modes, and visual turn indicators.
- **Dual-Core Architecture**: Utilizes both cores of the RP2350. Core 0 is dedicated to the primary flight loop (GPS parsing, navigation calculations, and UI rendering), while Core 1 manages asynchronous tasks such as SD card I/O, BMP map loading, and WAV file audio playback.
- **Hybrid Mapping System**: Supports both vector-based polygon maps (pre-registered coordinates for Lake Biwa and Japan) and bitmap-based imagery. Users can download Google Maps API imagery via a provided Python tool and store it on an SD card for high-detail background maps.
- **Competition-Specific Modes**: Includes an "Auto 10km" mode designed for the specific rules of the Birdman Contest, automatically managing destination waypoints for the 10km turn-back course.
- **Audio Guidance**: Integrated voice warnings and tone-based alerts for course deviations, destination changes, and system status, ensuring the pilot can stay informed without constantly staring at the screen.
- **Integrated Logger**: Automatically records latitude, longitude, speed, and time to an SD card at 1Hz intervals for post-flight analysis.

## Technical Implementation

The system is built on the Arduino framework for the Raspberry Pi Pico. To achieve the high frame rates required for smooth map rotation and scaling, the project utilizes the `TFT_eSPI` library configured for 8-bit parallel communication using the Pico's Programmable I/O (PIO) blocks. This hardware-accelerated approach significantly reduces the CPU overhead for screen updates.

Navigation logic involves Mercator projection calculations to convert GPS coordinates into screen pixels. The system also implements a sliding window average for calculating turn rates (degrees per second), which feeds into the audio warning system. If a pilot deviates significantly from the target course, the system calculates the necessary steer angle and triggers voice prompts like "Turn Right" or "Turn Left."

## Hardware Support

The project is designed around a custom PCB (KiCad files included) and a 3D-printed lightweight case. Recommended components include:
- **Microcontroller**: Raspberry Pi Pico 2 (RP2350).
- **Display**: Newhaven Display 2.4" or 2.8" TFT panels (ST7789 or ILI9341 controllers).
- **GNSS**: Supports NMEA0183 modules such as the ublox M-10Q or Quectel LC86G.
- **Storage**: MicroSD card for map tiles and flight logs.

## Getting Started

Developers looking to build or modify PONS can find the primary logic in `GPS_TFT_map.ino`. The project structure is modular, with dedicated files for GPS handling (`gps.cpp`), SD management (`mysd.cpp`), and navigation math (`navdata.cpp`). Configuration for different GNSS modules or hardware versions is managed via `settings.h`. For those interested in the mapping tools, the `tools` directory contains Python scripts for processing Google Maps imagery into the specific BMP format required by the device.
