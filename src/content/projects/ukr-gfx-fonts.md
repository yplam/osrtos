---
title: Ukr_GFX_fonts
summary: A specialized collection of fonts and utilities designed to add Ukrainian
  character support to popular Arduino graphics libraries like Adafruit GFX and TFT_eSPI.
  It includes a variety of serif, sans-serif, and monospace typefaces along with a
  conversion function to handle UTF-8 string encoding for embedded displays.
slug: ukr-gfx-fonts
codeUrl: https://github.com/igor-gia/Ukr_GFX_fonts
version: v1.0.2
lastUpdated: '2025-11-05'
licenses:
- MIT
image: /202605/Ukr_GFX_fonts_0.avif
rtos: ''
libraries:
- tft-espi
topics:
- adafruit-gfx
- arduino-library
- cyd
- display
- e-ink
- epaper
- esp32
- fonts
- gfx
- gfxfont
- gfxlib
- ili9341
- monotype
- oled
- serif-font
- ukrainian
- ukrainian-language
- win1251
isShow: true
createdAt: '2026-05-21T01:57:03+00:00'
updatedAt: '2026-05-21T01:57:03+00:00'
---

Displaying localized text on microcontrollers often presents a significant hurdle, especially for languages using Cyrillic scripts like Ukrainian. Standard GFX libraries typically default to ASCII or limited Latin character sets, leaving developers to struggle with manual font generation or encoding issues. Ukr_GFX_fonts addresses this gap by providing a curated set of high-quality fonts specifically optimized for GFX-compatible libraries, alongside a robust mechanism for handling UTF-8 strings.

### Comprehensive Font Collection

The library includes a diverse selection of typefaces tailored for different UI needs. Developers can choose from serif fonts like Cambria, sans-serif options such as Tahoma, Segoe UI, and Verdana, or monospace fonts like Consola and Lucon. These fonts are provided in various sizes and styles—including italic, bold, and bold-italic—allowing for the creation of polished and professional user interfaces. 

Each font is provided as a `.h` header file, making them easy to include in standard Arduino sketches. Because rendering small fonts on low-resolution displays can sometimes introduce visual artifacts, the project remains compatible with online tools like the Adafruit GFX Pixel Font Customiser, allowing developers to fine-tune glyphs for their specific hardware.

### Encoding and Conversion

One of the core technical components of the project is the `Utf8win1251` conversion function. Since many embedded graphics libraries do not natively parse multi-byte UTF-8 characters for custom GFX fonts, this utility acts as a bridge. It converts standard UTF-8 strings into the specific character codes mapped within the font files using a replacement table. 

This conversion is essential for correctly displaying Ukrainian-specific characters (like "Ґ", "є", "і", "ї") that fall outside the standard ASCII range. The library also provides specific guidance for integration with LovyanGFX, which uses its own internal re-encoding algorithm, ensuring that the conversion logic remains consistent across different graphics drivers.

### Usage and Implementation

Integrating Ukr_GFX_fonts into an existing project is straightforward. After including the utility header and the desired font file, the conversion function is used directly within the print statement. 

```cpp
#include <Arduino_GFX_Library.h>
#include <utils.h>
#include <fonts/tahomaUkr12.h>

// ... initialization ...

String msg = "Привіт Ґ!";
gfx->setFont(&tahomaUkr12);
gfx->setCursor(0, 20);
gfx->print(String(Utf8win1251(msg.c_str())));
```

### Hardware and Library Compatibility

The project is designed to be highly portable across the Arduino ecosystem. It offers full compatibility with the original Adafruit GFX format, the recommended Arduino_GFX_Library, and GxEPD2 for E-Ink displays. It also supports TFT_eSPI and LovyanGFX via their respective font-setting methods. 

While the library is platform-agnostic, it has been extensively tested on ESP32-based hardware, including the popular "Cheap Yellow Display" (CYD). This makes it an ideal choice for developers building IoT devices, dashboard displays, or portable gadgets that require localized Ukrainian text rendering.
