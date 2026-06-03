---
title: ESP32 Composite Video Library
summary: A specialized library for ESP32 that generates PAL, NTSC, and SECAM composite
  video signals using the internal DAC and I2S peripherals. It supports multiple resolutions
  and framebuffer formats, including direct integration with the LVGL graphics library
  for creating embedded GUIs without external video hardware.
codeUrl: https://github.com/aquaticus/esp32_composite_video_lib
isShow: false
rtos: freertos
libraries:
- lvgl
topics:
- esp32
- esp32-idf
- lvgl
- video
star: 269
version: v1.0.0
lastUpdated: '2022-05-03'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- lvgl-port-for-esp32
- lvgl-display-and-touchpad-drivers-for-esp32
- esp-lvgl
- esp32-smartdisplay
- esp32-lvgl-8-x-sdspi-template
- lvgl-port-for-m5stack-core2
---

Generating video signals usually requires dedicated hardware or complex external encoders, but the **ESP32 Composite Video Library** changes that for the ESP32 ecosystem. This library allows developers to output a composite video signal (CVBS) directly from a single GPIO pin (GPIO25) using the ESP32's internal DAC and I2S peripherals. While currently limited to monochrome (grayscale) output, it provides a robust foundation for retro-gaming emulators, diagnostic displays, and low-cost infotainment systems.

## Versatile Video Standards and Resolutions
One of the library's strongest points is its flexibility. It supports the three major analog television standards: **PAL**, **SECAM**, and **NTSC**. Because it generates the signal in software via DMA, it can support a wide variety of resolutions and pixel clocks. Whether you are aiming for the square pixels of a classic PAL display (7.357 MHz) or the standard BT.601 DV/DVD formats (13.5 MHz), the library has predefined modes for everything from 256×192 (ZX Spectrum style) to 720×288 (overscan high-resolution).

## Hardware Requirements and Setup
The hardware requirements are minimal. You only need an ESP32 board and a way to connect **GPIO25** to the center pin of a Cinch (RCA) connector, with the board's GND connected to the outer shield. No resistors or capacitors are strictly required for a basic setup, making it one of the easiest ways to get a video signal out of a microcontroller.

To integrate it into your ESP-IDF project, you can add it as a component via git submodules:

```bash
git submodule add https://github.com/aquaticus/esp32_composite_video_lib.git components/esp32_composite_video_lib
```

## Integration with LVGL
For developers looking to create modern user interfaces, the library includes a dedicated driver for **LVGL (Light and Versatile Graphics Library)**. It supports LVGL version 8.3 and offers several color depth modes, including 1-byte-per-pixel monochrome and RGB565. 

There are two primary ways to handle the framebuffer with LVGL:
1. **Direct Framebuffer Access**: LVGL writes directly to the video memory. This is memory-efficient but can lead to flickering during heavy redraws.
2. **Buffered Access**: Uses an intermediate buffer to ensure smoother animations and eliminate tearing, though it requires more RAM.

## Simple API for Quick Start
Starting a video stream is remarkably simple. The library provides high-level functions to initialize the hardware and start the signal generation. For a quick test, you can display a standard Philips PM5544 test pattern with just a few lines of code:

```c
#include "video.h"

void app_main(void)
{
    // Displays the Philips PM5544 pattern in PAL 384x288 resolution
    video_test_pal(VIDEO_TEST_PM5544);
}
```

For more advanced use cases, the `video_graphics()` function allows you to specify the resolution and framebuffer format (such as RGB332 or Grey 8-bit). The library also includes diagnostic features, such as the ability to toggle a GPIO pin at the start of every scanline or field, which is invaluable for debugging timing issues with an oscilloscope.

## Performance Considerations
Because generating a stable video signal is timing-critical, the library relies on the ESP32's DMA and I2S capabilities. Users should ensure that the compiler optimization level is set to **Performance (-O2)** in the ESP-IDF configuration to maintain the strict timing required for analog video sync pulses. If you are using the diagnostic features, the library can even provide interrupt statistics to help you monitor the system load.
