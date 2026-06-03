---
title: ChibiOS/RT Examples for STM32F401RE Nucleo
summary: A comprehensive collection of example projects for ChibiOS/RT 21.11.x and
  the ChibiOS HAL, specifically tailored for the STM32F401RE Nucleo-64 board. It covers
  essential embedded peripherals including GPIO, ADC, PWM, and ICU, alongside core
  RTOS concepts like multithreading and shell integration.
slug: chibios-rt-examples-for-stm32f401re-nucleo
codeUrl: https://github.com/delloiaconos/nisc-examples
star: 6
version: nisc2020
lastUpdated: '2024-09-29'
rtos: chibios-rt
topics:
- c
- chibios
- chibios-hal
- chibios-nil
- chibios-rt
- embedded-c
- rtos
- stm32
- stm32f401re
- stm32nucleo
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32-cortex-m4-code-examples
- stm32f103rb-templates-and-examples
- rust-embedded-examples
- stm32f4-cmsis-lessons
- esp32-freertos-examples
- unipg-mbed-os-samples
---

## Overview

The nisc-examples repository provides a curated set of educational examples for ChibiOS/RT 21.11.x (Vettica) and the ChibiOS Hardware Abstraction Layer (HAL). Developed by Salvatore Dello Iacono for the NeaPolis Innovation Summer Campus, these examples serve as a practical guide for students and tutors to master embedded systems development on the STM32 platform.

The project is specifically optimized for the STM32F401RE-NUCLEO64 development board and is designed to be used with ChibiStudio, an Eclipse-based IDE tailored for ChibiOS development on Windows.

## Peripheral Integration

The repository is organized into several modules, each focusing on a specific peripheral or RTOS feature. This modular approach allows developers to learn how to interface with hardware step-by-step.

### GPIO and PAL

The GPIO examples demonstrate the use of the Peripheral Abstraction Layer (PAL). They range from basic LED toggling and reading user buttons to more advanced concepts like debouncing external buttons and using PAL Events with callbacks to measure time. These examples highlight how ChibiOS simplifies pin configuration and interrupt handling.

### Analog to Digital Conversion (ADC)

The ADC module covers various sampling techniques, including:
- Simple single-channel acquisitions within a thread.
- Asynchronous conversion calls.
- Timer-triggered conversions for precise sampling intervals.
- Displaying sampled data over a serial interface.

### Timers: PWM and ICU

For timing-related tasks, the project includes examples for the Pulse Width Modulation (PWM) driver and the Interrupt Capture Unit (ICU). These are essential for tasks like controlling motor speeds or measuring the frequency and duty cycle of external signals.

## Mastering ChibiOS Multithreading

One of the strongest aspects of this repository is its focus on RTOS primitives. The multithreading examples (THD series) guide the user through:
- **Parametric Threads**: Creating multiple thread instances using static or heap allocation.
- **Synchronization**: Using Mutexes to protect shared variables and prevent race conditions.
- **Thread Management**: Suspending and resuming threads dynamically.
- **Inter-thread Communication**: Implementing Producer/Consumer patterns using FIFOs.

## Interactive Shell

ChibiOS includes a powerful Shell engine that allows developers to interact with their embedded system via a serial terminal. The examples demonstrate how to create a static shell thread, define custom commands, and even use the shell as a menu system for the application.

## Getting Started

To use these examples, it is recommended to clone the repository directly into the ChibiStudio directory. Projects can then be imported into the workspace. Because the examples are built against the stable 21.11.x branch of ChibiOS, they provide a reliable foundation for both learning and starting new production-grade firmware projects on the STM32F401RE.
