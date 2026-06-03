---
title: Qfplib-M3 Floating-Point Library
summary: A high-performance IEEE 754 single-precision floating-point library optimized
  for ARM Cortex-M3 microcontrollers. It provides fast and accurate arithmetic routines,
  including trigonometric and logarithmic functions, with zero stack or static memory
  usage. Designed for integration with RT-Thread, it offers significant speed improvements
  over standard compiler libraries.
slug: qfplib-m3-floating-point-library
codeUrl: https://github.com/mysterywolf/Qfplib-M3
siteUrl: https://www.quinapalus.com/qfplib-m3.html
star: 10
version: v1.0.0
lastUpdated: '2021-05-26'
rtos: rt-thread
topics:
- arm-cortex-m3
- cortex-m3
- floating-point
- qfplib-m3
- rt-thread
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- qfplib-m0-full-floating-point-library
- qfplib-m0-tiny
- stm32-prototyping-libraries
- rt-memcpy-cortex-m-assembly-accelerated-version
- arm-cortex-m-hilbert-transform
- flexptp
---

## High-Performance Floating-Point Arithmetic for Cortex-M3

Qfplib-M3 is a specialized library of IEEE 754 single-precision floating-point arithmetic routines specifically designed for microcontrollers based on the ARM Cortex-M3 core (ARMv7-M architecture). While it is compatible with Cortex-M4 devices, its primary optimization focus is achieving maximum speed and accuracy on the M3, where hardware floating-point units (FPUs) are typically absent.

The library is a significant resource for embedded developers who need to perform complex mathematical operations without the overhead of standard C math libraries, which are often slower or less precise when implemented in software. Qfplib-M3 provides correctly rounded operations for addition, subtraction, multiplication, division, and square root, alongside highly accurate scientific functions like sine, cosine, tangent, logarithm, and exponential functions.

## Key Technical Features

One of the most impressive aspects of Qfplib-M3 is its efficiency in resource-constrained environments:

- **Zero Resource Footprint**: The library uses no stack and no static storage. This makes it exceptionally easy to integrate into systems with very limited RAM.
- **Thread-Safe and ROMable**: Because it maintains no state and uses no global variables, the code is fully thread-safe and can be executed directly from ROM.
- **Compact Code Size**: The entire suite of functions occupies less than 12 KB of program memory. When using modern linkers with garbage collection enabled, the footprint can be reduced further by only including the specific functions required by the application.
- **IEEE 754 Compliance**: Unlike many alternative software floating-point libraries, Qfplib-M3 correctly treats signed zeros, denormals, infinities, and NaNs. It supports the "round to nearest, even-on-tie" mode.

## Performance and Accuracy

Qfplib-M3 is engineered to outperform standard libraries provided by major toolchains like Keil and IAR. For example, a floating-point addition (`qfp_fadd`) typically takes approximately 37 cycles, compared to 60-90 cycles in other common libraries. The square root function (`qfp_fsqrt`) is particularly optimized, running in roughly 49 cycles, whereas some alternatives can take over 200 cycles.

In terms of accuracy, the scientific functions are designed to maintain results within 1 unit in last place (ulp) even in pathological cases, such as calculating the sine of a value near a multiple of π. This level of precision is often required in high-end signal processing or scientific instrumentation where cumulative errors must be minimized.

## Integration with RT-Thread

Qfplib-M3 is available as an online package for the RT-Thread RTOS. It includes an `SConscript` file that allows it to be easily compiled using various toolchains, including GCC, ARMCC (Keil), and IAR. 

To use the library in a C project, developers simply include the `qfplib-m3.h` header and call the functions using the `qfp_` prefix:

```c
#include "qfplib-m3.h"

float calculate_circle_area(float radius) {
    // Using qfp_fmul for optimized multiplication
    float r_squared = qfp_fmul(radius, radius);
    // 3.14159265f as a constant
    return qfp_fmul(3.14159265f, r_squared);
}

float get_signal_sine(float phase) {
    return qfp_fsin(phase);
}
```

## Testing and Reliability

The library has undergone rigorous testing against the standard GNU floating-point library on x86 processors. Binary functions have been tested against over a billion cases, including random and contrived exceptional values, ensuring that the results are bit-identical to standard implementations in almost all scenarios.
