---
title: WiFiManager_RP2040W_Lite
summary: A lightweight WiFi and credentials manager for the Raspberry Pi Pico W (RP2040W)
  using the built-in CYW43439 WiFi module. It provides a web-based configuration portal
  for setting WiFi credentials and custom dynamic parameters, storing them in LittleFS
  for persistence.
slug: wifimanager-rp2040w-lite
codeUrl: https://github.com/khoih-prog/WiFiManager_RP2040W_Lite
star: 3
version: v1.6.0
lastUpdated: '2022-12-21'
rtos: ''
libraries:
- littlefs
topics:
- arduino-pico
- auto-connect
- auto-reconnect
- config-portal
- cyw43439
- dhcp
- dynamic-parameters
- file-system
- lightweight
- littlefs
- non-blocking
- raspberry-pi-pico-w
- rp2040w
- static-ip
- wifi-credentials
- wifi-manager
- wifi-multi-generic
- wifimanager-lite
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- wifimanager-rp2040w
- wifi-manager-for-micropython
- esp8266-w5500-manager
- pico-w-connection-manager-demo
- esp8266-w5100-manager
- rtkrovermanager
---

## Overview

WiFiManager_RP2040W_Lite is a specialized, lightweight library designed for the Raspberry Pi Pico W. It simplifies the process of managing WiFi connections and custom configuration parameters by providing a web-based configuration portal. This portal appears automatically when the device cannot connect to a known network or when triggered by a double reset, allowing users to input credentials and settings without hardcoding them into the firmware.

Unlike full-featured WiFi managers that often require complex callback functions to handle data persistence, this library focuses on simplicity. It automatically handles the saving and retrieving of data using the RP2040's LittleFS file system, making it an ideal choice for developers who need a robust connection manager with minimal overhead.

## Key Features

### Dynamic Configuration Portal
The library serves a web configuration portal from the RP2040W acting as an Access Point (AP). The portal is auto-adjusted to match the number of dynamic custom parameters defined in the sketch. Users can configure up to two sets of WiFi SSIDs and passwords for redundancy.

### Persistence with LittleFS
All credentials and custom parameters are saved in the non-volatile LittleFS memory. This ensures that the device can reconnect to the network after a power cycle or reboot without user intervention.

### MultiWiFi and Auto-Reconnection
Leveraging the WiFiMulti_Generic library, this manager can track multiple access points and automatically connect to the one with the best signal. It also includes logic to auto-reconnect if the connection is lost during operation, with configurable intervals to prevent blocking the main execution loop.

### Double Reset Detection
A built-in feature allows the device to detect if the reset button was pressed twice within a short window (default 10 seconds). This acts as a physical trigger to force the device into Configuration Portal mode, which is useful if the stored credentials are no longer valid or the network environment has changed.

## Technical Implementation

The library is built for the Earle Philhower `arduino-pico` core, which provides the necessary infrastructure for the CYW43439 WiFi chip on the Pico W. It integrates several helper libraries to provide a seamless experience:
- **WiFiWebServer**: Handles the HTTP server for the configuration portal.
- **DoubleResetDetector_Generic**: Manages the reset-based trigger logic.
- **WiFiMulti_Generic**: Provides robust multi-AP management.

## Getting Started

Integrating the library into a project involves defining the custom parameters and initializing the manager. Below is a basic example of how to set up dynamic parameters such as an MQTT server address:

```cpp
#include <WiFiManager_RP2040W_Lite.h>

// Define custom parameters
char MQTT_Server[35] = "mqtt.example.org";

MenuItem myMenuItems[] = {
  { "mqt", "MQTT Server", MQTT_Server, 34 },
};

uint16_t NUM_MENU_ITEMS = sizeof(myMenuItems) / sizeof(MenuItem);

WiFiManager_RP2040W_Lite* WiFiManager_RP2040W;

void setup() {
  WiFiManager_RP2040W = new WiFiManager_RP2040W_Lite();
  
  // Optional: Set a custom DHCP HostName
  WiFiManager_RP2040W->begin("PicoW_Controller");
}

void loop() {
  // The library handles reconnection logic internally
}
```

## Advanced Customization

Developers can further customize the user experience by injecting custom HTML styles, head elements, or CORS headers into the configuration portal. It also supports scanning for available WiFi networks, allowing users to select an SSID from a list rather than typing it manually, which reduces the likelihood of input errors.
