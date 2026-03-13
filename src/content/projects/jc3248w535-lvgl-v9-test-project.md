---
title: JC3248W535 LVGL V9 Test Project
summary: A demonstration project for the JC3248W535 display module using the ESP32-S3
  microcontroller. It integrates LVGL V9.2.2 with the Arduino_GFX library and includes
  a custom driver for the AXS15231B touch controller.
slug: jc3248w535-lvgl-v9-test-project
codeUrl: https://github.com/byte-me404/JC3248W535_lvgl_test
star: 11
lastUpdated: '2024-12-27'
rtos: freertos
libraries:
- lvgl
topics:
- arduino
- esp32
- gfx
- lvgl
isShow: false
createdAt: '2026-03-12'
updatedAt: '2026-03-12'
---

The JC3248W535_lvgl_test repository provides a functional example for developers working with the JC3248W535 display module. This hardware is based on the powerful ESP32-S3 SoC, specifically the N16R8V variant which offers 16MB of Flash and 8MB of PSRAM, making it well-suited for memory-intensive graphical user interfaces.

The project serves as a bridge between the hardware and the latest version of the Light and Versatile Graphics Library (LVGL), specifically version 9.2.2. By leveraging the Arduino framework, it simplifies the process of getting a high-quality UI running on this specific integrated display board.

## Key Components and Libraries

The project relies on two primary libraries for its graphical output:
- **LVGL V9.2.2**: The latest major version of the popular open-source graphics library, providing advanced widgets, animations, and memory management.
- **Arduino_GFX**: Used as the display HAL (Hardware Abstraction Layer) to communicate with the LCD controller. The project specifically references version 1.5.0 of this library.

One of the unique aspects of this repository is the inclusion of a dedicated driver for the AXS15231B touch controller. Touch drivers for these specific integrated modules can often be difficult to find or configure, and this project provides a ready-to-use implementation within the library structure.

## Hardware Configuration

The project is configured for the ESP32-S3-N16R8V. The `platformio.ini` file defines the environment, ensuring that the correct board definitions and monitor filters (such as the `esp32_exception_decoder`) are active. This setup is optimized for PlatformIO, allowing for easy dependency management and flashing. Because the ESP32 Arduino core is built upon FreeRTOS, the system benefits from multi-tasking capabilities, which is essential for maintaining a responsive UI while handling background tasks.

## Getting Started

To use this project, developers typically clone the repository into a PlatformIO-compatible IDE like VS Code. The dependencies are automatically handled via the `lib_deps` configuration, which pulls in the necessary GFX and LVGL libraries. Because it uses LVGL V9, users should be aware of the API changes from V8, particularly regarding display and input device registration.

The repository structure follows standard PlatformIO conventions:
- **src/**: Contains the main application logic and LVGL initialization.
- **lib/**: Houses the custom AXS15231B touch driver.
- **include/**: For header files.
- **boards/**: Custom board definitions if required.

This test repo is an excellent starting point for anyone looking to build a modern UI on the JC3248W535 hardware without having to write the low-level initialization code from scratch.
