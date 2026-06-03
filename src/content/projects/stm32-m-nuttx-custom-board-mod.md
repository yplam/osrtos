---
title: STM32 M NuttX Custom Board Mod
summary: A custom board support package and driver collection for the NuttX RTOS targeting
  STM32 microcontrollers. It includes specialized drivers for HRTIM, SPI, ADC, and
  memory, along with necessary middleware modifications for hardware interrupt functionality.
slug: stm32-m-nuttx-custom-board-mod
codeUrl: https://github.com/MHageH/stm32_m
star: 1
lastUpdated: '2018-03-27'
rtos: nuttx
topics:
- drivers
- hrtim
- hrtim-driver
- low-level
- microcontrollers
- nuttx
- skeleton
- stm32
- stm32f3-discovery
- stm32f334
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- nuttx-rtos-experiments
- stm32-cmsis-libraries
- stm32l475-pandora-board-bsp-for-rt-thread
- stm32-framework
- rt-thread-bsp-for-stm32f407vet6
- stm32f103-cmsis-peripheral-configuration
---

## Overview

The `stm32_m` project provides a foundational skeleton for integrating custom hardware boards into the NuttX RTOS ecosystem. Specifically targeting STM32 microcontrollers, this repository serves as a practical reference for developers looking to extend NuttX with specialized peripheral support and custom board configurations.

At its core, the project focuses on implementing and refining drivers for several key STM32 peripherals. One of the most significant contributions is the inclusion of a High-Resolution Timer (HRTIM) control driver. Unlike standard timer implementations, this project includes specific modifications to the NuttX middleware to enable hardware interrupt functionality within the HRTIM driver, which is crucial for high-precision timing applications.

## Key Features and Drivers

Beyond the HRTIM, the repository includes several other driver implementations that serve as both functional code and architectural templates:

- **HRTIM Control Driver**: Features custom middleware modifications to ensure hardware interrupt functionality works correctly within the NuttX environment.
- **SPI Control Driver**: Provides the necessary interface for Serial Peripheral Interface communication, essential for connecting various sensors and peripherals.
- **ADC Initial Control Driver**: Sets up basic Analog-to-Digital conversion capabilities for sampling analog signals.
- **Memory Initial Driver**: Handles early-stage memory configuration and management.
- **Dummy Driver**: Serves as a conceptual template for developers to create their own custom drivers within the NuttX framework.

## Technical Implementation

The project structure is divided into two main areas. The `nuttx_modifications` directory contains the specific patches and changes required for the NuttX middleware to support the enhanced HRTIM features. This is particularly useful for developers who find that the upstream RTOS drivers require fine-tuning for specific hardware interrupt behaviors.

Additionally, the inclusion of the `stm32_stroboscopic` directory suggests a specific application use case, likely leveraging the high-speed timing capabilities of the STM32 for stroboscopic control or similar time-sensitive tasks. This demonstrates the practical application of the HRTIM driver in a real-world scenario.

## Getting Started

For developers working with NuttX on STM32, this repository offers a valuable starting point for board-level customization. It demonstrates how to bridge the gap between standard RTOS middleware and specific hardware requirements. By examining the modifications provided, users can learn how to integrate their own custom drivers and modify existing middleware to suit specialized hardware needs. The project effectively acts as a BSP (Board Support Package) skeleton that can be adapted for various STM32-based custom designs.
