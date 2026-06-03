---
title: RGBLight - IoT RGB LED Controller
summary: A versatile IoT RGB lighting system developed with Arduino for ESP8266, ESP32,
  and Raspberry Pi Pico. It supports various LED configurations like strips and rings,
  offering customizable effects, music-reactive modes via a PC client, and a web-based
  animation editor.
slug: rgblight-iot-rgb-led-controller
codeUrl: https://github.com/DawningW/RGBLight
star: 17
lastUpdated: '2025-05-18'
rtos: freertos
libraries:
- littlefs
topics:
- arduino
- esp32
- esp8266
- rgb
- ws2812
isShow: false
createdAt: '2026-02-16'
updatedAt: '2026-02-16'
relatedProjects:
- smart-led
- esp32-32x32-rgb-matrix-controller
- moonlight-8266
- esp8266-home-automation
- neopixel-library-for-raspberry-pi-pico
- openhoop
---

RGBLight is a comprehensive IoT solution designed to bring sophisticated lighting effects to various hardware platforms. Built using the Arduino framework, the project targets popular microcontrollers including the ESP8266, ESP32 (including C3 and S3 variants), and the Raspberry Pi Pico W. It is more than just a simple LED driver; it is a full-featured ecosystem that includes a firmware core, a web-based management interface, and a dedicated animation editor.

## Hardware Versatility

One of the standout features of RGBLight is its support for multiple physical forms. Whether you are using a standard WS2812B LED strip, a circular LED ring, or a custom-designed square matrix, the project provides a flexible interface for adaptation. The repository even includes PCB schematics for a 21-LED circular board and 3D models for a projection lamp housing, making it a complete hardware-software package for makers.

## Advanced Lighting and Music Sync

The lighting capabilities go far beyond simple color picking. RGBLight supports various modes such as breathing, streaming, and rainbow effects, all with customizable parameters. Most notably, its music rhythm mode differs from traditional microphone-based solutions. Instead of relying on low-quality onboard microphones that are susceptible to ambient noise, it uses a companion application on a PC or smartphone to capture high-fidelity audio. This audio is processed via specialized algorithms on the host device and then transmitted to the microcontroller, resulting in significantly more accurate and visually impressive music synchronization.

## Web-Based Control and Animation Editing

For users who want even more control, RGBLight integrates a powerful web-based animation editor based on Theatre.js. This allows users to create complex lighting sequences with keyframes and transitions directly in their browser. These animations are saved to the device's internal filesystem and can be played back at any time. The web interface also serves as a management portal, allowing for file manipulation, configuration changes, and firmware updates.

## Technical Implementation

Technically, the project leverages several robust libraries to achieve its functionality:
- **FastLED**: Handles the low-level LED signal generation for WS2812B and similar LEDs.
- **ArduinoJson**: Manages configuration data and animation sequences.
- **WebSockets**: Facilitates real-time communication between the web client and the hardware for low-latency control.
- **LittleFS**: Used for storing the web interface assets and user-generated animations on the flash memory.

The project is optimized for the PlatformIO ecosystem, providing automated scripts for building the frontend assets and packaging OTA (Over-The-Air) update binaries. This OTA system is particularly clever; it bundles the firmware binary and the LittleFS resource files into a single package to ensure that user configurations and custom animations are preserved during updates.

## Getting Started

To get started with RGBLight, developers can use PlatformIO to compile and flash the project. The `src/config.h` file serves as the central hub for configuration, where users can define their pin mappings and LED counts. For those using the Arduino IDE, the project provides a stub `.ino` file and clear instructions on installing the necessary dependencies like the ESP32 or RP2040 cores. Once flashed, the device hosts its own web server, allowing users to connect and begin customizing their lighting experience immediately.
