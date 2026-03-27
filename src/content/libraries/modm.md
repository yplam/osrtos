---
title: modm
slug: modm
summary: modm is a modular C++23 library generator and hardware abstraction layer
  (HAL) designed for resource-constrained AVR and ARM Cortex-M microcontrollers. It
  utilizes the lbuild code generator to produce target-specific startup code, drivers,
  and communication protocols with a focus on zero memory allocation and high portability
  across thousands of devices.
codeUrl: https://github.com/modm-io/modm
siteUrl: https://modm.io/
star: 940
version: 2025q4
lastUpdated: '2026-03-09'
components:
- Network
- FileSystem
- Graphics
- USBHost
- USBDevice
- CAN
- CANFD
- TCP
- UDP
- DNS
- DHCP
- Profiling
- Shell
- GUI
platforms:
- ARM Cortex-M
- AVR
- AVR8
- POSIX
- Linux
licenses:
- MPL-2.0
libraryType: HAL
createdAt: '2025-12-23'
updatedAt: '2026-03-27'
---

### Features


- Object-oriented C++23 API designed for high performance and low memory overhead.

- Modular HAL generation using the lbuild data-driven code generator for over 3,800 microcontrollers.

- Support for multiple vendors including STMicroelectronics (STM32), Microchip (SAM, AVR), and Raspberry Pi (RP2040).

- Build system agnostic design supporting CMake, SCons, and Makefiles.

- Zero-allocation HAL implementation to minimize RAM consumption in deeply embedded systems.

- Cross-platform peripheral interfaces for GPIO, ADC, DAC, UART, I2C, SPI, CAN, and Ethernet.

- Integrated cooperative, stackful fibers and a lightweight task scheduler.

- Target-independent drivers for a wide range of external I2C and SPI sensors and devices.

- Debug and logging system providing IOStream and printf-compatible interfaces.

- Functional partial libstdc++ implementation specifically optimized for AVR architectures.

- Integration with FreeRTOS and FreeRTOS+TCP for real-time multitasking and networking.

- Native support for TinyUSB stack for both host and device roles.

- Support for FatFS to enable FAT/exFAT filesystem operations on block devices.

- Integration with LVGL for building embedded graphical user interfaces.

- Support for Nanopb to handle Protocol Buffers in memory-constrained environments.

- Built-in lightweight unit testing system suitable for execution on 8-bit AVRs.

- Crash reporting via CrashCatcher for debugging HardFaults on ARM Cortex-M.

- Support for Segger Real-Time Transport (RTT) for high-speed logging.



### Architecture

modm follows a modular, data-driven architectural pattern centered around the **lbuild** code generator. Unlike traditional static libraries, modm generates a custom library instance tailored specifically to the target microcontroller and project requirements. The architecture is layered to provide maximum portability while maintaining hardware-specific optimizations. At the lowest level, the library generates startup code and a Hardware Abstraction Layer (HAL) that provides a unified C++23 interface for peripherals like GPIO, UART, and SPI across different vendors.

Above the HAL, modm provides target-independent drivers for external components (sensors, displays, etc.) and high-level communication protocols. A key architectural principle is the avoidance of dynamic memory allocation within the HAL, ensuring predictable RAM consumption. The system also includes a cooperative multitasking layer based on stackful fibers, allowing for complex asynchronous logic without the overhead of a full preemptive RTOS, though integration with FreeRTOS is provided for more demanding applications.

### Use Cases

This library is ideal for:

- **Autonomous Robotics**: Specifically optimized for high-reliability requirements in competitions like Eurobot where predictable program flow is critical.
- **Resource-Constrained Devices**: Ideal for 8-bit AVR and small ARM Cortex-M0+ devices where low RAM and flash consumption are paramount.
- **Cross-Platform Development**: Projects that need to maintain a single codebase across different microcontroller families (e.g., STM32 and SAM).
- **Rapid Prototyping**: Developers using supported development boards (Nucleo, Discovery, Arduino) who need a high-level C++ API without sacrificing performance.
- **Industrial Communication**: Applications requiring robust CAN, CAN-FD, or Ethernet stacks with integrated third-party networking libraries.
- **Embedded GUI Development**: Systems requiring graphical interfaces via LVGL integration on various display controllers.

### Getting Started

To begin using modm, developers must clone the repository recursively to include all necessary submodules: `git clone --recurse-submodules https://github.com/modm-io/modm.git`. The library relies on the **lbuild** tool to generate the specific library files for your target; this process involves creating a project configuration file that specifies the microcontroller and required modules. 

Comprehensive documentation, including installation guides for the required toolchains and a detailed "Discover" guide, is available at [modm.io](http://modm.io). The repository also contains hundreds of up-to-date examples for various architectures and development boards, which serve as the primary reference for implementing peripheral drivers and third-party integrations.
