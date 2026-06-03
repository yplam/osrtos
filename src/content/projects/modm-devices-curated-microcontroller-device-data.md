---
title: 'modm-devices: Curated Microcontroller Device Data'
summary: A comprehensive repository of curated data for AVR, STM32, SAM, and NRF52
  microcontrollers. It provides tools to extract, patch, and reformat vendor-specific
  data into a unified format for generating Hardware Abstraction Layers (HAL) and
  startup code.
slug: modm-devices-curated-microcontroller-device-data
codeUrl: https://github.com/modm-io/modm-devices
siteUrl: http://blog.salkinium.com/modm-devices
star: 53
lastUpdated: '2025-12-23'
rtos: ''
libraries:
- modm
topics:
- avr
- cortex-m
- data
- microcontroller
- modm
- nrf
- sam
- stm32
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- cmsis-device-headers-for-stm32
- cmsis-for-stm32-development
- microchip-cmsis-modules-for-arduino
- cmsis-device-headers-for-microchip-sam
- cmsis-documentation
- stm32cube-cmsis-core
---

## Overview

modm-devices is a specialized repository dedicated to the curation and standardization of microcontroller device data. In the world of embedded systems, vendor-provided data—such as STMicroelectronics' CubeMX files or Microchip's Atmel Target Description Files—is often inconsistent, proprietary, or difficult to use across different toolchains. This project solves that problem by providing a Device File Generator (DFG) that extracts, filters, and reformats this raw data into a vendor-independent, tree-based format.

This data serves as the foundation for the [modm project](https://github.com/modm-io/modm), where it is used to automatically generate Hardware Abstraction Layers (HAL), startup code, linker scripts, and peripheral drivers. By centralizing this data, the project ensures that thousands of different microcontrollers can be supported with high-quality, reproducible code generation.

## Extensive Hardware Support

The repository currently tracks data for over 4,500 devices across several major silicon families. This includes:

- **STM32**: Comprehensive support for almost the entire ST portfolio, including F0, F1, F2, F3, F4, F7, G0, G4, H5, H7, L0, L1, L4, L5, U0, U3, U5, WB, and WL series.
- **AVR**: Support for classic ATmega, ATtiny, and AT90 microcontrollers.
- **SAM**: Support for Microchip (formerly Atmel) SAMD, SAME, SAMS, SAMV, and SAMG series.
- **NRF52**: Support for Nordic Semiconductor’s popular Bluetooth SoCs.
- **RP2040/RP2350**: Support for Raspberry Pi's silicon offerings.

## The Device File Generator (DFG)

At the heart of modm-devices is the DFG, a Python-based toolchain that automates the extraction of device capabilities. Because vendor data often contains bugs or omissions, the DFG applies a manual patch list to correct errors found in datasheets or vendor XML files. This ensures that the resulting data is more reliable than the raw sources it originated from.

The generator uses a variety of Python libraries, including `lxml` for parsing vendor XML, `jinja2` for templating, and `CppHeaderParser` for analyzing C headers. The workflow is designed to be reproducible; any fix for a specific device must be implemented as a patch or a rule within the DFG pipeline rather than a manual edit to the output files.

## Data Format and Philosophy

While many modern projects are moving toward Device Trees (DTS), modm-devices utilizes a custom tree-based "device file" format. This format was designed to allow lossless overlaying of data trees, which significantly reduces duplication. For example, common peripheral data for an entire STM32 family can be defined once and then inherited or specialized by specific part numbers.

For developers using the modm ecosystem, this data is typically converted into a Python dictionary tree, allowing the `lbuild` code generator to query device features—such as pin mappings, interrupt vectors, and memory layouts—during the build process.

## Getting Started with the Tools

For developers interested in generating their own device data or contributing to the database, the project provides a straightforward Makefile-based interface. After installing the necessary Python dependencies, users can generate data for specific families:

```sh
# Clone the repository
git clone https://github.com/modm-io/modm-devices.git
cd modm-devices/tools/generator

# Generate data for various families
make generate-stm32
make generate-sam
make generate-avr
```

By separating the device data from the HAL implementation, modm-devices provides a valuable resource for any embedded developer looking for a machine-readable, curated database of microcontroller specifications.
