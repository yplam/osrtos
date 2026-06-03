---
title: WatchX Open Source Smartwatch
summary: An open-source smartwatch firmware for the STM32F411CEU6, featuring a high-performance
  60FPS UI powered by the LVGL library. It integrates environmental sensors like the
  BMP180 and MPU6050, and includes support for the Arduboy game system.
slug: watchx-open-source-smartwatch
codeUrl: https://github.com/FASTSHIFT/WatchX
star: 887
lastUpdated: '2021-05-11'
rtos: ''
libraries:
- lvgl
topics:
- littlevgl
- lvgl
- rtc
- stm32
- stm32f4
- watchx
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- watchx-ii-smart-watch
- ov-watch
- opentimewatch-os
- lunokiotwatch-firmware-for-lilygo-twatch-2020
- leta
- zephyrwatch
---

WatchX is an ambitious open-source smartwatch project designed for high performance and smooth user experiences. Built around the STM32F411CEU6 microcontroller, it achieves fluid animations at over 60 frames per second, making it a standout example of what is possible on modern embedded hardware.

## UI Framework and Graphics

The project leverages the LittlevGL (LVGL) graphics library (version 6.1.2) to provide a sophisticated UI framework. This choice allows for complex widgets, transitions, and high-quality visual effects on the watch's 1.14-inch IPS display. The display itself uses an ST7789 controller over a high-speed SPI interface, supporting a resolution of 135x240 and a refresh rate of 100Hz to ensure the UI remains responsive and flicker-free.

## Hardware Specifications

WatchX is built on a robust hardware foundation centered on the STM32F411CEU6 "Black Pill" style core. This MCU provides a 100MHz clock speed, 128KB of RAM, and 512KB of Flash memory, offering plenty of headroom for the UI and application logic. 

**Core Hardware Components:**
- **Main Controller:** STM32F411CEU6 (ARM Cortex-M4)
- **Display:** 1.14-inch IPS ST7789 (135x240 resolution)
- **Sensors:** MPU6050 (6-axis accelerometer) and BMP180 (Barometer/Altimeter)
- **Input:** Three physical buttons for navigation
- **Power Management:** TP4056 charging circuit combined with a TPS63070 buck-boost converter
- **RTC:** Internal MCU Real-Time Clock for timekeeping

## Features and Capabilities

The firmware is designed as an "easy-to-extend system framework," suggesting a modular approach to adding new applications or watch faces. Beyond standard timekeeping, the system provides several built-in tools and entertainment options:

- **Environmental Monitoring:** Real-time display of temperature, atmospheric pressure, and altitude.
- **Utility Tools:** Includes a stopwatch and brightness control.
- **Gaming:** One of the most unique features is the integration of the Arduboy and Arduboy2 game systems, allowing users to play a wide variety of open-source 8-bit games directly on the watch.
- **Power Efficiency:** Includes an automatic shutdown feature (configurable between 5 and 300 seconds) to preserve battery life.

For developers looking to explore embedded GUI development or build their own wearable device, WatchX provides a comprehensive starting point combining powerful hardware with a modern graphics stack. The project demonstrates how to effectively manage SPI-based displays and I2C sensors within a cohesive, extensible framework.
