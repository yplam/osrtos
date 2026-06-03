---
title: Smoothieware for STM32
summary: A port of the Smoothieware CNC firmware to the STM32 platform using the mbed-os
  framework. It provides high-performance G-code interpretation and motion control
  for 3D printers and CNC machines, specifically targeting the STM32F407 and LPC1768
  microcontrollers.
slug: smoothieware-for-stm32
codeUrl: https://github.com/YanMinge/Smoothieware_for_STM32
siteUrl: http://smoothieware.org/
star: 11
lastUpdated: '2019-03-20'
rtos: mbed-os
topics:
- 3d-printer
- cnc
- lasercut
- mbed-os
- smoothieware
- stm32-printer
- stm32f4
- stm32f407
- stm32f446
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- zephyr-grbl
- klipper-esp32
- bitcraze-crazyflie-2-0-2-1-mbed-os-firmware
- micro-ros-stm32-template
- adaspace3d
- stm32-prototyping-libraries
---

## Overview

Smoothieware for STM32 is a specialized port of the popular Smoothieware CNC firmware, designed to run on STM32 microcontrollers. Originally developed for the LPC1768 (ARM Cortex-M3), Smoothieware is a high-performance, object-oriented G-code interpreter and motion controller. This project leverages the modern mbed-os framework to isolate the core Smoothie logic from the underlying hardware, enabling support for the STM32F407 and simplifying the process of porting to other multi-chip platforms.

Smoothie is widely recognized in the maker community for its use in 3D printers, laser cutters, and CNC mills. It incorporates motion control algorithms ported from the grbl project, optimized for the increased processing power of 32-bit ARM architectures.

## Key Features

- **Multi-Platform Support**: By utilizing the latest mbed-os source code, the project provides a hardware abstraction layer that allows Smoothieware to run on various ARM-based microcontrollers beyond its original target.
- **STM32F407 Integration**: Includes specific support for the STM32F407, including USB serial device functionality and SDIO SD card support for standalone operation.
- **Advanced Motion Control**: Supports up to 6 axes (XYZ and ABC), with configurable junction deviation, acceleration, and feed rates. It is capable of handling complex CNC operations and multi-extruder 3D printing setups.
- **Modular Architecture**: The firmware is written in object-oriented C++, making it easier to extend or exclude specific modules (like network support or specific tool controllers) to save memory and processing cycles.
- **Extensible Configuration**: Uses a human-readable configuration file system, allowing users to define pin assignments, motor currents, and machine kinematics without recompiling the entire firmware.

## Technical Implementation

The project uses a Rake-based build system alongside traditional Makefiles. The integration with mbed-os allows the firmware to utilize standard RTOS features and drivers for networking, file systems, and peripheral communication. 

One of the significant technical achievements of this fork is the isolation of the Smoothie core. By decoupling the motion planner and G-code parser from the LPC1768-specific registers, the developers have made it possible to target the STM32's more powerful Cortex-M4 core. The build system supports different build types, including `Release`, `Debug`, and `Checked`, and can integrate the MRI (Monitor for Remote Inspection) for advanced GDB-based debugging.

## Hardware Support

While the original Smoothieware was synonymous with the LPC1768-based SmoothieBoard, this port expands the ecosystem to include:
- **STM32F407**: The primary target for this port, offering higher clock speeds and FPU support.
- **LPC1768**: Maintained compatibility for existing Smoothie hardware.
- **Custom Boards**: The modular nature of the mbed-os integration makes it a viable base for custom CNC controller boards based on supported ARM microcontrollers.

## Getting Started

To build the project, users typically clone the repository recursively to include the mbed-os submodule. The project provides installation scripts for Windows, Linux, and macOS to set up the `arm-none-eabi` compiler environment. Once the environment is configured, the firmware can be compiled using the provided `BuildShell` and `make` commands.

For those working with non-standard hardware, the project includes sample code within the `mbed/samples` directory to test basic peripheral functionality before deploying the full firmware. Configuration is handled through a `config.txt` file placed on the SD card, which the firmware reads at boot time to initialize the machine state.
