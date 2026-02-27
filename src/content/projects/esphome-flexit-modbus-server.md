---
title: ESPHome Flexit Modbus Server
summary: A Modbus server implementation for Flexit ventilation systems using ESPHome
  on ESP8266 or ESP32 microcontrollers. It allows for direct control and monitoring
  of CS60 controllers via RS485, eliminating the need for the official Flexit CI66
  adapter.
slug: esphome-flexit-modbus-server
codeUrl: https://github.com/MSkjel/esphome-flexit-modbus-server
star: 13
version: v1.0.0
lastUpdated: '2026-01-09'
rtos: freertos
topics:
- cs60
- cu60
- esphome
- flexit
- k2r
- modbus
- uni2
- uni3
- uni4
isShow: true
image: /202602/xiao-front.webp
createdAt: '2026-02-27'
updatedAt: '2026-02-27'
---

## Overview

The ESPHome Flexit Modbus Server project provides a custom component for ESPHome that enables communication with Flexit ventilation systems. By acting as a Modbus server, an ESP8266 or ESP32 device can interface directly with the Flexit CS60 controller (and similar models compatible with the CI600 panel). This solution is particularly valuable for users looking to integrate their HVAC systems into Home Assistant without purchasing the proprietary CI66 adapter.

## Key Features and Capabilities

This project exposes a wide array of ventilation controls and sensors to the ESPHome ecosystem. Users can monitor temperatures (supply, extract, outdoor, and return water), track fan speeds, and view heating or cooling percentages. Beyond simple monitoring, the component allows for active control of the system mode (Stop, Min, Normal, Max) and temperature setpoints.

One of the standout features is the implementation of a "Fireplace Mode." This custom logic handles the complex task of balancing air pressure when a fireplace is in use by temporarily adjusting supply and extract fan speeds. It includes safety features such as conflict detection—which deactivates the mode if manual changes are detected—and an automatic shutoff timer.

## Hardware Requirements

To implement this server, users need:
- A **Flexit ventilation system** with a CS60 or compatible controller.
- An **ESP8266 or ESP32** microcontroller (the XIAO-ESP32-C3 with its dedicated RS485 expansion board is a recommended combination).
- A **UART-to-RS485 transceiver**, such as the MAX485 or MAX13485, to bridge the TTL logic of the ESP device with the RS485 bus used by the Flexit controller.

## Technical Implementation

The project is designed as an external component for ESPHome. It leverages the Modbus protocol to communicate over a hardware UART. A unique feature of this implementation is the optional **TCP Bridge**. When enabled, the ESP device creates a server that mirrors all UART traffic to connected TCP clients. This is an invaluable tool for developers and power users who wish to sniff the Modbus bus to discover new registers or debug communication issues.

### Example Configuration

Integrating the component into an ESPHome YAML configuration is straightforward using the `external_components` block:

```yaml
external_components:
  - source: github://MSkjel/esphome-flexit-modbus-server@main
    components: 
      - flexit_modbus_server

uart:
  id: modbus_uart
  tx_pin: GPIO1
  rx_pin: GPIO3
  baud_rate: 115200

flexit_modbus_server:
  - id: server
    uart_id: modbus_uart
    address: 3
```

## Operational Considerations

There are several technical constraints to keep in mind when deploying this solution. Due to limitations in the CS60 controller, the supply air temperature can only be set if the official CI600 panel is disconnected. Additionally, the ESP device must typically be powered on before the CS60 controller to ensure the controller successfully polls the Modbus server during its startup sequence. If the heater control is required, the server must be assigned Modbus Address 1, though this may conflict with existing CI600 hardware.
