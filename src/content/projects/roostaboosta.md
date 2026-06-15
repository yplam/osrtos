---
title: RoostaBoosta
summary: An IoT weather-predicting alarm clock built on Mbed OS 6 for the LPC1768
  platform. It integrates networking via ESP8266 or Ethernet, audio output, and a
  uLCD display to provide weather updates and alarm functionality.
slug: roostaboosta
codeUrl: https://github.com/mshakula/RoostaBoosta
star: 0
lastUpdated: '2023-04-27'
rtos: mbed-os
topics:
- iot
- mbed-os
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- w601-rt-thread-alarm-clock
- desk-weather-clock-geekmagic-s3
- diy-weather-clock-firmware
- wt32-sc01-plus-smart-desk-companion
- stm32-weather-station
- erikaos-online-weather-station
---

## Overview

RoostaBoosta is an innovative IoT weather-predicting alarm clock designed to modernize the morning routine while maintaining a touch of pastoral charm. Developed as a final project for Georgia Tech's ECE4180 course, the system transforms a standard microcontroller into a web-enabled station capable of fetching weather data, managing alarms, and providing audio-visual feedback.

The project is built on the modern Mbed OS 6 platform, utilizing its networking capabilities and real-time scheduling to coordinate multiple peripherals. By integrating API calls with local sensor data and high-quality audio output, RoostaBoosta offers a comprehensive embedded solution for a common household device.

## Hardware Architecture

The system is centered around the **mBed LPC1768**, a versatile ARM Cortex-M3 microcontroller. To achieve its feature set, the project incorporates a variety of specialized hardware components:

- **Display**: A 4D Systems uLCD-144-G2 provides the visual interface for weather icons and time display.
- **Networking**: Connectivity is handled via an Adafruit ESP8266 breakout or a SparkFun RJ45 Ethernet breakout, allowing the device to perform HTTP requests to weather APIs.
- **Audio**: A SparkFun TPA2005D1 amplifier drives the sound system, playing audio files stored on a microSD card.
- **Sensors**: An HC-SRO4 ultrasonic sensor is included, likely for touchless interaction or snooze functionality.
- **Storage**: A SparkFun microSD breakout is used to hold audio assets and configuration files.

## Technical Implementation

RoostaBoosta leverages **Mbed CLI 2** and **CMake** for its build system, reflecting modern embedded development practices. The software architecture is designed for modularity, using git submodules to manage external dependencies such as the uLCD driver and DMA libraries. 

The application logic is written in C++17, following a structured approach to handle concurrent tasks. The `mbed_app.json` configuration file reveals a sophisticated setup for audio buffering and storage management, including custom mount points for audio effects and scratch directories. The use of the `MODDMA` library suggests that the project utilizes Direct Memory Access to handle audio streaming or display updates without taxing the CPU, ensuring smooth performance even during network operations.

## Key Features

- **Web-Enabled Updates**: Fetches real-time weather data and time synchronization via network APIs.
- **Rich Audio-Visuals**: Combines a graphical LCD interface with amplified audio for a more engaging user experience than traditional buzzers.
- **Robust Build System**: Supports modern CMake workflows, making it easier to maintain and port compared to older Mbed projects.
- **Custom PCB Design**: The project includes schematics and a breakout PCB designed in KiCAD, moving beyond simple breadboard wiring for a more permanent hardware solution.

## Development and Style

The project maintains high code quality standards, adhering to the Google C++ style guide with minor modifications for embedded contexts. It utilizes Doxygen-style comments for documentation and provides a `.clang-format` configuration to ensure consistent code formatting across the repository. This attention to detail makes the codebase a valuable reference for students and hobbyists looking to build complex IoT applications on the Mbed OS platform.
