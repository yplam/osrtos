---
title: MEL-AC Library for Mongoose OS
summary: A Mongoose OS library for controlling Mitsubishi Electric Air Conditioning
  (AC) and Air-to-Water (ATW) units via UART. It interfaces with the CN105 connector
  on indoor units and provides RPC handlers for remote management over MQTT, HTTP,
  or WebSockets. The library supports ESP8266 and ESP32 platforms.
slug: mel-ac-library-for-mongoose-os
codeUrl: https://github.com/mongoose-os-libs/mel-ac
star: 32
version: 2.20.0
lastUpdated: '2021-05-29'
rtos: mongoose-os
topics:
- air-conditioner
- mitsubishi
- mongoose-os
- uart
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- mel-ac-demo-app
- mitsubishi-ecodan-air-to-water-bridge-for-cn105-to-mqtt
- telegram-bot-api-for-mongoose-os
- mongoose-os-relay-library
- arduino-ir-for-mongoose-os
- mongoose-os-ir-protocol-library
---

## Overview

The MEL-AC library provides a specialized interface for Mongoose OS to communicate with Mitsubishi Electric HVAC systems. By leveraging the CN105 connector found on most Mitsubishi indoor units, this library enables IoT-based control of air conditioning and air-to-water (ATW) units. It was inspired by research into the Mitsubishi protocol and provides a robust implementation for the Mongoose OS ecosystem.

## Hardware Integration

The communication is handled via UART at 2400 baud with 8E1 parity (8 data bits, even parity, 1 stop bit). Since the HVAC unit uses 5V TTL logic, the library is typically used with ESP8266 or ESP32 microcontrollers. Depending on the specific board, level shifting or specific wiring to the CN105 connector (which provides 12V, GND, 5V, TX, and RX) may be required.

The library has been successfully tested on several popular development boards:
- **RobotDyn WiFi-NodeM (ESP8266)**
- **ESP-01 with a 5V adapter**
- **Doit.am DevKit V1 (ESP32)** using UART0 or UART2

## Remote Management via RPC

One of the standout features of the MEL-AC library is its built-in support for the Mongoose OS Remote Procedure Call (RPC) system. When enabled, the library automatically registers `MEL-AC.GetParams` and `MEL-AC.SetParams` handlers. This allows users to monitor and control their HVAC units through various protocols supported by Mongoose OS:

- **WebSockets**: Real-time control via the `mos` tool or custom web interfaces.
- **HTTP**: Simple REST-like calls for integration with home automation dashboards or curl commands.
- **MQTT**: Reliable remote control for cloud-connected IoT deployments, allowing for global access to climate control.

## Configuration and Primitives

The library is highly configurable through the standard Mongoose OS configuration schema. Users can define the UART port, baud rate, and the polling period for the internal packet handler directly in their `mos.yml` or via the device configuration.

```javascript
"mel_ac": {
  "enable": true,         // Enable MEL-AC library
  "uart_no": 0,           // UART number
  "uart_baud_rate": 2400, // Default Mitsubishi baud rate
  "period_ms": 250,       // Packets handler timer interval
  "rpc_enable": true      // Enable MEL-AC RPC handlers 
}
```

For developers building custom logic, the library triggers a variety of events to notify the system of state changes. These include `MGOS_MEL_AC_EV_PARAMS_CHANGED`, `MGOS_MEL_AC_EV_ROOMTEMP_CHANGED`, and `MGOS_MEL_AC_EV_OPERATING_CHANGED`. These events allow applications to react instantly to state changes reported by the HVAC hardware, such as updating a local display or syncing state to a cloud twin.

## Compatibility and Mounting

The library is compatible with most Mitsubishi Electric models featuring the CN105 connector on the indoor unit's control board. This includes a wide range of residential and commercial units, though users should verify compatibility for specific high-capacity models like the PEA-RP series. 

When mounting the hardware, it is recommended to follow the official installation manuals for the indoor units to ensure safety and signal integrity. The library provides a reliable bridge between professional HVAC hardware and the flexibility of the Mongoose OS IoT platform.
