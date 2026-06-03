---
title: SJPG Decoder for LVGL
summary: A specialized JPEG decoder for the LVGL graphics library that supports both
  standard JPG and a custom 'split-jpeg' (SJPG) format. It is designed for memory-constrained
  embedded systems, offering features like line-by-line decoding and fragment caching
  to minimize RAM usage.
slug: sjpg-decoder-for-lvgl
codeUrl: https://github.com/lvgl/lv_lib_split_jpg
siteUrl: https://docs.lvgl.io/master/libs/sjpg.html
star: 35
lastUpdated: '2021-10-19'
rtos: ''
libraries:
- lvgl
topics:
- embedded
- jpg
- lvgl
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- bmp-decoder-for-lvgl
- png-decoder-for-lvgl
- gif-decoder-for-lvgl
- micropython-jpeg
- image-converter-for-lvgl
- freetype-integration-for-lvgl
---

## Overview

The `lv_lib_split_jpg` repository provides a specialized image decoder for the LVGL (Light and Versatile Graphics Library) framework. While standard JPEG decoding is often resource-intensive for microcontrollers, this library introduces a custom format called **SJPG** (Split-JPEG) designed specifically to overcome memory limitations in embedded environments. By splitting the JPEG data into manageable fragments, it allows for high-quality image rendering on devices with limited RAM.

## Understanding the SJPG Format

SJPG, or 'split-jpeg,' is a custom format based on standard JPEG. It functions as a bundle of small JPEG fragments preceded by a specialized SJPG header. This architecture allows the decoder to process images in smaller chunks rather than decompressing the entire image into RAM at once.

When decoding a 'normal' JPG, the system typically requires enough RAM to hold the entire uncompressed image. For high-resolution displays, this can quickly exceed the available heap on many microcontrollers. In contrast, SJPG enables line-by-line or fragment-based fetching. The library implements an SJPEG frame fragment cache, which allows for fast fetching of lines if they are available in the cache, significantly reducing the peak memory footprint.

## Technical Implementation

The library is built upon the **Tiny JPEG Decompressor (TJpgDec)**, a lightweight decoding engine created by ChaN. By wrapping TJpgDec, `lv_lib_split_jpg` integrates seamlessly with LVGL's image decoder registry. 

**Key technical features include:**
- **Multi-source Support**: Images can be loaded from C-arrays or directly from a disk using LVGL's file system (lv_fs).
- **Simultaneous Handling**: The decoder can open and handle multiple files at the same time.
- **Configurable Cache**: The default SJPG image cache size is calculated as `xres * 2 * 16` bytes, though this can be modified to suit specific hardware constraints.
- **Color Depth**: The library currently supports 16-bit image formats, which is the standard for many embedded displays.

## Getting Started

To use the decoder, developers need to initialize the library alongside LVGL. The library registers itself as a decoder, allowing standard LVGL image objects to use `.jpg` or `.sjpg` files as sources. If you are loading files from a disk, you must also ensure a file system driver (like `lv_fs_if`) is active.

```c
#include <lvgl/lvgl.h>
#include "lv_lib_split_jpg/lv_sjpg.h"

void demo_jpg_sjpg(void)
{
  // Initialize the split jpeg decoder
  lv_split_jpeg_init();

  lv_obj_t * img1 = lv_img_create(lv_scr_act(), NULL);
  lv_obj_t * img2 = lv_img_create(lv_scr_act(), NULL);

  // Load a standard JPG from a C array
  lv_img_set_src(img1, &wallpaper_jpg);

  // Load an SJPG from a file (requires lv_fs)
  lv_img_set_src(img2, "S/path/to/image.sjpg");
}
```

## The Conversion Workflow

Since SJPG is a custom format, the repository includes a Python-based converter (`jpg_to_sjpg.py`). This tool allows developers to convert standard JPEG files into `.sjpg` files or C-arrays. The script requires Python 3 and the PIL (Pillow) library. By running the script, users receive a binary file and a C file containing the image data, ready for inclusion in an embedded project.

```sh
python3 jpg_to_sjpg.py wallpaper.jpg
```

## Conclusion

The `lv_lib_split_jpg` library is an essential tool for LVGL users working on memory-constrained hardware. By providing a path to use high-quality JPEG imagery without the typical RAM overhead, it enables more visually rich interfaces on devices like the ESP32, STM32, and other popular microcontrollers. Note that this library has been merged into the core LVGL repository as of recent versions, reflecting its importance to the ecosystem.
