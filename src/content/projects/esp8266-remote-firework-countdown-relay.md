---
title: ESP8266 Remote Firework Countdown Relay
summary: A remote-controlled firework igniter prototype based on the ESP8266 microcontroller.
  It features a ReactJS web interface served via an asynchronous web server, allowing
  users to trigger a relay via a Wi-Fi Access Point for remote detonation tasks.
slug: esp8266-remote-firework-countdown-relay
codeUrl: https://github.com/tpaphysics/esp8266-countdown-relay
star: 0
lastUpdated: '2022-12-13'
rtos: ''
libraries:
- littlefs
topics:
- esp8266
- espasyncwebserver
- espressif
- iot
- littlefs
- reactjs
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- esp8266-wifi-relay-async
- esp8266-wifi-relay-and-bahtinov-masks-controller
- vortex-cannon-esp32-access-point-controller
- esp8266-wifi-relay
- esp8266-sound-effects-i2s-web-trigger
- electricitydisplay-mqtt-remote-control-for-esp8266-esp32
---

## Overview

The ESP8266 Countdown Relay is a specialized embedded project designed as a remote igniter for fireworks. Built around the versatile ESP8266 microcontroller, the system creates its own Wi-Fi Access Point (AP), enabling users to interact with the hardware through a modern web interface. This setup eliminates the need for physical cables or specialized remote controls, allowing for safe, distance-based operation using a smartphone, tablet, or laptop.

## Technical Architecture

The project is divided into two main components: the C++ firmware and a ReactJS-based web application. The firmware is developed using the PlatformIO ecosystem and the Arduino framework, leveraging asynchronous networking to ensure a responsive user experience.

### Firmware and Storage
One of the interesting technical aspects of this project is its use of the LittleFS filesystem. The web interface, originally built in React, is compiled into static assets and stored directly on the ESP8266's flash memory. By using `ESPAsyncWebServer`, the device can serve these files to connected clients without blocking the main execution loop, which is critical for maintaining timing accuracy during countdown sequences.

### Hardware Integration
The hardware side is straightforward yet effective, consisting of an ESP8266 module (such as a NodeMCU) interfaced with a relay module. While the relay is used here for firework ignition, the architecture is flexible enough to be adapted for any remote switching application requiring a countdown or timed trigger.

## Key Features

- **Standalone Wi-Fi AP**: Operates independently of existing network infrastructure by creating its own hotspot (SSID: `esp8266`).
- **Modern Web UI**: Uses a ReactJS frontend for a smooth, app-like experience in the browser.
- **Asynchronous Communication**: Utilizes `ESPAsyncWebServer` and `ArduinoJson` for efficient data exchange between the client and the hardware.
- **mDNS Support**: Allows users to access the control panel via a friendly URL (`http://esp.local`) instead of remembering IP addresses.

## Getting Started

The project is managed via PlatformIO. To deploy the system, the flash memory must be prepared in stages: first by erasing the existing flash, then by building and uploading the LittleFS filesystem image (containing the React assets), and finally by uploading the C++ firmware. 

Once powered, the device broadcasts a Wi-Fi network. After connecting, the user is presented with a countdown interface. This safety-oriented design ensures that the relay—and consequently the connected igniter—is only triggered after a deliberate sequence initiated through the secure web portal.
