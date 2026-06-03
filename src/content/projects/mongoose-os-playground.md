---
title: Mongoose OS Playground
summary: A collection of RPC extensions for Mongoose OS targeting ESP32 and ESP8266
  platforms. It provides remote control capabilities for ADC, PWM, servos, and touch
  sensors through a browser-based interface, originally developed for CoderDojo educational
  projects.
slug: mongoose-os-playground
codeUrl: https://github.com/pmanna/mongoose_os_playground
star: 6
lastUpdated: '2018-05-13'
rtos: mongoose-os
topics:
- coderdojo
- esp32
- esp8266
- gpio
- mongoose-os
- servo
- wemos-d1-mini
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- mongoose-os-programs-and-examples
- mongoose-os-samples-for-esp32
- electricitydisplay-mqtt-remote-control-for-esp8266-esp32
- esp32-experiments
- mongoose-os-robot-car
- unipg-mbed-os-samples
---

## Overview

The Mongoose OS Playground is a specialized application designed to extend the Remote Procedure Call (RPC) capabilities of Mongoose OS. Developed primarily as a support tool for CoderDojo Ninjas at Croke Park, Dublin, this project serves as a bridge between high-level browser-based control and low-level hardware interaction on popular microcontrollers like the ESP32 and ESP8266.

At its core, the project leverages the Mongoose OS RPC framework, which allows developers to call C or JavaScript functions on a device remotely via HTTP, WebSockets, or MQTT. The Playground app expands this standard set with custom handlers for common hardware tasks, making it easier for students and hobbyists to experiment with electronics without writing complex firmware from scratch.

## Hardware Compatibility and Setup

The project is tailored for the ESP32 (specifically Wemos LOLIN32) and ESP8266 (Wemos D1 Mini) development boards. By utilizing the `mos` tool, users can build and flash the firmware, which then exposes a web interface. This interface allows for direct experimentation with the board's peripherals through a browser, facilitating a "live coding" feel. The application is designed to eventually support mobile apps for local, direct communication.

## Extended RPC Functionality

One of the standout features of this repository is the collection of custom RPC extensions. These include:

- **ADC Control**: Simple methods to enable and read analog-to-digital converter values from specific pins, returning raw levels (0-1023 or 0-4095 depending on the chip).
- **PWM and Servos**: Dedicated calls to set Pulse Width Modulation frequency and duty cycles, along with a specialized `Servo.Set` command to rotate standard SG90 motors to specific angles.
- **ESP32 TouchPad**: For ESP32 users, the app includes support for the capacitive touch interface, allowing for unfiltered touch value reads via RPC.
- **Motor Shield Support**: Specifically for the ESP8266 Wemos D1 Mini, the project includes logic to interface with the I2C-based motor shield, handling direction and speed control.

## Networking and Extras

Beyond hardware control, the Playground simplifies network management. It includes a `Wifi.Enable` RPC call to switch between Access Point (AP) and Station (STA) modes dynamically. To ensure the device remains accessible on a local network without tracking IP addresses, mDNS (Multicast DNS) is enabled by default. Additionally, a physical safety net is provided: holding GPIO 0 low acts as a WiFi reset, reverting the device to Access Point mode if connectivity settings are lost.

## Educational Context

The project's origin within the CoderDojo community highlights its focus on accessibility. By providing a structured way to interact with hardware via JSON-based RPC calls, it lowers the barrier to entry for creating IoT applications and mobile-controlled robotics. The repository includes specific build configurations for different platforms (`mos_esp32.yml` and `mos_esp8266.yml`), ensuring that platform-specific features like the ESP32 touchpad are only included where supported.
