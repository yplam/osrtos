---
title: AsyncHTTPRequest_RP2040W Library
summary: An asynchronous HTTP request library specifically designed for the Raspberry
  Pi Pico W using the CYW43439 WiFi chip. It provides a subset of HTTP methods including
  GET, POST, and PUT, relying on the AsyncTCP_RP2040W library to facilitate non-blocking
  REST communication.
codeUrl: https://github.com/khoih-prog/AsyncHTTPRequest_RP2040W
isShow: false
rtos: ''
libraries:
- lwip
topics:
- async
- async-http-client
- async-tcp
- async-tcp-client
- cyw43439
- http-client
- raspberry-pi-pico-w
- rp2040
- rp2040w
- wifi
- async-http-requests
- arduino-pico
- lwip
- khoih-prog
- http
- pico-w
- async-http-request
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- asynchttprequest-esp32-ethernet
- asynchttpsrequest-esp32-ethernet
- asynchttpsrequest-generic
- asyncudp-rp2040w
- rp2040-pico-w-esp8285-wifi-library
- asyncdnsserver-rp2040w
---

The Raspberry Pi Pico W has become a favorite for IoT developers, but handling network requests efficiently remains a challenge. Standard blocking HTTP clients can stall your main loop, leading to unresponsive sensors or UI. The **AsyncHTTPRequest_RP2040W** library addresses this by providing a fully asynchronous HTTP layer for the RP2040W, allowing developers to perform REST communication without blocking the execution of their code.

### Why Asynchronous Requests Matter
In traditional embedded programming, a GET request might pause the entire system while waiting for a server response. This library changes that paradigm by using a model similar to Javascript's `XMLHttpRequest`. It employs a ready-state progression system, where the application is notified via callbacks or polling when data arrives or the state changes. This ensures that your Pico W can continue processing other tasks—like reading sensors or controlling actuators—while the networking stack handles the handshake, headers, and data transfer in the background.

### Key Features and Capabilities
AsyncHTTPRequest_RP2040W is more than just a simple GET/POST tool. It supports a comprehensive suite of HTTP methods and advanced features:
- **Full HTTP Method Support**: Includes GET, POST, PUT, PATCH, DELETE, and HEAD.
- **Efficient Memory Management**: It uses a custom `xbuf` class, which manages data in small 64-byte segments. This acts as a dynamic circular buffer that grows and shrinks based on heap availability, making it more economical than fixed-length buffers.
- **Chunked Response Handling**: It transparently handles chunked transfer encoding, which is common in modern web APIs.
- **Flexible Callbacks**: Developers can use `onData` or `onReadyStatechange` callbacks to process data incrementally as it arrives, or retrieve the entire response at once if the heap permits.

### Technical Architecture
The library is built on top of the **AsyncTCP_RP2040W** library and is designed specifically for the **arduino-pico core** by Earle Philhower. By leveraging the underlying lwIP stack of the CYW43439 WiFi chip, it achieves high performance with a low memory footprint. 

One unique aspect of this library's implementation is its approach to the "Multiple Definitions" linker error common in Arduino projects. It provides both `.h` and `.hpp` files. The `.hpp` file can be included in multiple project files, while the `.h` file (containing the implementation) should be included only once in your main sketch. This makes it highly suitable for complex, multi-file projects.

### Getting Started
To use the library, you can install it via the Arduino Library Manager or PlatformIO. Below is a snippet showing how to initiate a simple request:

```cpp
#include <AsyncHTTPRequest_RP2040W.h>

AsyncHTTPRequest request;

void sendRequest() {
  if (request.readyState() == readyStateUnsent || request.readyState() == readyStateDone) {
    if (request.open("GET", "http://worldtimeapi.org/api/timezone/America/Toronto.txt")) {
      request.send();
    }
  }
}

void requestCB(void* optParm, AsyncHTTPRequest* request, int readyState) {
  if (readyState == readyStateDone) {
    Serial.println(request->responseText());
  }
}

void setup() {
  // WiFi setup code here...
  request.onReadyStateChange(requestCB);
}
```

### Hardware Support
This library is specifically optimized for the **Raspberry Pi Pico W** using the CYW43439 WiFi module. It requires the `arduino-pico` core version 2.4.0 or higher. Whether you are building a weather station that dweets data to the cloud or a complex web client that needs to parse JSON responses, this library provides the non-blocking foundation necessary for robust IoT applications.
