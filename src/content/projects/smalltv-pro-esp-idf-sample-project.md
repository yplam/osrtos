---
title: SmallTv-Pro ESP-IDF Sample Project
summary: A minimal ESP-IDF 5 sample project for the Smalltv-Pro hardware, demonstrating
  display control on its 240x240 LCD. It integrates the LVGL graphics library and
  provides a foundation for building custom firmware on this ESP32-based device.
slug: smalltv-pro-esp-idf-sample-project
codeUrl: https://github.com/jo-m/smalltv-pro-esp-idf
lastUpdated: '2025-02-18'
rtos: freertos
libraries:
- lvgl
topics:
- esp-idf
- esp32
- lcd
isShow: false
createdAt: '2026-03-31T23:28:06+00:00'
updatedAt: '2026-03-31T23:28:06+00:00'
---

The Smalltv-Pro is a compact, aesthetically pleasing hardware device featuring a vibrant 240x240 LCD display, commonly used as a smart weather clock or desktop accessory. While many users interact with this hardware through factory firmware or high-level home automation integrations, this project provides a professional-grade starting point for developers who want to leverage the full power of the Espressif IoT Development Framework (ESP-IDF).

Built specifically for version 5 of the ESP-IDF, the project serves as a reference implementation for initializing and driving the device's internal display. By using standard ESP-IDF components, developers gain fine-grained control over the hardware, enabling custom UI elements and optimized performance that high-level scripting environments might not support.

### Display and Graphics Integration

At the heart of the project is a dedicated display component designed to interface with the Smalltv-Pro's hardware. This component utilizes the `esp_lcd` driver to manage low-level communication with the screen. The implementation includes logic for both general display management and specific LCD initialization, abstracting the complexity of SPI or parallel communication into a clean API.

To make the most of the 240x240 resolution, the project integrates the Light and Versatile Graphics Library (LVGL). The configuration specifically targets a recent version of LVGL to ensure compatibility with modern ESP-IDF features and to include essential fixes for display refreshing. This setup allows developers to create rich user interfaces with buttons, animations, and widgets directly on the Smalltv-Pro.

### Technical Architecture

The repository follows a standard ESP-IDF project structure, making it easy to extend with additional features. Key architectural elements include:

- **Display Abstraction**: A modular component containing `display.c` and `lcd.c` that handles hardware-specific initialization.
- **Image Handling**: Integration of `esp_jpeg` allows the device to decode and display compressed images, which is crucial for memory-efficient icon and photo rendering.
- **Network Discovery**: The inclusion of mDNS support facilitates easy discovery of the device on a local network, allowing it to be found without hardcoding IP addresses.
- **Optimized Compilation**: The build system is configured with strict compiler flags (including shadow and sign-compare warnings) to ensure code quality and reliability.

### Getting Started

For those familiar with the ESP32 ecosystem, the workflow is straightforward. After exporting the ESP-IDF environment, the project can be built and flashed using the standard command-line tools:

```bash
source $IDF_PATH/export.sh

# Build and flash the project
idf.py build flash
```

This project is particularly valuable for developers looking to port existing ESP-IDF applications to the Smalltv-Pro or those wanting to create standalone gadgets that operate independently of external servers. While the project focuses on display output, it also identifies future expansion points, such as enabling the touch button mapped to GPIO 32, which would turn the device into a fully interactive desktop interface.
