---
title: arduino-esp-utils
summary: A collection of utility classes for ESP8266 and ESP32 chips that simplifies
  configuration management via SPIFFS, web server implementation with WebSockets,
  and OSC data streaming. It provides high-level abstractions to reduce boilerplate
  in Arduino-based IoT and interactive media projects.
codeUrl: https://github.com/josephlarralde/arduino-esp-utils
isShow: false
rtos: ''
libraries:
- spiffs
topics:
- esp32-arduino
- esp8266-arduino
- utilities
- spiffs
- wifi
- osc
- webserver
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- esp-fs-webserver
- esp8266-configuration-data-v2
- thing-simplified-mqtt-framework-for-esp8266-and-esp32
- effortless-spiffs
- esp8266-web-server-and-spiffs-integration
- espui
---

Developing for the ESP8266 and ESP32 often involves repetitive tasks: setting up a Wi-Fi connection, managing configuration files in flash memory, or establishing communication protocols like OSC or WebSockets. The **arduino-esp-utils** library by Joseph Larralde addresses these common needs by providing a set of high-level utility classes designed to speed up the development cycle for Arduino-based projects.

### Streamlined Configuration Management

One of the standout features of this library is `ESPConfigFile`. Managing persistent settings on an ESP chip usually requires manual handling of the SPIFFS (Serial Peripheral Interface Flash File System). This utility abstracts that complexity, allowing developers to manage parameters using simple `add`, `get`, and `set` methods. It supports standard types including booleans, integers (stored as longs), floats (stored as doubles), and strings.

```cpp
#include <ESPConfigFile.h>

ESPConfigFile config("settings");

void setup() {
  config.addIntParameter("brightness", 255);
  config.addStringParameter("device_name", "ESP-Module");
  
  if (config.load()) {
    Serial.println("Configuration loaded successfully");
  }
}
```

### Simplified Networking and Web Interfaces

The library provides two specialized interfaces for networking: `ESPWiFiInterfaceWebServer` and `ESPWiFiInterfaceOSC`. 

The WebServer utility is particularly useful for creating interactive control panels. It integrates WebSockets out of the box, making it easy to send and receive real-time messages between a web browser and the hardware. The library uses an event-driven approach, allowing you to define lambda functions or listeners for incoming socket messages.

For those working in creative coding or music technology, the `ESPWiFiInterfaceOSC` class provides a streamlined way to stream Open Sound Control (OSC) data. This is ideal for projects that need to communicate with software like Max/MSP, Pure Data, or Ableton Live.

### Event-Driven Architecture

A core philosophy of the library is its use of an event-driven model. By utilizing the `ESPEventEmitter` and `ArduinoEventEmitter`, the library allows for clean, decoupled code. For example, you can monitor Wi-Fi connection states (Connecting, Connected, Disconnected) and trigger specific actions like LED blinking patterns without cluttering your main loop.

```cpp
wifi.setConnectionStateListener([&](WiFiConnectionState s) {
  switch (s) {
    case WiFiConnecting:
      blinker.setPeriod(100); // Fast blink while connecting
      break;
    case WiFiConnected:
      blinker.setHigh(); // Solid on when connected
      break;
  }
});
```

### Dependencies and Compatibility

The library is built to work seamlessly with both ESP8266 and ESP32 architectures. To provide its high-level functionality, it relies on several well-regarded third-party libraries:
- **WebSockets** (by Links2004) for real-time web communication.
- **OSC** (by CNMAT) for professional-grade message formatting.
- **EventEmitter** (by josephlarralde) for the internal event system.

Whether you are building a home automation sensor that needs to save its state across reboots or a wireless MIDI controller sending data over OSC, `arduino-esp-utils` provides a robust foundation that lets you focus on your application logic rather than low-level system management.
