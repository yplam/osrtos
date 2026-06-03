---
title: 'NanoVNA-X: Enhanced Firmware for NanoVNA H/H4'
summary: An advanced, event-driven firmware for NanoVNA-H and NanoVNA-H4 handheld
  vector network analyzers. Built on the ChibiOS RTOS, it features a modular architecture,
  non-blocking USB communication, and a zero-copy sweep pipeline optimized for STM32F072
  and STM32F303 microcontrollers.
slug: nanovna-x-enhanced-firmware-for-nanovna-h-h4
codeUrl: https://github.com/momentics/NanoVNA-X
star: 26
version: v0.9.102
lastUpdated: '2026-01-09'
rtos: chibios-rt
topics:
- arm-cortex-m
- calibration
- dfu-util
- embedded-c
- firmware
- ham-radio
- impedance-analysis
- nanovna
- nanovna-h
- nanovna-h4
- open-source-hardware
- rf-measurement
- s-parameters
- signal-processing
- stm32
- sweep
- vector-network-analyzer
isShow: false
createdAt: '2026-01-12'
updatedAt: '2026-01-12'
relatedProjects:
- openscope-2c53t
- bitcraze-crazyflie-2-0-2-1-mbed-os-firmware
- stm32cuben6-mcu-firmware-package
- highboy-firmware
- stm32cubeh7rs-mcu-firmware-package
- ic-705-ci-v-band-decoder-and-transverter-controller
---

## Overview

NanoVNA-X is a purpose-built, high-performance firmware for the NanoVNA-H and NanoVNA-H4 handheld Vector Network Analyzers. While originally derived from the public NanoVNA codebase, NanoVNA-X has been completely re-architected to move away from legacy blocking designs toward a modern, responsive, and deterministic system. 

The project focuses on delivering a maintainable and modular implementation that maximizes the potential of memory-constrained hardware, specifically the STM32F072 and STM32F303 platforms. By leveraging a layered runtime and a real-time operating system, NanoVNA-X provides a significantly more stable user experience and more reliable measurement capabilities than traditional monolithic firmware implementations.

## Architectural Evolution

The most significant change in NanoVNA-X is the transition from a monolithic `main.c` to a layered architecture built on the **ChibiOS/RT** stack. This design separates bootstrapping, platform integration, measurement processing, and the user interface into distinct subsystems. 

Key architectural components include:
- **Event-Driven Core**: The firmware utilizes the ChibiOS event bus for communication between the sweep engine, UI, and USB shell. This prevents a single hung component—such as a stalled PC host or a busy I2C bus—from freezing the entire instrument.
- **Zero-Copy Sweep Pipeline**: RF orchestration is centered around a measurement engine coordinator. This allows the UI, USB CLI, and SD card services to consume captured data buffers without re-triggering hardware sweeps, significantly improving efficiency.
- **Infrastructure Services**: A dedicated state manager handles configuration and calibration persistence to flash with checksum protection, while a cooperative scheduler manages background tasks without the race conditions common in simpler firmware.

## Performance and Resource Management

NanoVNA-X is highly optimized for the STM32 series. It employs strategic DMA (Direct Memory Access) usage to prioritize measurement stability. SPI LCD transfers and I2S audio captures use DMA to ensure smooth rendering and data integrity, while the UART console is intentionally moved to an interrupt-driven driver to free up DMA channels for the RF data path.

On the STM32F072 (NanoVNA-H), the firmware achieves an effective throughput of approximately 175–232 points per second, depending on the frequency span and harmonic retuning requirements. While the STM32F303 (NanoVNA-H4) offers hardware FPU acceleration and faster SPI clocks, the firmware is tuned so that the "useful work" of calculation and rendering takes less than 5% of the total sweep time, ensuring that even the lower-power F072 remains highly performant.

## Key Features

- **Non-Blocking USB**: The USB CDC stack is fully asynchronous, resolving common device freezes during PC connection or disconnection.
- **Integrated SD Workflow**: Full support for internal micro-SD slots, allowing for calibration slot storage, S1P/S2P data exports, and screenshots in BMP or RLE-TIFF formats.
- **Deterministic USB Identity**: Every unit enumerates with a unique serial number derived from the MCU's unique ID, simplifying device management in multi-unit environments.
- **Advanced UI**: A reworked UI layer supports SD card browsing, remote desktop functionality, and improved on-device messaging.
- **PLL Stabilization**: Optimized programming for the Si5351 synthesizer reduces frequency overshoot and drift, improving measurement repeatability.

## Technical Implementation

The firmware is written in C11 and targets the ARM Cortex-M0 and Cortex-M4 architectures. It integrates several key hardware drivers:
- **Si5351A**: Clock generator for RF synthesis.
- **TLV320AIC3204**: Dual-channel audio ADC/DAC for measurement sampling.
- **ILI9341/ST7789/ST7796S**: Support for various LCD controllers with DMA-backed rendering.
- **FatFs**: Integrated for robust filesystem management on SD cards.

For developers, the project includes a comprehensive unit testing suite that can be run on a host machine, ensuring the reliability of DSP kernels, math helpers, and the event bus logic before deployment to hardware.
