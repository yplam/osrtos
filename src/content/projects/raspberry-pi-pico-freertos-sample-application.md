---
title: Raspberry Pi Pico FreeRTOS Sample Application
summary: A sample project demonstrating the integration of FreeRTOS with the Raspberry
  Pi Pico SDK for RP2040 microcontrollers. It features hardware-specific enhancements
  like RP2040 divider context saving and includes multi-tasking examples for LED control
  and hardware validation.
slug: raspberry-pi-pico-freertos-sample-application
codeUrl: https://github.com/yunkya2/pico-freertos-sample
star: 39
lastUpdated: '2021-02-05'
rtos: freertos
topics:
- freertos
- raspberrypipico
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rp2040-freertos-template
- pico-zephyr-project
- lpc43xx-freertos-led-blinking-example
- stm32-fatfs-and-freertos-integration
- wiznet-freertos-sdk-for-raspberry-pi-pico-ethernet
- pico-rtic-template
---

## Overview

The Raspberry Pi Pico Sample application provides a practical starting point for developers looking to run FreeRTOS on the RP2040 microcontroller. While the Raspberry Pi Pico SDK provides its own synchronization primitives, many developers prefer the industry-standard FreeRTOS for complex multi-tasking applications. This repository bridges that gap by providing a pre-configured environment and specific enhancements for the RP2040 architecture.

## Technical Enhancements for RP2040

A significant feature of this sample project is the inclusion of support for the RP2040 hardware divider context save. The RP2040 contains a dedicated hardware divider that is not part of the standard ARM Cortex-M0+ core. In a multi-tasking environment, if one task is interrupted while using the divider and another task starts using it, the state can be corrupted. This project includes the necessary kernel modifications to ensure the divider state is correctly saved and restored during task context switches, ensuring mathematical integrity across threads.

## Included Sample Applications

The repository contains two primary demonstration programs that showcase different aspects of the RTOS integration:

### Multi-Tasking LED Blink (blink)
This application demonstrates the core strength of FreeRTOS: managing multiple independent tasks. It controls three separate LEDs connected to GPIO pins 13, 14, and 15. Each LED is managed by its own dedicated FreeRTOS task, allowing them to blink at different rates or patterns without complex state machine logic in a single loop. This serves as a fundamental example of task creation and scheduling.

### Divider Check (divcheck)
This utility program is designed to validate the hardware divider context saving mentioned earlier. It performs intensive division operations across multiple tasks to ensure that the RTOS is correctly preserving the state of the hardware registers, preventing calculation errors that would otherwise occur in a standard RTOS port that is unaware of the RP2040's custom hardware blocks.

## Development Environment

The project is built using the standard Raspberry Pi Pico SDK environment. It utilizes a CMake-based build system, making it compatible with the official Pico development workflow. The project structure includes the FreeRTOS kernel as a component, allowing for a seamless build process where the kernel and the application code are compiled together into a single UF2 binary for the Pico.

To get started, developers need the Pico SDK installed and configured. The build process follows the standard CMake pattern:

```bash
$ mkdir build
$ cd build
$ cmake ..
$ make
```

This will generate the executable files for both the blink and divcheck samples, which can then be loaded onto the Raspberry Pi Pico hardware.
