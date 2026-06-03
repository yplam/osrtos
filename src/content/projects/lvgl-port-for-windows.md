---
title: LVGL Port for Windows
summary: A pre-configured Visual Studio project that ports the LVGL graphics library
  to the Windows desktop environment. It utilizes the Win32 API to provide a hardware
  abstraction layer (HAL) for display and input, enabling developers to prototype
  and test embedded user interfaces on a PC.
slug: lvgl-port-for-windows
codeUrl: https://github.com/lvgl/lv_port_windows
star: 87
lastUpdated: '2023-05-23'
rtos: ''
libraries:
- lvgl
topics:
- gui
- lvgl
- windows
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lvgl-windows-simulator-for-code-blocks
- eclipse-simulator-for-lvgl-using-sdl
- lvgl-emscripten-port
- lvgl-port-for-stm32f769-discovery
- lvgl-port-for-esp32
- luavgl
---

## Overview

The `lv_port_windows` project provides a native Windows port for LVGL (Light and Versatile Graphics Library), allowing developers to run and test their embedded UI designs directly on a PC. By leveraging the Win32 API, C Runtime, and C++ STL, this project creates a robust environment for LVGL without requiring complex emulators or external dependencies like SDL or Allegro. It is specifically designed for Visual Studio 2019 and targets x86, x64, and ARM64 Windows platforms.

## Key Features and HAL Capabilities

This port goes beyond a simple pixel buffer by implementing a comprehensive Hardware Abstraction Layer (HAL) that maps Windows system events to LVGL's input and display interfaces. Key features include:

- **Native Win32 Integration**: The project depends only on standard Windows APIs, making it lightweight and easy to integrate into existing Windows development workflows.
- **High-DPI Awareness**: Supports per-monitor DPI awareness at the HAL level, ensuring that the UI scales correctly on modern high-resolution displays.
- **Advanced Input Support**: Includes native support for Windows touch input, mouse wheel events, and keyboard handling. It also features IME (Input Method Editor) support for complex text entry.
- **Performance Optimizations**: The port implements a specialized architecture where the LVGL task schedule loop is split into a separate thread to improve UI responsiveness.
- **Font Engine**: Provides a Windows GDI-based font engine support, allowing LVGL to utilize system fonts effectively.

## Technical Implementation

The project is structured as a Visual Studio solution containing the core port logic and a desktop application project. It uses Git submodules to pull in the core `lvgl` library and `lv_examples`. 

One of the unique aspects of this port is its support for the VC-LTL toolchain, which can significantly reduce the binary size of the resulting application, bringing it closer to the footprint of MinGW-compiled binaries while remaining within the Visual Studio ecosystem. 

## Getting Started

To use this project, developers should clone the repository recursively to ensure all submodules are included:

```bash
git clone --recurse-submodules https://github.com/lvgl/lv_port_windows.git
```

Once cloned, opening `LVGL.Windows.sln` in Visual Studio allows for immediate compilation. The `LVGL.Windows.Desktop.cpp` file serves as the entry point where users can toggle between different LVGL demos, such as the standard widgets demo or custom application code. This makes it an ideal sandbox for rapid prototyping before deploying code to actual embedded hardware.

## Project Status

It is important to note that this specific repository has been deprecated as the implementation has been migrated to a unified PC port. Developers looking for the most up-to-date version of the Visual Studio port should refer to the `lv_port_pc_visual_studio` repository, which continues the work started here with broader support for modern LVGL versions.
