---
title: AsyncWebServer_ESP32_SC_W5500
summary: An asynchronous web server library designed for ESP32-S2/S3/C3 microcontrollers
  using the W5500 Ethernet controller. It leverages the LwIP stack to provide high-performance,
  non-blocking network handling, supporting WebSockets, EventSource, and efficient
  CString-based memory management.
codeUrl: https://github.com/khoih-prog/AsyncWebServer_ESP32_SC_W5500
siteUrl: https://github.com/khoih-prog/AsyncWebServer_ESP32_SC_W5500
isShow: false
rtos: freertos
libraries:
- lwip
- spiffs
topics:
- async
- async-tcp
- async-tcp-client
- async-tcp-server
- async-tcp-webserver
- async-webserver
- async-websockets
- chunk-response
- chunks
- esp32
- esp32-s2
- esp32-s3
- ethernet
- lwip
- lwip-ethernet
- lwip-w5500
- send-in-chunks
- w5500
- webserver
- websockets
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- asyncwebserver-esp32-w5500
- asyncwebserver-esp32-sc-enc
- asyncwebserver-ethernet
- asynchttprequest-esp32-ethernet
- webserver-esp32-w5500
- asynchttpsrequest-esp32-ethernet
---

The **AsyncWebServer_ESP32_SC_W5500** library is a powerful networking tool for developers working with the ESP32 ecosystem, specifically those utilizing the W5500 Ethernet controller. While many ESP32 projects rely on Wi-Fi, industrial and high-reliability applications often require the stability of a wired Ethernet connection. This library bridges that gap by providing a fully asynchronous web server that runs on the LwIP stack for the ESP32-S2, S3, and C3 variants.

### Why Asynchronous Performance Matters

Traditional web servers in the Arduino environment often operate on a blocking model: the processor waits for a request, processes it, and then sends a response before it can handle anything else. In contrast, an asynchronous server like this one handles multiple connections simultaneously. 

You are notified via callbacks once a request is fully parsed and ready. When you send a response, the server handles the transmission in the background, immediately freeing up the main loop to process other tasks or handle new incoming connections. This results in significantly higher throughput and a more responsive system, which is critical for real-time embedded applications.

### Optimized Memory Management

One of the standout features of this library is its focus on heap preservation. Sending large data buffers (like JSON charts or logs) can often lead to heap-allocation errors on microcontrollers. This library introduces optimized `send()` functions that allow the use of `CString` instead of the standard Arduino `String` class. 

By using non-destructive `CString` sending, developers can reduce heap usage by up to 66% compared to traditional methods. For example, sending a 30 KB buffer using standard Strings might require over 140 KB of heap, whereas this library's optimized CString approach can accomplish the same task with roughly 113 KB, effectively saving an entire buffer's worth of memory.

### Key Features and Plugins

Beyond simple HTTP GET and POST requests, the library includes several advanced plugins that extend its functionality:

*   **Async WebSocket Plugin:** Allows for real-time, bi-directional communication between the server and clients without the need for extra ports or servers.
*   **Async Event Source (SSE):** Enables the server to push text-based events to the browser, perfect for live sensor dashboards.
*   **Template Processing:** A simple engine to replace placeholders (e.g., `%TEMPERATURE%`) in HTML files with real-time data.
*   **URL Rewriting:** Supports conditional and permanent URL rewrites for cleaner API structures.
*   **JSON Handling:** Integrated support for `ArduinoJson`, allowing for easy consumption and generation of JSON bodies.

### Getting Started with a Simple Server

Setting up a basic server is straightforward. The library handles the low-level SPI communication with the W5500 and integrates with the ESP32's Ethernet event system. Below is a snippet demonstrating how to initialize the server and handle a basic request:

```cpp
#include <AsyncTCP.h>
#include <AsyncWebServer_ESP32_SC_W5500.h>

AsyncWebServer server(80);

void setup() {
  // Initialize Ethernet (W5500)
  ESP32_W5500_onEvent();
  ETH.begin(MISO_GPIO, MOSI_GPIO, SCK_GPIO, CS_GPIO, INT_GPIO, SPI_CLOCK_MHZ, ETH_SPI_HOST);
  ESP32_W5500_waitForConnect();

  // Define a basic route
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(200, "text/plain", "Hello from Async Ethernet Server!");
  });

  server.begin();
}

void loop() {
  // No need to call a 'handleClient' function; it's all asynchronous!
}
```

### Hardware Compatibility

This library is specifically tailored for the newer generation of ESP32 chips paired with the W5500 Ethernet shield or module. Supported boards include:
*   **ESP32-S3** (e.g., ESP32-S3-DevKitC-1)
*   **ESP32-S2** (e.g., ESP32-S2-Saola-1)
*   **ESP32-C3** (e.g., ESP32-C3-DevKitM-1)

By combining the high-speed SPI interface of these modern MCUs with the robust W5500 controller, developers can build high-performance industrial gateways, home automation hubs, and data loggers that benefit from both wired reliability and asynchronous software architecture.
