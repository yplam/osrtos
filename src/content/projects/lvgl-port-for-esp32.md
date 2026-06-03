---
title: LVGL Port for ESP32
summary: A comprehensive port of the Light and Versatile Graphics Library (LVGL) for
  the ESP32 SoC using the ESP-IDF framework. It provides a modular driver system for
  various display and touch controllers, integrated directly into the ESP-IDF build
  system and configuration menu.
slug: lvgl-port-for-esp32
codeUrl: https://github.com/lvgl/lv_port_esp32
star: 1243
version: v2.0
lastUpdated: '2022-12-13'
rtos: freertos
libraries:
- lvgl
topics:
- esp-idf
- esp32
- graphics
- lvgl
- ui
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lvgl-display-and-touchpad-drivers-for-esp32
- lvgl-port-for-m5stack-core2
- esp-lvgl
- m5dial-lvgl
- esphome-lvgl-component
- esp32-tux
---

The `lv_port_esp32` project serves as the official reference implementation for running the Light and Versatile Graphics Library (LVGL) on Espressif's ESP32 platform. It provides a ready-to-use environment that integrates the LVGL graphics stack with the ESP-IDF framework, allowing developers to create sophisticated graphical user interfaces for embedded devices using C or C++.

### Modular Driver Architecture
One of the core strengths of this port is its modularity. While the main repository handles the LVGL integration and demo logic, the hardware-specific code is managed through the `lvgl_esp32_drivers` component. This repository supports a vast array of display controllers, including the popular ILI9341, ST7789, and SSD1306, as well as touch controllers like the XPT2046 and STMPE610. This separation ensures that hardware-specific updates can be managed independently of the graphics library itself.

### Seamless ESP-IDF Integration
The project is designed to feel native to the ESP-IDF ecosystem. It leverages the Kconfig system, enabling developers to configure display pins, SPI bus speeds, display orientation, and LVGL-specific settings (such as memory pool size and font usage) directly through `idf.py menuconfig`. This eliminates the need to manually edit header files like `lv_conf.h` for most standard use cases, streamlining the development workflow.

### Hardware Support and Preconfigured Kits
The repository includes detailed documentation and pre-configured settings for several popular development kits, making it an excellent starting point for rapid prototyping. Supported hardware includes:

- **ESP-Wrover-Kit v4.1**: Featuring an integrated ILI9341 TFT screen.
- **M5Stack & M5StickC**: Popular modular development systems with built-in displays.
- **WEMOS LOLIN OLED**: Targeted at monochrome UI development using SSD1306 drivers.
- **Custom Dev Boards**: Flexible pin mapping for generic ESP32 and ESP32-S2 modules.

### ESP32-S2 and Memory Management
The port also addresses the specific hardware characteristics of the ESP32-S2 variant. Because the ESP32-S2 has different internal SRAM constraints and DMA capabilities compared to the original ESP32, the project implements specific memory allocation strategies. This ensures that large display buffers function correctly, even when dealing with the nuances of external PSRAM accessibility and DMA-capable memory regions.

### Getting Started
To get started, users typically clone the repository recursively to include the LVGL and driver submodules. The build process follows the standard ESP-IDF workflow, making it compatible with both the command line and various IDEs that support `idf.py`.

```c
#include "lvgl.h"
#include "demo.h"

int app_main(void)
{
    /* Initialize LVGL */
    lv_init();

    /* Initialize hardware drivers (Display & Input) */
    /* This is typically handled by the lvgl_esp32_drivers component */
    
    /* Create the UI demo */
    demo_create();

    /* Handle LVGL tasks in a loop */
    while (1) {
        vTaskDelay(pdMS_TO_TICKS(10));
        lv_task_handler();
    }

    return 0;
}
```

The project defaults to a comprehensive widget demo that showcases the library's capabilities, including buttons, sliders, charts, and complex animations, providing a clear template for building custom embedded applications.
