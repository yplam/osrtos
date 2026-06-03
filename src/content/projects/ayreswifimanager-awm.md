---
title: AyresWiFiManager (AWM)
summary: A professional Wi-Fi manager for ESP32 and ESP8266 microcontrollers featuring
  a real captive portal and modern UI served from LittleFS. It provides robust credential
  storage, configurable fallback policies, NTP synchronization, and integrated status
  LED/button handling.
slug: ayreswifimanager-awm
codeUrl: https://github.com/ayresnet/AyresWiFiManager
star: 15
version: 2.0.2
lastUpdated: '2025-09-30'
rtos: freertos
libraries:
- littlefs
topics:
- arduino-ide
- arduinojson
- css3
- dns
- esp32
- esp8266
- html5
- iot
- javascript
- json
- littlefs
- ntp
- platformio
- ux-experience
- webserver
- wifi
isShow: false
createdAt: '2026-01-20'
updatedAt: '2026-01-20'
relatedProjects:
- autonetwork-library
- esp32-w5500-manager
- esp8266-w5100-manager
- esp-fs-webserver
- wifimanager-rp2040w
- asyncesp8266-w5500-manager
---

## Overview

AyresWiFiManager (AWM) is a professional-grade Wi-Fi management library designed for ESP32 and ESP8266 microcontrollers. It serves as a modern alternative to traditional Wi-Fi managers, focusing on providing a robust captive portal experience, explicit configuration policies, and a lightweight user interface that does not rely on external dependencies or CDNs. By leveraging LittleFS for credential storage and offering a highly configurable API, AWM is tailored for production-ready IoT projects where reliability and user experience are paramount.

## The Captive Portal Experience

One of the standout features of AyresWiFiManager is its implementation of a "real" captive portal. Unlike simple Access Point (AP) web servers, AWM includes a DNS catch-all mechanism and specific routes designed to trigger OS-level connectivity checks on Android, iOS, and Windows. This ensures that when a user connects to the device's AP, the operating system automatically prompts them to sign in, redirecting them to the local configuration page at `http://192.168.4.1`.

The UI itself is served directly from the device's flash memory using LittleFS. It features a modern design with signal strength indicators, network scanning capabilities, and secure forms for credential entry. Because the files are stored locally in the `/data` directory, the portal remains fully functional even in environments without internet access.

## Smart Fallback and Connectivity Policies

AWM moves away from "auto-magic" configurations, instead offering developers explicit control over how the device handles connection failures. Through its `FallbackPolicy` system, developers can choose between several behaviors:

- **NO_CREDENTIALS_ONLY**: Opens the portal only if no Wi-Fi credentials are found (default).
- **ON_FAIL**: Opens the portal if the device fails to connect to the stored network.
- **SMART_RETRIES**: Attempts to reconnect a specific number of times within a time window before triggering the portal.
- **BUTTON_ONLY**: The portal only opens when a physical button is pressed.
- **NEVER**: Disables the portal entirely, relying on manual management.

Additionally, the library includes utilities like `hayInternet()`, which performs a lightweight check (similar to Google's `generate_204`) to verify actual internet reachability rather than just a local Wi-Fi link.

## Hardware Integration: LED and Button Handling

To provide immediate physical feedback, AyresWiFiManager includes built-in support for status LEDs and configuration buttons. The LED logic uses distinct patterns to communicate the device state:
- **Steady ON**: Connected to Wi-Fi.
- **Slow Blink**: Captive portal is active.
- **Fast Blink**: Scanning for networks.
- **Double/Triple Blink**: Feedback during button presses.

The integrated button logic allows for multi-function control using a single GPIO. A short press (2–5 seconds) can be configured to open the portal, while a long press (over 5 seconds) triggers a safe erase of the JSON credential files followed by a system restart.

## Technical Implementation

The library is built on the Arduino framework and utilizes `ArduinoJson` for managing configuration files. It is compatible with both ESP32 and ESP8266, handling platform-specific nuances such as power-save modes and filesystem iteration differences internally. 

### Minimal Usage Example

Integrating AWM into a project requires minimal boilerplate code. The following example demonstrates a basic setup with a portal timeout:

```cpp
#include <AyresWiFiManager.h>

AyresWiFiManager wifi;

void setup() {
  Serial.begin(115200);

  // Configure AP credentials and timeouts
  wifi.setAPCredentials("MyDeviceConfig", "123456789");
  wifi.setPortalTimeout(300);   // 5-minute inactivity timeout
  
  wifi.begin();  // Mounts LittleFS and loads credentials
  wifi.run();    // Attempts connection or applies fallback policy
}

void loop() {
  wifi.update(); // Handles DNS, WebServer, and LED patterns
}
```

## Safety and Production Features

For production environments, AWM includes a "Safe JSON Erase" feature. Developers can define a whitelist of protected files using `setProtectedJsons()`, ensuring that system-critical configuration files are not deleted when a user chooses to reset Wi-Fi credentials through the portal or physical button. It also supports NTP synchronization out of the box, providing reliable timestamps for IoT logging and data transmission.
