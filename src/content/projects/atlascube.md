---
title: AtlasCube
summary: AtlasCube is a feature-rich internet radio and smart clock firmware built
  for the ESP32-S3 using the ESP-ADF and LVGL libraries. It supports streaming various
  audio formats, Bluetooth A2DP/HFP via external modules, and local SD card playback,
  all managed through a comprehensive on-device GUI and a standalone web interface.
  The project is designed for independence from cloud services, offering local MQTT
  control, OTA updates, and a customizable event system.
slug: atlascube
codeUrl: https://github.com/marcinozog/AtlasCube
siteUrl: https://atlascube.net/
version: v0.45.0
lastUpdated: '2026-07-17'
licenses:
- MIT
image: /202607/AtlasCube_0.avif
rtos: freertos
libraries:
- lvgl
- lwip
- spiffs
topics:
- audio-streaming
- bluetooth
- c
- cpp
- embedded
- esp32
- esp32-s3
- firmware
- internet-audio
- internet-radio
- iot
- lvgl
- mqtt
- streaming
- touchscreen
- webradio
- wifi
isShow: true
createdAt: '2026-07-19T00:30:20+00:00'
updatedAt: '2026-07-19T00:30:20+00:00'
---

AtlasCube is a sophisticated hobby project that transforms a generic ESP32-S3 development board into a powerful internet radio and smart clock. It is designed to be entirely self-contained, running all services on-device without any cloud dependencies. The firmware manages internet radio streaming, displays a customizable clock, handles reminders, and provides a comprehensive web UI for configuration. 


## Core Audio Capabilities
At its heart, AtlasCube is a high-performance audio streamer. Utilizing the Espressif Audio Development Framework (ESP-ADF), it supports MP3, AAC, and FLAC streams. It uniquely handles HLS live streams by demuxing MPEG-TS segments on the fly and includes a specialized podcast mode. This mode treats episodes as finite streams, allowing the device to remember playback positions and resume mid-episode via HTTP Range requests.

![AtlasCube Radio Interface with Metadata](/202607/AtlasCube_2.avif)

Audio quality is managed through a 10-band parametric equalizer and custom DSP elements. Beyond internet streaming, the device supports Bluetooth audio (A2DP sink and HFP hands-free) via an external QCC5125 module and local music playback from a microSD card. A hardware I2S multiplexer (74HC157D) is used to switch between the ESP32-S3 and the Bluetooth module's audio outputs.

## User Interface and Customization
The device features a graphical user interface built with the LVGL library. It supports a wide variety of displays, from standard SPI-based ILI9341 panels to high-resolution QSPI AMOLED screens. Navigation is handled through a combination of a rotary encoder and touch gestures (swipes and taps).

The "Home Hub" serves as the primary interface, featuring an adaptive clock face that changes based on the active audio source. Users can customize the look and feel of their device through a visual web editor, which allows for positioning widgets, setting background wallpapers from SD cards or URLs, and adjusting theme opacity. 

## Smart Features and Screensavers
AtlasCube includes several ambient display modes that activate after an idle timeout. The "Dashboard" screensaver can poll any JSON HTTP/HTTPS endpoint to display real-time data such as weather, crypto prices, or exchange rates. The "Photo Frame" mode cycles through images stored on a microSD card with various transition effects like wipes and dissolves.

![Wiring Diagram for ILI9341 Display](/202607/AtlasCube_16.avif)

The system also includes a robust event and reminder engine. Users can set recurring notifications for birthdays or anniversaries, which trigger on-screen alerts and buzzer melodies. It even supports voice notifications, where the device plays spoken clips synthesized via a companion Android app.

## Connectivity and Management
AtlasCube is managed through a built-in web server and WebSocket interface, providing real-time state synchronization. The web UI includes tools for station management, a file manager for both internal SPIFFS and the SD card, and an MQTT dashboard. 

![AtlasCube Web UI Configuration Dashboard](/202607/AtlasCube_19.avif)

The MQTT client allows the device to be integrated into home automation systems like Home Assistant, enabling remote control and the display of user-defined widgets. Maintenance is simplified through an OTA (Over-The-Air) update system and an automatic update check that notifies users of new firmware or web UI releases.

## Hardware and Build System
The project targets the ESP32-S3 MCU with 16MB of flash and OctoSPI PSRAM. While it is developed on a custom "Atlas Hub" board, it can be adapted to various generic dev boards. A key feature of the software design is the ability to remap GPIO pins at runtime via a setup page, allowing a single binary build to support different hardware wiring layouts. For developers, the project provides a streamlined build process using ESP-IDF v5.5.4 and a custom Python-based flash script that automates environment setup and firmware deployment.
