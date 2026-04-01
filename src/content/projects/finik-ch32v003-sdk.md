---
title: FINIK CH32V003 SDK
summary: A development kit for the CH32V003 RISC-V microcontroller that combines an
  Arduino-like project structure with a CMake-based build system. It provides a streamlined
  workflow for Windows users, including VS Code integration, a UART-based programmer,
  and built-in support for persistent configuration storage in flash memory.
slug: finik-ch32v003-sdk
codeUrl: https://github.com/karasevia/finik-v003
lastUpdated: '2024-10-21'
licenses:
- MIT
image: /202603/finik-v003_0.avif
rtos: ''
topics:
- arduino
- c-language
- ch32v003
- cmake
- embedded
- gcc
- mcu
- vscode
isShow: true
createdAt: '2026-03-31T23:35:54+00:00'
updatedAt: '2026-03-31T23:35:54+00:00'
---

The CH32V003 has gained significant popularity in the embedded community as an incredibly cost-effective RISC-V microcontroller. However, setting up a professional development environment for these chips can sometimes be a hurdle. The FINIK CH32V003 SDK aims to bridge this gap by offering a development experience that feels as intuitive as the Arduino IDE while maintaining the power and flexibility of a CMake-driven build system.

### Seamless Development Workflow

The SDK is designed for rapid prototyping, abstracting the complexities of the RISC-V toolchain. It provides a ready-to-use VS Code environment complete with a suite of extensions for debugging, serial terminal access, and linker script management. By leveraging CMake, it allows developers to easily scale their projects from simple LED blinks to complex systems with multiple source files and libraries. 

One of the standout features is the integrated UART-based command service and bootloader functionality. This simplifies the process of updating firmware without strictly requiring a dedicated hardware debugger, though full OpenOCD support is included for developers who need standard debugging capabilities.

### Technical Architecture

At its core, the project integrates several layers to provide a cohesive experience:
- **WCH HAL & BMSIS**: The SDK incorporates the standard hardware abstraction layers and micro-system interface standards for the CH32V003.
- **Arduino Compatibility Layer**: A dedicated source folder provides an `arduino.h` interface, allowing developers to use familiar syntax while benefiting from a professional build system.
- **Custom Toolchain**: A specialized CMake toolchain file manages the RISC-V cross-compilation process, ensuring that the necessary flags and linker scripts are applied correctly for the target hardware.

### Persistent Configuration Management

A practical addition to this SDK is the reserved memory space for user configurations. The last two pages of the MCU's flash memory are set aside, allowing for up to 62 bytes of persistent data storage. This is particularly useful for storing MAC addresses, network settings, or device-specific credentials that must persist across reboots and firmware updates.

To use this feature, developers can define a union to map their data structure to the raw config storage:

```c
union config_u {
    config_t raw;
    struct {
        uint8_t mode;
        uint8_t mac[6];
        uint8_t ipv4[4];
        char password[32];
    };
} config;

// Reading and writing is straightforward
read_config(&config.raw);
config.mode = 3;
save_config(&config.raw);
```

### Debugging and Tooling

The SDK simplifies the transition from coding to debugging. By switching the build type to `Debug` in the CMake configuration, developers can use the pre-configured VS Code "Run and Debug" tasks. This setup utilizes OpenOCD to provide a modern debugging experience, including breakpoints and variable inspection, which is often a pain point when working with ultra-low-cost microcontrollers.

### Community Foundation

This project builds upon the work of several community-driven initiatives, including the `ch32v307-cmake-vsc-noos-template`, `arduino-wch32v003`, and the `ch32v003-uart-programmer`. By consolidating these tools into a single, cohesive SDK, FINIK provides a robust starting point for anyone looking to harness the power of the CH32V003.
