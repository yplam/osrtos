---
title: Arduino IR for Mongoose OS
summary: A library that wraps the IRremoteESP8266 library for use with Mongoose OS
  and its JavaScript (mjs) API. It enables ESP8266 and ESP32 devices to send and receive
  infrared signals using high-level scripting or C++.
codeUrl: https://github.com/scotthernandez/arduino-ir
isShow: false
rtos: mongoose-os
libraries: []
topics:
- mongoose-os
- library
- esp8266
- esp8266-arduino
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- mongoose-os-ir-protocol-library
- arduino-rf24-for-mongoose-os
- mongoose-os-relay-library
- telegram-bot-api-for-mongoose-os
- lis3dh-accelerometer-library-for-mongoose-os
- mel-ac-library-for-mongoose-os
---

## Bringing Infrared Control to Mongoose OS

The `arduino-ir` project is a specialized library designed to bridge the gap between the popular `IRremoteESP8266` library and the Mongoose OS ecosystem. Infrared (IR) communication remains a vital technology for home automation, enabling DIY enthusiasts and professional developers to interface with legacy hardware like televisions, air conditioners, and media players. By wrapping the robust functionality of the Arduino-based IR library, this project makes it accessible to the modern, cloud-focused environment of Mongoose OS.

## Bridging C++ and JavaScript

One of the most powerful aspects of Mongoose OS is its support for `mjs`, a restricted JavaScript engine that allows for rapid prototyping and logic implementation without the need for constant recompilation of C code. This library provides a dedicated JavaScript API (`api_ir.js`) that exposes the underlying C++ IR logic to the scripting layer. 

This architecture allows developers to handle complex IR protocols—which require precise timing and hardware-specific interrupts—using simple JavaScript function calls. Whether you are building a web-controlled universal remote or a sensor that triggers an action when a specific remote button is pressed, the heavy lifting of signal modulation and demodulation is handled transparently by the library.

## Technical Architecture

The repository is structured as a standard Mongoose OS module:
- **`mos.yml`**: The manifest file that defines the library configuration and integrates it into the Mongoose OS build system.
- **`src/`**: Contains the C++ implementation (`mgos_arduino_ir_remote.cpp`) and headers. This layer interacts directly with the `IRremoteESP8266` source code to manage GPIOs and timers.
- **`fs/`**: Contains the `api_ir.js` file, which defines the JavaScript bindings, allowing users to interact with the IR hardware via the `IR` object in their application scripts.

## Hardware Support and Use Cases

Targeting the ESP8266 and ESP32 platforms, this library leverages the specific hardware timers of these microcontrollers to ensure accurate signal reproduction. Common use cases for this library include:
- **Smart Home Gateways**: Creating a bridge between MQTT/Web commands and IR-controlled appliances.
- **Remote Cloning**: Capturing signals from existing remotes to replicate them in automated routines.
- **Custom Controllers**: Building specialized input devices that communicate via IR to existing consumer electronics.

By providing a seamless path from the mature Arduino IR ecosystem into the Mongoose OS framework, `arduino-ir` simplifies the development of sophisticated IoT devices that need to interact with the physical world through infrared light.
