---
title: Pocket Gone
summary: A diagnostic and silencing tool for Bluetooth speakers built on the ESP32
  microcontroller. It provides features for monitoring RF congestion in Bluetooth
  frequencies and identifying devices in pairing mode, with support for OTA updates.
slug: pocket-gone
codeUrl: https://github.com/ronibandini/tallerPocketGone
siteUrl: https://www.scribd.com/document/895676548/Manual-de-Pocket-Gone
star: 25
lastUpdated: '2026-01-28'
rtos: freertos
topics:
- bluetooth
- esp32
- pocket-gone
- reggaetonbegone
- speakers
isShow: true
image: /202602/taller-pocket-gone.webp
createdAt: '2026-02-06'
updatedAt: '2026-02-06'
relatedProjects:
- ghost-esp
- nrfbluenullifier
- ghostble
- esp32-bluejammer
- pathshield
- esp32-ble-ota-arduino
---

Pocket Gone is a specialized diagnostic tool designed for analyzing and managing Bluetooth speaker environments. Developed primarily for the ESP32 platform, it offers a range of features from identifying congested RF channels to a specific silencing mode intended for use with the user's own equipment.

The project is structured as an educational and practical tool, often used in workshops. It leverages the ESP32's wireless capabilities to scan the 2.4GHz spectrum used by Bluetooth devices. In its fourth iteration, the tool introduced a dedicated diagnostic mode accessible via a serial interface at 115200 baud. To trigger this mode, users must physically bridge pin D25 to GND using a jumper cable, allowing the device to estimate channel congestion and list nearby devices in pairing mode.

One of the core components of the repository is the `getMacOta.ino` sketch. This utility is essential for initial setups, as it helps users identify their device's MAC address and prepares the hardware for firmware deployment. When the sketch runs, it creates a WiFi Access Point with a unique SSID (e.g., `PocketGone:AB:12:34...`). Users can then connect to this network and navigate to a local web server at 10.10.10.1 to upload new firmware binaries using the ESP2SOTA library.

Technically, the project utilizes the Arduino framework for ESP32, which operates on top of the FreeRTOS kernel. It makes extensive use of the ESP32's networking stack, including `WiFi.h` and `WebServer.h`, to provide a user-friendly interface for maintenance and updates. The serial monitor functionality allows developers to verify if the RF module is correctly wired and initialized, and if physical button presses are being recognized by the software.

Key capabilities include:
- RF congestion estimation for Bluetooth frequencies.
- Listing of nearby Bluetooth devices currently in pairing mode.
- Serial monitor diagnostics for hardware initialization and button press verification.
- Web-based Over-The-Air (OTA) firmware update system via ESP2SOTA.

The project emphasizes community involvement, encouraging users to share photos of their custom builds and report technical issues through a structured support system. It serves as both a functional utility for RF analysis and an educational platform for learning about ESP32 development and wireless communication.
