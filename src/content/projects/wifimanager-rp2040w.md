---
title: WiFiManager_RP2040W
summary: A WiFi connection manager for Raspberry Pi Pico W that provides a fallback
  web configuration portal for runtime credential management. It supports MultiWiFi,
  custom parameters, and uses LittleFS for persistent storage of network settings
  on the RP2040 platform.
slug: wifimanager-rp2040w
codeUrl: https://github.com/khoih-prog/WiFiManager_RP2040W
star: 6
version: v1.0.0
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
- littlefs
- non-blocking
- raspberry-pi-pico-w
- rp2040w
- static-ip
- wifi-credentials
- wifi-manager
- wifi-multi-generic
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- wifimanager-rp2040w-lite
- esp8266-w5100-manager
- esp32-w5500-manager
- esp8266-w5500-manager
- asyncesp8266-w5500-manager
- blynk-wifinina-wm
---

WiFiManager_RP2040W is a specialized library designed for the Raspberry Pi Pico W, enabling seamless WiFi credential management through a web-based configuration portal. Based on the popular WiFiManager concept, this implementation is optimized for the RP2040's CYW43439 wireless chip and the Earle Philhower `arduino-pico` core. It solves the common problem of hardcoding WiFi credentials by allowing users to connect to the device's own Access Point and configure network settings via a standard web browser.

The library is particularly powerful due to its support for MultiWiFi, which allows the device to store and attempt connections to multiple access points. It integrates with LittleFS to store these credentials securely in the flash memory, ensuring that settings persist across reboots without requiring manual intervention in the source code.

## Key Features

- **ConfigPortal**: An automatic Access Point mode that launches when no WiFi connection can be established or when triggered by the user. It serves a mobile-friendly web interface for network selection.
- **Double Reset Detection**: Integration with the `DoubleResetDetector_Generic` library allows users to force the device into configuration mode by simply pressing the reset button twice in quick succession.
- **Custom Parameters**: Developers can easily add their own fields to the configuration page, such as MQTT broker addresses, API tokens, or device IDs, which are then saved alongside WiFi settings.
- **CORS Support**: Cross-Origin Resource Sharing can be enabled to allow web applications to interact with the configuration portal securely.
- **Static IP Configuration**: Support for custom Station (client) static IP configurations for environments where DHCP is not preferred.

## Technical Implementation

The library is built to be lightweight, using significantly less memory than full-fledged WiFiManager ports while maintaining a robust feature set. It operates by starting a DNS server and a web server on the Pico W. When a user connects to the 'RP2040W_ConfigPortal' SSID, the captive portal redirects them to a configuration page where they can scan for local networks and input passwords.

## Getting Started

To use the library, you must have the `arduino-pico` core installed. The basic implementation involves defining a `WiFiManager_RP2040W` object and calling the configuration portal logic within your setup function. 

```cpp
#include <WiFiManager_RP2040W.h>

void setup() {
  WiFiManager_RP2040W RP2040W_WiFiManager;
  
  // Starts the portal with a specific SSID and Password
  if (!RP2040W_WiFiManager.startConfigPortal("PicoW_Config", "password123")) {
    Serial.println("Failed to connect and hit timeout");
  }

  // If you get here, you are connected to the WiFi
  Serial.println("Connected!");
}
```

## Ecosystem and Dependencies

WiFiManager_RP2040W relies on several high-quality libraries from the same ecosystem to provide its functionality:
- **WiFiWebServer**: Handles the HTTP requests for the configuration portal.
- **WiFiMulti_Generic**: Manages multiple WiFi profiles and automatic reconnection.
- **DoubleResetDetector_Generic**: Provides the logic for detecting rapid reset cycles.
- **Functional-Vlpp**: Enables the use of lambda functions for cleaner server callbacks.

This library is an essential tool for RP2040W developers looking to create user-friendly IoT devices that can be deployed in various network environments without needing to re-flash the firmware.
