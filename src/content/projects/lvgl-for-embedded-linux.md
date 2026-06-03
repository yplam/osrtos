---
title: LVGL for Embedded Linux
summary: A comprehensive porting layer and example project for running the LVGL graphics
  library on Linux-based embedded systems. It provides drivers for various display
  backends including FBDEV, DRM/KMS, Wayland, and SDL2, along with input support for
  evdev and libinput.
slug: lvgl-for-embedded-linux
codeUrl: https://github.com/lvgl/lv_port_linux_frame_buffer
siteUrl: https://lvgl.io
star: 395
version: v9.2.2
lastUpdated: '2025-12-19'
rtos: ''
libraries:
- lvgl
topics:
- framebuffer
- linux
- lvgl
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lvgl-display-and-touchpad-drivers
- lvgl-port-for-esp32
- lvgl-display-and-touchpad-drivers-for-esp32
- esp-lvgl
- littlevgl2rtt
- lvgl-rust-bindings
---

## Overview

The LVGL Linux port provides a robust foundation for building modern graphical user interfaces on GNU/Linux and other Unix-like operating systems. While LVGL is often associated with microcontrollers, this project bridges the gap to more powerful embedded Linux platforms, allowing developers to leverage the same high-level UI library across their entire product line.

This repository serves as both a reference implementation and a driver library, offering pre-configured backends for the standard Linux graphics stack. Whether you are targeting a legacy framebuffer device or a modern DRM/KMS-based system, this port provides the necessary glue code to get LVGL running efficiently.

## Key Features and Backends

The project is designed with flexibility in mind, supporting a wide array of graphics and input technologies common in the Linux ecosystem:

- **Graphics Backends**: Includes support for legacy Framebuffer (`fbdev`), modern DRM/KMS (`/dev/dri/*`), Wayland, X11, and SDL2. This allows for development on a desktop PC and seamless deployment to embedded hardware.
- **Input Handling**: Integrates with `libevdev` and `libinput` to handle touchscreens, mice, and keyboards.
- **Hardware Acceleration**: Support for specific hardware accelerators like NXP's G2D is included to offload rendering tasks from the CPU.
- **Cross-Platform Compatibility**: While focused on Linux, the project is structured to support various Unix-like environments and provides clear paths for cross-compilation.

## Technical Architecture

The project uses a CMake-based build system that dynamically generates the `lv_conf.h` configuration file based on selected drivers. This is handled through a Python script that merges a template with specific defaults, ensuring that only the necessary code for your chosen backend (e.g., Wayland vs. FBDEV) is compiled.

For embedded developers, the repository includes a `user_cross_compile_setup.cmake` file, which simplifies the process of targeting ARM-based SoCs from a Linux development host. It also supports external demos and advanced features like FreeType font rendering and GStreamer integration for video playback.

## Supported Hardware

The project includes specific documentation and configurations for several popular embedded development platforms, including:

- **NXP i.MX93** and **i.MX8M Mini** (via Toradex Verdin modules)
- **Texas Instruments AM62x** series (SK-AM62B, SK-AM62L, SK-AM62P)
- **Renesas RZ/G3E** Evaluation Kit
- **F&S PicoCoreMX93**

## Getting Started

To use this port, you typically clone the repository and initialize the LVGL submodule. Configuration is managed through `.defaults` files located in the `configs/` directory. For example, to target a Wayland compositor, you would configure the project using:

```bash
cmake -B build -DCONFIG=wayland
cmake --build build -j$(nproc)
```

Once built, the resulting `lvglsim` binary runs the standard LVGL widgets demo. For production use, the `lvgl_linux` library can be installed to your system or integrated directly into your application's build process, providing a clean API for display and input initialization on Linux targets.
