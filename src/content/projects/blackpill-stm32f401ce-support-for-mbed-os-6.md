---
title: BlackPill STM32F401CE Support for Mbed OS 6
summary: A target support package for the WeAct Black Pill board (STM32F401CEU6) in
  Mbed OS 6. It provides necessary configuration files, pin mappings, and clock settings
  to enable Mbed OS development on this specific hardware.
slug: blackpill-stm32f401ce-support-for-mbed-os-6
codeUrl: https://github.com/vznncv/TARGET_BLACKPILL_F401CE
star: 2
version: v0.1.1
lastUpdated: '2021-07-27'
rtos: mbed-os
topics:
- mbed-os
- stm32
- stm32f4
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- mbed-os-6-support-for-weact-black-pill-stm32f411ce
- mbed-os-6-support-for-weact-black-pill-stm32f401cc
- bluepill-board-support-for-mbed-os-6
- mbed-os-6-port-for-weact-stm32h743vit6
- mcudev-black-stm32f407vet6-micropython-support
- rt-thread-bsp-for-stm32f407vet6
---

The WeAct Black Pill, featuring the STM32F401CEU6, is a popular choice for developers seeking a more powerful alternative to the classic Blue Pill. While the Blue Pill is limited by its STM32F103 MCU, the Black Pill offers significantly more RAM, flash memory, and a single-precision floating-point unit (FPU), all within a similar compact form factor. This project provides the necessary target support to run Mbed OS 6 on these boards.

The core of this support package is the definition of the `BLACKPILL_F401CE` target. It includes comprehensive pin mappings for peripherals such as ADC, I2C, PWM, UART, SPI, and USB. By integrating this into an Mbed OS project, developers gain access to the full suite of Mbed APIs, from high-level RTOS primitives to low-level hardware abstraction.

## Hardware Capabilities

The STM32F401CEU6 microcontroller at the heart of the board is a high-performance ARM Cortex-M4 CPU running at up to 84 MHz. It is equipped with 512 KB of Flash memory and 96 KB of SRAM. The board itself is designed for flexibility, featuring a USB Type-C connector for power and data, a user-controllable LED (PC_13), and a user button (PA_0).

Clock configuration is a critical component of this port. The board utilizes a 25 MHz high-speed external (HSE) quartz oscillator. The `system_clock.c` file provided in this repository configures the Phase-Locked Loop (PLL) to achieve the maximum 84 MHz system clock while ensuring the USB peripheral receives the required 48 MHz clock signal.

## Integration and Configuration

To use this board with Mbed OS, the repository is added as a library to an existing Mbed project. The configuration involves using a `custom_targets.json` file, which defines the board's inheritance from the standard `MCU_STM32F401xE` target. This file also overrides default settings to match the Black Pill's specific hardware, such as the HSE value and the available RTC clock sources.

Standard I/O is mapped to PA_2 (TX) and PA_3 (RX) by default, allowing for easy debugging via a serial adapter. The project also defines aliases for the onboard LED and button, making code more portable and readable.

## Technical Implementation

The implementation relies on several key files that define the hardware abstraction layer for Mbed OS:
- **PeripheralPins.c**: Contains the `PinMap` arrays that tell Mbed OS which physical pins can be used for specific peripheral functions like PWM, SPI, and I2C.
- **PinNames.h**: Defines the symbolic names for all pins on the UFQFPN48 package, including standard Mbed aliases like `LED1` and `BUTTON1`.
- **system_clock.c**: Handles the initialization of the system clock, AHB, and APB buses using the STM32 HAL.

This target support has been verified with Mbed OS versions 6.12 and 6.13, ensuring compatibility with modern Mbed development workflows and toolchains like GCC_ARM. Developers can use standard Mbed CLI commands to add the library, set the target, and export to their preferred IDE.
