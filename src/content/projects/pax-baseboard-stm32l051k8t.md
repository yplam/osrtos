---
title: PAx BaseBoard STM32L051K8T
summary: A hardware development platform for the STM32L051K8T microcontroller, featuring
  integrated RFM69HW wireless communication and external flash storage. The project
  includes PlatformIO configuration files and example code for Arduino, CMSIS, LibOpenCM3,
  and STM32Cube frameworks.
slug: pax-baseboard-stm32l051k8t
codeUrl: https://github.com/CalinRadoni/pax-BB5
siteUrl: https://calinradoni.github.io/pax-BB5/
star: 2
version: v1.1.0
lastUpdated: '2024-08-29'
rtos: cmsis
topics:
- arduino
- cmsis
- libopencm3
- platformio
- rfm69hw
- stm32cube
- stm32l0
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32-libopencm3-freertos-platformio-template
- super-mini-esp32-c3-arduino-and-platformio-sketches
- stm32l475-freertos-iot-project
- micro-ros-stm32-template
- stm32f103rb-templates-and-examples
- xiao-esp32c6-sketches
---

## Overview

The PAx BaseBoard STM32L051K8T is a specialized hardware platform designed for embedded development and wireless communication. Originally created in 2017 as part of the PAx5 project, this repository provides updated compatibility files for the PlatformIO ecosystem. It serves as a versatile foundation for developers who want to work with the STM32L0 series using their preferred software framework.

## Hardware Architecture

The board is built around the STM32L051K8T, an ultra-low-power ARM Cortex-M0+ microcontroller. To support a wide range of IoT and data-logging applications, the board integrates several key components:

- **Wireless Communication**: An RFM69HW transceiver module operating at 868MHz, suitable for long-range, low-power radio links.
- **External Storage**: A M25P10 128kB Flash memory chip for non-volatile data storage or firmware updates.
- **User Interface**: Includes an on-board LED for status indication and a dedicated switch port for user input.

The hardware design was developed using KiCad EDA, and the repository includes links to full schematics and PCB layouts.

## Multi-Framework Support

One of the primary features of this project is its flexibility regarding software development. Through a carefully structured `platformio.ini` configuration, the board supports four distinct development frameworks:

1. **Arduino**: Allows for rapid prototyping using the familiar Arduino API.
2. **CMSIS**: Provides a vendor-independent hardware abstraction layer for the Cortex-M processor series.
3. **LibOpenCM3**: An open-source ARM Cortex-M microcontroller library.
4. **STM32Cube**: The official hardware abstraction layer and low-layer APIs from STMicroelectronics.

The `src` directory contains "blink" test code for each of these frameworks, allowing users to verify their toolchain and hardware functionality immediately after setup.

## Development Environment

The project is optimized for modern embedded workflows. It utilizes PlatformIO Core (version 5.1.1 or later) as the primary build system, typically used within Visual Studio Code. This setup simplifies dependency management and provides a unified interface for compiling and uploading code to the STM32 target.

## Licensing and Documentation

The project follows a multi-license model to accommodate different components. The software and general documentation are released under the GNU GPLv3 license, while the hardware schematics are licensed under Creative Commons Attribution-ShareAlike 4.0. Specific code related to the Arduino Variant is released under the BSD 3-Clause license, reflecting its origins and contributions from STMicroelectronics.
