---
title: Qfplib-M0-tiny
summary: A highly optimized IEEE 754 single-precision floating-point library designed
  for ARM Cortex-M0 microcontrollers. It provides arithmetic, trigonometric, and conversion
  functions within a 1 kbyte footprint, specifically tailored for memory-constrained
  embedded systems and RT-Thread environments.
slug: qfplib-m0-tiny
codeUrl: https://github.com/mysterywolf/Qfplib-M0-tiny
siteUrl: https://www.quinapalus.com/qfplib.html
star: 11
version: v1.0.0
lastUpdated: '2021-05-26'
rtos: rt-thread
topics:
- arm
- cortex-m0
- floating-point
- qfplib-m0-tiny
- rt-thread
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- qfplib-m0-full-floating-point-library
- qfplib-m3-floating-point-library
- flexptp
- minimal-mbed-os-template-for-stm32f030
- arm-dwt-c-library
- arm-cortex-m-hilbert-transform
---

## Overview

Qfplib-M0-tiny is a specialized library of IEEE 754 single-precision floating-point arithmetic routines specifically engineered for microcontrollers based on the ARM Cortex-M0 core (ARMv6-M architecture). While it is compatible with Cortex-M3 and Cortex-M4 devices, its primary design goal is to provide a high-performance math suite for the most memory-constrained environments, fitting a comprehensive set of functions into just 1 kbyte of program memory.

In many embedded applications, particularly those using the Cortex-M0, program memory is at a premium. Standard floating-point libraries provided by compilers like GCC can be surprisingly large; for instance, the four basic arithmetic functions alone can occupy nearly 2.7 kbytes. Qfplib-M0-tiny solves this by providing correctly rounded addition, subtraction, multiplication, and division, alongside scientific functions, in a fraction of that space.

## Key Features and Capabilities

The library is modular, allowing developers to include only the functions they need to save space. The build is controlled by symbols such as `include_faster`, `include_conversions`, and `include_scientific`.

- **Basic Arithmetic**: Includes `qfp_fadd`, `qfp_fsub`, `qfp_fmul`, `qfp_fdiv`, and the comparison function `qfp_fcmp`.
- **Scientific Functions**: Provides high-accuracy implementations of sine, cosine, tangent, arctangent, logarithm, exponential, and square root.
- **Conversion Routines**: Facilitates easy movement between floating-point values and signed/unsigned integers or fixed-point values.
- **Fast Variants**: For applications where speed is more critical than perfect IEEE 754 rounding, the library offers "fast" versions of division and square root functions that save additional cycles.

## Technical Implementation

Qfplib-M0-tiny is written in assembly language to achieve its extreme density and performance. It is designed with embedded constraints in mind:
- **No Static Storage**: The library does not use any static memory, making it easier to integrate into various memory maps.
- **Parsimonious Stack Usage**: Stack consumption is kept to a minimum and is statically analyzable, which is critical for safety-conscious embedded development.
- **No Recursion**: Ensures predictable execution flow and stack depth.

## Performance and Accuracy

Despite its tiny footprint, the library maintains high standards for accuracy. The basic arithmetic operations produce correctly rounded results (to nearest, even-on-tie). When compared to the ARM CMSIS "FastMath" implementations, Qfplib-M0-tiny often proves to be significantly faster and more accurate. For example, the `qfp_fcos` function is roughly six times faster than the standard GCC library equivalent on a Cortex-M0 while maintaining superior precision.

## Integration with RT-Thread

This version of the library is specifically packaged for the RT-Thread ecosystem. It includes an `SConscript` file for seamless integration into the RT-Thread build system and can be easily selected via the RT-Thread online package manager under the acceleration packages section. This makes it an ideal choice for RT-Thread users working on low-power ARMv6-M hardware who require floating-point capabilities without the overhead of standard C libraries.

## Getting Started

To use the library, developers include `qfplib.h` in their C code. The library provides standard function prototypes such as:

```c
extern float qfp_fadd(float x, float y);
extern float qfp_fsin(float x);
extern int   qfp_float2int(float x);
```

Additionally, the project includes `Qfpio`, a set of string conversion functions (approximately 800 bytes) for converting between floating-point values and ASCII strings, providing a lightweight alternative to `printf` and `scanf` for math-heavy logging and user interfaces.
