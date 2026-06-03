---
title: STM32CubeMX and ucglib for Color Displays
summary: A port of the ucglib graphics library for STM32 microcontrollers using STM32CubeMX
  and the HAL framework. It supports ST7735 and ILI9341 display drivers via 4-wire
  SPI or 8-bit parallel interfaces, providing a foundation for color TFT display integration
  on Nucleo and other STM32 boards.
slug: stm32cubemx-and-ucglib-for-color-displays
codeUrl: https://github.com/harebit/STM32CubeMX_and_ucglib
star: 0
lastUpdated: '2018-03-11'
rtos: ''
libraries:
- ucglib
topics:
- 8bit
- colour-display
- cubemx
- ili9341
- parallel
- spi
- st7735
- stm32cubemx
- system-workbench-for-stm32
- ucglib
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- lvgl-port-for-stm32f429-discovery-kit
- lvgl-port-for-stm32f769-discovery
- rt-thread-fbtft-framebuffer-drivers-for-tft-lcds
- stm32f4-display-and-ethernet-example
- lvgl-port-for-esp32
- cmsis-drivers-for-efm32-and-stm32
---

The STM32CubeMX and ucglib project provides a practical implementation for driving color TFT displays using the popular ucglib library on STM32 microcontrollers. By leveraging the STM32 HAL (Hardware Abstraction Layer) and STM32CubeMX for initial configuration, this repository simplifies the process of adding graphical output to embedded projects.

## Supported Hardware and Interfaces

The project focuses on two widely used display drivers: the ST7735 and the ILI9341. These are commonly found in small to medium-sized TFT modules with resolutions such as 132x132 and 320x240. 

One of the key strengths of this implementation is its support for multiple communication protocols:
- **4-wire SPI**: A standard serial interface that minimizes pin count, configured as a Transmit Only Master.
- **8-bit Parallel**: A faster interface for higher data throughput, requiring more GPIO pins but offering better refresh rates for larger displays.

## Integration with STM32CubeMX

The project is designed to work seamlessly with STM32CubeMX. The documentation provides specific guidance on configuring the SPI1 peripheral and GPIO pins. For SPI mode, the project uses software-controlled Chip Select (NSS) and "Transmit Only Master" mode. For the 8-bit parallel interface, it details the specific port mappings required to drive the data and control lines (Reset, CS, D/C, WR, RD) across various STM32 ports.

## Memory Management and Optimization

A common challenge when using graphics libraries like ucglib on microcontrollers is flash memory consumption, primarily due to large font sets. This project addresses the "Flash overflowed" error by providing a pruned version of `ucg_pixel_font_data.c` and corresponding headers. This optimization allows the library to fit comfortably within the flash limits of standard STM32 devices while still providing essential typography. Users can further customize the font selection to balance between visual variety and memory usage.

## Software Architecture

The core of the integration lies in the `ucg_com_stm32_hal.c` file, which acts as the bridge between the ucglib generic communication calls and the STM32 HAL functions. This modular approach makes it easier to adapt the code to different STM32 series (such as F1, F4, or L4) by simply regenerating the CubeMX project and ensuring the HAL calls remain consistent.

The repository includes an `examples.c` file that demonstrates how to initialize the display and perform basic drawing operations. This serves as a reference for developers to build their own graphical user interfaces, handling the low-level driver initialization so the developer can focus on the application logic.
