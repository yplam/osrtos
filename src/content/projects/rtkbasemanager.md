---
title: RTKBaseManager
summary: A configuration utility for ESP32-based Realtime Kinematics (RTK) base stations.
  It provides a web-based interface for managing WiFi credentials and system parameters,
  utilizing the Arduino framework and LittleFS for persistent storage.
slug: rtkbasemanager
codeUrl: https://github.com/jangleboom/RTKBaseManager
star: 8
lastUpdated: '2023-01-29'
rtos: freertos
libraries:
- littlefs
topics:
- esp32
- html
- javascript
- spiffs
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rtkrovermanager
- wifi-manager-for-micropython
- esp32-w5500-manager
- esp8266-w5500-manager
- wifimanager-rp2040w-lite
- ayreswifimanager-awm
---

## Overview

RTKBaseManager is a specialized configuration utility designed for Realtime Kinematics (RTK) base stations. As a submodule of the larger RTKBaseStation project, it provides a streamlined way to provision ESP32-based hardware with WiFi credentials and default operational parameters. By offering a user-friendly web interface, it eliminates the need for hardcoding network settings, making the deployment of RTK infrastructure more accessible.

## Connectivity and Provisioning

The project implements a smart connectivity workflow common in modern IoT devices. When the device boots and finds no saved WiFi credentials, it automatically enters Access Point (AP) mode. In this state, it broadcasts an SSID named "rtkbase" and hosts a web server at 192.168.4.1. 

Users can connect to this hotspot, fill out a web form with their local network details, and save the configuration. Upon rebooting, the device switches to client mode, connecting to the local network. It then becomes reachable via mDNS at "rtkbase.local" or through its assigned local IP address, allowing for ongoing management without physical access.

## Technical Architecture

RTKBaseManager is built on the Arduino framework for the ESP32 platform, leveraging the underlying FreeRTOS capabilities for multitasking. The project uses several key components to manage its web-based configuration system:

- **Filesystem Management**: It utilizes LittleFS for persistent storage of configuration data. The build system includes a custom Python script (`littlefsbuilder.py`) to automate the creation of the filesystem image using the `mklittlefs` tool.
- **Asynchronous Networking**: By using `ESPAsyncWebServer` and `ESPAsyncTCP`, the manager ensures that the web interface remains responsive without blocking the core RTK processing tasks.
- **PlatformIO Integration**: The project is structured for PlatformIO, with pre-defined environments for popular hardware like the Adafruit Feather ESP32 and the SparkFun ESP32 Thing Plus.

## Hardware Support

While primarily targeting the ESP32 ecosystem, the repository includes specific configurations for:
- **Adafruit Feather ESP32**: A versatile development board often used in portable RTK setups.
- **SparkFun ESP32 Thing Plus**: Another common target for high-precision GNSS applications.

The use of the `no_ota.csv` partition table suggests a focus on maximizing available application space and filesystem storage, which is critical when hosting web assets and complex configuration files on-chip.

## Getting Started

To build the project, developers need the PlatformIO environment and the `mklittlefs` binary appropriate for their operating system. The project expects the filesystem tool to be present in the root directory or accessible via the system path. Once the environment is set up, the `littlefsbuilder.py` script handles the integration of the web assets into the final firmware binary. This setup ensures that the HTML, CSS, and JavaScript required for the configuration portal are correctly flashed to the ESP32's internal storage.
