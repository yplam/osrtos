---
title: Oscilloscope for STM32F411
summary: A dual-channel oscilloscope implementation for the STM32F411CEU6 microcontroller
  featuring signal acquisition via ADC with DMA and a dedicated ILI9341 display. It
  supports edge-based triggering and achieves a bandwidth of approximately 1 MHz while
  leveraging the STM32Cube HAL for peripheral management.
slug: oscilloscope-for-stm32f411
codeUrl: https://github.com/zherlitsyn/oscilloscope
lastUpdated: '2024-05-09'
licenses:
- MIT
rtos: ''
topics:
- adc
- c
- circuit
- hardware
- ili9341
- oscilloscope
- stm32
- stm32f411ceu6
isShow: true
image: /202604/oscilloscope.webp
createdAt: '2026-04-09T08:56:05+00:00'
updatedAt: '2026-04-09T08:56:05+00:00'
---

Building a digital oscilloscope is a classic rite of passage for many embedded developers. This project implements a functional, dual-channel oscilloscope using the STM32F411CEU6 microcontroller, commonly known as the "Black Pill." Created as a hands-on exploration of the STM32 platform, the project demonstrates how to orchestrate high-speed peripherals to capture and visualize analog signals in real-time.

### Signal Acquisition and Processing

The heart of the system lies in its use of the STM32's Analog-to-Digital Converter (ADC) combined with Direct Memory Access (DMA). By offloading data transfer from the CPU to the DMA controller, the application can capture high-frequency samples without interrupting the main processing loop. This setup allows the device to achieve a bandwidth of approximately 1 MHz.

The oscilloscope features two distinct measurement channels with different hardware profiles:
- **Channel 1:** Features a 1:11 voltage divider, allowing for higher voltage range measurements at the cost of some precision.
- **Channel 2:** A direct channel without a voltage divider, optimized for maximum accuracy within the MCU's native voltage range.

To ensure a stable waveform display, the firmware implements synchronization using a trigger system that can be configured for both rising and falling edges. With a vertical sensitivity of 20 mV and an input impedance of 50 kΩ, it is well-suited for analyzing low-to-medium frequency signals in hobbyist electronics projects.

### Hardware Integration and User Interface

Visualization is handled by an ILI9341 display controller, which communicates with the STM32 via a high-speed SPI interface. The user interface is designed for interactivity, utilizing rotary encoders for parameter adjustment. This allows the user to navigate settings or adjust scales intuitively, mimicking the feel of a traditional benchtop oscilloscope.

Technically, the project is built using the STM32Cube HAL (Hardware Abstraction Layer). The configuration, managed via STM32CubeMX, handles the complex clock tree and peripheral initialization required for PWM generation, timer management, and interrupt handling. 

### Technical Specifications

- **Microcontroller:** STM32F411CEU6 (ARM Cortex-M4)
- **Display:** ILI9341 (SPI)
- **Bandwidth:** ~1 MHz
- **Sensitivity:** 20 mV
- **Input Impedance:** 50 kΩ
- **Triggering:** Rising/Falling edge
- **Channels:** 2 (one with 1:11 divider)

This project serves as a robust example of bare-metal development on the STM32F4 series. It highlights the efficiency of the ARM Cortex-M4 architecture when dealing with mixed-signal processing and provides a solid foundation for anyone looking to understand DMA-driven data acquisition and display interfacing.
