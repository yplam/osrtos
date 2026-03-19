---
title: ESP32 Jarolift Controller
summary: A comprehensive firmware for ESP32 microcontrollers to control Jarolift TDEF
  433MHz radio shutters via a CC1101 transceiver. It provides a mobile-friendly WebUI,
  MQTT integration for smart home systems like Home Assistant, and advanced timer
  functions including sunrise and sunset triggers.
slug: esp32-jarolift-controller
codeUrl: https://github.com/dewenni/ESP32-Jarolift-Controller
siteUrl: http://www.bastelbudenbuben.de/2017/04/25/protokollanalyse-von-jarolift-tdef-motoren/
star: 80
version: v1.9.0
lastUpdated: '2025-04-15'
rtos: freertos
libraries:
- spiffs
- lwip
topics:
- alexa
- cc1101
- esp32
- gateway
- hass
- home-assistant
- homeassistant
- homekit
- jarolift
- mqtt
- smarthome
- tdef
- w5500
isShow: true
image: /202603/esp32-jarolift.webp
createdAt: '2026-03-19'
updatedAt: '2026-03-19'
---

## Overview

The ESP32 Jarolift Controller is an open-source firmware designed to bridge the gap between proprietary Jarolift™ TDEF 433MHz radio shutters and modern smart home ecosystems. By leveraging the power of the ESP32 and the versatility of the CC1101 transceiver module, this project allows users to move away from limited hardware remotes toward a centralized, network-attached control system.

The project is built on the Arduino framework for ESP32, utilizing an asynchronous communication mode with the CC1101 module to ensure reliable signal transmission and reception. It supports a wide range of ESP32 variants, including the WROOM, WROVER, S2, S3, and C3 series, making it highly adaptable to various hardware setups.

## Key Features

### Modern Web Interface
The controller features a responsive, mobile-friendly WebUI that allows for real-time control and configuration without the need for external apps. Users can manage up to 16 individual roller shutters and define up to 6 shutter groups. The interface also includes a built-in logger for debugging and a file manager for configuration backups.

### Smart Home Integration
Integration is a core focus of the project. It provides robust MQTT support, allowing the shutters to be controlled by any MQTT-compatible automation platform. For Home Assistant users, the firmware includes MQTT Auto Discovery, which automatically populates the shutters as 'Cover' entities in the Home Assistant dashboard.

### Advanced Automation
Beyond simple remote control, the firmware includes a standalone timer function. This allows for automated shutter movements based on fixed times or astronomical events like sunrise and sunset. Users can even apply offsets (e.g., "30 minutes after sunset") and define minimum/maximum time constraints to ensure shutters don't open too early or close too late.

### Remote Signal Sniffing
A unique feature of this controller is its ability to recognize signals from original Jarolift remote controls. By entering the serial number of an existing remote, the ESP32 can monitor the radio frequency and update the internal status of the shutters when they are operated manually. While the protocol is unidirectional, this 'sniffing' capability provides a much more accurate representation of the shutter state than simple command-tracking.

## Hardware Requirements

The system requires an ESP32 development board and a CC1101 433MHz transceiver. The CC1101 is connected via the standard SPI bus. The project also supports optional Ethernet connectivity via the W5500 module for users who prefer a wired network connection over WiFi.

| CC1101 Signal | ESP32 GPIO (Standard) |
|---------------|-----------------------|
| GD0           | 21                    |
| GD2           | 22                    |
| SCK           | 18                    |
| MOSI          | 23                    |
| MISO          | 19                    |
| CSN           | 5                     |

## Technical Implementation

The firmware is developed using PlatformIO and utilizes several asynchronous libraries to maintain high performance. The use of `ESPAsyncWebServer` and `AsyncTCP` ensures that the WebUI remains responsive even during heavy network or radio activity. The project also implements a command queue for the CC1101 to handle rapid consecutive commands, preventing timing issues that often plague simpler radio-based controllers.

For security and ease of use, the project includes a 'Setup Mode' that can be triggered by restarting the device five times in quick succession. This mode creates a temporary WiFi Access Point, allowing users to configure network credentials and hardware settings if the primary connection fails.

## Getting Started

Users can compile the project using Visual Studio Code with the PlatformIO plugin. For those who prefer a simpler approach, pre-compiled binaries are often available in the GitHub releases, which can be flashed using standard ESP32 flash tools. Once flashed, the device can be configured entirely through the WebUI, including the 'Teach-in' process for pairing the controller with existing Jarolift motors.
