---
title: Vortex Cannon ESP32 Access Point Controller
summary: A GPIO control system and browser interface for a vortex cannon project based
  on the ESP32. It utilizes a wireless access point with a captive portal and a SPIFFS-hosted
  web server to provide remote control capabilities via a mobile device.
slug: vortex-cannon-esp32-access-point-controller
codeUrl: https://github.com/creative-engineering/vortexCannon-AP
star: 0
lastUpdated: '2018-09-26'
rtos: freertos
libraries:
- spiffs
topics:
- ap
- esp32
- maker
- spiffs
- vortex
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- esp32-web-server-using-spiffs
- esp8266-remote-firework-countdown-relay
- esp8266-wifi-relay-and-bahtinov-masks-controller
- rtkrovermanager
- esp32-remote-control-with-websocket
- electricitydisplay-mqtt-remote-control-for-esp8266-esp32
---

## Overview

The Vortex Cannon AP project is a specialized firmware implementation for the ESP32 microcontroller, designed to provide a wireless control interface for a vortex cannon. By leveraging the ESP32's integrated Wi-Fi and dual-core processing capabilities, the system creates a standalone control hub that does not require an existing network infrastructure.

## Technical Architecture

The project is developed within the Arduino IDE framework but goes beyond simple single-threaded execution. It specifically utilizes both cores of the ESP32 to balance the demands of networking and hardware control. In this architecture, the networking stack and web server can run on one core while the time-sensitive GPIO handling for the cannon's firing mechanism runs on the other, ensuring high responsiveness and stability.

### Wireless Connectivity and Captive Portal

The system is configured to act as a Wireless Access Point (AP). To make the user experience as seamless as possible, it implements a captive portal. When a user connects their smartphone or laptop to the cannon's Wi-Fi network, they are automatically redirected to the control interface. This eliminates the need for the user to manually enter an IP address, though the server remains accessible at the static address of 192.168.1.1.

### Onboard Web Hosting with SPIFFS

Rather than hardcoding the web interface as strings within the C++ source code, this project utilizes the ESP32's SPIFFS (Serial Peripheral Interface Flash File System). The HTML, CSS, and JavaScript files that make up the user interface are stored in the flash memory of the microcontroller. This approach allows for a more sophisticated and maintainable web interface, including mobile-optimized layouts and interactive elements.

## Key Features

- **Dual-Core Utilization**: Efficiently manages background networking tasks and foreground hardware control.
- **Standalone Operation**: Functions as its own Wi-Fi hotspot, making it ideal for outdoor or field use where Wi-Fi is unavailable.
- **SPIFFS Integration**: Hosts a full web application directly from the microcontroller's internal memory.
- **GPIO Management**: Provides direct control over the cannon's physical hardware through a clean browser-based UI.

## Getting Started

The project is structured for the Arduino IDE. Users need to upload the sketch to their ESP32 and use the ESP32 Sketch Data Upload tool to flash the contents of the `data` folder (containing the web files) to the SPIFFS partition. Once powered on, the ESP32 will broadcast its SSID, allowing any Wi-Fi enabled device to connect and trigger the cannon via the mobile-friendly interface.
