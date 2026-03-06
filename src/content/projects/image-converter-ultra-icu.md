---
title: Image Converter Ultra (ICU)
summary: A versatile image conversion tool written in Rust that supports common image
  formats and specialized embedded formats like LVGL binary (v8 and v9). It provides
  both a command-line interface and a graphical user interface for converting, previewing,
  and analyzing image metadata for embedded displays.
slug: image-converter-ultra-icu
codeUrl: https://github.com/W-Mai/icu
siteUrl: https://w-mai.github.io/icu
star: 16
version: v0.2.0
lastUpdated: '2026-01-29'
rtos: ''
libraries:
- lvgl
topics:
- cli-tool
- image-converter
- image-processing
- lvgl
- rust
isShow: false
createdAt: '2026-03-06'
updatedAt: '2026-03-06'
---

## Overview

Image Converter Ultra (ICU) is a powerful, standalone software tool designed to bridge the gap between standard desktop image formats and the specialized requirements of embedded systems. Written in Rust for performance and safety, ICU allows developers to convert, preview, and analyze images across a wide range of formats. While it handles common types like PNG, JPEG, and WebP, its primary strength lies in its deep support for the LVGL (Light and Versatile Graphics Library) ecosystem, making it an essential utility for embedded UI developers.

## Specialized Embedded Support

The core value of ICU for the embedded community is its robust handling of LVGL binary formats. It supports both LVGL v8 and v9, allowing developers to convert standard assets into the memory-optimized formats required by microcontrollers. 

ICU provides granular control over the conversion process, which is critical when working with constrained hardware. Users can specify:
- **Color Formats**: Support for various depths including RGB565, ARGB8888, and indexed formats (i1, i2, i4, i8).
- **Stride Alignment**: The ability to align the image stride (e.g., 4-byte alignment), ensuring compatibility with specific DMA or display controller requirements.
- **Dithering**: A built-in dithering engine with adjustable levels (1 to 30) to improve visual quality on low-color-depth screens.

## Command Line and Graphical Interfaces

ICU is designed to fit into any workflow. For automated build pipelines and scripts, it offers a comprehensive Command Line Interface (CLI). The CLI supports batch processing, recursive folder conversion, and even an auto-completion feature for shells like Bash, Zsh, and Fish.

For interactive work, ICU features a modern Graphical User Interface (GUI) built with `egui`. The GUI includes several advanced features for visual debugging:
- **Image Viewer**: A high-performance viewer with grid overlays and anti-aliasing toggles.
- **Image Diff**: A specialized tool for comparing two images, featuring color difference visualization, blend sliders, and pixel-level highlighting to identify rendering artifacts.
- **Metadata Analysis**: An info window that extracts and displays complex metadata, including EXIF data and PNG-specific headers (Color Type, Bit Depth, etc.) in a readable tree view.

## Technical Architecture

Built on a modular architecture, the project is split into the `icu_tool` application and the underlying `icu_lib` library. This separation allows the core conversion logic to be reused across different frontends. The project also supports WebAssembly (WASM), enabling the tool to run directly in a web browser for quick conversions without local installation.

## Getting Started

ICU can be installed via various package managers including Homebrew, Cargo, or via direct script installers for PowerShell and Shell. 

For a quick conversion via the CLI, a typical command looks like this:

```shell
icu convert input.png -O output_folder -F lvgl -C rgb565 -S 4 -r
```

This command converts a PNG to an LVGL-compatible format with RGB565 color depth and 4-byte stride alignment, overriding any existing files in the output directory. Developers looking to inspect an LVGL binary file can simply use the show command:

```shell
icu show image_v9.bin
```

ICU stands out as a modern, cross-platform solution for embedded developers who need a reliable way to manage graphical assets for their hardware projects.
