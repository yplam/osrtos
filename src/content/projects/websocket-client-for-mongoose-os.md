---
title: WebSocket Client for Mongoose OS
summary: A WiFi-enabled WebSocket client application skeleton for Mongoose OS. It
  provides a base for developing embedded applications that require WebSocket communication
  and RPC services over WiFi.
slug: websocket-client-for-mongoose-os
codeUrl: https://github.com/Podnet/websocket-mgos-test
star: 0
lastUpdated: '2020-05-28'
rtos: mongoose-os
topics:
- c
- esp32
- mongoose-os
- mongoose-os-app
- websocket
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- mongoose-os-app-skeleton
- uart-out-test-app
- losant-mqtt-mongoose-os-example
- empty-mongoose-os-app
- mongoose-os-app-on-stm32f446re
- websocket-implementation-for-raspberry-pi-pico-w
---

Mongoose OS is a popular framework for developing IoT firmware on microcontrollers like the ESP32 and ESP8266. This project serves as a practical implementation of a WebSocket client within the Mongoose OS ecosystem, providing a foundational skeleton for developers looking to integrate real-time, bidirectional communication into their embedded devices.

The project is structured around the standard Mongoose OS build system, utilizing the `mos.yml` configuration file to manage dependencies and system settings. By leveraging the built-in Mongoose OS libraries, the application handles complex tasks such as WiFi station management, SSL/TLS certificate handling via the CA bundle, and RPC (Remote Procedure Call) services.

## Core Functionality

The primary focus of this application is establishing a WebSocket connection over a WiFi network. The configuration schema defined in the project allows for easy setup of WiFi credentials and debug levels. Key libraries included in the build include:

- **rpc-ws**: Enables RPC over WebSockets, allowing for remote management and data exchange.
- **wifi**: Manages the connection to wireless access points.
- **ca-bundle**: Provides the necessary root certificates for secure communication.
- **http-server**: Allows the device to host a local web interface if needed.

## Technical Architecture

The application is written in C and utilizes the Mongoose OS event manager to handle network events asynchronously. This ensures that the device remains responsive while waiting for network packets or processing WebSocket frames. The architecture follows the Mongoose OS philosophy of modularity, where functionality is added via libraries (libs) defined in the manifest.

The `mos.yml` file reveals a structured approach to configuration, where system parameters like `wifi.sta.ssid` and `wifi.sta.pass` are defined as part of the configuration schema. This allows developers to change settings without modifying the source code, often through the `mos` tool's command-line interface or a configuration file.

## Getting Started

To use this project, developers typically use the `mos` tool to build and flash the firmware to a supported board. The project includes a variety of RPC services (UART, Config, Common) which facilitate debugging and runtime configuration. Because it is designed as a skeleton, it provides a clean slate for adding custom application logic in the `src` directory while the underlying framework handles the heavy lifting of the network stack and OS primitives.

This repository is particularly useful for developers who need a reference implementation for WebSocket-based IoT projects, ensuring a secure and robust connection to backend services or other networked devices.
