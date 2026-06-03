---
title: Mbed OS 6 Port for WeAct STM32H743VIT6
summary: A hardware support package providing Mbed OS 6 compatibility for the WeAct
  STM32H743VIT6 development board. It includes essential target definitions, pin mappings,
  and clock configurations for the high-performance 480 MHz STM32H743VI microcontroller.
slug: mbed-os-6-port-for-weact-stm32h743vit6
codeUrl: https://github.com/vznncv/TARGET_WEACT_H743VI
star: 5
version: v0.1.0
lastUpdated: '2021-07-19'
rtos: mbed-os
topics:
- mbed-os
- stm32
- stm32h7
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- blackpill-stm32f401ce-support-for-mbed-os-6
- mbed-os-6-support-for-weact-black-pill-stm32f411ce
- mbed-os-6-support-for-weact-black-pill-stm32f401cc
- bluepill-board-support-for-mbed-os-6
- rt-thread-bsp-for-stm32f407vet6
- mcudev-black-stm32f407vet6-micropython-support
---

## Overview

The TARGET_WEACT_H743VI project provides a dedicated port of Mbed OS 6 for the WeAct STM32H743VIT6 development board. This board is a compact yet powerful platform based on the STM32H743VI microcontroller, which features an ARM Cortex-M7 core capable of running at 480 MHz. This repository bridges the gap between the standard Mbed OS distribution and this specific hardware, allowing developers to leverage the Mbed ecosystem on high-performance H7 series silicon.

## Hardware Capabilities

The target board is equipped with a robust set of features that are exposed through this Mbed port. The STM32H743VI MCU provides 2 MB of Flash and 1 MB of RAM, though the port notes that linker script adjustments may be necessary to utilize the full memory space transparently. 

**Key hardware features supported include:**
- **High-Speed Processing**: 480 MHz max CPU frequency with double-precision FPU.
- **Rich Connectivity**: Support for 9 USARTs, 5 SPIs, 4 I2Cs, and dual USB 2.0 full-speed interfaces.
- **Storage Options**: Integrated support for 8 MB SPI Flash and 8 MB QSPI Flash.
- **Analog Peripherals**: Access to three 16-bit ADCs and a 12-bit DAC.
- **Networking**: Ethernet MAC interface for wired connectivity.

## Technical Implementation

This port provides the necessary low-level configuration files required by the Mbed build system. The `custom_targets.json` file defines the board's inheritance from the `MCU_STM32H743xI` family and sets critical parameters such as the 25 MHz High-Speed External (HSE) oscillator value. 

The implementation includes:
- **Peripheral Mapping**: `PeripheralPins.c` defines the alternate function mappings for all onboard peripherals, ensuring that UART, SPI, and I2C pins are correctly routed.
- **Clock Configuration**: `system_clock.c` handles the complex clock tree of the H7 series, configuring the PLLs to achieve the maximum 480 MHz system clock while maintaining appropriate bus speeds for AHB and APB peripherals.
- **Pin Definitions**: `PinNames.h` provides standardized aliases for board-specific features, such as `LED1` (PC_13) and `BUTTON1` (PC_13 with PullDown).

## Getting Started

Integrating this target into an Mbed project involves adding the library to an existing Mbed 6 project and utilizing the provided `custom_target.json`. Once configured, the board can be targeted using the standard Mbed CLI tools. The project is verified to compile and run successfully with Mbed OS 6.13 using the GCC ARM toolchain.

For debugging and console output, the port defaults to `PA_2` and `PA_3` for `STDIO_UART_TX` and `RX`, respectively. This allows for standard `printf` functionality via an external USB-to-Serial adapter, which is essential for both development and automated testing with tools like Greentea.
