---
title: GIF Decoder for LVGL
summary: A GIF decoding library for the LVGL graphics framework, enabling the use
  of animated GIF images in embedded user interfaces. It supports loading GIFs from
  file systems or directly from flash memory as C arrays.
slug: gif-decoder-for-lvgl
codeUrl: https://github.com/lvgl/lv_lib_gif
siteUrl: https://docs.lvgl.io/master/details/libs/gif.html
star: 37
lastUpdated: '2025-06-24'
rtos: ''
libraries:
- lvgl
topics:
- embedded
- gif-decoder
- lvgl
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- png-decoder-for-lvgl
- bmp-decoder-for-lvgl
- lottie-animation-library-for-lvgl
- animated-gif-on-a-320x240-lcd-display-ili9341-with-the-esp32
- sjpg-decoder-for-lvgl
- qr-code-library-for-lvgl
---

## Overview

The `lv_lib_gif` library is a specialized decoder for the Light and Versatile Graphics Library (LVGL), designed to bring animated GIF support to embedded displays. By integrating the lightweight `gifdec` decoder, this library allows developers to incorporate rich animations into their user interfaces without the overhead of complex video formats. 

While this specific repository has been archived and merged into the main LVGL core as a standard library, it remains a foundational piece of middleware for developers working with older versions of LVGL or those looking to understand the implementation of custom image decoders.

## Key Features

The library provides a seamless way to handle GIF animations, which are notoriously memory-intensive for microcontrollers. It addresses this by providing two primary methods of data access:

- **File System Integration**: GIFs can be loaded directly from an external storage device (like an SD card or SPIFFS) using LVGL's file system abstraction.
- **Flash Memory Support**: For systems without a file system, GIFs can be converted into C arrays and stored directly in the internal flash memory of the microcontroller.
- **Automatic Animation**: Once created, the GIF object handles its own timing and frame updates, integrating directly into the LVGL task handler.

## Technical Implementation

The library is built upon the `gifdec` project, a small and efficient GIF decoder written in C. It wraps this decoder into an LVGL-compatible object type. When a GIF is initialized, the library manages the frame buffer and the delay between frames, ensuring that the animation plays at the correct speed regardless of the main loop's execution time.

### Using GIFs from Files

To use a GIF stored on a file system, the library provides a simple constructor. You must ensure that LVGL's file system (POSIX, FATFS, etc.) is correctly configured with a drive letter.

```c
lv_obj_t * img = lv_gif_create_from_file(lv_scr_act(), "S/path/to/example.gif");
```

### Using GIFs from Flash

If the GIF is stored in flash as a C array, you can use the data-based constructor. This is ideal for small icons or UI elements that must be available immediately upon boot.

```c
extern const uint8_t example_gif_map[];
lv_obj_t * img = lv_gif_create_from_data(lv_scr_act(), example_gif_map);
```

## Image Conversion

To use the flash-based method, GIF files must be converted into a raw byte array. LVGL provides an [online image converter](https://lvgl.io/tools/imageconverter) for this purpose. When converting, users should select the "Raw" color format and "C array" output format to ensure the decoder can process the data correctly.

## Integration and Compatibility

This library is designed to be RTOS-agnostic, meaning it can run on FreeRTOS, Zephyr, RT-Thread, or even bare-metal systems, provided that LVGL itself is properly ported. Because GIF decoding requires a buffer to hold at least one frame of the image, developers should be mindful of RAM usage, especially when dealing with large or high-resolution animations on memory-constrained devices like the ESP32 or STM32 series.
