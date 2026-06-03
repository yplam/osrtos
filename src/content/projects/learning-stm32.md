---
title: Learning STM32
summary: A comprehensive tutorial and example repository for developers transitioning
  from Arduino to STM32 ARM programming. It covers bare-metal development using GCC,
  Make, and GDB, featuring examples for the STM32F103C8T6 'Blue Pill' board with support
  for libopencm3, CMSIS, and FreeRTOS.
slug: learning-stm32
codeUrl: https://github.com/amamory-embedded/learning-stm32
star: 8
lastUpdated: '2020-03-03'
rtos: freertos
topics:
- cmsis
- cortex-m3
- embedded
- freertos
- libopencm3
- stm32duino
- stm32f1
- stm32f103
- stm32f103c8t6
- tutorial
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- h-c-l-p-tr-nh-stm32f1
- stm32-cmsis-zero-to-hero
- stm32-starter-project-for-arch-max
- bare-metal-programming-guide
- stm32-cortex-m4-code-examples
- dallas-formula-racing-embedded-onboarding
---

## Overview

The Learning STM32 project serves as a bridge for developers looking to move beyond the Arduino ecosystem into the world of professional ARM microcontroller programming. Specifically targeting the popular and affordable STM32F103C8T6, commonly known as the "Blue Pill," this repository provides a structured path to understanding low-level embedded systems without the heavy abstraction layers of the Arduino IDE.

## Why STM32?

For many developers, the Arduino Nano or Uno eventually becomes a bottleneck due to limited SRAM, flash memory, and clock speed. The STM32 family offers a significant upgrade, providing 72 MHz frequencies, 64 KB of Flash, and 20 KB of SRAM in a similarly small form factor. Perhaps more importantly, it introduces developers to professional debugging tools like GDB, which are far more powerful than simple serial print statements.

## A Command-Line First Approach

Unlike many tutorials that rely on proprietary or heavy GUI-based IDEs like Keil or Eclipse, this project emphasizes a Free and Open Source Software (FOSS) workflow. By utilizing GCC, Make, and CMake, developers gain full control over their build environment. This approach ensures long-term stability and allows for the automation of compilation, execution, and debugging processes through a single command line. The project includes modular makefiles that are simple to configure and well-documented.

## Software Foundations: Libraries and RTOS

Navigating the STM32 software ecosystem can be daunting for beginners. This project helps clarify the choices between various Hardware Abstraction Layers (HAL) and middleware. It explores several paths:

- **CMSIS**: The vendor-independent hardware abstraction layer for the Cortex-M processor series.
- **libopencm3**: A popular open-source library for various ARM Cortex-M microcontrollers.
- **FreeRTOS**: A leading real-time operating system for embedded devices, enabling multi-tasking and complex application logic.
- **Standard Peripheral Libraries (SPL)**: The legacy but still widely used libraries from STMicroelectronics.

## Hardware and Debugging

The tutorial assumes the use of an ST-Link programmer, which is essential for hardware-level debugging. By integrating GDB into the workflow, users can set breakpoints, inspect memory, and step through code in real-time. This provides a much deeper understanding of how the firmware interacts with the hardware compared to the "guess-and-check" method of serial logging.

## Practical Examples

The repository includes several "blinking LED" variations to demonstrate different programming styles—from bare-metal register manipulation to using high-level libraries and RTOS tasks. It also lays the groundwork for more advanced topics such as serial communication, timers, and eventually, more complex integrations like MQTT and Machine Learning on the edge.

## Future Directions

The project is an evolving resource, with planned expansions into other Real-Time Operating Systems like Zephyr and RIOT-OS, as well as modern build systems like Meson and PlatformIO. It also touches on advanced concepts like hypervisors for Cortex-M and stack memory analysis, making it a valuable reference for both beginners and intermediate embedded developers looking to sharpen their low-level programming skills.
