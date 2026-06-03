---
title: rtt-ssd1306 OLED Driver Package
summary: A driver package for RT-Thread supporting OLED displays based on SSD1306,
  SH1106, SH1107, and SSD1309 controllers. It provides a comprehensive graphics API
  for drawing shapes, text, and managing display buffers over I2C and SPI interfaces.
slug: rtt-ssd1306-oled-driver-package
codeUrl: https://github.com/luhuadong/rtt-ssd1306
star: 8
version: v1.0.0
lastUpdated: '2023-03-24'
rtos: rt-thread
topics:
- mcu
- rt-thread
- rt-thread-rtos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- thingpulse-oled-ssd1306-driver
- rt-thread-fbtft-framebuffer-drivers-for-tft-lcds
- rt-u8g2-u8g2-graphics-library-for-rt-thread
- sgp30-gas-sensor-driver-for-rt-thread
- lvgl-display-and-touchpad-drivers-for-esp32
- dhtxx-sensor-driver-for-rt-thread
---

## Overview

The rtt-ssd1306 package is a specialized driver for RT-Thread designed to interface with popular monochrome OLED display controllers. It supports a wide range of hardware, including the ubiquitous SSD1306, as well as SH1106, SH1107, and SSD1309. Originally inspired by the stm32-ssd1306 project, this implementation has been ported and optimized specifically for the RT-Thread ecosystem, providing a seamless integration for developers working with small display modules.

## Key Features

This package offers a robust set of features for embedded display management:

- **Broad Controller Support**: Compatible with SSD1306, SH1106, SH1107, and SSD1309.
- **Flexible Interfaces**: Supports both I2C and SPI communication protocols. While it currently emphasizes software I2C for maximum compatibility, support for hardware-accelerated I2C and SPI is part of the development roadmap.
- **Rich Graphics API**: Includes a full suite of drawing functions for pixels, lines, rectangles, circles, and arcs.
- **Text Rendering**: Provides built-in font support for printing characters and strings directly to the display.
- **RT-Thread Integration**: Fully compatible with the RT-Thread package manager, making it easy to include in any BSP via menuconfig.

## Technical Implementation

The driver operates by maintaining a local frame buffer that represents the display's state. Drawing operations are performed on this buffer, and the `ssd1306_UpdateScreen()` function is called to flush the buffer to the physical display over the selected serial interface. This approach minimizes bus traffic and allows for complex drawing operations without flickering.

### API Highlights

The package provides a clean C interface for display control:

```c
// Initialize the display
void ssd1306_Init(void);

// Basic drawing operations
void ssd1306_DrawPixel(uint8_t x, uint8_t y, SSD1306_COLOR color);
void ssd1306_Line(uint8_t x1, uint8_t y1, uint8_t x2, uint8_t y2, SSD1306_COLOR color);
void ssd1306_DrawCircle(uint8_t par_x, uint8_t par_y, uint8_t par_r, SSD1306_COLOR color);

// Text and buffer management
char ssd1306_WriteString(char* str, FontDef Font, SSD1306_COLOR color);
void ssd1306_UpdateScreen(void);
```

## Getting Started

To use the ssd1306 package in an RT-Thread project, users can enable it through the RT-Thread online package manager. The configuration path is located under `peripheral libraries and drivers`. Once selected, the package can be updated into the project using the `pkgs --update` command. The repository includes an `examples` directory containing test scripts to help developers quickly verify their hardware connections and display functionality.
