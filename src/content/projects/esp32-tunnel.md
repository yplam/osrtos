---
title: esp32-tunnel
summary: A networking library for ESP32 and ESP8266 that exposes local web servers
  to the public internet without port forwarding or complex cloud configurations.
  It leverages FreeRTOS tasks to handle background connectivity and supports multiple
  tunneling providers including WebSocket relays, localtunnel, and bore.
slug: esp32-tunnel
codeUrl: https://github.com/HamzaYslmn/esp32-tunnel
version: v4.2.0
lastUpdated: '2026-06-30'
licenses:
- NOASSERTION
rtos: freertos
topics:
- arduino
- arduino-library
- bore
- esp32
- esp32-arduino
- freertos
- localtunnel
- ngrok-alternative
- public-url
- tunnel
- websocket
isShow: false
createdAt: '2026-07-08T00:12:09+00:00'
updatedAt: '2026-07-08T00:12:09+00:00'
---

Accessing an ESP32 web server from outside a local network usually involves a headache of port forwarding, static IP configurations, or reliance on heavy third-party cloud accounts. The esp32-tunnel project simplifies this process by providing a unified API to expose local servers to the public internet using three distinct tunneling methods: self-hosted WebSocket relays, localtunnel, and bore.

### Multi-Provider Connectivity

The library is designed with flexibility in mind, allowing developers to choose a provider based on their specific needs for security, RAM usage, and URL stability:

*   **Self-hosted Relay**: This is the default and most efficient mode. It uses a plain WebSocket relay, which avoids the heavy RAM overhead of TLS on the ESP32 (saving approximately 40 KB). It generates per-device access keys for security and can be hosted on platforms like Render.com using a provided Python backend.
*   **localtunnel**: This provider offers free HTTPS subdomain URLs. It uses `WiFiClientSecure` to establish a tunnel to the localtunnel.me service, making it ideal for projects requiring encrypted public endpoints without managing a relay server.
*   **bore**: A simple TCP tunnel via bore.pub. It requires no login or account and provides a free public TCP port to reach the device.

### Seamless Integration with FreeRTOS

One of the standout features for ESP32 users is the library's deep integration with FreeRTOS. When `tunnelSetup()` is called on an ESP32, the library automatically spawns a background task to drive the tunnel. This means the main `loop()` remains entirely free for application logic, such as reading sensors or controlling motors, without the risk of networking overhead blocking execution. For ESP8266 users, where a task scheduler isn't available in the same way, the library provides a `tunnelLoop()` function to be called manually.

### Optimization and Footprint

Embedded systems are often constrained by memory, and esp32-tunnel provides several ways to trim its footprint. By using "Handler Mode," developers can bypass the `ESPAsyncWebServer` entirely, processing incoming HTTP requests via a simple callback function. This saves significant flash memory and runtime RAM by avoiding the creation of additional task buffers. Furthermore, features like mDNS can be disabled via preprocessor definitions to save an additional 30 KB of flash.

### Getting Started

Setting up a tunnel is designed to be a one-line operation after the initial network connection. Here is a basic example of exposing an asynchronous web server via a self-hosted relay:

```cpp
#include <ESPAsyncWebServer.h>
#include <esp32tunnel.h>

AsyncWebServer server(80);

void setup() {
  Serial.begin(115200);
  WiFi.begin("SSID", "PASS");
  while (WiFi.status() != WL_CONNECTED) delay(500);

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *r) {
    r->send(200, "text/plain", "Hello from the public internet!");
  });
  server.begin();

  // Start the tunnel to a self-hosted relay
  tunnelSetup(SELFHOST, "myserver.com/my-device");
}

void loop() {
  // The tunnel runs in its own FreeRTOS task on ESP32
}
```

### Security and Access Control

Security is a primary concern when exposing local hardware to the web. By default, self-hosted tunnels are private. The ESP32 generates a unique access key on its first boot and persists it in Non-Volatile Storage (NVS). This key must be provided by the client via a URL parameter or an `X-Tunnel-Key` header to gain access. For open projects, developers can explicitly call `tunnelPublic()` to disable this authentication layer.
