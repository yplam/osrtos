---
title: Melody Machine
summary: Melody Machine is a feature-rich MP3 player and internet radio firmware designed
  for the LilyGO T-LoRa Pager (ESP32-S3). It leverages FreeRTOS for dual-core audio
  processing and the LVGL library to provide a responsive graphical interface with
  support for local microSD playback and WiFi-based streaming.
slug: melody-machine
codeUrl: https://github.com/wadadawadada/melody_machine
version: v0.2
lastUpdated: '2026-04-26'
licenses:
- MIT
image: /202605/melody_machine_0.avif
rtos: freertos
libraries:
- lvgl
topics:
- esp32-firmware
- esp32s3
- internet-radio-player
- lilygo
- music-player
- t-lora-pager
isShow: true
createdAt: '2026-05-28T03:33:54+00:00'
updatedAt: '2026-05-28T03:33:54+00:00'
relatedProjects:
- radiojkk32-multifunctional-internet-radio-player
- esp32-web-radio-evo3
- tinyradio9-for-wt32-sc01-plus
- esper-cdp
- snow-radio
- pixlpal-m1-firmware
---

Melody Machine is a custom firmware designed to transform the LilyGO T-LoRa Pager into a versatile handheld audio device. Built on the ESP32-S3 platform, it provides a comprehensive suite of features for both local media playback and internet-based streaming, all controlled through a polished graphical interface.


## Core Features

The firmware is divided into two primary modes: a local MP3 Player and an Internet Radio streamer. The MP3 player supports standard playback from a microSD card, including a folder browser for directory navigation, shuffle and repeat modes, and a dedicated seek function. For internet radio, the device streams audio via M3U playlists over WiFi, supporting ICY metadata to display station and track information in real-time.

Navigation is handled through a two-level browser system. For local files, users can navigate subdirectories and return to parent folders easily. For radio, the system parses playlist files and allows users to browse individual stations contained within them. The user interface, built with LVGL 9.3, runs on a 480×222 TFT display and offers four switchable themes to customize the visual experience.

![MP3 Player interface](/202605/melody_machine_1.avif)

## Hardware and Controls

The project is tailored for the LilyGO T-LoRa Pager hardware, which features an ESP32-S3 dual-core MCU. Audio output is managed by an ES8311 codec driving both an internal speaker and a headphone jack. The interface utilizes the device's unique input methods: a physical QWERTY keyboard (via a TCA8418 I2C matrix) and a rotary encoder.

### Playback Management

Control is intuitive, mapping common audio functions to the physical keyboard. The rotary encoder is used for scrolling through lists, while keys like `Q`/`A` manage volume and `W`/`D` handle track skipping. A dedicated "Seek Mode" (activated with the `N` key) allows for precise navigation within MP3 tracks using the encoder to jump in 5-second increments.

Settings are persisted as JSON on the SD card at `/melody_machine/settings.json`, ensuring that configurations for WiFi, brightness, equalizer presets, and power-off timers survive reboots and firmware updates.

![Internet Radio streaming interface](/202605/melody_machine_2.avif)

## Technical Architecture

A key design choice in Melody Machine is its dual-core architecture. To ensure a smooth user experience, the firmware splits responsibilities across the ESP32-S3's two cores using FreeRTOS:

*   **Core 1 (Arduino Loop):** Handles the LVGL timer, UI management, and WiFi connectivity. This ensures the interface remains responsive even during heavy processing.
*   **Core 0 (FreeRTOS Task):** Dedicated to the `audioTask`. This high-priority task manages the audio pipeline, including SD card reading, ID3 tag parsing, and Helix-based MP3 decoding. For radio, it manages an ICY stream buffer of 32KB before sending data to the ES8311 codec via I2S.

Communication between the UI and the audio backend is handled via a command queue, while playback state information flows back through volatile global variables.

## Deployment and Configuration

For users looking to flash the firmware without a full build environment, the project provides a pre-built binary and a Python-based GUI flasher tool. This tool simplifies the process by auto-detecting serial ports and providing a visual progress bar during the flashing process to address `0x10000` on the ESP32-S3.

![GUI Flasher tool](/202605/melody_machine_3.avif)

Building from source requires the `arduino-cli` and several specific libraries, including `LilyGoLib` for hardware abstraction and `ESP8266Audio` for the decoding engine. The project uses a custom SD card layout to organize music and playlists, requiring a `/melody_machine/` directory structure for settings, MP3 files, and M3U playlists.
