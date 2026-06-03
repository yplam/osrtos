---
title: uht — micro HTTP Toolkit
summary: A minimal HTTP/1.0 server designed for resource-constrained devices like
  the ESP32 and Raspberry Pi Pico. It provides an asynchronous routing system compatible
  with MicroPython and CircuitPython for building lightweight web applications on
  embedded hardware.
slug: uht-micro-http-toolkit
codeUrl: https://github.com/nmattia/uht
siteUrl: https://nmattia.github.io/uht/
star: 13
version: v0.0.1
lastUpdated: '2025-08-06'
rtos: ''
libraries:
- micropython
topics:
- embedded
- esp32
- http
- micropython
- python
- raspberry-pi-pico
isShow: false
createdAt: '2026-01-26'
updatedAt: '2026-01-26'
relatedProjects:
- tinyweb
- microwebsrv
- microdot
- picoweb
- raspberry-pi-pico-web-server-control
- microwebsrv2
---

## Overview

uht (micro HTTP Toolkit) is a lightweight HTTP/1.0 server specifically engineered for tiny devices and microcontrollers. Designed to run on MicroPython 1.21+ and CircuitPython, it targets popular hardware platforms such as the ESP32 and Raspberry Pi Pico. The project originated as a fork of tinyweb but has since been extensively rewritten to provide a modern, asynchronous interface for embedded web development.

## Key Features

The library focuses on simplicity and efficiency, making it ideal for "hot apps" on microcontrollers where memory and processing power are limited. Key capabilities include:

- **Asynchronous Core**: Built from the ground up to work with `asyncio`, allowing the server to run alongside other background tasks without blocking the execution loop.
- **Dynamic Routing**: Supports standard route definitions as well as routes with parameters (e.g., `/hello/<name>`), enabling RESTful API patterns on small devices.
- **Flexible Response Handling**: Developers can easily set custom HTTP status codes, reason phrases, and additional headers before sending the response body.
- **Catch-All Routes**: Provides a mechanism to handle 404 errors or undefined paths through a global catch-all handler.

## Technical Implementation

uht is designed to be modular and easy to install using MicroPython's built-in package manager, `mip`. It relies on the standard `logging` library for telemetry and is optimized for the resource constraints of the ESP32 and RP2040. The toolkit supports both standard Python source files (`.py`) and compiled MicroPython bytecode (`.mpy`) to save on-device memory.

### Basic Usage Example

Setting up a server is straightforward. The following example demonstrates how to define a basic route and start the server:

```python
from uht import HTTPServer

app = HTTPServer()

@app.route("/")
async def index(req, resp):
    await resp.send(b"Hello, world!")

app.run()  # Starts the server on 127.0.0.1:8081
```

### Advanced Async Integration

For more complex applications that require background sensor polling or peripheral management, uht can be integrated into an existing `asyncio` loop using the `start()` method:

```python
async def main():
    server = app.start("0.0.0.0", 8081)
    print("Server started on port 8081")

    # The server runs concurrently with other tasks
    await server.wait_closed()

asyncio.run(main())
```

## Hardware and Platform Support

uht is verified to work on a variety of embedded platforms. It is particularly well-suited for the Raspberry Pi Pico 2 W, ESP8266, and ESP32-C6. The project includes a robust testing suite that can be run within a Dockerized MicroPython unix port environment or directly on hardware using `unittest`. 

For developers looking to contribute or customize the toolkit, the repository provides a comprehensive build system via a Makefile, supporting linting with Ruff and type checking with Mypy, ensuring high code quality even within the constraints of a micro-library.
