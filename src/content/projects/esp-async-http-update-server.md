---
title: ESP Async HTTP Update Server
summary: An advanced OTA update server for ESP8266 and ESP32 microcontrollers, designed
  for compatibility with the ESPAsyncWebServer library. It provides a web interface
  for updating firmware and filesystems (SPIFFS/LittleFS) with support for custom
  styling, authentication, and event callbacks.
slug: esp-async-http-update-server
codeUrl: https://github.com/IPdotSetAF/ESPAsyncHTTPUpdateServer
star: 75
version: v3.0.0
lastUpdated: '2025-08-23'
rtos: ''
libraries:
- littlefs
- spiffs
topics:
- async
- esp
- esp32
- esp32-arduino
- esp8266
- esp8266-arduino
- ota
- ota-update
- platformio
- webserver
isShow: false
createdAt: '2026-02-25'
updatedAt: '2026-02-25'
---

## Overview

ESP Async HTTP Update Server is a specialized library for ESP8266 and ESP32 microcontrollers that enables Over-The-Air (OTA) updates through a web interface. It serves as an advanced, asynchronous alternative to the standard ESP8266HTTPUpdateServer and ESP32 HTTPUpdateServer libraries. By leveraging the `ESPAsyncWebServer` framework, it allows developers to integrate firmware and filesystem update capabilities into their projects without blocking the main execution loop, ensuring the device remains responsive during the update process.

## Key Features and Capabilities

The library is designed with flexibility and user experience in mind, offering several features that go beyond basic OTA functionality:

- **Dual Update Support**: It can handle updates for both the application firmware and the underlying filesystem.
- **Filesystem Compatibility**: Full support for both SPIFFS and LittleFS, allowing developers to choose the storage system that best fits their project requirements.
- **Customizable UI**: Users can choose between a 'Minimal' interface to save flash space or a 'Stylized' interface for a more modern look. The stylized version only adds approximately 350 bytes to the binary size.
- **Security**: Supports optional username and password credentials to protect the update route from unauthorized access.
- **Event Callbacks**: Provides `onUpdateBegin` and `onUpdateEnd` events, allowing the application to perform specific actions (like closing files or stopping motors) before an update starts or after it finishes.
- **Update Control**: Developers can programmatically abort updates through the event system if specific safety conditions are not met.

## Technical Implementation

The library is built to work seamlessly within the Arduino ecosystem but is optimized for PlatformIO users through the use of build flags. It manages the multipart/form-data parsing required for file uploads and interfaces directly with the ESP's internal `Update` class to write data to the flash memory.

One unique aspect of this project is its approach to web assets. The HTML content is processed via a Python script (`codeGenerator.py`), which minifies and converts HTML/CSS files into C++ headers. This allows for easy modification of the web interface while maintaining high performance and low memory overhead on the microcontroller.

## Getting Started

Integrating the server into an existing `ESPAsyncWebServer` project is straightforward. After including the headers, you instantiate the update server and link it to your existing web server instance:

```cpp
#include <ESPAsyncWebServer.h>
#include <ESPAsyncHTTPUpdateServer.h>

ESPAsyncHTTPUpdateServer updateServer;
AsyncWebServer server(80);

void setup() {
    // ... network setup ...
    updateServer.setup(&server);
    server.begin();
}
```

By default, the update page is accessible at the `/update` route. This can be customized during the setup phase to use a different path or to require authentication.

## Configuration via Build Flags

To keep the library lightweight, several features are toggled using preprocessor definitions. This is particularly useful in PlatformIO environments:

- `-DESPASYNCHTTPUPDATESERVER_PRETTY`: Enables the stylized CSS for the update page.
- `-DESPASYNCHTTPUPDATESERVER_LITTLEFS`: Switches the filesystem backend from SPIFFS to LittleFS.
- `-DESPASYNCHTTPUPDATESERVER_MODE`: Configures the server to allow only firmware updates, only filesystem updates, or both.
- `-DESPASYNCHTTPUPDATESERVER_DEBUG`: Enables serial logging for troubleshooting update issues.

This library provides a robust, production-ready solution for developers who need a reliable way to maintain and update ESP-based IoT devices in the field.
