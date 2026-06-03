---
title: DeautherX
summary: An open-source firmware for the ESP8266 designed to perform 802.11 network
  security testing, including deauthentication and Evil Twin attacks. It features
  a user-friendly web interface, a comprehensive serial command-line interface, and
  support for OLED display modules. The project serves as both a security auditing
  tool and an educational resource for learning about WiFi protocols and microcontroller
  programming.
slug: deautherx
codeUrl: https://github.com/BlackTechX011/DeautherX
siteUrl: https://blacktechx011.github.io/DeautherX_Docs/
star: 151
lastUpdated: '2024-10-17'
rtos: ''
libraries:
- spiffs
topics:
- blacktechx
- blacktechx011
- deauthentication-attack
- deauther
- deautherx
- esp8266
- esp8266-deauther
- esp8266-evil-twin
- evil-twin
- evil-twin-attack
- modefide-display-interface
- nodmcu-firebase
- webinterface
- wifi
- wifi-deauther
- wifi-hacking
- wifi-security
- wifihacking
- wifihackingtool
isShow: true
image: /202602/DeautherX.webp
createdAt: '2026-02-11'
updatedAt: '2026-02-11'
relatedProjects:
- madwifi
- wifiphisher-for-esp32
- evil-bw16-webui
- wifi-nightmare
- minigotchi-esp32
- infiltra-firmware
---

DeautherX is a specialized firmware for the ESP8266 microcontroller, engineered to facilitate 802.11 network testing and security auditing. As an evolution of the popular ESP8266 Deauther project, it introduces several advanced features, including a customizable Evil Twin attack module and a WiFi signal strength checker. The project is primarily used to demonstrate vulnerabilities in the 2.4GHz WiFi spectrum, specifically targeting the deauthentication frame mechanism used in older wireless standards.

## Core Functionality and Attacks

The primary feature of DeautherX is the deauthentication attack. This mechanism allows the ESP8266 to send forged frames that disconnect devices from their access points. While newer WiFi 6-enabled hardware often includes protections against these types of denial-of-service attacks, a significant portion of the legacy IoT ecosystem remains vulnerable. By using DeautherX, network administrators can test their infrastructure to identify devices that require security upgrades or transition to more modern protocols.

Beyond simple deauthentication, the firmware includes an "Evil Twin" capability. This allows the device to mimic an existing access point, which can be used to demonstrate how rogue networks can deceive users. Additionally, the integrated WiFi signal strength checker provides real-time feedback on the wireless environment, assisting in the location of access points or the optimization of testing parameters.

## Versatile User Interfaces

DeautherX is designed to be accessible through multiple control methods, catering to different use cases:

- **Web Interface:** The firmware hosts a mobile-friendly web server that provides a graphical interface for scanning networks, selecting targets, and launching attacks without needing to write code.
- **Serial Command Line:** For power users and automation, a robust serial interface supports a wide array of commands. This CLI allows for granular control over packet injection, system configuration, and file management.
- **Display Interface:** The project supports various OLED displays and physical buttons, enabling standalone operation. This is particularly useful for field testing where a laptop or smartphone might not be convenient.

## Technical Implementation

Built on the Arduino framework for ESP8266, DeautherX leverages the hardware's ability to operate in promiscuous mode to capture and inject raw 802.11 packets. It utilizes the SPIFFS (Serial Peripheral Interface Flash File System) to manage configuration settings, device name lists, and the web interface assets. This file-based architecture allows for persistent storage of scan results and custom SSID lists for beacon spamming attacks.

Configuration is highly customizable through a dedicated settings module. Users can adjust parameters such as the default WiFi channel, MAC address spoofing (for both Access Point and Station modes), attack timeouts, and LED status indicators. The firmware also includes a script execution engine, allowing users to run sequences of serial commands stored in the internal flash memory.

## Educational and Security Context

While DeautherX is a powerful tool for security auditing, it is also a significant educational resource. It provides a practical platform for learning about low-level wireless communication, the structure of 802.11 management frames, and the constraints of embedded systems development. The project documentation emphasizes its use as a proof of concept for testing and educational purposes, encouraging users to only operate the firmware against networks they own or have explicit permission to test.
