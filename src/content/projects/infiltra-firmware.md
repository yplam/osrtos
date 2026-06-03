---
title: Infiltra Firmware
summary: A comprehensive security-focused firmware for ESP32, ESP8266, and RTL8720DN
  platforms designed for wireless auditing and hardware hacking. It provides a robust
  toolkit for Sub-GHz, Wi-Fi, BLE, RFID/NFC, and Infrared signal manipulation across
  various devices like M5StickC and Cardputer.
slug: infiltra-firmware
codeUrl: https://github.com/D3CRYPT-1/Infiltra-Firmware
siteUrl: https://infiltra.co
star: 153
version: '0.8'
lastUpdated: '2025-12-31'
rtos: freertos
libraries:
- nimble
- tft-espi
topics:
- deauther
- deauther-5g
- discord
- esp32
- esp8266
- firmware
- funny
- hacking
- m5stack
- pentesting
isShow: false
createdAt: '2026-01-12'
updatedAt: '2026-01-12'
relatedProjects:
- bruce-firmware
- esp-hack-fw
- ghost-esp
- unigeek-firmware
- poseidon
- ghostesp
---

Infiltra Firmware is a versatile, open-source toolkit designed to transform standard microcontrollers into powerful wireless security auditing devices. Developed by a dedicated community of developers and security enthusiasts, the project targets a wide array of popular hardware, including the ESP32 and ESP8266 series, M5Stack devices (M5StickC Plus, Cardputer), and specialized modules like the LilyGO T-Embed and RTL8720DN.

## Wireless Auditing and RF Capabilities

At its core, Infiltra is built to interact with a vast range of wireless protocols. One of its most significant features is the integrated support for Sub-GHz frequencies via the CC1101 module. This allows users to capture, analyze, and emulate complex remote signals. The firmware includes a real-time spectrum analyzer, enabling users to visualize RF activity with detailed graphs. It is designed for full compatibility with other popular security tools, allowing for seamless signal sharing and organization.

For Wi-Fi network testing, Infiltra offers a suite of advanced tools. Beyond standard 2.4GHz deauthentication, it supports 5GHz deauthentication on compatible hardware like the RTL8720DN. Users can deploy beacon spam to test network resilience, create sophisticated "Evil Portals" for phishing awareness training, and perform deep packet inspection for traffic analysis. It also includes WPS attack vectors for penetration testing scenarios.

## Bluetooth and Peripheral Exploitation

The firmware leverages Bluetooth Low Energy (BLE) for various security tests. This includes BLE device spoofing, where the device can clone popular BLE signatures, and BLE spamming to test how different operating systems (iOS, Android, Windows) handle high volumes of advertising traffic. 

In addition to radio-based attacks, Infiltra provides tools for physical security testing:
- **RFID & NFC**: High-precision cloning and emulation of access control badges and identity tags.
- **Infrared (IR)**: A massive database of IR codes allows the device to act as a universal remote, with features like signal learning and the classic "TV-B-Gone" mode.
- **NRF24L01+**: Support for 2.4 GHz communication testing, mesh network simulation, and packet analysis for IoT environments.

## Hardware Ecosystem and Installation

Infiltra is designed to be highly portable across different form factors. Whether running on a handheld device with a screen like the M5StickC or in a "Headless Mode" on a standard ESP32 WROOM module, the firmware maintains a consistent feature set. The project simplifies the deployment process through a dedicated WebFlasher, allowing users to install the latest releases directly from their browser without complex toolchain setups.

By combining multiple wireless protocols into a single, unified firmware, Infiltra serves as a comprehensive "Swiss Army Knife" for hardware hackers and security professionals looking to explore and secure the wireless landscape.
