---
title: LVGL Emscripten Port
summary: A port of the LVGL graphics library to Emscripten, enabling the compilation
  of embedded UI applications into JavaScript and WebAssembly. It provides a web-based
  simulation environment using SDL2 for graphics and input handling, allowing developers
  to test and showcase embedded interfaces in any modern browser. This project is
  widely used for creating interactive demos and simulating hardware displays without
  physical devices.
slug: lvgl-emscripten-port
codeUrl: https://github.com/lvgl/lv_web_emscripten
siteUrl: https://lvgl.io/demos
star: 114
version: v7.11.0
lastUpdated: '2025-11-25'
rtos: ''
libraries:
- lvgl
topics:
- gui
- lvgl
- simulator
- web
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lvgl-rust-to-wasm
- eclipse-simulator-for-lvgl-using-sdl
- lvgljs
- lvgl-port-for-windows
- luavgl
- lvgl-for-pinephone-and-webassembly-with-zig-and-apache-nuttx-rtos
---

## Bringing Embedded UIs to the Web

The LVGL Emscripten port is a bridge between the world of embedded systems and modern web browsers. By leveraging the Emscripten SDK, this project allows developers to compile the C-based LVGL (Light and Versatile Graphics Library) into WebAssembly (Wasm) and JavaScript. This capability is transformative for embedded developers, as it enables the creation of high-fidelity UI simulations, interactive documentation, and web-based product demos without requiring physical hardware.

## Technical Architecture

At its core, the project uses **Emscripten** to translate C code into a format that web browsers can execute with near-native performance. To handle the "hardware" aspects of a display—such as opening a window, rendering pixels, and capturing mouse or touch events—the port utilizes **SDL2** (Simple DirectMedia Layer). 

The build system is managed via **CMake**, specifically using `emcmake` to wrap the standard CMake process for the Emscripten environment. This ensures that the complex dependencies of LVGL and its various modules are correctly linked into the final `index.html` and `.js/.wasm` files.

## Feature-Rich Configuration

This port is configured to showcase the full potential of LVGL. The provided `lv_conf.h` enables a wide array of advanced features that are often used in modern embedded interfaces:

- **High Color Depth**: Configured for 32-bit color (XRGB8888) to ensure vibrant visuals in the browser.
- **Vector Graphics**: Includes support for ThorVG, enabling high-quality vector rendering.
- **Animation Support**: Built-in support for Lottie animations and GIF decoding.
- **Advanced Font Handling**: Support for TinyTTF and compressed fonts, along with multi-language support (Arabic, Persian, CJK).
- **Image Decoders**: Integrated decoders for PNG (via LodePNG), BMP, JPG (via TJPGD), and RLE.

## Development and Simulation

One of the primary use cases for this port is the simulation of embedded devices. Developers can write their UI logic in C, test it in a browser environment with fast iteration cycles, and then deploy the same code to their target microcontroller or microprocessor. The project includes several built-in demos, such as the Widgets demo, Music player, and Benchmark tool, which can be selected during the build process using environment variables like `LVGL_CHOSEN_DEMO`.

## Getting Started

To use this port, developers need the Emscripten SDK and SDL2 development libraries. The build process involves:

1.  **Installing the Emscripten SDK**: Cloning the `emsdk` repository and activating the latest version.
2.  **Preparing the Project**: Cloning the `lv_web_emscripten` repository recursively to include the LVGL submodule.
3.  **Building**: Using `emcmake cmake ..` to generate build files and `emmake make` to compile the project.

The resulting `index.html` can be served by any web server, providing an instant, interactive version of the embedded UI. Note that some browsers, like Google Chrome, may require the files to be served from a local or remote server rather than opened directly from the file system due to security restrictions regarding local file access.
