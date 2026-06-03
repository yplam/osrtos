---
title: Open Authenticator App
summary: An open-source TOTP authenticator application built for the ESP32-based Open-Authenticator
  hardware. It utilizes the ESP-IDF framework, LVGL for the user interface, and supports
  WiFi-based configuration and secure token storage.
slug: open-authenticator-app
codeUrl: https://github.com/Open-Authenticator/open-authenticator-app
star: 22
version: v1.0
lastUpdated: '2021-07-04'
rtos: freertos
libraries:
- lvgl
- lwip
- spiffs
topics:
- esp-idf
- esp32
- freertos
- iot
- lvgl
- totp
- wifi
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- esp32-mfa-authenticator
- securegen
- esp32-u2f-security-key
- smartlock-for-disco-l475vg-iot01a
- opensk
- autonetwork-library
---

Open Authenticator is a security-focused project providing an open-source alternative to commercial hardware authenticators. This repository contains the firmware application designed specifically for the Open-Authenticator hardware platform, powered by the ESP32 microcontroller.

At its core, the application implements Time-based One-Time Password (TOTP) functionality, allowing users to secure their accounts with two-factor authentication (2FA). The project leverages the robust ESP-IDF (Espressif IoT Development Framework) version 4.2, ensuring a stable and performant base for embedded operations.

## User Interface and Interaction

The application features a graphical user interface built with the LVGL (Light and Versatile Graphics Library). It is configured to drive a monochrome SSD1306 OLED display, providing a clear interface for viewing authentication codes. Users navigate the device using physical buttons (BOOT/SELECT and RESET), making it a standalone security tool that doesn't require a constant connection to a host computer once configured.

## Configuration and Storage

Data persistence is handled through a structured storage system. The application uses JSON files stored on the device's filesystem (SPIFFS) to manage configuration. This allows for easy testing and initial setup by pre-loading JSON configuration files during the flashing process:

- `/oa_store/wifi.json`: Stores WiFi credentials (SSID and passwords) for connectivity.
- `/oa_store/totp_key.json`: Manages the TOTP secrets and their associated aliases.

Example of the TOTP configuration format:

```json
{"c":2,"a":["Test-1", "Test-2"],"k":["JBSWY3DPEHPK3PXP", "DFSWY3DPEHPK3AXP"]}
```

## Technical Architecture

The project is highly modular, utilizing several ESP-IDF components and external libraries to handle the complexities of a modern embedded device:

- **FreeRTOS**: The underlying real-time operating system that manages task scheduling and system resources.
- **LwIP**: Provides the TCP/IP stack for WiFi communication, necessary for time synchronization.
- **SPIFFS**: Used for the internal flash filesystem to store user secrets and settings.
- **LVGL**: Handles the rendering of the UI on the 128x64 display, including support for monochrome themes.
- **DS3231**: Integration with an external Real-Time Clock (RTC) component to ensure accurate timekeeping, which is critical for generating valid TOTP codes.

## Development and Deployment

Developers can compile the firmware using the standard ESP-IDF build system. The project includes a custom `partition_table.csv` and `sdkconfig.defaults` to manage the application code and the data storage areas effectively. 

Flashing the firmware requires a USB-UART converter connected to the board's UART port. The process involves putting the board into download mode by manipulating the BOOT and RESET buttons. Once flashed, the device operates as a dedicated security token, generating 6-digit codes that can be verified against standard TOTP implementations.
