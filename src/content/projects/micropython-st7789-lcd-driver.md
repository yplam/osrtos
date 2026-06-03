---
title: MicroPython ST7789 LCD Driver
summary: A high-performance MicroPython driver for ST7789 and compatible LCD displays,
  featuring support for hardware scrolling, custom fonts, and bitmap drawing. It is
  optimized for ESP32 and RP2040 microcontrollers and supports a wide range of display
  resolutions and color configurations.
slug: micropython-st7789-lcd-driver
codeUrl: https://github.com/russhughes/st7789py_mpy
siteUrl: https://russhughes.github.io/st7789py_mpy/
star: 225
lastUpdated: '2024-08-05'
rtos: ''
libraries:
- micropython
topics:
- bitmap-fonts
- driver
- micropython
- st7789
- truetype
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- micropython-st7735-tft-lcd-driver
- st7789-driver-for-micropython
- micropython-waveshare-e-paper-drivers
- micropython-camera-driver-for-esp32
- esp32-cheap-yellow-display-micropython-lvgl
- micropython-max7219-8x8-led-matrix-library
---

## Overview

The `st7789py_mpy` project is a robust MicroPython driver designed for ST7789-based LCD displays. Originally a fork of the devbis module, this version has been significantly expanded to support a variety of display controllers and hardware configurations. It provides a Python-based interface for interacting with small-to-medium-sized color displays, making it an essential tool for developers building graphical user interfaces on microcontrollers like the ESP32 and RP2040.

## Key Features and Capabilities

This driver is more than a simple pixel-pusher; it includes several advanced features that simplify embedded GUI development:

- **Broad Hardware Support**: While named after the ST7789, the driver also supports ST7735, GC9107, GC9A01, and ILI9342 controllers.
- **Flexible Display Options**: It handles various resolutions (from 80x160 up to 320x240), RGB and BGR color orders, and full display rotation.
- **Performance Optimizations**: Critical methods like `text()` utilize MicroPython's `viper` emitter to improve execution speed, which is vital for maintaining responsive displays on resource-constrained hardware.
- **Advanced Drawing**: Beyond basic primitives, the library supports drawing polygons with optional rotation, hardware-based scrolling, and bitmap rendering.
- **Rich Typography**: Users can render text using converted PC BIOS bitmap fonts or TrueType fonts, allowing for high-quality text display on small screens.

## Technical Implementation

The driver is written in Python but designed with embedded constraints in mind. It allows for deep customization through parameters like `custom_init` and `custom_rotation`, which enable developers to adapt the driver to unique display modules that might require specific initialization sequences or non-standard byte swapping for color data.

Recent updates have introduced a modular configuration system. By using separate `tft_config.py` and `tft_buttons.py` modules, the same application code can run across different hardware targets—such as the LilyGo T-Display or M5Stack Core—simply by swapping the configuration file. This abstraction makes it much easier to maintain cross-platform MicroPython projects.

## Hardware Compatibility

The project includes extensive examples and configurations for popular development boards, including:

- **ESP32**: LilyGo T-Display series, M5Stack (Core, Core2, CoreS3, AtomS3), and generic 320x240 modules.
- **RP2040**: Waveshare Pico LCD series (1.14, 1.3, 2.0), LilyGo T-Display RP2040, and the RP2040-Touch-LCD-1.28.

## Getting Started

To use the driver, you typically define your display configuration in a `tft_config.py` file. This file specifies the SPI pins, baud rate, and display dimensions. Once configured, drawing is straightforward:

```python
import st7789
import tft_config

# Initialize the display
tft = tft_config.config(tft_config.WIDE)
tft.init()

# Draw a simple shape
tft.fill(st7789.BLACK)
tft.rect(10, 10, 100, 50, st7789.RED)
tft.text(font, "Hello MicroPython!", 20, 20, st7789.WHITE, st7789.BLACK)
```

The repository provides a `make-example.py` utility to help generate documentation and configurations, along with shell scripts for batch-uploading examples to hardware, streamlining the development workflow for MicroPython enthusiasts.
