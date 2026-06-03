---
title: Lottie Animation Library for LVGL
summary: An LVGL extension that enables the playback of Lottie animations using the
  Samsung rlottie engine. It allows embedded developers to integrate high-quality
  vector-based animations into their user interfaces via raw JSON strings or external
  files.
slug: lottie-animation-library-for-lvgl
codeUrl: https://github.com/lvgl/lv_lib_rlottie
siteUrl: https://docs.lvgl.io/master/libs/rlottie.html
star: 42
lastUpdated: '2024-07-15'
rtos: ''
libraries:
- lvgl
topics:
- embedded
- lottie
- lvgl
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- gif-decoder-for-lvgl
- png-decoder-for-lvgl
- lvgl-emscripten-port
- freetype-integration-for-lvgl
- littlevgl2rtt
- lvgl-rust-bindings
---

## Overview

The `lv_lib_rlottie` library is a specialized extension for the Light and Versatile Graphics Library (LVGL) that brings Lottie animation support to embedded systems. Lottie is a popular JSON-based animation file format that allows designers to ship high-quality animations on any platform as easily as shipping static assets. By leveraging the Samsung `rlottie` engine, this library provides a bridge for LVGL users to render these complex vector animations directly on microcontrollers and embedded SoCs.

## Key Features

This library simplifies the process of adding modern, fluid animations to an LVGL-based UI. Key capabilities include:

- **Vector Scaling**: Animations are rendered based on the width and height set during creation, allowing them to scale perfectly without pixelation.
- **Flexible Loading**: Support for loading animation data from raw JSON strings (useful for self-contained firmware) or from external files stored on a filesystem.
- **LVGL Integration**: Animations are treated as standard LVGL objects, making them easy to position, layer, and manage within the existing object tree.
- **Performance**: Utilizes the efficient `rlottie` C++ engine to handle the heavy lifting of vector math and frame rendering.

## Technical Implementation

The library acts as a wrapper around the Samsung `rlottie` C-API. It defines a custom structure, `lv_rlottie_t`, which manages the animation state, including frame rates, total frames, and the allocated buffers required for rendering. Because `rlottie` is written in C++, a C++14-compatible compiler is required for the build process.

### Usage Examples

To use the library, you must include `lv_lib_rlottie/lv_rlottie.h`. The API provides two primary functions for creating animation objects:

**Creating from a Raw String:**

If you have your JSON data escaped as a C string, you can create an animation directly from memory:

```c
extern const char FingerprintRaw[];
lv_obj_t* r1 = lv_rlottie_create_from_raw(parent, width, height, FingerprintRaw);
```

**Creating from a File:**

For systems with a filesystem, you can load `.json` files dynamically:

```c
lv_obj_t* r2 = lv_rlottie_create_from_file(lv_scr_act(), width, height, "path/to/animation.json");
```

## Build and Integration

The project is designed to be built with CMake. It is typically cloned as a submodule next to the main `lvgl` directory. Because it relies on the `rlottie` library, users must ensure that submodules are recursively updated to fetch the necessary dependencies. 

Note that as of recent LVGL updates, this functionality has been merged directly into the core LVGL repository. Users are encouraged to check the official LVGL documentation for the most integrated version of Lottie support, though this standalone repository remains a reference for the original implementation.
