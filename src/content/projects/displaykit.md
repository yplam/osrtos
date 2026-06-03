---
title: DisplayKit
summary: DisplayKit is a web-based drag-and-drop UI designer for embedded display
  development. It enables developers to visually design screens and generate optimized
  C++ code for the TFT_eSPI and U8g2 libraries, targeting platforms such as ESP32,
  STM32, and RP2040.
slug: displaykit
codeUrl: https://github.com/cifertech/DisplayKit
siteUrl: https://cifertech.net/
star: 50
lastUpdated: '2025-12-24'
rtos: ''
libraries:
- tft-espi
- u8g2
topics:
- tft-display
- tftespi
- u8g2
- ui-design
isShow: false
createdAt: '2026-01-20'
updatedAt: '2026-01-20'
relatedProjects:
- espui
- lvgl-emscripten-port
- pixelforge
- betta-ha-panel
- sc01-plus-hmi-example-with-squareline-studio
- esp32-tux
---

## Introduction to DisplayKit

Designing user interfaces for embedded systems has historically been a manual and time-consuming process. Developers often find themselves tweaking pixel coordinates in code, recompiling, and flashing hardware just to see a minor layout change. **DisplayKit** changes this paradigm by providing a modern, web-based drag-and-drop editor specifically tailored for microcontrollers and small displays.

By moving the design process to a visual canvas, DisplayKit allows developers to focus on the user experience rather than the underlying coordinate math. Whether you are building a simple status monitor or a complex multi-screen dashboard, the tool provides the building blocks necessary to create professional-looking interfaces quickly.

## Core Features and Workflow

The workflow in DisplayKit is straightforward: design visually, then export code. The editor supports a variety of elements, including:

- **Basic Shapes**: Rectangles, circles, lines, and dividers.
- **UI Components**: Labels, buttons, headers, and cards.
- **Interactive Controls**: Progress bars, sliders, and toggles.
- **Image Support**: Import PNG/JPG images which are internally converted to RGB565 format for TFT displays.

One of the most powerful aspects of DisplayKit is its multi-screen management. You can create multiple screens within a single project and assign "actions" to elements—such as navigating to a different screen when a button is clicked. The tool then generates a dedicated drawing function for each screen, such as `drawHomeScreen()` or `drawSettingsMenu()`.

## Supported Display Drivers

DisplayKit is built to support the most popular libraries in the embedded ecosystem:

### TFT_eSPI Mode
For full-color displays (like ILI9341 or ST7789), DisplayKit generates code compatible with the **TFT_eSPI** library. It supports full RGB565 color depth, custom rotations, and even optional **TFT_eSprite** rendering to ensure smooth, flicker-free updates. Images are exported as `PROGMEM` arrays, making them easy to integrate into Arduino sketches.

### U8g2 OLED Mode
For monochrome displays (like SSD1306 or SH1106), the tool switches to a **U8g2** compatible mode. This mode provides a monochrome preview and generates code using the U8g2 font system and drawing primitives. It includes presets for common I2C and SPI constructors, rotation settings, and contrast control.

## Integrated Productivity Tools

DisplayKit isn't just a layout editor; it's a suite of tools. It includes built-in overlays for:

- **PixelForge**: A specialized image converter that generates the C++ headers needed for embedded displays.
- **BitCanvas Studio**: An animation tool for creating dynamic visual effects.

These tools share a consistent theme with the main editor and can be accessed without leaving the application, streamlining the asset preparation process.

## Technical Implementation and Compatibility

The generated code is designed to be "drop-in" ready for the Arduino IDE. It targets a wide range of popular hardware, including:

- **ESP32 and ESP8266**
- **STM32**
- **RP2040 (Raspberry Pi Pico)**
- **Standard Arduino boards**

By abstracting the drawing logic into generated functions, DisplayKit allows developers to keep their main application logic separate from the UI rendering code, leading to cleaner and more maintainable firmware projects.
