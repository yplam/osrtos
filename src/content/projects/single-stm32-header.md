---
title: Single STM32 Header
summary: A lightweight header library designed to simplify STM32 development by providing
  unified include files for CMSIS and HAL. It allows developers to switch between
  different STM32 series without modifying series-specific include directives in their
  codebase, leveraging modern C and C++ features for automatic header detection.
slug: single-stm32-header
codeUrl: https://github.com/IntergatedCircuits/stm32header
star: 0
lastUpdated: '2024-04-24'
rtos: cmsis
topics:
- cmsis
- stm32
- stm32-hal
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- cmsis-device-headers-for-stm32
- cmsis-for-stm32-development
- stm32-prototyping-libraries
- stm32f103-cmsis-libraries-and-projects
- uglystm32
- cmsis-device-headers-for-microchip-sam
---

## Overview

Developing for the STM32 ecosystem often involves managing a variety of series-specific headers. When moving a project from an STM32F1 to an STM32F4 or STM32L4, developers typically have to hunt through their codebase to update include directives like `#include "stm32f1xx.h"` or `#include "stm32f1xx_hal_rcc.h"`. 

The **Single STM32 Header** project solves this fragmentation by providing two unified entry points: `st/stm32cmsis.h` and `st/stm32hal.h`. By using these headers, the codebase remains agnostic of the specific STM32 series being targeted, making cross-platform development and hardware migrations significantly less painful.

## How It Works

The project leverages the `__has_include` feature introduced in C23 and C++17. This allows the preprocessor to check for the existence of specific vendor headers at compile-time. Instead of the developer manually specifying which series header to use, the wrapper headers automatically detect and include the appropriate files provided by the STM32 Cube firmware packages.

### Key Components

- **st/stm32cmsis.h**: A drop-in replacement for series-specific CMSIS headers (e.g., `stm32f4xx.h`). It provides access to register definitions and core peripheral interfaces.
- **st/stm32hal.h**: A replacement for the standard HAL headers. It simplifies the inclusion of the Hardware Abstraction Layer, provided the necessary module flags are defined.

## Technical Requirements

To use this library, your development environment must meet the following criteria:
- **Modern Compiler**: A compiler that supports `__has_include` (C23, C++17, or newer versions of GCC/Clang).
- **HAL Configuration**: If using the HAL header, you must define the required modules (e.g., `#define HAL_RCC_MODULE_ENABLED`) before including the header file.

## Benefits for Embedded Developers

This approach is particularly useful for middleware developers or teams maintaining a library that needs to support multiple STM32 chips. By abstracting the header inclusion logic, the source code remains cleaner and more portable. It eliminates the need for complex `#ifdef` blocks at the top of every file just to include the correct register definitions for a specific MCU target.
