---
title: ESP8266 WiFi Relay and Bahtinov Masks Controller
summary: An ESP8266-based automation tool for telescope accessories, providing remote
  control for Bahtinov masks via servos and peripheral power via relays. It features
  a responsive web interface, JSON API, and state persistence using EEPROM.
slug: esp8266-wifi-relay-and-bahtinov-masks-controller
codeUrl: https://github.com/Jorgen-VikingGod/ESP8266-WiFi-Relay-Bahtinov-Masks
star: 1
lastUpdated: '2017-09-29'
rtos: ''
libraries:
- spiffs
topics:
- bootstrap3
- esp8266
- esp8266-arduino
- esp8266-webserver
- javascript
- jquery
- json
- relay
- servo
- spiffs
- webserver
- wifi
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- esp8266-wifi-relay
- esp8266-wifi-relay-async
- esp8266-remote-firework-countdown-relay
- electricitydisplay-mqtt-remote-control-for-esp8266-esp32
- esp8266-electronic-timekeeper
- riden-dongle
---

## Overview

The ESP8266-WiFi-Relay-Bahtinov-Masks project is a specialized firmware solution designed for amateur astronomers and astrophotographers. It leverages the cost-effective ESP8266 microcontroller to provide a centralized control system for telescope accessories, specifically focusing on Bahtinov masks and power relay management. By combining a web server with hardware control, it allows users to manage their equipment wirelessly from a smartphone or computer.

## Key Features

### Automated Mask Control
A Bahtinov mask is a device used to focus telescopes accurately. This project automates the process by using servo motors to open and close the masks remotely. This is particularly useful for remote observatories or setups where manual adjustment is inconvenient. The firmware supports up to three servo motors, allowing for multiple masks or auxiliary mechanical controls to be operated independently.

### Power Management via Relays
Beyond mask control, the system acts as a multi-channel WiFi relay switch. It can manage up to five relay modules connected to the ESP8266's GPIO pins. This allows users to toggle power for cameras, heaters, mounts, or lighting directly from a web browser. The state of each relay and mask is persisted in EEPROM, ensuring that the system returns to its last known state after a power cycle or reboot.

### Web Interface and API
The project features a built-in web server that hosts a responsive dashboard built with Bootstrap and jQuery. This interface provides intuitive toggle buttons for both mobile and desktop screens. For advanced integration, the system exposes a JSON-based API. Users can retrieve or update the status of relays and masks using simple HTTP GET and POST requests, making it compatible with external automation scripts or home automation platforms.

## Technical Implementation

The firmware is built on the Arduino core for ESP8266. It utilizes several key components to provide a robust user experience:

- **SPIFFS (Serial Peripheral Interface Flash File System)**: Used to store the HTML, CSS, and JavaScript files for the web interface, keeping the core logic separate from the UI assets.
- **ArduinoJson**: Handles the encoding and decoding of configuration and state data, facilitating the project's REST-like API.
- **mDNS (Multicast DNS)**: Allows users to access the device via a friendly hostname (e.g., `http://wifi-relay.local`) instead of a dynamic IP address.
- **ArduinoOTA**: Enables wireless firmware updates, which is essential for devices mounted on telescopes where physical USB access might be restricted during a session.

## Hardware Requirements

To deploy this project, users typically need:
- An ESP8266 module (such as a NodeMCU or WeMos D1 Mini) with at least 4MB of Flash.
- Up to 4 or 5 Relay modules (depending on the specific GPIO configuration).
- Up to 3 Servo motors for mask actuation.
- A stable 5V power supply capable of handling the peak current of the servos and relays.

## Getting Started

Setup involves flashing the firmware using the Arduino IDE and uploading the web data to the SPIFFS partition using the ESP8266FS Uploader tool. Once powered on, the device connects to the local WiFi network (or a fallback AP) and starts the mDNS responder. Configuration, including GPIO pin assignments and servo travel limits, is managed via a `config.json` file, allowing for easy customization without deep code changes.
