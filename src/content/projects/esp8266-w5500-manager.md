---
title: ESP8266_W5500_Manager
summary: A connection and credentials manager for ESP8266 boards using the W5500 Ethernet
  controller. It provides a web-based configuration portal for setting static or DHCP
  IP addresses, DNS servers, and custom parameters at runtime, with support for LittleFS
  and SPIFFS.
slug: esp8266-w5500-manager
codeUrl: https://github.com/khoih-prog/ESP8266_W5500_Manager
star: 2
version: v1.0.0
lastUpdated: '2022-12-13'
rtos: ''
libraries:
- lwip
- littlefs
- spiffs
topics:
- config-portal
- credential-manager
- credentials
- dhcp-hostname
- dns-server
- double-reset-detector
- esp8266
- hostname
- littlefs
- lwip
- lwip-ethernet
- lwip-w5500
- nodemcu
- nodemcu-esp8266
- staticip
- support-arduinojson
- w5500
- web-portal
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- esp8266-w5100-manager
- esp32-w5500-manager
- asyncesp8266-w5500-manager
- asyncesp8266-w5100-manager
- esp8266-enc-manager
- asyncesp8266-enc-manager
---

## Overview

The ESP8266_W5500_Manager is a specialized library designed for ESP8266-based boards utilizing the W5500 Ethernet controller. It serves as a robust connection and credentials manager, providing a fallback web-based configuration portal. This allows developers to configure network settings—such as Static or DHCP IP addresses, DNS servers, and personalized hostnames—at runtime without needing to recompile or hardcode sensitive information into the firmware.

Built upon the foundations of the popular ESP_WiFiManager, this library is tailored specifically for the LwIP W5500 stack. It is particularly useful for industrial or IoT applications where a physical Ethernet connection is preferred over WiFi, but the flexibility of a dynamic configuration interface is still required.

## Key Features

- **Web Configuration Portal**: Automatically starts an Access Point (AP) if connection fails or is requested, allowing users to configure settings via a browser.
- **Flexible IP Configuration**: Supports both DHCP and Static IP setups, including configurable DNS servers.
- **Dynamic Parameters**: Allows developers to add custom application-specific parameters (like API keys or sensor thresholds) to the configuration portal.
- **Filesystem Integration**: Supports modern ESP8266 filesystems including LittleFS and SPIFFS for persistent storage of configuration data in JSON format.
- **Advanced Networking**: Includes support for CORS (Cross-Origin Resource Sharing) headers and automatic Timezone/NTP configuration.
- **Double Reset Detection**: Integrates with ESP_DoubleResetDetector to trigger the configuration portal via hardware resets.

## Technical Implementation

The library leverages the ESP8266's ability to act as an Access Point even when the primary connection is Ethernet-based. When the device enters configuration mode, it hosts a web server (defaulting to port 80) where users can input credentials. These settings are then serialized into JSON and stored in the onboard flash memory using LittleFS or SPIFFS.

To avoid common linker issues in multi-file projects, the library uses a specific header implementation strategy. Developers are advised to include `ESP8266_W5500_Manager.hpp` in general files and `ESP8266_W5500_Manager.h` in only one main implementation file to prevent "Multiple Definitions" errors.

## Hardware Support

The library is optimized for ESP8266 boards paired with the Wiznet W5500 Ethernet module. It requires the ESP8266 Arduino Core (v3.0.2+) and is compatible with standard Arduino IDE or PlatformIO development environments.

## Getting Started

To integrate the manager into a project, you define the filesystem and initialize the manager object. Below is a basic example of setting up the manager with custom parameters:

```cpp
#include <LittleFS.h>
#include <ESP8266_W5500_Manager.h>

// Initialize the manager with a personalized hostname
ESP8266_W5500_Manager ESP8266_W5500_manager("My-IoT-Device");

void setup() {
  // Start the configuration portal
  if (!ESP8266_W5500_manager.startConfigPortal()) {
    Serial.println("Failed to connect and hit timeout");
  }
  
  Serial.println("Connected to Ethernet...");
}

void loop() {
  // Application logic
}
```

## Dynamic Parameter Management

One of the most powerful aspects of this library is the ability to handle custom data. By using the `ESP8266_EMParameter` class, developers can create fields for things like ThingSpeak API keys or MQTT broker addresses. These fields appear automatically in the web UI and are handled by the library's internal JSON parser, making it easy to save and retrieve application-specific settings alongside network credentials.
