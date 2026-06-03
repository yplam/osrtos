---
title: AsyncHTTPSRequest_Generic
summary: A high-performance asynchronous HTTPS request library for ESP32 and ESP8266,
  enabling non-blocking REST communication. It supports a wide range of network interfaces
  including built-in WiFi and various Ethernet controllers like W5500, W6100, and
  ENC28J60.
codeUrl: https://github.com/khoih-prog/AsyncHTTPSRequest_Generic
isShow: false
rtos: ''
libraries:
- lwip
- littlefs
- spiffs
topics:
- tls
- ssl
- async
- https
- esp32
- wifi-network
- https-client
- lan8720
- esp32-s2
- esp32-c3
- wt32-eth01
- async-tcp-client
- async-https-client
- esp32-s3
- async-http-https-client
- lwip
- lwip-enc28j60
- lwip-ethernet
- lwip-w5500
- lwip-w6100
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- asynchttpsrequest-esp32-ethernet
- asynchttprequest-esp32-ethernet
- https-server-generic-library
- asyncmqtt-esp32
- asyncwebserver-esp32-sc-enc
- asyncwebserver-ethernet
---

In the world of IoT and embedded systems, performing secure HTTPS requests can often be a bottleneck. Traditional blocking libraries force the processor to wait for a server response, stalling other critical tasks like sensor polling or display updates. The **AsyncHTTPSRequest_Generic** library solves this by bringing an asynchronous, event-driven paradigm—similar to JavaScript's `XMLHttpRequest`—to the Arduino and ESP32 ecosystem.

### Why Asynchronous Requests Matter
When building responsive embedded applications, the main execution loop must remain free. This library allows developers to initiate an HTTPS request and then continue executing other code. Once the server responds or the state of the connection changes, the library triggers a callback function. This architecture is essential for complex projects where timing is critical and multiple network operations might happen simultaneously.

### Comprehensive Feature Set
AsyncHTTPSRequest_Generic isn't just a simple wrapper; it is a robust toolset for modern web communication on microcontrollers. Key features include:
- **Standard HTTP Methods**: Full support for GET, POST, PUT, PATCH, DELETE, and HEAD.
- **Header Management**: Easy handling of both request and response headers.
- **Chunked Responses**: Transparent handling of chunked data transfers.
- **Flexible Data Retrieval**: Data can be retrieved incrementally as it arrives or in bulk once the transaction is complete.
- **Memory Efficiency**: It utilizes a custom `xbuf` class, which manages data using a chain of small segments. This acts like a dynamic circular buffer, optimizing heap usage and allowing for flow control.

### Broad Hardware and Network Support
The library is highly versatile, targeting the ESP32 family (including S2, S3, and C3 variants) and ESP8266. One of its strongest points is its extensive support for different network physical layers. Beyond built-in WiFi, it integrates with:
- **WT32_ETH01** (LAN8720 Ethernet)
- **W5500, W6100, and ENC28J60** Ethernet controllers via LwIP
- **STM32** with built-in LAN8742A Ethernet (in development/limited support)

### Getting Started
The library is designed to be easy to integrate into existing Arduino IDE or PlatformIO projects. It relies on the `AsyncTCP_SSL` library for underlying secure socket management. Below is a conceptual example of how to set up a request:

```cpp
#include <AsyncHTTPSRequest_Generic.h>

AsyncHTTPSRequest request;

void requestCB(void* optParm, AsyncHTTPSRequest* request, int readyState) {
    if (readyState == readyStateDone) {
        Serial.println("Response received:");
        Serial.println(request->responseText());
    }
}

void sendRequest() {
    if (request.readyState() == readyStateUnsent || request.readyState() == readyStateDone) {
        if (request.open("GET", "https://worldtimeapi.org/api/timezone/Europe/London.txt")) {
            request.onReadyStateChange(requestCB);
            request.send();
        }
    }
}
```

### Coexistence and Compatibility
A significant update in version 2.0.0 was the ability for this library to coexist with the standard `AsyncHTTPRequest` library. This allows a single device to manage both standard HTTP and secure HTTPS requests to multiple different addresses simultaneously without conflict. It also provides a specific `.hpp` inclusion method to help developers avoid the common 'Multiple Definitions' linker errors often found in complex multi-file Arduino projects.

### Community and Reliability
Maintained by Khoi Hoang and based on the original work by Bob Lemaire, the library is frequently updated to support the latest ESP32 Core versions. It includes detailed debug levels (0-4) to help developers troubleshoot SSL handshakes and network timeouts, making it a reliable choice for production-grade IoT firmware.
