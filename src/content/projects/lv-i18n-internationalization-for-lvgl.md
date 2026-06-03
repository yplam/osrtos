---
title: 'lv_i18n: Internationalization for LVGL'
summary: A lightweight internationalization (i18n) toolset and C library designed
  for embedded systems using the LVGL graphics library. It provides a gettext-like
  workflow for extracting strings from C source files, managing translations via YAML,
  and generating optimized C code for runtime translation.
slug: lv-i18n-internationalization-for-lvgl
codeUrl: https://github.com/lvgl/lv_i18n
star: 86
version: 0.2.1
lastUpdated: '2025-06-04'
rtos: ''
libraries:
- lvgl
topics:
- i18n
- localization
- lvgl
- multilanguage
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lv-chinese-ime
- lvgl-utilities
- gooey-gui-library
- lvglpp-a-c-wrapper-for-lvgl
- lv-modern-c-20-bindings-for-lvgl
- lv-font-conv
---

## Overview

lv_i18n is a lightweight internationalization solution specifically designed for embedded systems. While it was created to support the LVGL (Light and Versatile Graphics Library) ecosystem, it serves as a general-purpose, lightweight replacement for `gettext` in C-based projects. The toolset simplifies the process of adding multi-language support to resource-constrained devices by providing a streamlined workflow for string extraction, translation management, and code generation.

## The i18n Workflow

The project operates through a clear, multi-step pipeline that bridges the gap between source code and localized content:

1.  **Markup**: Developers mark translatable strings in their C files using short, intuitive functions: `_("text")` for singular forms and `_p("format", count)` for plural forms.
2.  **Extraction**: A Node.js-based CLI tool scans the source code and automatically populates YAML template files with the identified text IDs.
3.  **Translation**: Translators edit the YAML files, which follow CLDR (Common Locale Data Repository) naming conventions, making them compatible with professional translation workflows.
4.  **Compilation**: The CLI tool compiles these YAML files into standard C and H files. These generated files contain the translation data and the necessary logic to retrieve them at runtime.

## Key Features and Capabilities

### Pluralization Support
lv_i18n handles the complexities of pluralization across different languages. By using the `_p` function, developers can provide different strings based on numeric counts (e.g., "1 item" vs "5 items"). The library uses the current locale to select the correct plural algorithm, ensuring grammatical accuracy in languages with complex plural rules.

### Performance Optimization
For embedded systems where CPU cycles are precious, lv_i18n offers an `--optimize` flag during the compilation phase. By default, the library searches for translations using string comparisons (O(n)). When optimized, the tool generates code that uses integer indexing, resulting in O(1) lookup times. This optimization relies on modern compilers (like GCC or Clang) being able to evaluate `strcmp()` with constants at compile time.

### Fallback Mechanism
The library includes robust fallback logic. If a translation is missing in the currently selected locale, it attempts to use the default locale. If the string is still not found, it returns the original message ID, ensuring that the UI never displays empty labels.

## Technical Implementation

The runtime component of lv_i18n is designed to be header-only or easily integrated into existing build systems. The C API is minimal and efficient:

```c
#include "lv_i18n/lv_i18n.h"

// Initialize with the generated language pack
lv_i18n_init(lv_i18n_language_pack);

// Switch languages at runtime
lv_i18n_set_locale("en-GB");

// Use translated strings in your UI
gui_set_text(label, _("main_menu_title"));

// Handle plurals
char buf[64];
sprintf(buf, _p("user_count", user_cnt), user_cnt);
```

## Integration and Tooling

The project provides a Node.js CLI that can be installed via npm. This tool handles the `extract`, `compile`, and `rename` commands. Because the final output is standard C code, the library does not require a heavy runtime environment or external dependencies on the target hardware, making it ideal for microcontrollers and other embedded platforms where memory and storage are limited.
