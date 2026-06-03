---
title: LVGL Utilities
summary: A collection of offline converter utilities for the LVGL graphics library,
  featuring image-to-C and font-to-C conversion scripts. These tools enable the preparation
  of graphical assets for embedded systems by generating compatible C arrays and binary
  files from standard image and font formats.
slug: lvgl-utilities
codeUrl: https://github.com/lvgl/lv_utils
siteUrl: https://lvgl.io
star: 57
lastUpdated: '2021-10-19'
rtos: zephyr
libraries:
- lvgl
topics:
- convert-pictures
- font
- image-converter
- littlevgl
- lvgl
- pixel-font
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lvgl-offline-image-conversion-tool
- lv-font-conv
- image-converter-for-lvgl
- pixelforge
- micropython-font-handling-utility
- image-converter-ultra-icu
---

## Overview

The `lv_utils` repository provides a suite of command-line tools designed to assist developers in preparing graphical assets for the LVGL (Light and Versatile Graphics Library) framework. While the project is currently archived in favor of more modern Node.js-based implementations, it remains a significant reference for understanding how LVGL handles image and font data in embedded environments.

## Image Conversion with PHP

The core of the image utility is `img_conv_core.php`, a PHP script that transforms standard image files (BMP, JPG, PNG) into C-compatible arrays or binary files. This tool is essential for embedded systems that do not have a filesystem or the processing power to decode complex image formats at runtime.

The converter supports a wide range of color formats, including:
- **True Color**: Standard RGB formats with optional alpha channels or chroma keying.
- **Indexed**: 1, 2, 4, or 8-bit palettes for memory-constrained devices.
- **Alpha-only**: Grayscale-like masks for icons and anti-aliased shapes.
- **Raw**: Direct binary output for external storage like SD cards.

## Font Conversion with Ruby

For typography, the repository includes `hex2lvfont.rb`, a Ruby script tailored for generating pixel-perfect fonts from hex font files. This utility is particularly useful for developers using specialized or low-resolution fonts like Unscii or Unifont. It supports LVGL version 6 and above, offering features like range selection (e.g., Basic Latin, Cyrillic, or custom sets) and bit-per-pixel (BPP) configuration.

Notably, the font converter includes specific logic for the Zephyr RTOS environment, adjusting include paths based on the presence of the `ZEPHYR_BASE` environment variable to ensure seamless integration with Zephyr-based projects.

## Offline Workflow

One of the primary advantages of these utilities is the ability to run them offline within a CI/CD pipeline or a local development environment. By using simple command-line arguments, developers can automate the conversion of entire asset folders. For example, converting a PNG to a C array with alpha support is as simple as:

```bash
php img_conv_core.php "name=icon&img=bunny.png&format=c_array&cf=true_color_alpha"
```

## Integration and Usage

Once converted, the resulting C files can be directly compiled into an LVGL project. The generated code defines `lv_img_dsc_t` or `lv_font_t` structures that the LVGL engine uses to render graphics. For binary files stored on external media, the tools generate headers that allow the LVGL file system (fs) driver to interpret the data correctly.

## Modern Alternatives

As the LVGL ecosystem has evolved, these PHP and Ruby scripts have been succeeded by `lv_font_conv` and `lv_img_conv`. These newer tools are built on Node.js, offering faster performance and more advanced features like subpixel rendering and improved compression. Users starting new projects are encouraged to transition to the newer repositories for the best compatibility with current LVGL versions.
