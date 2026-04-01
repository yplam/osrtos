---
title: LVGL Barebones Example for Sunton ESP32-2432S028R
summary: A barebones example demonstrating the usage of LVGL and the ESP-IDF LVGL
  port on the Sunton 2432S028R (Cheap Yellow Display). It targets the ESP32 MCU using
  FreeRTOS and ESP-IDF v5.2+ to drive ILI9341 or ST7789 displays with XPT2046 touch
  support.
slug: lvgl-barebones-example-for-sunton-esp32-2432s028r
codeUrl: https://github.com/limpens/esp32-2432S028R
lastUpdated: '2024-06-16'
licenses:
- MIT
rtos: freertos
libraries:
- lvgl
topics:
- esp-idf
- esp32
- esp32-2432s028
- lvgl
isShow: false
createdAt: '2026-04-01T00:03:12+00:00'
updatedAt: '2026-04-01T00:03:12+00:00'
---

The Sunton 2432S028R, widely known in the maker community as the "Cheap Yellow Display" (CYD), is a versatile development board that packs an ESP32, a 2.8-inch color touchscreen, and several peripherals into an affordable package. While many examples for this board rely on the Arduino framework, this project provides a streamlined, barebones template for developers who prefer the professional Espressif IoT Development Framework (ESP-IDF).

### Modern LVGL Integration

This project serves as a practical demonstration of integrating LVGL v9.1.0 using the `esp_lvgl_port` component. By leveraging the modern `esp_lcd` driver architecture, the project ensures efficient communication between the ESP32 and the display controller. This approach is highly recommended for ESP-IDF v5.x projects as it provides a standardized way to handle display flushing and input device polling within the FreeRTOS environment.

### Hardware and Driver Support

The repository is designed to handle the subtle hardware variations found in different revisions of the Sunton board. The codebase supports both the ILI9341 and ST7789 display drivers. Generally, older boards equipped only with a micro-USB port utilize the ILI9341 driver, while newer revisions featuring both micro-USB and USB-C connectors typically use the ST7789. 

Configuration is handled through the build system. For example, to target older boards, developers can define the `CYD_ILI9341` flag within the `CMakeLists.txt` file. For touch interaction, the project includes a driver for the XPT2046 resistive touch controller, integrated via the `esp_lcd_touch_xpt2046` component.

### Project Architecture

The firmware is organized into distinct modules to keep the initialization logic clean and readable:

*   **lcd.c**: Handles the initialization of the SPI bus and the specific LCD panel driver.
*   **touch.c**: Sets up the XPT2046 touch controller and attaches it to the LVGL input system.
*   **demo.c**: Contains the main application logic where the LVGL port is initialized and the user interface is defined.

### Technical Configuration

The project comes pre-configured with optimized defaults in the `sdkconfig.defaults` file. Notable settings include the enabling of the LVGL observer pattern (`CONFIG_LV_USE_OBSERVER`), the default dark theme, and built-in performance monitors. These monitors provide real-time feedback on CPU usage and frame rates, which is essential for optimizing UI performance on the ESP32.

By providing a clean starting point with all the necessary component dependencies defined in `idf_component.yml`, this project allows developers to skip the tedious setup of display and touch drivers and jump straight into building their application UI.
