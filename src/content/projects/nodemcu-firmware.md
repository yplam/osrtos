---
title: NodeMCU Firmware
summary: An open-source Lua-based firmware for ESP8266 and ESP32 WiFi SoCs. It features
  an asynchronous, event-driven programming model and includes over 70 built-in modules
  for hardware interaction, networking, and file system management.
slug: nodemcu-firmware
codeUrl: https://github.com/nodemcu/nodemcu-firmware
siteUrl: https://nodemcu.readthedocs.io
star: 7864
version: 3.0.0-release_20240225
lastUpdated: '2025-08-28'
rtos: ''
libraries:
- spiffs
- u8g2
- ucglib
- lwip
topics:
- esp32
- esp8266
- esp8285
- espressif
- firmware
- lua
- nodemcu
- spiffs
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- nodemcu-device-lua-modules
- lunokiotwatch-firmware-for-lilygo-twatch-2020
- iot-framework-for-nodemcu
- mongoose-os-configurable-sensor-node
- micropython-for-esp32-with-psram-support-lobo-port
- lua-rtos-for-esp32
---

## Overview

NodeMCU is an open-source firmware project that provides a powerful Lua scripting environment for the Espressif ESP8266 and ESP32 WiFi SoCs. Originally developed as a companion to the NodeMCU development modules, the firmware has evolved into a community-supported platform that can run on any ESP-based module. It is implemented in C and layered on top of the Espressif NON-OS SDK for ESP8266 and the ESP-IDF (which utilizes FreeRTOS) for ESP32.

The project is designed to simplify the development of IoT applications by abstracting complex hardware interactions into high-level Lua scripts. This allows developers to prototype and deploy wireless nodes or access points with significantly less boilerplate code than traditional C-based SDKs.

## The Programming Model

The core of NodeMCU is its asynchronous, event-driven programming model, which bears a strong resemblance to Node.js. Instead of a traditional linear execution flow, NodeMCU relies on callbacks and events. This is particularly well-suited for networking tasks where waiting for a response would otherwise block the CPU. 

For example, setting up an HTTP server or connecting to a WiFi access point is handled through simple function calls with associated callback handlers:

```lua
-- a simple HTTP server
srv = net.createServer(net.TCP)
srv:listen(80, function(conn)
	conn:on("receive", function(sck, payload)
		print(payload)
		sck:send("<h1> Hello, NodeMCU.</h1>")
	end)
	conn:on("sent", function(sck) sck:close() end)
end)

-- connect to WiFi access point
wifi.setmode(wifi.STATION)
wifi.sta.config{ssid="SSID", pwd="password"}
```

## Key Features and Capabilities

### Lua Flash Store (LFS)
One of the most significant advancements in NodeMCU is the Lua Flash Store (LFS). Introduced to overcome RAM limitations, LFS allows Lua code and constant data to be executed directly from flash memory. This enables developers to create substantial applications—up to 256KB of Lua code—while keeping the limited RAM available for read-write data. 

### Extensive Module Ecosystem
NodeMCU is highly modular. It includes more than 70 built-in C modules and nearly 20 Lua modules covering a wide range of functionality:
- **Hardware Interfacing**: ADC, GPIO, I2C, PWM, SPI, UART, and 1-Wire.
- **Sensors**: Support for BME280, DHT, HMC5883L, and many others.
- **Networking**: MQTT, CoAP, HTTP, TLS/SSL, and WebSockets.
- **Display**: Integration with u8g2 and Ucglib for various OLED and LCD screens.
- **Storage**: Uses the SPIFFS file system for on-module flash storage.

### Flexible Build System
Because the firmware has grown so large, pre-built binaries are no longer provided. Instead, users are encouraged to use the custom firmware build service or build their own using the provided Docker images or a Linux environment. This ensures that only the necessary modules are included, saving precious flash space.

## Technical Architecture

The firmware is primarily written in C and integrates the Lua 5.1.4 or 5.3 interpreter. It leverages the SPIFFS (SPI Flash File System) to provide a flat file system on the SoC's flash chip, allowing users to upload and run multiple `.lua` files. The networking stack is powered by lwIP, ensuring robust TCP/IP performance. For security, the firmware supports TLS/SSL, enabling secure communication with cloud services.

## Getting Started

To begin using NodeMCU, developers typically follow a three-step process:
1.  **Build**: Select the required modules and build the firmware (often via the cloud build service).
2.  **Flash**: Use tools like `esptool.py` to flash the resulting binary to the ESP8266 or ESP32.
3.  **Upload**: Use an IDE (like ESPlorer) or a CLI tool to upload Lua scripts to the device's file system.

The project maintains comprehensive documentation at Read the Docs, covering everything from initial setup and flashing to detailed API references for every supported module.
