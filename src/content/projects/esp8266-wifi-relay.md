---
title: ESP8266 WiFi Relay
summary: A simple ESP8266-based firmware for controlling up to 8 relays via a web
  interface. It utilizes the Arduino framework, SPIFFS for web asset storage, and
  ArduinoJson for data handling, providing both a mobile-friendly UI and a RESTful
  API.
slug: esp8266-wifi-relay
codeUrl: https://github.com/Jorgen-VikingGod/ESP8266-WiFi-Relay
star: 20
lastUpdated: '2017-11-23'
rtos: ''
libraries:
- spiffs
topics:
- arduino
- bootstrap3
- esp8266
- esp8266-arduino
- esp8266-webserver
- iot
- javascript
- jquery
- json
- relay
- relays
- spiffs
- webserver
- wifi
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- esp8266-wifi-relay-async
- esp8266-wifi-relay-and-bahtinov-masks-controller
- esp8266-web-server-and-spiffs-integration
- sonoff-http-firmware
- espui
- esp8266-mywidget
---

## Overview

The ESP8266 WiFi Relay project is a streamlined firmware solution designed to turn an ESP8266 module into a network-controlled relay controller. By leveraging the `ESP8266WebServer` library, the project serves a responsive web interface that allows users to toggle up to eight GPIO-connected relays from any browser on a mobile or desktop device.

Beyond simple manual control, the project implements a JSON-based communication layer, making it suitable for integration into larger home automation ecosystems via simple HTTP GET and POST requests.

## Key Features

- **Responsive Web Interface**: Built with Bootstrap and jQuery, the hosted website provides a clean, modern UI with toggle buttons for each relay.
- **JSON API**: All relay states are encoded as JSON objects, allowing for programmatic control and status monitoring.
- **Persistent Settings**: Relay states are stored in EEPROM, ensuring that the device restores its last known state after a power cycle.
- **Dynamic Configuration**: A `config.json` file stored in the SPIFFS (Serial Peripheral Interface Flash File System) manages WiFi credentials, hostnames, and relay pin assignments.
- **Network Discovery**: Support for mDNS allows users to access the device via a friendly URL (e.g., `http://wifi-relay.local`) rather than tracking IP addresses.
- **Over-the-Air Updates**: Integration with ArduinoOTA enables wireless firmware updates, simplifying maintenance once the hardware is deployed.

## Technical Implementation

The project is structured into a main Arduino sketch and modular header files. The `webserver.h` file manages the routing for the web server, handling everything from static file delivery (HTML, CSS, JS) to API endpoints like `/toggle` and `/status`. 

The system utilizes a custom `sRelay` structure defined in `helper.h` to track pin assignments, relay types (active high/low), and current states. This modularity allows the firmware to be easily adapted for different relay hardware configurations.

### Web Server Endpoints

The firmware provides several useful endpoints for integration:
- `GET /all`: Returns the status of all relays in a single JSON object.
- `GET /relay?id=X&value=Y`: Directly sets the state of a specific relay via a GET request.
- `POST /toggle`: Accepts a JSON payload to switch relay states.
- `GET /settings/status`: Provides system-level information including heap memory, chip ID, and WiFi signal strength.

## Hardware Requirements

The firmware is designed for ESP8266 development boards with at least 32Mbit (4MB) of Flash memory, such as the WeMos D1 Mini or NodeMCU. It is specifically configured to interface with standard 8-channel relay modules, though the pin mapping can be adjusted in the source code or the configuration file.

## Getting Started

To deploy the project, developers need the Arduino IDE with the ESP8266 Core installed. A critical step in the setup process is using the ESP8266FS Uploader tool to flash the contents of the `data` folder to the chip's SPIFFS partition. This folder contains the web assets (HTML, CSS, and JavaScript) and the initial `config.json`. Once flashed, the device will attempt to connect to the configured WiFi network or fall back to hardcoded credentials if the configuration file is missing.
