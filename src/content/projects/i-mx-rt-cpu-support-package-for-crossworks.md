---
title: i.MX RT CPU Support Package for Crossworks
summary: A specialized support package for the NXP i.MX RT crossover microcontroller
  family, designed for the Rowley Crossworks development environment. It provides
  CMSIS-compliant code, memory maps, register descriptions, and a versatile flash
  loader for external memory interfaces.
slug: i-mx-rt-cpu-support-package-for-crossworks
codeUrl: https://github.com/Masmiseim36/iMXRT
siteUrl: https://www.rowleydownload.co.uk/arm/packages/iMXRT.htm
star: 5
version: Rowley_4.6
lastUpdated: '2025-08-14'
rtos: cmsis
topics:
- cmsis
- cortex-m
- cortex-m7
- cpu-support
- crossworks
- imxrt
- imxrt1010
- imxrt1015
- imxrt1020
- imxrt1050
- imxrt1060
- imxrt1064
- imxrt1160
- imxrt1170
- loader
- nxp
- register-descriptions
- rowley
- rowley-crossworks
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- nxp-i-mx-rt-development-platform
- development-utils
- mbed-os-6-port-for-weact-stm32h743vit6
- microchip-cmsis-modules-for-arduino
- stm32cubeh7rs-mcu-firmware-package
- x-cube-azrtos-g4-azure-rtos-software-expansion-for-stm32cube
---

## Overview

The i.MX RT CPU Support Package is a comprehensive development enablement tool for NXP's i.MX RT crossover microcontroller family. Specifically tailored for the Rowley Crossworks development environment, this package bridges the gap between the IDE and the unique architecture of the i.MX RT series. Because these controllers are flashless, they require specific handling for code execution and debugging, which this package provides through a combination of CMSIS-specific code, memory mapping, and specialized loaders.

This project is an enhancement of the original Rowley i.MX RT package, updated to include the latest register descriptions from NXP and expanded support for newer silicon such as the iMXRT600 and iMXRT1180 series.

## Key Components and Features

The package includes several critical elements required for professional embedded development:

- **CMSIS-Specific Code**: Provides the standard hardware abstraction layer required for ARM Cortex-M development, ensuring compatibility with a wide range of middleware.
- **Memory Map Files**: Defines the internal and external memory boundaries for the various i.MX RT variants, essential for correct linker behavior.
- **Register Descriptions**: Detailed XML files that enable the Crossworks debugger to display peripheral registers in a human-readable format during active debugging sessions.
- **SDRAM Debugging**: Unlike many standard packages, this version enables debugging directly in external SDRAM memory, which is vital for large applications that exceed internal RAM limits.

## The Flash Loader Architecture

One of the most significant challenges with the i.MX RT family is its flashless nature. The MCU must boot from and execute code on external memory. This package includes a sophisticated Loader that is transmitted to the controller's internal RAM via JTAG/SWD. Once executed, the Loader initializes the external memory interface (FlexSPI) and writes the application code to the target flash.

The Loader is highly configurable and supports a variety of memory interfaces through a parameter-based system. Supported memory types include:

- Hyperflash
- OctaSPI (DDR and SDR)
- QuadSPI (DDR and SDR)
- Standard SPI

This flexibility allows developers to use a wide range of flash chips from manufacturers like Adesto, Cypress, Macronix, ISSI, and Winbond.

## Supported Hardware

The package supports a broad spectrum of the i.MX RT lineup, covering both the high-performance M7 cores and the newer M33-based crossover chips:

- **i.MX RT10xx Series**: Includes 1010, 1015, 1020, 1024, 1040, 1050, 1060, and 1064.
- **i.MX RT11xx Series**: Includes 1160, 1170, and 1180 (with current limitations on dual-core debugging).
- **i.MX RT600 Series**: Support for the high-end audio and voice-focused crossover MCUs.

## Integration and Usage

The package is provided in an unpacked format and must be compiled into a `.hzq` file using the Crossworks IDE before installation. Once built, it can be manually installed via the Crossworks Package Manager. This workflow allows developers to customize the loader or register descriptions for specific hardware designs before deploying the support package to their development team.
