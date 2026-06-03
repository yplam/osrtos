---
title: Pico W Connection Manager Demo
summary: A demonstration project for the Raspberry Pi Pico W that provides a C++ connection
  manager class for Wi-Fi connectivity. It features a command-line interface for scanning
  and connecting to access points, a LittleFS-based configuration storage system,
  and an LwIP webserver for remote hardware control.
slug: pico-w-connection-manager-demo
codeUrl: https://github.com/rppicomidi/pico-w-connection-manager-demo
star: 3
lastUpdated: '2023-03-23'
rtos: ''
libraries:
- littlefs
- lwip
- parson
topics:
- ajax
- cgi
- connection-manager
- littlefs
- lwip
- pico-w
- ssi
- ssid
- webserver
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- wifimanager-rp2040w-lite
- wifimanager-rp2040w
- ble-based-wi-fi-provisioning-for-raspberry-pi-pico-w-pico-2-w
- esp32-web-server-using-spiffs
- rtkrovermanager
- esp8266-web-server-and-spiffs-integration
---

## Overview

The Pico W Connection Manager Demo is a comprehensive example project designed for the Raspberry Pi Pico W. It showcases how to manage Wi-Fi connectivity using a dedicated C++ class, `Pico_w_connection_manager`, within a standard "super-loop" architecture rather than an RTOS. The project integrates several essential embedded components, including a TCP/IP stack, a flash-based filesystem, and a command-line interface (CLI) to provide a robust foundation for wireless IoT applications.

## Key Features

The project is centered around a user-friendly CLI that allows developers to interact with the Wi-Fi hardware in real-time. Through a serial console (UART or USB), users can perform various networking tasks:

- **Wi-Fi Scanning and Connection**: Scan for available SSIDs, handle manual connections to hidden networks, and manage passphrases.
- **Persistent Storage**: Uses the LittleFS filesystem and the Parson JSON library to store Wi-Fi credentials and settings in the Pico W's program flash, enabling automatic reconnection after a power cycle.
- **Webserver Integration**: Once connected, the demo launches an LwIP-based webserver. This server provides two different methods for controlling the on-board LED: one using Server Side Includes (SSI) and Common Gateway Interface (CGI), and another using Ajax for a more modern, responsive experience.
- **Link Management**: Features automatic reconnection logic for link loss and manual disconnection/de-initialization commands.

## Technical Architecture

The software is built using the Raspberry Pi Pico C/C++ SDK and targets the CYW43439 wireless chip. Because it avoids an RTOS, the system relies on a non-blocking task-based approach. The `Pico_w_connection_manager` class abstracts the complexities of the CYW43 driver and LwIP stack, providing a clean API for the main application loop.

### Core Components
- **LwIP**: Handles the TCP/IP stack for the webserver and Wi-Fi data.
- **LittleFS**: Provides a wear-leveled filesystem on the internal flash to store configuration files.
- **EmbeddedCli**: A robust CLI implementation that supports command history and auto-completion.
- **Parson**: A lightweight JSON parser used to serialize Wi-Fi settings for storage.

## Command Line Interface

The demo provides a suite of `wifi-` commands to manage the device. For example, the `wifi-scan-connect` command initiates a scan and prompts the user to select a network index, while `wifi-status` provides real-time feedback on the link state and IP address. Other commands like `wifi-country` allow users to set regulatory domains to ensure compliance with local wireless laws.

## Webserver Demonstration

The included webserver serves as a practical example of hardware interaction over a network. It includes:
- **SSI (Server Side Includes)**: Dynamically inserts the current LED state into the HTML before it is sent to the client.
- **CGI (Common Gateway Interface)**: Processes form submissions to toggle the LED hardware.
- **Ajax/JSON**: Demonstrates how to update the UI and control hardware without a full page reload, using POST requests containing JSON payloads.

## Getting Started

The project uses a standard CMake build system. Developers need the Pico SDK installed and configured. The build process involves generating the filesystem data from the `fsdata` directory using a provided script, which is then compiled into the binary. This ensures that the webserver's HTML, CSS, and image assets are embedded directly into the firmware image.
