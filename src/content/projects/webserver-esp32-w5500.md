---
title: WebServer_ESP32_W5500
summary: A comprehensive WebServer and HTTP/HTTPS client wrapper library for ESP32-based
  boards using the W5500 Ethernet controller with LwIP. It provides an API compatible
  with standard ESP32 and ESP8266 WebServer libraries, supporting MQTT, WebSockets,
  and file serving from LittleFS or SPIFFS.
slug: webserver-esp32-w5500
codeUrl: https://github.com/khoih-prog/WebServer_ESP32_W5500
star: 44
version: v1.5.3
lastUpdated: '2023-01-12'
rtos: freertos
libraries:
- lwip
- littlefs
- spiffs
topics:
- async
- async-webserver
- builtin-mac-address
- ca-certificates
- esp32
- http
- http-client
- http-server
- https
- https-certificate
- https-client
- lwip
- lwip-ethernet
- lwip-w5500
- mqtt
- mqtts
- mqtts-client
- ota
- spi-dma-ch-auto
- w5500
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- webserver-esp32-enc
- https-server-generic-library
- asyncwebserver-esp32-w5500
- asyncwebserver-esp32-sc-w5500
- asyncwebserver-ethernet
- asynchttpsrequest-esp32-ethernet
---

## Overview

The WebServer_ESP32_W5500 library is a robust networking solution designed for ESP32 developers who need reliable wired Ethernet connectivity. By wrapping the LwIP W5500 Ethernet stack, this library provides a high-level interface that is functionally compatible with the standard ESP32WebServer and ESP8266WebServer libraries. This compatibility makes it significantly easier to port existing wireless sketches to hardware configurations utilizing the WIZnet W5500 Ethernet controller.

Beyond simple web serving, the library acts as a versatile communication hub, offering support for TCP/UDP servers and clients, as well as high-level HTTP(S), MQTT(S), and WebSocket clients. This makes it suitable for industrial IoT applications where wired reliability is preferred over WiFi.

## Key Features

- **Broad Protocol Support**: Handles TCP and UDP at the transport layer, and HTTP(S) GET, POST, PUT, PATCH, and DELETE requests at the application layer.
- **Integrated Client Capabilities**: Includes high-level clients for MQTT(S) and WebSockets, leveraging the native ESP32 HTTPClient library.
- **Storage Integration**: Supports serving web content directly from onboard flash using LittleFS or SPIFFS file systems.
- **Hardware Optimization**: Utilizes SPI DMA (Auto Channel) for efficient data transfer and uses the built-in ESP32 MAC address for network identification.
- **Familiar API**: Developers familiar with the standard Arduino-ESP32 WebServer will find the transition seamless due to the mirrored function calls and class structures.

## Technical Implementation

The library is built to work with the ESP32 Core 2.0.6+ and requires the Arduino IDE or PlatformIO environments. It specifically targets the ESP32_DEV board paired with a W5500 module. A notable technical detail is the library's handling of the W5500's interrupt (INT) pin, which defaults to GPIO4, and its reliance on the LwIP stack for network management.

One critical consideration for developers is the use of ADCs on the ESP32. Since the ESP32's WiFi/Bluetooth stack typically consumes ADC2, this library provides guidance on using ADC1 (GPIO32-GPIO39) for analog readings to avoid conflicts, even when running Ethernet-based tasks.

## Getting Started

Setting up a server is straightforward. The constructor allows you to define the listening port, and the API follows the standard `on()`, `begin()`, and `handleClient()` pattern:

```cpp
#include <WebServer_ESP32_W5500.h>

WebServer server(80);

void setup() {
  // Ethernet initialization code here...
  
  server.on("/", []() {
    server.send(200, "text/plain", "Hello from ESP32 W5500!");
  });
  
  server.begin();
}

void loop() {
  server.handleClient();
}
```

## Advanced Functionality

For more complex projects, the library supports authentication (Basic and Digest), argument parsing for POST requests, and header collection. It also includes a variety of examples ranging from simple 'Hello Server' implementations to advanced MQTT clients with authentication and UDP NTP clients. The inclusion of a `multiFileProject` example demonstrates how to structure larger applications using `.hpp` and `.h` files to avoid common linker errors associated with multiple definitions in C++ projects.
