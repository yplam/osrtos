---
title: ESP8266-MyWidget
summary: A comprehensive framework and template for ESP8266 development featuring
  an asynchronous web server, MQTT support, and a dynamic web interface. It utilizes
  the LittleFS file system and supports OTA updates, mDNS, and multiple ISR-based
  timers for hardware control.
slug: esp8266-mywidget
codeUrl: https://github.com/onewithhammer/ESP8266-MyWidget-Demo
star: 20
version: v1.1.3
lastUpdated: '2021-03-05'
rtos: ''
libraries:
- littlefs
topics:
- async-get
- async-post
- asyncmqtt
- asyncwebserver
- embedded-bootstrap
- embedded-jquery
- esp8266
- esp8266-project-template
- interrupt-handler
- interrupts
- jquery
- littlefs
- mqtt
- ota
- pangolinmqtt
- timer1
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- esp-async-http-update-server
- esp8266starter
- esp32-async-web-server-with-spiffs-and-ota
- esp8266-wifi-relay-async
- iot-framework-for-nodemcu
- esp-fs-webserver
---

## Overview

ESP8266-MyWidget is a robust development framework and project template designed for the ESP8266 platform. It serves as both a learning tool for developers and a starting point for building sophisticated IoT devices with interactive web interfaces. The project integrates several advanced asynchronous libraries to ensure high performance and responsiveness, avoiding the blocking patterns often found in simpler ESP8266 examples.

## Key Features and Capabilities

The framework is packed with features essential for modern IoT development:

- **Asynchronous Networking**: Utilizing `ESPAsyncWebServer` and `PangolinMQTT`, the system handles web requests and MQTT messaging without stalling the main loop.
- **Dynamic Web Interface**: A built-in web server hosts a responsive UI built with Bootstrap 3.4.1 and jQuery 3.5.1. The interface supports real-time updates via WebSockets and asynchronous web services.
- **Advanced Timing**: The project implements `ESP8266TimerInterrupt`, allowing for up to 16 ISR-based timers. This is used to manage hardware tasks like flashing the onboard LED at precise intervals.
- **File System Integration**: It uses LittleFS for reliable on-flash storage of configuration files (cfg.txt), web assets (HTML, CSS, JS), and images.
- **Ease of Access**: With mDNS support, users can access the device via `http://mywidget.local` rather than tracking dynamic IP addresses.
- **Remote Management**: Full support for Over-the-Air (OTA) updates allows for firmware maintenance without a physical USB connection.

## Technical Implementation

The project is built on the Arduino core for ESP8266. It demonstrates a clean separation between the hardware control logic and the communication layers. The web interface communicates with the backend using a custom text-based command protocol (e.g., `cmd:get:uptime`), which provides a lightweight alternative to heavy JSON processing for simple status updates.

### Web Services and API

The framework provides a comprehensive HTTP API supporting both GET and POST requests. Developers can query system health, heap status, and interrupt counters in both plain text and JSON formats. This makes it easy to integrate the device with external dashboards or mobile apps.

### MQTT Integration

MQTT support is implemented via the PangolinMQTT library. The project follows a request-response pattern over MQTT topics, allowing remote systems to subscribe to uptime, heap, and counter data. This makes the template ready for integration into home automation ecosystems like Home Assistant or Node-RED.

## Hardware Support

While designed for any ESP8266-based development board, the project was specifically tested and developed using the Wemos D1 Mini. It utilizes the onboard LED for visual feedback via interrupt-driven timers, demonstrating how to handle hardware peripherals without interfering with WiFi stability.

## Getting Started

To use this template, developers need the Arduino IDE configured with the ESP8266 core and the LittleFS filesystem uploader plugin. The project requires several external libraries, including `ESPAsyncTCP`, `ESPAsyncWebServer`, `PangolinMQTT`, and `ESP8266TimerInterrupt`. Once the libraries are installed, the 'data' directory must be uploaded to the ESP8266 flash memory using the LittleFS uploader tool to enable the web interface functionality.
