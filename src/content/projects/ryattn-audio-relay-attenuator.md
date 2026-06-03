---
title: RyAttn Audio Relay Attenuator
summary: A 64-step audio relay attenuator firmware for the STM32F103 (BluePill) microcontroller.
  It features an SPI OLED display interface and high-performance rotary encoder support
  using hardware Quadrature Encoder Interface (QEI).
slug: ryattn-audio-relay-attenuator
codeUrl: https://github.com/mikikg/ryattn
siteUrl: https://forum.yu3ma.net/thread-2589.html
star: 0
version: v1.0a
lastUpdated: '2024-09-09'
rtos: cmsis
topics:
- bare-metal
- cmsis
- stm32f103
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- pomia-rs
- modular-music-cv-gate-sequencer-for-stm32
- stm32f103-thermometer-and-data-logger
- stm32f4-digital-synthesizer
- midi-player-for-nucleo-f446re
- pixlpal-m1-firmware
---

RyAttn is a specialized firmware project designed for high-quality audio attenuation using a relay-based ladder network. Built for the popular STM32F103 "BluePill" development board, it provides a sophisticated control interface for audio enthusiasts and DIY builders looking for precise, transparent volume control.

The project stands out for its flexibility in input methods. By utilizing the STM32's hardware Quadrature Encoder Interface (QEI), RyAttn supports a wide range of rotary encoders. Whether using standard mechanical encoders or high-resolution optical encoders ranging from 2 to over 2000 pulses per step, the system maintains responsive and accurate tracking. This makes it suitable for everything from simple desktop amplifiers to high-end audiophile preamplifiers.

## Technical Architecture

The firmware is developed using a bare-metal approach with the CMSIS library, ensuring minimal overhead and direct control over the hardware peripherals. The build system is powered by CMake, making it compatible with modern cross-compilation toolchains like `arm-none-eabi-gcc` and professional IDEs such as CLion.

**Key hardware components include:**
- **STM32F103C8T6**: The core microcontroller handling logic and peripheral control.
- **SPI OLED Display**: Provides visual feedback for volume levels and configuration settings.
- **Relay Matrix**: The 64-step attenuation is achieved through a relay-switched resistor network, offering superior audio transparency compared to digital potentiometers or integrated circuit solutions.

## Configuration and Operation

RyAttn is designed to be highly configurable. Users can adjust operation modes and options to suit their specific hardware setup. The 64-step resolution provides fine-grained control over the audio signal, which is essential for high-fidelity audio applications where volume matching and step size are critical.

For developers looking to build or modify the project, the repository includes a standard CMake workflow. The project structure separates the core logic in the `Src` directory from the device-specific startup and configuration files. The memory layout is specifically tuned for the STM32F103C8Tx series, providing 64KB of Flash and 20KB of RAM management via a custom linker script.

## Build Process

The project is designed for Linux-based development environments. A typical build involves installing the ARM GCC toolchain and CMake, then running the standard build sequence:

```bash
mkdir build
cd build
cmake ..
make
```

This generates the necessary `.elf`, `.bin`, and `.hex` files for flashing onto the BluePill hardware. More detailed discussion and project background can be found on the Yu3ma audio forum, where the project community shares implementation details and hardware designs.
