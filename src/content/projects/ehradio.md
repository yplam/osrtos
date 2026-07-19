---
title: ehRadio
summary: ehRadio is a feature-rich internet radio firmware for the ESP32 platform,
  specializing in the ESP32-S3 for high-performance audio streaming. It features a
  mobile-first WebUI, supports multiple audio decoders like I2S and VS1053, and integrates
  seamlessly with Home Assistant via MQTT.
slug: ehradio
codeUrl: https://github.com/trip5/ehRadio
siteUrl: https://trip5.github.io/ehRadio/
version: 2026.06.03
lastUpdated: '2026-06-04'
licenses:
- GPL-3.0
image: /202606/ehRadio_4.avif
rtos: freertos
libraries:
- spiffs
topics:
- arduino
- ehradio
- esp32
- esp32-radio
- esp32-s3
- esp32s3
- internet-radio
- internet-radio-player
- platformio
- radio
- radio-player
- yoradio
- yoradio-fork
isShow: true
createdAt: '2026-06-04T23:39:58+00:00'
updatedAt: '2026-06-04T23:39:58+00:00'
relatedProjects:
- esp32-web-radio-evo3
- melody-machine
- radiojkk32-multifunctional-internet-radio-player
- atlascube
- snow-radio
- tinyradio9-for-wt32-sc01-plus
---

## Introduction
ehRadio is an advanced internet radio firmware designed to run on the ESP32 ecosystem. While it supports standard ESP32 and ESP32-C3 boards, it is optimized for the ESP32-S3 to take advantage of improved peripherals and processing power. The project allows builders to create a fully functional radio using an ESP32, an audio decoder (such as I2S PCM or VS1053), a display, and various input methods. For certain integrated boards like the ES3C28P, the firmware can run with almost no additional peripherals.

Developed primarily using VS Code and PlatformIO, ehRadio is a fork of the well-known ёRadio (yoRadio) project. It aims to bridge the gap between complex DIY builds and user-friendly consumer devices by providing a web-based flasher and OTA updates, making the firmware accessible even to those who prefer not to dive deep into IDEs.

## Features and Capabilities
ehRadio focuses on increasing usability for end-users while maintaining deep customizability for hardware builders. It inherits a robust control architecture supporting up to two rotary encoders, six buttons, touchscreens, and IR remotes.

### User Experience
The user interface has been significantly overhauled from its predecessor. It features a mobile-first WebUI available in 50 languages, supporting playlist editing, importing, and merging. Integration with the Radio-browser API allows for easy station searching, and a curated list feature enables users to preview and download playlists. For smart home enthusiasts, the firmware offers improved Home Assistant integration via MQTT, alongside Telnet and HTTP control options.

### Builder Flexibility
For hardware builders, the project moves the focus toward the ESP32-S3, recommending 8MB of flash to support all features. It offers extensive support for various audio decoders:
- **I2S PCM decoders** and **VS1053/VS1003** (updated for high bitrate streams).
- **ES8311** codecs common on modern S3 display boards.
- Custom SPI bus pin assignments, allowing displays and audio decoders to share or separate buses (Bus A and Bus B) more flexibly than standard implementations.

## Interface and Control
![ehRadio WebUI mobile interface](/202606/ehRadio_0.avif)

The WebUI is a centerpiece of the project, optimized for mobile browsers to provide a seamless remote control experience. Beyond the web interface, the system supports physical interaction through various hardware peripherals. Almost all system and user default settings are configurable via a `myoptions.h` file, which can be generated using a dedicated web-based tool provided by the project.

## Technical Architecture and Libraries
The codebase relies on specialized audio handling, currently utilizing the `ESP32-audioI2S` and `ESP32-vs1053_ext` libraries. These are tightly integrated to ensure stable playback of internet streams. The project also incorporates a custom command handler, unified error logging, and an optimized RTOS background task for the playback queue to ensure smooth performance even during heavy network activity.

## Hardware Implementation
![Various radio builds using recycled Bluetooth speakers](/202606/ehRadio_1.avif)

Real-world builds often utilize repurposed hardware, such as gutting cheap Bluetooth speakers and fitting them with ESP32-S3 internals. Reliability is emphasized through the use of XH2.54 connectors rather than breadboards or DuPont wires, ensuring stable connections within portable enclosures.

![Internal hardware components and wiring](/202606/ehRadio_3.avif)

## A History of ESP Radios
The project is part of a long lineage of ESP-based audio projects. It traces its roots back to Edzelf’s original Esp-radio from 2016, through Ka-Radio, and eventually to ёRadio. ehRadio represents a modern evolution of these efforts, focusing on the latest ESP32-S3 hardware and modern web standards while maintaining compatibility with the vast ecosystem of DIY radio hardware developed over the last decade.
