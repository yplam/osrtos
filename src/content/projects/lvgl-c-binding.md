---
title: LVGL C++ Binding
summary: A C++17 wrapper for the Light and Versatile Graphics Library (LVGL), offering
  an object-oriented API for embedded graphical user interface development. It simplifies
  the integration of LVGL into C++ projects by providing bindings for widgets, drivers,
  and core functionality.
slug: lvgl-c-binding
codeUrl: https://github.com/lvgl/lv_binding_cpp
star: 60
lastUpdated: '2023-07-31'
rtos: ''
libraries:
- lvgl
topics:
- binding
- cpp
- gui
- lvgl
- tft
- ui
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lvglpp-a-c-wrapper-for-lvgl
- lv-modern-c-20-bindings-for-lvgl
- luavgl
- lvgl-rust-bindings
- lvgl-micropython-bindings
- lvgl-port-for-esp32
---

# LVGL C++ Binding: Modernizing Embedded GUI Development

The `lv_binding_cpp` project provides a C++ interface for the Light and Versatile Graphics Library (LVGL), one of the most popular open-source graphics libraries for embedded systems. While the core LVGL library is written in C to ensure maximum compatibility and low overhead, many developers working on complex embedded applications prefer the object-oriented paradigms offered by C++. This binding aims to provide a seamless bridge between the two worlds.

## Bridging C and C++

The primary goal of this project is to create a binding that is mostly auto-generated, ensuring that it can stay up-to-date with the rapid development of the main LVGL library. By wrapping the C API in C++ classes, developers can take advantage of modern programming features while maintaining the performance of the underlying C library.

**Key advantages of the C++ binding include:**
- **Object-Oriented Design**: UI elements (widgets) are represented as objects with methods, making the code more intuitive and easier to manage.
- **Type Safety**: Utilizing the C++ type system helps catch errors at compile-time rather than runtime.
- **C++17 Standards**: The project leverages modern C++17 features, requiring a compatible compiler to build and integrate.

## Project Structure and Integration

The repository is structured to include the core LVGL library and its associated drivers as submodules or subdirectories, providing a comprehensive environment for GUI development. The build system is based on CMake, which handles the compilation of the static library and manages dependencies between the C++ code, the underlying C library, and the hardware drivers.

- **lv_cpp**: Contains the actual C++ wrapper classes for widgets and core logic.
- **lv_drivers**: Includes display and input device drivers, supporting everything from PC simulation to specific hardware controllers.
- **lv_cpp_examples**: Provides practical demonstrations of how to use the C++ API to create functional interfaces.

## Configuration and Customization

Like the standard LVGL library, the C++ binding relies on two critical configuration files that allow developers to tailor the library to their specific hardware constraints:

1.  **lv_conf.h**: This file controls the core features of LVGL, such as color depth, memory management (custom malloc/free), and which widgets are enabled.
2.  **lv_drv_conf.h**: This file configures the hardware abstraction layer, allowing developers to define how the library interacts with displays and input devices like touchscreens, mice, or keyboards.

## Hardware and Platform Support

Because it is built on top of LVGL, this binding supports a wide range of hardware platforms. It is compatible with high-performance microcontrollers like the STM32 and NXP i.MX RT series, as well as Linux-based systems using framebuffers or DRM/KMS. For developers without immediate access to hardware, it supports PC-based simulation via SDL2, which is invaluable for rapid prototyping and debugging.

## Getting Started

To use the binding, developers typically include the project in their CMake-based build environment. The `CMakeLists.txt` defines the `lv_binding_cpp` static library target, which links against the necessary LVGL components. Once configured, creating a UI element becomes a matter of instantiating C++ objects rather than calling C functions with raw pointers, leading to cleaner and more maintainable application code.
