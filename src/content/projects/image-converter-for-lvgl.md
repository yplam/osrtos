---
title: Image Converter for LVGL
summary: A Node.js-based command-line utility and web tool designed to convert standard
  image files into C arrays or binary formats compatible with the LVGL graphics library.
  It provides a memory-efficient alternative to older PHP-based converters, supporting
  various color formats and dithering algorithms for embedded displays.
slug: image-converter-for-lvgl
codeUrl: https://github.com/lvgl/lv_img_conv
star: 110
version: v0.4.0
lastUpdated: '2023-08-15'
rtos: ''
libraries:
- lvgl
topics:
- image-converter
- lvgl
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lvgl-offline-image-conversion-tool
- lvgl-utilities
- image-converter-ultra-icu
- pixelforge
- lv-font-conv
- sjpg-decoder-for-lvgl
---

## Overview

The LVGL Image Converter is a specialized utility designed to bridge the gap between standard desktop image formats and the memory-constrained environments of embedded systems. Specifically built for the Light and Versatile Graphics Library (LVGL), this tool transforms images like PNG, JPG, and GIF into C-source files or raw binary data that can be directly compiled into firmware or loaded from external storage.

Developed as a modern successor to previous PHP-based conversion tools, this project leverages Node.js and TypeScript to provide better stability and performance. It addresses common pain points in embedded UI development, such as high memory consumption during conversion and compatibility issues with specific PNG sub-formats.

## Key Features and Capabilities

The converter is highly flexible, offering several modes of operation to suit different hardware requirements and development workflows:

- **Multiple Output Formats**: Users can generate C arrays for direct inclusion in source code or binary files for loading from SD cards or flash memory.
- **Color Format Support**: It supports a wide range of LVGL-specific color formats, including `CF_TRUE_COLOR`, `CF_TRUE_COLOR_ALPHA`, and various indexed or alpha-only formats.
- **Dithering Algorithms**: To improve visual quality on displays with lower color depths (like 16-bit RGB565), the tool includes dithering support to reduce banding artifacts.
- **Binary Optimization**: For projects requiring raw binaries, the tool can output data specifically formatted for different bit depths, such as RGB565.
- **Cross-Platform Execution**: While built on Node.js, the project provides a Docker-based workflow to ensure a consistent environment across Linux, Windows, and macOS without manual dependency management.

## Technical Implementation

The core logic of the converter is written in TypeScript, utilizing the `node-canvas` library for image processing. This allows the tool to handle complex image manipulations and pixel-perfect color conversions. By using a modern JavaScript stack, the converter avoids the memory exhaustion issues that often plagued earlier implementations when processing high-resolution assets.

For web-based environments, the project includes a Parcel-based build system that can package the converter into a client-side web application. This enables developers to host their own private conversion instances or integrate the logic into larger internal tooling suites.

## Usage and Integration

The tool is primarily used via a Command Line Interface (CLI). A typical conversion command specifies the input file, the desired color format, and whether to use dithering. For example, converting a logo for a standard LVGL project might look like this:

```sh
./lv_img_conv.js logo_lvgl.png -f -c CF_TRUE_COLOR_ALPHA
```

This generates a `logo_lvgl.c` file containing a `lv_img_dsc_t` structure, which is the standard descriptor format used by LVGL's image widgets. For teams preferring containerized workflows, the provided Dockerfile allows the converter to run in an isolated environment, mapping local project directories to the container for seamless asset processing.

## Attribution

This tool was originally created by @embeddedt to improve the reliability of the LVGL asset pipeline. It maintains compatibility with the core conversion logic found in the original LVGL utility scripts while providing a more robust execution environment for modern embedded development teams.
