---
title: StateOS C++11
summary: StateOS is a free real-time operating system (RTOS) designed for deeply embedded
  applications, featuring a C++11 interface with support for std::thread. This project
  provides a template and implementation specifically targeting the STM32F4Discovery
  board using the GCC toolchain.
slug: stateos-c-11
codeUrl: https://github.com/stateos/StateOS_cpp11
star: 2
lastUpdated: '2025-11-14'
rtos: stateos
topics:
- cpp11
- embedded
- kernel
- real-time
- rtos
- stateos
- std-thread
- thread-local-storage
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- mos-rtos
- freertos-modern-c-wrappers
- freertos-cpp
- freertos-port-for-teensy-3-6-4-0-4-1
- rtems-5-cmake-c-11-starter
- echronos-on-stm32f4x-nucleo-board
---

StateOS is a free real-time operating system (RTOS) specifically engineered for deeply embedded applications. This repository, StateOS_cpp11, provides a modern development environment by integrating C++11 features, most notably `std::thread`, into the RTOS ecosystem. This allows developers to use standard C++ threading primitives while maintaining the deterministic behavior required for real-time embedded systems.

## Hardware and Platform Support

The project is configured to target the STM32F4Discovery board, which features an ARM Cortex-M4 microcontroller. The build system is optimized for the GNU GCC toolchain, providing a robust path for compiling and deploying C++11 code to bare-metal hardware. It utilizes a modular structure where core components, device drivers, and startup code are managed through a common repository linked as a Git submodule.

## Technical Architecture

StateOS_cpp11 is designed to bridge the gap between high-level C++ abstractions and low-level hardware constraints. By implementing the underlying logic for `std::thread`, the RTOS enables developers to write more portable and idiomatic C++ code without sacrificing the performance or control offered by a traditional RTOS kernel.

Key technical components include:
- **CMSIS Integration**: Uses the Cortex Microcontroller Software Interface Standard for hardware abstraction.
- **Custom Build System**: Supports both CMake and GNU Make, allowing for flexible integration into various development workflows.
- **Modular Dependencies**: Separates the core RTOS logic, device-specific code, and the C++ standard library wrapper into distinct modules.

## Getting Started

The repository serves as a template for new projects. The primary entry point is located in `src/main.cpp`, and the build configuration is handled via `CMakeLists.txt` or `makefile.gnucc`. 

To build the project using CMake, the system requires a toolchain file specifically for the STM32F4Discovery, which is included in the project structure. The build process links against the `stateos::stdc++` library, which provides the necessary glue between the C++ standard library and the StateOS kernel. This setup ensures that standard synchronization primitives and threading models function correctly within the real-time environment.
