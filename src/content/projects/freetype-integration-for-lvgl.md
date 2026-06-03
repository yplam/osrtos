---
title: FreeType Integration for LVGL
summary: A specialized library that interfaces the FreeType font engine with the LVGL
  graphics framework to generate font bitmaps at runtime. It enables embedded applications
  to render high-quality vector fonts dynamically while providing sophisticated caching
  mechanisms to optimize memory and performance.
slug: freetype-integration-for-lvgl
codeUrl: https://github.com/lvgl/lv_lib_freetype
siteUrl: https://docs.lvgl.io/master/libs/freetype.html
star: 58
lastUpdated: '2021-10-04'
rtos: ''
libraries:
- lvgl
topics:
- embedded
- font
- freetype
- lvgl
- ttf
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lv-font-conv
- qr-code-library-for-lvgl
- lottie-animation-library-for-lvgl
- gif-decoder-for-lvgl
- littlevgl2rtt
- lvgl-utilities
---

## Overview

The `lv_lib_freetype` library provides a bridge between the FreeType font engine and the LVGL (Light and Versatile Graphics Library) ecosystem. While LVGL typically relies on pre-rendered bitmap fonts to save processing power, this library allows developers to use TrueType (TTF) and OpenType (OTF) fonts directly on their embedded devices. By rendering glyphs at runtime, developers gain the flexibility to change font sizes, weights, and styles without the need to pre-generate massive bitmap arrays for every possible character combination.

## Key Features and Capabilities

The integration offers several advanced features designed to balance the high-quality rendering of FreeType with the resource constraints of embedded hardware:

- **Dynamic Font Generation**: Generate font bitmaps on-the-fly, allowing for a wide variety of font sizes and styles from a single font file.
- **Sophisticated Caching**: Includes a built-in cache manager to store rendered glyphs, significantly reducing the CPU overhead of repeated rendering. It supports both SBIT (Small Bitmaps) caching for small font sizes and standard image caching for larger glyphs.
- **Style Support**: Easily apply styles such as normal, italic, and bold to your fonts through a simple configuration structure.
- **Seamless LVGL Integration**: Once initialized, the FreeType-backed font behaves like any other `lv_font_t` object, making it compatible with all standard LVGL widgets like labels, buttons, and text areas.

## Technical Implementation

The library is structured around the `lv_ft_info_t` structure, which defines the font's path, weight (size), and style. Internally, it manages the FreeType library instance and handles the conversion of FreeType glyphs into LVGL-compatible bitmap descriptors.

### Caching Strategy

One of the most critical aspects of using FreeType in an embedded context is memory management. The library provides the `LV_USE_FT_CACHE_MANAGER` define to enable a cache instance. Within this, users can choose between:
- **SBIT Cache**: Highly memory-efficient for small bitmaps (typically font sizes under 256px).
- **Image Cache**: Used for larger font sizes where SBIT is not applicable.

## Getting Started

To use FreeType with LVGL, you must first ensure the FreeType library is installed on your system or cross-compiled for your target hardware. After linking the library and including the necessary paths, you can initialize the font engine and create a font as shown below:

```c
/* Init freetype library with cache for 64 faces and 1 size */
lv_freetype_init(64, 1, 0);

/* Define font information */
static lv_ft_info_t info;
info.name = "./fonts/arial.ttf";
info.weight = 16;
info.style = FT_FONT_STYLE_NORMAL;

/* Initialize the font */
lv_ft_font_init(&info);

/* Apply the font to a style */
static lv_style_t style;
lv_style_init(&style);
lv_style_set_text_font(&style, info.font);

/* Create a label using the new font */
lv_obj_t * label = lv_label_create(lv_scr_act());
lv_obj_add_style(label, &style, 0);
lv_label_set_text(label, "Hello FreeType");
```

## Evolution and Maintenance

It is important to note that this specific repository has been merged into the main LVGL repository as a core library component. For modern projects using LVGL v8 or later, the FreeType integration is typically managed directly within the main LVGL configuration (`lv_conf.h`), ensuring better version synchronization and easier maintenance for embedded developers.
