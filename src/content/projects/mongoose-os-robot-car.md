---
title: Mongoose OS Robot Car
summary: An embedded application for driving a small off-the-shelf car robot using
  Mongoose OS. It targets ESP32 and ESP8266 microcontrollers, featuring mDNS support,
  RPC services, and integration with the DRV8833 motor driver. The project was developed
  as a support tool for CoderDojo robotics projects.
slug: mongoose-os-robot-car
codeUrl: https://github.com/pmanna/robotcar
star: 0
lastUpdated: '2018-05-24'
rtos: mongoose-os
topics:
- coderdojo
- esp32
- mongoose-os
- robots
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- mongoose-os-playground
- cuybot-v1-opensource-smartcar-project
- mongoose-os-app-skeleton
- mongoose-os-programs-and-examples
- pyespcar-micropython-esp32-wifi-car
- sesame-robot-micro
---

## Driving an Off-the-Shelf Car Robot with Mongoose OS

This project provides a firmware implementation for controlling a small, off-the-shelf car robot using the Mongoose OS framework. Originally developed as a support tool for CoderDojo Ninjas' projects at Croke Park, Dublin, it offers a robust foundation for building internet-connected robotics projects using popular ESP32 and ESP8266 development boards.

## Hardware and Platform Support

The application is designed to be compatible with various ESP32 and ESP8266 development boards. It has been specifically tested with the Wemos LOLIN32 paired with a DRV8833 motor driver module. The project also provides 3D printing files for a custom chassis, making it a complete solution for hobbyists and students looking to build their own robot from scratch.

The `mos.yml` configuration defines specific pin layouts for different platforms:
- **ESP32**: Uses GPIO 5 for the LED, GPIO 0 for the button, and standard I2C pins (SDA: 21, SCL: 22).
- **ESP8266**: Uses GPIO 2 for the LED and GPIO 0 for the button, with I2C on pins 4 and 5.

## Key Features and Capabilities

One of the standout features of this project is its focus on ease of use and remote accessibility. By leveraging the capabilities of Mongoose OS, the robot includes several advanced networking features:

- **mDNS Capability**: The application enables DNS-SD (mDNS), allowing users to access the board via a hostname rather than needing to track its dynamic IP address on a local network.
- **WiFi Reset Mechanism**: A physical safety net is implemented using GPIO 0. When this pin is briefly taken to ground, the network connection is reset to Access Point (AP) mode, ensuring you can always regain control of the device if network settings fail.
- **RPC Services**: The project includes a wide array of Remote Procedure Call (RPC) services, including GPIO, I2C, WiFi, and UART management. This allows for remote control and configuration of the robot's hardware over the network.
- **JavaScript Integration**: Through the `mjs` library, the project supports embedded JavaScript, allowing for high-level logic to be implemented without the overhead of full C compilation for every change.

## Technical Architecture

The project is built on the Mongoose OS ecosystem, utilizing a modular library approach. The configuration file (`mos.yml`) reveals a heavy reliance on standard MOS libraries for hardware abstraction, including PWM for motor speed control, ADC for sensor reading, and the HTTP server for providing a web-based control interface.

By pointing a web browser to the board's IP address or mDNS name, users can interact with the robot directly. This makes it an excellent educational tool, as students can see immediate results from their code changes through the Mongoose OS web UI.

## Getting Started

To deploy the project, users need the `mos` tool installed. The workflow involves flashing the firmware to an ESP32 or ESP8266 board and then configuring the WiFi settings. Once connected, the robot's features can be explored through the browser-based interface provided by the Mongoose OS RPC and HTTP services. For those interested in the physical build, the project references 3D models available on Thingiverse and Tinkercad to house the electronics and motors.
