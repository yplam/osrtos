---
title: BMP Decoder for LVGL
summary: A lightweight BMP image decoder for the LVGL graphics library. It enables
  BMP image support with minimal RAM usage by reading pixels on demand from a file
  system rather than loading the entire image into memory.
slug: bmp-decoder-for-lvgl
codeUrl: https://github.com/lvgl/lv_lib_bmp
siteUrl: https://docs.lvgl.io/master/details/libs/bmp.html
star: 12
lastUpdated: '2025-06-24'
rtos: ''
libraries:
- lvgl
topics:
- bmp
- c
- embedded
- lvgl
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- png-decoder-for-lvgl
- sjpg-decoder-for-lvgl
- gif-decoder-for-lvgl
- image-converter-for-lvgl
- lvgl-offline-image-conversion-tool
- 100ask-linux-lvgl-desktop
---

## Overview

The `lv_lib_bmp` repository provides a dedicated BMP image decoder for the Light and Versatile Graphics Library (LVGL). While modern embedded systems often favor compressed formats like PNG or specialized formats like LVGL's own C-arrays, the BMP format remains a staple for its simplicity and lack of complex compression requirements. This library allows developers to integrate standard BMP files directly into their LVGL-based user interfaces.

One of the primary advantages of this implementation is its memory efficiency. Unlike many decoders that require the entire image to be decompressed into RAM, this library reads pixels on demand. This "lazy loading" approach makes it possible to display large BMP images even on microcontrollers with very limited memory resources.

## Technical Implementation

The decoder is designed to work seamlessly with LVGL's file system abstraction layer. It utilizes the `lv_fs` API to seek and read data directly from storage (such as an SD card or external Flash) as the rendering engine requires it. 

### Key Features
- **Low RAM Footprint**: By reading only the necessary pixel data for the current line being rendered, the library avoids the need for large framebuffers.
- **LVGL Integration**: It registers itself as a standard image decoder within the LVGL ecosystem, allowing users to use standard image objects to display BMP files.
- **File System Compatibility**: It is compatible with LVGL's newer file system APIs, specifically designed to work with the `feat/new-fs-api` branch and the `lv_fs_if` interface.

## Usage and Integration

To use the decoder, the library must be initialized after LVGL itself. Once initialized, BMP files can be set as sources for image objects using their file paths.

```c
// Initialize the BMP decoder
lv_bmp_init();

// Create an image object and set a BMP file as the source
lv_obj_t * img = lv_img_create(lv_scr_act());
lv_img_set_src(img, "S/path/to/image.bmp");
```

## Limitations and Requirements

Because this library is optimized for simplicity and low memory usage, there are a few technical constraints to keep in mind:
- **Color Depth**: The BMP file's color format should ideally match the `LV_COLOR_DEPTH` configured in your LVGL project. For example, RGB888 and ARGB888 files are best suited for `LV_COLOR_DEPTH 32`.
- **No Palette Support**: The current implementation does not support indexed/palette-based BMP files.
- **Storage Requirement**: BMP files must be loaded from a file system. If you intend to store images in internal Flash as constants, converting them to C arrays using the standard LVGL image converter is recommended instead.

## Project Status

It is important to note that this repository has been archived as the BMP decoder functionality has been merged directly into the core LVGL repository. Users of modern LVGL versions (v8.x and later) can typically find this functionality integrated into the main library's extra components.
