---
title: Eclipse Simulator for LVGL (using SDL)
summary: A cross-platform simulator for the LVGL graphics library using Eclipse CDT
  and SDL2. It allows developers to develop and test embedded GUI code on a PC before
  deploying to microcontroller hardware.
slug: eclipse-simulator-for-lvgl-using-sdl
codeUrl: https://github.com/lvgl/lv_port_pc_eclipse
siteUrl: https://docs.lvgl.io/latest/en/html/get-started/pc-simulator.html
star: 335
version: v9.2.2
lastUpdated: '2025-12-15'
rtos: ''
libraries:
- lvgl
topics:
- graphics-library
- lvgl
- simulator
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lvgl-windows-simulator-for-code-blocks
- lvgl-emscripten-port
- luavgl
- lvgl-port-for-windows
- lvgl-demo-test
- lvgl-rust-to-wasm
---

## Overview

The Eclipse Simulator for LVGL provides a robust environment for developing embedded graphical user interfaces on a desktop PC. While the [LVGL](https://github.com/lvgl/lvgl) library is primarily designed for microcontrollers and resource-constrained systems, this simulator allows developers to run the exact same C code on Windows, Linux, or macOS. This workflow significantly accelerates development by enabling UI design, logic testing, and debugging without the need for physical hardware or slow flashing cycles.

## Key Components and Architecture

The project integrates several key technologies to bridge the gap between embedded code and desktop environments:

- **LVGL**: The core graphics library used to create the UI components.
- **Eclipse CDT**: Serves as the Integrated Development Environment (IDE) for managing the C/C++ project.
- **SDL2 (Simple DirectMedia Layer)**: Acts as the low-level driver library. It handles window creation, rendering, and input events such as mouse, keyboard, and touch simulation.
- **CMake and Make**: Flexible build systems that support various development environments and CI/CD pipelines.

## Technical Implementation

The simulator is designed to be as close to an embedded target as possible. The `lv_conf.h` file is used to configure the library's features, memory management, and rendering settings. By default, the project is configured with a 32-bit color depth and uses SDL as the display and input device driver. 

One of the most powerful aspects of this setup is that the application logic written in `main.c` or associated files is hardware-agnostic. Once the UI is perfected in the simulator, the source files can be copied directly into an embedded project targeting an STM32, ESP32, NXP, or any other supported microcontroller.

## Getting Started

Setting up the simulator involves cloning the repository with its submodules to ensure the LVGL core library is included. On Linux, dependencies like `libsdl2-dev` are required. For those who prefer containerized environments, the project includes a `Dockerfile` that allows the simulator to run inside a Docker container, which is particularly useful for maintaining consistent build environments across different developer machines.

### Build Options

The CMake configuration provides several options to extend the simulator's capabilities:
- **LV_USE_DRAW_SDL**: Enables the SDL draw unit for hardware-accelerated rendering.
- **Image Support**: Options to include `libpng` or `libjpeg-turbo` for decoding various image formats.
- **Vector Graphics**: Support for ThorVG and vector graphic APIs.

## Development Workflow

Developers typically import the project into Eclipse CDT using the "Existing Projects into Workspace" option. Once imported, the project can be built and run like any standard desktop application. The simulator window appears, providing a pixel-perfect representation of how the UI will look on the target embedded screen. Input devices are mapped to the PC's mouse and keyboard, allowing for full interaction testing of buttons, sliders, and text areas.
