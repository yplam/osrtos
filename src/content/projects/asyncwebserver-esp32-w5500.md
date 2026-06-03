---
title: AsyncWebServer_ESP32_W5500
summary: A high-performance asynchronous web server library for ESP32 microcontrollers
  using the W5500 Ethernet controller. It leverages the LwIP stack to provide non-blocking
  network operations, supporting WebSockets, Server-Sent Events, and efficient memory
  handling for large data transfers.
codeUrl: https://github.com/khoih-prog/AsyncWebServer_ESP32_W5500
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
- ethernet
- ethernet-webserver
- lwip
- lwip-ethernet
- lwip-w5500
- send-in-chunks
- w5500
- webserver
- websockets
- esp-idf
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- asyncwebserver-esp32-sc-w5500
- asyncwebserver-esp32-sc-enc
- asyncwebserver-ethernet
- webserver-esp32-w5500
- asynchttprequest-esp32-ethernet
- asynchttpsrequest-esp32-ethernet
---

The **AsyncWebServer_ESP32_W5500** library is a powerful tool for developers looking to implement high-performance web interfaces on ESP32-based hardware using wired Ethernet. While the ESP32 is famous for its Wi-Fi capabilities, many industrial and professional applications require the reliability of a wired connection. This library bridges that gap by adapting the popular asynchronous web server architecture to work seamlessly with the W5500 Ethernet controller.

### Why Asynchronous Matters
Traditional web servers for microcontrollers often operate on a synchronous, blocking model. In that scenario, the processor must wait for a request to be fully received and for the response to be sent before it can handle anything else. This can lead to sluggish performance and connection timeouts under load.

By contrast, an asynchronous server handles network events as they happen. You are notified once a request is parsed and ready, and when you send a response, the server handles the transmission in the background. This allows the ESP32 to handle multiple simultaneous connections without blocking the main execution loop, resulting in significantly higher throughput and better responsiveness.

### Key Features and Capabilities
This library is more than just a simple HTTP server; it is a full-featured suite for modern web development on embedded systems:

*   **WebSockets Support:** Includes a built-in WebSocket plugin for real-time, two-way communication between the browser and the device.
*   **EventSource (SSE):** Supports Server-Sent Events, allowing the server to push updates to the browser over a single-direction, text-only protocol.
*   **Template Processing:** A simple engine allows you to use placeholders (e.g., `%TEMPERATURE%`) in your HTML files, which the server automatically replaces with real-time data before sending.
*   **URL Rewriting:** Supports conditional and permanent URL rewrites, making it easy to manage complex routing.
*   **Memory Efficiency:** A standout feature in recent versions is the ability to send very large data using `CString` instead of the standard Arduino `String` class. This optimization can save significant heap memory, preventing crashes when serving large JSON payloads or complex web pages.

### Technical Architecture
The library is built on top of `AsyncTCP` and utilizes the `LwIP` stack. It is designed specifically for the ESP32 and the W5500 SPI-to-Ethernet chip. Because it is fully asynchronous, it does not run on the standard `loop()` thread, meaning developers must avoid using `delay()` or `yield()` inside the server's callbacks to maintain performance.

### Getting Started
Setting up the server involves defining your network parameters and attaching handlers to specific URI paths. Below is a basic example of how to initialize the server with a static IP and a simple root handler:

```cpp
#include <AsyncTCP.h>
#include <AsyncWebServer_ESP32_W5500.h>

AsyncWebServer server(80);

void setup() {
  Serial.begin(115200);

  // Initialize Ethernet with W5500 pins
  ETH.begin(MISO_GPIO, MOSI_GPIO, SCK_GPIO, CS_GPIO, INT_GPIO, SPI_CLOCK_MHZ, ETH_SPI_HOST);
  
  // Define a basic route
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(200, "text/plain", "Hello from ESP32 + W5500!");
  });

  server.begin();
}

void loop() {
  // The server runs in the background; no need to call anything here
}
```

### Hardware Integration
To use this library, you must connect the W5500 to the ESP32 via the SPI bus. The library allows for flexible pin configuration, but it is critical to connect the Interrupt (INT) pin to a GPIO on the ESP32, as the asynchronous nature of the library relies on hardware interrupts to process network packets efficiently. It supports various ESP32 development boards and is compatible with the Arduino IDE and PlatformIO ecosystems.
