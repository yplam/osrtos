---
title: Zephyr LVGL Sample for nRF52840 MDK
summary: A sample project demonstrating the integration of the LVGL graphics library
  with Zephyr RTOS on the nRF52840 MDK development board. It provides a complete configuration
  for driving a 240x240 ST7789 IPS display via SPI, including necessary driver patches
  and device tree overlays.
slug: zephyr-lvgl-sample-for-nrf52840-mdk
codeUrl: https://github.com/JON95Git/lvgl-nrf52840-mdk-sample
siteUrl: https://wiki.makerdiary.com/nrf52840-mdk/
star: 17
lastUpdated: '2022-07-04'
rtos: zephyr
libraries:
- lvgl
topics:
- lvgl
- nrf52840
- st7789
- zephyr-rtos
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- st7789-and-lvgl-demo-for-apache-nuttx-rtos
- smalltv-pro-esp-idf-sample-project
- zj-tek-rt-thread-nimble-littlevgl-nordic-project
- lvgl-demo-embarcadores
- zig-lvgl-touchscreen-app-on-apache-nuttx-rtos
- lvgl-test-app-for-apache-nuttx
---

## Overview

This project serves as a practical reference for developers looking to implement graphical user interfaces on Nordic Semiconductor's nRF52840 SoC using the Zephyr RTOS. Specifically, it demonstrates how to use the LVGL (Light and Versatile Graphics Library) to create widgets on a 240x240 IPS display controlled by the Sitronix ST7789V driver.

The sample is tailored for the nRF52840 MDK, a small development kit that breaks out the pins of the nRF52840, making it an ideal platform for prototyping IoT devices with visual feedback requirements.

## Hardware Integration

The project utilizes a standard SPI interface to communicate with the ST7789 display. The connection between the nRF52840 MDK and the display is defined as follows:

| nRF52840_mdk | ST7789 |
|--------------|------------|
| P0.28 | RES |
| P0.29 | DC (CMD) |
| P0.27 | SCK (SCL) |
| P0.26 | MOSI (SDA) |

To ensure the display operates correctly with the Zephyr SPI driver, the project highlights a specific requirement for the SPI transfer mode. Users must modify the Zephyr driver at `zephyr/drivers/display/display_st7789v.c` to include `SPI_TRANSFER_MSB` and `SPI_MODE_CPOL` flags in the initialization macro. This ensures the timing and data alignment match the requirements of the ST7789V controller.

## Software Configuration

The project relies on Zephyr's modular configuration system. The `prj.conf` file enables the necessary subsystems, including GPIO, SPI, and the display driver stack. Key configurations include:

- **Display Stack**: Enabling `CONFIG_ST7789V` and `CONFIG_DISPLAY` to handle the low-level pixel pushing.
- **LVGL Integration**: Enabling `CONFIG_LVGL` along with specific color depth settings (`CONFIG_LV_COLOR_DEPTH_16`) and memory management options to optimize performance on the nRF52840's RAM.
- **Device Tree**: The `nrf52840_mdk.overlay` file maps the logical display device to the physical SPI pins and defines controller-specific parameters like porch settings, gamma curves, and display dimensions.

## Technical Implementation

The application utilizes Zephyr's Device Tree (DTS) to abstract the hardware. By defining the display as the `zephyr,display` chosen node, the LVGL module can automatically bind to the correct hardware instance. The SPI frequency is tuned to 20MHz to provide a balance between refresh rate and signal integrity over jumper wires.

## Getting Started

Building the project requires the Zephyr development environment and the `west` tool. The standard build command targets the `nrf52840_mdk` board:

```bash
west build -p auto -b nrf52840_mdk
west flash
```

Once flashed, the board initializes the ST7789V display and renders LVGL widgets, such as meters or buttons, providing a starting point for more complex embedded GUI applications.
