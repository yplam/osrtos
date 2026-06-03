---
title: MicroPython MAX7219 8x8 LED Matrix Library
summary: A MicroPython driver for the MAX7219 8x8 LED matrix, supporting SPI communication
  and cascading multiple displays. It integrates with the native framebuf module to
  provide easy drawing of text, shapes, and animations on ESP32, ESP8266, and PyBoard
  platforms.
slug: micropython-max7219-8x8-led-matrix-library
codeUrl: https://github.com/mcauser/micropython-max7219
star: 205
lastUpdated: '2018-11-11'
rtos: ''
libraries:
- micropython
topics:
- framebuf
- led-matrix
- max7219
- micropython
- spi
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- led-matrix-max7219-for-mongoose-os
- micropython-tm1637-library
- micropython-waveshare-e-paper-drivers
- micropython-st7735-tft-lcd-driver
- st7789-driver-for-micropython
- lvgl-for-raspberry-pi-pico-hub75-led-matrix
---

The MicroPython MAX7219 library provides a clean and efficient way to interface with the popular MAX7219 8x8 LED matrix driver. Designed specifically for the MicroPython ecosystem, it leverages the hardware SPI interface to drive single or multiple cascaded LED matrices, making it an ideal choice for scrolling text displays, status indicators, and simple animations on microcontrollers like the ESP32, ESP8266, and PyBoard.

One of the standout features of this library is its integration with MicroPython's native `framebuf` module. Because the library maps the LED matrix to a `FrameBuffer`, developers gain access to a rich set of drawing primitives. This includes drawing pixels, lines, rectangles, and text, as well as performing screen-wide operations like scrolling and filling without needing to manually manipulate bits.

## Cascading and Scalability

The library is built with scalability in mind. By specifying the number of matrices in a chain during initialization, the driver automatically manages the memory buffer and SPI transmissions required to update the entire display. This allows for long horizontal displays composed of several 8x8 modules (such as the common 4-in-1 modules) to be treated as a single continuous drawing surface.

## Hardware Compatibility

The driver is highly portable across different MicroPython-supported hardware. It has been tested and documented for several popular platforms:
- **PyBoard**: Using standard SPI pins (e.g., SPI1 on X-series pins).
- **ESP8266**: Optimized for stability by adjusting SPI baud rates to handle signal integrity over jumper wires.
- **ESP32**: Supporting flexible pin assignments for SCK, MOSI, and CS using the machine.SPI and machine.Pin classes.

## Getting Started

To use the library, you simply initialize an SPI object and pass it to the `Matrix8x8` class along with a Chip Select (CS) pin and the count of matrices in your chain.

```python
import max7219
from machine import Pin, SPI

# Initialize SPI and the display (e.g., 4 matrices in a row)
spi = SPI(1, baudrate=10000000, polarity=0, phase=0)
display = max7219.Matrix8x8(spi, Pin(15), 4)

# Draw some text
display.fill(0)
display.text('Hi!', 0, 0, 1)
display.show()
```

The library also supports advanced graphics operations through the `framebuf` API. For instance, you can draw geometric shapes or scroll the entire buffer:

```python
display.fill(0)
display.rect(0, 0, 8, 8, 1)    # Draw a border on the first matrix
display.line(0, 0, 32, 8, 1)   # Draw a diagonal across 4 matrices
display.scroll(-8, 0)          # Shift the entire display 8 pixels left
display.show()
```

## Technical Implementation

Internally, the `Matrix8x8` class acts as a wrapper around a `bytearray` buffer. It uses the `MONO_HLSB` format, which is compatible with the way the MAX7219 expects data for its 8 rows. Since MicroPython's native classes sometimes have limitations regarding direct inheritance, the library uses a composition-based approach to expose `framebuf` methods directly on the display object. This ensures a seamless API while maintaining high performance for SPI data transfers.
