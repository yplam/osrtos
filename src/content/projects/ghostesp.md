---
title: GhostESP
summary: GhostESP is a multi-protocol security testing toolkit for ESP32 microcontrollers,
  built on the ESP-IDF framework and FreeRTOS. It provides extensive capabilities
  for Wi-Fi, BLE, Sub-GHz, NFC, and Infrared auditing across a wide range of hardware,
  including M5Stack devices and custom development boards.
slug: ghostesp
codeUrl: https://github.com/GhostESP-Revival/GhostESP
siteUrl: https://ghostesp.net
version: v1.9.8
lastUpdated: '2026-04-21'
licenses:
- GPL-3.0
image: /202604/esp32-c6-devkitc-1-isometric_v1.2.webp
rtos: freertos
libraries:
- lvgl
- lwip
topics:
- embedded
- esp-idf
- esp32
- network-security
- wardriving
- wifi
isShow: true
createdAt: '2026-04-26T05:11:38+00:00'
updatedAt: '2026-04-26T05:11:38+00:00'
---

GhostESP is a powerful, versatile wireless testing tool that transforms standard ESP32 hardware into a comprehensive security auditing suite. Originally developed as a specialized firmware, this "Revival" version is a detached fork of the archived project, continuing development to support the latest Espressif hardware and security research techniques. Built on the ESP-IDF framework and powered by FreeRTOS, GhostESP leverages the full potential of the ESP32's radio capabilities to provide a portable alternative to much more expensive dedicated hardware.

### Multi-Protocol Security Auditing

The core strength of GhostESP lies in its multi-protocol support. It isn't limited to just one type of wireless communication; instead, it provides a unified interface for interacting with various signals:

*   **Wi-Fi Analysis:** Beyond basic scanning, GhostESP supports advanced operations like Evil Portal creation, deauthentication attacks, and handshake/PMKID capture. It even includes a USB dongle mode that allows users to stream captured traffic directly into Wireshark via an extcap stream.
*   **Bluetooth Low Energy (BLE):** The firmware includes scanners for general BLE devices, AirTags, and Flipper Zero devices. It also features BLE spamming modes and skimmer detection tools.
*   **Sub-GHz and NFC:** By integrating external hardware like the CC1101 radio or PN532 NFC module, GhostESP can scan across 64 channels, decode over 20 different protocols, and replay signals. It maintains high compatibility with the Flipper Zero ecosystem, allowing users to import and export `.sub`, `.ir`, and `.nfc` files.
*   **Infrared:** The project includes a robust IR library for learning, transmitting, and even "dazzling" IR receivers, complete with a universal library for controlling various consumer electronics.

### Hardware Support and User Interface

GhostESP is designed to be highly portable and adaptable. It supports almost the entire ESP32 family, including the ESP32-Wroom, S2, S3, C3, C5, and C6. This wide hardware compatibility means it can be flashed onto everything from a simple DevKitC to more integrated handhelds like the M5 Cardputer, LilyGo T-Deck, or the CYD (Cheap Yellow Display).

For devices with screens, GhostESP utilizes the LVGL (Light and Versatile Graphics Library) to provide a polished, menu-driven interface. This makes it accessible for field work where a laptop might be impractical. On devices like the ESP32-S3, the project also enables USB Host capabilities, allowing for BadUSB script execution and remote keyboard control over the "GhostLink" interface.

### Advanced Networking and Wardriving

For researchers interested in signals intelligence, GhostESP offers sophisticated wardriving features. It can export data in formats compatible with popular mapping tools, tracking Wi-Fi, BLE, and GPS coordinates simultaneously. It also supports specialized network attacks such as DHCP starvation, ARP scanning, and DNS/WPS configuration management. 

### Integration and Extensibility

The project is deeply integrated with the ESP-IDF ecosystem, utilizing components like `lwIP` for networking and `mbedTLS` for secure communications. It also introduces "GhostLink," a dual-device command and display interface that allows two GhostESP units to work in tandem, sharing displays or relaying commands. This modular approach, combined with its open-source nature, makes it a constantly evolving platform for the security community.
