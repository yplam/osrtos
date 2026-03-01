---
title: ESP32 Balboa Spa Controller
summary: A multi-mode firmware for ESP32 microcontrollers designed to interface with
  Balboa Spa controllers via RS485. It provides WiFi connectivity, historical data
  tracking for temperature and heater usage, and supports multiple interfaces including
  Web, MQTT, and ePaper displays.
slug: esp32-balboa-spa-controller
codeUrl: https://github.com/NorthernMan54/esp32_balboa_spa
star: 26
lastUpdated: '2024-10-24'
rtos: freertos
libraries:
- littlefs
- lwip
topics:
- balboa
- eink
- epaper
- spa
isShow: true
image: /202602/balboa_spa.webp
createdAt: '2026-03-01'
updatedAt: '2026-03-01'
---

## Overview

The ESP32 Balboa Spa project is a comprehensive firmware solution designed to bring modern WiFi connectivity and smart home integration to Balboa Spa systems. By leveraging an ESP32 module and an RS485 transceiver, this project allows users to monitor and control their hot tubs through a variety of interfaces, including a web dashboard, MQTT, and dedicated hardware displays.

The project is built on the Arduino framework for ESP32 and utilizes a multi-mode architecture. This allows the same codebase to serve as either a local controller physically connected to the spa or a remote client that fetches data over the network to drive a secondary display, such as an ePaper module located inside the home.

## Key Features

- **Multi-Mode Operation**: Supports `LOCAL_CLIENT` mode for direct RS485 communication with the spa controller and `REMOTE_CLIENT` mode for TCP/WiFi-based remote monitoring.
- **Advanced Data Tracking**: Includes built-in logic for tracking hot tub temperature over a 24-hour period and maintaining a 24-day history of heater and filter runtimes.
- **Flexible User Interfaces**: Features an integrated web server for browser-based control and support for the LilyGo T5 4.7-inch ePaper display for low-power, high-visibility status monitoring.
- **Smart Home Integration**: Provides a bridge mode that enables discovery via the Balboa protocol and compatibility with Homebridge via the `homebridge-plugin-bwaspa` plugin.
- **Efficient Data Management**: Implements caching of hot tub configurations to reduce the frequency of calls to the spa controller, improving overall system responsiveness.

## Technical Implementation

The firmware is developed using PlatformIO and targets the ESP32 platform. It utilizes several key libraries to manage its diverse feature set:
- **Networking**: Uses `ESPAsyncWebServer` for the web interface and `PubSubClient` for MQTT communication.
- **Storage**: Employs `LittleFS` for persistent storage of configuration and historical tracking data.
- **Hardware Interfacing**: Communicates with the Balboa system using a TTL-to-RS485 adapter connected to the ESP32's UART pins.
- **Logging**: Supports remote debugging via a Telnet stream, allowing developers to monitor the system without a physical serial connection.

## Hardware Requirements

To deploy this project, users typically need:
- An **ESP32 development board** (e.g., Wemos D1 Mini ESP32).
- An **RS485 bus transceiver** (3.3V compatible) to interface with the spa's A and B data lines.
- A **DC-DC converter** (such as an LM2596) to step down the spa's internal power supply to the 3.3V required by the ESP32.
- (Optional) A **LilyGo T5 ePaper Display** for a dedicated remote monitoring station.

## Operational Modes

The project defines several compiler flags to tailor the build for specific hardware roles:
- `LOCAL_CONNECT`: Enables discovery of the ESP32 module via the standard Balboa discovery protocol.
- `BRIDGE`: Enables a local TCP server that allows external applications to treat the ESP32 as a standard Balboa WiFi module.
- `spaEpaper`: Configures the build specifically for the LilyGo T5 hardware, enabling the ePaper driver and UI logic.

By modernizing the control interface of older Balboa BP series controllers, this project provides a robust, open-source alternative to proprietary WiFi modules, offering deeper data insights and better integration with the broader IoT ecosystem.
