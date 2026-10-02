---
title: Purplx — Cyberdeck OS for M5Stack Cardputer ADV
summary: Purplx is a comprehensive cyberdeck operating system designed for the M5Stack
  Cardputer ADV (ESP32-S3). It features a wide array of tools including a WiFi CSI
  human-presence radar, a firmware launcher for booting guest binaries, off-grid survival
  guides, and a collection of retro games. The project utilizes FreeRTOS and the NimBLE
  stack on the ESP32-S3 platform to provide a multi-functional cyberpunk utility environment.
slug: purplx-cyberdeck-os-for-m5stack-cardputer-adv
codeUrl: https://github.com/purplxhazee/Purplx-
version: V1.0.1
lastUpdated: '2026-07-01'
licenses:
- NOASSERTION
rtos: freertos
libraries:
- nimble
topics:
- cardputer-adv
- cyberdeck
- esp32
- firmware
- m5stack
- platformio
isShow: false
createdAt: '2026-07-31T01:36:39+00:00'
updatedAt: '2026-07-31T01:36:39+00:00'
relatedProjects:
- esp32berry
- loadout-for-m5stack-tab5
- saturn
- unigeek-firmware
- poseidon
- bruce-firmware
---

Purplx is a full-featured cyberdeck firmware specifically engineered for the M5Stack Cardputer ADV. Rather than focusing on a single utility, Purplx aims to be a complete "cyberpunk operating system," providing a cohesive environment for security research, off-grid survival, and everyday digital utilities. Built on the ESP32-S3 platform, it leverages the dual-core capabilities of the chip and FreeRTOS for task management, ensuring a responsive user experience across its diverse application suite.

### Hardware and Dual-Screen Architecture

The project is optimized for the M5Stack Cardputer ADV, which features an ESP32-S3 with 8 MB of flash and OPI PSRAM. One of the most striking features of Purplx is its support for a dual-screen configuration. While it uses the Cardputer's built-in ST7789 135×240 screen as a HUD or context panel for real-time stats and navigation, it also supports an external ILI9341 320×240 display via SPI. This "big screen" acts as the primary workspace for games, text editing, and complex data visualizations, while the HUD provides persistent system information.

### The Firmware Launcher: A Multi-Boot Powerhouse

One of the standout technical achievements of Purplx is its built-in firmware launcher. This feature transforms the Cardputer into a multi-tool by allowing users to boot "guest" firmwares—such as Marauder or Bruce—directly from the Purplx interface. 

This is achieved through clever partition management. Purplx resides in a permanent `factory` partition. Using the `CONFIG_BOOTLOADER_APP_ROLLBACK_ENABLE` feature of the ESP-IDF, guest firmwares are flashed into an `ota_0` slot. Because guest firmwares typically do not call the "I'm valid" API, the system treats them as one-time boots. This creates a fail-safe environment: no matter what happens in the guest firmware, a simple physical reset returns the user to the Purplx OS every single time.

### Security and Sensing Capabilities

Purplx includes a WiFi CSI (Channel State Information) Radar, which functions as a passive human-presence detector. By monitoring how ambient WiFi signals are disrupted by movement, the system can detect people without the need for cameras or microphones. The implementation includes a live waterfall heatmap and amplitude graphs on the big screen, while the HUD displays motion scores and packet counts. 

Additionally, the "Learn" module provides an offline library of ethical hacking lessons. These lessons cover fundamental concepts like Deauthentication attacks, Captive Portals, and BLE advertising, providing a legal and educational path for beginners to understand wireless security mechanics.

### Off-Grid Survival and EDC Tools

Designed for reliability in any environment, Purplx includes several "Off-Grid" tools that require no internet or SD card. These include:
- **Survival Guide**: A scrollable reference for first aid, water purification, fire starting, and navigation.
- **Morse Trainer & Sender**: A tool to learn Morse code and transmit messages using the device's backlight and speaker.
- **SOS Beacon**: A continuous emergency signaling tool.

The system also packs a suite of Everyday Carry (EDC) utilities, including a text editor (Notes), a file browser for SD card management, a unit converter, and a calculator. For entertainment, it features a virtual pet inspired by Tamagotchi—which saves its state to NVS to age in real-time even when powered off—and ten different games including Chess, Tetris, and a cyberpunk roguelike called Netrun.

### Technical Foundation

Under the hood, Purplx is built using the Arduino framework on top of ESP-IDF. It utilizes the NimBLE stack for efficient Bluetooth operations and M5Unified for hardware abstraction. The project's partition layout is specifically tuned for the 8MB flash of the Cardputer ADV, balancing space between the primary OS, guest firmware slots, and a key-value store for user settings and themes. 

With eight built-in color themes (including a red-on-black "NIGHT" mode) and multiple animated backgrounds like Matrix-style code rain, Purplx offers a highly customizable and immersive interface for the modern hardware enthusiast.
