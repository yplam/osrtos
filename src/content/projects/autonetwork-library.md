---
title: AutoNetwork Library
summary: A modern WiFi connection manager for ESP32 applications using the Arduino
  framework. It provides a captive portal for credential configuration, persistent
  storage in NVS, and non-blocking operation integrated with ESPAsyncWebServer.
slug: autonetwork-library
codeUrl: https://github.com/brooksbUWO/AutoNetwork
star: 16
lastUpdated: '2025-12-30'
rtos: freertos
libraries:
- littlefs
topics:
- arduino
- asyncwebserver
- captive-portal
- embedded
- esp32
- iot
- ota-updates
- platformio
- wifi
- wifi-manager
isShow: false
createdAt: '2026-01-20'
updatedAt: '2026-01-20'
relatedProjects:
- ayreswifimanager-awm
- esp-fs-webserver
- blynk-async-wm
- blynkgsm-manager
- asyncesp8266-w5500-manager
- esp32-wi-fi-provision-care
---

AutoNetwork is a comprehensive WiFi management solution designed specifically for ESP32 microcontrollers. It simplifies the process of connecting devices to local networks by providing a robust lifecycle manager that handles everything from initial credential entry to connection monitoring and recovery.

One of the primary challenges in developing IoT devices is managing WiFi credentials without hardcoding them into the firmware. AutoNetwork solves this by implementing a captive portal. When a device boots and cannot find a saved network, it automatically enters Access Point (AP) mode. Users can then connect to the device's own WiFi network, where a captive portal guides them through selecting a local SSID and entering the password.

## Key Features and Capabilities

The library is built on top of the `ESPAsyncWebServer`, ensuring that network management tasks do not block the main application loop. This is critical for responsive embedded applications that need to handle sensors, displays, or other real-time tasks while managing network states.

- **Automatic Connection**: Seamlessly reconnects to saved networks stored in Non-Volatile Storage (NVS).
- **Captive Portal**: A user-friendly web interface for configuring WiFi credentials and device settings.
- **Visual Feedback**: Integrated support for LED "ticker" patterns that provide immediate visual status of the WiFi connection (e.g., blinking for portal mode, solid for connected).
- **Persistent Storage**: Uses the ESP32's NVS to securely store credentials across reboots.
- **mDNS Support**: Allows users to access the device via a hostname (e.g., `http://mydevice.local`) rather than an IP address.
- **Callback System**: Provides hooks for connection status changes and portal state events, allowing developers to trigger specific logic when the device connects or disconnects.

## Technical Implementation

AutoNetwork is designed for the Arduino framework but includes support for ESP-IDF component registration via CMake. It leverages `LittleFS` for serving web assets and `ArduinoJson` for configuration management. The library operates as a state machine, which must be serviced by calling the `loop()` method in the main Arduino loop. This non-blocking architecture ensures that the web server remains responsive even during connection attempts.

## Getting Started

Setting up AutoNetwork requires passing a pointer to an `AsyncWebServer` instance. This allows the library to share the web server with your main application, enabling a unified web interface. Developers can define a custom root page and use the `{{AUTONETWORK_MENU}}` placeholder to automatically inject a link to the WiFi settings.

```cpp
#include <AutoNetwork.h>
#include <ESPAsyncWebServer.h>

AsyncWebServer server(80);
AutoNetwork autonetwork(&server);

void setup() {
    Serial.begin(115200);
    // Set a custom root page with the AutoNetwork menu placeholder
    autonetwork.setRootContentHTML("<h1>My ESP32 App</h1>{{AUTONETWORK_MENU}}");
    autonetwork.begin();
}

void loop() {
    autonetwork.loop(); // Required for processing WiFi states
}
```

## Visual Status Indicators

To help users understand the device state without a serial monitor, AutoNetwork uses a Ticker LED. Different patterns indicate different states:
- **Slow Blink (500ms)**: The captive portal is active and waiting for user input.
- **Fast Blink (150ms)**: The device is currently attempting to reconnect to a known network.
- **Solid On**: The device is successfully connected to WiFi.

This feedback mechanism is highly configurable, allowing developers to define the GPIO pin and the active level (High/Low) to match their specific hardware design, such as the active-low LEDs found on many ESP32 DevKits.
