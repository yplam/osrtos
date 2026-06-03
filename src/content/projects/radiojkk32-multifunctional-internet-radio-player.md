---
title: RadioJKK32 - Multifunctional Internet Radio Player
summary: An advanced internet radio player based on the ESP32-A1S Audio Kit, utilizing
  the ESP-ADF framework and FreeRTOS. It features a local web server for remote control,
  support for multiple audio formats, 10-band equalization, and SD card recording
  capabilities.
slug: radiojkk32-multifunctional-internet-radio-player
codeUrl: https://github.com/MacWyznawca/RadioJKK
star: 26
version: v1.1.0
lastUpdated: '2026-01-06'
rtos: freertos
libraries:
- lvgl
- lwip
topics:
- ai-thinker-esp32-a1s
- audio
- esp-adf
- esp-idf
- esp32
- esp32-a1s
- radio
isShow: false
createdAt: '2026-01-18'
updatedAt: '2026-01-18'
relatedProjects:
- esp32-web-radio-evo3
- snow-radio
- melody-machine
- tinyradio9-for-wt32-sc01-plus
- espri-esp-radio-interface
- esper-cdp
---

RadioJKK32 is a comprehensive internet radio solution designed for the ESP32-A1S (ESP32-A1S Audio Kit). Built on the Espressif Audio Development Framework (ESP-ADF) and the ESP-IDF, it transforms the ESP32 into a powerful standalone media player capable of streaming high-quality audio, recording to local storage, and providing a modern user interface through both physical displays and web browsers.

## Core Functionality and Audio Support

The project supports a wide array of audio formats, including MP3, AAC, OGG, WAV, FLAC, OPUS, M4A, and AMR. By leveraging the hardware capabilities of the ESP32-A1S and the ES8388 audio codec, RadioJKK32 provides high-quality decoding and playback. A standout feature is the integrated 10-band equalizer, which includes predefined presets and real-time audio level monitoring. For users looking to archive streams, the system supports recording directly to an SD card in AAC format, complete with automatic folder structures and metadata generation.

## User Interface and Remote Control

RadioJKK32 offers multiple ways to interact with the device:

- **Local Web Server**: A responsive web interface allows users to control volume, select stations, and adjust the equalizer from any device on the local network. It also includes advanced management features like editing, adding, and reordering the radio station list (supporting up to 50 entries).
- **OLED Display**: Support for I2C-based OLED displays (SSD1306 or SH1107) provides a local graphical interface powered by the LVGL library. This interface displays station information, audio levels, and even QR codes for easy WiFi setup.
- **Physical Controls**: The system supports GPIO-based keypads with short and long-press functionality, allowing for quick navigation, volume adjustment, and recording triggers without needing a screen or browser.

## Connectivity and Configuration

Networking is a core component of the project. It utilizes WiFi with automatic provisioning via the ESP SoftAP Prov app or a built-in SoftAP setup mode. For easy discovery on a local network, the device implements mDNS/Bonjour and NetBIOS, allowing users to access the web interface via a friendly URL like `http://radiojkk32.local`. Time synchronization is handled via SNTP.

Configuration is flexible and persistent. Settings such as the current station, volume, and equalizer choices are saved to the ESP32's Non-Volatile Storage (NVS). To ensure flash durability, writes are buffered and only committed after 10 seconds of inactivity. Additionally, users can manage their station lists and WiFi credentials via simple text files on an SD card (`stations.txt`, `settings.txt`, and `eq.txt`).

## Technical Implementation

The project is optimized for modern ESP-IDF versions (5.4.x and 5.5.x). It utilizes a sophisticated audio pipeline that includes resampling and processing stages. To manage memory efficiently, the HTTP server task stack is moved to SPIRAM, and NVS operations are handled by the main task or RTOS timers to prevent blocking the audio stream. The project also includes automatic UTF-8 to ASCII conversion to support Polish diacritics on monochrome displays.
