---
title: Pomia-rs
summary: A Rust-based firmware project for the STM32F103C8T6 microcontroller using
  the RTIC framework. It demonstrates hardware integration including an ST7735 LCD,
  BME280 environmental sensor, and PWM-based audio generation.
slug: pomia-rs
codeUrl: https://github.com/VersBinarii/pomia-rs
star: 21
lastUpdated: '2021-01-05'
rtos: rtic
topics:
- arm
- blue-pill
- embedded
- embedded-graphics
- embedded-hal
- embedded-rust
- rtfm
- rtic
- rust
- stm32
- stm32f103
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rust-ir-thermometer-firmware
- stm32f4-rtic-playground
- pinetime-rs
- rust-embedded-examples
- b-l475e-iot01a-discovery-board-support-crate
- airgradient-pro-rust-firmware
---

# Exploring Rust for Embedded Systems with Pomia-rs

Pomia-rs is an experimental project designed to evaluate the efficacy of the Rust programming language in the context of embedded development. Specifically targeting the popular STM32F103C8T6 microcontroller (often found on "Blue Pill" boards), the project implements a feature-rich firmware stack that leverages modern Rust tooling and safety guarantees.

## The RTIC Framework

At the heart of Pomia-rs is the Real-Time Interrupt-driven Concurrency (RTIC) framework. RTIC provides a concurrency model for building real-time systems on Cortex-M microcontrollers. It ensures data race freedom at compile time and offers efficient interrupt-based scheduling. In this project, RTIC manages various system tasks, including handling hardware interrupts and coordinating access to shared resources like the display and sensors.

## Hardware Integration and Features

The project showcases a wide array of peripheral integrations, demonstrating how Rust's `embedded-hal` ecosystem facilitates hardware abstraction:

- **Visual Interface**: Using the `embedded-graphics` crate and an SPI-driven 128x160 ST7735 LCD display, the project implements a basic user interface. This UI supports multiple views and an edit mode for user interaction.
- **Environmental Sensing**: An I2C-based BME280 sensor is used to monitor temperature, humidity, and atmospheric pressure.
- **Audio Generation**: The firmware utilizes PWM (Pulse Width Modulation) to generate music, showcasing the use of hardware timers for real-time signal generation.
- **Input and Timing**: User input is handled via EXTI (External Interrupt) based buttons, while a Real-Time Clock (RTC) provides timekeeping functionality.

## Technical Architecture

The project is built upon the `stm32f1xx-hal`, which provides high-level abstractions over the STM32 hardware. The memory layout is strictly defined in `memory.x`, allocating 64KB of Flash and 20KB of RAM, typical for the STM32F103C8T6.

The use of the `heapless` crate is notable, as it allows for fixed-capacity data structures without requiring a dynamic memory allocator—a common requirement in high-reliability embedded systems. Additionally, the project uses `ufmt` for efficient, code-size-conscious string formatting.

## Development Environment

Pomia-rs is configured for a professional embedded workflow. It includes configuration files for OpenOCD and GDB, allowing for seamless flashing and on-chip debugging. The project's `Cargo.toml` is optimized for release builds, using `opt-level = "z"` to minimize binary size, which is critical when working with the limited flash memory of the target device.

By combining the safety of Rust with the performance of the RTIC framework, Pomia-rs serves as a practical example of how to build robust, maintainable firmware for ARM Cortex-M microcontrollers.
