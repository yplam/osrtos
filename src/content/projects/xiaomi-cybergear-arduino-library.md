---
title: Xiaomi CyberGear Arduino Library
summary: An Arduino library designed to interface with the Xiaomi CyberGear brushless
  motor using the Two-Wire Automotive Interface (TWAI) on ESP32 platforms. It simplifies
  CAN Bus communication for motor configuration, control mode switching, and real-time
  telemetry acquisition.
slug: xiaomi-cybergear-arduino-library
codeUrl: https://github.com/DanielKalicki/Xiaomi_CyberGear_Arduino
star: 42
lastUpdated: '2024-09-15'
rtos: freertos
topics:
- arduino
- can
- cybergear
- twai
- xiaomi
isShow: false
createdAt: '2026-02-16'
updatedAt: '2026-02-16'
relatedProjects:
- spirit-motor-driver-library
- cybergear-ros2-controller
- arduino-dronecan
- esp32-ai-connect
- arduino-serial-ble
- bmw-idrive-controller-can-bus-interpreter
---

## Overview

The Xiaomi CyberGear is a high-performance brushless motor designed for robotics, offering integrated electronics and CAN Bus communication. The Xiaomi_CyberGear_Arduino library provides a streamlined way for developers to control these actuators using the Arduino framework, specifically leveraging the Two-Wire Automotive Interface (TWAI) found in Espressif ESP32 microcontrollers.

By abstracting the low-level CAN frames into a high-level C++ API, this library allows for rapid prototyping of robotic joints, gimbal systems, and other motion control applications. It handles the complexities of the CyberGear's communication protocol, including command formatting and response parsing.

## Key Features

The library supports a wide range of motor control functionalities and telemetry features:

- **Multiple Control Modes**: Easily switch between position, velocity, and torque control modes.
- **Safety Limits**: Set maximum speed and current limits to protect the hardware during operation.
- **Real-time Telemetry**: Request and process motor status updates, including rotor position, rotational speed, torque, and internal temperature.
- **TWAI Integration**: Built specifically for the ESP32's TWAI peripheral, ensuring efficient CAN Bus communication without requiring heavy external libraries.
- **Simple Initialization**: Configure pins and motor IDs with just a few lines of code.

## Technical Implementation

The library is designed around the `XiaomiCyberGearDriver` class. It utilizes the ESP32's TWAI driver to manage the physical layer of the CAN Bus. Users define a Master CAN ID (for the microcontroller) and a Target CAN ID (for the motor), allowing for multi-node bus configurations where multiple CyberGears can be controlled from a single Arduino-compatible board.

### Hardware Compatibility

While the library is generic to the Arduino framework on ESP32, it has been specifically tested with:
- **Microcontroller**: Seeed Studio XIAO ESP32S3
- **Transceiver**: M5Stack CANBus Unit (CA-IS3050G)
- **Power Supply**: 22.2V Li-Poly battery (6S)

## Getting Started

To use the library, you initialize the driver by specifying the CAN IDs and the RX/TX pins connected to your CAN transceiver. The following example demonstrates a basic setup for position control:

```cpp
#include "xiaomi_cybergear_driver.h"

// Define IDs and Driver
uint8_t CYBERGEAR_CAN_ID = 0x7F;
uint8_t MASTER_CAN_ID = 0x00;
XiaomiCyberGearDriver cybergear = XiaomiCyberGearDriver(CYBERGEAR_CAN_ID, MASTER_CAN_ID);

#define RX_PIN D7
#define TX_PIN D6

void setup() {
  // Initialize TWAI and Serial logging
  cybergear.init_twai(RX_PIN, TX_PIN, true);

  // Configure motor parameters
  cybergear.init_motor(MODE_POSITION);
  cybergear.set_limit_speed(10.0f);
  cybergear.set_limit_current(5.0);
  cybergear.enable_motor();
  cybergear.set_position_ref(0.0);
}
```

## Monitoring Motor Status

One of the most critical aspects of robotics is feedback. The library provides a structured way to receive updates from the motor. By calling `request_status()`, the motor is prompted to send its current state, which is then parsed into a `XiaomiCyberGearStatus` struct containing position, speed, torque, and temperature data.

This asynchronous request-response pattern ensures that the main loop remains responsive while maintaining a high-frequency control loop for the actuator.
