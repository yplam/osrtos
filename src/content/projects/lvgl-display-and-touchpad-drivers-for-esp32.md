---
title: LVGL Display and Touchpad Drivers for ESP32
summary: A comprehensive collection of display and input device drivers for the ESP32
  SoC, specifically designed to interface with the LVGL graphics library. It supports
  a wide variety of TFT, monochrome, and e-Paper controllers using SPI and I2C interfaces
  within the ESP-IDF framework.
slug: lvgl-display-and-touchpad-drivers-for-esp32
codeUrl: https://github.com/lvgl/lvgl_esp32_drivers
star: 427
lastUpdated: '2021-12-23'
rtos: freertos
libraries:
- lvgl
topics:
- esp-idf
- esp32
- lvgl
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lvgl-port-for-esp32
- lvgl-display-and-touchpad-drivers
- esp-lvgl
- esp32-lvgl-8-x-sdspi-template
- esp32-smartdisplay
- esphome-lvgl-component
---

## Overview

The `lvgl_esp32_drivers` repository provides a robust set of hardware abstraction layers for the ESP32, enabling the popular Light and Versatile Graphics Library (LVGL) to communicate with various display and touch controllers. As an ESP-IDF component, it simplifies the process of bringing up graphical user interfaces on embedded hardware by handling the low-level SPI and I2C transactions, pin configurations, and controller-specific initialization sequences.

## Extensive Hardware Support

One of the primary strengths of this project is its broad support for common display controllers found in the hobbyist and industrial embedded markets. The drivers cover several categories of display technology:

*   **TFT Displays**: Supports popular controllers like the ILI9341, ST7789, ILI9488, and the high-performance FT81x (EVE) series.
*   **Monochrome Displays**: Includes support for SSD1306 (OLED), SH1107, and the classic PCD8544 (Nokia 5110).
*   **e-Paper Displays**: Provides drivers for GDEW0154M10 and GDEW0154M09 (using UC8151D and JD79653A controllers).

Beyond displays, the repository includes drivers for various touch controllers such as the XPT2046 (resistive), FT6X36 (capacitive), and STMPE610. It even supports specialized inputs like the FT81x's integrated touch engine.

## Predefined Development Kits

To accelerate development, the project includes predefined configurations for several popular ESP32 development boards. By selecting a kit in the configuration menu, the driver automatically assigns the correct GPIOs and display parameters. Supported kits include:

*   M5Stack and M5Stack Core2
*   ESP Wrover Kit v4.1
*   TTGO T-Display and Camera Plus
*   Adafruit 3.5 Featherwing
*   Wemos Lolin OLED

## Technical Features and Architecture

The drivers are built to be thread-safe and efficient. A notable feature is the integration of the **I2C Manager**, which solves the common issue of non-thread-safe I2C access in ESP-IDF. This allows LVGL to poll a touch sensor on the same bus used by other tasks without causing resource contention.

### Backlight Control

The project includes a dedicated backlight control module that operates independently of the display driver. It offers three modes of operation:
1.  **Off**: No control.
2.  **Switch**: Simple ON/OFF GPIO control.
3.  **PWM**: Brightness control using the ESP32's LEDC peripheral for smooth dimming.

### SPI Bus Management

The drivers are highly configurable via Kconfig (`menuconfig`). Users can define SPI host selection (SPI2/HSPI or SPI3/VSPI), clock speeds (up to 40MHz or higher depending on the controller), and bus sharing settings. The `lvgl_spi_conf.h` file manages these definitions, ensuring that the SPI bus is correctly shared between the display and the touch controller if they reside on the same pins.

## Integration and Contribution

Integrating these drivers into an ESP-IDF project is straightforward. Because it is structured as a component, developers simply need to include the repository in their `components` directory. The project uses the standard ESP-IDF build system (CMake), making it compatible with modern versions of the SDK.

For developers using unsupported hardware, the project provides a clear path for contribution. The `CONTRIBUTE_CONTROLLER_SUPPORT.md` guide outlines how to implement the necessary LVGL callbacks—such as `flush_cb` for displays or `read_cb` for input devices—and how to register them within the driver's initialization logic.
