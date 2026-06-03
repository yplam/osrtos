---
title: LVGL Touch Calibration System
summary: A ready-to-embed component for resistive touch panel calibration in LVGL
  projects. It handles transformation math to correct for panel misalignment, scale,
  and rotation, and provides a user-friendly calibration interface with NVS storage
  support.
slug: lvgl-touch-calibration-system
codeUrl: https://github.com/jakpaul/lvgl_touch_calibration
siteUrl: https://lvgl.io/
star: 27
version: v8
lastUpdated: '2024-04-27'
rtos: freertos
libraries:
- lvgl
topics:
- embedded-gui
- lvgl
- touchscreen
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- bsp-stm32-gt911-touch-panel-component
- lvgl-joystick-library
- lvgl-display-and-touchpad-drivers
- esp32-tux
- lvgl-port-for-esp32
- lvgl-port-for-stm32f769-discovery
---

## Overview

Resistive touch screens are a staple in embedded systems due to their low cost and durability, but they often suffer from a common issue: misalignment between the display pixels and the touch sensor layer. The LVGL Touch Calibration system provides a lightweight, portable solution for correcting these discrepancies. By guiding the user through a simple three-point calibration process, the library calculates the necessary transformation coefficients to ensure that touch coordinates map accurately to the UI elements on screen.

While the project is designed with portability in mind, it features deep integration with the ESP-IDF framework, including support for the ESP32 Non-Volatile Storage (NVS) to persist calibration data across reboots.

## Key Features

The library offers a comprehensive suite of features to make touch calibration robust and user-friendly:

- **Comprehensive Correction**: The system accounts for panel misalignment, scaling issues, and rotation. This means developers don't need to manually dial in prescaling numbers for different touch controllers.
- **Transformation Math**: It implements a three-point calibration algorithm that handles the linear transformation math required to map raw ADC values from a touch controller to screen coordinates.
- **Verification Mode**: After calibration, the system allows users to verify the results by showing a cursor at the touch position before accepting the new settings.
- **Safety Mechanisms**: To prevent a device from becoming unusable due to a faulty calibration (e.g., an accidental click), the system includes a configurable recalibration timeout. If the user doesn't accept the results within a certain timeframe, the process restarts.
- **Start Delay**: A configurable delay before the sequence begins prevents the initial touch (used to launch the calibration) from being falsely registered as the first calibration point.

## Technical Implementation

The component acts as a conversion layer between the raw input device and the LVGL library. It modifies an existing `lv_indev_t` object, utilizing its `user_data` field to store the original read callback while injecting its own transformation logic. 

When a touch event occurs, the library intercepts the raw coordinates, applies the calculated coefficients (A, B, C, D, E, and F), and passes the corrected coordinates to LVGL. This abstraction allows the rest of the application to remain completely unaware of the underlying calibration logic.

## Integration Example

Setting up the calibration system involves initializing the touch device and creating the calibration screen. Below is a typical initialization flow:

```c
#include "lv_tc.h"
#include "lv_tc_screen.h"

void init() {
    // Create and set up the standard LVGL input device
    lv_indev_t *indev = lv_indev_create();
    lv_indev_set_type(indev, LV_INDEV_TYPE_POINTER);
    lv_indev_set_read_cb(indev, your_indev_read_cb);

    // Initialize the calibrated touch wrapper
    lv_tc_indev_init(indev);

    // Create the calibration screen object
    lv_obj_t *tCScreen = lv_tc_screen_create();

    // Register a callback for when calibration is finished
    lv_obj_add_event_cb(tCScreen, your_tc_finish_cb, LV_EVENT_READY, NULL);

    // Load the screen and start the process
    lv_disp_load_scr(tCScreen);
    lv_tc_screen_start(tCScreen);
}
```

## Configuration and Customization

Developers can fine-tune the calibration experience through `lv_tc_config.h` or the ESP-IDF Kconfig menu. Options include:

- **UI Text**: Customizing the messages displayed during the start, ready, and recalibration phases.
- **Calibration Points**: While the system can automatically calculate optimal points based on screen resolution, users can manually define three points. Ideally, these should form a large triangle and avoid the extreme edges of the screen where resistive sensors are less linear.
- **Timeouts**: Adjusting the start delay and the automatic restart timeout to suit specific hardware or user experience requirements.

By providing a standardized way to handle touch offsets, this library simplifies the deployment of LVGL-based interfaces on a wide variety of resistive touch hardware.
