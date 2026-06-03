---
title: Evil-BW16 WebUI
summary: A dual-band WiFi deauthentication and security tool for BW16 and ESP32 microcontrollers.
  It provides a web-based interface for network scanning, packet injection, and real-time
  monitoring of 2.4GHz and 5GHz traffic. The system includes an integrated sniffer
  for capturing EAPOL and management frames, with logs stored on an SD card.
slug: evil-bw16-webui
codeUrl: https://github.com/Evil-Project-Team/Evil-BW16-WebUI
star: 51
lastUpdated: '2025-10-06'
rtos: freertos
topics:
- bw16
- esp32
- evil
- penetration-testing
- security-testing
- webui
isShow: false
createdAt: '2026-01-15'
updatedAt: '2026-01-15'
relatedProjects:
- wifiphisher-for-esp32
- deautherx
- madwifi
- wifi-nightmare
- marauder-centauri
- wifiexe-esp32-s3-based-badusb
---

## Overview

Evil-BW16 WebUI is a sophisticated WiFi security auditing tool designed to leverage the unique capabilities of the Ai-Thinker BW16 and ESP32 platforms. Unlike many common ESP8266-based deauther projects that are limited to the 2.4GHz spectrum, this project provides dual-band support, allowing users to interact with both 2.4GHz and 5GHz networks. The system is split into two primary components: the BW16 firmware, which handles the low-level radio operations and packet injection, and an ESP32-based web interface that provides a modern, responsive control dashboard.

## Hardware Architecture

The project utilizes a multi-MCU architecture to maximize performance and reliability:

- **BW16 (RTL8720DN):** This module acts as the radio engine. It is responsible for the heavy lifting of WiFi scanning, packet sniffing, and frame injection across both frequency bands. It communicates with the controller via UART.
- **ESP32 (S3 Recommended):** The ESP32 serves as the host for the web interface and the system controller. It manages the WiFi Access Point for the user interface, handles WebSocket communications, and manages file storage on a microSD card.

This separation of concerns ensures that the high-speed packet processing on the BW16 does not interfere with the responsiveness of the web-based management console.

## Key Features and Capabilities

Evil-BW16 WebUI offers a comprehensive suite of tools for network analysis and ethical testing:

- **Dual-Band Deauthentication:** Target devices on both 2.4GHz and 5GHz channels, a significant upgrade over legacy hardware.
- **Integrated Sniffer:** The tool can capture various frame types, including beacons, probe requests, deauthentication frames, and EAPOL (handshake) packets. This makes it a valuable tool for capturing data for offline analysis.
- **Real-Time Web Interface:** Users can connect to the device's AP and manage all operations through a browser. The interface supports real-time log streaming via WebSockets and dynamic network mapping.
- **UART Bridge:** Includes functionality to bridge UART communication, facilitating debugging and direct command injection between the two microcontrollers.
- **Advanced Configuration:** Users can fine-tune attack parameters such as cycle delays, frame counts per Access Point, and specific channel hopping sequences.

## Technical Implementation

The project is built using the Arduino framework, making it accessible for developers to modify and extend. It relies on several key libraries to handle its complex networking and data requirements:

- **ESPAsyncWebServer & AsyncTCP:** These provide the foundation for the high-performance, non-blocking web server on the ESP32.
- **ArduinoJson:** Used for handling configuration files and structured data exchange between the web UI and the firmware.
- **WebSocket Protocol:** Ensures low-latency communication between the browser and the hardware for real-time status updates.

## Getting Started

The system is designed to be controlled via a web browser once the firmware is flashed to both the BW16 and ESP32 modules. By default, the device creates a WiFi network named `Evil-BW16` with the password `password1234`. Once connected, navigating to `http://192.168.4.1` opens the dashboard. From there, users can initiate scans, select targets, and monitor the progress of various network operations. For advanced users, a comprehensive command-line interface is available via the web console or direct UART connection, supporting commands like `start sniff`, `set cycle_delay`, and `disassoc`.
