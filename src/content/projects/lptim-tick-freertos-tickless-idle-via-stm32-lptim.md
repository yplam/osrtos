---
title: 'LPTIM-Tick: FreeRTOS Tickless Idle via STM32 LPTIM'
summary: A specialized driver for STM32 microcontrollers that replaces the standard
  SysTick timer with the Low-Power Timer (LPTIM) for FreeRTOS tick management. This
  implementation enables ultra-low-power STOP modes while maintaining accurate kernel
  time without drift or slippage. It supports a wide range of STM32 families including
  L, F, G, H, U, and W series.
slug: lptim-tick-freertos-tickless-idle-via-stm32-lptim
codeUrl: https://github.com/jefftenney/LPTIM-Tick
star: 52
lastUpdated: '2024-09-09'
rtos: freertos
topics:
- freertos
- stm32
- ulp
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- stm32-m-nuttx-custom-board-mod
- stm32f103-low-power-library-for-mbed-os
- lwip-ptp-precision-time-protocol-for-lwip
- flexptp
- cmsis-drivers-for-efm32-and-stm32
- tock-for-stm32
---

## Overview

LPTIM-Tick provides a robust implementation for the FreeRTOS system tick using the Low-Power Timer (LPTIM) peripheral found in STM32 microcontrollers. In standard FreeRTOS implementations, the system tick is typically driven by the Cortex-M SysTick timer. While effective for general use, SysTick requires the CPU core to remain active or in a light sleep mode, preventing the microcontroller from entering ultra-low-power STOP modes. 

By migrating the system tick to the LPTIM, developers can achieve significantly lower power consumption. The LPTIM is designed to remain operational even when the CPU is in deep sleep (STOP) modes, allowing FreeRTOS to maintain kernel time and manage task delays while the system consumes only a few microamps.

## Key Features and Benefits

The primary advantage of this project is the elimination of drift or slippage in kernel time, a common issue when implementing custom tickless idle modes. It allows the use of STM32 STOP modes even while FreeRTOS timers are running or tasks are waiting on delays.

**Technical highlights include:**
- **Broad Compatibility**: Supports nearly any STM32 with an LPTIM peripheral, including the STM32L, F, G, H, U, and W families.
- **Zero Drift**: Ensures kernel time remains accurate across sleep/wake cycles.
- **Extreme Power Efficiency**: Demonstrates power consumption as low as 2μA in Test 1 on a Nucleo-L476RG, compared to 3.7mA with the default tickless idle or 9.8mA with tickless disabled.
- **Flexible Clocking**: Compatible with both Low Speed External (LSE) and Low Speed Internal (LSI) oscillators.

## Technical Implementation

The core of the project is `lptimTick.c`, which implements the custom tickless idle logic. When `configUSE_TICKLESS_IDLE` is set to `2` in `FreeRTOSConfig.h`, the kernel cedes control of the idle period to this custom implementation. 

The driver calculates the time until the next task needs to wake, programs the LPTIM to trigger an interrupt at that specific moment, and puts the MCU into a STOP mode. Upon waking—either by the LPTIM or an external interrupt—the driver calculates exactly how much time has passed and corrects the FreeRTOS tick count accordingly.

## Integration and Configuration

Integrating LPTIM-Tick into an existing STM32 project involves a few specific steps to ensure the hardware and software are synchronized:

1. **Source Integration**: Add `lptimTick.c` to the project and update the MCU-specific header includes.
2. **FreeRTOS Configuration**: Set `configUSE_TICKLESS_IDLE` to `2` and remove the standard `xPortSysTickHandler` definition to prevent conflicts.
3. **Peripheral Selection**: The driver defaults to LPTIM1, but can be configured for other instances (like LPTIM2) depending on the specific MCU pinout and requirements.
4. **Clock Setup**: If using the LSI instead of the LSE, users must define `configTICK_USES_LSI` and specify the reference clock frequency (typically 32kHz or 37kHz).

## Performance Comparison

The project includes a demo for the Nucleo-L476RG that showcases the dramatic power savings. By cycling through different test modes using the blue pushbutton, users can observe the current draw on a serial terminal:

- **Standard Tickless (Mode 1)**: ~3.70mA (CPU enters Sleep, but not STOP).
- **LPTIM Tickless (Mode 2)**: ~2μA to 110μA (CPU enters STOP mode).
- **No Tickless (Mode 0)**: ~9.86mA (CPU remains in Run mode during idle).

This project is an essential resource for developers building battery-powered IoT devices or wearable technology where every microamp of power savings is critical for device longevity.
