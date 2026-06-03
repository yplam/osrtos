---
title: LVGL Rust Bindings
summary: 'Rust bindings for the LVGL (Light and Versatile Graphics Library), providing
  a safe and idiomatic interface for creating embedded GUIs. It supports #![no_std]
  environments and integrates with the embedded-graphics crate for display drivers.'
slug: lvgl-rust-bindings
codeUrl: https://github.com/lvgl/lv_binding_rust
siteUrl: https://lvgl.io/
star: 860
version: 0.6.2
lastUpdated: '2025-01-22'
rtos: ''
libraries:
- lvgl
topics:
- embedded
- graphics
- gui
- lvgl
- rust
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lvgl-c-binding
- lvgl-micropython-bindings
- lvgl-rust-to-wasm
- lvgl-for-embedded-linux
- lv-modern-c-20-bindings-for-lvgl
- lvglpp-a-c-wrapper-for-lvgl
---

## Overview

The `lv_binding_rust` project provides high-level, safe Rust bindings for LVGL (Light and Versatile Graphics Library), a popular open-source graphics library for embedded systems. By bringing LVGL to the Rust ecosystem, developers can leverage Rust's memory safety and modern language features while building sophisticated graphical user interfaces for microcontrollers and other resource-constrained devices.

## A Safe Bridge to C

The project is structured into several components to manage the complexity of C interop. At the lowest level, `lvgl-sys` uses `bindgen` to generate raw, unsafe bindings directly from the LVGL C source code. To make these usable in idiomatic Rust, the project employs `lvgl-codegen`, a specialized tool that processes the raw bindings and generates safe wrappers. This architecture ensures that users can interact with widgets, styles, and events without constantly dealing with raw pointers or manual memory management.

## Built for Embedded Systems

One of the primary strengths of these bindings is their compatibility with `no_std` environments by default. This makes the library suitable for bare-metal firmware where a standard library is unavailable. It also provides an optional `lvgl_alloc` feature, which allows the Rust code to use LVGL's internal memory manager as a global allocator, simplifying memory management in constrained environments.

## Integration and Ecosystem

The bindings are designed to play well with the existing Rust embedded ecosystem. It integrates with the `embedded-graphics` crate, allowing developers to use any display driver that implements the `DrawTarget` trait. Additionally, it supports `lv_drivers` for hardware-specific acceleration and input device handling, though this support is currently considered experimental.

## Key Capabilities

The library currently supports a wide range of LVGL features:

- **Displays**: Flexible rendering using the `embedded_graphics` library or `lv_drivers`.
- **Events**: A system to listen for and trigger events on widgets.
- **Styles**: Comprehensive styling support for objects, allowing for beautiful visual effects with a low memory footprint.
- **Input Devices**: Support for pointer-based input devices, with experimental support for custom handlers.
- **Animations and Fonts**: Full support for LVGL's animation system and built-in fonts (when using nightly Rust).

## Getting Started

To use the library, developers typically add `lvgl` to their `Cargo.toml`. Because LVGL is highly configurable via a C header file, the build process requires a `DEP_LV_CONFIG_PATH` environment variable pointing to the directory containing `lv_conf.h`. This allows the Rust build script to pull in the correct configuration for the underlying C library.

For those targeting bare-metal hardware, the library provides specific features like `unsafe_no_autoinit` to handle the nuances of hardware initialization. While the bindings are still under active development, they already provide a robust foundation for building professional-grade UIs in Rust, bridging the gap between high-level safety and low-level performance.
