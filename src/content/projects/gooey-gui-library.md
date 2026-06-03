---
title: Gooey GUI Library
summary: A lightweight, cross-platform GUI library written in pure C, designed for
  native performance on Linux, Windows, and embedded platforms like ESP32. It provides
  a minimal footprint with a comprehensive suite of widgets and is highly customizable
  for resource-constrained environments.
slug: gooey-gui-library
codeUrl: https://github.com/BinaryInkTN/GooeyGUI
siteUrl: https://gooeyui.github.io/GooeyGUI/website/
star: 68
version: v1.0.2
lastUpdated: '2025-12-23'
rtos: ''
libraries:
- tft-espi
topics:
- arduino
- esp32
- gui
- lightweight
- linux
- opengl
- vulkan
- wayland
- windows
- x11
isShow: false
createdAt: '2026-01-12'
updatedAt: '2026-01-12'
relatedProjects:
- lvglpp-a-c-wrapper-for-lvgl
- lvgl-c-binding
- lvgl-rust-bindings
- 100ask-linux-lvgl-desktop
- espui
- esp-lvgl
---

## Overview

Gooey is an elegant, cross-platform GUI library written in pure C, designed to provide native performance with a minimal footprint. While it is fully capable of running on desktop environments like Windows and Linux, its architecture is specifically optimized for embedded solutions where resources are at a premium. By utilizing minimal dependencies and providing a highly modular configuration system, Gooey allows developers to build sophisticated user interfaces on microcontrollers and single-board computers without the overhead typical of modern GUI frameworks.

## Key Features

The library is built with a focus on portability and efficiency. Its "write once, build anywhere" philosophy ensures that UI code remains consistent across different operating systems and hardware architectures. 

**Core capabilities include:**
- **Pure C Implementation**: Ensures maximum portability and compatibility with various compilers and embedded toolchains.
- **Lightweight Architecture**: Designed to have a minimal memory footprint, making it suitable for devices with limited RAM.
- **Modular Widget System**: Developers can enable or disable specific widgets (like buttons, sliders, or plots) at compile-time to optimize binary size.
- **Embedded Optimization**: Includes specific support for ESP32 deployments, including integration with the TFT_eSPI library and virtual keyboard support for touchscreens.

## Technical Architecture

Gooey utilizes a backend abstraction layer that allows it to render using OpenGL or GLES, depending on the target platform. For desktop systems, it leverages standard graphics APIs, while for embedded systems like the ESP32, it can interface directly with display drivers. 

A central feature of the library is the `user_config.h` file, which serves as the primary configuration hub. This file allows developers to set system resource limits, such as the maximum number of timers, widgets per window, or data points in a plot. It also contains toggles for every widget type, ensuring that unused code is not compiled into the final binary.

## Supported Widgets

Gooey provides a comprehensive suite of UI components, including:
- **Basic Controls**: Buttons, Checkboxes, Radio Buttons, Sliders, and Switches.
- **Data Visualization**: Plot widgets for charts and Meter widgets for gauges.
- **Containers**: Layouts, Tabs, and generic Containers for organizing UI elements.
- **Advanced Elements**: WebViews, File Dialogs, Context Menus, and Drop Surfaces for drag-and-drop operations.
- **Multimedia**: Image support including static images and animated GIFs.

## Getting Started

Creating a basic window with a label in Gooey is straightforward, as demonstrated in the following example:

```c
#include <Gooey/gooey.h>

int main()
{
    Gooey_Init();
    GooeyWindow *win = GooeyWindow_Create("My Window", 400, 400, true);

    GooeyLabel *label_0 = GooeyLabel_Create("Hello World!", 18.0f, 164, 159);

    GooeyWindow_RegisterWidget(win, label_0);

    GooeyWindow_Run(1, win);
    GooeyWindow_Cleanup(1, win);

    return 0;
}
```

For embedded developers targeting the ESP32, the library provides specialized configuration options for screen rotation and virtual input, ensuring a smooth transition from desktop prototyping to hardware deployment.
