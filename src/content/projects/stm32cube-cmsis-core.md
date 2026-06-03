---
title: STM32Cube CMSIS Core
summary: The STM32Cube CMSIS Core provides a standardized hardware abstraction layer
  for ARM Cortex-M and Cortex-A processors. It includes header files, startup code,
  and core access functions for peripheral control and processor initialization, specifically
  tailored for the STM32 microcontroller portfolio.
codeUrl: https://github.com/STMicroelectronics/cmsis_core
siteUrl: https://github.com/STMicroelectronics/cmsis-core
isShow: false
rtos: cmsis
libraries: []
topics:
- arm
- cmsis
- cmsis-core
- cortex
- cortex-m
- stm32
- stm32cube-mcu-component
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- cmsis-for-stm32-development
- cmsis-documentation
- stm32-prototyping-libraries
- cmsis-drivers-for-efm32-and-stm32
- cmsis-device-headers-for-stm32
- stm32f103-cmsis-peripheral-configuration
---

The **STM32Cube CMSIS Core** repository is a foundational component for any developer working within the STM32 ecosystem. It provides the essential interface between the ARM Cortex processor core and the software application, ensuring that developers have a standardized way to access processor features, manage interrupts, and initialize system hardware.

This repository is a carefully maintained subset of the official ARM CMSIS (Cortex Microcontroller Software Interface Standard) project. STMicroelectronics clones this repository directly from ARM Limited to ensure strict compatibility while integrating it into the broader STM32Cube MCU offer. By providing a consistent set of header files and startup code, it allows for maximized portability across the entire STM32 portfolio, from the entry-level Cortex-M0 to the high-performance Cortex-M85 and even Cortex-A cores.

## Core Components and Architecture

The project is organized to support a wide array of ARM architectures. The primary directories include:

- **Core/Include**: Contains the standard header files for Cortex-M processors (e.g., `core_cm4.h`, `core_cm7.h`, `core_cm33.h`). These files define the register structures for the Nested Vectored Interrupt Controller (NVIC), the System Control Block (SCB), and the SysTick timer.
- **Core_A/Include**: Introduced in version 5.1.0, this directory provides support for Cortex-A cores, enabling the use of CMSIS standards on more powerful application processors.
- **DSP & NN**: The repository includes source code and headers for Digital Signal Processing (DSP) and Neural Network (NN) functions. These libraries are optimized for ARM's SIMD and Helium (MVE) instructions, providing high-performance math and machine learning kernels.

## Integration with STM32Cube

STM32Cube is designed to simplify development through a modular software offer. The CMSIS Core acts as the lowest layer of this stack, sitting beneath the HAL (Hardware Abstraction Layer) and LL (Low-Layer) drivers. While the HAL provides high-level APIs for peripherals like UART or USB, the CMSIS Core provides the direct register definitions and intrinsic functions (like `__enable_irq()` or `__REV()`) that those drivers rely on.

For developers who need to optimize for code size, STMicroelectronics provides specific flavors of the CMSIS Core via Git tags. For example, a tag suffixed with `_cm3` refers to a version specifically optimized for Cortex-M3, where voluminous subdirectories like the precompiled DSP libraries for other cores are removed to save space.

## Getting Started

To use this library in a project, you typically include the device-specific header provided by the STM32 HAL, which in turn includes the relevant CMSIS Core headers. For example, including `stm32f4xx.h` will eventually pull in `core_cm4.h`.

If you are building using CMake, the repository includes `CMakeLists.txt` files for the DSP and NN components, allowing you to toggle specific features:

```cmake
# Example CMake options for CMSIS-DSP
option(BASICMATH     "Basic Math Functions"     ON)
option(FASTMATH      "Fast Math Functions"      ON)
option(FILTERING     "Filtering Functions"      ON)
option(NEON          "Neon acceleration"        OFF)
```

## Evolution and Compatibility

It is important to note that starting from version 5.8.0, ARM moved precompiled DSP libraries to a dedicated repository. Additionally, version 5.0 introduced a directory tree change where files moved from the root `/Include` to `/Core/Include`. To maintain backward compatibility for legacy STM32 projects, STMicroelectronics maintains a root-level `/Include` directory that mirrors the content of the modern structure. This attention to detail ensures that both new and existing firmware projects can leverage the latest processor features without breaking their build systems.
