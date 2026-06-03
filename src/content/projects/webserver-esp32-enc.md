---
title: WebServer_ESP32_ENC
summary: A comprehensive WebServer and HTTP/HTTPS client wrapper library for ESP32-based
  boards using the ENC28J60 Ethernet controller with LwIP. It provides a familiar
  API compatible with standard ESP32 and ESP8266 WebServer libraries, supporting TCP/UDP,
  MQTT, and WebSockets.
slug: webserver-esp32-enc
codeUrl: https://github.com/khoih-prog/WebServer_ESP32_ENC
star: 7
version: v1.5.3
lastUpdated: '2023-01-12'
rtos: freertos
libraries:
- lwip
topics:
- async
- async-webserver
- builtin-mac-address
- ca-certificates
- enc28j60
- esp32
- http
- http-client
- http-server
- https
- https-certificate
- https-client
- lwip
- lwip-enc28j60
- lwip-ethernet
- mqtt
- mqtts
- mqtts-client
- ota
- spi-dma-ch-auto
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- webserver-esp32-w5500
- https-server-generic-library
- asyncwebserver-esp32-sc-enc
- asyncwebserver-ethernet
- asynchttpsrequest-esp32-ethernet
- asyncwebserver-esp32-w5500
---

## Overview

WebServer_ESP32_ENC is a specialized library designed for ESP32 developers who need to implement wired Ethernet connectivity using the ENC28J60 controller. While the ESP32 is famous for its integrated WiFi, many industrial or stable IoT applications require the reliability of a wired connection. This library acts as a wrapper, providing a high-level interface that is functionally compatible with the standard ESP32 and ESP8266 WebServer libraries, making it easy to port existing wireless projects to a wired Ethernet environment.

## Key Features

The library is more than just a simple web server; it is a complete networking suite for the ENC28J60 on ESP32. Its capabilities include:

- **Protocol Support**: Full support for TCP and UDP as both server and client.
- **Web Services**: HTTP and HTTPS server capabilities, including GET/POST request parsing and argument handling.
- **High-Level Clients**: Integrated HTTP(S) Client (supporting GET, POST, PUT, PATCH, DELETE), MQTT(S) Client, and WebSocket Client.
- **API Compatibility**: Designed to mimic the `ESP32 WebServer` and `ESP8266WebServer` APIs, significantly reducing the learning curve for developers familiar with the Arduino-ESP32 ecosystem.
- **Filesystem Integration**: Supports serving files directly from LittleFS or SPIFFS.

## Technical Implementation

Under the hood, WebServer_ESP32_ENC leverages the LwIP (Lightweight IP) stack integrated into the ESP32 Arduino core. It specifically targets the ENC28J60 Ethernet controller, which operates at 10Mbps in full-duplex mode. The library wraps Ivan Grokhotkov's well-known ESP32 WebServer and the standard ESP32 HTTPClient library, ensuring that the underlying logic remains robust and well-tested.

One notable technical detail provided by the project is the handling of SPI pinouts. By default, it uses the standard ESP32 VSPI pins (MOSI: 23, MISO: 19, SCK: 18, CS: 5) but allows for customization, including the mandatory `INT` (Interrupt) pin connection to GPIO4.

## Hardware Considerations

The library is primarily tested on ESP32_DEV boards. Because the ENC28J60 communicates via SPI, it frees up the internal WiFi radio. However, the documentation highlights a critical hardware nuance regarding the ESP32's ADCs: since the WiFi stack normally uses ADC2, users are advised to use ADC1 (GPIO32-GPIO39) for analog readings to avoid conflicts, even when using Ethernet, if the WiFi stack remains active in the background.

## Getting Started

Implementing a basic server is straightforward for anyone familiar with Arduino development. The library provides a `WebServer` class that can be instantiated on a specific port (defaulting to 80).

```cpp
#include <WebServer_ESP32_ENC.h>

WebServer server(80);

void setup() {
  // Ethernet initialization logic here
  
  server.on("/", []() {
    server.send(200, "text/plain", "Hello from ESP32 with ENC28J60!");
  });

  server.begin();
}

void loop() {
  server.handleClient();
}
```

For complex projects, the library also includes a `.hpp` header option to prevent "Multiple Definitions" linker errors in multi-file projects, a common hurdle in larger embedded C++ applications.
