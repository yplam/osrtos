---
title: Cydintosh
summary: Cydintosh is a Macintosh Plus emulator designed for the ESP32-based Cheap-Yellow-Display
  (CYD). It utilizes the Musashi 68k emulator core and umac to run classic Macintosh
  software alongside modern ESP32 features like WiFi, MQTT, and Home Assistant integration.
slug: cydintosh
codeUrl: https://github.com/likeablob/cydintosh
lastUpdated: '2026-04-29'
licenses:
- MIT
image: /202605/cydintosh_0.avif
rtos: freertos
libraries:
- littlefs
- lwip
topics:
- cheap-yellow-display
- cyd
- emulator
- esp32
- home-assistant
- macintosh
- mqtt
- platformio
isShow: true
createdAt: '2026-05-05T23:33:42+00:00'
updatedAt: '2026-05-05T23:33:42+00:00'
relatedProjects:
- t-hmi-c64-emulator
- galagino-for-platformio
- anemoia-esp32-nes-emulator
- tiny386
- anemoia-esp32
- esp32-marauder-for-cheap-yellow-display-cyd
---

## Overview
Cydintosh brings the classic Macintosh Plus experience to the ESP32-based Cheap-Yellow-Display (CYD) board. This project is a port of the umac emulator, utilizing the Musashi 68k emulator to recreate the 1980s computing environment on a modern, compact display. 


The system features:
- Macintosh Plus emulation using umac and Musashi.
- Touchpad-based mouse control on the 240x320 LCD.
- Custom "Homebrew" Mac applications built using the Retro68 toolchain.
- Inter-process communication (IPC) between the 68k environment and the ESP32 host for advanced networking features.

## Hardware and Assembly
The project is specifically designed for the CYD2USB (ESP32-2432S028) variant, which includes an ILI9341 LCD and an XPT2046 touch controller. To complete the look, the repository includes files for a 3D-printable enclosure that mimics the classic Macintosh aesthetic, secured with M2x3 self-tapping screws.

![Cydintosh assembled in a 3D-printed enclosure](/202605/cydintosh_1.avif)

## Software Architecture
Cydintosh relies on a combination of classic Macintosh components and modern ESP32 firmware. To run the emulator, users need a Mac Plus ROM (v3) and a System 3.2 bootable disk image. The project uses a patched ROM and a custom HFS disk image that contains pre-built applications.

The ESP32 firmware is built using the ESP-IDF framework and PlatformIO. It manages the display drivers, touch input, and the 68k emulation loop. A dedicated memory-mapped region at `0xF00000` serves as the IPC interface, allowing the simulated Macintosh to communicate directly with the ESP32's hardware and network stacks.

## Homebrew Macintosh Applications
A unique feature of Cydintosh is its suite of custom-built Macintosh applications. These allow the user to interact with the ESP32's modern capabilities from within the vintage OS:

- **Weather**: Displays real-time weather data fetched via MQTT.
- **CydCtl**: Provides hardware control over the CYD board, such as backlight brightness and RGB LED settings.
- **WiFi**: Manages WiFi status and performs network scans.

![Weather application running on the Macintosh Plus emulator](/202605/cydintosh_2.avif)

The Weather app, in particular, demonstrates the power of the IPC bridge. It polls the ESP32 every 30 seconds for data that the ESP32 has subscribed to from an MQTT broker, often integrated with Home Assistant.

![WiFi scanner application on the Cydintosh interface](/202605/cydintosh_4.avif)

## Network and Home Assistant Integration
The system is designed to live within a smart home ecosystem. Through Home Assistant automations, weather data and display brightness can be pushed to the device via MQTT. The ESP32 handles the protocol logic and passes the relevant information to the Macintosh applications through the shared memory interface. The device also exposes entities like display brightness via Home Assistant MQTT Discovery for seamless control.
