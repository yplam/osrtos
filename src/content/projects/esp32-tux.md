---
title: ESP32-TUX
summary: ESP32-TUX is a comprehensive Touch UX template for ESP32 and ESP32-S3 microcontrollers,
  leveraging the LVGL graphics library and LovyanGFX driver. It provides a ready-to-use
  framework for building sophisticated HMI applications with features like Wi-Fi provisioning,
  OTA updates, and theme switching across various 3.5-inch display modules.
codeUrl: https://github.com/sukesh-ak/ESP32-TUX
siteUrl: https://tux.sukesh.me
isShow: true
image: /202512/tux-design.webp
rtos: freertos
libraries:
- lvgl
- spiffs
topics:
- esp-idf
- esp32
- lovyangfx
- lvgl
- wt32-sc01
- wt32-sc01-plus
star: 266
lastUpdated: '2024-02-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
---

ESP32-TUX is a sophisticated open-source template designed to jumpstart the development of Touch User Interfaces (TUX) on ESP32 and ESP32-S3 platforms. Developed by Sukesh Ashok Kumar, this project bridges the gap between raw hardware drivers and polished application-level UI, providing developers with a robust foundation for building Human-Machine Interfaces (HMI).

### Hardware and Driver Foundation
The project is built upon the powerful **ESP-IDF** framework (specifically targeting version 5.0) and utilizes **LovyanGFX** as the primary graphics and touch driver. LovyanGFX is renowned in the ESP32 community for its performance and broad support for various display controllers. On top of this, **LVGL 8.x** is used to handle the UI elements, widgets, and event management. 

ESP32-TUX currently supports several popular 3.5-inch display modules out of the box, including:
- **WT32-SC01**: ESP32 with SPI TFT (ST7796)
- **WT32-SC01 Plus**: ESP32-S3 with 8-bit Parallel TFT (ST7796UI)
- **Makerfabs ESP32-S3**: Available in both 16-bit Parallel and SPI variants using the ILI9488 controller.

### Key Features and Capabilities
One of the standout features of ESP32-TUX is its flexibility. It includes built-in support for UI scaling across different resolutions and the ability to rotate between Landscape and Portrait modes without requiring extensive code changes. 

Other notable features include:
- **Theme Switching**: Easily toggle between Light and Dark modes.
- **Wi-Fi Provisioning**: Integrated support for SoftAP and BLE provisioning using the Espressif Provisioning App.
- **OTA Updates**: Over-the-air update capabilities integrated with `esp_events`.
- **Filesystem Integration**: Seamless access to SPIFFS and SD Card partitions, mapped directly to the LVGL filesystem as `F:/` and `S:/` respectively.
- **Thread Safety**: Support for updating the UI from different tasks using `lvgl_acquire` and `lvgl_release` patterns.

### The TUX_PANEL Widget
To simplify UI development, the project introduces the `tux_panel` widget. This custom component allows developers to create consistent "UI Islands" with headers, titles, and content areas. 

```c++
// Example: Creating a TUX_PANEL
lv_obj_t *panel1 = tux_panel_create(parent, LV_SYMBOL_EDIT " CONFIG", 200);

// Set the common panel style
lv_obj_add_style(panel1, &style_ui_island, 0);

// Get Content Area of the panel to add UI elements
lv_obj_t *cont1 = tux_panel_get_content(panel1);

// Add a label to the content area
lv_obj_t *lbl_version = lv_label_create(cont1);
lv_label_set_text(lbl_version, "Firmware Version 1.1.0");
```

### Architecture and Organization
The repository is well-organized, separating core logic into components and helpers. The `main/helpers` directory contains essential utilities for storage (FatFS, SPIFFS), display initialization, and SNTP time synchronization. The UI logic is largely contained within `gui.hpp`, while device-specific configurations are handled via header files in the `main/devices` folder. This modular approach allows developers to add support for new controllers or displays by simply creating a new configuration header.

### Getting Started
For those looking to test the project quickly, a web installer is available at [tux.sukesh.me](https://tux.sukesh.me), requiring only a USB cable and a compatible browser. Developers wishing to build from source should have ESP-IDF 5.0 installed. The project utilizes a custom CMake setup to manage LVGL configurations and provides helpful compile-time information to the console, making debugging and environment verification straightforward.
