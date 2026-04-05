---
title: BSP for Wireless Tag WT32-SC01 Plus/SC01 (ESP-IDF 5.x + LVGL 9.x)
summary: A Board Support Package for Wireless Tag WT32-SC01 series boards utilizing
  ESP-IDF 5.x and LVGL 9.x. It provides integrated drivers for ST7796 LCDs and FT5x06
  touch controllers, alongside support for SPIFFS and uSD card storage on ESP32 and
  ESP32-S3 platforms.
slug: bsp-for-wireless-tag-wt32-sc01-plus-sc01-esp-idf-5-x-lvgl-9-x
codeUrl: https://github.com/sukesh-ak/BSP-IDF5-ESP_LCD-LVGL9
siteUrl: https://www.sukesh.me
lastUpdated: '2024-05-26'
licenses:
- MIT
rtos: freertos
libraries:
- lvgl
- spiffs
topics:
- bsp
- esp-bsp
- esp-idf
- esp-lcd
- esp32
- lvgl
- wt32-sc01
- wt32-sc01-plus
isShow: false
createdAt: '2026-04-05T01:00:03+00:00'
updatedAt: '2026-04-05T01:00:03+00:00'
---

Developing sophisticated graphical user interfaces on embedded hardware often requires navigating the complexities of display drivers, touch controllers, and graphics libraries. This project simplifies that process for the Wireless Tag WT32-SC01 and WT32-SC01 Plus boards by providing a robust Board Support Package (BSP) built on the latest ESP-IDF 5.x framework and the LVGL 9.x graphics library.

## Modern Graphics with LVGL 9 and ESP-IDF

The core of this repository is the integration of `ESP_LCD` components with the `LVGL 9.x` ecosystem. By utilizing the `ESP_LVGL_PORT` from the official Espressif BSP, the project ensures that the display and touch inputs are handled efficiently within the FreeRTOS environment. One of the standout features of this implementation is the support for LVGL 9's `lv_Observer` pattern, which allows for more reactive and data-driven UI development compared to previous versions.

## Hardware Support: WT32-SC01 vs. WT32-SC01 Plus

The project targets two primary hardware configurations from Wireless Tag, each with its own specific driver requirements:

### WT32-SC01 Plus (ESP32-S3)
This version leverages the power of the ESP32-S3 MCU. It utilizes an 8-bit parallel interface for the ST7796 LCD driver, providing high-speed data transfer for smooth UI transitions. It also features a capacitive touch interface driven by the FT5x06 controller. The BSP includes configurations for both internal SPIFFS storage and external uSD cards, making it a versatile choice for data-heavy applications.

### WT32-SC01 (ESP32)
For the standard ESP32-based WT32-SC01, the project uses a serial (SPI) interface for the ST7796 driver. While this version is currently noted as a work in progress, it aims to provide the same high-level API access to the LVGL 9 library, ensuring code portability across the product family.

## Technical Implementation and Configuration

The project is structured to take advantage of the ESP-IDF component manager. Key dependencies like the `esp_lcd_st7796` and `esp_lcd_touch_ft5x06` drivers are managed as external components, ensuring they stay updated with the latest bug fixes from the Espressif registry. 

A critical aspect of this implementation is the handling of the LVGL configuration. Unlike many standard setups, this project uses a custom `lv_conf.h` to fine-tune memory usage and feature sets. This requires a specific configuration step in `idf.py menuconfig` to ensure the build system respects the local header file over the default library settings.

## Building and Deployment

The repository uses specific `sdkconfig` defaults to manage the hardware differences between the S3 and standard ESP32 models. Building for the WT32-SC01 Plus is straightforward using the following commands:

```bash
# Build with WT32-SC01 Plus specific configuration
idf.py -D SDKCONFIG_DEFAULTS="sdkconfig.wt32sc01plus" build
idf.py -p <PORT> flash monitor
```

For the standard WT32-SC01, the configuration switch ensures the SPI drivers and correct pin mappings are applied:

```bash
# Build with WT32-SC01 specific configuration
idf.py -D SDKCONFIG_DEFAULTS="sdkconfig.wt32sc01" build
idf.py -p <PORT> flash monitor
```

## Storage and Peripherals

Beyond just graphics, the BSP provides a foundation for full application development. It includes integrated support for filesystem management via SPIFFS, which is useful for storing UI assets like icons and fonts. The inclusion of uSD card support allows for logging or larger media storage, while PWM-based brightness control is handled through the LEDC peripheral, allowing for energy-efficient display management.
