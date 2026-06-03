---
title: LVGL Windows Simulator for Code::Blocks
summary: A PC simulator project for the LVGL (Light and Versatile Graphics Library)
  designed for Windows using the Code::Blocks IDE. It allows developers to design
  and test embedded GUI applications on a desktop environment before deploying to
  actual hardware.
slug: lvgl-windows-simulator-for-code-blocks
codeUrl: https://github.com/lvgl/lv_port_win_codeblocks
star: 191
version: v9.2.2
lastUpdated: '2025-01-06'
rtos: ''
libraries:
- lvgl
topics:
- codeblocks
- gui
- lvgl
- simulator
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- eclipse-simulator-for-lvgl-using-sdl
- lvgl-port-for-windows
- lvgl-emscripten-port
- lvgl-demo-test
- luavgl
- lvgl-demo-embarcadores
---

## Overview

The `lv_port_win_codeblocks` repository provides a ready-to-use environment for simulating the LVGL (Light and Versatile Graphics Library) on a Windows machine. By leveraging the Code::Blocks IDE and the MinGW compiler, developers can create, test, and debug sophisticated embedded user interfaces without needing physical hardware during the early stages of development.

## Why Use a Simulator?

Developing for embedded systems often involves slow flash cycles and limited debugging capabilities. Using a PC simulator like this one significantly accelerates the UI design process. It allows for rapid iteration, easy debugging using standard desktop tools, and the ability to demonstrate UI concepts to stakeholders without shipping hardware. The simulator provides a pixel-perfect representation of how the interface will appear on an embedded screen by mapping LVGL's display and input device buffers to a Windows-native window.

## Technical Foundation

The project is built around the Code::Blocks IDE, a popular open-source C/C++ environment. It uses the MinGW (Minimalist GNU for Windows) port of the GCC compiler. The project is configured to handle the specific requirements of rendering a graphics library within a desktop OS environment while maintaining the same API used on microcontrollers.

The project structure includes:
- **LVGL Core**: Included as a submodule, ensuring access to the latest features and widgets of the library.
- **Configuration**: A pre-configured `lv_conf.h` file tailored for the simulator environment, allowing for immediate compilation.
- **Demos and Examples**: The project file is set up to compile various LVGL demos, such as the music player, widgets gallery, and stress tests, which serve as excellent starting points for new projects.

## Getting Started

To get started, users must clone the repository with submodules to ensure the LVGL core library is correctly populated. The project requires Code::Blocks 20.03 or newer. A key step in the setup involves configuring the IDE to "use flat objects" to ensure compatibility with the project's build system and file structure.

Once the project is opened in Code::Blocks, the `lvgl.cbp` file defines the build targets. Pressing F9 (Build and Run) compiles the source code and launches a windowed application where the LVGL interface is rendered. The simulator supports mouse interaction to mimic touch screen inputs, making it easy to test buttons, sliders, and list scrolling.

## Customization and Portability

Developers can easily swap out the default demo for their own application code by modifying `main.c`. Since the simulator uses the same `lv_conf.h` and C API as the embedded targets, code written in this environment is highly portable. When the UI is ready, the source files can be moved to the target embedded project (such as those running on STM32, ESP32, or NXP hardware) with minimal changes. This workflow ensures that the logic and layout of the user interface are fully validated before the final integration with hardware-specific drivers.
