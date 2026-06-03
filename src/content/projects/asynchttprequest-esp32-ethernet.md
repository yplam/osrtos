---
title: AsyncHTTPRequest_ESP32_Ethernet
summary: An asynchronous HTTP client library for ESP32-based microcontrollers using
  LwIP Ethernet controllers like W5500, W6100, and ENC28J60. It provides a non-blocking
  interface for REST communication, similar to JavaScript's XMLHttpRequest, and relies
  on the AsyncTCP library for efficient networking.
codeUrl: https://github.com/khoih-prog/AsyncHTTPRequest_ESP32_Ethernet
isShow: false
rtos: freertos
libraries:
- lwip
topics:
- async
- async-http-client
- enc28j60
- esp32
- esp32-c3
- esp32-s2
- esp32-s3
- ethernet
- http-client
- lan8720
- lan8720a
- lwip
- lwip-enc28j60
- lwip-ethernet
- lwip-lan8720
- lwip-w5500
- w5500
- wt32-eth01
- lwip-w6100
- w6100
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- asynchttpsrequest-esp32-ethernet
- asynchttpsrequest-generic
- asyncwebserver-esp32-sc-enc
- asyncwebserver-ethernet
- asyncwebserver-esp32-sc-w5500
- asyncwebserver-esp32-w5500
---

In the world of IoT and embedded systems, blocking operations are often the enemy of responsiveness. When an ESP32 needs to make an HTTP request to a remote server, a standard synchronous client will halt the execution of the main loop until the server responds or the connection times out. This is where **AsyncHTTPRequest_ESP32_Ethernet** comes in, offering a robust, non-blocking solution for ESP32 devices utilizing wired Ethernet connections.

### Why Asynchronous HTTP Matters
For many embedded applications, the microcontroller is responsible for more than just network communication; it might be managing sensors, driving displays, or handling user input. If the network stack blocks the CPU, these other tasks suffer. This library implements an asynchronous layer on top of the `AsyncTCP` library, allowing developers to initiate HTTP requests and receive data through callbacks or polling without stalling the rest of the application. 

The library's design is inspired by the `XMLHttpRequest` object found in JavaScript. It uses a "ready-state" progression system, where the transaction moves through various stages (Unsent, Opened, Headers Received, Loading, and Done). This makes it familiar to web developers and highly effective for managing complex network interactions in a resource-constrained environment.

### Broad Hardware and Protocol Support
One of the standout features of this library is its extensive support for various Ethernet hardware. While many ESP32 projects rely on Wi-Fi, industrial and professional applications often require the stability of a wired connection. This library supports:
- **ESP32, ESP32-S2, ESP32-S3, and ESP32-C3** variants.
- **Ethernet Controllers**: W5500, W6100, ENC28J60, and LAN8720 (including the WT32_ETH01 board).
- **HTTP Methods**: Full support for GET, POST, PUT, PATCH, DELETE, and HEAD.
- **Data Handling**: Support for request/response headers, chunked responses, and an optional `onData` callback for incremental data processing.

### Technical Architecture
To manage memory efficiently, the library utilizes a custom `xbuf` class. This class handles both character and binary data using a chain of small 64-byte segments. These segments are allocated and deallocated dynamically, acting like a circular buffer that is limited only by the available heap. This approach is significantly more economical than using large, fixed-length buffers, especially for short transactions.

### Getting Started
Integrating the library into an Arduino or PlatformIO project is straightforward. Because it uses a header-only implementation style to avoid linker errors in multi-file projects, users should be careful to include the `.h` file in only one location while using the `.hpp` file for other inclusions.

Here is a basic example of how a request is structured:

```cpp
#include "AsyncHTTPRequest_ESP32_Ethernet.h"

AsyncHTTPRequest request;

void sendRequest() {
  if (request.readyState() == readyStateUnsent || request.readyState() == readyStateDone) {
    if (request.open("GET", "http://worldtimeapi.org/api/timezone/America/Toronto")) {
      request.send();
    }
  }
}

void setup() {
  // Ethernet initialization code here...
  request.onReadyStateChange([](void* optParm, AsyncHTTPRequest* request, int readyState) {
    if (readyState == readyStateDone) {
      Serial.println(request->responseText());
    }
  });
}

void loop() {
  // The library handles the request in the background
}
```

### Ecosystem and Dependencies
The library is part of a larger ecosystem of ESP32 networking tools maintained by Khoi Hoang. It depends on `AsyncTCP` for the underlying transport layer and integrates seamlessly with various `WebServer_ESP32` libraries tailored for specific Ethernet chips. Whether you are building an industrial gateway or a high-performance home automation hub, this library provides the non-blocking network performance required for modern embedded applications.
