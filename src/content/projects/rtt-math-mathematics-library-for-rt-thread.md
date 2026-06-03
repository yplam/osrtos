---
title: 'rtt-math: Mathematics Library for RT-Thread'
summary: A mathematics library designed for the RT-Thread real-time operating system.
  It provides a collection of mathematical functions and usage examples integrated
  into the RT-Thread build system via SCons.
slug: rtt-math-mathematics-library-for-rt-thread
codeUrl: https://github.com/luhuadong/rtt-math
star: 0
lastUpdated: '2020-11-29'
rtos: rt-thread
topics:
- rt-thread
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rtt-validator
- rtt-libfilter-digital-filter-library-for-rt-thread
- c-crc-for-rt-thread
- qfplib-m0-full-floating-point-library
- rt-thread-package-list
- rust-support-for-rt-thread
---

## Overview

The `rtt-math` project is a dedicated mathematics library tailored for the RT-Thread RTOS ecosystem. In embedded development, mathematical operations are fundamental for tasks such as signal processing, sensor data fusion, and control loop calculations. This library provides a structured way to include mathematical routines within RT-Thread projects, ensuring compatibility with the RT-Thread build environment.

## Integration with RT-Thread

One of the primary advantages of `rtt-math` is its seamless integration with the RT-Thread build system. The project includes an `SConscript` file, which allows it to be easily managed through the SCons build tool used by RT-Thread. This integration enables developers to toggle the library on or off using standard configuration tools like `menuconfig`.

The build script defines two main configuration paths:
- **PKG_USING_MATH**: When enabled, the core source files located in the `src` directory are compiled into the project.
- **PKG_USING_MATH_SAMPLE**: When enabled, example code from the `examples` directory is included, providing developers with ready-to-use templates for implementing mathematical logic.

## Project Structure

The repository is organized to follow standard RT-Thread package conventions, making it intuitive for experienced users of the RTOS:

- **inc/**: Contains the header files (`.h`) that define the mathematical APIs and constants.
- **src/**: Contains the implementation files (`.c`) for the library's core functionality.
- **examples/**: Includes sample applications that demonstrate how to call the library functions within an RT-Thread thread.

## Technical Implementation

By utilizing the `DefineGroup` function within its `SConscript`, the library defines a specific build group named 'math'. This group automatically manages the inclusion of the `inc` directory in the compiler's header search path (`CPPPATH`), reducing the manual configuration required by the developer. This approach is particularly beneficial in complex RT-Thread projects where managing dependencies across multiple packages can become cumbersome.

## Getting Started

To use `rtt-math` in an RT-Thread project, developers typically add the package to their project environment. Once the package is present, enabling `PKG_USING_MATH` in the project configuration will trigger the SCons build system to link the library. For those new to the library, enabling `PKG_USING_MATH_SAMPLE` is a recommended first step to verify the environment and see the library in action through the provided example code.
