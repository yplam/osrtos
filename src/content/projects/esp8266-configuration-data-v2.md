---
title: ESP8266 Configuration Data V2
summary: A framework for managing ESP8266 configurations using SPIFFS and JSON. It
  provides structured classes for application settings, multi-AP Wi-Fi management,
  and server configurations using the ArduinoJSON library.
slug: esp8266-configuration-data-v2
codeUrl: https://github.com/jxmot/ESP8266-config-data-V2
star: 0
lastUpdated: '2017-11-12'
rtos: ''
libraries:
- spiffs
topics:
- arduinojson
- esp8266
- spiffs
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- esp8266-config-data-management
- settings-manager
- esp8266-web-server-and-spiffs-integration
- esp8266-littlefs-file-handler
- arduino-esp-utils
- esp-fs-webserver
---

## Overview

The ESP8266-config-data-V2 repository is a specialized boilerplate and demonstration project designed for the ESP8266 platform. It addresses a common challenge in embedded development: how to manage application settings and network credentials flexibly without hardcoding them into the firmware. By leveraging the SPIFFS (Serial Peripheral Interface Flash File System) and the ArduinoJSON library, this project provides a structured approach to externalizing configuration.

This version is an evolution of the original ESP8266-config-data project, featuring extensive improvements in how data is parsed and managed. It serves as both a learning tool for SPIFFS implementation and a robust starting point for IoT projects that require external configuration data.

## A Structured Configuration Model

The project is organized around three primary configuration categories, each represented by its own class derived from a common base:

*   **AppCfgData**: Manages general application metadata, such as the application name and feature control flags (e.g., a debug mute flag to silence serial output).
*   **WifiCfgData**: Handles network connectivity with support for multiple access points. The system can iterate through a list of configured SSIDs and passwords until a successful connection is established, providing resilience in environments with multiple available networks.
*   **SrvCfgData**: Stores remote server details, including IP addresses and port numbers for various services like HTTP, APIs, or WebSockets.

## Technical Implementation

The core logic resides in the `ConfigData` base class, which provides the foundation for reading files from SPIFFS and managing memory buffers. Each specific configuration class overrides the `parseJSON` method to map JSON keys to internal variables using the ArduinoJSON library (specifically tested with v5.11.0).

To manage these files, the project utilizes the ESP8266 Sketch Data Upload plugin for the Arduino IDE. This tool allows developers to flash the `/data` directory—containing the `.dat` JSON files—onto the ESP8266's flash memory independently of the compiled sketch. This separation allows for updating configuration parameters without re-compiling the entire application.

## Workflow and Usage

To use the system, developers define their settings in JSON files located in the `data` folder. For example, a Wi-Fi configuration might look like this:

```json
{ 
  "apoints":[
    {"wifi-ssid":"Home_Network","wifi-pass":"password123"},
    {"wifi-ssid":"Office_Network","wifi-pass":"securepass"}
  ],
  "apcount":2
}
```

In the Arduino sketch, the initialization process is streamlined and provides clear error handling. If a connection fails, the system can provide visual feedback, such as changing the blink rate of an on-board LED.

```cpp
void setup() 
{
    setupStart();

    if(setupApp("/appcfg.dat"))
        if(setupWiFi("/wificfg.dat")) 
            setupServers("/servercfg.dat");
        else 
            toggInterv = ERR_TOGGLE_INTERVAL;

    setupDone();
}
```

## Security and Best Practices

The repository includes a practical approach to security by using a `.gitignore` file that excludes files starting with an underscore (e.g., `_wificfg.dat`). This allows developers to maintain local files with real credentials while keeping the repository's default templates safe for public sharing. 

By providing a clean separation between code and data, ESP8266-config-data-V2 serves as an excellent reference for building maintainable and field-configurable embedded applications.
