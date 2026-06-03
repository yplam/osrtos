---
title: Seal-test Bare Bones Example
summary: A blinky example project for Microchip SAML21 and SAMD51 microcontrollers
  using the Seal-device CMSIS package. It demonstrates a modular CMake-based build
  system for cross-compiling ARM Cortex-M firmware across different IDEs and CI environments.
slug: seal-test-bare-bones-example
codeUrl: https://github.com/CrustyAuklet/seal-test
star: 7
lastUpdated: '2019-09-12'
rtos: cmsis
topics:
- cmake
- cmsis
- cpp
- cpp17
- embedded
- samd
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32f103c8-freertos-cmsis-blink-example
- stm32f1-rtos-example-project
- stm32f030-cmake-cmsis-project-skeleton
- lpc43xx-freertos-led-blinking-example
- stm32-libopencm3-freertos-platformio-template
- stm32-cmake-cmsis-project-skeleton
---

## Overview

The Seal-test project serves as a practical demonstration of building embedded firmware using a modern CMake-based workflow. Specifically designed as a "blinky" example for the Microchip SAML21G18B microcontroller, it showcases how to integrate CMSIS (Cortex Microcontroller Software Interface Standard) components into a modular project structure that remains independent of any specific IDE.

## The Modular CMake Approach

One of the primary goals of this project is to highlight the benefits of using CMake in embedded development. Unlike traditional IDE-locked projects, this repository uses `CMakeLists.txt` as the single source of truth. This approach allows developers to switch seamlessly between various environments—such as VSCode, Visual Studio 2019, or CLion—while maintaining a consistent build process for both local development and Continuous Integration (CI) pipelines.

The project architecture is highly modular. It consumes the `seal-device` package as a git submodule, which provides the necessary CMSIS headers, startup files, and linker scripts. By abstracting these hardware-specific details, the main application remains clean and focused on logic. This design allows the project to be cross-compiled across different ARM Cortex-M devices or even simulated on different architectures by simply swapping the implementation provided in the CMSIS module.

## Hardware and Architecture Support

While the default target is the SAML21G18B, the build system is designed to be flexible. It currently supports several Microchip SAM series devices, including:
- SAML21
- SAMD21
- SAMD51

The project utilizes C++17 features, demonstrating that modern language standards are well-suited for even "bare bones" embedded tasks. The build process is configured to automatically generate `.elf`, `.hex`, and `.bin` files using the `arm-none-eabi-objcopy` utility, facilitating easy flashing to target hardware.

## Development Environment Integration

To assist developers in getting started, the repository includes pre-configured editor files for several popular IDEs. This ensures that features like IntelliSense, debugging, and build tasks are ready to use with the ARM GCC toolchain. The repository includes configurations for:
- **VSCode**: Task and launch configurations.
- **Visual Studio 2019**: Native CMake support settings.
- **CLion**: JetBrains' CMake-centric IDE support.

For developers who prefer to configure their own environment from the ground up, the project maintains a `noConfig` branch that mirrors the main branch but excludes these IDE-specific files.

## Continuous Integration and Quality

The project includes a robust Travis CI configuration that automates the build process. The CI pipeline handles the deployment of the ARM GCC Embedded Toolchain and a specific version of CMake to ensure a reproducible build environment. Furthermore, the project integrates with SonarCloud for static code analysis, demonstrating a professional approach to maintaining code quality in embedded systems.
