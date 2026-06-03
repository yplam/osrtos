---
title: STM32 Framework
summary: A comprehensive development framework for STM32 microcontrollers (F1, F2,
  F4) that encapsulates the HAL library and integrates FreeRTOS, LwIP, and FatFS.
  It provides a modular architecture with custom components like a menu system, finite
  state machine, and various peripheral drivers for rapid embedded application development.
slug: stm32-framework
codeUrl: https://github.com/Staok/stm32_framework
star: 421
version: '2.6'
lastUpdated: '2023-04-12'
rtos: freertos
libraries:
- lwip
- lwrb
topics:
- framework
- freertos
- peripheral-drivers
- stm32
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32-prototyping-libraries
- stm32cubeh7rs-mcu-firmware-package
- stm32f107-makefile-freertos-template
- stm32-base-project-template
- stm32-makefile-freertos-project-template
- enterprise-stm32-platform-development
---

## Overview

The STM32 Framework is a robust development template and middleware collection designed for STM32F1, F2, and F4 series microcontrollers. It aims to provide a high-level encapsulation of the STM32 HAL (Hardware Abstraction Layer) while integrating essential embedded components like real-time operating systems, network stacks, and file systems. 

The project is built with a focus on decoupling and scalability, allowing developers to easily enable or disable specific peripherals and components through a centralized configuration system. Every line of code, excluding external open-source libraries, has been manually ported, modified, and verified to ensure reliability and performance.

## Core Architecture

The framework utilizes a configuration-driven approach. Most hardware and software settings are managed through specific header files:
- **STM32F1**: Managed via `sys_config.h`.
- **STM32F2/F4**: Managed via `PeriphConfigCore.h`.

Initialization is split into two logical sequences: `sys_MCU_Init_Seq()` for internal MCU peripherals and `sys_Device_Init_Seq()` for external components. This separation simplifies the porting process and improves code readability.

## Integrated Middleware and Components

The framework comes pre-integrated with several industry-standard libraries and custom-built tools:

- **FreeRTOS (10.3.1)**: Provides task management and synchronization. The framework encourages the use of Task Notifications and Message Queues for efficient inter-task communication.
- **LwIP (2.1.2)**: A lightweight TCP/IP stack supporting UDP, TCP (Server/Client), and HTTP WebServer functionality.
- **FatFS (ff14)**: Supports file system operations on SD cards (via SDIO or SPI), SPI Flash, and USB Host MSC.
- **Custom Menu Framework**: A flexible menu system for managing user interfaces and system parameters.
- **Finite State Machine (FSM)**: A self-implemented FSM library designed to manage complex logic and state transitions in a readable manner.
- **USB Support**: Integration of the ST UM1021 library for USB Device (VCP, MSC, HID) and USB Host (MSC, HID) modes.
- **DSP & FPU**: Full support for ARM CMSIS 5.7.0 DSP libraries, particularly optimized for the F4 series.

## Peripheral Support

The framework provides advanced wrappers for a wide array of STM32 peripherals, including:
- **Communication**: USART, SPI, I2C (Software), CAN, and Ethernet.
- **Timers**: General-purpose timers (TIM2-4), Advanced timers (TIM1/8) with dead-time complementary PWM, and Basic timers (TIM6/7).
- **Analog**: ADC (with DMA scanning) and DAC.
- **Storage & Memory**: Internal Flash programming, FSMC for external SRAM/LCD, and SDIO.
- **System**: IWDG, RTC, CRC, RNG, and Low-power modes (WFI).

## Getting Started

To use the framework, developers typically start by configuring the desired peripherals in the core configuration headers. For example, to enable a peripheral or component, one would modify the corresponding macro:

```c
// Example configuration in PeriphConfigCore.h
#define SYSTEM_SUPPORT_OS        1  // Enable FreeRTOS
#define SYSTEM_UART1_ENABLE      1  // Enable USART1
#define SYSTEM_ADC1_ENABLE       1  // Enable ADC1
```

Application logic is generally divided between `TaskConfig.c` (for OS-based tasks) and `BareConfig.c` (for bare-metal loops). The framework also includes utility libraries like a dependency-free `sprintf` and the `lwrb` ring buffer for efficient data handling.
