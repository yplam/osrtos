---
title: LVGL 8 on WT32-SC01 with Arduino
summary: A project demonstrating the integration of LVGL 8.x and LovyanGFX on the
  WT32-SC01 ESP32-based development board. It provides a foundation for building high-performance
  graphical user interfaces on 3.5-inch capacitive touch displays using the Arduino
  framework.
slug: lvgl-8-on-wt32-sc01-with-arduino
codeUrl: https://github.com/sukesh-ak/LVGL8-WT32-SC01-Arduino
star: 105
lastUpdated: '2024-03-20'
rtos: freertos
libraries:
- lvgl
topics:
- arduino
- esp32
- lovyangfx
- lvgl
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- esp32-st7789v-ft6236u-arduino-lvgl-demo
- sc01-plus-hmi-example-with-squareline-studio
- jc3248w535-lvgl-v9-test-project
- jc4827w543-lvgl-v9-implementation
- rp2040-lvgl-8-demo-with-ili9488-and-xpt2046
- lilygo-t-display-s3-boilerplate
---

## Graphics and Touch on the WT32-SC01

The LVGL8-WT32-SC01-Arduino project provides a comprehensive starting point for developers looking to leverage the power of the LVGL (Light and Versatile Graphics Library) version 8.x on the WT32-SC01 hardware platform. This development board, powered by an ESP32 WROVER-B, is a popular choice for embedded GUI applications due to its integrated 3.5-inch display and capacitive touch capabilities.

## Hardware Capabilities

The WT32-SC01 is a specialized development board from Wireless Tag that packs significant features into a compact form factor. At its core is the ESP32 WROVER-B module, which provides 4MB of Flash and 8MB of PSRAM, essential for handling the memory-intensive requirements of modern graphical interfaces.

**Key hardware specifications include:**
- **Display:** 3.5" 480x320 ST7796S TFT Display
- **Touch:** FT6336U Capacitive touchscreen
- **Power:** USB-C for programming and power, with a separate 5v-9v battery/external power option
- **Expansion:** Two external expansion female pin headers for peripheral connectivity

While the board is highly capable, developers should note that the pin headers use a 2mm pitch rather than the standard 2.54mm breadboard pitch, and early revisions had mounting holes that were difficult to utilize.

## Software Architecture

This project utilizes a modern embedded software stack to ensure high performance and ease of development:

- **Framework:** Built using the Arduino framework, specifically optimized for the PlatformIO ecosystem.
- **Graphics Driver:** It employs [LovyanGFX](https://github.com/lovyan03/LovyanGFX) as the underlying driver. LovyanGFX is known for its high-speed performance on ESP32 devices, handling the low-level communication with the ST7796S display and the FT6336U touch controller.
- **UI Framework:** LVGL 8.x is used for the widget layer, providing a rich set of UI elements like buttons, sliders, and charts.

## Board Configuration

The project defines specific pin mappings for the WT32-SC01 to ensure the SPI and I2C interfaces communicate correctly with the display and touch controller:

- **TFT (ST7796):** RST=22, SCLK=14, DC=21, CS=15, MOSI=13, BCKL=23
- **Touch (FT6336U):** SDA=18, SCL=19, I2C Address=0x38

## Getting Started with Touch and Draw

For users who want to verify their hardware before diving into the full LVGL stack, the project includes a simple "Touch and Draw" sample. This snippet demonstrates how to use LovyanGFX directly to capture touch coordinates and render pixels to the screen.

```cpp
/*
    Simple Touch Drawing sample for WT32-SC01
*/
#define LGFX_AUTODETECT     // Autodetect board
#define LGFX_USE_V1         // set to use new version of library

#include <LovyanGFX.hpp>    // main library

static LGFX lcd;            // declare display variable

// Variables for touch x,y
static int32_t x,y;

void setup(void)
{
  lcd.init();

  // Setting display to landscape
  if (lcd.width() < lcd.height()) lcd.setRotation(lcd.getRotation() ^ 1);

  lcd.setCursor(0,0);
  lcd.printf("Ready to touch & draw!");
}

void loop()
{
  if (lcd.getTouch(&x, &y)) {
    lcd.fillRect(x-2, y-2, 5, 5, TFT_RED);
    lcd.setCursor(380,0);
    lcd.printf("Touch:(%03d,%03d)", x,y);
  }
}
```

## Ecosystem and Extensions

Beyond the software, the project points to a 3D printable enclosure available on SketchFab, allowing developers to turn their development board into a finished-looking device. For those looking for multi-device support or an ESP-IDF based implementation, the author provides links to related repositories like ESP32-TUX and LVGL8-WT32-SC01-IDF.
