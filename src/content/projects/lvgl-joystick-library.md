---
title: LVGL Joystick Library
summary: A virtual joystick implementation for the LVGL (Light and Versatile Graphics
  Library) framework. It provides a simple API for creating interactive on-screen
  controls for ESP-IDF and Arduino-based embedded systems, featuring customizable
  styles and position-based callbacks.
slug: lvgl-joystick-library
codeUrl: https://github.com/0015/LVGL_Joystick
star: 16
version: 1.0.0
lastUpdated: '2025-02-20'
rtos: freertos
libraries:
- lvgl
topics:
- arduino-library
- esp-idf
- esp-idf-component
- joystick-library
- lvgl
- lvgl9
- touchscreen
- virtual-joystick
isShow: false
createdAt: '2026-02-08'
updatedAt: '2026-02-08'
relatedProjects:
- m5dial-lvgl
- lvgl-port-for-esp32
- espui
- jc4827w543-lvgl-v9-implementation
- esphome-lvgl-component
- x-knob-a-smart-knob-based-on-lvgl-ui-framework
---

## Overview

The LVGL Joystick Library is a specialized component designed to simplify the creation of virtual joysticks within the LVGL (Light and Versatile Graphics Library) ecosystem. Aimed at embedded developers working with touchscreens, this library provides a high-level interface for implementing directional controls that are common in robotics, remote controllers, and gaming applications.

Built with cross-platform compatibility in mind, the library seamlessly integrates into both ESP-IDF and Arduino environments. It abstracts the complexity of handling touch events and calculating coordinates, allowing developers to focus on application logic through a clean callback-based system.

## Key Features

- **Customizable Appearance**: Developers can define the radius and styles for both the joystick base and the movable stick, ensuring the control matches the overall UI theme.
- **Callback-Driven Architecture**: The library uses a position callback function that returns the joystick ID and the current X/Y coordinates, making it easy to map inputs to hardware actions.
- **Multi-Instance Support**: Multiple joysticks can be created on a single screen, each identifiable by a unique ID passed through the callback.
- **Framework Flexibility**: Full support for ESP-IDF as a component and Arduino as a standard library.

## Technical Implementation

The library operates by creating LVGL objects that represent the joystick's base and stick. It monitors touch input on these objects and calculates the displacement of the stick relative to the center of the base. The resulting coordinates are then normalized and passed to a user-defined callback function.

### API Reference

The primary entry point for the library is the `create_joystick` function:

```cpp
void create_joystick(
    lv_obj_t *parent,
    uint8_t joystick_id,
    lv_align_t base_align,
    int base_x,
    int base_y,
    int base_radius,
    int stick_radius,
    lv_style_t *base_style,
    lv_style_t *stick_style,
    joystick_position_cb_t position_callback)
```

This function allows for precise placement and sizing of the control. If custom styles are not provided (passed as `NULL`), the library utilizes sensible defaults to get the interface up and running quickly.

## Usage Example

Integrating the joystick into an LVGL project is straightforward. Below is a basic implementation showing how to initialize the joystick and handle its output:

```cpp
#include <lvgl.h>
#include <joystick.h>

// Callback to handle joystick movement
void joystick_position_callback(uint8_t joystick_id, int16_t x, int16_t y) {
    Serial.printf("Joystick ID: %d, Position - X: %d, Y: %d\n", joystick_id, x, y);
}

void ui_init() {
    lv_obj_t *screen = lv_scr_act();
    // Create a joystick centered on the screen
    create_joystick(screen, 1, LV_ALIGN_CENTER, 0, 0, 100, 25, NULL, NULL, joystick_position_callback);
}
```

## Current Limitations

As of the current version (compatible with LVGL 9.2.0), the library is subject to LVGL's core limitation regarding multi-touch support. While the library allows for the creation of multiple joysticks, users cannot interact with two joysticks simultaneously on most standard LVGL configurations. Support for simultaneous multi-joystick interaction is expected to improve as the underlying LVGL framework evolves its multi-touch event handling.
