---
title: Kendryte K210 FreeRTOS SDK
summary: A comprehensive software development kit for the Kendryte K210 RISC-V SoC,
  featuring integrated FreeRTOS support. It provides a full environment including
  hardware abstraction layers, peripheral drivers, and middleware like lwIP and FatFS
  for building embedded AI and IoT applications.
slug: kendryte-k210-freertos-sdk
codeUrl: https://github.com/kendryte/kendryte-freertos-sdk
star: 200
version: v0.7.0
lastUpdated: '2021-02-01'
rtos: freertos
libraries:
- lwip
topics:
- ai
- freertos
- k210
- kendryte
- sdk
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- ameba-freertos-pro2-sdk
- nuclei-software-development-kit-nuclei-sdk
- ameba-rtos-sdk
- esp8266-rtos-software-development-kit-sdk
- rt-thread-board-support-package-for-kendryte-k210
- micropython-for-kendryte-k210-lobo-port
---

## Overview

The Kendryte K210 FreeRTOS SDK is a specialized development environment designed for the Kendryte K210, a dual-core RISC-V SoC with built-in AI acceleration capabilities. This SDK integrates the FreeRTOS kernel, allowing developers to leverage multi-threading, task synchronization, and real-time scheduling on the K210's dual-core architecture. 

While the project is currently marked as no longer maintained and not recommended for new commercial product development, it remains a significant resource for hobbyists and researchers working with the K210 hardware. It provides a structured approach to managing the complex peripherals of the SoC, including its neural network processor (KPU) and audio processor (APU).

## Technical Architecture

The SDK is built on a modular architecture that separates hardware-specific code from high-level application logic. Key components include:

- **FreeRTOS Kernel**: Provides the core multitasking capabilities, tailored for the RISC-V architecture.
- **Hardware Abstraction Layer (HAL)**: Offers a consistent API for interacting with K210 peripherals such as GPIO, UART, SPI, and I2C.
- **Middleware**: Includes integrated support for the lwIP TCP/IP stack and the FatFS file system, enabling network connectivity and storage management.
- **Build System**: Utilizes a CMake-based build system, supporting cross-compilation for RISC-V targets on Linux, macOS, and Windows.

## Key Features

- **Dual-Core Support**: Designed to utilize the dual-core nature of the K210, facilitating parallel processing tasks.
- **Integrated Toolchain Support**: Works with the Kendryte GNU toolchain (RISC-V GCC) to produce optimized binaries.
- **Flexible Project Structure**: Allows developers to house their application code within the SDK's `src` directory or maintain external project folders using provided CMake templates.
- **Comprehensive Driver Library**: Includes drivers for specialized K210 features like the KPU (AI acceleration) and hardware-based FFT.

## Getting Started

The SDK uses a standard CMake workflow. To start a new project, developers typically create a subdirectory within the `src/` folder and place their source files there. The build process involves specifying the project name and the path to the RISC-V toolchain:

```bash
mkdir build && cd build
cmake .. -DPROJ=hello_world -DTOOLCHAIN=/opt/riscv-toolchain/bin
make
```

This process generates two primary outputs: an ELF file for debugging (often via J-Link) and a `.bin` file for flashing directly to the device's SPI flash memory using UOG or other flash tools.

## Ecosystem and Dependencies

The SDK relies on several third-party components to provide a full-featured environment. It includes the `lwip` stack for networking and `fatfs` for handling SD cards and internal flash storage. The configuration for these components, along with compiler flags and linker scripts, is managed through a `kendryte-package.json` manifest, which defines the project's include paths and system library dependencies such as `libgcc`, `libm`, and `libstdc++`.
