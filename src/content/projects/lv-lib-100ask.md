---
title: lv_lib_100ask
summary: A comprehensive collection of out-of-the-box UI components and enhanced interfaces
  for the LVGL graphics library. It provides ready-to-use modules such as a Pinyin
  input method, page manager, file explorer, and NES simulator for embedded platforms.
slug: lv-lib-100ask
codeUrl: https://github.com/100askTeam/lv_lib_100ask
siteUrl: http://lvgl.100ask.net
star: 126
version: v9.0.0
lastUpdated: '2024-10-11'
rtos: freertos
libraries:
- lvgl
- micropython
topics:
- 100ask
- lvgl
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lvgl-display-and-touchpad-drivers
- esp-lvgl
- lvgl-display-and-touchpad-drivers-for-esp32
- esp32-tux
- lvgl-port-for-esp32
- lv-chinese-ime
---

## Overview

`lv_lib_100ask` is a versatile extension library for the Light and Versatile Graphics Library (LVGL). It serves as a reference for out-of-the-box UI schemes and provides enhanced interfaces for various LVGL components. The project is designed to simplify the development of complex embedded user interfaces by providing pre-built modules that are commonly needed in IoT and handheld device projects.

## Key Components and Features

The library is modular, allowing developers to enable only the components they need through a configuration header. Some of the standout features include:

*   **Pinyin IME (Input Method Editor):** An enhanced interface for Chinese character input using Pinyin, which is essential for localized embedded applications.
*   **Page Manager:** A dedicated system for managing screen transitions, including support for custom animations and automatic memory management (deleting old pages to save RAM).
*   **Sketchpad:** A drawing board component built on top of the LVGL canvas, supporting customizable dimensions.
*   **File Explorer:** A reference implementation for navigating embedded file systems, featuring a quick access bar and path management.
*   **NES Simulator:** A game simulator module that allows running NES titles within an LVGL application, with platform-specific support for POSIX, FreeRTOS, and RT-Thread.
*   **Calculator and Games:** Includes a functional calculator component and classic games like 2048 and a memory puzzle game, serving as excellent references for application logic within LVGL.
*   **Screenshot Utility:** A tool to capture the current screen state, often used for debugging or documentation purposes.

## Technical Implementation

The project is highly portable and integrates seamlessly into various build systems. It includes a `CMakeLists.txt` for modern build environments (including specific support for the ESP-IDF platform), a `Kconfig` for kernel-style configuration, and a `library.properties` file for Arduino/PlatformIO compatibility. 

Configuration is handled similarly to LVGL itself. Users copy a template configuration file (`lv_lib_100ask_conf_template.h`) to their project root, rename it to `lv_lib_100ask_conf.h`, and enable the desired features. This approach ensures that the library remains lightweight by only compiling the code for active components.

## Platform Support

While the library is primarily RTOS-agnostic, it contains specific optimizations and configurations for:
*   **ESP32 (ESP-IDF):** Dedicated CMake logic and platform definitions.
*   **FreeRTOS & RT-Thread:** Specific platform hooks, particularly for the NES simulator.
*   **MicroPython:** Integration support for using these components within a MicroPython environment.

## Getting Started

To use `lv_lib_100ask`, the directory should be placed alongside the `lvgl` directory in your project. After setting up the `lv_lib_100ask_conf.h` file, you can initialize and use the components by including the main header:

```c
#include "lv_lib_100ask.h"

/* Example: Creating a simple 2048 game */
#if LV_USE_100ASK_2048
    lv_100ask_2048_simple_test();
#endif
```

The library is open-source and encourages community contributions to expand the collection of available UI schemes and components.
