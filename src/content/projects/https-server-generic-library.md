---
title: HTTPS_Server_Generic Library
summary: A comprehensive HTTP and HTTPS server library for ESP32-based boards, supporting
  WiFi and various Ethernet controllers like W5500, W6100, and ENC28J60. It provides
  an Express-like API for handling routes, middleware, and asynchronous request processing
  using the ESP32's multi-tasking capabilities.
slug: https-server-generic-library
codeUrl: https://github.com/khoih-prog/HTTPS_Server_Generic
siteUrl: https://khoih-prog.github.io/HTTPS_Server_Generic_docs/
star: 23
version: v1.5.0
lastUpdated: '2023-01-10'
rtos: freertos
libraries:
- lwip
- spiffs
topics:
- async
- async-http-webserver
- async-https-webserver
- enc28j60
- esp32
- http
- https
- lan8720
- lwip
- lwip-enc28j60
- lwip-ethernet
- lwip-w5500
- lwip-w6100
- ssl
- tls
- w5500
- w6100
- webserver
- websocket
- wt32-eth01
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- webserver-esp32-w5500
- webserver-esp32-enc
- asynchttpsrequest-esp32-ethernet
- asynchttpsrequest-generic
- asyncwebserver-esp32-w5500
- asyncwebserver-ethernet
---

## Overview

The HTTPS_Server_Generic library is a powerful networking solution for the ESP32 ecosystem, designed to provide secure and robust web server capabilities. Based on the work of Frank Hessel, this library extends support to a wide range of ESP32 variants including the S2, S3, and C3, as well as various Ethernet controllers. It allows developers to run HTTP, HTTPS, or both simultaneously, making it ideal for IoT gateways, secure configuration interfaces, and embedded REST APIs.

## Key Features and Capabilities

This library is built to handle the complexities of secure communication on resource-constrained hardware. By leveraging the built-in encryption of ESP32-based boards, it provides a high-level API for managing SSL/TLS connections without requiring deep knowledge of the underlying security stack.

**Core features include:**
- **Dual Protocol Support:** Run HTTP and HTTPS servers concurrently.
- **Flexible Routing:** Use ResourceNodes to bind handler functions to specific URLs and HTTP methods (GET, POST, PUT, etc.).
- **Middleware Support:** Implement central tasks like authentication, logging, or request filtering using a middleware architecture similar to Express.js.
- **Parallel Connection Handling:** Supports multiple clients in parallel, typically managing 3-4 TLS clients simultaneously depending on available heap memory.
- **Performance Optimization:** Utilizes `Connection: keep-alive` and SSL session reuse to reduce handshake overhead and improve data transfer speeds.

## Hardware and Network Support

One of the primary strengths of this library is its broad hardware compatibility. It supports the standard ESP32 WiFi stack alongside several popular Ethernet controllers via LwIP:
- **Ethernet Controllers:** W5500, W6100, ENC28J60, and LAN8720 (including WT32_ETH01).
- **ESP32 Families:** Standard ESP32, ESP32-S2, ESP32-S3, and ESP32-C3.

## Technical Implementation

The library is designed with memory efficiency in mind. Each TLS connection requires approximately 40 to 50 kB of heap memory. To help manage these constraints, the library offers advanced configuration flags, such as `HTTPS_DISABLE_SELFSIGNING`, which can be used to reduce the program footprint by removing runtime certificate generation code.

### Asynchronous Operation

For applications that cannot afford to have the main loop blocked by network processing, the library supports asynchronous operation. By utilizing the ESP32's FreeRTOS-based task system, the server can be moved to a separate background task, ensuring that the primary application logic remains responsive.

## Getting Started

Setting up a server involves creating a server instance, defining resource nodes, and starting the listener. Below is a basic example of creating a secure server:

```cpp
#include <HTTPS_Server_Generic.h>

using namespace httpsserver;

// Create an SSL certificate object
SSLCert cert = SSLCert(example_crt_DER, example_crt_DER_len,
                       example_key_DER, example_key_DER_len);

// Create an SSL-enabled server
HTTPSServer secureServer = HTTPSServer(&cert);

void handleRoot(HTTPRequest * req, HTTPResponse * res) 
{
    res->setHeader("Content-Type", "text/html");
    res->println("<h1>Hello from ESP32!</h1>");
}

void setup() {
    ResourceNode * nodeRoot = new ResourceNode("/", "GET", &handleRoot);
    secureServer.registerNode(nodeRoot);
    secureServer.start();
}

void loop() {
    secureServer.loop();
}
```

## Advanced Configuration and Logging

Developers can fine-tune the library's behavior through compiler flags. The logging system is highly configurable, allowing users to set log levels from 0 (None) to 4 (Debug) and enable timestamps for easier troubleshooting. This is particularly useful when debugging complex SSL handshakes or monitoring connection timeouts in production environments.
