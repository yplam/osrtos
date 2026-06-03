---
title: LVGL Extended Demos
summary: A collection of specialized and niche demo applications for the Light and
  Versatile Graphics Library (LVGL). It provides self-contained examples such as eBike
  interfaces and smartwatch stress tests designed for embedded systems and high-performance
  GUI development.
slug: lvgl-extended-demos
codeUrl: https://github.com/lvgl/lv_demos
siteUrl: https://lvgl.io
star: 543
version: v5.2-rc
lastUpdated: '2025-10-17'
rtos: ''
libraries:
- lvgl
topics:
- embedded-gui
- example
- graphics-library
- littlevgl
- lvgl
- tutorial
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lvgl-demo-test
- esp-lvgl
- lvgl-demo-embarcadores
- lvgl-display-and-touchpad-drivers
- lvgl-for-embedded-linux
- esp32-st7789v-ft6236u-arduino-lvgl-demo
---

## Overview

The lv_demos repository serves as an extended collection of demo applications for the Light and Versatile Graphics Library (LVGL). While the core LVGL library includes standard benchmarks and basic examples, this repository focuses on niche, specialized, and high-fidelity demos that showcase advanced features and real-world use cases for embedded graphical user interfaces.

These demos are designed to be modular and self-contained, allowing developers to easily integrate them into existing projects to evaluate hardware performance or to use as a foundation for specific product categories like wearables or light electric vehicles.

## Key Demo Applications

The repository currently features several high-quality demos, each targeting a specific embedded application profile:

*   **eBike Demo**: A comprehensive interface designed for electric bicycles, showcasing complex data visualization, status indicators, and navigation-style layouts.
*   **Smartwatch Demo**: A stress test and UI showcase for wearable devices, featuring smooth animations, circular layouts, and performance-intensive graphical elements.

## Technical Integration

The project is built with flexibility in mind, supporting multiple build systems common in the embedded world, including CMake, PlatformIO, and standard Makefiles. It utilizes a conditional compilation strategy based on feature guards. By defining specific flags in the `lv_conf.h` file, developers can include only the demos they need, which helps in managing binary size for resource-constrained microcontrollers.

### Using with CMake

The recommended integration method is via CMake's `FetchContent` module. This allows the demos to be pulled directly into a project's build tree and linked against the LVGL library. Because these demos depend on LVGL, they must be added to the project configuration after the core library has been defined.

```cmake
# Example integration snippet
include(FetchContent)
FetchContent_Declare(
    lv_demos_ext
    GIT_REPOSITORY https://github.com/lvgl/lv_demos
    GIT_TAG master
)
FetchContent_MakeAvailable(lv_demos_ext)

# Link the demos to your application
target_link_libraries(my_app PRIVATE lv_demos_ext)
```

## Usage and Configuration

Once integrated, enabling a demo is as simple as setting a definition in your configuration file. For example, to enable the eBike demo, you would define `LV_USE_DEMO_EBIKE 1` in your `lv_conf.h`. 

In the application code, the demos are initialized with simple function calls following the standard LVGL initialization sequence:

```c
#include "lv_demos_ext.h"

int main(void) {
    lv_init();
    
    /* Initialize and display the eBike demo */
    lv_demo_ebike();
    
    while(1) {
        uint32_t sleep_ms = lv_timer_handler();
        lv_sleep_ms(sleep_ms);
    }
    
    return 0;
}
```

## Ecosystem Compatibility

This repository is fully compatible with the broader LVGL ecosystem, including the `lv_port_linux` simulator and various RTOS environments. It serves as an essential resource for developers looking to push the boundaries of what is possible with embedded graphics on hardware ranging from ARM Cortex-M microcontrollers to high-end application processors.
