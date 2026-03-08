---
title: TFT_eSPI
slug: tft-espi
summary: TFT_eSPI is a high-performance graphics and font library optimized for 32-bit
  microcontrollers, providing hardware-accelerated rendering via DMA and PIO. It features
  a robust Sprite system for flicker-free updates and advanced anti-aliasing for both
  vector graphics and typography across multiple display interfaces.
codeUrl: https://github.com/Bodmer/TFT_eSPI
star: 4629
version: V2.5.43
lastUpdated: '2026-02-20'
components:
- Graphics
- FileSystem
- Storage
- GUI
platforms:
- ARM Cortex-M
- Xtensa
- RISC-V
libraryType: Graphics
createdAt: '2024-07-06'
updatedAt: '2026-03-08'
---

### Features


- Optimized drivers for ESP32, ESP8266, RP2040, and STM32 series processors.

- Direct Memory Access (DMA) support for SPI displays on ESP32, RP2040, and STM32.

- Sprite class for off-screen buffering and flicker-free updates in 1, 8, or 16-bit color depths.

- Anti-aliased (smooth) font rendering from .vlw files or FLASH arrays with Unicode support.

- Vector graphics functions for smooth arcs, circles, and rounded rectangles using optimized fixed-point math.

- Support for 4-wire SPI, 8-bit parallel, and 16-bit parallel display interfaces.

- RP2040 PIO integration to offload screen fills and manage high-speed SPI/parallel timing.

- Unicode and UTF-8 string support for multi-language text rendering.

- Built-in XPT2046 touch screen controller driver for SPI-based displays.

- PNG image decoding and rendering capability requiring approximately 40KB of RAM.

- Horizontal and vertical color gradient fills for rectangular areas.

- Compatibility with Adafruit GFX and Adafruit driver library APIs for easy migration.

- PSRAM support on ESP32 for large full-screen frame buffers.

- SPI overlap mode for ESP8266 to share pins with program FLASH memory.

- Support for over 20 display controllers including ILI9341, ST7789, and GC9A01.

- Line-by-line and block-by-block smooth font rendering to minimize flicker during updates.



### Architecture

TFT_eSPI is designed with a driver-abstraction layer that allows it to interface with a wide variety of display controllers while maintaining a consistent API. The architecture prioritizes performance by utilizing processor-specific optimizations such as Direct Memory Access (DMA) for SPI transfers and Programmable I/O (PIO) on the RP2040 to offload bus timing and block fills. This design ensures that the main CPU is released for other tasks while the hardware handles data transmission to the display.

A central configuration model is used where hardware-specific parameters—such as pins, clock speeds, and controller types—are defined in header files within the library rather than the application sketch. This approach keeps user code clean and portable across different hardware setups. The library also supports PSRAM on ESP32 devices, allowing for large, high-resolution frame buffers that would otherwise exceed internal RAM limits.

#### Core Components
- **TFT_eSPI Core**: The primary class handling low-level driver initialization and basic drawing primitives.
- **TFT_eSprite**: A RAM-based graphics canvas that acts as a frame buffer for flicker-free rendering and complex rotations.
- **Font Engine**: Supports both legacy bitmapped fonts and modern anti-aliased (smooth) fonts with Unicode and UTF-8 support.
- **Driver Layer**: Optimized low-level drivers for over 20 different display controllers (e.g., ILI9341, ST7789, GC9A01).

### Use Cases

This library is ideal for:

- **Industrial Dashboards**: Creating high-resolution, flicker-free meters and gauges using anti-aliased arcs and sprites.
- **Multi-language Interfaces**: Rendering complex scripts such as Japanese or Greek using Unicode-compatible smooth fonts.
- **Portable Gaming**: Developing responsive UI and sprites for handheld devices using 8-bit or 16-bit parallel interfaces for high frame rates.
- **IoT Monitoring**: Displaying compressed PNG images and real-time graphs on low-power ESP32 or ESP8266 modules.
- **Automotive Displays**: Utilizing hardware-accelerated gradients and smooth graphics for modern instrument clusters.

### Getting Started

To begin, install the library via the Arduino Library Manager. Unlike most Arduino libraries, hardware configuration is performed by editing the `User_Setup.h` file or selecting a predefined configuration in `User_Setup_Select.h` located within the library folder. This setup includes defining the display driver, pin assignments, and SPI frequency. 

Once configured, any example sketch provided with the library can be run without further modification. For PlatformIO users, these settings can be defined on a per-project basis within the `platformio.ini` file. Developers are encouraged to explore the `examples` folder, which contains specialized demonstrations for DMA transfers, Sprite-based animation, and smooth font rendering from SPIFFS or LittleFS.
