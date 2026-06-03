---
title: MEL-AC Demo App
summary: A demonstration application for Mongoose OS that provides remote control
  for Mitsubishi Electric Air Conditioning and Heat Pump units. It utilizes the MEL-AC
  library to interface with HVAC hardware via UART and exposes control parameters
  through RPC over HTTP, WebSockets, and MQTT.
slug: mel-ac-demo-app
codeUrl: https://github.com/mongoose-os-apps/mel-ac-demo
star: 2
lastUpdated: '2020-11-07'
rtos: mongoose-os
topics:
- mitsubishi
- mongoose-os
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- mel-ac-library-for-mongoose-os
- electricitydisplay-mqtt-remote-control-for-esp8266-esp32
- mitsubishi-ecodan-air-to-water-bridge-for-cn105-to-mqtt
- ac-control
- losant-mqtt-mongoose-os-example
- losant-mqtt-example-for-mongoose-os
---

## Overview

The MEL-AC Demo App is a specialized firmware implementation designed to bridge Mitsubishi Electric Air Conditioning (AC) and Heat Pump units with modern IoT protocols. Built on the Mongoose OS framework, this project demonstrates how to use the `mel-ac` library to communicate with HVAC systems through their internal serial interfaces. 

By leveraging the Remote Procedure Call (RPC) capabilities of Mongoose OS, the application allows users to monitor and control their climate control systems via standard web technologies like HTTP and WebSockets, as well as industrial IoT protocols like MQTT.

## Key Features

- **HVAC Integration**: Direct communication with Mitsubishi Electric units using the dedicated MEL-AC library.
- **Multi-Protocol RPC**: Support for controlling the unit via WebSockets, HTTP, and MQTT.
- **Real-time Monitoring**: Retrieve current parameters such as room temperature, operating mode, setpoint, fan speed, and vane positions.
- **Remote Control**: Update HVAC settings including power state, mode (heat/cool/dry/etc.), and fan configurations remotely.
- **Cross-Platform Support**: Pre-configured for popular embedded hardware including ESP8266 and ESP32.

## Technical Implementation

The project is structured around the Mongoose OS `mos.yml` configuration file, which manages dependencies and hardware-specific settings. The application interfaces with the HVAC unit via a UART connection. Users can configure the specific UART port and baud rate (typically 2400 baud for these units) directly in the configuration schema.

The core logic relies on the `mel-ac` library to handle the proprietary communication protocol used by Mitsubishi Electric. Once the connection is established, the application registers RPC handlers that map network requests to HVAC commands.

## Interacting with the HVAC

One of the most powerful aspects of this demo is the ease of interaction. Because it uses the Mongoose OS RPC mechanism, you can query or command the AC unit using simple JSON payloads.

### Reading Parameters

You can retrieve the current state of the HVAC unit using a WebSocket call via the `mos` tool or a simple HTTP GET request. The system returns a JSON object containing the connection status, power state, current mode, setpoint, and even the ambient room temperature.

```javascript
// Example response from MEL-AC.GetParams
{
  "connected": true,
  "power": 0,
  "mode": 3,
  "setpoint": 21.0,
  "fan": 3,
  "vane_vert": 0,
  "vane_horiz": 3,
  "isee": true,
  "operating": false,
  "room": 25.0
}
```

### Setting Parameters

Changing settings is equally straightforward. By sending a POST request or a WebSocket command to `MEL-AC.SetParams`, you can adjust the operation of the unit in real-time:

```javascript
// Example command to set mode and fan speed
$ mos call --port ws://<device_ip>/rpc MEL-AC.SetParams '{"mode":1,"fan":2,"setpoint":20}'
```

## Hardware and Setup

The application is designed to run on ESP8266 or ESP32 microcontrollers. The `mos.yml` file includes conditional configurations for these platforms, defining default GPIO pins for status LEDs and buttons. To deploy the project, users simply need to configure their WiFi credentials and the appropriate UART number in the configuration file before building and flashing the firmware using the Mongoose OS toolchain.
