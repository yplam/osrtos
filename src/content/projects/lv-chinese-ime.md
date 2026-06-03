---
title: lv_chinese_ime
summary: A custom component for the LVGL graphics library that extends the standard
  keyboard with Chinese Pinyin input method support. It is designed for embedded systems
  requiring localized text entry and is compatible with any environment where LVGL
  runs.
slug: lv-chinese-ime
codeUrl: https://github.com/100askTeam/lv_chinese_ime
star: 37
lastUpdated: '2022-04-25'
rtos: ''
libraries:
- lvgl
topics:
- chinese
- chinese-characters
- ime
- lvgl
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lv-lib-100ask
- lv-i18n-internationalization-for-lvgl
- esphome-lvgl-component
- sjpg-decoder-for-lvgl
- lvgl-port-for-esp32
- littlevgl2rtt
---

## Overview

`lv_chinese_ime` is a specialized widget enhancement for the Light and Versatile Graphics Library (LVGL). It extends the standard `lv_keyboard` component to provide a functional Chinese Pinyin input method (IME). This allows developers to integrate Chinese text entry into their embedded GUI applications with the same ease of use as the standard LVGL keyboard.

As a custom component, it maintains the same interface and behavior as the original `lv_keyboard` while adding a layer for Pinyin processing and candidate selection. This makes it an essential tool for developers targeting the Chinese market with embedded devices running LVGL.

## Key Features

- **Pinyin Support**: Adds a Pinyin-based Chinese input method to the standard LVGL keyboard.
- **Seamless Integration**: Built directly on top of `lv_keyboard`, ensuring compatibility with existing LVGL layouts and event handling.
- **Customizable Thesaurus**: Supports both built-in and custom dictionaries (thesauruses), allowing developers to optimize for specific vocabulary or memory constraints.
- **Font Flexibility**: Works with standard LVGL font symbols, requiring only a compatible Chinese font to display candidates and input text.
- **Low Overhead**: Designed to run in any environment where LVGL is supported, with resource usage primarily scaling based on the size of the chosen font and dictionary.

## Technical Implementation

The library is designed for LVGL v8.1.0 and later. It utilizes a configuration file, `lv_chinese_ime_conf.h` (derived from a template), to enable or disable specific features. The core logic handles the mapping of Latin character sequences (Pinyin) to Chinese character candidates, which are then displayed for user selection.

### Resource Management

Because embedded systems often have limited memory, `lv_chinese_ime` allows for significant customization regarding:
1. **Font Files**: The size of the Chinese font used for the keyboard and text area.
2. **Thesaurus/Dictionary**: The complexity and size of the Pinyin-to-character mapping table.

## Getting Started

To use the Chinese IME, the component must be placed alongside the `lvgl` directory. After configuring the `lv_chinese_ime_conf.h` file, the widget can be created using a simple API call:

```c
/* Declare the Chinese font */
LV_FONT_DECLARE(lv_font_source_han_sans_bold_14);

void example_setup(void)
{
    /* Create the Chinese IME widget */
    lv_obj_t * kb = lv_chinese_ime_create(lv_scr_act());
    
    /* Set the font for the candidate list */
    lv_chinese_ime_set_text_font(&lv_font_source_han_sans_bold_14, 0);

    /* Create a text area to receive input */
    lv_obj_t * ta = lv_textarea_create(lv_scr_act());
    lv_obj_set_style_text_font(ta, &lv_font_source_han_sans_bold_14, 0);
    
    /* Assign the text area to the keyboard */
    lv_keyboard_set_textarea(kb, ta);
}
```

## Important Note on Maintenance

Please note that this specific repository is now considered obsolete. The functionality has been migrated and integrated into the broader `lv_lib_100ask` ecosystem. Users looking for the most up-to-date version and continued support should refer to the `lv_100ask_chinese_ime` component within the [lv_lib_100ask](https://github.com/100askTeam/lv_lib_100ask) repository.
