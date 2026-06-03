---
title: ESP8266 WiFi Relay Async
summary: An asynchronous web server application for the ESP8266 platform designed
  to control multiple relay modules via a web interface. It utilizes the ESPAsyncWebServer
  library for non-blocking communication and includes features like MDNS support,
  ArduinoOTA updates, and SPIFFS-based configuration.
slug: esp8266-wifi-relay-async
codeUrl: https://github.com/Jorgen-VikingGod/ESP8266-WiFi-Relay-Async
star: 15
lastUpdated: '2018-03-21'
rtos: ''
libraries:
- spiffs
topics:
- asynchronous
- bootstrap
- esp8266
- esp8266-arduino
- javascript
- jquery
- json
- relay
- spiffs
- webserver
- wifi
- wifimanager
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- esp8266-wifi-relay
- esp8266-wifi-relay-and-bahtinov-masks-controller
- esp-async-http-update-server
- esp8266-mywidget
- blynk-async-wm
- esp32-async-web-server-with-spiffs-and-ota
---

The ESP8266-WiFi-Relay-Async project provides a robust, asynchronous solution for controlling hardware relays over a WiFi network. Built specifically for the ESP8266 microcontroller, this project leverages the power of non-blocking web services to ensure the device remains responsive even during heavy network traffic or complex state changes.

### Core Functionality
At its heart, the project serves a mobile-responsive web interface built with Bootstrap and jQuery. This interface allows users to toggle up to four relays connected to the ESP8266's GPIO pins. Unlike traditional synchronous web servers that block execution while waiting for a client response, this implementation uses the `ESPAsyncWebServer` library. This allows the ESP8266 to handle multiple concurrent connections and background tasks—such as MDNS responder updates and OTA (Over-the-Air) firmware processing—without interrupting the main control loop.

### Technical Architecture
The system is designed with reliability and ease of use in mind. It utilizes several key components:
- **Asynchronous Communication**: By using `ESPAsyncTCP` and `ESPAsyncWebServer`, the project avoids the common pitfalls of the standard `ESP8266WebServer`, such as watchdog timeouts during long-running requests.
- **State Persistence**: Relay states are stored in EEPROM. This ensures that if the device loses power, it can restore the relays to their previous positions upon rebooting.
- **Configuration Management**: The project uses a `config.json` file stored in the SPIFFS (Serial Peripheral Interface Flash File System). This file contains WiFi credentials, hostname settings, and relay pin assignments.
- **Dynamic Web UI**: The frontend uses AJAX calls to interact with the backend JSON API, providing a seamless user experience without requiring full page reloads.

### Hardware Requirements
The project is compatible with most ESP8266 development boards, including the WeMos D1 Mini and NodeMCU. It requires at least 4MB (32Mbit) of Flash memory to accommodate the SPIFFS partition where the web files (HTML, CSS, JS) are stored. A standard 4-channel relay module is typically used for the power switching side.

### Networking and Setup
One of the standout features is the initial configuration process. If the device cannot connect to a known WiFi network, it automatically falls back to Access Point (AP) mode. Users can connect to the "wifi-relay" hotspot and access a configuration page to scan for local networks and save credentials. Once configured, the device supports MDNS, allowing users to access the control panel via a friendly URL like `http://wifi-relay.local` instead of a static IP address.

### API and Integration
For developers looking to integrate the relay controller into larger home automation systems, the project exposes a simple JSON API. Relay states can be queried or modified using standard HTTP GET and POST requests:
- `GET /all`: Returns the status of all relays in a JSON object.
- `GET /relay1?value=1`: Turns on the first relay.
- `POST /relay1`: Accepts a value parameter to set the state.

This makes it compatible with external tools like Home Assistant, Node-RED, or custom mobile applications. The use of `ArduinoJson` ensures that all data exchanged between the client and the ESP8266 is structured and easy to parse.
