---
title: picoweb
summary: A minimalist, asynchronous web micro-framework designed for the Pycopy Python
  implementation. It features a small memory footprint of approximately 36K heap and
  provides a Flask-like API for developing web applications on resource-constrained
  embedded systems and bare-metal platforms.
slug: picoweb
codeUrl: https://github.com/pfalcon/picoweb
star: 519
lastUpdated: '2020-07-07'
rtos: ''
libraries:
- micropython
- sqlite
topics:
- async
- asyncio
- micro-framework
- micropython
- minimalist
- nano-framework
- pycopy
- python
- unbloated
- webapp
- webserver
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- microdot
- tinyweb
- uht-micro-http-toolkit
- pycopy
- raspberry-pi-pico-web-server-control
- pikapython
---

picoweb is a "micro" web micro-framework—or "pico-framework"—specifically engineered for radically unbloated web applications. It is built to run on Pycopy, a minimalist and resource-efficient Python implementation, making it an ideal choice for embedded systems where memory and storage are at a premium.

### Efficiency and Performance
One of the standout features of picoweb is its extremely small memory footprint. While the initial versions required around 64K of heap for a trivial application, the framework has been optimized to run realistic web applications in as little as 36K of heap. This efficiency is achieved by avoiding unnecessary abstractions and focusing on the core requirements of HTTP communication. By minimizing the overhead of the framework itself, developers can allocate more resources to their specific application logic.

### Asynchronous Architecture
Unlike many traditional Python web frameworks that are synchronous and threaded, picoweb is asynchronous from the ground up. It leverages the `uasyncio` library to handle multiple concurrent requests through I/O and CPU multiplexing. This non-threaded nature means that the framework does not use global request or response objects; instead, it explicitly passes request and response objects to handlers, ensuring clarity and efficiency in an async environment. This architecture is particularly well-suited for the single-core environments often found in microcontrollers.

### Familiar API Design
For developers coming from the broader Python ecosystem, picoweb offers a comfortable transition. Its API has strong affinities with well-known frameworks like Flask, Bottle, and Django. This allows developers to use familiar patterns, such as route decorators or centralized route lists, reducing the learning curve and potentially simplifying the porting of existing applications. While it is not a direct clone, the naming conventions and logic flow are designed to feel intuitive to those with experience in standard web development.

### Modular Ecosystem and Dependencies
picoweb maintains its "pico" status by keeping mandatory dependencies to a minimum. While it depends on `uasyncio` for networking, other features are treated as "soft" dependencies:

- **Templating**: Integration with `utemplate` is provided via convenience functions, but it is only imported if used.
- **Databases**: It supports various backends including the builtin `btree` module (recommended for bare-metal portability), `btreedb`, `filedb`, and `uorm` (for Sqlite3 on Unix ports).
- **Logging**: It uses a standard `logging`-compatible interface, but the module itself is optional to save space on the smallest targets.

### Example Usage
The framework supports multiple styles of routing. Here is a Flask-style example using decorators:

```python
import picoweb

app = picoweb.WebApp(__name__)

@app.route("/")
def index(req, resp):
    yield from picoweb.start_response(resp)
    yield from resp.awrite("Hello from picoweb!")

app.run(debug=True)
```

Alternatively, developers can use a Django-style centralized route list, which is often preferred for larger applications to keep the structure organized and separate from the view logic.

### Target Platforms
While picoweb was developed with the Unix port of Pycopy as its reference platform, its design makes it highly portable across all Pycopy targets, including memory-constrained bare-metal systems. This makes it a powerful tool for creating web-based configuration interfaces, dashboards, or APIs for IoT devices and embedded controllers.
