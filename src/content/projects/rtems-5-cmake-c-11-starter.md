---
title: RTEMS 5 CMake C++11 Starter
summary: A boilerplate project for developing RTEMS 5 applications using CMake and
  C++11. It targets the SPARC ERC32 architecture and provides a pre-configured build
  environment for cross-compiling embedded real-time applications.
slug: rtems-5-cmake-c-11-starter
codeUrl: https://github.com/roncapat/RTEMS-5-CMake-CPP11-Starter
star: 0
lastUpdated: '2020-06-17'
rtos: rtems
topics:
- build-system
- cmake
- cpp
- cpp11
- cross-compilation
- rtems
- rtos
- starter
- starter-kit
- starter-template
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rtems-cmake-build-support
- stm32-makefile-freertos-project-template
- stateos-c-11
- stm32f030-cmake-cmsis-project-skeleton
- stm32-cmake-cmsis-project-skeleton
- arduino-osek-with-erika-enterprise-ee
---

## Overview

The RTEMS 5 CMake C++11 Starter is a template designed to simplify the development of real-time applications using the RTEMS (Real-Time Executive for Multiprocessor Systems) operating system. While RTEMS has traditionally relied on its own build systems or Waf, this project provides a modern CMake-based workflow, making it easier to integrate with contemporary IDEs and CI/CD pipelines.

This starter project is specifically configured for RTEMS 5 and targets the SPARC ERC32 Board Support Package (BSP). The ERC32 is a radiation-hardened version of the SPARC V7 architecture, frequently used in space applications and often employed as a standard simulation target for RTEMS development.

## Modern Development with C++11

One of the key highlights of this repository is its focus on C++11. By leveraging modern C++ standards, developers can utilize features like type safety, smart pointers, and improved concurrency primitives within an RTOS environment. The project ensures that the cross-compiler flags and include paths are correctly set up to support the C++11 standard library provided by the RTEMS toolchain.

## Technical Configuration

The heart of the project lies in its `CMakeLists.txt` file. It handles the complexities of cross-compilation for the SPARC architecture, including:

- **Toolchain Integration**: It automatically configures the `sparc-rtems5-gcc` and `sparc-rtems5-g++` compilers.
- **BSP Specifications**: It uses the `-specs bsp_specs` and `-qrtems` flags, which are essential for linking against the RTEMS kernel and the specific ERC32 hardware abstraction layer.
- **Path Management**: The build script allows users to define their `RTEMS_ROOT_PATH`, ensuring that the build system can locate the kernel headers and libraries regardless of where RTEMS is installed on the host system.

## Getting Started

To use this starter, developers need a working RTEMS 5 installation built for the SPARC ERC32 target. The project follows a standard CMake build pattern:

```bash
git clone https://github.com/roncapat/RTEMS-5-CMake-C-11-Starter.git rtems-demo
cd rtems-demo
mkdir build
cd build
cmake ..
make
```

Before running `cmake`, users must adjust the `RTEMS_ROOT_PATH` in the `CMakeLists.txt` to point to their local RTEMS installation directory. This setup produces an executable that can be run on SPARC hardware or within an emulator like TSIM or GDB's SIS simulator.

## Project Structure

The repository is kept minimal to serve as a clean starting point:
- `example.cpp`: A basic entry point for the application, demonstrating how to initialize a task or print a "Hello World" message in an RTEMS environment.
- `CMakeLists.txt`: The primary build configuration file that manages dependencies and compilation flags.

This project is an excellent resource for developers looking to move away from legacy build scripts and adopt a more standard, portable build system for their RTEMS-based embedded systems.
