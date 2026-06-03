---
title: LPC43XX FreeRTOS LED Blinking Example
summary: An example project demonstrating the use of FreeRTOS on the NXP LPC4337 Xplorer
  board. It features two concurrent LED blinking tasks and includes the necessary
  CMSIS driver libraries for the LPC43xx architecture.
slug: lpc43xx-freertos-led-blinking-example
codeUrl: https://github.com/Protoneer/LPC43XX-FreeRTOS-with-2xLED-Threads
star: 1
lastUpdated: '2013-10-27'
rtos: freertos
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- stm32f103c8-freertos-cmsis-blink-example
- tiva-tm4c1294-launchpad-freertos-demo
- raspberry-pi-pico-freertos-sample-application
- lpc1115-libraries-and-drivers
- stm32-libopencm3-freertos-platformio-template
- stm32-fatfs-and-freertos-integration
---

The LPC43XX-FreeRTOS-with-2xLED-Threads project serves as a practical implementation guide for running FreeRTOS on the NXP LPC4337 Xplorer board. Developed using the LPCExpresso IDE, this repository provides a complete workspace for developers looking to explore multi-threaded applications on the LPC43xx series of microcontrollers.

The core of the project demonstrates the fundamental RTOS concept of task concurrency. It implements two separate LED blinking threads that run simultaneously, managed by the FreeRTOS scheduler. This simple yet effective example illustrates how to initialize the RTOS kernel, create tasks, and manage hardware peripherals within a real-time environment.

## Hardware and Architecture

The project targets the NGX LPC4337 Xplorer board, which features a high-performance dual-core architecture (ARM Cortex-M4 and Cortex-M0). While the example focuses on standard RTOS operations, it includes essential driver libraries such as the CMSIS v2.10 Driver Library for LPC43xx and a USB VCOM library for the LPC4330. This ensures that the project is not just a bare-bones kernel test, but a functional starting point for more complex embedded development.

## Technical Implementation

The main application logic is contained within the `main.c` file located in the project's source directory. One of the significant hurdles addressed in this repository is the configuration of FreeRTOS for this specific hardware. The author notes that the `FreeRTOSConfig.h` and associated source files required specific modifications to link correctly with the LPC43xx libraries, particularly regarding the core-specific definitions.

The project currently utilizes FreeRTOS version 7.5.3. Due to the custom modifications made to the RTOS source files for compatibility, upgrading to newer versions of FreeRTOS would require careful porting of these changes to ensure the build system and hardware abstraction layers remain functional.

## Development Environment

This repository is structured as an LPCExpresso IDE workspace. It includes the necessary metadata and library projects (CMSIS and USB VCOM) required to compile the main application. This makes it a "turn-key" solution for users of the NXP-based IDE, providing a pre-configured environment where the complex task of setting up the RTOS and driver dependencies has already been handled.

For developers working with the LPC43xx family, this project offers a valuable reference for:
- Integrating FreeRTOS into an LPCExpresso project.
- Configuring the RTOS for the Cortex-M4 core of the LPC4337.
- Managing multiple tasks that interact with GPIO pins.
- Utilizing CMSIS-compliant driver libraries in a multi-threaded context.

By providing the actual workspace folder, the project lowers the barrier to entry for developers moving from bare-metal programming to real-time operating systems on NXP's dual-core microcontrollers.
