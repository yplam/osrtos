---
title: RT-Thread Full-Featured vsnprintf Package
summary: A comprehensive implementation of the rt_vsnprintf function for the RT-Thread
  RTOS, enabling support for floating-point printing and other standard C features.
  It serves as a drop-in replacement for the minimal kernel version to provide full
  printf-family functionality with a significantly smaller ROM footprint than the
  standard C library.
slug: rt-thread-full-featured-vsnprintf-package
codeUrl: https://github.com/mysterywolf/rt_vsnprintf_full
star: 18
version: v1.0.0
lastUpdated: '2024-09-28'
rtos: rt-thread
topics:
- printf
- rt-thread
- snprintf
- vsnprintf
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- thread-safe-rt-kprintf-for-rt-thread
- arduino-rt-thread-library
- qfplib-m0-full-floating-point-library
- freertos-wrapper-for-rt-thread
- rt-u8g2-u8g2-graphics-library-for-rt-thread
- c-common-for-rt-thread
---

## Overview

In the RT-Thread RTOS, the default implementations of the `rt_kprintf` family (including `rt_sprintf`, `rt_snprintf`, and `rt_vsnprintf`) found in `kservice.c` are intentionally kept minimal. This design choice ensures the kernel remains self-sufficient without depending on a standard C library while keeping the ROM footprint as small as possible. However, this minimalism often means that advanced features—most notably floating-point data printing—are not supported out of the box.

The `rt_vsnprintf_full` package addresses this limitation by providing a fully functional version of these functions. Based on the well-regarded open-source [printf](https://github.com/eyalroz/printf) project, this package allows developers to enjoy the full capabilities of the standard C `printf` family within the RT-Thread ecosystem.

## Key Features

- **Full Feature Support**: Enables printing of floating-point numbers and other standard format specifiers often missing in embedded kernel implementations.
- **Low ROM Overhead**: Despite its full feature set, the package occupies only about 8.6KB under GCC and 8KB under Keil. This is significantly smaller than enabling the full standard C library (libc) for the same purpose.
- **Seamless Integration**: For RT-Thread versions 4.1.0 and above, the package can automatically take over `printf`, `sprintf`, and `snprintf` calls, even if `RT_USING_LIBC` is not enabled.
- **Kernel Compatibility**: It re-implements the core `rt_vsnprintf` function, which is the foundation for the entire `rt_kprintf` family in RT-Thread.

## Technical Implementation

The package works by providing a new implementation of `rt_vsnprintf` that wraps the underlying high-performance printf engine. It includes configuration logic via `SConscript` to allow users to decide whether the package should "hijack" standard C function names. 

For developers using RT-Thread 4.1.0 or later, installation is plug-and-play. For those on older versions, a simple manual step of commenting out the existing `rt_vsnprintf` in the kernel's `kservice.c` is required to avoid symbol conflicts.

## Usage and Configuration

Once installed, the package can be configured through three main macro switches that determine if it should take over standard functions:
- `RT_VSNPRINTF_FULL_REPLACING_PRINTF`
- `RT_VSNPRINTF_FULL_REPLACING_SPRINTF`
- `RT_VSNPRINTF_FULL_REPLACING_SNPRINTF`

With these enabled, standard code like the following will work as expected, including support for floats:

```c
#include <stdio.h>

void example(void)
{
    float value = 3.14159f;
    printf("The value of pi is approximately: %f\n", value);
}
```

This makes it an ideal solution for developers who need robust logging and string formatting capabilities in resource-constrained environments where a full libc is too heavy, but the basic kernel services are too limited.
