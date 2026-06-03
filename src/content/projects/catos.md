---
title: CatOS
summary: A comprehensive firmware for ESP32-based portable gaming consoles featuring
  a 128x64 OLED display. It includes classic games, a web-based configuration interface,
  and system utilities like a LittleFS file manager and a calculator.
slug: catos
codeUrl: https://github.com/CatDevCode/CatOs
siteUrl: https://catdevcode.github.io/CatOs_webflasher/
star: 12
version: v0.1.6-R
lastUpdated: '2025-11-04'
rtos: freertos
libraries:
- littlefs
topics:
- catos
- esp32
- fimware
- firmware
- gamedev
- games
- gyver-settings
- oled
- oled-display-ssd1306
isShow: true
image: /202601/catos.webp
createdAt: '2026-01-14'
updatedAt: '2026-01-14'
relatedProjects:
- cardputer-game-station
- esp32berry
- esp32-s3-nes-emulator
- lunokiotwatch-firmware-for-lilygo-twatch-2020
- esp32-p4-home-assistant-display
- xterminal-esp32-handheld
---

# CatOS: A Versatile Firmware for ESP32 Handheld Consoles

CatOS is an open-source firmware project designed to power DIY portable gaming consoles built around the ESP32 microcontroller and a 128x64 OLED display. It provides a complete software ecosystem for hobbyists looking to build their own handheld devices, combining classic gaming experiences with modern system management tools and a user-friendly interface.

## Core Features and Gaming

At its heart, CatOS is a gaming platform. It comes pre-loaded with a collection of classic titles adapted for the small-form-factor OLED screen, including:
- **Tetris** and **Snake**
- **Flappy Bird** and **Arduino Dino**
- **Pong** and **Arkanoid**
- **Space Invaders**

Beyond gaming, the firmware includes a suite of practical utilities. Users have access to a built-in calculator, a stopwatch, and a timer, making the device useful for more than just entertainment. The inclusion of a service menu with calibration tools ensures that the hardware can be fine-tuned for the best user experience.

## System Management and Connectivity

One of the standout features of CatOS is its integration of modern connectivity. By leveraging the ESP32's WiFi capabilities, the firmware provides a web-based interface for system configuration. This allows users to manage settings conveniently from a browser on a computer or smartphone. The system supports both Station (STA) and Access Point (AP) modes, ensuring flexibility in how the device connects to networks.

For data storage, CatOS utilizes the LittleFS file system, providing a robust way to manage files on the ESP32's internal flash memory. The project even includes a built-in file manager to navigate the storage directly on the device, which is a significant feature for such a compact system.

## Hardware Architecture

The project is designed for accessibility in the DIY community. The standard hardware configuration consists of:
- **Microcontroller**: ESP32 (typically the DevKit V1)
- **Display**: 128x64 OLED (7-pin SPI interface)
- **Controls**: A 5-button navigation system
- **Power**: Li-ion battery support with integrated charging circuitry

The repository provides detailed wiring diagrams and links to EasyEDA PCB designs, allowing users to move from a breadboard prototype to a professional-looking custom handheld device. It also includes instructions for processing custom images into C++ headers using specialized tools, allowing for easy UI customization.

## Technical Implementation

CatOS is developed using the Arduino framework and is optimized for the PlatformIO build environment. While it presents an easy-to-use interface, it runs on the robust FreeRTOS kernel provided by the ESP32 Arduino core. It relies heavily on the "Gyver" library ecosystem for efficient hardware abstraction, including:
- `GyverOLED` for high-performance display rendering
- `GyverButton` for reliable input handling and debouncing
- `GyverTimer` for non-blocking task scheduling
- `Settings` for persistent data management

The project also features a dedicated web flasher, enabling users to install the firmware directly from a compatible web browser without needing to set up a local development environment.

## Getting Started

For developers, the project is structured as a standard PlatformIO project. After cloning the repository, the firmware can be built and uploaded using the standard PlatformIO commands. The use of `platformio.ini` ensures that all dependencies, including the specific versions of the Gyver libraries, are automatically managed.

```cpp
// Example of the library dependencies defined in platformio.ini
lib_deps = 
    gyverlibs/GyverOLED@^1.6.4
    gyverlibs/GyverButton@^3.8
    gyverlibs/GyverTimer@^3.2
    gyverlibs/Settings@^1.3.5
    gyverlibs/Random16@^1.0
```

The project is open for contributions and is licensed under the GNU General Public License v3.0, encouraging community-driven improvements and forks.
