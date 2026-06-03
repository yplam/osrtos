---
title: ESP32 GPS Gateway with RTK/NTRIP Support
summary: A MicroPython-based gateway for ESP32 devices that interfaces with serial
  GPS modules to provide RTK and NTRIP services. It supports Bluetooth LE, ESPNow
  proxying, and multiple NTRIP modes including Client, Server, and Caster for high-precision
  positioning.
slug: esp32-gps-gateway-with-rtk-ntrip-support
codeUrl: https://github.com/mrichar1/esp32-gps
star: 14
lastUpdated: '2025-10-05'
rtos: freertos
libraries:
- micropython
topics:
- esp32
- gps
- lc29h
- micropython
- nmea
- rtcm
- rtk
isShow: false
createdAt: '2026-01-25'
updatedAt: '2026-01-25'
relatedProjects:
- esp32-ble-uart-mx
- micropygps
- esp32-uart-bridge
- esp32-sdr-gps-receiver
- esp32-portapack-esp32pp
- micropython-for-esp32-with-psram-support-lobo-port
---

## Overview

The ESP32 GPS project is a versatile MicroPython-based firmware designed to transform an ESP32 microcontroller into a sophisticated gateway for serial GPS modules. It specifically targets high-precision positioning applications by providing robust support for Real-Time Kinematic (RTK) corrections and Networked Transport of RTCM via Internet Protocol (NTRIP) services. 

Tested extensively with ESP32-S3 and C3 Supermini devices alongside Quectel LC29H series GPS modules, this project bridges the gap between raw serial GPS data and modern networking protocols. Whether you are building a stationary base station or a mobile rover, this gateway provides the necessary logic to handle data passthrough, sentence rewriting, and wireless distribution.

## Key Features and Capabilities

The project is packed with features that cater to both standard GPS logging and advanced RTK setups:

- **Comprehensive NTRIP Support**: The firmware can operate as an NTRIP Client (fetching corrections for a Rover), an NTRIP Server (pushing base station data to a Caster), or even a standalone NTRIP Caster (distributing data to multiple clients).
- **Flexible Connectivity**: Beyond standard USB serial passthrough, it supports Bluetooth LE (BLE) for wireless NMEA streaming to mobile apps like SW Maps and ESPNow for low-latency proxying between ESP32 devices in areas without Wi-Fi.
- **On-the-fly NMEA Processing**: It includes logic to rewrite NMEA sentences dynamically, such as converting proprietary Quectel PQTMEPE messages into standard GPGST accuracy sentences, ensuring compatibility with a wider range of GIS software.
- **Remote Management**: A built-in remote shell allows users to send GPS commands, update configurations, and reset the device over the network without needing a physical serial connection.

## Technical Implementation

Built on MicroPython, the project leverages the ESP32's dual-mode wireless capabilities and multiple UART interfaces. The architecture is highly modular, allowing different services (NTRIP, BLE, ESPNow) to run in parallel, provided the hardware has sufficient RAM. 

One of the more unique aspects of the project is its handling of GPS hardware. It includes dedicated logic for GPS resets via GPIO pins and a sequence-based setup command system. This allows the ESP32 to initialize the GPS module with specific proprietary commands (like setting baud rates or enabling specific RTCM messages) before the main data loop begins.

## Hardware and Wiring

The project is optimized for compact ESP32 modules. A typical setup with a C3 Supermini involves connecting the GPS module's UART pins to the ESP32's GPIOs (defaulting to Pins 0 and 1). Because the system supports high-precision modules like the Quectel LC29H, it also accounts for hardware-level resets, which are often required after saving internal GPS parameters.

## Getting Started

To deploy the gateway, users flash standard MicroPython firmware to their ESP32 and upload the source files. Configuration is handled via a `config.py` file, which defines the operational mode (Client, Server, or Caster) and connection credentials. 

For example, setting up an NTRIP Client to receive corrections is as simple as defining the caster address and mountpoint:

```python
NTRIP_MODE = "client"
NTRIP_CASTER = "rtk2go.com"
NTRIP_PORT = 2101
NTRIP_MOUNT = "YOUR_MOUNTPOINT"
NTRIP_CLIENT_CREDENTIALS = "username:password"
```

## Use Cases

1. **RTK Base Station**: Using an RTK-enabled GPS module, the ESP32 acts as an NTRIP Server, uploading RTCM corrections to a public caster like RTK2GO or a private local caster.
2. **Wireless Rover**: The ESP32 acts as an NTRIP Client, receiving corrections over Wi-Fi and passing them to the GPS module via UART, while simultaneously serving the corrected position to a tablet via Bluetooth LE.
3. **Long-Range Proxy**: In environments without Wi-Fi, two ESP32s can use ESPNow to bridge GPS data across distances, allowing a base station to send corrections to a rover directly.
