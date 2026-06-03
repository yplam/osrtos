---
title: AsyncHTTPSRequest_ESP32_Ethernet
summary: An asynchronous HTTPS request library for ESP32-based boards using LwIP-compatible
  Ethernet controllers like W5500, W6100, and ENC28J60. It leverages AsyncTCP_SSL
  to provide a non-blocking, XMLHttpRequest-style API for efficient REST communication
  in embedded systems.
codeUrl: https://github.com/khoih-prog/AsyncHTTPSRequest_ESP32_Ethernet
isShow: false
rtos: freertos
libraries:
- lwip
topics:
- async
- async-https-client
- async-tcp-client
- esp32
- esp32-c3
- esp32-s2
- esp32-s3
- https
- lan8720
- lwip
- lwip-enc28j60
- lwip-ethernet
- lwip-lan8720
- lwip-w5500
- ssl
- tls
- w5500
- wt32-eth01
- lwip-w6100
- w6100
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- asynchttprequest-esp32-ethernet
- asynchttpsrequest-generic
- asyncwebserver-ethernet
- https-server-generic-library
- asyncwebserver-esp32-w5500
- asyncwebserver-esp32-sc-w5500
---

In the world of embedded systems, blocking operations can be the enemy of a responsive application. When an ESP32 needs to perform an HTTPS request, standard libraries often halt execution until the server responds. The **AsyncHTTPSRequest_ESP32_Ethernet** library changes this paradigm for Ethernet-connected devices, offering a fully asynchronous way to handle secure web requests.

### Why Asynchronous HTTPS?

Most ESP32 networking examples focus on WiFi, but industrial and robust IoT applications often rely on wired Ethernet for stability. This library specifically targets the ESP32 family—including the S2, S3, and C3 variants—using popular Ethernet controllers like the W5500, W6100, ENC28J60, or the built-in LAN8720 (found on boards like the WT32_ETH01). 

By operating asynchronously, the library allows your microcontroller to continue processing sensor data, updating displays, or managing other tasks while waiting for a network response. It employs a programming model similar to the `XMLHttpRequest` found in JavaScript, using ready-state transitions and optional callbacks to notify the application when data arrives or the request completes.

### Key Features and Capabilities

The library is more than just a simple GET requester. It supports a full suite of RESTful methods and advanced networking features:
- **Standard Methods**: Support for GET, POST, PUT, PATCH, DELETE, and HEAD.
- **Memory Efficiency**: It uses a custom `xbuf` class that manages data in small 64-byte segments. This circular buffer approach allows the library to handle large responses without requiring a single massive block of contiguous heap memory.
- **Flexible Data Handling**: Developers can choose to receive data incrementally via an `onData` callback or retrieve it in bulk once the transaction is finished.
- **Header Support**: Full control over request and response headers, including transparent handling of chunked responses.

### Technical Architecture

Under the hood, this library acts as a high-level HTTPS layer built on top of the [AsyncTCP_SSL](https://github.com/khoih-prog/AsyncTCP_SSL) library. It interfaces with the ESP32's LwIP stack to manage the physical Ethernet connection. Because it is designed for the modern ESP32 Arduino Core (v2.0.0+), it includes auto-detection for different core versions, ensuring compatibility even when breaking changes occur in the underlying SDK.

### Getting Started

To avoid common linker errors like `Multiple Definitions`, the library provides a specific inclusion strategy. You should include the `.hpp` file in your header files, but the `.h` file should only be included once in your main `.ino` or `.cpp` file.

```cpp
// In your main sketch
#include "AsyncHTTPSRequest_ESP32_Ethernet.h"

AsyncHTTPSRequest request;

void requestCB(void* optParm, AsyncHTTPSRequest* request, int readyState) {
    if (readyState == readyStateDone) {
        Serial.println(request->responseText());
    }
}

void sendRequest() {
    if (request.readyState() == readyStateUnsent || request.readyState() == readyStateDone) {
        if (request.open("GET", "https://worldtimeapi.org/api/timezone/America/Toronto")) {
            request.send();
        }
    }
}
```

### Hardware Compatibility

The library is extensively tested across the ESP32 ecosystem:
- **ESP32-S3/S2/C3**: Support for SPI-based Ethernet (W5500, W6100, ENC28J60).
- **WT32_ETH01**: Support for the LAN8720 RMII interface.
- **Custom Pinouts**: Users can easily define their own SPI pins (MOSI, MISO, SCK, CS) and Interrupt pins to match their specific hardware layout.

Whether you are building an industrial gateway or a secure home automation controller, the AsyncHTTPSRequest_ESP32_Ethernet library provides the tools necessary to implement secure, non-blocking communication over a reliable wired connection.
