---
title: LVGL for Raspberry Pi Pico HUB75 LED Matrix
summary: An optimized integration of the LVGL graphics library for Raspberry Pi Pico
  microcontrollers to drive HUB75 RGB LED matrices. Utilizing a dual-core architecture
  and DMA-driven PIO processes, it enables high-performance UI rendering and animations
  on large-scale LED panels.
slug: lvgl-for-raspberry-pi-pico-hub75-led-matrix
codeUrl: https://github.com/JuPfu/hub75_lvgl
siteUrl: https://lvgl.io/
star: 10
lastUpdated: '2026-01-23'
rtos: ''
libraries:
- lvgl
topics:
- c
- c-sdk
- dma
- driver
- hub75
- led-matrix-displays
- lvgl
- pico
- pio
- rp2040
- rp2350
isShow: false
createdAt: '2026-02-01'
updatedAt: '2026-02-01'
relatedProjects:
- hub75-dma-based-driver-for-raspberry-pi-pico
- neopixel-library-for-raspberry-pi-pico
- micropython-max7219-8x8-led-matrix-library
- lvgl-port-for-raspberry-pi-pico-mdk-arm
- lvgl-port-for-esp32
- led-matrix-max7219-for-mongoose-os
---

The `hub75_lvgl` project brings the power of the Light and Versatile Graphics Library (LVGL) to the Raspberry Pi Pico, specifically targeting HUB75 RGB LED matrix panels. While these panels are typically used for simple scrolling text or basic animations, this project demonstrates how to implement a sophisticated UI framework to create rich, animated displays on hardware that is traditionally difficult to drive.

### High-Performance Architecture

Driving a HUB75 matrix is computationally expensive due to the high refresh rates required to maintain color depth and prevent flickering. To solve this, the project adopts a dual-core strategy leveraging the RP2040/RP2350 architecture:

- **Core 0**: Dedicated to LVGL rendering, animation logic, and UI state management.
- **Core 1**: Runs the optimized HUB75 driver, utilizing the Raspberry Pi Pico's Programmable I/O (PIO) and Direct Memory Access (DMA) controllers.

This separation ensures that the intensive bit-banging required for the LED matrix doesn't interfere with the frame calculation and rendering performed by LVGL. The result is a smooth visual experience with transitions like fades and slides between different UI states.

### Optimized HUB75 Driver

The underlying driver is an evolution of the Pimoroni HUB75 driver, further optimized for performance. By using self-paced, interlinked DMA processes, the driver can push pixel data to the matrix with minimal CPU intervention. This efficiency is what allows the Pico to handle complex LVGL widgets and transitions on a 64x64 (or larger) matrix. The driver is capable of handling the high-speed multiplexing required by these panels while leaving plenty of headroom for the graphics library.

### LVGL Integration Details

The project integrates LVGL version 9.4.0. Because the HUB75 matrix requires a full refresh of the display buffer to maintain visual consistency, the project is configured to use `LV_DISPLAY_RENDER_MODE_FULL`. This ensures that LVGL always provides a complete frame to the `update()` function of the HUB75 driver.

Key configuration highlights include:
- **Color Depth**: Set to 24-bit (RGB888) to provide vibrant colors that take full advantage of the LED matrix's capabilities.
- **Memory Management**: Uses LVGL's built-in memory allocator with a 64KB pool.
- **Tick Source**: A custom millisecond tick source derived from the Pico's absolute time ensures accurate animation timing.

### Demo Effects

To showcase the capabilities of this setup, the repository includes several animated demos that push the hardware to its limits:

- **Bouncing Balls**: A classic physics-based animation combined with horizontal scrolling text.
- **Fire Effect**: A procedural flame animation that demonstrates the matrix's ability to handle rapid color changes and gradients.
- **Image Animation**: Rotating static images (360 degrees) to show off the library's transformation and rotation support.

### Hardware and Setup

The project is designed for the Raspberry Pi Pico (RP2040) and the newer Pico 2 (RP2350). While it defaults to a 64x64 panel, the driver is flexible enough to support other sizes with minor adjustments. Due to the power requirements of large LED matrices, an external 5V power supply is essential for the display.

For developers using Visual Studio Code, the project is pre-configured for the Raspberry Pi Pico extension, making it easy to clone, build, and flash the firmware directly to the microcontroller. The inclusion of `pico_sdk_import.cmake` and a well-structured `CMakeLists.txt` ensures compatibility with standard Pico SDK development workflows.
