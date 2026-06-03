---
title: MQTT Message Display for SSD1306
summary: A Mongoose OS application designed to display MQTT messages on an SSD1306
  OLED screen. It features configurable text sizes, JSON payload support, and is optimized
  for ESP8266-based hardware in IoT dashboard or timer applications.
slug: mqtt-message-display-for-ssd1306
codeUrl: https://github.com/popstas/mongoose-mqtt-ssd1306
star: 0
lastUpdated: '2020-12-03'
rtos: mongoose-os
topics:
- esp8266
- mongoose-os
- mqtt
- pomodoro
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- electricitydisplay-mqtt-remote-control-for-esp8266-esp32
- coffee-bin-mqtt
- losant-mqtt-example-for-mongoose-os
- losant-mqtt-mongoose-os-example
- leilei-mongoose-os-sensing-device
- mongoose-os-mlx90614-ir-temperature-monitor
---

The `mongoose-mqtt-ssd1306` project is a specialized firmware implementation for ESP8266 microcontrollers, designed to bridge MQTT network messages with physical OLED displays. Built on the Mongoose OS framework, it provides a streamlined way to visualize data from home automation systems or external controllers like Node-Red, specifically tailored for use cases like Pomodoro timers.

## Core Functionality

The application subscribes to specific MQTT topics and renders the received payload onto an SSD1306-based OLED display. It supports two primary modes of operation for data ingestion:

- **Plain Text**: Sending a simple string to the configured topic (default `status/tablo`) displays up to 5 characters, ideal for short status codes or countdowns.
- **JSON Payloads**: For more complex layouts, the project accepts JSON objects via `status/tablo/json`. This allows users to specify multiple lines of text and control the font size dynamically using a structure like `{"msg":"line 1\nline 2","msgSize":2}`.

## Technical Architecture

The project leverages the modular nature of Mongoose OS. By utilizing the `arduino-adafruit-ssd1306` library and the built-in I2C support, it handles the low-level display driving while the MQTT library manages the network communication. The project is primarily configured via a `mos.yml` file, which defines the hardware abstraction layer and software dependencies.

Key configuration parameters include:
- **I2C Pin Assignments**: Defaulting to GPIO 4 (SDA) and GPIO 5 (SCL), compatible with Wemos D1 Mini pinouts.
- **MQTT Connectivity**: Robust reconnection logic with configurable timeouts.
- **Font Scaling**: A mapping system that translates `msgSize` values into specific line counts (ranging from 1 large line to 8 small lines).

## Hardware Integration

Targeting the ESP8266 platform, the wiring is minimal. The SSD1306 display connects via the I2C bus. The project is designed to be flashed and configured using the `mos` tool, which allows for seamless WiFi and MQTT credential setup without modifying the source code directly. This makes it highly portable across different ESP8266 development boards.

## Use Cases

While originally developed as a Pomodoro timer display for Node-Red, the project's flexible JSON interface makes it suitable for various IoT applications, such as:
- Real-time sensor data monitoring
- Notification tickers for smart home events
- Network status displays
- Simple desktop clocks or weather stations

The integration with Mongoose OS ensures that features like OTA (Over-the-Air) updates and RPC-based configuration are available, making it a production-ready starting point for small display-based IoT nodes.
