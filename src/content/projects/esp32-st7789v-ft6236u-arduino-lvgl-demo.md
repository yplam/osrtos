---
title: ESP32 ST7789V FT6236U Arduino LVGL Demo
summary: A comprehensive demo project for ESP32 using the LVGL v8.3.4 graphics library,
  featuring support for the ST7789 display and FT6236 touch controller. It includes
  various UI examples such as music players, widgets, and performance benchmarks.
codeUrl: https://github.com/zanjie1999/esp32-st7789v-ft6236u-arduino
isShow: false
rtos: freertos
libraries:
- lvgl
- tft-espi
topics:
- arduino
- ft6236
- lvgl
- platormio
- st7789
star: 15
lastUpdated: '2023-02-20'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- rp2040-lvgl-8-demo-with-ili9488-and-xpt2046
- lvgl-8-on-wt32-sc01-with-arduino
- jc3248w535-lvgl-v9-test-project
- jc4827w543-lvgl-v9-implementation
- esp-lvgl
- sc01-plus-hmi-example-with-squareline-studio
---

Building modern, responsive user interfaces on embedded hardware has become significantly easier with the evolution of the Light and Versatile Graphics Library (LVGL). This project demonstrates a complete implementation of LVGL v8.3.4 on the popular ESP32 platform, specifically tailored for a 1.3-inch 240x240 ST7789 display and an FT6236 capacitive touch controller.

## Hardware and Performance

The project is optimized for the ESP32 running at 240MHz, providing enough processing power to handle complex UI transitions and animations. The display interface is managed via the `TFT_eSPI` library, which is a high-performance graphics driver for Arduino-based ESP32 projects. By combining this with the `FT6236` touch driver, the project achieves a smooth, smartphone-like interaction experience on a small form-factor screen.

## Software Architecture

The repository is structured as a PlatformIO project, making it easy to compile and deploy. It leverages several key components:

- **LVGL (v8.3.4):** The core graphics engine used to render widgets, animations, and handle input events.
- **TFT_eSPI:** Acts as the display driver layer, handling the SPI communication with the ST7789 controller.
- **FT6236 Driver:** A dedicated library for the capacitive touch panel, ensuring accurate coordinate mapping for user input.
- **Arduino Framework:** Provides the high-level API for hardware abstraction on the ESP32.

## Included Demos

One of the most valuable aspects of this repository is the inclusion of several standard LVGL demo applications. These serve as excellent stress tests and templates for developers:

- **Music Player:** A sophisticated UI showing off list scrolling, album art rendering, and playback controls.
- **Widgets Demo:** Showcases the variety of built-in LVGL components like buttons, sliders, charts, and switches.
- **Benchmark:** Measures the rendering performance (frames per second) of the ESP32 and display setup.
- **Stress Test:** Pushes the system to its limits with rapid UI changes to ensure stability.

## Getting Started

To use this project, you will need an ESP32 development board and a compatible ST7789/FT6236 display module. The project is configured via `platformio.ini`, which sets the CPU frequency to 240MHz and the monitor speed to 115200 baud. 

```ini
[env:esp32dev]
platform = espressif32
board = esp32dev
framework = arduino
monitor_speed = 115200
upload_speed = 921600
board_build.f_cpu = 240000000L
```

The `TFT_eSPI` configuration is handled through `User_Setup.h`, where the pin definitions for the SPI bus (MOSI, SCLK, CS, DC, RST) must be aligned with your specific hardware wiring. Once configured, the `main.cpp` initializes the display buffer, registers the input device, and starts the LVGL timer handler to keep the UI responsive.
