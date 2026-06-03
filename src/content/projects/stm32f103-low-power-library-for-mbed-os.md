---
title: STM32F103 Low Power Library for Mbed OS
summary: A specialized library for Mbed OS that enables standby mode on STM32F103
  microcontrollers to minimize power consumption. It utilizes the hardware Real-Time
  Clock (RTC) alarm to wake the system from deep sleep, making it suitable for battery-powered
  IoT applications.
slug: stm32f103-low-power-library-for-mbed-os
codeUrl: https://github.com/tsaarni/stm32f103-low-power-mbed
star: 3
lastUpdated: '2018-07-29'
rtos: mbed-os
topics:
- low-power
- mbed-os
- stm32f1
- stm32f103
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- minimal-mbed-os-template-for-stm32f103
- lptim-tick-freertos-tickless-idle-via-stm32-lptim
- minimal-mbed-os-template-for-stm32f030
- stm32-uid-helper-for-mbed
- stm32f103-cmsis-libraries-and-projects
- bq35100-mbed-library
---

The STM32F103 series of microcontrollers is widely used in embedded systems, but achieving ultra-low power consumption often requires direct interaction with hardware registers and specific power modes. This library provides a streamlined interface for Mbed OS users to leverage the STM32F103's standby mode, significantly reducing power draw for battery-operated devices.

### Power Optimization with Standby Mode

Standby mode is one of the lowest power states available on the STM32F103. In this state, the voltage regulator is disabled, and the entire 1.8V domain is powered off, leaving only the backup domain—including the Real-Time Clock (RTC) and backup registers—active. While this mode offers the best power savings, it also means that the internal SRAM and register contents are lost, and the system performs a reset upon waking up.

This library simplifies the transition into this state. By utilizing the hardware RTC, developers can schedule a wake-up event after a specific duration. This pattern is ideal for "sleepy" sensors that need to wake up periodically, perform a measurement, transmit data, and then return to a low-power state immediately to conserve energy.

### Key Features

- **Standby Mode Support**: Enables the deepest sleep state for the STM32F103, minimizing current draw.
- **RTC Alarm Wake-up**: Uses the internal hardware RTC to trigger a system reset and wake-up after a defined interval.
- **Mbed OS Integration**: Designed specifically to work within the Mbed OS environment, abstracting the low-level CMSIS calls required to configure the Power Control (PWR) and RTC peripherals.

### Technical Implementation

The library interacts with the STM32 hardware abstraction layer to configure the RTC alarm. According to ST's application note AN3371, using the RTC for wake-up involves configuring the alarm registers and ensuring the clock source (typically the LSE or LSI) is stable. When the standby function is invoked, the library sets the alarm and enters the power-down sequence.

Because the microcontroller resets upon waking from standby, the application logic should be structured to handle a fresh boot every time it wakes up. Developers can use the STM32 backup registers to persist small amounts of state data across sleep cycles, as these registers are not reset by the standby mode transition.

### Getting Started

The library consists of a simple header and implementation file (`lowpower.hpp` and `lowpower.cpp`). To integrate it into an Mbed project, include the header and call the standby function with the desired sleep duration in seconds. This allows for easy implementation of duty-cycled applications where the device spends the majority of its time in a high-impedance, low-power state.
