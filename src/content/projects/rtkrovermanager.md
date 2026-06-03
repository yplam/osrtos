---
title: RTKRoverManager
summary: An ESP32-based configuration manager for RTK rover projects. It provides
  a web interface for setting WiFi credentials and system defaults, utilizing LittleFS
  for storage and an automatic Access Point mode for initial setup.
slug: rtkrovermanager
codeUrl: https://github.com/jangleboom/RTKRoverManager
star: 3
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
- rtkbasemanager
- wifimanager-rp2040w-lite
- wifi-manager-for-micropython
- esp32-w5500-manager
- wifimanager-rp2040w
- esp8266-w5100-manager
---

RTKRoverManager is a specialized configuration utility designed for ESP32-based Real-Time Kinematics (RTK) rover projects. As a submodule of the larger RTKRover ecosystem, it simplifies the process of managing device credentials and default parameters, ensuring that hardware can be deployed and reconfigured in the field without requiring firmware recompilation.

## Core Functionality

The primary purpose of RTKRoverManager is to handle the initial network setup and parameter configuration for an RTK rover. When the device boots, it checks the internal LittleFS filesystem for saved WiFi credentials. If no credentials are found, the manager automatically triggers an Access Point (AP) mode. This AP uses a unique SSID based on the device's chip ID (e.g., "rtkrover" + chipID) and hosts a web server at a static IP address (192.168.4.1).

Users can connect to this local network via a smartphone or laptop to access a web-based configuration form. This form allows for the entry of WiFi SSIDs, passwords, and other project-specific default values. Once saved, the data is written to the LittleFS partition, and the device reboots to connect to the specified network.

## Technical Implementation

The project is built using the Arduino framework within the PlatformIO ecosystem, specifically targeting the Adafruit Feather ESP32. It leverages several key technologies to provide a robust configuration experience:

- **Filesystem Management**: The project uses LittleFS for persistent storage. It includes a custom `littlefsbuilder.py` script and the `mklittlefs` tool to integrate filesystem image creation directly into the PlatformIO build process.
- **Asynchronous Networking**: By utilizing `ESPAsyncWebServer` and `ESPAsyncTCP`, the manager provides a responsive web interface that doesn't block the main execution loop, which is critical for maintaining system stability during the configuration phase.
- **Unit Testing**: Integration of the `AUnit` library suggests a focus on reliability, allowing for automated testing of the configuration logic.

## Hardware and Environment

While the default configuration targets the `featheresp32` board, the codebase is generally compatible with the broader ESP32 family. The build system is optimized for macOS (Silicon), but it is designed to be cross-platform provided the appropriate `mklittlefs` binary is available for the host operating system. 

## Integration

RTKRoverManager is intended to be used as a library or submodule. Developers can integrate it into their RTK projects to provide a professional setup workflow. By abstracting the complexity of WiFi provisioning and parameter storage, it allows developers to focus on the core RTK positioning logic while ensuring the end-user experience remains seamless and accessible.
