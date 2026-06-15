---
title: STM32F1xx Bare Metal Template
summary: A lightweight Makefile-based template for STM32F1xx microcontrollers designed
  for bare-metal development. It utilizes CMSIS headers for direct register access,
  bypassing the STM32 HAL and standard peripheral libraries to provide a minimal and
  efficient starting point for ARM Cortex-M3 projects.
slug: stm32f1xx-bare-metal-template
codeUrl: https://github.com/stuianna/stm32f1xx_bare_template
star: 2
lastUpdated: '2019-10-16'
rtos: cmsis
topics:
- bare-metal
- bluepill
- cmsis
- stm32f103
- stm32f1xx
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- uglystm32
- minimal-mbed-os-template-for-stm32f103
- stm32f103-cmsis-libraries-and-projects
- minimal-mbed-os-template-for-stm32f030
- stm32-bare-metal-learning-labs
- stm32-makefile-freertos-project-template
---

## Overview

The STM32F1xx Bare Metal Template provides a streamlined starting point for developers who prefer direct register access over high-level abstraction layers like the STM32 HAL or Standard Peripheral Library. By focusing on a pure CMSIS-based approach, this template offers a minimal memory footprint and full control over the microcontroller's hardware peripherals.

Built around a robust Makefile system, the project is tailored for the GNU ARM Embedded Toolchain and uses OpenOCD for deployment and debugging. While the default configuration targets the popular STM32F103xB (found on many 'Blue Pill' boards), the architecture is designed to be easily adaptable to any microcontroller within the STM32F1xx family.

## Key Features

- **Minimalist Build System**: A clean Makefile that handles compilation, linking, and binary conversion without the overhead of complex IDE project files.
- **Direct Register Access**: Uses standard CMSIS headers for register definitions, ensuring code is efficient and transparent.
- **Open Source Toolchain**: Fully compatible with `gcc-arm-none-eabi` and `openocd`, making it suitable for development on Linux, macOS, or Windows (via WSL).
- **Memory Analysis**: Includes a built-in `make memory` target that identifies the top functions occupying flash space, aiding in optimization.
- **Arm Math Support**: Optional integration for the ARM CMSIS-DSP library is included, allowing for high-performance mathematical operations like PID controllers and FFTs.

## Technical Implementation

The project structure is organized into logical directories: `src` for application code, `inc` for headers, `lib` for CMSIS and startup files, and `util` for linker scripts. The build process generates both ELF and HEX files, with the Makefile providing specific recipes for flashing and erasing the target device via an ST-Link V2 probe.

### Makefile Recipes

The template includes several helpful targets to speed up development:

```bash
make            # Compiles the release version
make flash      # Deploys the binary using OpenOCD
make debug      # Compiles with -g3 flags for GDB sessions
make memory     # Prints the top 10 largest functions in the binary
make clean      # Wipes build artifacts
```

## Hardware Support and Adaptation

While configured for the STM32F103xB by default, the template can be migrated to other F1-series chips by updating three variables in the Makefile:

1.  **STARTUP**: Point to the correct assembly startup file (e.g., `startup_stm32f103xe.s`).
2.  **LDSCRIPT**: Select the appropriate linker script for the device's flash and RAM size.
3.  **DEFS**: Update the preprocessor definition (e.g., `-DSTM32F103xE`) to ensure the CMSIS headers enable the correct peripheral definitions.

## Getting Started

To use this template, clone the repository and place your application code in the `src` directory. The build system automatically finds all `.c` and `.cpp` files within the source and library directories, making it easy to add new modules without manually updating the Makefile for every file addition. For users requiring advanced math functions, enabling `USE_ARM_MATH` in the Makefile provides access to the optimized Cortex-M3 DSP instructions.
