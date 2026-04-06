---
title: NoiseCard
summary: NoiseCard is an ultra-low-power ambient noise monitor built on the STM32G0
  microcontroller and ChibiOS RTOS. It measures decibel levels periodically and provides
  visual feedback via LEDs, designed to run entirely on direct solar power with minimal
  energy consumption.
slug: noisecard
codeUrl: https://github.com/tcsullivan/noisecard
siteUrl: https://hackaday.io/project/196439-noisecard
lastUpdated: '2024-06-13'
licenses:
- GPL-3.0
rtos: chibios-rt
topics:
- chibios
- cpp20
- i2s
- kicad
- low-power
- stm32
isShow: false
createdAt: '2026-04-06T00:34:16+00:00'
updatedAt: '2026-04-06T00:34:16+00:00'
---

Ambient noise levels in populated areas, particularly in North America, often exceed safe thresholds. Prolonged exposure to this excess noise can lead to lasting impacts on health, yet many people remain unaware of the noise levels in their immediate environment. NoiseCard is a specialized tool designed to solve this problem by providing a simple, accessible way to monitor ambient decibels.

### Ultra-Low-Power Design

One of the most striking features of NoiseCard is its power efficiency. The project is designed to run on just a few milliwatts of power. This efficiency is so high that the device can operate entirely on direct solar power without the need for a battery. Instead of heavy chemical batteries, the circuit utilizes large capacitors to provide a small energy reserve, ensuring continuous operation even during minor fluctuations in light.

### Technical Architecture

The firmware is built for ARM Cortex-M0+ microcontrollers, specifically targeting the STM32G0 series. To manage hardware abstraction and system routines, the project utilizes the ChibiOS real-time operating system. ChibiOS provides a robust HAL (Hardware Abstraction Layer) that simplifies device configuration and firmware porting.

Since the Cortex-M0+ architecture does not include a hardware floating-point unit (FPU), performing accurate decibel calculations can be computationally expensive. NoiseCard addresses this by integrating `qfplib-m0-full`, a library providing highly optimized floating-point arithmetic specifically for the Cortex-M0+. This allows the device to process I2S audio data and convert it into accurate decibel measurements while staying within its strict power budget.

### Firmware and Hardware Integration

The project logic is based on periodic measurements. While powered on, the microcontroller wakes up to take noise readings and then uses blinking LEDs to indicate the current level to the user. This visual feedback makes it easy to understand environmental conditions at a glance without needing a complex display or smartphone connection.

For those interested in the hardware side, the repository includes KiCAD files for the PCB design. Programming the board is handled via OpenOCD, typically using a 6-pin Tag-Connect cable (TC2030-CTX-NL) to interface with the STM32G0's SWD pins.

### Development and Credits

NoiseCard stands on the shoulders of several open-source projects. The decibel-measuring logic was adapted from the ESP32-I2S-SLM project, while the underlying system stability is provided by the ChibiOS RTOS. The build system is managed via a standard GNU Make workflow, requiring the `arm-none-eabi` GCC toolchain for compilation.
