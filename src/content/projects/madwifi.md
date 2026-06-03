---
title: MadWifi
summary: A WiFi security auditing tool for the ESP8266 platform that enables raw 802.11
  frame injection. It supports deauthentication attacks, beacon frame broadcasting,
  and network stress testing, utilizing the ESP8266 Non-OS SDK and SPIFFS for persistent
  configuration.
slug: madwifi
codeUrl: https://github.com/DaVieS007/madWiFi
star: 4
lastUpdated: '2017-01-12'
rtos: ''
libraries:
- spiffs
topics:
- deauthentication-attack
- esp8266
- spiffs
- wifi
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- deautherx
- wifiphisher-for-esp32
- ghost-esp
- wifi-nightmare
- evil-bw16-webui
- ghostesp
---

MadWifi is a specialized firmware developed for the Espressif ESP8266 platform, designed to demonstrate WiFi vulnerabilities and perform stress tests on wireless infrastructure. By leveraging the low-level capabilities of the ESP8266 radio, the project allows for the injection of raw 802.11 frames, enabling features like deauthentication attacks and beacon frame manipulation.

## Core Functionality

The project provides a suite of tools for interacting with WiFi networks at the MAC layer. It is particularly useful for security researchers and network administrators looking to test the resilience of their wireless environments. Key features include:

- **WiFi AP and Client Deauthentication**: The firmware can send deauth packets to disconnect clients from an Access Point or target the AP itself. This is useful for testing how devices recover from sudden disconnections.
- **WPA2 Beacon Frame Injection**: MadWifi can broadcast custom beacon frames, allowing for the creation of multiple virtual SSIDs. This can be used to test client behavior when encountering many available networks or to simulate specific network environments.
- **WiFi Distortion Test**: This feature sends random fragments into the air to test the resilience of wireless infrastructure against interference and malformed packets.
- **SPIFFS Support**: The project utilizes the Serial Peripheral Interface Flash File System (SPIFFS) to provide multi-configuration support. Users can save, load, and delete different attack profiles directly on the device's flash memory.

## Technical Implementation

MadWifi is built using the Arduino framework for ESP8266 but relies heavily on the underlying Espressif SDK. A critical requirement for the project is the use of **SDK version 1.3.0**. This specific version is necessary because later releases of the Espressif SDK restricted the ability to inject certain types of control frames, which is central to MadWifi's functionality.

The system architecture includes several interesting components:
- **Promiscuous Mode**: The ESP8266 is placed in a mode where it can sniff all WiFi packets on a specific channel. These packets are then processed by a custom callback function (`promisc_cb`) to identify targets.
- **Frame Parsing**: The firmware includes logic to parse incoming beacons and data frames, extracting BSSIDs, SSIDs, and client MAC addresses to build a map of the local wireless environment.
- **Serial Interface**: A comprehensive command-line interface (CLI) is provided over the USB-CDC (Virtual Serial Port). This allows users to interact with the device using a standard serial monitor at 115200 baud.

## Hardware and User Interface

The project is designed to run on standard ESP8266 modules. It makes use of onboard LEDs for status feedback, including a "LED Breathe" effect (dimming) to indicate the system is idle and rapid blinking during active operations. The hardware's FLASH button is also utilized; pressing it during boot can format the SPIFFS filesystem, while pressing it during operation can interrupt an autorun sequence.

## Available Commands

Interaction with MadWifi is handled through a series of serial commands:
- `show AP` / `show client`: Lists all discovered Access Points and connected clients.
- `add_beacon` / `del_beacon`: Manages the list of SSIDs for beacon injection.
- `deny [MAC]` / `allow [MAC]`: Manages the blacklist/whitelist for targeting.
- `start` / `stop`: Toggles the active attack or stress test mode.
- `config save [name]` / `config load [name]`: Manages persistent settings on the flash storage.

## Legal and Ethical Considerations

The developers include a strong disclaimer regarding the use of this tool. Blocking or disturbing radio frequencies, including IEEE 802.11 layers, may be a criminal offense depending on local laws. MadWifi is intended strictly for educational purposes, authorized security demonstrations, and professional stress testing of wireless infrastructure.
