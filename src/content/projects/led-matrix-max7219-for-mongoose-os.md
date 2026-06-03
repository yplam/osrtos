---
title: Led Matrix (MAX7219) for Mongoose OS
summary: A Mongoose OS library for controlling multiple MAX7219-based 8x8 LED matrices.
  It provides a C++ interface for displaying animated text and managing display configurations
  via SPI, specifically optimized for ESP32 and similar microcontrollers.
slug: led-matrix-max7219-for-mongoose-os
codeUrl: https://github.com/ericogr/led-matrix
star: 1
lastUpdated: '2018-01-05'
rtos: mongoose-os
topics:
- esp32
- led
- library
- matrix
- mongoose-os
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- micropython-max7219-8x8-led-matrix-library
- mongoose-os-ws2812b-driver
- fastled-idf
- lvgl-for-raspberry-pi-pico-hub75-led-matrix
- micropython-tm1637-library
- mongoose-os-relay-library
---

## Overview

The Led Matrix library for Mongoose OS provides a streamlined way to interface with MAX7219-driven 8x8 LED matrices. Based on popular Arduino implementations, this library brings high-level text manipulation and animation capabilities to the Mongoose OS ecosystem. It is designed to handle multiple daisy-chained displays, allowing developers to create scrolling text tickers or status displays for IoT devices.

## Key Features

The library abstracts the low-level SPI communication required by the MAX7219, offering a clean C++ API for display management. Key capabilities include:

- **Daisy-Chaining Support**: Easily configure the number of displays in your chain via the Mongoose OS configuration schema.
- **Text Alignment**: Support for various alignments, including `TEXT_ALIGN_LEFT_END` for precise message positioning.
- **Animated Text**: Built-in support for scrolling or animated text with configurable frame delays.
- **Hardware Flexibility**: Full control over SPI pin mapping (MOSI, SCLK, CS) through the standard Mongoose OS `mos.yml` configuration.

## Technical Implementation

This project is structured as a Mongoose OS library (`type: lib`). It leverages the `mongoose-os-libs/spi` dependency to communicate with the display hardware. By using the Mongoose OS configuration schema, users can change hardware parameters like the Slave Select pin or the number of displays without modifying the library source code.

The library uses a C++ namespace `lm` and provides a `LedMatrix` class that handles the initialization and buffer management for the LED grid. 

## Configuration and Setup

To use the library, you define your hardware setup in your project's `mos.yml`. This allows for easy porting between different ESP32 or ESP8266 boards by simply adjusting the GPIO assignments. 

```yaml
config_schema:
  - ["ledm.number_of_displays", 4]
  - ["ledm.slave_select_pin", 5]
  - ["spi.enable", true]
  - ["spi.mosi_gpio", 23]
  - ["spi.sclk_gpio", 18]
```

## Example Usage

Integrating the library into an application is straightforward. After initializing the hardware, you can set text and start animations with just a few lines of code:

```cpp
#include "LedMatrix.h"

using namespace lm;

LedMatrix ledMatrix;
ledMatrix.init();
// Set the message to be displayed
ledMatrix.setText("My IOT Device...");
ledMatrix.setTextAlignment(TEXT_ALIGN_LEFT_END);
// Start scrolling text with a 50ms delay
ledMatrix.startAnimatedText(50);
```

This approach makes it ideal for IoT applications that need to provide visual feedback to users, such as displaying sensor readings, system status, or notifications in a compact form factor.
