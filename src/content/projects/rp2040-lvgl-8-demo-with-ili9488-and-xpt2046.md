---
title: RP2040 LVGL 8 Demo with ILI9488 and XPT2046
summary: A demonstration project for the RP2040 microcontroller featuring the LVGL
  8.3 graphics library and TFT_eSPI driver. It supports a 3.5-inch ILI9488 TFT display
  and XPT2046 resistive touch controller using the Arduino framework within PlatformIO.
slug: rp2040-lvgl-8-demo-with-ili9488-and-xpt2046
codeUrl: https://github.com/cnkoala/rp2040-eSPI-lvgl
star: 20
lastUpdated: '2022-09-23'
rtos: ''
libraries:
- lvgl
- tft-espi
topics:
- arduino
- espi
- ili9488
- lvgl
- platformio
- rp2040
- xpt2046
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- esp32-st7789v-ft6236u-arduino-lvgl-demo
- jc3248w535-lvgl-v9-test-project
- lvgl-8-on-wt32-sc01-with-arduino
- jc4827w543-lvgl-v9-implementation
- lilygo-t-display-s3-boilerplate
- minimal-lcd-demonstration-on-esp-wrover-kit
---

The rp2040-eSPI-lvgl project provides a comprehensive starting point for developers looking to implement high-quality graphical user interfaces on the Raspberry Pi Pico (RP2040) platform. By integrating the powerful LVGL (Light and Versatile Graphics Library) version 8.3 with the widely-used TFT_eSPI driver, this demo showcases how to achieve smooth UI performance on a budget-friendly microcontroller.

### Hardware Overview

The project is designed around a specific hardware stack that is common in the maker community:
- **Microcontroller**: Raspberry Pi Pico (RP2040).
- **Display**: A 3.5" TFT screen utilizing the ILI9488 driver, offering a resolution of 480x320 pixels.
- **Touch Interface**: Resistive touch control via the XPT2046 controller, enabling interactive UI elements.

### Technical Stack and Configuration

The project is built using the PlatformIO ecosystem within VS Code, leveraging the Arduino framework for the RP2040. The core of the display logic relies on `TFT_eSPI`, which is highly optimized for SPI-based displays. 

A key aspect of this implementation is the configuration of the SPI bus. The project specifically utilizes SPI channel 1 instead of the default channel 0. This is handled through build flags in the `platformio.ini` file, ensuring the driver communicates correctly with the hardware pins:

```ini
-DILI9488_DRIVER=1
-DTFT_WIDTH=480
-DTFT_HEIGHT=320
-DTFT_MOSI=11
-DTFT_SCLK=10
-DTFT_CS=9
-DTFT_DC=8
-DTFT_RST=12
-DTFT_SPI_PORT=1
```

### Touch and Backlight Integration

For touch interaction, the project utilizes the XPT2046 driver. A notable feature of this driver's implementation is that only the Chip Select (CS) pin needs explicit definition in the code, as other pins are automatically assigned. The wiring for the touch interface uses GP16 through GP19 on the RP2040, with the CS pin mapped to GP17.

Additionally, the project demonstrates backlight control, which is essential for visibility. The backlight is managed via a PWM-capable pin (GP13), allowing for brightness adjustment. If the backlight is not set to a non-zero value, the display will remain dark:

```cpp
#define TFT_BL 13
uint8_t TftBackground = 150; // Set brightness between 0 and 255
```

### Performance and UI Capabilities

By using LVGL 8.3, the project can take advantage of advanced UI features like widgets, animations, and complex layouts. The combination of the RP2040's dual-core architecture and the optimized TFT_eSPI driver ensures that the 480x320 display remains responsive. This setup is ideal for creating embedded dashboards, control panels, or handheld device interfaces where a professional look and feel are required without the cost of high-end application processors.
