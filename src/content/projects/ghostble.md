---
title: GhostBLE
summary: GhostBLE is a portable BLE privacy scanner and wardriving application designed
  for the M5Stack ecosystem, including the Cardputer and StickC series. Leveraging
  the NimBLE-Arduino library on the ESP32 platform, it provides real-time analysis
  of Bluetooth Low Energy devices, privacy posture heuristics, and GPS-tagged logging
  for security research and education.
slug: ghostble
codeUrl: https://github.com/SmonSE/GhostBLE
version: v1.2.0
lastUpdated: '2026-04-26'
licenses:
- MIT
rtos: freertos
libraries:
- nimble
- h2zero-esp-nimble-cpp
topics:
- ble
- ble-scanner
- bluetooth
- bluetooth-arduino
- bluetooth-low-energy
- cardputer
- cardputer-adv
- esp32
- esp32-arduino
- iot-security
- iot-security-testing
- iot-security-tools
- m5stack
- m5stack-cardputer
- privacy
- privacy-protection
- privacy-tools
- security-research
- wardriving
isShow: true
image: /202604/clawputer.webp
createdAt: '2026-04-27T00:35:51+00:00'
updatedAt: '2026-04-27T00:35:51+00:00'
---

## Navigating the BLE Landscape with GhostBLE

GhostBLE is more than just a simple scanner; it is a specialized tool designed for security researchers and enthusiasts to explore the often-invisible world of Bluetooth Low Energy (BLE) privacy. Operating on portable M5Stack hardware like the Cardputer and M5StickC Plus 2, it transforms these compact ESP32-based devices into powerful reconnaissance stations. 

At its core, GhostBLE focuses on "privacy posture." While many BLE scanners simply list device names, GhostBLE digs deeper, analyzing whether a device is leaking unencrypted identifiers or using Resolvable Private Addresses (RPA) to prevent tracking. It categorizes exposure into tiers, providing a clear privacy score that helps users understand the security implications of the devices surrounding them.

### Intelligent Detection and Fingerprinting

One of the standout features of GhostBLE is its ability to identify specific hardware based on advertisement patterns and GATT profiles. It comes pre-configured to detect popular devices such as the Flipper Zero, Tesla vehicles (via iBeacon and GATT service matching), and even BLE spam tools like CatHack or Apple Juice. 

For those involved in the "Pwnagotchi" ecosystem, GhostBLE acts as both a client and server for PwnBeacons. It can detect nearby peers, read their identity and "face" data via GATT, and even update "pwnd" counters dynamically. This makes it a perfect companion for users of PwnBook or Palnagotchi.

### Wardriving and Data Logging

The project is built for movement. With support for dual GPS sources (Grove UART and LoRa CAP), GhostBLE allows for wardriving—logging BLE devices alongside their geographic coordinates. The data can be exported in WiGLE-compatible CSV formats, enabling users to map out Bluetooth environments over large areas. 

Logging is handled through multiple channels. While the Cardputer saves detailed per-category logs to a microSD card, all supported devices can broadcast real-time discovery data to a web-based dashboard. By enabling a local WiFi Access Point, GhostBLE serves a WebSocket-driven interface accessible from any browser, providing a live feed of the scanning process.

### Gamified Exploration

To make the process of wireless reconnaissance more engaging, GhostBLE introduces an XP (Experience Points) system. Users earn points for various activities, such as discovering new devices, successfully establishing GATT connections, or identifying suspicious hardware. This progress is persisted to storage and visualized on the device's display, accompanied by **NibBLEs**—a context-sensitive mascot that reacts to the scanning environment with different expressions and speech bubbles.

### Technical Foundation

The project is built on the ESP32 platform using the Arduino framework, specifically utilizing the NimBLE-Arduino library for a more memory-efficient and performant Bluetooth stack compared to the standard ESP32 BLE implementation. The modular architecture separates the application logic (gamification, interaction) from the infrastructure layer (BLE, GPS, storage), making it a robust codebase for further development and experimentation in the realm of embedded security tools.
