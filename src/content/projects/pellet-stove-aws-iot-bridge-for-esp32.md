---
title: Pellet Stove AWS IoT Bridge for ESP32
summary: A Mongoose OS firmware for ESP32 that connects Micronova-based pellet stoves,
  specifically the Piazzetta P937, to AWS IoT. It enables remote monitoring and control
  of stove parameters like temperature and fan speed by interfacing with the stove's
  control board via UART.
slug: pellet-stove-aws-iot-bridge-for-esp32
codeUrl: https://github.com/daniele-salvagni/pellet-aws-iot
star: 9
lastUpdated: '2017-08-10'
rtos: mongoose-os
topics:
- aws
- aws-iot
- esp32
- iot
- mongoose-os
- pellet
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- electricitydisplay-mqtt-remote-control-for-esp8266-esp32
- chronothermostat-an-aws-powered-iot-climate-control-system
- esp32-controller-for-charlton-jenrick-fireplace
- mitsubishi-ecodan-air-to-water-bridge-for-cn105-to-mqtt
- mongoose-os-environmental-sensors-application
- mongoose-os-aws-iot-uart-and-thing-shadow-example
---

## Overview

The Pellet AWS IoT project is a specialized firmware for the ESP32 microcontroller designed to bring smart connectivity to traditional pellet stoves. Specifically targeting models using Micronova control boards—such as the Piazzetta P937—this project leverages Mongoose OS to bridge the gap between local hardware and the AWS IoT ecosystem.

## Technical Architecture

The firmware is built on **Mongoose OS**, an IoT firmware development framework that allows for rapid prototyping using JavaScript (mJS) for high-level logic while maintaining the performance of C for low-level operations. By utilizing the ESP32's hardware UART, the firmware communicates directly with the stove's control board.

The project is structured to handle the specific communication protocol used by Micronova boards, which involves reading and writing to specific memory addresses in both RAM and EEPROM.

## Configuration and Memory Mapping

Interfacing with a pellet stove requires precise knowledge of its memory layout. The project provides a flexible configuration system where users can define the UART port and the command bytes required for reading and writing.

```javascript
let uartNo = 2; // UART port to use on the ESP32

let cfg =  {
  RAM: 0x00,    // Type used to access RAM values
  EPR: 0x20,    // Type used to access EEPROM values
  READ: 0x00,   // Command used READ from the device
  WRITE: 0x80   // Command used WRITE to the device
};

let pellet = Pellet.create(uartNo, cfg);
```

Because these devices often store data in a compressed or scaled format, the firmware includes a conversion mechanism. Most values follow a linear formula: `realValue = offset + (multiplier * memoryValue)`. This allows developers to work with human-readable units, such as Celsius, while the firmware handles the byte-level translation automatically.

## Supported Parameters

For the Piazzetta P937, the project maps several critical parameters, including:
- **Stove Stage**: Current operational state (e.g., ignition, burning, cleaning).
- **Ambient and Probe Temperatures**: Real-time thermal monitoring.
- **Target Temperature**: The setpoint for the thermostat.
- **Power Levels and Fan Speeds**: Control over the combustion intensity and ventilation fans.

## AWS IoT Integration

By integrating the Mongoose OS AWS library, the firmware can synchronize the stove's state with an AWS IoT Thing Shadow. This enables remote monitoring and control via mobile apps or web dashboards, allowing users to adjust their home heating from anywhere. The use of MJS (embedded JavaScript) allows for easy customization of the logic that handles state updates and cloud synchronization.

## Getting Started

To deploy this firmware, users need an ESP32 and the Mongoose OS build tool (`mos`). The project requires configuring the specific memory addresses relevant to the stove model. While the default configuration targets the P937, the modular design allows for adaptation to other Micronova-based stoves by updating the memory address map in the JavaScript configuration.

*Note: Interfacing with high-voltage heating appliances requires caution. Incorrect memory writes could potentially damage the device or create safety hazards.*
