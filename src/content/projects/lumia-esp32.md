---
title: Lumia-ESP32
summary: A Windows Phone-inspired user interface demo for the WT32-SC01 ESP32 module.
  It leverages the LVGL graphics library and LovyanGFX to implement a comprehensive
  mobile-like environment including a lock screen, start menu, and several functional
  applications.
slug: lumia-esp32
codeUrl: https://github.com/fbiego/Lumia-ESP32
star: 73
version: 1.0.0
lastUpdated: '2024-02-12'
rtos: freertos
libraries:
- lvgl
topics:
- arduino
- esp32
- ft6336u
- lcd
- lumia
- lvgl
- os
- st7789
- touch
- wt32-sc01
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- esp32-st7789v-ft6236u-arduino-lvgl-demo
- esp32-tux
- sc01-plus-hmi-example-with-squareline-studio
- esp32berry
- lvgl-port-for-esp32
- lvgl-8-on-wt32-sc01-with-arduino
---

Lumia-ESP32 is a sophisticated demonstration project that recreates a Windows Phone-style user interface on the WT32-SC01 development board. Built on the ESP32 platform, this project showcases the capabilities of modern embedded graphics libraries to create fluid, interactive, and aesthetically pleasing mobile-like experiences on low-power hardware.

## Hardware and Platform Support

The project is specifically designed for the WT32-SC01 module, which features an ESP32-WROVER-B with a 3.5-inch capacitive touch screen. It also includes support for the WT32-SC01 Plus, which utilizes the more powerful ESP32-S3 microcontroller. 

To manage the high memory requirements of a modern UI, the project utilizes PSRAM (Pseudo-Static RAM) for the LVGL memory pool. The configuration defines specific memory sizes for different hardware versions, allocating 64KB for the standard WROVER-based board and 96KB for the S3-based Plus version.

## Core Features and Applications

The interface is remarkably complete, offering a series of screens and functional modules that mimic a smartphone operating system:

*   **System Screens**: Includes a boot sequence, a passcode-protected lock screen, a tile-based Start Menu, and a comprehensive list of installed applications.
*   **Integrated Apps**: The demo includes functional mock-ups for a Phone dialer, Messaging interface, Settings menu, Calendar, and a WiFi configuration utility.
*   **System Modules**: A persistent status bar, a pull-down notification panel, and an on-screen keyboard provide the necessary infrastructure for user interaction.
*   **Haptics**: The navigation bar is designed to support haptic feedback via an external vibration motor.

## Technical Stack

The project is built using the Arduino framework within the PlatformIO ecosystem. It relies on several key libraries to handle the heavy lifting of graphics and system management:

*   **LVGL (Light and Versatile Graphics Library)**: Used for the entire UI layout, animations, and widget management.
*   **LovyanGFX**: Acts as the high-performance display driver, providing the interface between the ESP32 and the LCD controller.
*   **ArduinoJson**: Handles configuration data and potentially simulated message/contact data.
*   **ESP32Time**: Manages system time for the clock and calendar features.
*   **ESP32-audioI2S**: Specifically used in the Plus version to handle audio output.

## Development and Simulation

For developers looking to contribute or customize the UI without constantly flashing hardware, the project is compatible with the LVGL PlatformIO simulator. This allows for rapid UI prototyping on macOS or other desktop environments before deploying to the physical ESP32 hardware.

When compiling for hardware, the project requires a specific version of the Espressif 32 platform (v5.1.1) to ensure compatibility with the build flags and library dependencies. The project uses a custom partition scheme (`no_ota.csv` or `default_8MB.csv`) to accommodate the large firmware size and assets required for the graphical interface.
