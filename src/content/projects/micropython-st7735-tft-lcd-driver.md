---
title: MicroPython ST7735 TFT LCD Driver
summary: A modified ST7735 driver for MicroPython optimized for ESP32 and Raspberry
  Pi Pico. It supports multiple display variants, text rendering with custom fonts,
  and advanced features like offscreen frame buffering and BMP image display.
slug: micropython-st7735-tft-lcd-driver
codeUrl: https://github.com/boochow/MicroPython-ST7735
star: 259
lastUpdated: '2022-12-30'
rtos: ''
libraries:
- micropython
topics:
- micropython
- micropython-esp32
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- micropython-st7789-lcd-driver
- st7789-driver-for-micropython
- micropython-ssd1306-image-display
- micropython-waveshare-e-paper-drivers
- micropython-camera-driver-for-esp32
- esp32-cheap-yellow-display-micropython-lvgl
---

## Overview

The MicroPython-ST7735 project provides a robust and flexible driver for the ST7735 series of 1.8-inch TFT LCD displays. Originally based on GuyCarver's implementation, this version has been optimized for MicroPython on modern microcontrollers like the ESP32 and Raspberry Pi Pico. It addresses common issues with display offsets and color mapping found in various hardware clones.

## Versatile Display Support

One of the primary challenges with ST7735 displays is the variety of "tab" versions (Red, Green, Blue) which often require different initialization sequences and pixel offsets. This driver addresses this by providing specific initialization methods:

- `initr()`: For Red Tab versions.
- `initg()`: For Green Tab versions.
- `initb()` / `initb2()`: For different Blue Tab variants.

Additionally, the driver includes a `rgb()` method to toggle between RGB and BGR color orders, ensuring correct color reproduction regardless of the specific LCD module's internal wiring.

## Key Features

The driver implements a comprehensive set of drawing primitives and utility functions:

- **Text Rendering**: Support for custom fonts with a nowrap option to prevent text from breaking across lines unexpectedly.
- **Geometric Shapes**: High-level functions for drawing pixels, lines, rectangles, and circles (both hollow and filled).
- **Vertical Scrolling**: Built-in support for defining vertical scroll areas and performing hardware-accelerated scrolling.
- **Image Support**: A dedicated utility for rendering 24-bit BMP files directly from the MicroPython filesystem.
- **FrameBuffer Integration**: Support for offscreen frame buffers using MicroPython's native `FrameBuffer` class, allowing for flicker-free animations and complex graphics processing in RAM before updating the display.

## Hardware Integration

The driver utilizes the standard MicroPython `machine.SPI` and `machine.Pin` classes, making it highly portable. While it is tested extensively on the ESP32 and Raspberry Pi Pico, it can be adapted to any MicroPython-supported board with an SPI interface.

### ESP32 Pin Configuration Example

| LCD Pin | ESP32 Pin |
|---------|-----------|
| RST     | IO17      |
| DC (A0) | IO16      |
| MOSI    | IO13      |
| SCK     | IO14      |
| CS      | IO18      |

## Getting Started

To use the driver, you need to upload `ST7735.py` and a font file (like `sysfont.py`) to your microcontroller. Below is a basic example of initializing the display and drawing a simple shape:

```python
from ST7735 import TFT
from machine import SPI, Pin

# Configure SPI
spi = SPI(2, baudrate=20000000, polarity=0, phase=0, sck=Pin(14), mosi=Pin(13))

# Initialize TFT (spi, dc, reset, cs)
tft = TFT(spi, 16, 17, 18)
tft.initr()
tft.rgb(True)
tft.fill(TFT.BLACK)

# Draw a red line
tft.line((0, 0), (127, 159), TFT.RED)

# Display text
from sysfont import sysfont
tft.text((10, 10), "Hello MicroPython!", TFT.WHITE, sysfont)
```

## Advanced Usage

For more complex applications, the repository includes `tftbmp.py` for displaying images and `offscreen-buffer.py` for high-performance graphics. The offscreen buffer approach is particularly useful for the Raspberry Pi Pico, where the available RAM allows for a full 128x160 16-bit buffer, enabling smooth transitions and complex UI elements.
