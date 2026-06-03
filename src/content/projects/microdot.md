---
title: Microdot
summary: Microdot is a minimalistic Python web framework inspired by Flask, specifically
  designed for resource-constrained environments like microcontrollers. It supports
  both CPython and MicroPython, offering a lightweight and extensible solution for
  building web applications and APIs on embedded hardware.
slug: microdot
codeUrl: https://github.com/miguelgrinberg/microdot
siteUrl: https://microdot.readthedocs.io/en/latest/
star: 2045
version: v2.5.1
lastUpdated: '2025-12-25'
rtos: ''
libraries:
- micropython
topics:
- http
- micropython
- python
- webapp
- webserver
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- picoweb
- tinyweb
- uht-micro-http-toolkit
- microwebsrv
- raspberry-pi-pico-web-server-control
- pycopy-standard-library-pycopy-lib
---

## The Impossibly Small Web Framework

Microdot is a minimalistic Python web framework designed to bring the ease of use found in modern web development to the world of microcontrollers. Inspired by Flask, Microdot provides a familiar, decorator-based routing system that is optimized for systems with limited resources. Whether you are building a simple status page for an IoT sensor or a complex control interface for an embedded device, Microdot offers a lightweight foundation that runs on both standard Python (CPython) and MicroPython.

## Core Features and Architecture

At its heart, Microdot is designed to be small and efficient. With the release of version 2, the framework has transitioned to an asynchronous-first architecture, making `asyncio` the core implementation. This allows developers to handle multiple concurrent connections efficiently, which is critical for responsive embedded web servers.

**Key capabilities include:**
- **Flask-like Routing:** Use simple decorators to define routes and handle HTTP methods.
- **Asynchronous Support:** Built-in support for `async` and `await`, allowing for non-blocking I/O operations.
- **Extensibility:** A modular design that allows users to include only the features they need, keeping the memory footprint as small as possible.
- **Cross-Platform:** Seamlessly move code between a desktop development environment and a microcontroller running MicroPython or CircuitPython.

## Rich Extension Ecosystem

Despite its small size, Microdot supports a wide range of modern web features through its official extensions. These modules allow developers to add advanced functionality without bloating the core framework:

- **WebSockets and SSE:** Support for real-time, bidirectional communication and Server-Sent Events.
- **Templates:** Integration with both Jinja2 (for CPython) and uTemplate (optimized for MicroPython).
- **Security:** Built-in support for user authentication (Basic and Token-based), session management with signed JWTs, and CSRF protection.
- **CORS:** A Cross-Origin Resource Sharing extension to facilitate communication with front-end applications hosted on different domains.
- **Deployment Flexibility:** Support for running as a standalone server or behind ASGI/WSGI servers for more robust deployments.

## Getting Started

Creating a basic application with Microdot is straightforward. The following example demonstrates how to set up a simple "Hello, world!" endpoint:

```python
from microdot import Microdot

app = Microdot()

@app.route('/')
async def index(request):
    return 'Hello, world!'

app.run()
```

## Embedded Hardware Support

Microdot is particularly well-suited for microcontrollers like the ESP32, RP2040, and STM32 series when running MicroPython. Because it avoids heavy dependencies and complex abstractions, it can operate within the tight RAM constraints typical of these devices. The project also provides specific guidance on cross-compiling and freezing the framework into MicroPython firmware to further optimize memory usage and startup time.

## Roadmap and Community

The project continues to evolve with a roadmap that includes OpenAPI integration for automatic API documentation and a pub/sub mini-framework for easier WebSocket and SSE management. As a mature project with a history of active maintenance, Microdot has become a go-to choice for developers looking to implement web interfaces on embedded Python platforms.
