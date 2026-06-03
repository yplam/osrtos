---
title: MicroPython Font Handling Utility
summary: A comprehensive toolset for converting industry-standard font files into
  Python source code optimized for MicroPython. It enables high-performance text rendering
  on resource-constrained microcontrollers by utilizing frozen bytecode to minimize
  RAM consumption. The project includes a PC-based conversion utility and MicroPython
  classes for rendering text to various display hardware.
slug: micropython-font-handling-utility
codeUrl: https://github.com/peterhinch/micropython-font-to-py
star: 446
lastUpdated: '2025-05-28'
rtos: ''
libraries:
- micropython
topics:
- fonts
- micropython
- python-3
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- micropython-st7789-lcd-driver
- micropython-st7735-tft-lcd-driver
- micropython-ssd1306-image-display
- lv-font-conv
- lvgl-utilities
- micropython-lib
---

## Overview

MicroPython platforms often face a significant challenge when it comes to displaying text: the trade-off between RAM usage and rendering speed. Standard font files are typically too large to load entirely into the limited RAM of a microcontroller, while reading individual glyphs from a filesystem on demand is often too slow for a fluid user experience. 

The MicroPython Font Handling project provides an elegant solution to this problem. It consists of a PC-based utility that renders industry-standard font files (such as TTF, OTF, BDF, and PCF) into bitmaps stored as Python source code. By declaring font data as `bytes` objects within a Python file, the font can be "frozen" as bytecode during the firmware build process. This allows the data to reside in flash memory and be accessed via `memoryview` objects, resulting in extremely low RAM overhead without sacrificing performance.

## Key Features and Capabilities

The project is built around several core components that facilitate the transition from desktop font files to embedded displays:

- **font_to_py.py Utility**: A command-line tool written in Python 3 that runs on a PC. It converts scalable fonts to Python source code based on a target pixel height.
- **Writer and CWriter Classes**: MicroPython modules that handle the actual rendering of text to monochrome or color displays.
- **Support for Multiple Formats**: While scalable TTF and OTF files are supported for larger sizes, the utility also handles hand-designed BDF and PCF bitmapped fonts, which often yield better results at very small pixel heights.
- **Memory Efficiency**: Fonts can be imported normally or frozen into firmware. When frozen, the RAM usage is minimal regardless of the font size, as the data is accessed directly from flash.
- **Flexible Mapping**: Supports both horizontal and vertical mapping and bit reversal to ensure compatibility with various display hardware controllers.
- **Unicode and Sparse Sets**: The utility can generate standard ASCII sets or custom, sparse Unicode character sets for non-English languages or specific icon fonts.

## Technical Implementation

The conversion process uses the Freetype library and its Python bindings to render glyphs into bitmaps. The resulting Python file contains several metadata functions—such as `height()`, `max_width()`, and `baseline()`—along with a `get_ch()` function. This function returns a `memoryview` to the glyph bitmap, allowing the display driver to blit the data directly to the frame buffer.

For sparse character sets (where Unicode ordinals are far apart), the utility employs an optimized index and a binary search algorithm to keep the lookup process efficient and the file size small. This is particularly useful for projects requiring specific symbols or international character support without including thousands of unused glyphs.

## Hardware and Driver Compatibility

The system is designed to be hardware-agnostic. It works seamlessly with drivers subclassed from the official MicroPython `framebuffer` class, as well as drivers where the frame buffer is implemented in the display hardware itself. It is widely used with SSD1306 OLED displays and is a core component of the [nano-gui](https://github.com/peterhinch/micropython-nano-gui) ecosystem, which provides drivers for a variety of display technologies.

## Getting Started

To create a font, users run the utility on a PC specifying the source font, the desired height, and the output filename:

```shell
$ font_to_py.py FreeSans.ttf 23 myfont.py
```

On the MicroPython target, the font is used by instantiating a `Writer` object with a compatible display driver:

```python
import myfont
from writer import Writer
from ssd1306 import SSD1306_I2C

# ... initialize I2C and display ...
wri = Writer(display, myfont)
wri.set_textpos(0, 0)
wri.printstring('Hello MicroPython')
display.show()
```

This workflow allows developers to bring high-quality typography to embedded projects with minimal impact on the system's limited memory resources.
