---
title: XTerminal ESP32 Handheld
summary: An ESP32-based handheld terminal project featuring custom PCB hardware, audio
  support, and a graphical user interface. It includes a firmware project built with
  PlatformIO and a dedicated PC-based simulator for UI development in Visual Studio.
slug: xterminal-esp32-handheld
codeUrl: https://github.com/lithiumice/XTerminal
star: 90
lastUpdated: '2022-03-14'
rtos: freertos
topics:
- esp32
- iot
- lvgl
- music-player
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- esp32berry
- acid-drop-custom-firmware-for-lilygo-t-deck
- esp32-custom-hardware-synthesizer
- lvgl-watch-firmware-for-open-smartwatch
- esp32-st7789v-ft6236u-arduino-lvgl-demo
- esp32-mp3
---

## Overview

XTerminal is a comprehensive open-source hardware and software project designed to create a multi-functional handheld device powered by the ESP32 microcontroller. The project bridges the gap between hardware design and software implementation, providing a complete ecosystem that includes custom PCB layouts, firmware, and even a desktop-based simulator for rapid UI prototyping.

## Hardware Architecture

The hardware design of XTerminal is split into two primary components: the Main Control Board and the Audio Board. Both were designed using KiCad and are located in the project's hardware directory. 

- **Main Control Board**: Houses the ESP32 MCU and the primary display interface.
- **Audio Board**: Dedicated to sound processing and SD card storage.

In its current iteration, the project utilizes a manual wiring approach (fly-wires) to connect the SD card pins and audio signals between the two boards, serving as a functional verification of the concept. The mechanical design is also supported by files in the repository, allowing for a complete physical assembly of the device.

## Software and Development Environment

The software stack for XTerminal is designed for flexibility and ease of development. It utilizes two distinct environments:

- **Firmware**: The core code is based on PlatformIO, targeting the ESP32. This allows for modern dependency management and a streamlined build process for the embedded target.
- **Simulator**: To speed up UI development, the project includes a simulator project compatible with Visual Studio 2019. This allows developers to test the interface and logic on a PC before flashing the code to the actual hardware.

## Key Features

XTerminal is more than just a hardware platform; it comes with several pre-built applications that demonstrate its capabilities:

- **Graphical User Interface**: A polished UI featuring a main dashboard, WiFi configuration menus, and system settings.
- **Weather Station**: An integrated weather display application that fetches data over WiFi.
- **Gaming**: The system is capable of running Arduboy-compatible games, providing a portable retro-gaming experience.
- **Connectivity**: Built-in WiFi support for internet-connected applications and data synchronization.

## Project Structure

The repository is organized into several clear directories to assist developers and makers:
- `1.Hardware`: KiCad PCB and schematic files.
- `2.Software`: Contains both the ESP32 PlatformIO project and the Visual Studio simulator.
- `3.Mechanic`: Files related to the physical casing and assembly.
- `4.DataSheet`: Reference materials for the components used.
- `6.DocImages`: Visual documentation of the PCB, assembly, and UI screenshots.

XTerminal serves as an excellent reference for developers looking to build their own ESP32-based handheld devices, combining UI design, hardware integration, and peripheral management into a single package.
