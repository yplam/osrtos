---
title: p3a — Pixel Art Player
summary: A Wi-Fi-enabled pixel art player built on the ESP32-P4 platform featuring
  multi-buffer rendering for gapless playback of animated WebP, GIF, and PNG files.
  It integrates with the Makapix Club social network via secure MQTTS and provides
  a local web interface for device management.
slug: p3a-pixel-art-player
codeUrl: https://github.com/fabkury/p3a
siteUrl: https://makapix.club/
star: 46
version: v0.7.2-dev
lastUpdated: '2026-01-21'
rtos: freertos
libraries:
- littlefs
- spiffs
- lwip
topics:
- art
- diy-electronics
- diy-project
- embedded
- esp32
- esp32-p4
- pico-8
- pixel-art
- pixelart
isShow: true
image: /202601/p3a-2.webp
createdAt: '2026-01-22'
updatedAt: '2026-01-22'
relatedProjects:
- printpoop-retro-pixel-smart-display-for-bambu-lab-a1
- circuitpal
- bitmap16-dx
- esp32-web-radio-evo3
- esp8266-sound-effects-i2s-web-trigger
- deskpet-for-m5stack-cardputer
---

## Overview

p3a is a sophisticated Wi-Fi pixel art player designed to bring digital art into the physical world. Built on the high-performance ESP32-P4 SoC, it functions as a 4-inch smart art frame that connects to the Makapix Club social network. The project focuses on high-quality, gapless playback of complex animations, offering a seamless visual experience that handles transparency and alpha channels across multiple image formats.

## Hardware Architecture

The project is specifically tailored for the Waveshare ESP32-P4-WIFI6-Touch-LCD-4B development board. This hardware choice provides a unique dual-core environment:

- **Main MCU**: The ESP32-P4 handles the heavy lifting of image decoding, multi-buffer rendering, and the touch interface.
- **Co-processor**: An ESP32-C6 manages Wi-Fi 6 and Bluetooth Low Energy (BLE) connectivity, ensuring that network tasks do not interfere with smooth animation playback.
- **Display**: A 4-inch square 720×720 IPS display with 24-bit color and a 5-point capacitive touchscreen.
- **Storage**: 32MB of PSRAM and 32MB of flash, supplemented by a microSD card slot for local artwork storage.

## Seamless Playback and Format Support

One of the standout technical features of p3a is its robust multi-buffer rendering pipeline. This architecture ensures freeze-free, gapless playback even when dealing with high-frame-rate animations or potentially corrupt files. The player supports a wide array of formats, including:

- **Animated WebP and GIF**: Full support for animations with transparency.
- **Still PNG**: Supports alpha channels for complex layering.
- **JPEG**: Utilizes hardware acceleration for efficient decoding.

The system also preserves aspect ratios for non-square artworks, centering them and allowing for configurable background colors to match the user's preference.

## Connectivity and Control

p3a offers four distinct ways to interact with the device, making it highly flexible for different user environments:

1.  **Touchscreen**: Intuitive gestures for changing artwork, adjusting brightness, and rotating the screen.
2.  **Local Web UI**: A browser-based interface accessible at `http://p3a.local/` for full device configuration within a LAN.
3.  **REST API**: Enables integration into home automation systems or custom scripts.
4.  **Remote MQTTS**: Secure remote control via the Makapix Club backend using MQTT over TLS.

## Robust OTA Update System

The firmware includes a sophisticated Over-the-Air (OTA) update manager. Beyond simple wireless updates, it features SHA256 integrity verification and automatic rollback protection. If a new firmware version fails to boot three times, the system automatically reverts to the previous stable version. Additionally, the p3a firmware can automatically update the ESP32-C6 Wi-Fi co-processor's firmware when necessary, ensuring the entire hardware stack remains current.

## Makapix Club Integration

By registering the device at Makapix Club, users can stream individual artworks or entire curated channels (such as "Promoted Artworks") directly to their frame. This cloud connectivity transforms the device from a static player into a dynamic window into the pixel art community, with upcoming features including the ability to "like" artworks and view community comments directly on the device screen.
