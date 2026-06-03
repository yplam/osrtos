---
title: Rust for Arduino Portenta-H7
summary: A collection of Rust-based examples and a development environment for the
  Arduino Portenta-H7 board. It utilizes the RTIC (Real-Time Interrupt-driven Concurrency)
  framework and the stm32h7xx-hal to provide high-performance, memory-safe firmware
  for the STM32H747 microcontroller.
slug: rust-for-arduino-portenta-h7
codeUrl: https://github.com/gdobato/portenta-h7
star: 10
version: v0.4.0
lastUpdated: '2024-06-18'
rtos: rtic
topics:
- arm
- embedded
- portenta-h7
- portenta-h7-m7
- portentah7
- rtic
- rust
- stm32h747
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rust-embedded-examples
- stm32h743zi-rust-playground
- stm32-rtic-project-template
- stm32f4-rtic-playground
- b-l475e-iot01a-discovery-board-support-crate
- pico-rtic-template
---

## Overview

The Portenta-H7 project provides a comprehensive starting point for developers looking to leverage the Rust programming language on the Arduino Portenta-H7 hardware. While the Portenta-H7 is traditionally associated with the Arduino IDE and C++, this repository demonstrates how to build bare-metal applications using Rust's safety and performance features. 

The project targets the STM32H747XIHx SoC, specifically the high-performance ARM Cortex-M7 core. By using the Real-Time Interrupt-driven Concurrency (RTIC) framework, it offers a modern approach to embedded concurrency that is both efficient and memory-safe.

## Technical Architecture

The firmware is built upon a robust stack of Rust embedded crates:
- **RTIC (Real-Time Interrupt-driven Concurrency)**: A hardware-accelerated RTOS for Cortex-M microcontrollers that provides task scheduling and resource management with minimal overhead.
- **stm32h7xx-hal**: A hardware abstraction layer for the STM32H7 series, providing high-level APIs for GPIO, clocks, and peripherals.
- **defmt**: A highly efficient logging framework designed for resource-constrained devices, used here for real-time debugging over RTT (Real-Time Transfer).

One of the critical aspects of this project is its specific memory configuration. The `memory.x` linker script defines the complex memory layout of the STM32H7, including various SRAM banks (AXISRAM, SRAM1-4, BSRAM) and the specific entry point at `0x08040000`. This address is chosen to ensure compatibility with the standard Arduino bootloader, allowing users to flash the board without replacing the factory bootloader.

## Key Features

- **Multiple Flashing Methods**: Support for both USB-based flashing via DFU (using `dfu-util`) and professional debug probes like J-Link or ST-Link using `cargo-embed`.
- **USB Support**: Includes dependencies and examples for USB device functionality and serial communication.
- **Optimized Profiles**: Pre-configured release profiles using Link Time Optimization (LTO) and 'abort' on panic to minimize binary size and maximize performance.
- **Real-Time Debugging**: Integrated support for `probe-rs` and `defmt`, allowing for high-speed logging and stack-trace analysis during development.

## Getting Started

The repository is structured to be used with standard Rust embedded tools. To build and flash an example like the RTIC-based blinky, users can utilize custom cargo aliases provided in the project configuration. 

For DFU flashing, the process involves generating a binary and using `dfu-util` to target the specific memory address where the bootloader expects the application. For those using a debug probe, the `Embed.toml` configuration simplifies the process to a single command, handling the chip selection and RTT logging setup automatically.

```rust
// Example of the RTIC structure used in the project
#[rtic::app(device = stm32h7xx_hal::pac, dispatchers = [UART4])]
mod app {
    #[shared]
    struct Shared {}

    #[local]
    struct Local {}

    #[init]
    fn init(cx: init::Context) -> (Shared, Local) {
        // Initialize hardware and peripherals
        (Shared {}, Local {})
    }
}
```

This project serves as an excellent bridge for developers moving from the Arduino ecosystem into professional-grade bare-metal Rust development on high-end STM32 hardware.
