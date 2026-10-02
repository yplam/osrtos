---
title: Midad
summary: Midad is an open-source firmware for Xteink e-ink devices, specifically engineered
  for Arabic script and right-to-left languages. Running on the ESP32-C3 platform
  with FreeRTOS, it provides a comprehensive e-reading experience with advanced text
  shaping, OTA updates, and a unique suite of integrated applications like a gym logger
  and Tasbih counter.
slug: midad
codeUrl: https://github.com/sfoulad/midad-by-foulad
siteUrl: https://midad.one
version: v1.8.57
lastUpdated: '2026-08-12'
licenses:
- MIT
image: /202609/midad.webp
rtos: freertos
libraries:
- h2zero-esp-nimble-cpp
- nimble
- lwip
- platformio-platformio-core
topics:
- arabic
- e-reader
- eink
- epub
- esp32-c3
- firmware
- opds
- rtl
isShow: true
createdAt: '2026-08-12T14:11:29+00:00'
updatedAt: '2026-08-12T14:11:29+00:00'
relatedProjects:
- duet
- papyrix-reader
- crumble
- zereader
- webscreen-software
- sha2017-badge-firmware
---

## Introduction to Midad

Reading Arabic on digital devices has historically been a challenge due to the complexities of script shaping and right-to-left (RTL) layout requirements. Midad—the Arabic word for "ink"—is an open-source firmware project designed to solve this problem for the e-ink medium. Developed as a specialized fork of the CrossPoint Reader, Midad is tailored for Xteink X3 and X4 devices, transforming them into e-readers that treat Arabic, Persian, Ottoman Turkish, and Kurdish as first-class citizens.

At its core, Midad is more than just a font pack. It is a complete reimagining of the e-reader interface, featuring mirrored UI layouts, translated menus, and an intelligent page-turn system that automatically swaps button directions so that "forward" always feels natural for RTL readers.

## Hardware and Technical Architecture

The firmware targets the ESP32-C3 microcontroller, a choice that presents significant engineering constraints. With only approximately 380KB of usable RAM, the system must be extremely efficient. To handle large EPUB files and complex text rendering without crashing, Midad employs an aggressive caching strategy. 

The system parses and caches book chapters, metadata, and CSS rules directly to the SD card. This ensures that subsequent loads are near-instantaneous and RAM usage remains stable even during long reading sessions. The project is built using the PlatformIO ecosystem, leveraging the Arduino framework on top of FreeRTOS to manage concurrent tasks like Wi-Fi connectivity, BLE synchronization, and the e-ink display refresh cycles.

## Advanced Arabic Text Shaping

The standout feature of Midad is its custom text-shaping engine. Unlike standard readers that often struggle with disconnected letters or incorrect diacritic placement, Midad ensures proper letter shaping and justified lines that mimic a physical mushaf. It includes a bundled Quran in full Uthmani script, complete with proper ayah markers. 

For developers and power users, Midad offers a sophisticated font management system. While it ships with Noto Naskh and Tajawal, users can convert any TTF/OTF font into the device-ready `.cpfont` format using a specialized Python script. This script includes a `--reposition-marks` flag, which is essential for rendering Arabic harakat (tashkeel) correctly by accounting for OpenType GPOS tables that many simple converters ignore.

## A Feature-Rich Ecosystem

Midad extends the utility of an e-reader by integrating a suite of "mini-apps" directly into the firmware. These aren't separate downloads but are built into the system image:

*   **Reading Statistics**: A monthly heatmap and daily streaks help users track their progress against configurable goals.
*   **Gym Tracker**: A 7-day workout split logger that remembers weights and reps, even displaying exercise photos on the e-ink screen.
*   **Tasbih Counter**: A digital dhikr counter that uses the device's physical side buttons for tactile feedback, complete with yearly statistics.
*   **Integrated Games**: Built-in versions of Snake, Tetris, Sudoku, and Maze for breaks between reading sessions.
*   **Midad App Integration**: The firmware pairs with a mobile app via Wi-Fi for QR-based sign-in, library management, and cross-device page synchronization.

## Connectivity and Updates

Despite being an embedded project, Midad offers modern connectivity features. It supports Over-The-Air (OTA) updates directly from GitHub releases, meaning users only need to flash the device once via USB. Subsequent updates are handled over Wi-Fi. It also includes a built-in web server for wireless file transfers and settings management, allowing users to upload books or tweak device configurations through a browser-based UI.

For those interested in contributing or building the project from source, Midad includes a comprehensive test suite using GoogleTest (GTest) to validate core components like the Arabic shaper, JSON parsers, and UTF-8 composition logic. This ensures that the firmware remains stable as new features are added to this ambitious fork.
