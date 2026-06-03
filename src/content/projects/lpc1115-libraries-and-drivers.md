---
title: LPC1115 Libraries and Drivers
summary: A collection of drivers, sensor libraries, and actuator code for the NXP
  LPC1115 and LPC11xx series microcontrollers. It integrates the CMSIS 2.0 framework
  and includes example projects for the LPCXpresso 11C24 board, including a FreeRTOS-based
  blinky application.
slug: lpc1115-libraries-and-drivers
codeUrl: https://github.com/darsolano/LPC1115_Libraries
star: 0
lastUpdated: '2020-07-11'
rtos: freertos
topics:
- arm
- c
- cmsis
- cortex-m
- lpc1114
- lpc1115
- nxp
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lpc43xx-freertos-led-blinking-example
- stm32-cmsis-libraries
- stm32-prototyping-libraries
- stm32f103-cmsis-libraries-and-projects
- stm32-cortex-m4-code-examples
- stm32f103rb-templates-and-examples
---

## Overview

The LPC1115_Libraries repository provides a comprehensive suite of tools for developers working with the NXP LPC11xx family of microcontrollers, specifically targeting the LPC1115 and LPC11C24. This project serves as a bridge between the raw hardware and application-level code, offering a structured approach to peripheral management and sensor integration.

At its core, the project is built around the CMSIS (Cortex Microcontroller Software Interface Standard) framework version 2.0. This ensures that the code follows industry standards for ARM Cortex-M0 based devices, facilitating better portability and consistency across different development environments.

## Key Components

The repository is organized into several distinct layers to simplify the development process:

- **CMSIS Framework**: The project includes the CMSIS v2.00 framework specifically tailored for the LPC11xx series, providing the necessary header files and system initialization code.
- **Peripheral Drivers**: The `LPC11xx_DRV` directory contains specialized driver libraries for the processor's internal peripherals. These drivers abstract the register-level complexity of the LPC11xx hardware.
- **Sensor and Actuator Libraries**: Beyond basic chip support, the repository includes an `inc` and `src` structure dedicated to various external components, allowing developers to quickly interface with common hardware modules.
- **Board-Specific Support**: There is dedicated support for the NXP LPCXpresso 11C24 board, including board-level libraries that define pin mappings and board-specific configurations.

## RTOS Integration

One of the highlights of this collection is the inclusion of a FreeRTOS example. The `nxp_lpcxpresso_11c24_freertos_blinky` project demonstrates how to integrate the popular FreeRTOS real-time operating system with the LPC11xx hardware. This provides a starting point for developers looking to build more complex, multi-threaded applications on these power-efficient microcontrollers.

## Technical Implementation

The project is designed to be used with standard ARM development tools. By separating the chip-level libraries (`lpc_chip_11cxx_lib`) from the board-level libraries and the application code, the repository maintains a clean architecture. This modularity allows developers to update the underlying drivers or swap out board configurations without significantly altering their application logic.

Whether you are looking for a bare-metal peripheral driver or a template for a FreeRTOS-based embedded system, this repository provides the essential building blocks for NXP LPC11xx development.
