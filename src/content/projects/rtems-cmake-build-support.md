---
title: RTEMS CMake Build Support
summary: A comprehensive CMake build system for RTEMS applications, providing toolchain
  configuration and cross-compilation support. It simplifies the development process
  by automating BSP and compiler setup using pkg-config and standard CMake patterns.
slug: rtems-cmake-build-support
codeUrl: https://github.com/robamu-org/rtems-cmake
star: 9
version: v1.0.0
lastUpdated: '2022-05-27'
rtos: rtems
topics:
- cmake
- rtems
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rtems-5-cmake-c-11-starter
- stm32-cmake-cmsis-project-skeleton
- buildpkg
- stm32f030-cmake-cmsis-project-skeleton
- stm32-base-project-template
- cmsis-rp2040
---

## Streamlining RTEMS Development with CMake

Developing for the Real-Time Executive for Multiprocessor Systems (RTEMS) often involves navigating complex build environments. While RTEMS has historically relied on custom build systems and tools like `waf`, many modern developers prefer the flexibility and ecosystem integration of CMake. The RTEMS CMake Build Support project provides a robust framework to bridge this gap, offering a generic and reusable way to configure cross-compilation for RTEMS applications.

This project acts as a prototype for a standardized RTEMS-CMake integration. It is designed to be as non-intrusive as possible, requiring only a few lines of configuration in an application's `CMakeLists.txt` to handle the heavy lifting of compiler detection, flag management, and Board Support Package (BSP) integration.

## Core Features and Architecture

The build support is structured around the standard CMake toolchain mechanism. It leverages the `pkgconfig` utility—which RTEMS uses to export build parameters—to automatically extract necessary compiler and linker flags for specific BSPs. This ensures that the application is built with the exact settings required by the pre-compiled RTEMS kernel.

Key components of the system include:
- **RTEMSPreProjectConfig.cmake**: Handles environment preparation and processes variables like `RTEMS_BSP` and `RTEMS_PREFIX` before the project is defined.
- **RTEMSToolchain.cmake**: The core toolchain file that sets up the cross-compiler (GCC/G++) and system-specific variables.
- **RTEMSCompilerConfig.cmake**: Manages the detection of RTEMS versions and validates the installation paths for tools and libraries.
- **RTEMSPkgConfig.cmake**: Interfaces with the RTEMS pkg-config files to retrieve architecture-specific flags.

## Supported Architectures and Platforms

The toolchain configuration includes explicit support for common RTEMS architectures, including **ARM** and **SPARC**. By setting the `RTEMS_ARCH_VERSION_NAME` (e.g., `arm-rtems6`), the system automatically locates the correct cross-compiler binaries within the RTEMS tools directory. It has been tested on both Windows 10 and Ubuntu 20.04, making it a viable option for cross-platform development teams.

## Getting Started with RTEMS-CMake

To integrate this support into an existing project, developers typically include the configuration directory and call the provided macros. A standard setup involves defining the RTEMS prefix and BSP, then including the pre-project configuration before the `project()` call:

```cmake
# Define the path to the RTEMS CMake support
set(RTEMS_CONFIG_DIR "path/to/rtems-cmake")

# Include pre-project configuration
include(${RTEMS_CONFIG_DIR}/RTEMSPreProjectConfig.cmake)
rtems_pre_project_config(${RTEMS_PREFIX} ${RTEMS_BSP})

# Set the toolchain file
set(CMAKE_TOOLCHAIN_FILE ${RTEMS_CONFIG_DIR}/RTEMSToolchain.cmake)

project(MyRTEMSApp)

# Include post-project configuration
include("${RTEMS_CONFIG_DIR}/RTEMSPostProjectConfig.cmake")
rtems_post_project_config(${TARGET_NAME})
```

## Advanced Configuration and Helpers

For users who prefer a more guided experience, the repository includes a Python helper script, `cmake_build_config.py`. This utility assists in generating the necessary CMake commands and environment variables, reducing the manual effort required to switch between different BSPs or RTEMS versions. 

Additionally, the system allows for manual overrides of variables such as `RTEMS_VERSION`, `RTEMS_TOOLS`, and `RTEMS_PATH`, providing the flexibility needed for custom toolchain locations or experimental RTEMS builds. This makes it an excellent starting point for developers moving from simple "Hello World" examples to more complex embedded applications.
