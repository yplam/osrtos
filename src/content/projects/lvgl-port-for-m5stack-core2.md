---
title: LVGL Port for M5Stack Core2
summary: A port of the Light and Versatile Graphics Library (LVGL) for the M5Stack
  Core2 development kit based on the ESP32. It utilizes the ESP-IDF framework and
  FreeRTOS to provide a high-performance graphical user interface on the device's
  integrated display, including support for the AXP192 power management chip.
slug: lvgl-port-for-m5stack-core2
codeUrl: https://github.com/imliubo/lvgl_port_M5Core2
star: 18
lastUpdated: '2021-09-22'
rtos: freertos
libraries:
- lvgl
- lwip
- spiffs
topics:
- axp192
- esp32
- lvgl
- m5core2
- m5stack
- v8
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lvgl-port-for-esp32
- m5dial-lvgl
- lvgl-8-on-wt32-sc01-with-arduino
- micropython-and-lvgl-firmware-for-esp32
- esp-lvgl
- esp32-8048s050c-with-lvgl-9-4-and-freertos
---

## Overview

The `lvgl_port_M5Core2` project provides a specialized implementation of the Light and Versatile Graphics Library (LVGL) for the M5Stack Core2. The M5Stack Core2 is a popular ESP32-based development kit that features an integrated 2.0-inch capacitive touch screen, built-in power management, and various sensors, making it an ideal target for sophisticated embedded user interfaces.

This repository serves as a foundation for developers looking to build responsive, touch-enabled applications on the M5Core2 using the ESP-IDF (Espressif IoT Development Framework). By integrating LVGL with the underlying FreeRTOS kernel, the project ensures that UI rendering and touch handling occur efficiently alongside other system tasks.

## Technical Architecture

The project is built on the ESP-IDF build system, utilizing CMake for configuration and compilation. The architecture leverages several key components of the ESP32 ecosystem:

*   **FreeRTOS Integration**: The system uses FreeRTOS for task scheduling, ensuring that the LVGL timer handler and display flushing routines are executed at appropriate intervals.
*   **Display and Touch Drivers**: The port includes the necessary drivers to interface with the Core2's display controller and capacitive touch panel.
*   **Power Management**: A significant portion of the configuration is dedicated to the AXP192 Power Management Integrated Circuit (PMIC). The project configures the various LDO and DC-DC outputs required to power the ESP32, the LCD backlight, and other peripherals on the Core2 board.
*   **Memory Management**: The configuration enables SPIRAM (PSRAM) support, which is crucial for LVGL applications that require large frame buffers or complex image assets.

## Key Features

*   **Optimized Rendering**: Configured for 16-bit color depth with byte swapping enabled, matching the native requirements of the integrated LCD.
*   **Touch Input**: Integrated support for the capacitive touch interface, allowing for interactive UI elements like buttons, sliders, and lists.
*   **Hardware Acceleration**: Utilizes ESP32-specific optimizations, including IRAM-resident functions for performance-critical memory operations.
*   **Peripheral Support**: Includes configurations for I2C management, which is essential for communicating with the PMIC and touch controller.

## Hardware Configuration

The project is pre-configured for the specific hardware layout of the M5Stack Core2. This includes:
*   **ESP32-D0WD SoC**: Running at 240MHz.
*   **External PSRAM**: Initialized during boot to expand available heap memory.
*   **I2C Bus 0**: Dedicated to internal peripherals like the AXP192 and the touch screen.
*   **SPI Flash**: Configured for 16MB of storage using DIO mode at 40MHz.

## Getting Started

To use this port, developers need a functional ESP-IDF development environment. Because the project uses the standard ESP-IDF structure, it can be compiled using the `idf.py build` command. The `sdkconfig` file provided in the repository contains the optimized settings for the M5Core2, including the LVGL feature set (widgets like arcs, charts, and tables) and font selections (Montserrat 12-20).

Developers can add their own application logic in the `main` directory, utilizing the LVGL API to create screens and widgets. The project is configured to use the default LVGL theme with dark mode enabled, providing a professional look out of the box for M5Stack devices.
