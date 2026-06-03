---
title: Minimal LCD Demonstration on ESP-WROVER-KIT
summary: A minimalist demonstration for using the Ucglib graphics library on the ESP-WROVER-KIT-VE
  development board. It utilizes the Arduino framework within PlatformIO to drive
  an ILI9341 LCD controller via SPI, supporting both hardware and software SPI modes.
slug: minimal-lcd-demonstration-on-esp-wrover-kit
codeUrl: https://github.com/kekyo/esp-wrover-kit-lcd-demo
star: 3
lastUpdated: '2022-09-05'
rtos: freertos
libraries:
- ucglib
topics:
- esp-wrover-kit
- esp32
- hardware-spi
- ili9341
- lcd
- minimum
- platformio
- software-spi
- ucglib
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- smalltv-pro-esp-idf-sample-project
- rp2040-lvgl-8-demo-with-ili9488-and-xpt2046
- lvgl-barebones-example-for-sunton-esp32-2432s028r
- lilygo-t-display-s3-boilerplate
- jc3248w535-lvgl-v9-test-project
- jc4827w543-lvgl-v9-implementation
---

## Overview

The ESP-WROVER-KIT is one of Espressif's most versatile evaluation boards, featuring an integrated LCD, high-speed microSD slot, and a built-in USB-to-JTAG debugger. This project provides a streamlined entry point for developers looking to utilize the onboard ILI9341 display using the popular Ucglib library. It serves as a reference for setting up display drivers on the ESP32 platform using the Arduino framework and PlatformIO.

## Hardware and Display Integration

The project specifically targets the ESP-WROVER-KIT-VE (V1.4). This version of the board comes equipped with an ILI9341-based LCD. One of the primary advantages of this demonstration is its clarity in showing how to interface with the display. It offers two distinct methods for communication:

- **Hardware-based SPI**: Utilizes the ESP32's dedicated SPI peripherals for maximum performance and refresh rates.
- **Software-based SPI**: Provides a bit-banging approach which, while slower, can be useful for understanding the protocol or when pin flexibility is required.

Note that older versions of the ESP-WROVER-KIT might use different LCD controllers, making this specific implementation most suitable for the V1.4 hardware revision.

## Development Environment

Built using PlatformIO and the Arduino framework, the project is designed for modern embedded workflows. The `platformio.ini` configuration is pre-set to handle the specific requirements of the WROVER kit, including the `ftdi` debug tool settings. This allows developers to leverage the board's built-in FT2232H chip for JTAG debugging directly within VSCode. The project uses the `olikraus/Ucglib` library, which is a standard choice for color displays in the Arduino ecosystem due to its robust font support and drawing primitives.

## Debugging Capabilities

A notable feature of the ESP-WROVER-KIT is its integrated debugger. The project documentation highlights how to configure "Bit-bang JTAG mode" on the serial device driver to enable full source-level debugging. This allows for breakpoints and variable inspection in real-time within the VSCode environment, significantly improving the development experience compared to standard serial logging.

## Getting Started

To use this demo, developers need a compatible ESP-WROVER-KIT and a PlatformIO installation. The repository is structured to be opened directly as a PlatformIO project. The source code demonstrates the initialization of the Ucglib object with the correct pin mappings for the WROVER kit's layout. Because the board includes an FTDI chip, users can start debugging with the F5 key, though the documentation notes that the initial connection may take some time to establish.
