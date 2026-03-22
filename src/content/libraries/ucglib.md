---
title: Ucglib
slug: ucglib
summary: Ucglib is a high-performance color graphics library designed for microcontrollers,
  providing comprehensive support for various TFT and OLED display controllers with
  an 18-bit color depth engine. It features advanced graphics primitives, including
  filled polygon drawing and an extensive library of over 300 fonts, optimized for
  resource-constrained environments like Arduino.
codeUrl: https://github.com/olikraus/ucglib
siteUrl: https://github.com/olikraus/ucglib
star: 290
version: v1.00
lastUpdated: '2020-01-22'
components:
- Graphics
- HAL
platforms:
- AVR
- ARM
- ARM Cortex-M
- Linux
- POSIX
licenses:
- BSD 2-Clause
libraryType: Graphics
createdAt: '2020-01-22'
updatedAt: '2026-03-22'
---

### Features


- Support for multiple display controllers including ST7735, ILI9341, PCF8833, SSD1351, LD50T6160, and ILI9163.

- Extended controller support for SSD1331 and SEPS225 in version 1.3.

- Native 18-bit color depth support for high-fidelity color representation.

- Comprehensive graphics primitives for drawing lines, rectangles, and circles.

- Advanced filled polygon drawing capability for complex geometric shapes.

- Access to a library of over 300 fonts categorized by size, group, and monospace subsets.

- Support for both landscape and portrait display orientations.

- Hardware Abstraction Layer (HAL) architecture for simplified porting to new hardware.

- SDL-based debugging environment for testing graphics code on Ubuntu/Linux systems.

- Integrated BDF font converter tool for importing custom typography.

- Optimized for the Arduino environment with support for IDE 1.0.x and 1.5+.

- True color support for both TFT and OLED display technologies.

- Efficient memory management suitable for 8-bit AVR and 32-bit ARM architectures.

- Flexible font rendering including proportional and monospace options.



### Architecture

Ucglib is designed with a layered architecture that prioritizes portability and performance on embedded systems. At the highest level, the library provides a consistent API for application developers to perform graphics operations. Below this API sits the graphics engine, which handles coordinate transformations, color depth management (18-bit), and the rasterization of primitives such as lines and filled polygons. 

The library utilizes a Hardware Abstraction Layer (HAL) to decouple the core graphics logic from the underlying microcontroller peripherals. This design allows Ucglib to support diverse architectures like AVR and ARM by simply swapping the HAL implementation. The bottom layer consists of specific display controller drivers (e.g., ST7735, ILI9341) that translate generic draw commands into the specific SPI or parallel sequences required by the hardware.

#### Core Components
- **Graphics Engine**: Manages 18-bit color rendering and geometric primitive calculations.
- **Font Subsystem**: Handles the decompression and rendering of over 300 included fonts.
- **HAL (Hardware Abstraction Layer)**: Provides a standardized interface for SPI, GPIO, and delay functions.
- **Controller Drivers**: Specialized modules for interfacing with various TFT and OLED silicon.

### Use Cases

This library is ideal for:

- **Industrial HMI**: Developing robust and colorful user interfaces for machine control panels and monitoring systems.
- **Consumer Electronics**: Creating menus, icons, and status displays for handheld gadgets and wearable devices.
- **IoT Data Visualization**: Displaying real-time sensor data, graphs, and charts on small-form-factor TFT or OLED screens.
- **Educational Prototyping**: Rapidly developing graphics-heavy projects within the Arduino ecosystem using standardized hardware.
- **Embedded Debugging**: Utilizing the SDL environment to simulate and debug display layouts on a PC before deploying to hardware.

### Getting Started

To begin using Ucglib, the easiest method is to install it via the Arduino Library Manager by searching for "Ucglib". For manual installation, download the latest release ZIP from the official repository and include it in your project's library folder. Developers should start by selecting the constructor that matches their specific display controller and wiring configuration (e.g., `Ucg7735_18x128x160_SWSPI`).

Key documentation resources include the [Reference Manual](https://github.com/olikraus/ucglib/wiki/reference) for API details and the [Supported Displays](https://github.com/olikraus/ucglib/wiki/displays) page for wiring diagrams and initialization strings. For custom font requirements, the BDF font converter tool can be used to generate compatible font headers from standard font files.
