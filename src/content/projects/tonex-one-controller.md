---
title: Tonex One Controller
summary: An open-source controller and display interface for IK Multimedia Tonex One,
  Tonex Pedal, and Valeton GP5. Built on the ESP32-S3 using FreeRTOS and LVGL, it
  provides MIDI control, Bluetooth connectivity, and a web-based configuration interface
  for guitar pedal management.
slug: tonex-one-controller
codeUrl: https://github.com/Builty/TonexOneController
siteUrl: https://builty.github.io/TonexOneController/
star: 322
version: V2.0.2.2
lastUpdated: '2026-02-02'
rtos: freertos
libraries:
- lvgl
topics:
- bluetooth-low-energy
- esp32-idf
- esp32-s3
- gp5
- guitar
- lcd-display
- midi
- tonex
- touchscreen
- usb-host
- valeton
isShow: true
image: /202602/tonex-one.webp
createdAt: '2026-02-14'
updatedAt: '2026-02-14'
relatedProjects:
- esp32-host-midi
- hd2-macropad
- ic-705-ci-v-band-decoder-and-transverter-controller
- esp-usb-ble-hid-bridge
- esp32-remote-for-victron
- omote-open-universal-remote
---

## Overview

The Tonex One Controller is a sophisticated open-source bridge and display interface designed for the IK Multimedia Tonex One, the larger Tonex Pedal, and the Valeton GP5. While the Tonex One is a powerful guitar pedal, it lacks native MIDI capabilities and a comprehensive display. This project solves that limitation by using a low-cost Espressif ESP32-S3 microcontroller to act as a USB host, providing a bridge for MIDI commands, Bluetooth footswitches, and a graphical user interface.

The project supports a wide range of hardware, from minimal $6 boards without displays to $44 units featuring 4.3" capacitive touch screens. It allows users to select from 20 different presets, manage amplifier and pedal skins, and adjust parameters through multiple input methods including WiFi, wired footswitches, and Bluetooth MIDI controllers.

## Technical Architecture

The firmware is developed in C using the Espressif ESP-IDF (v5.4.1) environment and runs on the FreeRTOS operating system. The system architecture is divided into several specialized tasks to ensure responsive performance:

- **Control Task**: Acts as the central coordinator for the entire system.
- **Display Task**: Manages the LCD display and touch screen interactions using the LVGL graphics library.
- **MIDI Control Task**: Handles Bluetooth links to MIDI pedals and peripherals.
- **USB Comms Task**: Manages the USB host interface to communicate with the Tonex pedals.

The project recently transitioned its UI design to EEZ Studio, allowing for more complex graphical elements and removing previous object limits. This enables a rich visual experience where users can see amplifier skins, effect icons, and real-time parameter values directly on the controller's screen.

## Key Features

- **Extensive Hardware Support**: Compatible with various ESP32-S3 development boards from Waveshare, LilyGo, and M5Stack, as well as pre-built commercial units like the Pirate MIDI Polar series.
- **Bluetooth Connectivity**: Supports both Client (Central) mode for connecting to footswitches like the M-Vave Chocolate and Server (Peripheral) mode for control via smartphone apps.
- **Web-Based Configuration**: A built-in WiFi portal allows users to change MIDI channels, remap presets, configure footswitch layouts, and update pedal parameters through a standard web browser.
- **Advanced MIDI Control**: Full control over all Tonex parameters and effects via LCD or MIDI CC commands, including support for tap tempo and global volume.
- **Customizable UI**: Users can select amplifier or pedal skins and add descriptive text to presets, which are saved permanently to the device's flash memory.

## Connectivity and Integration

The controller acts as a versatile hub for a guitar rig. It can interface with wired MIDI gear, Bluetooth MIDI controllers, and even provide a web-based remote control interface over WiFi. For DIY enthusiasts, the project provides detailed wiring diagrams for various boards, while those seeking a plug-and-play solution can utilize the collaboration with Pirate MIDI for fully assembled hardware.

## Getting Started

For developers looking to build or customize the firmware, the project requires the ESP-IDF environment. The repository includes a Python-based build system to automate the creation of release files for different hardware targets. Users can flash pre-built binaries using a dedicated web-based programming tool, which simplifies the process of selecting the correct hardware platform and uploading the firmware without requiring a local development environment.
