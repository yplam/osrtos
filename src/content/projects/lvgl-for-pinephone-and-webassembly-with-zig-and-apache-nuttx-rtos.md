---
title: LVGL for PinePhone and WebAssembly with Zig and Apache NuttX RTOS
summary: A project demonstrating the development of a feature phone user interface
  using the Zig programming language and the LVGL graphics library. It targets the
  PinePhone running Apache NuttX RTOS while providing a WebAssembly-based simulation
  environment for rapid UI development in the browser.
slug: lvgl-for-pinephone-and-webassembly-with-zig-and-apache-nuttx-rtos
codeUrl: https://github.com/lupyuen/pinephone-lvgl-zig
siteUrl: https://lupyuen.github.io/articles/lvgl4
star: 24
version: v1.0.0
lastUpdated: '2023-08-10'
rtos: nuttx
libraries:
- lvgl
topics:
- lvgl
- nuttx
- pinephone
- wasm
- zig
isShow: true
image: /202601/pinephone-lvgl-zig.webp
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- zig-lvgl-touchscreen-app-on-apache-nuttx-rtos
- lvgl-rust-to-wasm
- lvgl-terminal-for-pinephone-on-apache-nuttx
- lvgl-emscripten-port
- st7789-and-lvgl-demo-for-apache-nuttx-rtos
- apache-nuttx-rtos-for-pinephone
---

## Overview

Developing sophisticated user interfaces for embedded devices often involves a slow cycle of compiling, flashing, and testing on physical hardware. The **pinephone-lvgl-zig** project addresses this challenge by creating a dual-target development environment. It allows developers to build a Feature Phone UI for the PinePhone running **Apache NuttX RTOS** using the **Zig** programming language and the **LVGL** (Light and Versatile Graphics Library), while simultaneously supporting a **WebAssembly** (Wasm) target for instant previews in a web browser.

By leveraging Zig's seamless C interoperability and its ability to target WebAssembly natively, the project demonstrates how to write a single codebase that runs on both a high-performance AArch64 mobile device and a standard web browser.

## Key Features

- **Cross-Platform UI Development**: Write UI logic in Zig that compiles for both the PinePhone (NuttX) and the Browser (Wasm).
- **Zig Wrappers for LVGL**: Includes a Zig module that wraps the LVGL C API, making it more ergonomic for Zig developers while maintaining access to the full power of the library.
- **WebAssembly Simulation**: A complete simulation layer that maps LVGL's display and input buffers to HTML5 Canvas and JavaScript events, enabling full interactivity in the browser.
- **Feature Phone UI Example**: A practical demonstration of a mobile-style interface, including a dialer with digit buttons, call/cancel actions, and dynamic label updates.
- **NuttX Integration**: Detailed build scripts showing how to integrate Zig-compiled object files into the NuttX build system for the PinePhone.

## Technical Implementation

### Zig and LVGL Interoperability
The project uses Zig's `@cImport` to pull in LVGL headers directly. Because some LVGL types use bitfields (which are opaque in Zig), the project utilizes a small C shim (`display.c`) to handle display driver initialization and input device registration. This hybrid approach ensures that the complex parts of the LVGL configuration are handled safely in C, while the application logic remains in Zig.

### The WebAssembly Target
To make the UI runnable in a browser, the project uses `zig cc` to compile the LVGL C source files into WebAssembly object files. These are then linked with the Zig application code. Since standard C libraries like `malloc` and `strlen` behave differently in a freestanding Wasm environment, the project implements a custom memory allocator using Zig's `FixedBufferAllocator` and provides custom implementations for essential string functions.

### Hardware Support
The primary hardware target is the **PinePhone**, an Allwinner A64-based smartphone. The project targets the **Cortex-A53** (armv8-a) architecture. On the software side, it relies on Apache NuttX RTOS to provide the underlying hardware abstraction and task management required to run the LVGL stack.

## Feature Phone UI Logic

The core of the project is a "Feature Phone" application. It organizes the screen into three main containers using LVGL's Flex layout:
1. **Display Label**: Shows the currently dialed number with support for LVGL text recoloring.
2. **Action Buttons**: Contains "Call" and "Cancel" buttons.
3. **Digit Grid**: A grid of buttons for numbers 0-9 and symbols * and #.

The Zig event handler manages the state of the dialer. When a digit is clicked, it appends the character to a null-terminated buffer and updates the LVGL label. If the "Call" button is pressed, the code branches based on the target: simulating a call in the browser console or preparing an actual modem command on the PinePhone.

## Getting Started

The repository provides a comprehensive `build.sh` script that automates the complex process of compiling LVGL for WebAssembly. Developers can use this as a template for their own Zig-based embedded projects. The project also highlights the use of **Rancher Desktop** or VSCode Remote Containers to maintain a consistent Zig toolchain version, ensuring that the latest compiler features are available regardless of the host operating system.
