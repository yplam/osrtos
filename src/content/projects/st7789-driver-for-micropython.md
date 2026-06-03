---
title: ST7789 Driver for MicroPython
summary: A high-performance C-based driver for ST7789 display controllers in MicroPython.
  It supports ESP8266, ESP32, and STM32 platforms, providing fast drawing routines
  and support for various display resolutions including 240x240 and 135x240.
slug: st7789-driver-for-micropython
codeUrl: https://github.com/devbis/st7789_mpy
star: 222
lastUpdated: '2024-01-22'
rtos: ''
libraries:
- micropython
topics:
- esp32
- esp8266
- micropython
- micropython-driver
- st7789
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- micropython-st7789-lcd-driver
- micropython-st7735-tft-lcd-driver
- micropython-waveshare-e-paper-drivers
- three-ips-displays-with-st7789
- micropython-max7219-8x8-led-matrix-library
- micropython-camera-driver-for-esp32
---

## High-Performance Display Handling in MicroPython

The ST7789 is a popular and cost-effective display controller found in many small LCD screens used in hobbyist electronics and IoT devices. While MicroPython often relies on pure Python drivers for hardware peripherals, these can sometimes struggle with the high data throughput required for smooth display updates. This project provides a solution by implementing a dedicated ST7789 driver in pure C as a MicroPython user module.

By moving the drawing logic to C, the driver achieves significantly better performance than Python-based alternatives. This is particularly noticeable when performing operations like drawing lines or filling large areas of the screen, making it suitable for applications that require a more responsive user interface.

## Hardware and Platform Support

The driver is designed to be versatile, supporting common display variants such as the 240x240 and 135x240 pixel screens. It is currently compatible with several major MicroPython ports:

- **ESP8266**: A cost-effective Wi-Fi SoC.
- **ESP32**: A powerful dual-core MCU with integrated Wi-Fi and Bluetooth.
- **STM32**: A wide range of ARM Cortex-M based microcontrollers.

Because the driver is written in C, users must build their own MicroPython firmware to include the module. This process involves cloning the repository alongside the MicroPython source code and compiling with the `USER_C_MODULES` flag.

## Performance Benchmarks

Performance is the primary advantage of this driver. In comparative testing drawing a diagonal line on an ESP8266, this C-based driver completed the task in just 12ms, compared to 450ms for a pure Python implementation. This puts its performance on par with, or even faster than, optimized Arduino libraries for the same hardware.

## Drawing API and Features

The driver supports 16-bit colors in RGB565 format and provides a comprehensive set of drawing primitives. These methods are designed to be efficient, with horizontal and vertical line routines optimized to reduce the number of SPI calls.

Key methods include:
- `fill(color)`: Clears the entire screen.
- `pixel(x, y, color)`: Sets an individual pixel.
- `line(x0, y0, x1, y1, color)`: Draws a line between two points.
- `rect(x, y, w, h, color)` and `fill_rect(...)`: Draws or fills rectangles.
- `blit_buffer(buffer, x, y, w, h)`: Copies a byte buffer directly to the screen, useful for rendering images or complex frames.

## Practical Usage

To use the driver, you must initialize a hardware SPI bus and define the RESET and DC (Data/Command) pins. Below is an example of how to initialize the display on an ESP32:

```python
import machine
import st7789

# Configure SPI for ESP32 (VSPI)
spi = machine.SPI(2, baudrate=40000000, polarity=1, sck=machine.Pin(18), mosi=machine.Pin(23))

# Initialize display (240x240 resolution)
display = st7789.ST7789(
    spi, 
    240, 
    240, 
    reset=machine.Pin(4, machine.Pin.OUT), 
    dc=machine.Pin(2, machine.Pin.OUT)
)

display.init()
display.fill(st7789.RED)
```

## Advanced Integration

Beyond basic shapes, the driver includes helper functions like `color565` for color packing and `map_bitarray_to_rgb565` for font rendering. This makes it compatible with external tools like `micropython-font-to-py`, allowing developers to use high-resolution TTF fonts by converting them into bitarrays that the driver can quickly render to the screen.
