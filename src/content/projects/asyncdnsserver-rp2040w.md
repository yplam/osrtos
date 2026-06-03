---
title: AsyncDNSServer_RP2040W
summary: An asynchronous DNS server library for the Raspberry Pi Pico W (CYW43439
  WiFi). It provides non-blocking DNS resolution, enabling efficient captive portals
  and multi-connection network environments without the need for tight polling loops.
codeUrl: https://github.com/khoih-prog/AsyncDNSServer_RP2040W
siteUrl: https://github.com/khoih-prog/AsyncDNSServer_RP2040W
isShow: false
rtos: ''
libraries:
- lwip
topics:
- async
- communication
- cyw43439
- data
- dns
- dns-server
- lwip
- raspberry-pi-pico-w
- rp2040
- rp2040w
- udp
- wifi
- async-dns-server
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- asyncudp-rp2040w
- asynchttprequest-rp2040w-library
- asyncudp-ethernet
- asyncudp-esp32-sc-w6100
- asyncudp-esp32-ethernet
- asyncwebserver-esp32-w5500
---

The Raspberry Pi Pico W has become a favorite for embedded developers due to its powerful RP2040 microcontroller and integrated CYW43439 WiFi chip. However, building responsive network services like captive portals often requires efficient, non-blocking communication. The **AsyncDNSServer_RP2040W** library addresses this by providing a fully asynchronous DNS server implementation tailored specifically for the Pico W.

### Why Asynchronous DNS Matters

Traditional DNS server libraries for Arduino often operate in a synchronous or blocking manner. This means the microcontroller must wait for a packet to arrive and process it before moving on to other tasks, or the developer must manually poll for new packets in a tight `loop()`. 

AsyncDNSServer_RP2040W changes this paradigm. By utilizing an asynchronous architecture, the library handles UDP packets in the background. Your application is notified only when a packet is ready, allowing the system to handle multiple simultaneous connections without stalling. This results in significantly higher performance and a more responsive user experience, especially in "Captive Portal" scenarios where a device must intercept and redirect DNS queries to a local web server.

### Key Features

- **Multi-Connection Support**: Handle more than one DNS query at the same time without interference.
- **Non-Blocking**: No need to call a processing function in your main loop; the library handles the heavy lifting in the background.
- **Captive Portal Ready**: Easily redirect all DNS queries to a specific IP address (e.g., the Pico W's own Access Point IP).
- **Configurable Parameters**: Adjust the Time-to-Live (TTL) for domain names and customize error reply codes (e.g., returning `ServerFailure` instead of `NonExistentDomain`).
- **Debug Support**: Built-in logging levels (0-4) to help troubleshoot network traffic via the Serial port.

### Technical Foundation

This library is a port and modification of the well-known `ESPAsyncDNSServer` and `AsyncDNSServer_STM32` libraries. It relies on the `AsyncUDP_RP2040W` library and is designed to work with Earle Philhower's `arduino-pico` core. Under the hood, it leverages the lwIP stack integrated into the Pico W's WiFi framework to manage asynchronous UDP traffic.

### Getting Started

Setting up the server is straightforward. You define the DNS port (usually 53) and start the server with a specific domain filter (or "*" for all domains).

```cpp
#include <AsyncDNSServer_RP2040W.h>

const byte DNS_PORT = 53;
AsyncDNSServer dnsServer;

void setup() {
  // ... WiFi Setup ...
  
  // Optional: modify TTL (in seconds)
  dnsServer.setTTL(300);
  
  // Start DNS server redirecting all requests to the local IP
  dnsServer.start(DNS_PORT, "*", WiFi.softAPIP());
}

void loop() {
  // No need to call dnsServer.process() here!
}
```

### Handling Linker Errors

A unique aspect of this library (and many others by Khoi Hoang) is its implementation using header-only templates and implementation files. To avoid `Multiple Definitions` linker errors in multi-file projects, the library provides two distinct include files:

1.  `AsyncDNSServer_RP2040W.hpp`: Can be included in multiple files across your project.
2.  `AsyncDNSServer_RP2040W.h`: Should be included in **exactly one** file (usually your main `.ino` or a specific `.cpp` file) to instantiate the implementation.

### Hardware Support

The library is specifically optimized for the **Raspberry Pi Pico W** using the CYW43439 WiFi chip. It requires the `arduino-pico` core version 2.6.3 or higher and the `AsyncUDP_RP2040W` library to function correctly. Whether you are building a WiFi setup manager or a standalone localized information kiosk, this library provides the networking performance needed for modern embedded applications.
