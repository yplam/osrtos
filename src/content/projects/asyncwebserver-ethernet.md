---
title: AsyncWebServer_Ethernet
summary: An asynchronous web server library for ESP8266 boards using W5x00 or ENC28J60
  Ethernet shields. It provides high-performance, non-blocking HTTP, WebSocket, and
  EventSource functionality by leveraging the lwIP stack.
codeUrl: https://github.com/khoih-prog/AsyncWebServer_Ethernet
siteUrl: https://github.com/khoih-prog/AsyncWebServer_Ethernet
isShow: false
rtos: ''
libraries:
- lwip
topics:
- async
- async-tcp-client
- async-tcp-server
- async-tcp-webserver
- async-webserver
- enc28j60
- esp8266
- lwip
- w5x00
- webserver
- esp-async-tcp
- ethernet-async-webserver
- lwip-enc28j60
- async-websocket-client
- async-websockets
- nodemcu-esp8266
- lwip-w5100
- lwip-w5500
- chunk-response
- chunking
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- asyncwebserver-esp32-w5500
- asyncwebserver-esp32-sc-w5500
- asyncwebserver-esp32-sc-enc
- asynchttpsrequest-esp32-ethernet
- asynchttprequest-esp32-ethernet
- asyncudp-ethernet
---

AsyncWebServer_Ethernet is a high-performance, asynchronous web server library specifically designed for ESP8266-based systems utilizing Ethernet connectivity. While the ESP8266 is famous for its Wi-Fi capabilities, many industrial and stable IoT applications require the reliability of a wired Ethernet connection. This library bridges that gap by porting the powerful features of the ESPAsyncWebServer library to work with Ethernet shields like the W5100, W5500, and ENC28J60.

## Why Asynchronous Matters

Traditional web servers for Arduino often operate in a synchronous, blocking manner. This means that while the server is processing a request or sending a response, the rest of your application code—including sensor readings or motor controls—is effectively paused. AsyncWebServer_Ethernet changes this paradigm. Because it is fully asynchronous, it can handle multiple connections simultaneously without blocking the main loop. You are notified via callbacks when a request is ready and parsed, and the server handles the heavy lifting of data transmission in the background.

## Key Features and Capabilities

- **Multi-Connection Support**: Handle more than one client at the same time without performance degradation.
- **WebSocket Plugin**: Includes a built-in WebSocket implementation, allowing for real-time, two-way communication between the browser and the ESP8266.
- **EventSource (SSE)**: Support for Server-Sent Events, enabling the server to push updates to the browser over a single HTTP connection.
- **Template Processing**: A simple yet effective engine for replacing placeholders in HTML files with dynamic data from your code.
- **Memory Optimization**: Version 1.5.0+ introduced significant heap savings by allowing the use of `CString` for sending large data buffers, which is critical for the memory-constrained ESP8266.
- **Authentication**: Built-in support for HTTP Basic and Digest MD5 authentication.

## Technical Architecture

The library is built upon the `ESPAsyncTCP` library and integrates deeply with the ESP8266's lwIP stack (specifically the lwIP_w5100, lwIP_w5500, or lwIP_enc28j60 variants). This architecture ensures that network operations are handled efficiently at a low level, providing the "OMG speed" mentioned by the developers.

## Getting Started

To use the library, you need an ESP8266 board and a compatible Ethernet shield. The setup involves initializing the Ethernet hardware and then defining your server routes. Below is a basic example of setting up a simple "Hello World" server:

```cpp
#include <ESPAsyncTCP.h>
#include <AsyncWebServer_Ethernet.h>

AsyncWebServer server(80);

void setup() {
  Serial.begin(115200);
  
  // Initialize Ethernet hardware (e.g., WT32-ETH01 or W5500 shield)
  ETH.begin(ETH_PHY_ADDR, ETH_PHY_POWER);
  
  // Define a route
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(200, "text/plain", "Hello from Async_HelloServer!");
  });

  // Start the server
  server.begin();
}

void loop() {
  // No need to call server.handleClient() here!
}
```

## Advanced Memory Management

One of the standout features of this library is its ability to handle large responses on a device with limited RAM. By using the non-copying `send` method with `char*` buffers, developers can avoid the overhead of the Arduino `String` class, which often requires double the memory of the actual content. This makes it possible to serve complex JSON payloads or large web pages that would otherwise trigger heap allocation errors.

## Conclusion

AsyncWebServer_Ethernet is an essential tool for developers building robust, wired IoT gateways or controllers on the ESP8266 platform. By combining the speed of asynchronous networking with the stability of Ethernet, it provides a professional-grade foundation for modern embedded web applications.
