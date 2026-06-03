---
title: STM32F103 CMSIS Libraries and Projects
summary: A collection of minimalist libraries and example projects for the STM32F103
  (Blue Pill) microcontroller using the CMSIS standard. It provides low-level drivers
  for peripherals like ADC, PWM, I2C, USART, and 1-Wire without the overhead of the
  STM32 HAL or CubeIDE. The project is designed for developers seeking a lightweight,
  bare-metal approach to STM32 development.
slug: stm32f103-cmsis-libraries-and-projects
codeUrl: https://github.com/EZdenki/STM32F103-Libraries-and-Projects
star: 13
lastUpdated: '2023-08-23'
rtos: cmsis
topics:
- aht10
- bluepill
- cmsis
- i2c
- lcd
- stm32f103
- usart
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32f103-cmsis-peripheral-configuration
- stm32-cmsis-libraries
- stm32-cmsis-zero-to-hero
- stm32f1xx-bare-metal-template
- stm32f103rb-templates-and-examples
- stm32f103-usb-cdc-cmsis
---

## Overview

The STM32F103 CMSIS Libraries and Projects repository is a dedicated resource for developers who want to program the STM32F103 (commonly known as the "Blue Pill") using only the Cortex Microcontroller Software Interface Standard (CMSIS). By bypassing the heavy abstraction layers of the STM32 Hardware Abstraction Layer (HAL) and the STM32CubeIDE, this project offers a leaner, more transparent way to interact with the hardware.

This collection is ideal for those who want to understand the inner workings of their microcontroller or for projects where code size and execution efficiency are paramount. It provides a bridge between high-level application logic and the low-level register manipulation required for embedded systems.

## Key Features and Libraries

The repository is organized into several modular libraries and example projects, each targeting specific peripherals or external sensors:

- **Core Peripheral Support**: Includes basic routines for ADC (Analog-to-Digital Conversion) and PWM (Pulse Width Modulation), essential for reading sensors and controlling motors or LEDs.
- **I2C Communication**: A robust I2C library featuring drivers for common devices such as the AHT10 temperature and humidity sensor, 24LC64 EEPROMs, and I2C-driven 16x2 LCD modules.
- **USART Serial IO**: Simple USART routines to enable serial communication, allowing for debugging and user interaction via terminals like PuTTY or minicom.
- **1-Wire Protocol**: A dedicated 1-Wire library with a sample project for the DS18B20 temperature sensor.
- **Display Drivers**: Support for standard 16x2 LCD modules, both via direct GPIO connection and I2C backpacks.
- **Utility Routines**: A microsecond delay and halt library specifically tuned for the STM32F103 running at 8 MHz.

## Technical Philosophy

The primary goal of this project is to provide a "zero to blinky" experience without the complexity of modern IDEs. It emphasizes a manual setup process that works across Windows and GNU/Linux, encouraging developers to use the editor of their choice. By focusing on CMSIS, the code remains highly portable across different ARM Cortex-M microcontrollers while maintaining a close relationship with the hardware registers.

## Getting Started

For developers new to the CMSIS-only workflow, the project provides a comprehensive setup guide. This guide covers the necessary toolchains and environment configurations required to compile and flash code to the Blue Pill. 

The journey typically begins with the **STM32F103-CMSIS-Blinky** project, which serves as the minimalist baseline for any new firmware. From there, users can integrate specific libraries—such as the USART library for serial feedback or the I2C library for sensor integration—to build more complex embedded applications. 

Whether you are building a simple temperature monitor with the DS18B20 or a serial-based EEPROM programmer, these libraries provide the foundational building blocks without the bloat of traditional vendor-supplied frameworks.
