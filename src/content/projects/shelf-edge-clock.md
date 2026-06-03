---
title: Shelf Edge Clock
summary: An ESP32-powered digital clock featuring over 250 NeoPixels and a web-based
  management interface. It supports multiple display modes including time, date, temperature,
  humidity, and a scoreboard, integrating with home automation systems via REST APIs.
slug: shelf-edge-clock
codeUrl: https://github.com/CaptSnus/ShelfEdgeClock
star: 1
version: V2.0.1
lastUpdated: '2024-04-29'
rtos: freertos
libraries:
- spiffs
topics:
- arduino
- esp32
- espasyncwebserver
- led
- neopixel
- ntp
- openhab3
- openhab4
- platformio
- spiffs
- wifi
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- 7-segment-clock
- esp32-weatherstationrtc
- elekstube-ips-custom-firmware
- sanjin-intelligent-mechanical-clock
- esptimecast
- desk-weather-clock-geekmagic-s3
---

## Overview

The Shelf Edge Clock is a sophisticated DIY digital timepiece designed to integrate seamlessly into home shelving. Heavily inspired by the 'Digital Clock Smart Shelving' project by DIY-Machines, this implementation adapts the original 3D-printed hardware design to the powerful ESP32 platform. By leveraging the ESP32's Wi-Fi capabilities, the project transforms a standard clock into a connected home device capable of displaying environmental data, sports scores, and countdowns.

The system utilizes over 250 NeoPixels to create a large, vibrant display that is both functional and aesthetically pleasing. It is designed to be more than just a clock; it acts as a secondary display for home automation systems, fetching data from external sources to keep the user informed about their environment.

## Technical Architecture

The project is built on the Arduino framework using PlatformIO, targeting the ESP32-S3-DevKitC-1 or the QT PY ESP32-S3. The firmware manages 266 NeoPixels in total: 252 LEDs dedicated to the digits and 14 LEDs for integrated downlights that highlight items stored within the clock's frame.

### Key Software Components
- **FastLED**: Used for high-performance control of the NeoPixel strands, enabling smooth color transitions and animations.
- **ESPAsyncWebServer**: Provides a responsive web-based GUI for configuration and control, allowing users to change modes and settings from any browser.
- **NTP Integration**: Ensures precise timekeeping by synchronizing with external time servers.
- **REST API Client**: Enables the clock to fetch temperature and humidity data from home automation platforms like openHAB.
- **ElegantOTA**: Facilitates over-the-air updates, allowing the firmware to be updated without physical access to the ESP32's USB port.
- **SPIFFS**: Utilized for on-board storage of web assets and configuration files, reducing the need for external SD cards.

## Features and Functionality

The Shelf Edge Clock offers several distinct operating modes, which can be toggled via the web interface:

- **Clock & Date**: Displays time in 12 or 24-hour formats and dates in European or American styles, with customizable or random color schemes.
- **Environmental Monitoring**: Displays temperature and humidity data retrieved from a local home automation system or weather station.
- **Scoreboard**: A manual or automated scoreboard mode for tracking games or sports scores.
- **Countdown**: A timer mode that transitions from hours/minutes to minutes/seconds as the deadline approaches, ending with a visual 'EndE' alert.
- **Scrolling Mode**: A continuous loop that cycles through time, date, and temperature every few seconds.
- **Downlights**: Independent control of the 14 downlight LEDs with various color options, including per-box customization.

## Hardware and Setup

The hardware build involves 3D printing the digit segments and frame components, which are then mounted to a wooden background. The electronics consist of an ESP32-S3, a 5V 4A switching power supply, and 60 LED/m NeoPixel strips. 

Upon first launch, the clock creates its own Wi-Fi access point (SSID: `Shelf Edge Clock`). Users connect to this AP to configure their local network credentials. Once connected to the home network, the clock fetches time via NTP and begins communicating with configured REST endpoints for environmental data. The brightness of the display can be set manually or automated based on data from the home automation system, ensuring the clock is readable during the day and dim at night.
