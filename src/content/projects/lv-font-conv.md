---
title: lv_font_conv
summary: A font converter tool that transforms TTF, WOFF, and OTF fonts into a compact
  bitmap format optimized for embedded systems. It supports anti-aliasing, kerning,
  and compression, with a specific output format for the LVGL graphics library.
slug: lv-font-conv
codeUrl: https://github.com/lvgl/lv_font_conv
star: 255
version: 1.5.3
lastUpdated: '2025-12-12'
rtos: ''
libraries:
- lvgl
topics:
- c
- conveter
- font
- lvgl
- ttf
- woff
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lvgl-utilities
- freetype-integration-for-lvgl
- image-converter-for-lvgl
- micropython-font-handling-utility
- lvgl-offline-image-conversion-tool
- pixelforge
---

## Typography for Resource-Constrained Systems

In the world of embedded systems, rendering high-quality typography is a significant challenge. Vector fonts like TTF or OTF are computationally expensive to rasterize on the fly, especially on microcontrollers with limited RAM and CPU power. `lv_font_conv` solves this by pre-rasterizing vector fonts into a highly optimized, compact bitmap format.

Developed as part of the LVGL (Light and Versatile Graphics Library) ecosystem, this tool allows developers to take standard desktop fonts and convert them into a format that fits within the tight memory constraints of an MCU. By moving the heavy lifting of font rasterization to the build stage, embedded devices can display beautiful text with minimal runtime overhead.

## Key Capabilities

The converter is more than just a simple rasterizer; it includes several advanced features designed specifically for embedded displays:

- **Anti-aliasing Support**: Generate glyphs with 1 to 4 bits per pixel (bpp), allowing for smooth edges even on small screens.
- **Kerning Preservation**: Maintains the spacing information between specific character pairs, ensuring professional-looking text layout.
- **Built-in Compression**: Uses RLE (Run-Length Encoding) and XOR pre-filtering to minimize the storage footprint of font data.
- **Subsetting and Merging**: Developers can select only the specific glyphs needed (e.g., just numbers or a specific language range) and even merge multiple font files into a single output. This is critical for supporting icons (like FontAwesome) alongside standard text.
- **Subpixel Smoothing**: Supports horizontal and vertical LCD subpixel rendering for improved clarity on compatible displays.

## Technical Architecture

`lv_font_conv` is built on Node.js and leverages a WebAssembly (Wasm) build of the FreeType library. This architecture ensures that the font rendering logic is consistent across different platforms while maintaining high performance. It provides a flexible Command Line Interface (CLI) that can be easily integrated into automated build pipelines, as well as a web-based UI for manual conversion tasks.

When multiple fonts are merged, the tool intelligently handles shared metrics. It maintains a shared baseline and recalculates vertical metrics (ascender and descender) based on the combined set of glyphs, ensuring visual consistency across different font sources.

## Output Formats

The tool supports three primary output formats tailored for different needs:

1. **LVGL**: Generates a C file compatible with the LVGL graphics library. This is the most common use case for developers building embedded GUIs, though it is slightly larger than the binary format due to C language limitations regarding relative offsets.
2. **Binary (bin)**: A universal binary format designed for systems that load fonts from external storage like SD cards or SPI Flash. It is highly optimized for size.
3. **Dump**: A debug-friendly format that exports individual glyph images and a JSON metadata file, useful for inspecting the conversion results and verifying font metrics.

## Example Usage

The CLI is highly configurable, allowing for complex merging and mapping operations. For example, to merge English characters from Roboto and icons from Font Awesome into a 16-pixel compressed binary font, a developer might use a command like this:

```sh
# Merge English from Roboto and icons from Font Awesome
lv_font_conv --font Roboto-Regular.ttf -r 0x20-0x7F --font FontAwesome.ttf -r 0xFE00=>0x81 --size 16 --format bin --bpp 3 --no-compress -o output.font
```

This flexibility makes `lv_font_conv` an essential utility for any developer working with graphical user interfaces on embedded hardware, providing the bridge between modern desktop typography and the constraints of the embedded world.
