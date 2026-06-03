---
title: LVGL MicroPython Bindings
summary: Automatically generated MicroPython bindings for the LVGL graphics library,
  enabling high-level GUI development on microcontrollers. It features seamless integration
  with MicroPython's garbage collector, support for various display and touch drivers,
  and an automated API generation system for maintaining parity with the C library.
slug: lvgl-micropython-bindings
codeUrl: https://github.com/lvgl/lv_binding_micropython
siteUrl: https://lvgl.io
star: 329
lastUpdated: '2025-09-17'
rtos: ''
libraries:
- lvgl
- micropython
topics:
- gui
- lvgl
- micropython
- tft
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- micropython-and-lvgl-firmware-for-esp32
- lvgl-c-binding
- lvgl-rust-bindings
- lvglpp-a-c-wrapper-for-lvgl
- luavgl
- lvgl-port-for-esp32
---

## Introduction to LVGL MicroPython Bindings

The LVGL MicroPython binding project bridges the gap between the high-performance LVGL (Light and Versatile Graphics Library) C library and the ease of use provided by MicroPython. By providing a Pythonic interface to a powerful graphics engine, it allows developers to create sophisticated user interfaces for embedded systems without the complexity of manual memory management or low-level C programming. This project is typically used as a submodule within the broader `lv_micropython` repository, which combines the MicroPython firmware with LVGL and these bindings.

## Automated API Generation

One of the most significant features of this project is its automated binding generation. Instead of manually wrapping thousands of LVGL functions and constants, the project uses a specialized script called `gen_mpy.py`. This script reads LVGL's C header files, parses them using `pycparser`, and generates a C file (`lv_mpy.c`) that defines the MicroPython module. 

This approach ensures that the MicroPython API stays in sync with the underlying C library. When features are enabled or disabled in `lv_conf.h`, the script automatically adjusts the generated module to reflect those changes. This allows developers to access almost the entire LVGL API, including widgets, styles, and animations, directly from Python scripts.

## Memory Management and Garbage Collection

Integrating a C library with MicroPython requires careful handling of memory. The LVGL bindings are designed to take full advantage of MicroPython's Garbage Collector (GC). LVGL is configured to use MicroPython's memory allocation functions, meaning that structs and objects created in Python are automatically tracked by the GC. 

When a Python object representing an LVGL widget goes out of scope and is no longer referenced, the GC can reclaim the memory. However, the project also accounts for LVGL's internal object tree; for instance, screen objects must be explicitly deleted using `screen.delete()` to ensure they and their descendants are properly collected, as they are otherwise anchored to the default display.

## Concurrency and the Event Loop

LVGL requires a periodic task handler to manage screen refreshes, animations, and input processing. In the MicroPython environment, this is typically handled on a single thread to avoid complex synchronization issues. The bindings utilize the internal MicroPython scheduler (`mp_sched_schedule`) to trigger LVGL tasks. 

A typical implementation uses a timer to call the LVGL task handler at regular intervals (e.g., every 30ms). This ensures that the UI remains responsive while the main MicroPython thread is free to execute user code or wait for REPL input.

## Display and Input Drivers

The project includes a variety of drivers for common embedded hardware. These drivers can be implemented in pure MicroPython, pure C, or a hybrid of both. Hybrid drivers are particularly effective, as they use C for performance-critical operations like flushing the frame buffer while allowing the user to configure pins and peripheral settings in Python at runtime.

Supported hardware includes:
- **Displays**: ILI9341, ST7789, ST7735, and Linux Framebuffer (`/dev/fb0`).
- **Touch Controllers**: XPT2046, FT6X36, and raw resistive touch.
- **Simulators**: SDL support for Unix/Linux ports, allowing for UI development on a desktop before deploying to hardware.

## Getting Started Example

Creating a simple UI with a button and a label is straightforward in MicroPython:

```python
import lvgl as lv

# Initialize LVGL
lv.init()

# Create a screen and a button
scr = lv.obj()
btn = lv.button(scr)
btn.align(lv.ALIGN.CENTER, 0, 0)

# Add a label to the button
label = lv.label(btn)
label.set_text("Click Me")

# Load the screen
lv.scr_load(scr)
```

This high-level syntax allows for rapid prototyping and iteration, making it an ideal choice for IoT devices, industrial controllers, and any embedded project requiring a modern graphical interface.
