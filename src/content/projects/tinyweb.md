---
title: TinyWeb
summary: A lightweight, asynchronous HTTP server specifically designed for MicroPython
  environments on microcontrollers like the ESP8266 and ESP32. It leverages the uasyncio
  library to provide a non-blocking, single-threaded server with an API inspired by
  Flask, making it ideal for building modern web interfaces and RESTful services on
  IoT devices with limited RAM.
slug: tinyweb
codeUrl: https://github.com/belyalov/tinyweb
star: 277
version: v1.3.5
lastUpdated: '2024-05-14'
rtos: ''
libraries:
- micropython
topics:
- cats
- cats-effect
- esp32
- esp8266
- http-server
- iot
- micropython
- rest-api
- restful
- web-server
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- uht-micro-http-toolkit
- microdot
- picoweb
- microwebsrv2
- microwebsrv
- nanofish
---

TinyWeb is a simple and lightweight HTTP server designed specifically for resource-constrained devices running MicroPython, such as the ESP8266 and ESP32. By providing a modern, asynchronous foundation, TinyWeb allows developers to create sophisticated web interfaces and RESTful APIs for IoT devices without the overhead of traditional web servers.

## Asynchronous Architecture

At its core, TinyWeb is a single-threaded TCP server built on top of the `uasyncio` library. This asynchronous approach is critical for embedded systems where blocking operations can lead to unresponsive hardware or watchdog timeouts. By utilizing non-blocking I/O, TinyWeb can handle multiple concurrent connections efficiently, even on devices with very limited processing power. The server allows developers to define concurrency limits based on the specific hardware platform, typically defaulting to 3 connections for the ESP8266 and 6 for the ESP32.

## Flask-Inspired API

One of the most appealing aspects of TinyWeb is its developer-friendly API, which draws heavy inspiration from the popular Python web framework, Flask. Developers can use decorators to map URLs to asynchronous functions, making the code readable and easy to maintain. This familiarity significantly lowers the barrier to entry for web developers transitioning into the embedded space.

For example, creating a basic index page is as simple as:

```python
import tinyweb

app = tinyweb.webserver()

@app.route('/')
async def index(request, response):
    await response.start_html()
    await response.send('<html><body><h1>Hello, world!</h1></html>')

app.run(host='0.0.0.0', port=8081)
```

## Optimized for Tiny Devices

TinyWeb is engineered for efficiency. It is capable of running on devices with as little as 64K to 96K of onboard RAM. To achieve this, the library makes several strategic trade-offs:
- **Memory Management**: It uses binary strings for request data to minimize CPU and memory overhead.
- **Header Control**: Developers can specify exactly which HTTP headers to save, preventing the RAM from being filled with unnecessary metadata.
- **Protocol Support**: It focuses on HTTP/1.0 to keep the implementation simple and the footprint small, though it supports HTTP/1.1 specifically for REST API interactions to ensure compatibility with modern tools.

## RESTful API and Static Content

Beyond simple HTML pages, TinyWeb includes robust support for building RESTful services. It provides a `resource` decorator and an `add_resource` method that allow developers to map classes to URLs, supporting standard HTTP methods like GET, POST, PUT, and DELETE. This makes it an excellent choice for creating the backend of a Single Page Application (SPA) hosted directly on a microcontroller.

Additionally, TinyWeb supports serving static content from the local filesystem. It includes built-in MIME type detection and supports cache control headers, allowing browsers to cache static assets like CSS and JavaScript files, further reducing the load on the microcontroller's network stack.

## Getting Started

To use TinyWeb, you need a MicroPython-compatible device and the `uasyncio` and `logging` libraries. For older versions of MicroPython, these may need to be installed manually from `micropython-lib`. Once the environment is set up, you can define your routes, configure your network connection, and start the server. The project also provides pre-compiled firmware for NodeMCU-style ESP8266 and ESP32 boards to help developers get up and running quickly.
