---
title: Settings Manager
summary: A C++ library for managing configuration settings in JSON format on ESP8266
  and ESP32 microcontrollers. It provides a simple interface to read, write, and update
  settings stored on SPIFFS using the ArduinoJson library.
slug: settings-manager
codeUrl: https://github.com/SergiuToporjinschi/settingsmanager
star: 18
version: 2.1.2
lastUpdated: '2019-10-21'
rtos: ''
libraries:
- spiffs
topics:
- arduino
- deserialization
- esp8266
- file
- json
- serialization
- spiffs
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- esp8266-configuration-data-v2
- esp8266-littlefs-file-handler
- esp8266-config-data-management
- effortless-spiffs
- easyini
- bleeper
---

## Overview

Settings Manager is a specialized library designed for the Espressif ESP8266 and ESP32 platforms to simplify the management of configuration files. In many IoT projects, managing device settings—such as WiFi credentials, MQTT server details, and hardware pins—can become cumbersome. This library provides a clean, path-based interface for reading and writing these settings in JSON format, persisting them directly to the SPIFFS (SPI Flash File System).

By leveraging the popular ArduinoJson V6 library, Settings Manager allows developers to treat their configuration files as structured objects, making it easy to retrieve specific values or update nested keys without manually parsing strings.

## Key Features

- **Path-Based Access**: Retrieve or update values using a dot-notation path (e.g., `mqtt.server` or `wlan.ssid`), which simplifies working with deeply nested JSON structures.
- **SPIFFS Integration**: Built-in methods for reading from and writing to the local flash file system, ensuring settings persist across reboots.
- **Default Value Support**: When requesting a setting, developers can provide a default value that will be returned if the specified key is missing from the configuration file.
- **Flexible Loading**: Supports loading JSON data from both files on disk and raw strings in memory.
- **Multi-Platform Support**: Compatible with ESP8266 (including ESP-01 and NodeMCU) and ESP32 devices using the Arduino framework.

## Technical Implementation

The library acts as a wrapper around ArduinoJson, providing a higher-level API for common configuration tasks. It handles the boilerplate code required to open files, parse JSON buffers, and serialize data back to flash. The project is structured for use with PlatformIO and the Arduino IDE, including pre-configured environments for various ESP8266 and ESP32 boards.

### Example: Reading Settings

Loading a configuration file and accessing values is straightforward. The following example demonstrates how to initialize the manager and retrieve a root-level integer and a nested JSON object:

```cpp
#include "SettingsManager.h"

SettingsManager sm;

void setup() {
    Serial.begin(115200);
    // Loading json from file config.json on SPIFFS
    sm.readSettings("/config.json"); 
}

void loop(){
    // Get an integer with a default fallback of 99
    Serial.print(sm.getInt("ledPin", 99)); 
    
    // Retrieve a nested object
    JsonObject vr = sm.getJsonVariant("mqtt.status");
    if (!vr.isNull()) {
        serializeJsonPretty(vr, Serial);
    }
}
```

### Example: Updating Settings

Updating settings is equally simple. The library provides setter methods that return status codes to indicate if the operation was successful or if the key was not found:

```cpp
void updateConfig() {
    // Change a string value
    int res = sm.setString("updateServer", "http://new-update-server.com");
    
    // Change an integer value
    sm.setInt("ledPin", 15);
    
    // Persist changes back to the SPIFFS file
    sm.writeSettings("/config.json");
}
```

## Getting Started

To use Settings Manager, ensure you have the `ArduinoJson` (V6) and `SketchLogger` libraries installed. The project is optimized for PlatformIO, and the `platformio.ini` file included in the repository provides several environment templates for different hardware targets, including debug configurations. Detailed API documentation can be found within the `SettingsManager.h` header file.
