---
title: ESP32 Cheap Yellow Display MicroPython LVGL
summary: A comprehensive resource for running MicroPython and LVGL on the ESP32-2432S028R
  'Cheap Yellow Display'. It provides precompiled firmwares for LVGL9 and LVGL8, specialized
  drivers for ILI9341 and XPT2046, and detailed guides for display calibration and
  UI development.
slug: esp32-cheap-yellow-display-micropython-lvgl
codeUrl: https://github.com/de-dh/ESP32-Cheap-Yellow-Display-Micropython-LVGL
star: 51
lastUpdated: '2026-02-06'
rtos: freertos
libraries:
- lvgl
- micropython
topics:
- cheap-yellow-display
- cyd
- cyd2usb
- demo
- esp32
- esp32-2432s028
- esp32-gui
- esp32-wroom
- firmware
- ili9341
- lvgl
- lvgl8
- micropython
- thonny
- xpt2046
isShow: true
image: /202603/yellow-display-lvgl.webp
createdAt: '2026-03-19'
updatedAt: '2026-03-19'
---

## Overview

The ESP32-2432S028R, widely known as the "Cheap Yellow Display" (CYD), has become a popular choice for makers seeking an affordable, all-in-one ESP32 development board with an integrated touchscreen. This repository serves as a central hub for developers looking to leverage the power of MicroPython and the Light and Versatile Graphics Library (LVGL) on this hardware. 

While MicroPython's primitive drawing functions are sufficient for basic shapes, creating professional-grade user interfaces requires a more robust framework. LVGL fills this gap by providing high-level widgets like buttons, lists, and charts, all styled with CSS-like properties. This project simplifies the often-difficult task of compiling custom MicroPython firmwares with LVGL bindings and configuring specific display and touch drivers for the CYD.

## Hardware Capabilities

The project targets the standard CYD family, which typically includes:
- **ESP32-WROOM**: Dual-core processor with integrated Wi-Fi and Bluetooth.
- **ILI9341 Display**: A 2.8-inch (320 x 240) RGB565 color screen.
- **XPT2046 Touch Interface**: A resistive touch controller.
- **Peripherals**: SD card slot, I2S interface, RGB LED, and a photoresistor (LDR).

## Firmware and Versioning

The repository maintains support for different versions of LVGL, recognizing that transitions between major versions often involve breaking changes:

- **LVGL9**: The current focus, featuring prebuilt firmware based on MicroPython 1.25.0. It utilizes specialized bindings that include all necessary drivers for the CYD out of the box.
- **LVGL8**: Legacy support for older projects, providing documentation and firmware links for LVGL 8.3.6.
- **Standard MicroPython**: For users who do not require LVGL, the project provides standalone drivers for the ILI9341 and XPT2046 to be used with vanilla MicroPython builds.

## Configuration and Calibration

One of the primary challenges with the CYD is the hardware variation between different manufacturing batches. Even boards that look identical may require different initialization parameters. The project provides a `color_test.py` utility to help users identify the correct settings for their specific unit.

Key configuration parameters include:
- **MADCTL Settings**: Determining the correct rotation and mirroring for the display.
- **Color Mode**: Switching between RGB and BGR modes (common in CYD2 variants).
- **Touch Calibration**: A routine to map touch coordinates to screen pixels, with calibration data stored in the ESP32's Non-Volatile Storage (NVS) to persist across reboots.

```python
# Example display configuration for LVGL9
_DISPLAY_WIDTH = const(320)
_DISPLAY_HEIGHT = const(240)
_DISPLAY_ROT = const(0xE0)
_DISPLAY_BGR = const(1)
_DISPLAY_RGB565_BYTE_SWAP = const(1)
```

## Advanced UI Development

Beyond basic setup, the repository offers guidance on sophisticated UI features:

### Custom and Icon Fonts
Users can integrate custom typography by using the LVGL font converter to generate binary font files. The project also includes a helper function, `utf8Bytes`, to simplify the use of icon fonts (like Font Awesome) by converting Unicode hex strings into the UTF-8 format required by LVGL.

### Multitasking
For complex applications, the project suggests using the `_thread` module to handle concurrent tasks, ensuring that the UI remains responsive while the system performs background operations like sensor reading or network communication.

### Image Handling
With the appropriate drivers included in the firmware, PNG images can be loaded directly from the filesystem, bypassing the need for complex manual image conversion processes.
