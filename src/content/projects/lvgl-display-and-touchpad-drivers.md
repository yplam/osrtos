---
title: LVGL Display and Touchpad Drivers
summary: A comprehensive collection of display and input device drivers designed for
  the LVGL graphics library. It provides ready-to-use implementations for various
  LCD controllers, touchscreens, and platform-specific interfaces like Linux FBDEV,
  DRM/KMS, and SDL.
slug: lvgl-display-and-touchpad-drivers
codeUrl: https://github.com/lvgl/lv_drivers
siteUrl: https://lvgl.io/
star: 385
version: v6.1.1
lastUpdated: '2025-06-24'
rtos: ''
libraries:
- lvgl
topics:
- driver
- embedded
- littlevgl
- lvgl
- microcontroller
- tft
- touch-pad-driver
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lvgl-display-and-touchpad-drivers-for-esp32
- lvgl-for-embedded-linux
- lvgl-port-for-esp32
- esp-lvgl
- rt-thread-fbtft-framebuffer-drivers-for-tft-lcds
- lv-lib-100ask
---

## Overview

The `lv_drivers` repository provides a standardized set of display and touchpad drivers specifically designed for the LVGL (Light and Versatile Graphics Library) ecosystem. While LVGL itself is a hardware-agnostic graphics library, `lv_drivers` acts as the bridge between the library's drawing engine and the actual hardware peripherals or operating system interfaces.

As of LVGL version 9, many of these drivers have been merged directly into the main LVGL repository. However, this repository remains a critical resource for developers using earlier versions of the library or those looking for specific standalone driver implementations for various embedded platforms and simulators.

## Supported Hardware and Interfaces

The project includes a wide array of drivers covering different communication protocols and display technologies. These are generally categorized into display controllers and input devices (indev).

### Display Drivers
For physical hardware, the library supports several popular LCD controllers and monochrome displays, including:
- **TFT Controllers**: ILI9341, SSD1963, and R61581.
- **Monochrome & Low Resolution**: ST7565, GC9A01, and UC1610.
- **Specialty Displays**: SHARP Memory-In-Pixel (MIP) series (e.g., LS027B7DH01).
- **Linux Infrastructure**: Support for the Linux Framebuffer (`/dev/fb0`) and modern DRM/KMS interfaces.

### Input Device Drivers
To handle user interaction, the repository provides drivers for various touch and pointer technologies:
- **Touch Controllers**: XPT2046 (SPI), FT5406 (I2C), and AD Touch.
- **Linux Input**: Integration with `evdev` and `libinput` for handling mice, keyboards, and touchscreens on Linux-based embedded systems.

## Simulation and Desktop Integration

One of the most powerful features of `lv_drivers` is its support for desktop-based simulation. This allows developers to design and test their UIs on a PC before deploying to embedded hardware. It includes backends for:
- **SDL2**: A high-performance hardware-accelerated driver for Windows, Linux, and macOS.
- **Wayland & X11**: Native Linux windowing system support.
- **Win32**: Native Windows API drivers.
- **GTK**: Support for GTK-based windows.

## Architecture and Configuration

The library is designed to be highly configurable through a template file named `lv_drv_conf_template.h`. Developers typically copy this to `lv_drv_conf.h` and enable the specific drivers required for their project. This configuration file allows for fine-tuning parameters such as resolution, color depth, and pin assignments for SPI, I2C, or parallel interfaces.

```c
/* Example configuration snippet for ILI9341 */
#ifndef USE_ILI9341
#  define USE_ILI9341       1
#endif

#if USE_ILI9341
#  define ILI9341_HOR_RES       240
#  define ILI9341_VER_RES       320
#  define ILI9341_GAMMA         1
#endif
```

## Integration and Build Systems

`lv_drivers` supports multiple build environments, making it easy to integrate into existing embedded workflows:
- **CMake**: Provides a modern build system for cross-compilation and desktop builds.
- **Make**: Includes a `.mk` fragment for traditional Makefile-based projects.
- **PlatformIO**: Includes a `library.json` for easy dependency management in the PlatformIO ecosystem.

The project is intended to be used alongside the main LVGL library, and users are encouraged to refer to the official LVGL porting guide for detailed instructions on connecting these drivers to the LVGL draw buffers.
