---
title: WiFi-Nightmare
summary: An advanced WiFi security auditing and penetration testing tool that combines
  a Python-based Linux CLI with custom firmware for ESP32 and ESP8266 microcontrollers.
  It supports deauthentication attacks, handshake/PMKID capturing, and Evil Twin attacks
  through a hybrid hardware-software architecture.
slug: wifi-nightmare
codeUrl: https://github.com/UserJoo9/WiFi-Nightmare
star: 26
lastUpdated: '2025-12-22'
rtos: freertos
topics:
- aircrack-ng
- cybersecurity
- deauthentication-attack
- esp32
- esp8266
- ethical-hacking
- evil-twin
- handshake-capture
- penetration-testing
- python
- wifi-security
isShow: false
createdAt: '2026-01-20'
updatedAt: '2026-01-20'
relatedProjects:
- wifiphisher-for-esp32
- deautherx
- madwifi
- evil-bw16-webui
- ghost-esp
- infiltra-firmware
---

## Overview

WiFi-Nightmare is a sophisticated WiFi security auditing and penetration testing suite that bridges the gap between high-level Python scripting and low-level microcontroller firmware. By utilizing a hybrid architecture, the project allows security researchers to perform complex wireless attacks that would typically require specialized hardware or multiple separate tools. The system consists of a Linux-based command-line interface (CLI) and custom firmware specifically designed for the ESP32 and ESP8266 platforms.

## Hybrid Architecture

The power of WiFi-Nightmare lies in its dual-component design. While many WiFi auditing tools rely solely on a computer's wireless adapter, WiFi-Nightmare offloads specific tasks to external microcontrollers. 

- **The Linux CLI**: Written in Python, this component acts as the brain of the operation. It manages the database of captured networks, handles handshake conversion for Hashcat, and controls the primary WiFi adapter for scanning and mass deauthentication.
- **ESP32/ESP8266 Firmware**: The custom firmware (DePortal2) enables the microcontrollers to act as specialized peripherals. These devices are particularly effective for creating Evil Twin access points and hosting captive portals, tasks that are often more stable and portable when executed on dedicated hardware.

## Key Features and Capabilities

WiFi-Nightmare provides a comprehensive toolkit for wireless security assessment:

- **Network Scanning and Monitoring**: Users can discover local WiFi networks and identify connected clients in real-time.
- **Deauthentication Attacks**: The tool can disconnect clients from target networks, a common precursor to capturing handshakes or redirecting users to a rogue access point.
- **Handshake & PMKID Capture**: It automates the process of capturing WPA/WPA2 handshakes and PMKIDs. Captured data is automatically converted into the `.hc22000` format, making it immediately ready for password cracking using Hashcat.
- **Evil Twin Attacks**: By leveraging the ESP32 or ESP8266, the tool can clone a target network and present a captive portal to capture user credentials.
- **Database Management**: All captured network information and handshakes are stored in a local database for easy retrieval and management.

## Technical Implementation

The project integrates several well-known security tools and libraries. The Python application utilizes `scapy` for packet manipulation and interfaces with system tools like `aircrack-ng` and `hcxtools`. On the hardware side, the firmware is managed via the PlatformIO IDE, allowing for easy deployment to ESP-based boards. 

When running in "Hybrid Mode," the Python application communicates with the ESP device over a serial connection (typically `/dev/ttyUSB0`). This allows the Linux host to command the microcontroller to launch specific attacks while the host's primary WiFi adapter remains free to monitor the environment or perform secondary attacks.

## Getting Started

To utilize the full potential of WiFi-Nightmare, users need a Linux environment (such as Kali Linux or Parrot OS) and a WiFi adapter that supports Monitor Mode. The firmware installation process is streamlined through PlatformIO, requiring users to simply open the project folder for their specific device (ESP32 or ESP8266) and upload the code via USB. Once the hardware is prepared, the Python CLI provides an intuitive menu-driven interface to launch attacks and manage captured data.
