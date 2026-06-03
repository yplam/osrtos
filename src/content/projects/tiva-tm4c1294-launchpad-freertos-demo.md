---
title: Tiva TM4C1294 Launchpad FreeRTOS Demo
summary: A demonstration project for running FreeRTOS 10.2 on the Texas Instruments
  Tiva TM4C1294 Connected Launchpad. It provides a pre-configured Code Composer Studio
  environment including TivaWare driverlib and basic tasks for LED blinking and serial
  communication.
slug: tiva-tm4c1294-launchpad-freertos-demo
codeUrl: https://github.com/akobyl/TM4C129_FreeRTOS_Demo
star: 30
lastUpdated: '2019-08-14'
rtos: freertos
topics:
- embedded
- freertos
- tiva-c-series
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- lpc43xx-freertos-led-blinking-example
- stm32f103c8-freertos-cmsis-blink-example
- raspberry-pi-pico-freertos-sample-application
- freertos-mqtt-client-demo
- qemu-emulation-for-ti-lm3s6965-cortex-m3
- stm32-libopencm3-freertos-platformio-template
---

## Overview

The Tiva TM4C1294 Launchpad FreeRTOS Demo provides a foundational firmware package for developers working with the Texas Instruments TM4C1294 Connected Launchpad. While many platforms have official FreeRTOS ports, this project specifically addresses the lack of a ready-to-use FreeRTOS 10.2 template for Code Composer Studio (CCS) targeting this specific Tiva C Series microcontroller.

## Technical Architecture

The project is built around the ARM Cortex-M4F based TM4C1294NCPDT microcontroller. It integrates the FreeRTOS 10.2.1 kernel with the TI TivaWare driver library, providing a robust environment for real-time application development. The system is configured to run at a clock frequency of 120 MHz, utilizing the microcontroller's internal PLL.

Key configuration parameters defined in `FreeRTOSConfig.h` include:
- **Tick Rate**: 1000 Hz (1ms tick)
- **Heap Size**: 50,000 bytes
- **Scheduling**: Preemptive with support for mutexes and counting semaphores
- **Stack Management**: Configured for 200-word minimal stack size per task

## Core Functionality

The demo application implements two primary tasks that showcase basic RTOS operations and hardware interaction:

### LED Sequencing Task
The `demoLEDTask` manages the four user LEDs (D1 through D4) on the Launchpad. It demonstrates task-based timing using `vTaskDelay()`, cycling through the LEDs in sequence at one-second intervals. This serves as a visual heartbeat for the system.

### Serial Communication Task
The `demoSerialTask` initializes the UART interface connected to the Stellaris Virtual Serial Port. It outputs a "Hello, world" message every five seconds, demonstrating how to integrate standard I/O utilities with the RTOS scheduler. The task is configured for a baud rate of 57,600.

## Build and Development Environment

The project is tailored for Code Composer Studio (v9.1 or later). It includes several critical low-level components:
- **Linker Script (`tm4c1294ncpdt.cmd`)**: Defines the memory map for the 1MB Flash and 256KB SRAM.
- **Startup Code**: A specialized `tm4c1294ncpdt_startup_ccs.c` file that maps the FreeRTOS interrupt handlers (SVCall, PendSV, and SysTick) to the microcontroller's vector table.
- **AStyle Integration**: The project includes an optional Artistic Style configuration for automated code formatting during the build process.

## Getting Started

To use this demo, developers should import the project into Code Composer Studio. The repository includes all necessary TivaWare `driverlib` source files, making it a self-contained starting point. Upon successful compilation and flashing, the Launchpad will begin the LED sequence and start transmitting serial data over the debug USB connection. This template can be easily extended by adding new tasks to the `main.c` file and adjusting the `FreeRTOSConfig.h` to meet specific application requirements.
