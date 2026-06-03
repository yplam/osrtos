---
title: LVGL Rust to WASM
summary: An example project demonstrating the use of the LVGL graphics library in
  Rust, compiled to WebAssembly (WASM) and native targets. It showcases cross-platform
  UI development using the embedded-graphics ecosystem and Emscripten.
slug: lvgl-rust-to-wasm
codeUrl: https://github.com/rafaelcaricio/lvgl-rs-wasm
siteUrl: https://rafaelcaricio.github.io/lvgl-rs-wasm
star: 29
lastUpdated: '2020-09-24'
rtos: ''
libraries:
- lvgl
topics:
- lvgl
- wasm
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lvgl-emscripten-port
- lvgl-for-pinephone-and-webassembly-with-zig-and-apache-nuttx-rtos
- lvgl-rust-bindings
- zig-lvgl-touchscreen-app-on-apache-nuttx-rtos
- lvgl-demo-embarcadores
- eclipse-simulator-for-lvgl-using-sdl
---

## Overview

LVGL Rust to WASM is a demonstration project that bridges the gap between embedded UI development and web technologies. It provides a template for using the Light and Versatile Graphics Library (LVGL) within a Rust environment, allowing the same codebase to run both as a native desktop application and as a WebAssembly (WASM) module in a browser. 

This project is particularly useful for embedded developers who want to prototype user interfaces, create web-based simulators for their hardware, or share interactive UI demos without requiring physical hardware or complex native toolchains for the end-user.

## Technical Stack

The project leverages several key technologies to achieve cross-platform compatibility:

*   **Rust**: The core logic is written in Rust, providing memory safety and modern language features.
*   **LVGL (lvgl-rs)**: It uses Rust bindings for the popular C-based LVGL library, specifically a version adapted for Emscripten compatibility.
*   **embedded-graphics**: Integration with the Rust `embedded-graphics` crate allows for a standardized way to handle drawing primitives and display drivers.
*   **Emscripten**: This toolchain is used to compile the C and Rust code into WebAssembly, enabling the application to run in modern web browsers.
*   **SDL2**: Used as the backend for both native rendering and the web version (via Emscripten's SDL2 port) to handle windowing and input events.

## Key Features

One of the primary advantages of this setup is the ability to maintain a single source of truth for the UI logic. By targeting the `wasm32-unknown-emscripten` architecture, developers can leverage the performance of compiled code with the accessibility of the web. 

The project includes a `Makefile` that simplifies the build process for both targets. Running `make web` triggers the Emscripten build, while `make native` utilizes the standard Cargo build process for the host machine. For local testing of the web version, a simple Python-based HTTP server is used to serve the generated WASM and HTML files.

## Getting Started

To build the project, users need to have the Emscripten SDK (emsdk) installed and activated. The build process involves compiling the SDL2 library through `embuilder.py` and then using Cargo to build the Rust project. 

```bash
# Compile the Web version
make web

# Compile the native version
make native
```

Once compiled, the native version can be executed directly via `cargo run`, while the web version is accessed by serving the static files. This workflow allows for rapid iteration: developers can debug logic natively with fast compile times and then deploy to the web for broader distribution or stakeholder review.
