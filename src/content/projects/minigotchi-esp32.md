---
title: Minigotchi-ESP32
summary: A security-focused firmware for ESP32 microcontrollers that replicates Pwnagotchi-style
  peer detection and network interaction. It supports Wi-Fi scanning, deauthing, and
  BLE functions while providing an emotional interface through various display modules.
slug: minigotchi-esp32
codeUrl: https://github.com/dj1ch/minigotchi-ESP32
star: 255
version: v3.6.4-beta
lastUpdated: '2026-02-15'
rtos: freertos
libraries:
- tft-espi
- u8g2
topics:
- deauther
- esp
- esp32
- esp32-arduino
- microcontroller
- minigotchi
- networking
- packets
- pwnagotchi
- wifi-hacking
- wifi-network
isShow: true
image: /202603/minigotchi.webp
createdAt: '2026-03-19'
updatedAt: '2026-03-19'
---

Minigotchi-ESP32 is a specialized firmware designed for the ESP32 platform, serving as a port of the original Minigotchi project. It is built to replicate the peer detection and environmental interaction behaviors of the Pwnagotchi, a popular DIY security tool. While the original Pwnagotchi runs on Linux-based hardware like the Raspberry Pi Zero, Minigotchi-ESP32 brings similar capabilities to the more power-efficient and cost-effective ESP32 microcontroller ecosystem.

The project leverages the dual-core capabilities of the ESP32 to handle multiple tasks concurrently, such as Wi-Fi scanning, packet injection, and managing a user interface. It is developed using the Arduino framework and ESP-IDF, ensuring compatibility with a wide range of development boards and peripheral hardware.

## Core Functionality and Security Auditing

At its heart, Minigotchi-ESP32 is designed for network interaction and security research. Its primary features include:

- **Peer Detection**: Replicating the Pwnagotchi's system of detecting other units in the vicinity via beacon frames.
- **Wi-Fi Scanning and Deauthing**: The firmware can scan for access points and, if configured, perform deauthentication attacks. It includes a whitelist feature to prevent accidental disruption of authorized networks.
- **BLE Capabilities**: Utilizing the ESP32's Bluetooth stack for additional interaction and detection features.
- **Parasite Mode**: A unique feature that allows the Minigotchi to communicate with a full Pwnagotchi over a serial connection, acting as a hardware extension or companion.

## Hardware and Display Support

One of the strengths of this port is its extensive support for various hardware configurations. Unlike projects tied to a specific board, Minigotchi-ESP32 can be deployed on a variety of popular modules:

- **M5Stack Series**: Including M5StickC Plus, M5StickC Plus2, M5Cardputer, and M5Atom series.
- **Cheap Yellow Display (CYD)**: Popular ESP32-2432S028R boards.
- **Generic OLEDs**: Support for SSD1306, SH1106, and SSD1305 displays via I2C or SPI.
- **T-Display-S3**: High-performance boards from LilyGO.

## The Emotional Interface

Following the aesthetic of its predecessor, Minigotchi-ESP32 features an emotional interface represented by ASCII-style "faces." These faces are not just cosmetic; they provide immediate visual feedback on the system's state. For example, the **Happy (^-^)** face indicates a successful connection or peer detection, while **Looking around (0-o)** is shown during active Wi-Fi scanning. If the device is performing resource-heavy tasks like sending frames, it displays an **Intense (>-<)** expression. A **Broken (X-X)** face serves as a visual indicator that a system error has occurred, often accompanied by a serial error message.

## Configuration and Deployment

The project is highly configurable through a centralized configuration system. Users can define universal delays, toggle specific features like deauthing or advertising, and set up their Wi-Fi whitelist before flashing. Post-installation, the firmware launches a temporary web server (WebUI), allowing users to finalize settings and input SSIDs for the whitelist through a browser interface without needing to recompile the code. 

By bridging the gap between low-power microcontrollers and security auditing tools, Minigotchi-ESP32 provides a portable, versatile platform for enthusiasts and researchers to explore network environments and peer-to-peer interactions.
