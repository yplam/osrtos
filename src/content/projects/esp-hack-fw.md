---
title: ESP-HACK FW
summary: ESP-HACK is a versatile wireless research and pentesting firmware for the
  ESP32 platform, targeting Sub-GHz, Bluetooth, and Infrared protocols. It utilizes
  the Arduino framework and NimBLE stack to provide tools for signal analysis, protocol
  exploration, and GPIO integrations. The project is designed for use with custom
  hardware including CC1101 transceivers and OLED displays.
slug: esp-hack-fw
codeUrl: https://github.com/Teapot174/ESP-HACK
siteUrl: https://teapot174.github.io
version: v0.8-fix
lastUpdated: '2026-04-17'
licenses:
- AGPL-3.0
image: /202604/ESP-HACK_3.avif
rtos: freertos
libraries:
- h2zero-esp-nimble-cpp
- nimble
topics:
- badble
- bluetooth
- cc1101
- esp32
- hacking
- ibutton
- infrared
- jammer
- nrf24
- pentesting
- subghz
- tvbgone
- wifi
isShow: true
createdAt: '2026-04-18T01:31:55+00:00'
updatedAt: '2026-04-18T01:31:55+00:00'
---

ESP-HACK FW is a powerful universal firmware developed for the ESP32, specifically tailored for RF research and pentesting across various wireless spectrums. It serves as a comprehensive tool for enthusiasts and security researchers interested in exploring radio frequencies, Bluetooth Low Energy (BLE), infrared signals, and direct GPIO integrations. While the firmware is stable for its primary functions, it remains an active project with several experimental features in development.

## Core Capabilities and Features

The firmware organizes its functionality into several specialized modules based on the communication technology used. 

### Wireless and Bluetooth Research
For WiFi operations, the system supports beacon spamming, wardriving, and packet analysis. The Bluetooth suite leverages the NimBLE stack to provide BLE-Spam capabilities across iOS, Android, and Windows platforms, alongside BadBLE and mouse emulation features.

### Sub-GHz and Infrared
The Sub-GHz module is a cornerstone of the project, requiring a CC1101 transceiver. It supports reading, sending, and recording RAW signals, as well as a spectrum analyzer and bruteforce tools for common protocols. Supported modulations include Princeton, RcSwitch, Came, Nice, Holtec, Ansonic, Chamberlain, StarLine, and KeeLoq. The Infrared module complements this by providing signal reading and transmission for controlling consumer electronics like TVs and air conditioning units.

### GPIO and Peripheral Integration
Beyond wireless, the firmware integrates with physical hardware interfaces. It includes support for iButton reading and writing, NRF24 spectrum analysis and jamming, and a serial interface currently under development.

## Hardware Architecture and Building

The project is designed to be built on a custom PCB that consolidates the ESP32-WROOM with several peripheral modules. The hardware stack includes a CC1101 module for Sub-GHz communication, an SH1106 OLED display for the user interface, and an SD card module for data storage and signal recording.


### Connection and Pin Configuration

The firmware uses a specific pin mapping to manage multiple SPI and I2C peripherals. The display operates on the I2C bus (G21/G22), while the CC1101 and SD card share the high-speed SPI pins with dedicated Chip Select (CS) lines. Navigation is handled via a set of physical buttons mapped to specific GPIOs for Up, Down, OK, and Back actions.

![Detailed connection scheme for CC1101, OLED display, and SD card modules](/202604/ESP-HACK_2.avif)

## Software Implementation and Diagnostics

Built using the PlatformIO ecosystem, the project utilizes the `esp32dev` environment with the Arduino framework. To accommodate the extensive feature set and multiple libraries, the build configuration uses a `huge_app.csv` partition table, maximizing the available flash space for the firmware binary. 

To assist with hardware assembly and debugging, the firmware includes built-in diagnostic error codes. These codes help identify initialization failures in critical components:
- **0x000**: SD-Card initialization failure, usually requiring FAT32 formatting.
- **0x001**: CC1101 initialization failure, indicating wiring or module issues.
- **0x002**: NRF24 initialization failure, suggesting pin configuration errors.

The final device provides a portable, handheld solution for field-based radio research, combining high-level protocol analysis with low-level signal manipulation.
