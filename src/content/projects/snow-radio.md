---
title: Snow Radio
summary: An advanced ESP32-based internet radio application featuring a VS1053 audio
  codec and a real-time spectrum analyzer. It supports touchscreen and gesture-based
  controls, provides a web interface for station management, and integrates OpenWeatherMap
  data for environmental updates.
slug: snow-radio
codeUrl: https://github.com/gitpeut/SnowRadio
star: 5
lastUpdated: '2021-04-08'
rtos: freertos
libraries:
- littlefs
- spiffs
- tft-espi
topics:
- esp32
- gestures
- littlefs
- psram
- touchscreen
- webradios
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- esp32-web-radio-evo3
- tinyradio9-for-wt32-sc01-plus
- radiojkk32-multifunctional-internet-radio-player
- ehradio
- melody-machine
- atlascube
---

## Overview

Snow Radio (Снежное радио) is a sophisticated internet radio project designed for the ESP32 platform. Building upon the foundations of the earlier Orange Radio project, it offers a comprehensive multimedia experience that includes high-quality audio streaming, a visual spectrum analyzer, and multiple user interaction methods. The project is specifically optimized for ESP32 modules with PSRAM to handle the demands of web services, audio buffering, and graphical rendering simultaneously.

## Key Features

Snow Radio is designed to be a flexible and user-friendly music center. Its core capabilities include:

- **Broad Stream Support**: Full support for HTTP and HTTPS internet radio stations, including stream and chunked transfer encoding.
- **Visual Feedback**: A real-time spectrum analyzer powered by VS1053 plugins, providing dynamic visualisations on the display.
- **Multiple Control Interfaces**: Users can interact with the device via a touchscreen (ILI9341 or ST7796), a PAJ7620 gesture sensor, or a mobile-friendly web interface.
- **Metadata Handling**: Automatic collection and display of artist and track information, supporting Western European and Russian (Cyrillic) character sets.
- **Weather Integration**: Real-time weather data from OpenWeatherMap can be displayed on the home screen.
- **Flexible Storage**: Support for LittleFS, SPIFFS, and FFat filesystems for storing station lists, configuration files, and audio patches.

## Technical Architecture

The project is built using the Arduino framework but leverages the underlying FreeRTOS capabilities of the ESP32 for efficient multitasking. The firmware is organized into several dedicated tasks to ensure low-latency performance:

- **Radio Task**: Manages the network connection and data retrieval from streaming servers.
- **Play Task**: Handles the communication with the VS1053 audio codec via SPI.
- **Webserver Task**: Runs an asynchronous web server for remote management.
- **Touch/Gesture Tasks**: Process user input without blocking the audio stream.

To maximize performance, the system uses two separate SPI buses: VSPI for the VS1053 decoder and HSPI for the display. This separation helps maintain high-speed data throughput for both audio and graphics.

## Hardware Requirements

For the best experience, an ESP32 with PSRAM is highly recommended. The standard setup utilizes an ILI9341 320x240 SPI touchscreen, though a branch exists for the larger 480x320 ST7796 display. Audio decoding is handled by the VS1053 series chips, which are patched at runtime to support features like the spectrum analyzer and FLAC decoding.

## Configuration and Customization

Snow Radio is highly configurable through a series of `#define` flags in the main `SnowRadio.ino` file. Developers can enable or disable features such as OTA updates, TLS support for HTTPS, gesture controls, and specific metadata display modes (Sprite, Popup, or Static). 

Station management is simplified through the web interface, allowing users to add, edit, or delete stations without reflashing the firmware. The system stores these settings in a `stations.json` file on the internal flash filesystem. For network security, Wi-Fi credentials and API keys are managed via a separate `wificredentials.h` file, keeping sensitive data out of the main application logic.
