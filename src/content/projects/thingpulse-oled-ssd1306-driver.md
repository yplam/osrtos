---
title: ThingPulse OLED SSD1306 Driver
summary: A comprehensive display driver for SSD1306 and SH1106 OLED displays on ESP8266,
  ESP32, and Mbed-OS platforms. It supports I2C and SPI interfaces, providing a rich
  API for drawing shapes, text, and progress bars, alongside a dedicated UI framework
  for managing frames and transitions.
slug: thingpulse-oled-ssd1306-driver
codeUrl: https://github.com/ThingPulse/esp8266-oled-ssd1306
siteUrl: https://thingpulse.com/
star: 2131
version: 4.6.1
lastUpdated: '2025-09-17'
rtos: mbed-os
topics:
- arduino
- driver
- esp32
- esp8266
- i2c
- mbed-os
- oleddisplay
- sh1106
- spi
- ssd1306
isShow: true
image: /202512/ThingPulse-ESP8266-Weather-Station.webp
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
---

## Overview

The ThingPulse OLED SSD1306 driver is a versatile and highly optimized library for driving small OLED displays, specifically those based on the SSD1306 and SH1106 controllers. Originally developed for the ESP8266, it has expanded to support ESP32 and Mbed-OS platforms, making it a staple in the IoT community. It is the primary driver used in the ThingPulse IoT starter kits and power projects like the ESP8266 Weather Station.

The library is designed to be flexible, supporting various display geometries including 128x64, 128x32, 64x48, and 64x32. Whether you are using I2C or SPI, this driver provides a consistent API to manage your visual output.

## Key Features

### Comprehensive Drawing API
The library includes a full suite of drawing functions that allow developers to create complex interfaces with ease. Beyond simple pixel manipulation, it supports:
- **Geometric Shapes**: Lines, rectangles, circles, and triangles with both outline and filled options.
- **Progress Bars**: Built-in support for rounded progress bars, ideal for status indicators.
- **Bitmaps**: Support for XBM bitmaps and a fast internal image format for custom icons and graphics.

### Advanced Text Rendering
Text handling is a standout feature, offering more than just basic character printing. It supports:
- **Alignment**: Left, Right, Center, and Center-Both alignments.
- **Automatic Word Wrap**: Define a maximum width, and the driver will automatically wrap text to new lines at spaces or dashes.
- **Custom Fonts**: While it comes with standard ArialMT fonts (10, 16, and 24pt), users can generate custom font files using a proprietary but open web-based tool.

### The UI Library (OLEDDisplayUi)
For projects requiring more than a static screen, the included `OLEDDisplayUi` library provides a framework for creating "Frames" and "Overlays." Frames act as sliding pages in a carousel, while Overlays remain static (useful for clocks or status icons). This system handles transitions, frame timing, and indicator dots automatically, significantly reducing the boilerplate code required for interactive menus.

## Technical Implementation

The library is built with hardware abstraction in mind. It supports multiple communication protocols:
- **Standard I2C**: Uses the built-in `Wire.h` library.
- **Fast I2C**: Supports the `brzo_i2c` library, an assembler-optimized implementation for ESP8266 that offers superior performance.
- **SPI**: Supports 4-wire SPI displays.

Because the class derives from Arduino's `Print` class, developers can use familiar functions like `print()`, `println()`, and `printf()` directly on the display object. This makes it incredibly easy to port existing serial-based debugging or logging code to a physical screen.

## Getting Started

To initialize a display using the standard I2C interface on an ESP8266 or ESP32, you can use the following pattern:

```cpp
#include <Wire.h>
#include "SSD1306Wire.h"

// Initialize the display at address 0x3c using SDA and SCL pins
SSD1306Wire display(0x3c, SDA, SCL);

void setup() {
  display.init();
  display.flipScreenVertically();
  display.setFont(ArialMT_Plain_10);
}

void loop() {
  display.clear();
  display.drawString(0, 0, "Hello World");
  display.display();
}
```

## Community and Ecosystem

The ThingPulse driver is a mature project with a wide reach in the open-source hardware world. It is a core component of several high-profile projects, including:
- **Meshtastic**: An open-source GPS communicator mesh radio.
- **OpenMQTTGateway**: A project unifying various protocols into MQTT.
- **OpenAstroTracker**: Open-source hardware for astrophotography.

Its reliability and extensive feature set make it a go-to choice for developers building everything from simple weather stations to complex mesh networking nodes.
