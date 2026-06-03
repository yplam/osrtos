---
title: AsyncWebServer_ESP32_SC_ENC
summary: An asynchronous web server library specifically designed for ESP32-S2, S3,
  and C3 microcontrollers using the ENC28J60 Ethernet controller via the LwIP stack.
  It enables high-performance, non-blocking network communication, supporting concurrent
  connections, WebSockets, and Server-Sent Events.
codeUrl: https://github.com/khoih-prog/AsyncWebServer_ESP32_SC_ENC
siteUrl: https://github.com/khoih-prog/AsyncWebServer_ESP32_SC_ENC
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
- enc28j60
- esp32
- esp32-s2
- esp32-s3
- ethernet
- lwip
- lwip-enc28j60
- lwip-ethernet
- send-in-chunks
- webserver
- websockets
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- asyncwebserver-esp32-sc-w5500
- asyncwebserver-esp32-w5500
- asyncwebserver-ethernet
- asynchttprequest-esp32-ethernet
- webserver-esp32-enc
- asyncudp-esp32-sc-w6100
---

In the world of embedded systems, performance and responsiveness are often at odds with the resource constraints of microcontrollers. The **AsyncWebServer_ESP32_SC_ENC** library addresses this challenge for the ESP32 ecosystem, specifically targeting the S2, S3, and C3 variants paired with the ENC28J60 Ethernet controller. By leveraging the LwIP stack and an asynchronous architecture, it allows developers to build robust web interfaces that don't stall the main application loop.

## Why Asynchronous Matters

Traditional web servers for Arduino-based projects often operate on a synchronous, blocking model. When a client makes a request, the processor waits for the data to be sent and received, effectively halting other tasks. This library, based on the well-regarded `ESPAsyncWebServer`, changes the paradigm. Using asynchronous network calls means you can handle multiple connections simultaneously. You are notified only when a request is fully parsed and ready, and once you send a response, the system handles the background transmission while you immediately return to other tasks. This results in a significant speed boost and a much smoother user experience.

## Optimized for Memory Efficiency

One of the standout features of this library is its focus on heap management. Sending large datasets (like JSON charts or logs) can often lead to `heap-allocation-errors` on microcontrollers. This library introduces a specialized method for sending `CString` data without destructive copying. 

By avoiding the overhead of the standard Arduino `String` class, developers can save significant amounts of memory. For example, sending a 30 KB buffer using standard Strings might require ~145 KB of heap, whereas using the library's optimized CString method reduces that requirement to approximately 114 KB. This 30 KB saving is often the difference between a stable system and a crashing one in memory-constrained environments.

## Key Features and Capabilities

Beyond basic HTTP handling, the library is a full-featured suite for modern web communication:

*   **WebSockets:** Includes a built-in plugin for real-time, two-way communication without needing extra ports.
*   **EventSource (SSE):** Supports Server-Sent Events, allowing the server to push updates to the browser over a single-direction, text-only protocol.
*   **Template Processing:** A simple engine to replace placeholders (e.g., `%TEMPERATURE%`) with real-time data before serving a page.
*   **URL Rewriting:** Conditional and permanent URL rewrites for cleaner API structures.
*   **Authentication:** Built-in support for HTTP Basic and Digest MD5 authentication.

## Getting Started

To use this library, you'll need an ESP32-S2/S3/C3 board and an ENC28J60 Ethernet module. It requires the `AsyncTCP` library as a dependency. Setting up a basic server is straightforward, as shown in this snippet:

```cpp
#include <AsyncTCP.h>
#include <AsyncWebServer_ESP32_SC_ENC.h>

AsyncWebServer server(80);

void setup() {
  // Initialize Ethernet (ENC28J60)
  ETH.begin(MISO_GPIO, MOSI_GPIO, SCK_GPIO, CS_GPIO, INT_GPIO, SPI_CLOCK_MHZ, ETH_SPI_HOST);
  
  // Define a simple route
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(200, "text/plain", "Hello from Async WebServer!");
  });

  server.begin();
}

void loop() {
  // No need to call a handleClient() function here!
  // The server runs asynchronously in the background.
}
```

## Hardware and Compatibility

The library is specifically tuned for the LwIP ENC28J60 implementation found in the newer ESP32 variants (S2, S3, and C3). It supports various SPI pinouts, which can be overridden in the code to match your specific hardware wiring. This makes it an excellent choice for industrial or wired IoT applications where Wi-Fi is either unavailable or undesirable due to interference and security concerns.
