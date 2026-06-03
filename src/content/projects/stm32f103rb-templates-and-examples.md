---
title: STM32F103RB Templates and Examples
summary: A collection of templates and example projects for the STM32F103RB microcontroller.
  It covers fundamental peripherals including GPIO, USART, SPI, CAN, and timers, as
  well as system clock configuration and FreeRTOS integration. The project is designed
  for use with the IAR Embedded Workbench and provides a modular foundation for building
  ARM Cortex-M3 applications.
slug: stm32f103rb-templates-and-examples
codeUrl: https://github.com/AVilezhaninov/STM32F103RB
star: 4
lastUpdated: '2019-10-15'
rtos: freertos
topics:
- cmsis
- ewarm
- freertos
- iar
- stm32
- stm32f103rb
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32-cortex-m4-code-examples
- stm32f103-cmsis-peripheral-configuration
- stm32-makefile-freertos-project-template
- chibios-rt-examples-for-stm32f401re-nucleo
- stm32-cmsis-zero-to-hero
- stm32f4-cmsis-lessons
---

The STM32F103RB repository serves as a practical starting point for developers working with the popular STMicroelectronics Cortex-M3 microcontroller. This collection provides a series of clean, modular templates and examples that cover the essential building blocks of embedded firmware development, from basic GPIO toggling to real-time operating system integration.

### Hardware and Development Environment
The projects are specifically tailored for the STM32F103RB MCU. For development, the repository utilizes the IAR Embedded Workbench for ARM (EWARM) version 8.20. This choice of IDE is common in professional industrial environments, making these templates particularly useful for engineers looking for stable, compiler-specific project structures.

### System Configuration and Peripherals
One of the most critical aspects of STM32 development is the clock configuration. This repository provides two distinct examples for setting up the System Clock (SYSCLK):
- **HSI_PLL**: Configures the system to run at 64 MHz using the internal High-Speed Internal (HSI) oscillator.
- **HSE_PLL**: Configures the system for its maximum 72 MHz performance using an external High-Speed External (HSE) crystal.

Beyond clocking, the repository includes templates for a wide array of peripherals:
- **Communication**: Examples for USART (using Interrupt Service Routines for echo), SPI (data loopback), and CAN (loopback mode).
- **Timers**: Basic time-based interval interrupts and PWM signal generation.
- **Device Identification**: A utility to read the unique device ID, which is essential for serial numbering or security features.

### FreeRTOS Integration
For applications requiring multitasking, the repository includes a dedicated FreeRTOS example. Using FreeRTOS v10.0.0, this template demonstrates the simplest implementation of the kernel, featuring a basic LED blinking task. This provides a clean foundation for developers to scale their applications into more complex, multi-threaded systems.

### Project Structure
The repository is organized into numbered directories, each representing a self-contained project. This makes it easy to navigate and use as a reference for specific peripheral implementations. Whether you are setting up a new project from scratch or troubleshooting a specific hardware interface like the CAN bus or SPI, these templates offer a verified baseline.
