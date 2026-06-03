---
title: LIS3DH Accelerometer Library for Mongoose OS
summary: A Mongoose OS library providing support for the Adafruit LIS3DH triple-axis
  accelerometer. It utilizes the Mongoose OS Arduino compatibility layer to enable
  sensor integration for ESP32 and ESP8266 devices using both C and JavaScript.
slug: lis3dh-accelerometer-library-for-mongoose-os
codeUrl: https://github.com/gitcodr/Mongoose-OS-LIS3DH
star: 2
lastUpdated: '2017-06-25'
rtos: mongoose-os
topics:
- adafruit
- arduino
- lis3dh
- mongoose-os
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- max17263-library-for-mongoose-os
- hx711-library-for-mongoose-os
- arduino-ir-for-mongoose-os
- adafruit-e-paper-e-ink-library-for-mongoose-os
- mongoose-os-relay-library
- mongoose-os-bme680-library
---

## Overview

The Mongoose-OS-LIS3DH library is a specialized port of the popular Adafruit LIS3DH accelerometer library, specifically optimized for the Mongoose OS ecosystem. This library enables developers to easily interface with the LIS3DH, a low-power triple-axis accelerometer, using the high-level features provided by Mongoose OS.

## Key Features

By bridging the Arduino-style API with Mongoose OS, this library provides a familiar interface for developers transitioning from the Arduino environment while taking advantage of the robust features of an industrial-grade RTOS. 

**Core capabilities include:**
- Support for the LIS3DH triple-axis accelerometer via I2C and SPI interfaces.
- Integration with the Mongoose OS JavaScript (mJS) engine, allowing for rapid prototyping in JS.
- Native C support for performance-critical applications.
- Seamless integration with the `mos` build tool and configuration system.

## Technical Implementation

The library is structured as a Mongoose OS library (`type: lib`) and depends on several core compatibility layers. It leverages the `arduino-compat`, `arduino-wire`, and `arduino-spi` libraries provided by the Mongoose OS team. This architecture allows the library to wrap the original Adafruit logic while ensuring it runs efficiently within the Mongoose OS task scheduler and memory management system.

The inclusion of an `mjs_fs` directory suggests that the library provides JavaScript bindings, making it accessible to developers who prefer scripting over low-level C programming. This is a hallmark of Mongoose OS, allowing for quick sensor data acquisition and cloud integration.

## Hardware Support

While the library is designed for the LIS3DH sensor, it is compatible with any hardware platform supported by Mongoose OS, including:
- ESP32
- ESP8266
- TI CC3200 / CC3220
- STM32 (on supported variants)

## Getting Started

To use this library in a Mongoose OS project, it must be added to the `libs` section of the project's `mos.yml` file. Once included, the library handles the initialization of the sensor bus (I2C or SPI) and provides methods to read acceleration data, detect taps, and manage power modes. 

Because it follows the Adafruit API pattern, developers can often refer to standard LIS3DH documentation and examples, simply adapting the initialization sequence to the Mongoose OS environment.
