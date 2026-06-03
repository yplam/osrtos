---
title: ESP32 LVGL 8.x SDSPI Template
summary: A comprehensive ESP-IDF project template for ESP32 and ESP32-S3 that integrates
  LVGL 8.x with the LovyanGFX display driver. It features a shared SPI bus for SD
  card storage and provides pre-configured setups for multiple hardware targets like
  the WT32-SC01 and FeatherS3.
codeUrl: https://github.com/sukesh-ak/ESP32-LVGL8x-SDSPI
siteUrl: https://github.com/sukesh-ak/ESP32-LVGL8x-SDSPI
isShow: false
rtos: freertos
libraries:
- lvgl
topics:
- esp-idf
- esp32
- esp32-s3
- lovyangfx
- lvgl
star: 46
lastUpdated: '2022-10-16'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- lvgl-port-for-esp32
- lvgl-display-and-touchpad-drivers-for-esp32
- esp32-tux
- esp-lvgl
- wt32-sqln-wt32-sc01-plus-with-squareline-studio-and-lvgl
- bsp-for-wireless-tag-wt32-sc01-plus-sc01-esp-idf-5-x-lvgl-9-x
---

Building sophisticated user interfaces on embedded systems often requires juggling display drivers, touch controllers, and storage peripherals. The **ESP32-LVGL8x-SDSPI** project by Sukesh Ashok Kumar provides a robust template for developers using the ESP-IDF framework to create high-quality UIs with LVGL 8.x and LovyanGFX, specifically optimized for ESP32 and ESP32-S3 microcontrollers.

### A Unified Approach to Display Hardware
One of the standout features of this project is its ability to adapt to different screen resolutions and hardware configurations without changing the core application code. By leveraging the **LovyanGFX** library as the underlying driver, the project supports a wide array of displays. The repository includes pre-configured header files for popular hardware, such as:

*   **Wireless Tag WT32-SC01**: A 3.5" TFT Touch Display (ESP32).
*   **Unexpected Maker FeatherS3**: Paired with an Adafruit 2.4" TFT Featherwing (ESP32-S3).
*   **Unexpected Maker TinyS3**: Paired with a 1.3" ST7789 TFT (ESP32-S3).

Switching between these targets is as simple as changing a single header inclusion in the `main.cpp` file, making it an excellent starting point for cross-platform development.

### Technical Highlights and Architecture
The project is structured to promote clean code and separation of concerns. The UI logic is isolated within `gui.hpp`, while hardware-specific initialization is handled by helper files like `helper_display.hpp` and `helper_storage.hpp`. 

Key technical capabilities include:
*   **Thread-Safe UI Updates**: It implements `lvgl_acquire()` and `lvgl_release()` functions to safely update the UI from different FreeRTOS tasks.
*   **Shared SPI Bus**: A common challenge in ESP32 projects is sharing the SPI bus between a display and an SD card. This template provides a working implementation for SDSPI alongside the display driver.
*   **Resolution Independence**: The UI code is designed to adapt fluidly to different screen sizes.
*   **Dynamic UI Elements**: The demo includes battery meter animations, SD card status icons, and the ability to toggle between Light and Dark themes at runtime.

### Getting Started
To use this project, you need the ESP-IDF environment set up. The project uses submodules for its main dependencies, so cloning requires the recursive flag:

```bash
# Clone repo and update submodules (LovyanGFX + LVGL)
git clone https://github.com/sukesh-ak/LVGL8x-SDSPI.git
cd LVGL8x-SDSPI
git submodule update --init --recursive
```

Building for specific targets is streamlined through the use of separate build folders. For example, to build for the WT32-SC01 (ESP32):

```bash
idf.py -B build-esp32 set-target esp32 build
idf.py -B build-esp32 -p [PORT] flash monitor
```

### UI and Configuration
The project demonstrates how to use the custom `lv_conf.h` setup within the ESP-IDF build system by setting compile options in `CMakeLists.txt`. This allows for a highly portable configuration that doesn't rely on modifying the library source code directly. Whether you are building a handheld device with a small 1.3" screen or a larger 3.5" control panel, this template provides the scaffolding necessary to get your project off the ground quickly with professional-grade graphics and reliable storage integration.
