---
title: ARM Control Framework (Acorns Rover)
summary: A modular embedded framework built on Mbed OS for controlling a semi-autonomous
  rover via UART. It targets the Silicon Labs EFM32GG Giant Gecko platform and provides
  a structured command-dispatching system for sensor data acquisition and motor control.
codeUrl: https://github.com/jongreene/acorns-rover
isShow: false
rtos: mbed-os
libraries: []
topics:
- cortex-m3
- mbed-os
- silabs
- embedded
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- texas-aimbots-embedded-development
- lekaos
- bitcraze-crazyflie-2-0-2-1-mbed-os-firmware
- watchbot-system
- mongoose-os-robot-car
- micro-ros-stm32-template
---

The ARM Control Framework, often referred to as the Acorns Rover, is a robust embedded system designed to provide external control over a mobile platform through a standardized UART connection. Built on top of Mbed OS, this project demonstrates a highly modular approach to firmware development, allowing developers to extend the rover's capabilities with minimal friction.

## System Architecture

At the heart of the project is a two-component framework consisting of a **request handler** and a **commands class**. This separation of concerns is critical for maintainability:

*   **Request Handler:** This component manages the UART interface, handling the reception and transmission of data packets. It ensures that incoming data is correctly framed and parsed before being passed to the logic layer.
*   **Commands Class:** This is where the actual functionality resides. It contains the callable functions that drive the rover's hardware. Because this class is independent of the communication logic (linked only via a callback pointer), adding a new feature is as simple as defining a new function within this class.

## Hardware and Sensors

The project is specifically tailored for the **Silicon Labs EFM32GG (Giant Gecko)** microcontroller, specifically the STK3700 starter kit. The repository includes specialized drivers for several high-precision sensors, making it a capable platform for environmental monitoring and navigation:

*   **ALS31300:** A 3D linear Hall effect sensor for magnetic field sensing.
*   **HTU21D:** A digital humidity and temperature sensor.
*   **MPL3115A2:** A high-precision pressure sensor used for altitude and temperature tracking.

## Communication Protocol

The rover uses a simple but effective bracketed command format for communication. This ensures that the parser can verify when a full command has been received. The standard format is:

```bash
{command_name,param1,param2,...}

```

When a command is issued, the system provides two levels of feedback. First, an acknowledgement (ACK/NAK) confirms whether the command was properly formatted and recognized. Second, the function itself can generate multiple responses as it executes. This is particularly useful for long-running tasks or continuous sensor streaming.

### Example Command Usage

If you wanted to drive the rover, you might send a command like this through a serial terminal (such as CuteCom):

```bash
input: {drive,40,40,20,20}
```

The system also handles errors gracefully, returning JSON-formatted error strings if something goes wrong, such as a badly formatted packet or a queue overflow:

```json
{"nak":"","payload":{"return_value":false,"return_string":"json error: badly formatted json"}}
```

## Getting Started with Development

The project utilizes a CMake-based build system, which automates the complex task of setting up the ARM GNU toolchain and Mbed OS environment. The first time you run the build, the system automatically clones the necessary Mbed OS version and applies specific patches required for the EFM32 platform.

To compile the project, the standard workflow involves creating a release directory and running CMake:

```bash
# create a RELEASE directory
$ mkdir RELEASE
$ cd RELEASE

# resolve dependencies and generate build files
$ cmake ..

# compile STK3700 binary
$ make
```

Flashing is typically handled via a J-Link programmer. Once the binary is loaded onto the Giant Gecko, the rover can be controlled via any standard UART device, including Bluetooth-to-Serial modules like the Adafruit Bluefruit LE, allowing for wireless operation from a PC or mobile device.
