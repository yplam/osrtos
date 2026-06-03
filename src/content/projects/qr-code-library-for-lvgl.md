---
title: QR Code Library for LVGL
summary: A QR code generation library for the LVGL graphics library, utilizing the
  Nayuki QR-Code-generator. It allows for the creation and display of dynamic QR codes
  on embedded systems by rendering them as LVGL canvas objects.
slug: qr-code-library-for-lvgl
codeUrl: https://github.com/lvgl/lv_lib_qrcode
siteUrl: https://docs.lvgl.io/master/libs/qrcode.html
star: 58
lastUpdated: '2021-10-04'
rtos: ''
libraries:
- lvgl
topics:
- embedded
- lvgl
- qrcode-generator
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- png-decoder-for-lvgl
- gif-decoder-for-lvgl
- freetype-integration-for-lvgl
- lvgl-rust-bindings
- lvgl-port-for-stm32f429-discovery-kit
- eclipse-simulator-for-lvgl-using-sdl
---

## Overview

The `lv_lib_qrcode` library provides a seamless way to generate and display QR codes within the LVGL (Light and Versatile Graphics Library) ecosystem. By integrating the highly efficient [QR-Code-generator](https://github.com/nayuki/QR-Code-generator) by Nayuki, this library enables embedded developers to add visual data encoding to their user interfaces with minimal overhead.

While this repository was originally a standalone library, its functionality has since been merged into the core LVGL repository, reflecting its status as a standard utility for LVGL-based embedded projects.

## Key Features

The library abstracts the complexity of QR code generation into a simple API that fits naturally with LVGL's object-oriented design. 

**Core capabilities include:**
- **Canvas-Based Rendering**: QR codes are created as `lv_canvas` objects, allowing them to be treated like any other UI element.
- **Customizable Appearance**: Developers can specify both the dark and light colors of the QR code to match their application's theme.
- **Automatic Scaling**: The library handles scaling logic, ensuring that QR codes with less data are scaled by integer factors to best fit the requested display size.
- **Binary and Text Support**: It supports encoding both standard text strings and raw binary data.

## Technical Implementation

At its core, the library uses the `qrcodegen` C library to handle the mathematical heavy lifting of QR generation. The LVGL wrapper, `lv_qrcode`, manages the memory allocation and the conversion of the generated bitmask into an LVGL-compatible image format.

When a QR code is updated, the library calculates the necessary version (size) and error correction level (defaulting to MEDIUM). It then renders the resulting modules onto an indexed 1-bit canvas. This approach is memory-efficient, which is critical for resource-constrained microcontrollers.

## Getting Started

To use the library, you include the header and create a QR code object by specifying the parent object, the desired pixel size, and the color palette.

```c
const char * data = "Hello world";

/* Create a 100x100 QR code with custom colors */
lv_obj_t * qr = lv_qrcode_create(lv_scr_act(), 100, lv_color_hex3(0x33f), lv_color_hex3(0xeef));

/* Set the data to be encoded */
lv_qrcode_update(qr, data, strlen(data));
```

## Integration and Performance

Because the library uses LVGL's internal memory management (`lv_mem_alloc`), it integrates cleanly with existing heap configurations. The rendering process is optimized to avoid slow pixel-by-pixel operations where possible, instead buffering bytes to update the canvas efficiently. This makes it suitable for applications that need to update QR codes dynamically, such as displaying unique session keys, Wi-Fi credentials, or transaction IDs on an embedded screen.
