---
title: STM32 Base Project Template
summary: A comprehensive CMake-based boilerplate for STM32 development featuring FreeRTOS
  integration, STM32Cube HAL, and a robust unit testing framework. It provides a structured
  environment for ARM Cortex-M projects with built-in support for code coverage, automated
  documentation, and advanced GDB debugging utilities.
slug: stm32-base-project-template
codeUrl: https://github.com/rgujju/STM32_Base_Project
star: 94
lastUpdated: '2021-04-03'
rtos: freertos
topics:
- codecove
- embedded
- freertos
- stm32
- stm32-template
- template
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- enterprise-stm32-platform-development
- stm32-makefile-freertos-project-template
- stm32f107-makefile-freertos-template
- stm32f030-cmake-cmsis-project-skeleton
- stm32-cmake-cmsis-project-skeleton
- stm32-rtic-project-template
---

## Overview

The STM32 Base Project is a professional-grade template designed to jumpstart firmware development for STM32 microcontrollers. It moves away from restrictive IDE-based project formats in favor of a flexible, modular CMake build system. By integrating industry-standard tools like FreeRTOS for task management and Unity for unit testing, it provides a solid foundation for building maintainable and testable embedded applications.

While the project is pre-configured for the STM32F429 discovery board, its architecture is designed for portability across the entire STM32 family and other ARM Cortex-M microcontrollers. It emphasizes modern development practices, including automated documentation generation and hardware-in-the-loop debugging.

## Key Features

### Modular Architecture
The repository is organized into distinct logical sections to ensure a clean separation of concerns:
- **Components**: Houses external libraries and submodules such as the FreeRTOS kernel, CMSIS, and the STM32 HAL drivers.
- **Modules**: Contains the core application logic, designed to be independently testable.
- **Tests**: A dedicated suite for unit testing modules using the Unity framework and FFF mocking library.
- **Build System**: A CMake-driven framework that handles both native host-based testing and cross-compilation for the target hardware.

### Integrated RTOS and HAL
The project comes with FreeRTOS pre-integrated, allowing developers to immediately begin writing multi-threaded applications. It leverages the STM32 CubeMX HAL for hardware abstraction, providing a familiar API for peripheral control while maintaining the flexibility to swap out drivers for different MCU variants.

### Advanced Debugging and Tooling
To streamline the development workflow, the template includes several advanced utilities:
- **GDB Dashboard**: Enhances the standard GDB interface for better visibility during debugging sessions.
- **ARM Semihosting**: Enabled by default to allow the target board to communicate with the host machine for logging and I/O.
- **Code Coverage**: Integrated `lcov` support to visualize test effectiveness.
- **Doxygen**: Automated API documentation generation from source code comments.

## Technical Implementation

The build process is managed via `CMakeLists.txt`, which defines two primary target groups: `production` and `test`. 

When building for `production`, the system uses the `arm-none-eabi-gcc` toolchain defined in `cross.cmake`. It handles the linking of the FreeRTOS kernel, HAL drivers, and application modules into a final ELF file. The project also includes custom linker scripts (`linker.ld` and `layout_base.ld`) that define the memory map for RAM, Flash, and CCMRAM.

When building for `test`, the project compiles natively on the host machine. This allows for rapid iteration of logic-heavy modules without needing to flash hardware for every change. The Unity framework provides the test runner, while FFF allows for mocking hardware dependencies.

## Getting Started

To use this template, developers can clone the repository and configure the `MCU Setup` section in the root `CMakeLists.txt`. This involves specifying the MCU type (e.g., `STM32F429xx`), the startup file, and the High-Speed External (HSE) clock frequency.

### Build Example

For a standard debug build targeting the hardware:

```bash
mkdir -p build/debug
cd build/debug
cmake ../.. -DCMAKE_BUILD_TYPE=Debug -DCMAKE_TOOLCHAIN_FILE=../../cross.cmake -DTARGET_GROUP=production
make
```

To run unit tests on the host machine:

```bash
mkdir -p build/test
cd build/test
cmake ../.. -DTARGET_GROUP=test
make
ctest --verbose
```

## Porting to Other Hardware

Porting the project to a different STM32 microcontroller is straightforward. Users need to replace the HAL driver files in the `components` folder and update the `include/stm32f4xx_hal_conf.h` with the configuration specific to their target. The linker script must also be adjusted to match the memory layout of the new device. Because the project uses a modular CMake structure, these changes are localized and do not require rewriting the core build logic.
