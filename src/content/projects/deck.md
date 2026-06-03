---
title: Deck
summary: Deck is a high-performance ESP32-based dashboard project that ports the fluid
  X-TRACK UI framework to the Arduino platform using LVGL. It features 60 FPS animations
  on a 1.3-inch IPS display and uses a three-button interface to simulate rotary encoder
  navigation.
codeUrl: https://github.com/SmallPond/Deck
isShow: false
rtos: freertos
libraries:
- lvgl
- tft-espi
- nimble
topics:
- eps32
- lvgl
star: 42
lastUpdated: '2021-11-06'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- clawdmeter
- lvgl-8-on-wt32-sc01-with-arduino
- esp32-p4-grid-board
- x-knob-a-smart-knob-based-on-lvgl-ui-framework
- lilygo-t-display-s3-boilerplate
- esp32berry
---

Deck is an ambitious embedded UI project that brings a premium, smartphone-like interface to the ESP32 platform. Inspired by the popular [Peak](https://github.com/peng-zhihui/Peak) project by peng-zhihui and the [X-TRACK](https://github.com/FASTSHIFT/X-TRACK) cycle computer UI, Deck focuses on achieving a "silky smooth" 60 FPS user experience on low-cost hardware. 

### Hardware Architecture
The project is built around the ubiquitous **ESP32-Doit-Devkit-V1**. It utilizes a 1.3-inch IPS display (240x240 resolution) driven via SPI. While many similar projects rely on rotary encoders for navigation, Deck implements a clever logic that uses three physical buttons (Enter, Left, Right) to simulate encoder behavior, making it easier to build with standard tactile switches.

**Pin Mapping:**
- **Display (SPI):** MOSI (GPIO 23), SCLK (GPIO 18), DC (GPIO 2), RST (GPIO 4), BLK (GPIO 15)
- **Input Buttons:** ENTER (GPIO 12), LEFT (GPIO 33), RIGHT (GPIO 25)

### Software and UI Framework
At its core, Deck leverages the **LVGL (Light and Versatile Graphics Library)** version 8.0. To achieve the target 60 FPS, the developer modified parts of the underlying libraries to optimize rendering performance on the ESP32. The project structure follows an iOS-inspired ViewController pattern, allowing for complex screen transitions and organized application logic.

One of the standout features of the Deck software is its animation system. It uses an `lv_anim_timeline_wrapper_t` class to manage multiple concurrent animations. This is facilitated by a convenient macro, `ANIM_DEF`, which allows developers to define start times, target objects, attributes, and easing paths in a clean, declarative way.

```c
#define ANIM_DEF(start_time, obj, attr, start, end) \
     {start_time, obj, LV_ANIM_EXEC(attr), start, end, 500, lv_anim_path_ease_out, true}

lv_anim_timeline_wrapper_t wrapper[] = {
    ANIM_DEF(0, ui.cont, width, 0, lv_obj_get_style_width(ui.cont, 0)),
    ANIM_DEF(500, ui.labelLogo, x, lv_obj_get_x(ui.labelLogo)+80, lv_obj_get_x(ui.labelLogo)),
    LV_ANIM_TIMELINE_WRAPPER_END
};

lv_anim_timeline_add_wrapper(ui.anim_timeline, wrapper);
```

### Customization and Extensibility
Deck is designed to be a foundation for further development. Users can easily add their own assets by converting images to C arrays using the LVGL online image converter (True Color with Alpha) and registering them in the `ResourcePool.cpp`. The project also includes integrated support for **NimBLE** for Bluetooth connectivity and **MPU9250** for motion sensing, providing a robust starting point for creating smart dashboards, wearable devices, or IoT controllers.

### Getting Started
The project is configured for **PlatformIO**, making dependency management straightforward. By cloning the repository and opening it in VS Code with the PlatformIO extension, developers can compile and flash the project to an ESP32 dev board. The README provides specific guidance on hardware wiring and troubleshooting button inputs, noting that certain GPIOs (13, 14, 26) may experience conflicts in specific hardware configurations.
