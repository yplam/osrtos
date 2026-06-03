---
title: Microchip CMSIS Modules for Arduino
summary: A collection of CMSIS header files and device support modules for Microchip
  ARM-based microcontrollers, specifically designed for integration into the Arduino
  IDE. It supports a wide range of SAM families including SAM3X, SAMC21, SAMD21, SAMD51,
  and SAML21, providing the necessary hardware abstraction layers for low-level development.
codeUrl: https://github.com/fortytwosystems/ArduinoModule-CMSIS-Microchip
siteUrl: https://github.com/fortytwosystems/ArduinoModule-CMSIS-Microchip
isShow: false
rtos: cmsis
libraries: []
topics:
- arduino
- cmsis
- microchip
- arm
- fortytwo
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- cmsis-device-headers-for-microchip-sam
- arduino-cmsis-module
- silicon-labs-arduino-core
- cmsis-for-stm32-development
- pamculib
- arduino-pico
---

The **ArduinoModule-CMSIS-Microchip** repository is a critical infrastructure project for developers working with Microchip (formerly Atmel) SAM microcontrollers within the Arduino ecosystem. It provides the standardized CMSIS (Cortex Microcontroller Software Interface Standard) headers and device-specific support files required to interface with the hardware at a low level.

### Bridging the Gap Between Hardware and IDE
CMSIS is a vendor-independent hardware abstraction layer for microcontrollers that are based on the Arm Cortex-M processor series. By providing these modules, this project ensures that developers using the Arduino IDE or PlatformIO have access to the official register definitions, interrupt vectors, and system initialization routines provided by Microchip. This is essential for anyone looking to move beyond standard Arduino APIs and perform direct register manipulation or optimize performance for specific SAM-based boards.

### Extensive Hardware Support
The repository covers a broad spectrum of Microchip's ARM-based portfolio. Supported device families include:
- **SAM3X**: Famous for powering the Arduino Due.
- **SAMD21**: The heart of the Arduino Zero, MKR series, and many Adafruit boards.
- **SAMD51**: High-performance M4F chips used in the Adafruit Grand Central and ItsyBitsy M4.
- **SAMC21**: 5V-tolerant Cortex-M0+ microcontrollers for industrial applications.
- **SAML21**: Ultra-low-power variants of the SAMD series.

### Multi-Toolchain Compatibility
One of the strengths of this module is its support for various professional toolchains. Each device family directory contains specific configurations for:
- **GCC**: The standard compiler for Arduino and open-source development.
- **IAR & Keil**: Industry-standard professional IDEs.
- **SVD Files**: System View Description files, which are invaluable for debugging as they allow debuggers to display the state of peripheral registers in a human-readable format.

### Packaging and Integration
For developers looking to integrate these headers into their own custom Arduino cores or PlatformIO frameworks, the project includes a `Makefile` to automate the packaging process. Running `make all` generates a compressed `.tar.bz2` archive ready for distribution. 

```bash
# To package the module for Arduino IDE
make all
```

This repository serves as a foundational layer, ensuring that the underlying register maps and system files are consistent, up-to-date, and easily deployable across different development environments. Whether you are building a custom board or maintaining an Arduino core, these CMSIS modules provide the necessary definitions to unlock the full potential of Microchip's SAM silicon.
