---
title: Modular Music CV/Gate Sequencer for STM32
summary: A modular music CV/Gate sequencer built for the STM32F103C8 (Blue Pill) using
  the Rust programming language and the RTIC framework. It features a custom Cherry
  MX keypad interface, dual MCP4921 DACs for control voltage output, and WS2812 LED
  support for visual feedback.
slug: modular-music-cv-gate-sequencer-for-stm32
codeUrl: https://github.com/etiennetremel/stm32-sequencer
star: 4
lastUpdated: '2023-03-15'
rtos: rtic
topics:
- electronic
- music
- rtic
- rust
- sequencer
- stm32
- stm32f103
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- microgroove
- midi-player-for-nucleo-f446re
- ryattn-audio-relay-attenuator
- europi
- esp32-custom-hardware-synthesizer
- stm32f4-rtic-playground
---

## Overview

The STM32 Sequencer is a modular music CV/Gate sequencer designed for the popular STM32F103C8 "Blue Pill" development board. Written entirely in Rust, the project leverages the safety and performance of the language to manage real-time musical timing and hardware control. The system is designed to interface with analog synthesizers via Control Voltage (CV) and Gate signals, providing a tactile and programmable interface for music production.

## Hardware Architecture

The project is built around a custom hardware setup that transforms the STM32 microcontroller into a functional musical instrument. Key hardware components include:

- **Microcontroller**: STM32F103C8 (ARM Cortex-M3), providing the processing power and timing precision required for sequencing.
- **Keypad**: A custom PCB mounted with Cherry MX mechanical keys, arranged in a matrix for step entry and control functions.
- **Digital-to-Analog Converters (DAC)**: Dual MCP4921 SPI DACs are used to generate precise analog control voltages.
- **Visual Feedback**: WS2812 (NeoPixel) LEDs provide per-step visual status, driven via SPI.

## Software Implementation

The firmware is built using the **RTIC (Real-Time Interrupt-driven Concurrency)** framework, which is ideal for low-latency applications like music sequencers. By using RTIC, the project ensures that timing-critical tasks—such as clock pulses and CV updates—are handled with minimal jitter.

The software stack includes several specialized Rust crates:
- `stm32f1xx-hal`: For hardware abstraction of the STM32 peripherals.
- `mcp49xx`: A driver for the external DACs.
- `ws2812-spi`: To control the LED strip via the SPI peripheral.
- `keypad`: To manage the mechanical key matrix scanning.

## Keyboard Control and Workflow

The sequencer features a sophisticated control scheme using the custom mechanical keypad. Users can switch between recording modes (Gate or CV), clear steps, and navigate through multiple tracks. Advanced features include:

- **Track Management**: Support for multiple tracks with easy switching via Shift commands.
- **Randomization**: The ability to randomize CV or Gate values with probability based on the selected step, allowing for generative musical patterns.
- **Octave Control**: Quick navigation through octaves for CV pitch entry.
- **Transport Controls**: Dedicated combinations for Play, Stop, and Pause.

## Development and Tooling

As a modern Rust-based embedded project, it utilizes the standard `cargo` ecosystem. The build process uses `cargo-embed` for flashing and debugging, targeting the `thumbv7m-none-eabi` architecture. The project configuration includes optimized profiles for both development and release, with a focus on code size and performance to fit within the 64KB Flash and 20KB RAM constraints of the STM32F103C8.
