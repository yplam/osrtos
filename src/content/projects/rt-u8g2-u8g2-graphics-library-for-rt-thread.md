---
title: 'RT-U8G2: U8g2 Graphics Library for RT-Thread'
summary: A comprehensive port of the U8g2 monochrome display library to the RT-Thread
  RTOS. It supports over 200 types of monochrome screens and provides extensive font
  and drawing capabilities for embedded user interfaces.
slug: rt-u8g2-u8g2-graphics-library-for-rt-thread
codeUrl: https://github.com/wuhanstudio/rt-u8g2
siteUrl: http://wuhanstudio.cc
star: 78
version: v3.0.0
lastUpdated: '2023-09-21'
rtos: rt-thread
libraries:
- u8g2
topics:
- i2c
- rt-thread
- spi
- ssd1306
- u8g
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rtt-ssd1306-oled-driver-package
- arduino-rt-thread-library
- termbox-for-rt-thread
- littlevgl2rtt
- lvgl-port-for-esp32
- rt-thread-fbtft-framebuffer-drivers-for-tft-lcds
---

## Overview

RT-U8G2 is a specialized port of the popular U8g2 monochrome display library for the RT-Thread real-time operating system. Originally developed for the Arduino platform, U8g2 has become a standard for driving monochrome OLEDs and LCDs in the embedded world. This project brings that versatility to RT-Thread, allowing developers to easily integrate high-quality graphics, diverse fonts, and complex user interfaces into their RTOS-based projects.

## Key Features

The library is known for its extensive hardware support and feature-rich API. By using RT-U8G2, developers gain access to:

- **Broad Hardware Compatibility**: Support for nearly 200 types of monochrome screens, including popular controllers like the SSD1306, ST7920, and SH1106.
- **Flexible Interfacing**: Support for Hardware SPI, Software SPI, Hardware I2C, Software I2C, and 8080 parallel interfaces.
- **Rich Graphics Library**: Built-in functions for drawing lines, rectangles, circles, and bitmaps, as well as advanced logic operations.
- **Extensive Font Support**: Includes over 100 fonts and icons, with full support for Unicode and UTF-8, enabling multi-language displays including Chinese, Korean, Japanese, and Devanagari.
- **Interactive Elements**: Built-in support for user button detection and menu systems.

## Technical Implementation

RT-U8G2 is designed to integrate seamlessly with the RT-Thread package manager. It leverages RT-Thread's device drivers for I2C and SPI communication, ensuring that the library can run on any hardware platform supported by the RTOS. While the default testing and examples are often centered around the STM32F103, the port is generic enough to work across different architectures provided the RT-Thread BSP is correctly configured.

The project structure includes a dedicated `port` directory that handles the abstraction between the U8g2 core and the RT-Thread hardware abstraction layer (HAL). This allows for easy switching between hardware-accelerated communication and GPIO-based software emulation.

## Getting Started

Integrating RT-U8G2 into an RT-Thread project is handled through the Env tool or RT-Thread Studio. Users can enable the package under the peripheral libraries and drivers section:

```text
RT-Thread online packages
    peripheral libraries and drivers --->
        [*] U8G2: a u8g2 package for rt-thread
            [*] Use hardware spi
            [*] Use hardware i2c
            U8G2 Examples  --->
```

The repository includes over 50 examples ranging from basic "Hello World" scripts to complex games like Space Trash and T-Rex, as well as sophisticated icon-based menus and weather display interfaces. These examples demonstrate both the Page Buffer and Full Frame Buffer modes, allowing developers to balance memory usage against performance requirements.

## Optimization and Performance

For resource-constrained embedded systems, RT-U8G2 provides several optimization paths. Developers can enable C99 compilation and high-level compiler optimizations (-O3) to reduce the flash footprint. Additionally, the library allows for the selective inclusion of fonts, which is critical for saving memory when only a few characters or specific icons are needed. For performance-critical applications, switching from software-simulated I2C/SPI to hardware-backed drivers provides a significant boost in frame rates.
