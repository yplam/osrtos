---
title: WifiPhisher for ESP32
summary: A specialized Wi-Fi security testing and phishing tool designed for the ESP32
  microcontroller series. It enables Evil Twin attacks, Karma attacks, and handshake
  captures through a web-based administrative interface, targeting various ESP32 variants
  including the S3, C3, and C6.
slug: wifiphisher-for-esp32
codeUrl: https://github.com/Alexxdal/ESP32WifiPhisher
siteUrl: https://espwifiphisher.alexxdal.com/
star: 118
version: v1.3
lastUpdated: '2026-02-01'
rtos: freertos
libraries:
- lwip
topics:
- beacon
- captive-portal
- deauth
- esp-idf
- esp32
- evil-twin
- hacking
- handshake
- iot
- offensive
- penetration-testing
- spammer
- wifi
- wifi-hacking
- wifiphisher
- wpa2
isShow: true
image: /202602/esp32wifi-phisher.webp
createdAt: '2026-02-08'
updatedAt: '2026-02-08'
relatedProjects:
- evil-bw16-webui
- wifi-nightmare
- deautherx
- madwifi
- marauder-centauri
- wifiexe-esp32-s3-based-badusb
---

## Overview

WifiPhisher for ESP32 is a sophisticated security auditing tool implemented for the Espressif ESP32 microcontroller family. It is designed to demonstrate and test the vulnerabilities of Wi-Fi networks through social engineering and technical exploitation. By leveraging the low-cost and high-performance capabilities of the ESP32, this project provides a portable platform for executing Evil Twin attacks, capturing WPA handshakes, and performing advanced deauthentication techniques.

Built using the **ESP-IDF framework** and managed via **PlatformIO**, the project targets a wide range of hardware, from the original ESP32 to the newer Wi-Fi 6 enabled chips like the ESP32-C6. It even includes specific configurations for the M5Stack Cardputer, making it a versatile tool for mobile security research.

## Key Features & Attacks

The firmware implements several classic and modern Wi-Fi attack vectors:

*   **Evil Twin Attack**: The device creates a rogue access point that mimics a target network. When clients connect to this rogue AP, they are presented with a phishing page (e.g., a fake login or firmware update screen) to harvest credentials.
*   **Karma Attack**: This feature detects devices probing for known networks and sends spoofed responses, tricking them into connecting to the rogue AP automatically.
*   **Aircrack & Handshake Capture**: The tool can sniff the air for WPA/WPA2/WPA3 handshakes. It includes logic to check user-input passwords against captured handshakes in real-time.
*   **Deauther & Advanced Attacks**: Beyond standard deauthentication frames, the project includes techniques for Wi-Fi 6 environments, such as negative TX power manipulation, EAPOL manipulation, and invalid PMKID injection.

## Technical Implementation

The project is deeply integrated with the **ESP-IDF** (Espressif IoT Development Framework), utilizing **FreeRTOS** for task management and **LwIP** for the networking stack. The build system is highly modular, as evidenced by the numerous `sdkconfig` files for different chip architectures (ESP32, S2, S3, C3, C5, C6). 

One of the standout technical aspects is the web-based dashboard. Once the ESP32 is flashed and running, it hosts a local web server. Users connect to a default AP (e.g., "MagicWifi") and navigate to an administrative URL (`192.168.4.1/admin.html`) to configure targets, select phishing scenarios, and monitor captured data in real-time.

## Hardware Support

Thanks to the PlatformIO configuration, the project supports a broad ecosystem of hardware:
- **Standard ESP32**: The classic dual-core workhorse.
- **ESP32-S Series**: Including the S2 and S3 (often used in the M5Stack Cardputer).
- **ESP32-C Series**: Including the RISC-V based C3 and the Wi-Fi 6 capable C6.
- **Cardputer**: A specific build flag `-D TARGET_CARDPUTER=1` is available to optimize the tool for the Cardputer's unique form factor.

## Getting Started

For developers, the project is easily built using PlatformIO. After cloning the repository, users can select their specific board environment in VS Code and upload the firmware. For those who prefer a non-technical approach, the author provides an **Online Flasher** utility, allowing users to install the firmware directly from a web browser via WebSerial.

Once flashed, the workflow typically involves:
1. Connecting to the ESP32's management Wi-Fi.
2. Scanning for target networks via the web dashboard.
3. Selecting a phishing template.
4. Launching the attack and monitoring the logs for captured credentials or handshakes.

This tool is intended strictly for educational purposes and ethical hacking in controlled environments. It serves as a powerful reminder of the importance of Wi-Fi security and the risks of connecting to untrusted access points.
