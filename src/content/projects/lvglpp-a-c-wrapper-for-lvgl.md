---
title: 'lvglpp: A C++ Wrapper for LVGL'
summary: A comprehensive C++17 wrapper for the LVGL graphics library, providing object-oriented
  interfaces for widgets, displays, and input devices. It simplifies embedded GUI
  development by encapsulating C structures into classes with automated memory management
  and C++-style callbacks.
slug: lvglpp-a-c-wrapper-for-lvgl
codeUrl: https://github.com/vpaeder/lvglpp
star: 43
lastUpdated: '2022-09-08'
rtos: ''
libraries:
- lvgl
topics:
- embedded
- graphics
- gui
- lvgl
- wrapper
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lvgl-c-binding
- lv-modern-c-20-bindings-for-lvgl
- luavgl
- lvgl-micropython-bindings
- lvgl-rust-bindings
- lvgl-port-for-esp32
---

## Overview

lvglpp is a robust C++ wrapper designed for the [LVGL](https://github.com/lvgl/lvgl) (Light and Versatile Graphics Library). Developed to move away from the procedural C-style API of the original library, lvglpp provides a "bushy" set of C++ classes that encapsulate most of the LVGL version 8.3 functionality. By leveraging C++17 features, it offers a more intuitive, object-oriented approach to building user interfaces on embedded systems, specifically tested on platforms like the ESP32 with touch screen interfaces.

## Architecture and Design

The library is structured to mirror the directory layout of LVGL, making it easier for developers familiar with the original library to navigate the wrapper. It categorizes components into core, draw, font, misc, and widgets. The primary goal of the wrapper is to transform functions that take a specific LVGL object type as their first argument into class methods. For example, functions operating on `lv_obj_t*` are implemented as methods within the `Object` class.

### Smart Pointer Management

One of the core features of lvglpp is its approach to memory management. It utilizes a template class, `PointerWrapper<lv_class, lv_deleter>`, which stores a `unique_ptr` of a specific LVGL type with a custom deleter. This ensures that resources are properly freed when objects go out of scope. For UI components, a `Widget<lv_allocator>` template provides constructors to facilitate the nesting of objects, a common pattern in GUI development.

### Callback Handling

To maintain a C++ feel, lvglpp utilizes the `user_data` field provided by LVGL structures to store pointers to C++ objects or callback functions. This allows developers to use C++ member functions as callbacks for events, timers, and animations, though it does mean the `user_data` field is reserved for internal wrapper use.

## Key Components

The wrapper covers a vast array of LVGL types, including:

- **Core Objects**: `Display`, `Event`, `Group`, `InputDevice`, and the base `Object` class.
- **Drawing & Styles**: Descriptors for rectangles, labels, images, lines, and arcs, along with comprehensive `Style` and `Mask` support.
- **Widgets**: A full suite of wrapped widgets including `Button`, `Label`, `Chart`, `Calendar`, `Canvas`, `Keyboard`, `List`, `Meter`, and `Tabview`.
- **Miscellaneous**: Utilities for animations (`Animation`, `AnimationTimeline`), file systems, timers, and color palettes.

## Getting Started

To use lvglpp, you must have LVGL in your include paths and a compiler that supports C++17 or newer. Unlike the base LVGL library, you include the specific headers for the classes you intend to use. 

```cpp
#include "lvglpp/lvglpp.h"
#include "lvglpp/core/display.h"
#include "lvglpp/widgets/button.h"

using namespace lvgl::core;
using namespace lvgl::widgets;

void main() {
    // Initialize LVGL
    lvgl::init();

    // Create a button on the active screen
    auto btn = Button(scr_act());
    btn.center();

    // Main loop
    for (;;) {
        lv_tick_inc(10);
        lv_task_handler();
        // delay 10ms
    }
}
```

## Thread Safety and Concurrency

Like the underlying LVGL library, lvglpp is not thread-safe. When using it in a multi-threaded environment (such as with FreeRTOS on an ESP32), it is critical to protect calls to LVGL functions and the `lv_task_handler` with a mutex. The library documentation provides patterns for using `std::lock_guard` to ensure that object deletion (which happens when C++ wrappers go out of scope) occurs within a thread-safe context.

## Memory Footprint

While lvglpp adds a layer of abstraction, it is designed to be lightweight. Most wrapper classes only add approximately 12 bytes of overhead per object (a pointer and a boolean). This makes it a viable choice for most modern microcontrollers where the benefits of C++ development outweigh the minor increase in binary size and memory usage.
