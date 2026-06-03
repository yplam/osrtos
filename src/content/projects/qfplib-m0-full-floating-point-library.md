---
title: Qfplib-M0-full Floating-Point Library
summary: A high-performance, compact IEEE 754 floating-point library optimized for
  ARM Cortex-M0 microcontrollers. It provides single- and double-precision arithmetic,
  trigonometric, and conversion functions with correctly rounded results. Integrated
  as an RT-Thread package, it offers significant speed improvements over standard
  GCC and CMSIS-DSP implementations.
slug: qfplib-m0-full-floating-point-library
codeUrl: https://github.com/mysterywolf/Qfplib-M0-full
siteUrl: http://www.quinapalus.com/qfplib.html
star: 16
version: v1.0.0
lastUpdated: '2021-05-26'
rtos: rt-thread
topics:
- assembly
- cortex-m0
- floating-point
- rt-thread
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- qfplib-m3-floating-point-library
- qfplib-m0-tiny
- rt-memcpy-cortex-m-assembly-accelerated-version
- rt-thread-full-featured-vsnprintf-package
- rtt-math-mathematics-library-for-rt-thread
- stm32-prototyping-libraries
---

## High-Performance Floating-Point for Cortex-M0

Qfplib-M0-full is a specialized library of IEEE 754 single- and double-precision floating-point arithmetic routines designed specifically for microcontrollers based on the ARM Cortex-M0 core (ARMv6-M architecture). While it can run on Cortex-M3 and Cortex-M4 devices, its primary value lies in providing high-speed mathematical operations for lower-power M0 cores that lack hardware floating-point units (FPUs).

The library is remarkably compact, occupying less than 6 kbyte of program memory, yet it delivers performance that often exceeds standard GCC libraries and even some commercial alternatives. One of its most striking benchmarks is that its double-precision implementation is frequently faster than the standard GCC single-precision implementation on the same hardware.

## Core Capabilities and Accuracy

Qfplib-M0-full provides a comprehensive suite of mathematical functions, including:
- **Basic Arithmetic**: Correctly rounded addition, subtraction, multiplication, division, and square root.
- **Trigonometric Functions**: Sine, cosine, tangent, and arctangent (atan2).
- **Transcendental Functions**: Logarithm (ln) and exponential (exp) functions.
- **Conversions**: A massive array of functions to convert between floating-point (float/double) and signed/unsigned integers or fixed-point values (32-bit and 64-bit).

The library prioritizes accuracy, offering correctly rounded results (to nearest, even-on-tie) for basic operations. Scientific functions generally maintain accuracy to within approximately 1 unit in last place (ulp). To maintain its high speed and small footprint, the library does make some trade-offs: on input and output, NaNs are converted to infinities and denormals are flushed to zero.

## Optimized for Embedded Constraints

Designed with the strict constraints of embedded systems in mind, Qfplib-M0-full does not use any static storage. This makes it inherently re-entrant and suitable for multi-threaded environments. Furthermore, stack usage is kept to a minimum and is statically analyzable, as the library avoids recursion entirely. 

For developers using the RT-Thread RTOS, this repository provides a ready-to-use package. It includes an `SConscript` build configuration that automatically selects the appropriate assembly source files based on the compiler being used (GCC, ARMCC/Keil, or IAR).

## Performance Comparison

The performance gains are significant for developers moving away from standard toolchain libraries. For example, a single-precision addition (`qfp_fadd`) takes approximately 76 cycles compared to 102 cycles in the GCC library. The gap widens significantly with complex functions; the single-precision cosine (`qfp_fcos`) executes in roughly 595 cycles, whereas the GCC equivalent can take upwards of 3,350 cycles.

## Integration and Usage

Integrating the library into an RT-Thread project is handled through the online package manager under the acceleration category. Once included, developers can access the API by including `qfplib-m0-full.h`. The functions follow a consistent naming convention, such as `qfp_fadd` for float addition and `qfp_dadd` for double addition.

```c
#include "qfplib-m0-full.h"

void math_example(void) {
    float x = 1.23f;
    float y = 4.56f;
    float result_add = qfp_fadd(x, y);
    float result_cos = qfp_fcos(x);
    
    double dx = 1.23456789;
    double dy = qfp_dexp(dx);
}
```

By providing a highly optimized assembly implementation of the IEEE 754 standard, Qfplib-M0-full enables sophisticated signal processing and mathematical modeling on the most resource-constrained ARM processors.
