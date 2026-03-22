---
title: LVGL
slug: lvgl
summary: LVGL is a lightweight, open-source C graphics library designed to build professional
  user interfaces on any microcontroller or microprocessor. It features a hardware-independent
  architecture with low memory requirements, supporting advanced rendering features
  like anti-aliasing, animations, and complex layout engines.
codeUrl: https://github.com/lvgl/lvgl
siteUrl: https://lvgl.io/
star: 23040
version: v9.5.0
lastUpdated: '2026-03-21'
components:
- GUI
- Graphics
platforms:
- ARM
- ARM Cortex-M
- ARM Cortex-A
- RISC-V
- Xtensa
- x86
- x86_64
- Linux
- Windows
- macOS
- POSIX
- Native
- Simulator
licenses:
- MIT
libraryType: GUI
createdAt: '2025-12-25'
updatedAt: '2026-03-22'
---

### Features


- Hardware-independent C library with no external dependencies for maximum portability.

- Low resource footprint requiring as little as 32kB RAM and 128kB Flash.

- Support for monochrome, ePaper, OLED, and TFT displays of any resolution.

- Over 30 built-in widgets including buttons, charts, keyboards, and sliders.

- Advanced styling system with approximately 100 customizable properties for states and parts.

- Responsive layout engines based on CSS Flexbox and Grid standards.

- Full UTF-8 support for internationalization, including CJK, Arabic, and Persian scripts.

- Integrated data binding system (Observer pattern) to sync UI with application logic.

- Advanced rendering capabilities including anti-aliasing, opacity, shadows, and image transformations.

- Support for 3D rendering of glTF models via OpenGL integration.

- Multi-display support for managing several screens simultaneously.

- Compatibility with various input devices like touchpads, mice, encoders, and keyboards.

- Built-in animation engine for smooth transitions and UI effects.

- XML-based UI definition support via the LVGL Pro toolkit.

- Integration with major RTOS environments like Zephyr, NuttX, and RT-Thread.



### Architecture

LVGL follows a modular, object-oriented architecture implemented in C. The core of the library is built around the "Object" (lv_obj) abstraction, where every UI element is a widget inheriting base properties. The architecture is decoupled from hardware through a callback-based driver layer. Developers provide "flush" callbacks for display rendering and "read" callbacks for input devices, allowing LVGL to run on any display controller or input hardware without modification to the core library.

The rendering pipeline uses a partial buffering strategy to minimize RAM usage, where only changed areas of the screen are recalculated and drawn into a small draw buffer before being sent to the display. This allows for high-quality graphics even on memory-constrained MCUs. The library also includes a powerful style system that separates visual appearance from logic, and layout engines (Flexbox and Grid) that handle responsive positioning automatically.

#### Core Components
- **Display Interface**: Manages rendering buffers and coordinates with hardware-specific flush callbacks.
- **Input Device Interface**: Handles touch, mouse, keypad, and encoder inputs through a standardized event system.
- **Widget Engine**: A collection of 30+ UI components with hierarchical parent-child relationships.
- **Style System**: A CSS-like property system for customizing widget appearance across different states.
- **Layout Engines**: Flexbox and Grid implementations for responsive design and automatic positioning.
- **Animation & Timer Engine**: Manages time-based events, visual transitions, and internal task scheduling.

### Use Cases

This library is ideal for:
- **Industrial HMI**: Creating robust control panels for factory machinery with charts and complex data visualization.
- **Consumer Electronics**: Building sleek interfaces for smart home appliances, thermostats, and wearable devices.
- **Medical Devices**: Developing high-reliability UIs for patient monitors and diagnostic equipment requiring clear, anti-aliased graphics.
- **Automotive Dashboards**: Implementing digital clusters and infotainment systems with smooth animations and multi-display support.
- **IoT Gateways**: Adding local configuration screens to headless devices using low-cost monochrome or OLED displays.
- **Cross-platform Prototyping**: Developing UI logic on a PC simulator (Windows/Linux/macOS) and deploying the same code to embedded hardware.

### Getting Started

To integrate LVGL, developers typically add the source files to their project and provide a configuration file named `lv_conf.h`. The initialization process involves calling `lv_init()`, setting up a tick source via `lv_tick_set_cb()`, and registering display and input drivers. A display is created using `lv_display_create()`, where buffers and a flush callback are assigned. The main application loop must periodically call `lv_timer_handler()` to process UI tasks and animations. Detailed documentation, including over 100 examples and API references, is available at [docs.lvgl.io](https://docs.lvgl.io/).
