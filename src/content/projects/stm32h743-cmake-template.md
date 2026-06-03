---
title: STM32H743 CMake Template
summary: A development template for STM32H743 microcontrollers using CMake, CLion,
  and STM32CubeMX. It integrates FreeRTOS with CMSIS V2, LVGL for graphics, and FatFs
  for file system management on SD cards via SDMMC.
slug: stm32h743-cmake-template
codeUrl: https://github.com/Mythologyli/STM32H743-CMake-Template
star: 17
lastUpdated: '2022-07-28'
rtos: freertos
libraries:
- lvgl
topics:
- fatfs
- freertos
- ili9341
- lvgl
- stm32
- stm32h743vit6
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32-fatfs-and-freertos-integration
- practice-project-for-stm32f746g-discovery
- stm32-fatfs-on-sd-card-using-freertos
- stm32f407vg-freertos-fatfs-sdio-sd-card-demo
- stm32f107-makefile-freertos-template
- stm32-base-project-template
---

## Overview

The STM32H743 CMake Template is a professional-grade boilerplate designed for developers working with the high-performance STM32H7 series microcontrollers. By moving away from the traditional STM32CubeIDE or Keil MDK environments, this template leverages the power of CMake and CLion to provide a modern, cross-platform development experience. It comes pre-configured with a robust middleware stack, including an RTOS, graphics library, and file system support.

## Technical Architecture

The project is built around the STM32H743VIT6, an ARM Cortex-M7 core capable of running at 400MHz. To harness this power, the template enables both Instruction and Data caches (I-Cache/D-Cache) and configures the Memory Protection Unit (MPU) via the included STM32CubeMX configuration file. 

### Core Components

- **RTOS Integration**: The template uses FreeRTOS with the CMSIS V2 abstraction layer. The task configuration includes dedicated threads for the main application logic and the LVGL timer handler, ensuring smooth UI performance and responsive system behavior.
- **Graphics Stack**: LVGL (Light and Versatile Graphics Library) is integrated to drive an ILI9341 display over SPI2. This allows for the creation of complex, high-resolution user interfaces on embedded hardware.
- **Storage & File System**: FatFs is configured to work with the SDMMC1 peripheral, enabling standard file operations on SD cards. This is essential for data logging or loading assets for the GUI.
- **Connectivity**: A serial console is provided via USART2, featuring printf redirection for easier debugging. Additionally, the template includes USB Device support configured as a Communication Device Class (CDC) for virtual COM port functionality.

## Build System and Workflow

The use of CMake allows for a highly flexible build process. The `CMakeLists.txt` file is structured to handle cross-compilation using the `arm-none-eabi-gcc` toolchain. It automatically manages include directories for the HAL drivers, CMSIS, FreeRTOS, and third-party libraries.

Key build features include:
- **Optimization Profiles**: Support for Release (Ofast), Debug (Og), and MinSizeRel (Os) builds.
- **Hardware Floating Point**: Pre-configured for hardware FPU support (`-mfloat-abi=hard -mfpu=fpv4-sp-d16`).
- **Memory Management**: A custom linker script (`STM32H743VITX_FLASH.ld`) defines the memory layout, specifically allocating sections for DTCMRAM, ITCMRAM, and the various D1/D2/D3 RAM domains characteristic of the H7 architecture.

## Getting Started

To use this template, developers typically open the project in CLion, which recognizes the `CMakeLists.txt` file. Hardware configuration changes can be made through the `STM32H743-CMake-Template.ioc` file using STM32CubeMX, and the resulting code can be re-integrated into the CMake structure. The project structure separates application logic into the `Applications` directory, while keeping hardware-specific drivers and middleware in their respective folders, promoting a clean separation of concerns.
