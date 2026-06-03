---
title: MicroWebSrv2
summary: A powerful, fully asynchronous embedded web server for MicroPython and CPython.
  It supports route handlers, WebSockets, and template engines while maintaining a
  small footprint optimized for microcontrollers like ESP32 and STM32.
slug: microwebsrv2
codeUrl: https://github.com/jczic/MicroWebSrv2
star: 702
version: v2.1.0
lastUpdated: '2025-08-18'
rtos: ''
libraries:
- micropython
topics:
- async
- asynchronous
- cors
- esp32
- hc2
- http
- https
- iot
- micropython
- microwebsrv
- pyboard
- pycom
- routes
- ssl
- template-engine
- web-server
- websocket
- websocket-server
- websockets
- wipy
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- microwebsrv
- tinyweb
- uht-micro-http-toolkit
- raspberry-pi-pico-web-server-control
- asyncwebserver-esp32-sc-enc
- asyncwebserver-esp32-w5500
---

MicroWebSrv2 is a high-performance, asynchronous web server designed specifically for the constraints of embedded systems. As a complete redesign of the original MicroWebSrv, this version focuses on scalability, robustness, and efficiency, making it an ideal choice for IoT applications running on MicroPython or CPython.

## High-Performance Asynchronous Architecture

At the core of MicroWebSrv2 is a fully asynchronous I/O logic. Unlike traditional web servers that might block while waiting for data, MicroWebSrv2 can process many requests and responses concurrently within a single thread. This is achieved by working directly at the I/O level, allowing the server to maintain thousands of persistent connections with minimal resource consumption. 

For more demanding applications, the server supports multiple worker threads to parallelize processes that might otherwise be blocking. Memory management is also a priority; the server uses pre-allocated memory buffer slots to maximize performance and prevent the fragmentation issues often encountered in long-running embedded applications.

## Key Features for Embedded Development

MicroWebSrv2 provides a comprehensive suite of features that rival desktop-class web servers while remaining small enough for microcontrollers:

- **Flexible Routing**: Define web routes with variable arguments using decorators, allowing for clean and RESTful API designs.
- **Security**: Full support for SSL/TLS (HTTPS) to ensure secure communication between the client and the embedded device.
- **Standard Protocol Support**: Handles all major HTTP methods including GET, POST, PUT, DELETE, PATCH, and OPTIONS.
- **Resource Optimization**: Includes built-in support for static file caching, URL-encoded forms, and JSON object serialization.
- **CORS Support**: Easily configure Cross-Origin Resource Sharing for modern web application integration.

## Extensibility through Modules

The server's functionality can be extended through dedicated modules. Two of the most prominent inclusions are:

### WebSockets Module
This module enables real-time, bi-directional communication between the server and clients. It is perfect for creating interactive dashboards, chat applications, or live telemetry feeds from sensors.

### PyhtmlTemplate Module
For developers who need dynamic content, this module allows for the creation of `.pyhtml` pages. These pages allow Python code to be integrated directly into HTML templates, providing a powerful way to render dynamic data on the fly.

## Target Platforms

MicroWebSrv2 is widely used across the MicroPython ecosystem. It is particularly well-suited for:
- **ESP32**: Leveraging the popular Wi-Fi enabled microcontroller for IoT gateways.
- **Pycom WiPy**: Providing a robust web interface for professional IoT modules.
- **STM32**: Running on Pyboards for industrial and hobbyist control systems.

## Getting Started

Setting up a basic server is straightforward. After importing the package, you can instantiate the server and start it in managed mode, which handles the asynchronous event loop for you:

```python
from MicroWebSrv2 import *
from time import sleep

# Instantiate the server
mws2 = MicroWebSrv2()

# Start the server in managed mode
mws2.StartManaged()

# Main loop
try:
    while True:
        sleep(1)
except KeyboardInterrupt:
    mws2.Stop()
```

Whether you are building a simple configuration page for a sensor or a complex web-based control panel for a robot, MicroWebSrv2 provides the tools necessary to deliver a professional web experience from an embedded device.
