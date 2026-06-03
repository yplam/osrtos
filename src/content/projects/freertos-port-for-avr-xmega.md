---
title: FreeRTOS Port for AVR XMEGA
summary: A specialized port of the FreeRTOS real-time operating system for Atmel/Microchip
  AVR XMEGA microcontrollers. It provides the necessary portable layer to handle XMEGA-specific
  hardware details, including support for devices with different program counter sizes.
slug: freertos-port-for-avr-xmega
codeUrl: https://github.com/yuriykulikov/FreeRTOS-on-XMEGA
star: 15
version: 2.0.1
lastUpdated: '2012-09-03'
rtos: freertos
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- arduino-freertos-library
- freertos-port-for-risc-v
- freertos-port-for-renesas-rh850
- seeed-arduino-freertos
- freertos-port-for-teensy-3-6-4-0-4-1
- freertos-port-for-raspberry-pi
---

## Overview

This project provides a dedicated port of FreeRTOS for the Atmel/Microchip AVR XMEGA family of microcontrollers. While FreeRTOS is highly portable, specific hardware architectures require custom implementation of the portable layer to handle context switching, stack initialization, and tick timers. This repository contains the necessary `port.c` and `portmacro.h` files to enable FreeRTOS on XMEGA devices.

## Technical Implementation

The primary challenge in porting FreeRTOS to the XMEGA architecture lies in the variation of the Program Counter (PC) size across different models. This port is designed to be compatible with the entire XMEGA range by addressing these differences:

- **16-bit Program Counter**: Used for devices with 128K of program memory or less.
- **24-bit Program Counter**: Used for larger XMEGA devices.

The logic for handling these differences is encapsulated within the `pxPortInitialiseStack()` function, ensuring that the task stack is correctly set up regardless of the specific MCU's memory capacity. Users may need to define the memory size for their specific device if the compiler does not provide it automatically.

## Configuration and Setup

To integrate this port into an XMEGA project, developers should focus on the `FreeRTOSconfig.h` file and the files located in the `RTOS/portable` directory. The core kernel files—such as `tasks.c`, `queue.c`, and `list.c`—are standard FreeRTOS components and should remain unmodified to maintain kernel integrity.

### Memory Management

When setting up the build environment, the project recommends specific memory management configurations. Specifically, users are advised to exclude `heap_2.c` and `heap_3.c` from the build process within the `RTOS/portable/memMang` directory, ensuring that the chosen heap implementation aligns with the project's requirements.

## Key Features

- **Universal XMEGA Support**: Designed to work across the XMEGA line with minimal configuration changes.
- **Standard FreeRTOS API**: Provides full access to FreeRTOS primitives including tasks, queues, semaphores, and mutexes.
- **Hardware-Specific Optimization**: Includes a tailored `port.c` that handles the XMEGA-specific context switching and interrupt nesting requirements.
