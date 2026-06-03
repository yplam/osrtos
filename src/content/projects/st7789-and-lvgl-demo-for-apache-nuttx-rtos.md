---
title: ST7789 and LVGL Demo for Apache NuttX RTOS
summary: A driver implementation and demonstration project for using ST7789 TFT displays
  with the LVGL graphics library on Apache NuttX RTOS. It provides specific configurations
  and SPI driver fixes for the Pine64 PineCone BL602 RISC-V microcontroller.
slug: st7789-and-lvgl-demo-for-apache-nuttx-rtos
codeUrl: https://github.com/lupyuen/st7789-nuttx
siteUrl: https://lupyuen.github.io/articles/st7789
star: 4
lastUpdated: '2022-04-01'
rtos: nuttx
libraries:
- lvgl
topics:
- bl602
- bl604
- lvgl
- nuttx
- pinecone
- pinedio
- riscv32
- spi
- st7789
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- lvgl-test-app-for-apache-nuttx
- zephyr-lvgl-sample-for-nrf52840-mdk
- pinedio-stack-bl604-on-apache-nuttx-rtos
- zig-lvgl-touchscreen-app-on-apache-nuttx-rtos
- rp2040-lvgl-8-demo-with-ili9488-and-xpt2046
- lvgl-barebones-example-for-sunton-esp32-2432s028r
---

## Overview

Integrating high-quality graphics into embedded systems often requires a robust RTOS and a versatile graphics library. This project demonstrates how to bring the ST7789 TFT display and the Light and Versatile Graphics Library (LVGL) to the Apache NuttX RTOS. While the implementation is tested on the Pine64 PineCone BL602 (a RISC-V based SoC), the principles and driver modifications apply to the broader NuttX ecosystem.

## Hardware Integration

The project focuses on connecting the BL602 to an ST7789 display via the Serial Peripheral Interface (SPI). A unique aspect of this implementation is the handling of the Data/Command (DC) pin. In many ST7789 modules, the DC pin is separate, but this project demonstrates a technique to control the DC signal by reconfiguring the SPI MISO pin as a GPIO on the fly, which is particularly useful for pin-constrained devices.

### Pin Configuration

The wiring for the BL602 to ST7789 setup is as follows:
- **GPIO 0**: DC (via MISO reconfiguration)
- **GPIO 1**: SDA (MOSI)
- **GPIO 3**: SCL (SCK)
- **GPIO 4**: RST (Reset)
- **GPIO 5**: BLK (Backlight)

## Technical Implementation and SPI Fixes

One of the critical contributions of this project is resolving specific SPI driver issues within the BL602 port of NuttX. The original `bl602_spi_poll_send()` function had a tendency to hang because it didn't properly enable the SPI Master or clear the FIFO. The project provides a fix that ensures the SPI Master is enabled and the FIFO is cleared before data transmission, a fix that has since been merged into the main NuttX repository.

Additionally, the project implements `SPI_CMDDATA` support for BL602. Because the ST7789 requires toggling a pin to distinguish between commands and data, the driver reconfigures the MISO pin from its SPI function to a software-controlled GPIO during transmission and reverts it afterward to allow for bus sharing with other peripherals.

## Software Configuration

Setting up the environment involves configuring NuttX via `menuconfig`. Key steps include:
1.  **Enabling SPI0** and the SPI Character Driver.
2.  **Activating the ST7789 Driver** under Graphic LCD Driver Support, setting the resolution to 240x240.
3.  **Enabling LVGL** and the built-in LVGL Demo application.
4.  **Configuring SPI Mode 3**, which is specifically required for ST7789 stability on the BL602 hardware.

## Running the LVGL Demo

Once configured, the system initializes the LCD driver during the board bring-up phase. The ST7789 appears as a standard character device at `/dev/lcd0`. The LVGL library then uses this device to render its graphical widgets. 

The project includes a demonstration of the standard LVGL widgets app, which handles initialization, buffer management, and task handling. When running, the system can refresh approximately 57,600 pixels in 1100ms, providing a functional graphical user interface on a RISC-V micro-controller.

## Community and Compatibility

This project serves as a bridge for developers looking to use modern UI tools on NuttX. It highlights the importance of driver-level stability, especially regarding SPI timing and pin multiplexing. While currently tested with LVGL version 7.3.0, it provides a foundation for future migrations to LVGL 8.x and beyond within the NuttX environment.
