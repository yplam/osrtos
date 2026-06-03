---
title: BluePill Board Support for Mbed OS 6
summary: A board support package and library for the STM32F103C8T6 'BluePill' board,
  specifically designed for Mbed OS 6. It provides custom target definitions, pin
  mappings, and peripheral configurations to enable seamless development on the popular
  ARM Cortex-M3 microcontroller.
slug: bluepill-board-support-for-mbed-os-6
codeUrl: https://github.com/vznncv/TARGET_BLUEPILL_F103C8
star: 3
version: v0.1.0
lastUpdated: '2021-07-28'
rtos: mbed-os
topics:
- mbed-os
- stm32
- stm32f1
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- blackpill-stm32f401ce-support-for-mbed-os-6
- mbed-os-6-support-for-weact-black-pill-stm32f401cc
- mbed-os-6-support-for-weact-black-pill-stm32f411ce
- mbed-os-6-port-for-weact-stm32h743vit6
- arm-mbed-os-blue-pill-usb-demo
- rt-thread-bsp-for-stm32f407vet6
---

## Overview

The BluePill board, based on the STM32F103C8T6 microcontroller, is one of the most popular and affordable ARM Cortex-M3 development platforms available. While Mbed OS provides extensive support for various STM32 targets, this project offers a dedicated, streamlined library to enable full compatibility with Mbed OS 6.12 and higher. It is designed to simplify the process of setting up a custom target for the BluePill within the modern Mbed build system.

## Hardware Support and Pin Mapping

This library provides comprehensive pin definitions and peripheral mappings for the STM32F103C8T6. By default, the project configures the following essential pins:

- **STDIO UART**: PA_2 (TX) and PA_3 (RX) for console communication.
- **Onboard LED**: PC_13, aliased as `LED1` for standard Mbed code compatibility.
- **Clock Configuration**: The target is configured to use the High-Speed External (HSE) crystal oscillator and the Low-Speed External (LSE) oscillator for the RTC when available.

Through the `PeripheralPins.c` and `PinNames.h` files, the library maps standard Mbed interfaces—including ADC, I2C, PWM, UART, SPI, and CAN—to the physical pins of the BluePill. This ensures that developers can use standard Mbed APIs like `PwmOut`, `I2C`, and `DigitalOut` without manual register configuration.

## Technical Implementation

The project is structured as a standard Mbed library, making it easy to include in existing projects via the Mbed CLI. It utilizes a `custom_targets.json` file to define the `BLUEPILL_F103C8` target, which inherits from the base `MCU_STM32F103x8` configuration. This inheritance allows the board to leverage the existing STM32 HAL while overriding specific parameters such as clock sources and ADC reference voltages.

Key configuration overrides include:
- `clock_source`: Set to use PLL with HSE or HSI.
- `rtc_clock_source`: Configured for LSE or LSI.
- `lse_available`: Enabled (1) to support the 32.768 kHz crystal often found on BluePill boards.

## Integration and Usage

Integrating this support into an Mbed OS 6 project involves adding the library and configuring the local environment. Once the library is added to the project root, the `custom_target.json` must be moved to the project folder to allow the Mbed build system to recognize the new board target. Developers can then set the target using the command `mbed target TARGET_BLUEPILL_F103C8` and proceed with standard compilation using the GCC_ARM toolchain.

For debugging and programming, the library supports standard hardware debuggers (such as ST-Link) and optional USB-to-Serial adapters for console output via the designated PA_2 and PA_3 pins. This setup provides a robust development environment for one of the most ubiquitous microcontrollers in the maker and professional embedded communities.
