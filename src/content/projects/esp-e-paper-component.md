---
title: ESP E-Paper Component
summary: A flexible e-paper display driver for the ESP-IDF framework featuring LVGL
  9 integration. It supports a wide range of panels including black/white, 4-color
  BWRY, and 6-color displays with advanced features like Floyd-Steinberg dithering
  and partial refresh. Designed for low-power IoT devices, electronic shelf labels,
  and photo frames on ESP32 series microcontrollers.
slug: esp-e-paper-component
codeUrl: https://github.com/tuanpmt/esp_epaper
siteUrl: https://components.espressif.com/components/tuanpmt/esp_epaper
star: 11
lastUpdated: '2025-12-20'
rtos: freertos
libraries:
- lvgl
topics:
- eink
- esp32
- esp32-s3
- iot
isShow: true
image: /202601/epaper.webp
createdAt: '2026-01-29'
updatedAt: '2026-01-29'
relatedProjects:
- lvgl-display-and-touchpad-drivers-for-esp32
- lvgl-port-for-esp32
- esp32-smartdisplay
- esp32-tux
- esp-lvgl
- esphome-lvgl-component
---

## Overview

The ESP E-Paper Component is a high-performance display driver designed specifically for the ESP-IDF ecosystem. It provides a robust bridge between the LVGL 9 graphics library and various e-paper (EPD) panels, enabling developers to create sophisticated user interfaces on low-power, sunlight-readable displays. The project is particularly well-suited for IoT devices, electronic shelf labels (ESL), and digital photo frames.

## Key Features and Capabilities

One of the standout features of this component is its support for a diverse range of color depths and panel types. While many e-paper drivers are limited to simple black-and-white updates, this library handles:

- **Black/White (1-bit)**: Optimized for the fastest possible refresh rates.
- **4-Color BWRY (2-bit)**: Support for Black, White, Red, and Yellow panels.
- **6-Color (4-bit)**: Support for advanced panels (like the PhotoPainter) featuring Black, White, Yellow, Red, Blue, and Green.

### Advanced Dithering
To overcome the color limitations of e-paper hardware, the component implements Floyd-Steinberg error-diffusion dithering. This algorithm allows for smooth gradients and photo-quality imagery by distributing quantization errors to neighboring pixels. It automatically handles RGB565 to panel palette conversion, making it easy to display complex images on limited-color hardware.

### Smart Partial Refresh
For black-and-white panels, the driver supports partial refresh modes. This technique tracks base images to perform differential updates, significantly reducing the "flashing" effect associated with full e-paper refreshes. It includes configurable ghosting prevention and automatic mode switching between partial and full updates to maintain image clarity over time.

## Data-Driven Architecture

The project employs a highly extensible, data-driven architecture. Adding support for a new panel often requires only a single line of code in the panel registry if it uses a compatible controller (like the SSD16xx series). The system uses a controller abstraction layer that separates hardware-specific commands from the high-level drawing logic. Capability flags allow the application to detect features like partial refresh or grayscale support at runtime.

## Technical Implementation

The component is optimized for the ESP32 series, including the ESP32-S3 and C-series. It efficiently manages memory by automatically allocating large buffers (required for high-resolution displays like 800x480) from PSRAM when available. It utilizes chunked SPI transfers to ensure compatibility with DMA, maintaining performance even during complex image processing.

### Basic Usage Example

```c
#include "epaper.h"
#include "epaper_lvgl.h"
#include "lvgl.h"

void app_main(void)
{
    lv_init();

    // Configure for a specific board preset
    epd_config_t cfg = EPD_CONFIG_ESP32S3_154();

    // Initialize hardware
    epd_handle_t epd;
    ESP_ERROR_CHECK(epd_init(&cfg, &epd));

    // Initialize LVGL display interface
    epd_lvgl_config_t lvgl_cfg = EPD_LVGL_CONFIG_DEFAULT();
    lvgl_cfg.epd = epd;
    lv_display_t *disp = epd_lvgl_init(&lvgl_cfg);

    // Standard LVGL UI code
    lv_obj_t *label = lv_label_create(lv_screen_active());
    lv_label_set_text(label, "Hello E-Paper!");
    lv_obj_center(label);

    // Trigger refresh
    epd_lvgl_refresh(disp);
}
```

## Hardware Support

The library includes built-in presets for popular Waveshare and Good Display modules, such as the ESP32-S3-ePaper-1.54 and the 7.3" PhotoPainter. It supports a wide array of SSD16xx-based generic panels ranging from 1.54" to 4.2". Because it is built as a standard ESP-IDF component, it integrates seamlessly into existing projects via the Espressif Component Registry.
