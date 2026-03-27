---
title: Eclipse ThreadX GUIX
slug: guix
summary: Eclipse ThreadX GUIX is a high-performance, small-footprint graphical user
  interface framework specifically engineered for deeply embedded systems. It provides
  a comprehensive API for UI development and integrates with GUIX Studio, a desktop
  design tool that automates C code generation for graphical elements, ensuring rapid
  development and deployment on resource-constrained hardware.
codeUrl: https://github.com/eclipse-threadx/guix
star: 401
version: v6.5.0.202601_rel
lastUpdated: '2026-03-06'
components:
- GUI
- Graphics
- Profiling
platforms:
- ARM
- ARM Cortex-M
- ARM Cortex-A
- ARM Cortex-R
- ARM7
- ARM9
- ARM11
- RISC-V
- Xtensa
- x86
- MIPS
- MIPS32
- MIPS64
- RX
- V850
- SuperH
- PowerPC
- Microblaze
- Windows
licenses:
- MIT
libraryType: GUI
createdAt: '2025-09-29'
updatedAt: '2026-03-27'
---

### Features


- Small memory footprint and high-speed execution optimized for resource-constrained microcontrollers.

- Seamless integration with GUIX Studio for visual UI design and automatic C code generation.

- Support for professional-quality graphical assets including anti-aliased fonts and high-color depth images.

- Event-driven programming model for efficient handling of user input and system events.

- Highly portable architecture with dedicated ports for various CPU architectures and compilers.

- Composable CMake-based build system supporting Ninja and Arm GNU Toolchain.

- Support for multiple display layers and canvas-based drawing operations.

- Advanced font rendering engine supporting various font formats and international languages.

- Integration with semiconductor SDKs from NXP, Renesas, and Microchip.

- Support for ARM Cortex-M4 and Cortex-M23 architectures with specific hardware optimizations.

- Customizable features via user-defined configuration headers for fine-grained control over library size.

- Comprehensive set of built-in widgets including buttons, sliders, lists, and multi-line text windows.

- Support for runtime theme switching and dynamic asset management.

- Built-in support for smooth screen transitions and complex animation effects.

- Direct integration with ThreadX RTOS for thread-safe UI operations and synchronized event processing.



### Architecture

Eclipse ThreadX GUIX is designed with a layered architecture that prioritizes performance and portability. At its core, the library consists of a hardware-independent engine that manages widget hierarchies, event distribution, and drawing logic. This core interacts with hardware-specific display drivers through a well-defined abstract interface, allowing GUIX to be ported to virtually any display controller or MCU architecture. The architecture is strictly event-driven, utilizing a central event queue to process input from touchscreens, keypads, or system-level notifications.

#### Core Components
- **Widget Library**: A rich set of pre-built graphical elements (buttons, windows, progress bars) that are fully customizable.
- **Drawing Engine**: A low-level rendering layer that handles lines, circles, bitmaps, and text rendering with support for anti-aliasing.
- **Event Manager**: Manages the flow of system and user events, ensuring thread-safe interaction with the underlying ThreadX RTOS.
- **GUIX Studio Integration**: A companion desktop tool that generates C source code from visual designs, bridging the gap between UI design and embedded implementation.

### Use Cases

This library is ideal for:

- **Industrial HMI**: Developing robust control panels for factory automation and machinery with complex data visualization.
- **Medical Devices**: Creating high-reliability user interfaces for patient monitors and diagnostic equipment requiring safety-critical certifications.
- **Consumer Electronics**: Building responsive UIs for smart home appliances, thermostats, and wearable devices with limited memory.
- **Automotive Dashboards**: Implementing digital instrument clusters and infotainment systems that require fast boot times and smooth animations.
- **IoT Edge Devices**: Providing local interaction capabilities for sensors and gateways where power consumption and footprint are critical.

### Getting Started

To begin developing with GUIX, it is recommended to first install **GUIX Studio**, the visual design environment available via the Microsoft/Eclipse installer. The library itself is typically integrated into a project as a static library using the provided CMake build system. Developers should define their specific feature requirements in a `gx_user.h` header file, which allows for stripping unused components to minimize the binary size. 

Key documentation and samples can be found in the `common`, `samples`, and `tutorials` directories of the repository. For hardware-specific implementations, refer to the `ports` directory, which contains the necessary glue code for various architectures and compilers. Detailed high-level overviews and API references are maintained in the official [Eclipse ThreadX documentation](https://github.com/eclipse-threadx/rtos-docs).
