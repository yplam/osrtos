---
title: µGUI
slug: ugui
summary: µGUI is a lightweight, platform-independent graphic library designed specifically
  for resource-constrained embedded systems. It provides a comprehensive windowing
  system and UI widget set without requiring dynamic memory allocation, making it
  highly suitable for high-reliability microcontroller applications across various
  display technologies.
codeUrl: https://github.com/achimdoebler/UGUI
siteUrl: https://github.com/achimdoebler/UGUI
star: 1362
lastUpdated: '2016-01-02'
components:
- GUI
- Graphics
- Shell
platforms:
- ARM
- ARM Cortex-M
- RISC-V
- AVR
- MSP430
- PIC
- STM8
- '8051'
- Native
- POSIX
licenses:
- Unknown
libraryType: GUI
createdAt: '2016-01-02'
updatedAt: '2026-04-19'
---

### Features


- Support for monochrome, grayscale, and full-color display modes.

- Resolution-independent design compatible with any screen dimensions.

- Simultaneous management and rendering for multiple independent displays.

- Driver-agnostic touch screen integration supporting both resistive and capacitive technologies.

- Built-in window management system for organizing complex user interface layouts.

- Standard UI widgets including buttons, textboxes, and progress bars.

- Hooks for platform-specific hardware acceleration to optimize rendering performance.

- Includes 16 built-in fonts with support for custom font integration.

- Native support for Cyrillic character sets and external TrueType font converters.

- Integrated and freely scalable system console for real-time logging and debugging.

- Geometric drawing primitives for lines, circles, frames, and filled shapes.

- Zero dynamic memory allocation (no malloc/free) to ensure deterministic behavior.

- Minimal footprint consisting of only three core source files for easy integration.

- Support for diverse display technologies including LCD, TFT, E-Paper, LED, and OLED.

- Configurable integer types to match specific target microcontroller architectures.



### Architecture

µGUI is designed with a layered architecture that emphasizes portability and low resource consumption. At its core, the library operates as a hardware-abstraction-friendly engine that sits between the application logic and the display driver. The architecture is strictly static, avoiding any dynamic memory allocation to prevent heap fragmentation and ensure suitability for safety-critical or long-running embedded applications.

The system is structured into three primary layers:
*   **Driver Layer**: The lowest level where the user provides a function to set individual pixels on the target display. This is the only mandatory hardware-specific requirement.
*   **Core Engine**: Handles geometric calculations, font rendering, and basic drawing primitives (lines, circles, etc.). It also manages the internal state of the GUI, including active displays and hardware acceleration hooks.
*   **Window & Widget Manager**: The highest level of the library which provides an object-oriented approach to UI design. It manages windows, handles input events (like touch), and renders complex widgets such as buttons and textboxes.

### Use Cases

This library is ideal for:

- **Industrial HMI**: Developing robust human-machine interfaces for factory equipment where reliability and deterministic memory usage are critical.
- **Handheld Devices**: Creating battery-efficient interfaces for portable instruments using OLED or E-Paper displays.
- **IoT Status Displays**: Implementing small-scale status screens for smart home sensors or gateway devices.
- **System Debugging**: Utilizing the integrated system console to output real-time logs and diagnostic data directly to an on-device screen.
- **Legacy System Upgrades**: Porting modern graphical interfaces to older 8-bit or 16-bit microcontroller architectures that lack the resources for heavier GUI frameworks.

### Getting Started

To integrate µGUI into a project, include `ugui.c`, `ugui.h`, and `ugui_config.h` in your build system. The primary configuration step involves editing `ugui_config.h` to define the integer types appropriate for your microcontroller architecture. Once configured, you must initialize the library by providing a pointer to a function that can draw a single pixel on your display. 

Basic initialization involves creating a `UG_GUI` structure and calling `UG_Init`. For window-based applications, you define a window, add objects (widgets) to it, and call the library's update functions within your main application loop. For touch support, the application must pass coordinates from the touch driver to µGUI using the `UG_TouchUpdate` function. Detailed examples and a TrueType font converter can be found in the project's ecosystem on GitHub.
