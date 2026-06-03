---
title: Zephyr RTOS SSD1306 Custom Font Demo
summary: A demonstration project for Zephyr RTOS showing how to use custom TrueType
  fonts (TTF) with the Character Framebuffer (CFB) subsystem. It targets STM32F103
  'Black Pill' or 'Blue Pill' boards equipped with an SSD1306-based OLED display over
  SPI.
slug: zephyr-rtos-ssd1306-custom-font-demo
codeUrl: https://github.com/oldrev/stm32_blackpill_zephyr_ssd1306_demo
star: 6
lastUpdated: '2020-11-15'
rtos: zephyr
topics:
- blackpill
- bluepill
- c
- embedded-systems
- oled
- oled-display-ssd1306
- ssd1306
- stm32
- zephyr
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- zephyr-lvgl-sample-for-nrf52840-mdk
- st7789-and-lvgl-demo-for-apache-nuttx-rtos
- zephyr-rtos-lorawan-node
- swift-embedded-esp32-c6-oled-demo
- zephyr-stm32-spi-example
- arm-mbed-os-blue-pill-usb-demo
---

## Overview

The `stm32_blackpill_zephyr_ssd1306_demo` project serves as a practical example for developers working with the Zephyr RTOS and small OLED displays. Specifically, it demonstrates the integration of custom TrueType Fonts (TTF) into the Character Framebuffer (CFB) subsystem, allowing for high-quality text rendering on resource-constrained hardware like the STM32F103 "Black Pill" or "Blue Pill" boards.

## Custom Font Integration

One of the standout features of this demo is its use of the Zephyr build system to convert standard TTF files into header files compatible with the CFB subsystem. By using the `generate_cfb_font_for_target` CMake function, the project automates the conversion of fonts like FixedSys and JetBrains Mono into bitmap formats that the SSD1306 driver can process. This approach eliminates the need for manual bitmap creation and allows developers to leverage modern typography in their embedded projects.

In the `CMakeLists.txt`, the project defines the font generation parameters, such as character width, height, and the specific range of ASCII characters to include:

```cmake
generate_cfb_font_for_target(app fonts/fsex302.ttf ${gen_dir}/cfb_font_fixedsys32.h 8 16 -s 16 --first 32 --last 126)
generate_cfb_font_for_target(app fonts/JetBrainsMono-Bold.ttf ${gen_dir}/cfb_font_jetbrains_mono_bold.h 26 48 -s 40 --first 32 --last 126)
```

## Hardware and Configuration

The project is designed for the ubiquitous STM32F103C8T6 microcontroller. It utilizes an SSD1306 OLED screen connected via SPI. The configuration is handled through Zephyr's Kconfig system, with `prj.conf` enabling essential modules:

- **CONFIG_DISPLAY**: Enables the display driver support.
- **CONFIG_SSD1306**: Specifically enables the SSD1306 driver.
- **CONFIG_CHARACTER_FRAMEBUFFER**: Activates the CFB subsystem for text rendering.
- **CONFIG_CHARACTER_FRAMEBUFFER_USE_DEFAULT_FONTS**: Set to `n` to prioritize the custom fonts provided in the project.

## Getting Started

The project uses the standard Zephyr `west` build tool. It provides configurations for both the `stm32_min_dev_black` and `stm32_min_dev_blue` boards. To build and flash the project, users can run:

```cmd
west build -b stm32_min_dev_black
west flash
```

The build process automatically invokes the font generation scripts, ensuring that the custom fonts are compiled directly into the application binary. This makes it a great starting point for developers looking to customize the UI of their Zephyr-based IoT devices or embedded systems.
