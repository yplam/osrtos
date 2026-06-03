---
title: rt_memcpy Cortex-M Assembly Accelerated Version
summary: An assembly-optimized implementation of the rt_memcpy function specifically
  designed for ARM Cortex-M3, M4, and M7 processors. It leverages LDMIA and STMIA
  instructions to significantly accelerate memory copy operations while maintaining
  support for non-aligned memory addresses.
slug: rt-memcpy-cortex-m-assembly-accelerated-version
codeUrl: https://github.com/mysterywolf/rt_memcpy_cm
star: 12
lastUpdated: '2022-06-09'
rtos: rt-thread
topics:
- assembly-language
- cortex-m
- memcpy
- rt-memcpy-cortex
- rt-thread
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- qfplib-m0-full-floating-point-library
- qfplib-m3-floating-point-library
- lvgl-port-for-arm-cortex-m55-and-mps3-an547
- fatfs-tiva-cm4f-port
- i-mx-rt-cpu-support-package-for-crossworks
- qfplib-m0-tiny
---

## Overview

The `rt_memcpy_cm` package provides a high-performance, assembly-optimized version of the `rt_memcpy` function for the RT-Thread RTOS. Specifically targeting ARM Cortex-M3, M4, and M7 architectures, this implementation focuses on maximizing throughput during memory copy operations. 

While C-based memory copy functions are generally efficient, they often cannot fully utilize architecture-specific instructions that provide massive parallel data movement. This project bridges that gap by providing hand-optimized assembly routines that have been battle-tested for over a decade in industrial environments.

## The Power of ARM Assembly

The primary performance gain in this version does not come from the general overhead reduction of assembly, but rather from the strategic use of the ARM `LDMIA` (Load Multiple Increment After) and `STMIA` (Store Multiple Increment After) instructions. 

In a single instruction cycle, these commands can read or write up to 10 registers (40 bytes) of data. By unrolling loops and utilizing these multi-register transfers, the copy process is significantly faster than standard byte-by-byte or word-by-word C implementations. 

### Key Features
- **Architecture Support**: Optimized for Cortex-M3, Cortex-M4, and Cortex-M7.
- **Toolchain Compatibility**: Includes dedicated assembly files for GCC, Keil MDK (RVDS), and IAR compilers.
- **Alignment Handling**: The internal logic automatically detects and handles cases where memory addresses are not 4-byte aligned, ensuring data integrity without sacrificing the speed of aligned transfers when available.
- **Proven Reliability**: The core logic is derived from Silicon Labs (formerly Micrium/uCOS) code, which has been utilized in production systems for over ten years.

## Performance Benchmarks

In testing conducted within a Keil environment, copying 10,000 bytes 10,000 times yielded the following results:

- **Standard rt_memcpy**: 1261ms
- **C Library memcpy**: 906ms
- **rt_memcpy_cm (This version)**: 883ms

These results demonstrate that the assembly-optimized version outperforms even the highly optimized standard C libraries provided by major compiler vendors.

## Integration with RT-Thread

This project is designed as an RT-Thread online package, making it easy to integrate into existing projects via the RT-Thread package manager. It can be found under the following path in `menuconfig`:

```text
RT-Thread online packages  --->
    system packages  --->
        enhanced kernel services --->
            [*] rt_memcpy_cm: Cortex-M kernel assembly accelerated version of rt_memcpy function
```

Once enabled, the build system (via the provided `SConscript`) automatically selects the correct assembly file (`rt_memcpy_gcc.S`, `rt_memcpy_iar.S`, or `rt_memcpy_rvds.S`) based on the active compiler platform.
