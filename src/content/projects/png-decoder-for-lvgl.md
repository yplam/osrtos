---
title: PNG Decoder for LVGL
summary: A PNG image decoder library for LVGL based on the lodepng library. It enables
  embedded systems to display PNG images from flash memory or file systems with optional
  integration into LVGL's file system abstraction layer.
slug: png-decoder-for-lvgl
codeUrl: https://github.com/lvgl/lv_lib_png
siteUrl: https://docs.lvgl.io/master/details/libs/lodepng.html
star: 69
version: v8.0.2
lastUpdated: '2025-06-24'
rtos: ''
libraries:
- lvgl
topics:
- embedded
- lvgl
- png-decoder
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- gif-decoder-for-lvgl
- bmp-decoder-for-lvgl
- sjpg-decoder-for-lvgl
- qr-code-library-for-lvgl
- lottie-animation-library-for-lvgl
- lvgl-for-embedded-linux
---

## Overview

The `lv_lib_png` library is a dedicated extension for LVGL (Light and Versatile Graphics Library) that provides support for decoding PNG images. By leveraging the [lodepng](https://github.com/lvandeve/lodepng) library, it allows developers to integrate high-quality, compressed images into their embedded user interfaces without the complexity of porting heavy dependencies like `libpng` or `zlib`.

While this repository has been archived and its functionality merged directly into the core LVGL repository, it remains a significant example of how LVGL's image decoder interface can be extended to support standard image formats in resource-constrained environments.

## Key Features

- **Seamless LVGL Integration**: Once initialized, PNG images can be used just like any other LVGL image source.
- **Flexible Storage Options**: Supports loading PNGs from standard C file systems, LVGL's internal file system API, or directly from flash memory as C arrays.
- **Alpha Channel Support**: Full support for PNG transparency, allowing for complex UI overlays and anti-aliased icons.
- **Configurable Backend**: The library can be configured to use standard C library I/O (`fopen`) or LVGL's driver-based file system for better portability across different RTOS and bare-metal environments.

## Technical Implementation

The library acts as a wrapper around `lodepng`, which is a popular choice for embedded systems because it is contained within a single source file and does not require external dependencies. `lv_lib_png` implements the LVGL image decoder interface, which consists of functions to "get info" (read the header for width/height) and "open" (decode the actual pixel data).

When a PNG is opened, the library decodes the compressed data into a raw bitmap format that LVGL can render. Depending on the configuration, this can happen via standard file pointers or through LVGL's custom file system drivers.

## Getting Started

To use the decoder, the library must be initialized once in the application setup:

```c
#include "lv_lib_png/lv_png.h"

// Initialize the PNG decoder
lv_png_init();
```

### Using Images from Files

By default, the library uses standard C file IO. Images can be set as a source using their path:

```c
lv_obj_t * img = lv_img_create(lv_scr_act());
lv_img_set_src(img, "./path/to/image.png");
```

For systems using LVGL's File System API, you can enable `LV_PNG_USE_LV_FILESYSTEM` in your configuration. This allows the decoder to use custom drivers registered within LVGL, which is ideal for SD cards or external flash on platforms like ESP32 or STM32.

### Using Images from Flash

For maximum performance or systems without a file system, PNGs can be converted to C arrays. This is done by selecting the "Raw with alpha" color format in the LVGL online image converter. The resulting array is then declared and used directly:

```c
LV_IMG_DECLARE(my_test_img);
lv_obj_t * img = lv_img_create(lv_scr_act());
lv_img_set_src(img, &my_test_img);
```

## Architecture and Portability

The project includes a `CMakeLists.txt` and a Makefile fragment (`lv_lib_png.mk`), making it easy to integrate into various build systems. Because it relies on `lodepng`, it is highly portable across different architectures including ARM Cortex-M, RISC-V, and ESP32. It is designed to be RTOS-agnostic, working equally well with FreeRTOS, Zephyr, or in bare-metal applications.
