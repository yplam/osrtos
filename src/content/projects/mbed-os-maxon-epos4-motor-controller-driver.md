---
title: Mbed OS Maxon EPOS4 Motor Controller Driver
summary: A C++ driver for the Maxon EPOS4 motor controller designed for Mbed OS. It
  implements CANOpen communication to manage motor states, position modes, and motion
  profiles on ARM Cortex-M platforms.
slug: mbed-os-maxon-epos4-motor-controller-driver
codeUrl: https://github.com/tinybeachthor/mbedos-maxon-epos4
star: 6
lastUpdated: '2020-01-26'
rtos: mbed-os
topics:
- canopen
- epos4
- maxon
- mbed-os
- mbedos
- motor-controller
- motorcontroller
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- spirit-motor-driver-library
- canfestival-rtt
- arm-control-framework-acorns-rover
- kw41z-rf-driver-for-arm-mbed-nanostack
- mongoose-os-ws2812b-driver
- xiaomi-cybergear-arduino-library
---

## Overview

The mbedos-maxon-epos4 project provides a specialized driver for the Maxon EPOS4 motor controller, built specifically for the Mbed OS ecosystem. This implementation facilitates CANOpen communication between an Mbed-enabled microcontroller and the EPOS4 hardware, allowing for precise control over motor operations such as positioning and state management.

## Technical Implementation

The driver is structured around the CANOpen protocol, assuming a dedicated CAN bus for communication with a single EPOS4 node. It leverages Mbed OS's real-time features, including `Thread`, `Mutex`, and `ConditionVariable`, to handle asynchronous CAN messages without blocking the main application logic.

### State Machine Management

A core component of the driver is its handling of the EPOS4 state machine. It monitors the controller's status via the `STATUSWORD` (0x6041) and sends commands through the `CONTROLWORD` (0x6040). The driver supports several critical states:
- Not Ready to Switch On
- Switch On Disabled
- Ready to Switch On
- Switched On
- Operation Enabled
- Quick Stop Active
- Fault Reaction Active

### CANOpen Communication

The driver implements NMT (Network Management) state tracking, monitoring heartbeats to determine if the node is in Booting, Pre-Operational, Operational, or Stopped states. It primarily utilizes SDO (Service Data Object) communication for configuration and command execution, ensuring reliable data transfer for parameters like target position and profile velocity.

## Key Features

- **Profile Position Mode (PPM):** Supports moving the motor to specific angles and setting home positions.
- **Thread-Safe CAN Handling:** Uses a dedicated listener thread to process incoming CAN frames and update internal state variables.
- **Comprehensive Error Mapping:** Includes an extensive enumeration of CANOpen SDO abort codes (e.g., SDO timeout, toggle bit errors, and hardware errors) to assist in debugging communication issues.
- **Nix-Based Development:** The repository includes a `shell.nix` configuration, providing a reproducible development environment with `mbed-cli`, `stlink`, and `can-utils` pre-installed.

## Usage Example

The driver simplifies complex CANOpen sequences into high-level C++ methods. A typical workflow involves initializing the `Epos4` object with specific RX/TX pins, transitioning the device to an operational state, and then commanding motion:

```cpp
// Initialize the controller
Epos4 motor(PA_11, PA_12);

// Set up for position control
motor.startPosMode();

// Move to a specific angle
motor.moveToAngle(90.0f);

// Stop the motor
motor.stop();
```

## Hardware and Software Requirements

This project is designed for ARM Cortex-M microcontrollers supported by Mbed OS. It requires a CAN transceiver to interface with the Maxon EPOS4. The configuration is managed via `mbed_app.json`, and the project is compatible with Mbed OS 5 and 6 versions that support the standard CAN API.
