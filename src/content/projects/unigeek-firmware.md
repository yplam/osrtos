---
title: UniGeek Firmware
summary: UniGeek is a comprehensive multi-tool firmware for ESP32-based handheld devices,
  offering a suite of tools for WiFi security, Bluetooth analysis, and hardware module
  interfacing. Built on the Arduino framework and FreeRTOS, it supports a wide variety
  of hardware including M5Stack, LilyGO, and custom DIY builds.
slug: unigeek-firmware
codeUrl: https://github.com/lshaf/unigeek
siteUrl: https://unigeek.xid.run/
version: 1.6.0
lastUpdated: '2026-04-20'
rtos: freertos
libraries:
- tft-espi
- littlefs
- lwip
- nimble
topics:
- esp32
- hacking
- lilygo
- m5
- pentesting
isShow: false
createdAt: '2026-04-21T05:37:54+00:00'
updatedAt: '2026-04-21T05:37:54+00:00'
---

UniGeek is a versatile, feature-rich firmware designed to transform ESP32-based handheld devices into powerful multi-tools for security auditing, network analysis, and hardware experimentation. Developed with a focus on portability and functionality, UniGeek leverages the power of the ESP32 ecosystem to provide a unified interface for a diverse range of hardware modules and wireless protocols.

### Broad Hardware Support
One of UniGeek's most impressive features is its wide-ranging hardware compatibility. It is designed to run on popular devices like the M5Stack Cardputer, M5StickC Plus 2, and LilyGO T-Display, as well as more specialized hardware like the LilyGO T-Lora Pager and the Cheap Yellow Display (CYD). The project handles the complexities of different screen controllers, input methods (including keyboards, touchscreens, and rotary encoders), and pin configurations, making it a flexible choice for various form factors.

### Advanced Wireless Capabilities
UniGeek excels in wireless exploration. For WiFi, it offers everything from basic network scanning and signal visualization to advanced security testing tools. Users can perform Man-in-the-Middle (MITM) attacks, deploy Evil Twin access points with captive portals, and capture EAPOL handshakes for offline WPA2 cracking. It even includes a CCTV sniffer to discover and stream video from network cameras.

On the Bluetooth front, UniGeek provides tools for BLE analysis and device spamming, supporting Android Fast Pair, Apple Continuity, and Samsung Galaxy Watch pairing protocols. It also features WhisperPair, a tool specifically designed to test for CVE-2025-36911 vulnerabilities in Google Fast Pair devices.

### Hardware Module Integration
Beyond built-in wireless, UniGeek acts as a bridge for external hardware modules:
- **Sub-GHz (CC1101):** Capture, replay, and jam RF signals across a wide frequency range (300–928 MHz), compatible with Flipper Zero signal formats.
- **NRF24L01+:** Perform 2.4 GHz spectrum analysis and test for MouseJack vulnerabilities in wireless peripherals.
- **NFC (MFRC522):** Read and clone MIFARE Classic cards, perform dictionary attacks, and recover keys using advanced techniques like the Darkside or Static Nested attacks.
- **GPS:** Full support for wardriving, logging WiFi and BLE devices with GPS coordinates in Wigle-compatible formats.
- **Infrared:** Capture and replay IR signals with a massive built-in database of remote codes for TVs and appliances.

### Gamified Experience and Utility
UniGeek introduces a unique "Character Screen" that gamifies the experience. Users earn experience points (EXP) and ranks—from Novice to Legend—by unlocking achievements across thirteen different domains like WiFi, NFC, and Games. This system encourages exploration of the firmware's deep feature set.

For daily utility, the firmware includes a robust file manager, QR code and barcode generators, and a web-based file manager for easy data transfer over WiFi. It also features several built-in games like Wordle and a HEX Decoder to pass the time between audits.

### Technical Architecture
UniGeek is built using the PlatformIO ecosystem and the Arduino framework. Under the hood, it utilizes FreeRTOS for task management, ensuring responsive UI performance even while performing intensive wireless operations. It relies on `TFT_eSPI` for its high-performance graphics and `LittleFS` for reliable on-board storage, with seamless fallback to SD cards when available. The project is highly modular, with a clean separation between board-specific hardware implementations and the core application logic.
