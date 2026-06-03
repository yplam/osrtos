---
title: ESPChat
summary: A captive portal chat application for the ESP32 microcontroller that stores
  messages on the device's internal flash. It functions as a standalone WiFi access
  point, serving a web interface to connected clients for local communication without
  requiring an internet connection.
slug: espchat
codeUrl: https://github.com/XTR1984/ESPChat
star: 1
lastUpdated: '2023-07-16'
rtos: freertos
libraries:
- littlefs
topics:
- arduino
- chat
- esp32
- littlefs
- wifi
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- esp8266-webserver-chat
- wifi-manager-for-micropython
- esp32-wi-fi-provision-care
- autonetwork-library
- esp32-mesh-control
- vortex-cannon-esp32-access-point-controller
---

## Overview

ESPChat is a lightweight, self-contained communication tool designed for the ESP32 platform. It transforms a standard ESP32 development kit into a localized chat server. By leveraging the controller's built-in WiFi capabilities, the project creates an Access Point (AP) that users can connect to using their smartphones or laptops. 

One of the standout features of ESPChat is its implementation as a captive portal. When a user connects to the ESP32's WiFi network, the device automatically redirects the user's browser to the chat interface, eliminating the need for users to remember or manually type an IP address. This makes it an ideal educational project for exploring web servers, DNS redirection, and local file systems on embedded hardware.

## Technical Implementation

The project is built using the Arduino framework for ESP32 and utilizes several core components to manage networking and data:

- **WiFi Access Point**: The ESP32 acts as a host, creating a private network with a configurable SSID and password.
- **DNS Server**: A DNS server is started to intercept all web requests and redirect them to the ESP32's local IP (192.168.4.1), facilitating the captive portal behavior.
- **Web Server**: An asynchronous-style web server handles static file delivery (HTML and jQuery) and dynamic API endpoints for sending and receiving messages.
- **LittleFS Storage**: Unlike many simple web server examples that store data in RAM, ESPChat uses the LittleFS file system to persist chat messages directly on the controller's flash memory. Each message is stored as an individual file within a dedicated directory.

## System Stability and Performance

To ensure the device remains responsive during long-term operation, the project integrates the ESP32's hardware watchdog timer (WDT). The code is configured with a 120-second timeout, and the main loop periodically resets the timer to prevent system hangs. 

Messages are handled via JSON-based API calls. When a user sends a message, the server assigns it a unique ID, appends it to the flash storage, and serves it back to clients during polling. The project currently implements a basic caching mechanism to manage message IDs and provides a hidden endpoint to clear the chat history from the flash memory.

## Getting Started

Deploying ESPChat requires an ESP32 development board and the Arduino IDE. The project relies on the `arduino-esp32fs-plugin` to upload the web assets (located in the `data` folder) to the controller's flash. 

```cpp
// Example of the server routing logic used in ESPChat
server.serveStatic("/chat.html", LittleFS, "/chat.html");
server.on("/get_msgs", handle_getmsgs);
server.on("/add_msg", HTTP_POST, handle_addmsg);
server.onNotFound(handleRoot);
```

Once the sketch and the data files are uploaded, the ESP32 will begin broadcasting its SSID. Any device connecting to this network will be prompted to sign in, immediately opening the chat interface. While the project is currently categorized as an educational tool, it demonstrates the potential for creating decentralized, off-grid communication nodes using inexpensive embedded hardware.
