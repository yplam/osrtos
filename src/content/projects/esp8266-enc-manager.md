---
title: ESP8266_ENC_Manager
summary: A connection and credentials manager for ESP8266 boards using ENC28J60 Ethernet
  modules. It provides a fallback web configuration portal for runtime setup of static
  or DHCP IP addresses, DNS servers, and NTP settings, utilizing the LwIP stack and
  Arduino framework.
slug: esp8266-enc-manager
codeUrl: https://github.com/khoih-prog/ESP8266_ENC_Manager
siteUrl: https://github.com/khoih-prog/ESP8266_ENC_Manager/wiki
star: 1
version: v1.0.0
lastUpdated: '2022-12-13'
rtos: ''
libraries:
- littlefs
- lwip
- spiffs
topics:
- config-portal
- credential-manager
- credentials
- dhcp-hostname
- dns-server
- double-reset-detector
- enc28j60
- esp8266
- hostname
- littlefs
- lwip
- lwip-enc28j60
- lwip-ethernet
- nodemcu
- nodemcu-esp8266
- staticip
- support-arduinojson
- web-portal
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- esp8266-w5100-manager
- esp8266-w5500-manager
- asyncesp8266-enc-manager
- asyncesp8266-w5100-manager
- esp32-w5500-manager
- asyncesp8266-w5500-manager
---

## Overview

ESP8266_ENC_Manager is a comprehensive connection and credentials manager designed specifically for ESP8266 microcontrollers paired with ENC28J60 Ethernet controllers. In many IoT deployments, hardcoding network credentials or static IP addresses is impractical. This library solves that problem by providing a fallback Web ConfigPortal that allows users to configure Ethernet settings—such as DHCP/Static IP, DNS, and Hostnames—at runtime through a browser-based interface.

Built as an evolution of the popular WiFiManager concept, this library adapts those features for wired Ethernet connections using the LwIP ENC28J60 driver. It ensures that if a connection cannot be established, the device can host an Access Point (AP) where the user can input the necessary network parameters without needing to reflash the firmware.

## Key Features

- **Dynamic Network Configuration**: Easily switch between DHCP and Static IP modes without modifying code.
- **Fallback ConfigPortal**: Automatically starts a web-based configuration portal if connection fails or if triggered by a physical switch or a double reset.
- **Advanced Network Settings**: Supports custom DNS servers, personalized hostnames (RFC952-conformed), and Cross-Origin Resource Sharing (CORS) headers.
- **Time Management**: Integrated NTP configuration and auto-timezone features, allowing the system to retrieve and set local time based on region-specific strings (e.g., "America/New_York").
- **Storage Flexibility**: Saves configuration data to non-volatile memory using LittleFS or SPIFFS in JSON format.
- **Double Reset Detection**: Integration with `ESP_DoubleResetDetector` allows users to force the configuration portal by quickly resetting the device twice.

## Technical Implementation

The library leverages the ESP8266 LwIP stack to manage Ethernet communication via the SPI interface connected to the ENC28J60. Configuration data is handled using `ArduinoJson`, ensuring that parameters are stored efficiently in the filesystem. 

One of the unique aspects of this library is its handling of "Multiple Definitions" linker errors. By providing both `.h` and `.hpp` files, it allows developers to include the library across multiple files in a project while maintaining a single implementation point, which is a common challenge in complex Arduino projects.

## Getting Started

To use the library, you typically initialize the `ESP8266_ENC_Manager` object and call `startConfigPortal()`. If the device has stored credentials, it will attempt to connect; otherwise, it will launch the AP for user input.

```cpp
#include <ESP8266_ENC_Manager.h>

void setup() {
  // Initialize the manager with a personalized hostname
  ESP8266_ENC_Manager ESP8266_ENC_manager("My-Ethernet-Device");

  // Starts the portal if no config is found or connection fails
  ESP8266_ENC_manager.startConfigPortal();
}

void loop() {
  // Your application logic
}
```

## Custom Parameters and Extensibility

Beyond basic networking, the library allows developers to add custom dynamic parameters to the configuration portal. For instance, if your project requires a ThingSpeak API Key or specific GPIO pin assignments for sensors, you can define these as `ESP8266_EMParameter` objects. These parameters are then rendered as HTML input fields in the ConfigPortal and saved alongside the network settings, making the library a complete system-wide configuration tool.
