---
title: MicroWebSrv
summary: A micro HTTP Web server for MicroPython that supports WebSockets, HTML/Python
  templating, and routing handlers. It is optimized for embedded modules like the
  ESP32, Pycom, and Pyboard D-series.
slug: microwebsrv
codeUrl: https://github.com/jczic/MicroWebSrv
star: 657
lastUpdated: '2023-01-17'
rtos: ''
libraries:
- micropython
topics:
- captive-portal
- esp32
- hc2
- http
- iot
- language-templating
- micropython
- microwebsrv
- pyboard
- pycom
- pyhtml
- routing
- support-websockets
- template-engine
- templating
- webserver
- websocket
- websocket-server
- websockets
- wipy
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- microwebsrv2
- uht-micro-http-toolkit
- raspberry-pi-pico-web-server-control
- tinyweb
- microdot
- mqboard-micropython-mqtt-micro-framework
---

MicroWebSrv is a lightweight and efficient HTTP web server specifically designed for the MicroPython ecosystem. It provides a robust platform for creating embedded web interfaces, RESTful APIs, and real-time data exchange systems on microcontrollers such as the ESP32, Pycom modules, and the Pyboard D-series. By focusing on a small footprint and ease of integration, it allows developers to add sophisticated networking capabilities to IoT devices with minimal overhead.

The project is modular, consisting of three core files that can be included based on the application's requirements: the main server implementation, an optional WebSocket module for real-time communication, and a templating engine for dynamic HTML rendering.

## Key Features and Capabilities

MicroWebSrv offers several advanced features that bridge the gap between simple embedded scripts and full-scale web frameworks:

- **Flexible Routing**: Map URL paths to Python functions using either a routing list or convenient decorators. It supports variable routes (e.g., `/edit/<id>`), allowing for dynamic resource management.
- **WebSocket Support**: Through the optional `microWebSocket.py` module, the server can handle full-duplex communication, which is essential for interactive dashboards and real-time control systems.
- **PyHTML Templating**: The `microWebTemplate.py` module introduces a custom templating language. This allows developers to embed MicroPython code directly within HTML files (using the `.pyhtml` extension) to render dynamic content on the fly.
- **REST API Integration**: Built-in support for various HTTP methods (GET, POST, etc.) and JSON parsing makes it straightforward to implement a full REST API for device configuration or data export.
- **Captive Portal Support**: The server can easily be configured as a captive portal, redirecting all unknown queries to a setup page, which is ideal for WiFi provisioning.

## Technical Implementation

The server is designed to be non-blocking and can run in its own thread, ensuring that the main application logic remains responsive. It handles standard mime types, serves static files from the local filesystem, and provides a comprehensive API for interacting with HTTP requests and responses.

### Basic Setup

Initializing the server requires only a few lines of code. By default, it looks for files in the `/flash/www` directory and listens on port 80:

```python
from microWebSrv import MicroWebSrv
mws = MicroWebSrv()      # TCP port 80 and files in /flash/www
mws.Start(threaded=True) # Starts server in a new thread
```

### Using Route Handlers

Developers can define specific logic for different URLs using decorators. This is particularly useful for handling form data or API requests:

```python
@MicroWebSrv.route('/post-test', 'POST')
def handlerFuncPost(httpClient, httpResponse):
    formData = httpClient.ReadRequestPostedFormData()
    firstname = formData.get("firstname", "Guest")
    httpResponse.WriteResponseOk(contentType="text/html", content=f"<h1>Hello {firstname}!</h1>")
```

### Dynamic Templating with .pyhtml

The templating engine allows for powerful logic within the HTML markup. You can use loops, conditionals, and include other templates:

```html
<html>
  <body>
    <h1>System Status</h1>
    {{ py }}
      import machine
      temp = (machine.internal_temp() if hasattr(machine, 'internal_temp') else 0)
    {{ end }}
    <p>Current Internal Temperature: {{ temp }}°C</p>
    {{ if temp > 50 }}
      <p style="color: red;">Warning: High Temperature!</p>
    {{ end }}
  </body>
</html>
```

## Ecosystem and Integration

MicroWebSrv is part of a larger suite of tools by the same author, including MicroDNSSrv for DNS management and the more advanced MicroWebSrv2. Its simplicity makes it a staple for MicroPython developers who need a reliable, easy-to-configure web server for their embedded hardware projects.
