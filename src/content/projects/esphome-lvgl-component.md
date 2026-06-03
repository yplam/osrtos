---
title: ESPHome LVGL Component
summary: An integration of the LVGL graphics library into the ESPHome ecosystem for
  ESP32-based displays. It provides custom components for UI elements like switches,
  checkboxes, and toggle buttons, utilizing the TFT_eSPI driver for hardware communication.
slug: esphome-lvgl-component
codeUrl: https://github.com/fvanroie/esphome-lvgl
star: 69
lastUpdated: '2021-09-20'
rtos: freertos
libraries:
- lvgl
- tft-espi
topics:
- esphome
- lvgl
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- lvgl-port-for-esp32
- lvgl-esphome-firmware-for-waveshare-esp32-p4-86-panel
- lvgl-display-and-touchpad-drivers-for-esp32
- openhasp-firmware
- esp-lvgl
- esp-e-paper-component
---

## Overview

ESPHome LVGL is a specialized integration that brings the powerful Light and Versatile Graphics Library (LVGL) to the ESPHome ecosystem. Designed primarily for ESP32-based devices, this project allows developers to create sophisticated, touch-enabled graphical user interfaces (GUIs) within the familiar YAML-based configuration environment of ESPHome. By bridging the gap between high-level IoT configuration and low-level graphics rendering, it enables the creation of interactive control panels and dashboards for smart home applications.

## Key Features

The project introduces several custom components that map LVGL widgets to ESPHome entities. This allows users to interact with their hardware through a variety of on-screen elements:

- **Custom UI Components**: Includes dedicated classes for `LvglSwitch`, `LvglCheckbox`, and `LvglToggleButton`, making it easy to create interactive controls.
- **TFT_eSPI Integration**: Leverages the popular TFT_eSPI library for high-performance display driving, supporting a wide range of SPI-based displays like the ILI9341.
- **Touch Support**: Built-in handling for touch input, including calibration data support directly within the ESPHome configuration.
- **Boot Logo Support**: Includes a mechanism to display a splash screen or boot logo upon device startup.
- **Flexible Configuration**: Most display parameters, including pin assignments, SPI frequency, and display rotation, are configurable via build flags in the YAML file.

## Technical Architecture

The core of the project is the `LvglComponent`, which inherits from the standard ESPHome `Component` class. This component manages the LVGL lifecycle, including initialization, display buffer management, and the periodic execution of the LVGL timer handler. 

To ensure smooth performance on the ESP32, the project utilizes a high-frequency loop requester to minimize delays in the main execution loop. It also implements critical callbacks for display flushing (`gui_flush_cb`) and touchpad reading (`my_touchpad_read`), which are optimized using `IRAM_ATTR` for faster execution on the ESP32 architecture.

## Implementation Details

The project is configured via a standard ESPHome YAML file. Below is an example of how custom switches are registered and rendered on the display:

```yaml
switch:
  - platform: custom
    lambda: |-
      auto my_switch1 = new LvglSwitch(50,50,80,45);
      App.register_component(my_switch1);
      return {my_switch1};
    switches:
      name: "My Switch 1"
```

Memory management is handled through a dedicated LVGL memory pool, typically configured to 48kB, ensuring that the graphical objects have sufficient resources without starving the main ESPHome application. The display interface is highly customizable, supporting features like anti-aliasing, chroma keying for images, and various font sizes (Montserrat 12, 16, 18, and 22 are pre-configured).

## Hardware Compatibility

While the project is demonstrated using the Lolin D32 Pro and an ILI9341 display, the underlying use of TFT_eSPI and LVGL makes it adaptable to various ESP32 development boards and display modules. Users can modify the `platformio_options` in the configuration file to match their specific hardware setup, including adjusting SPI pins and display dimensions.
