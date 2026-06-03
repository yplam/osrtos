---
title: STM32F4 RTIC Playground
summary: A development playground for the Black Pill STM32F411CE microcontroller using
  the RTIC (Real-Time Interrupt-driven Concurrency) framework in Rust. It demonstrates
  hardware integration with OLED displays, USB serial/HID communication, and various
  embedded peripherals using the stm32f4xx-hal.
slug: stm32f4-rtic-playground
codeUrl: https://github.com/alexxy/stm32f4-rtic-playground
star: 0
lastUpdated: '2023-11-22'
rtos: rtic
topics:
- embedded
- embedded-hal
- embedded-rust
- rtic
- rust
- stm32f4
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32h743zi-rust-playground
- rust-embedded-examples
- stm32f429-rtic-and-smoltcp-example-application
- rust-for-arduino-portenta-h7
- pomia-rs
- b-l475e-iot01a-discovery-board-support-crate
---

## Overview

The stm32f4-rtic-playground is a Rust-based firmware project designed for the popular "Black Pill" development board, which features the STM32F411CE microcontroller. This repository serves as a practical implementation of the Real-Time Interrupt-driven Concurrency (RTIC) framework, showcasing how to build efficient, safe, and concurrent embedded applications in Rust.

## Technical Stack

The project leverages the modern Rust embedded ecosystem to provide a robust development environment. At its core is the **RTIC framework**, which provides a hardware-accelerated task scheduler that ensures data-race-free execution and efficient interrupt handling. 

Key components of the stack include:
- **stm32f4xx-hal**: A hardware abstraction layer for the STM32F4 family of microcontrollers.
- **defmt**: A highly efficient logging framework designed for resource-constrained devices, used here for real-time debugging.
- **USB Support**: Integration of `usb-device` along with `usbd-serial` and `usbd-hid`, allowing the Black Pill to act as a serial device or a Human Interface Device.
- **Display Integration**: Support for SSD1306 OLED displays via the `ssd1306` crate and the `embedded-graphics` library.

## Key Features

This playground demonstrates several advanced embedded concepts:

- **Concurrency with RTIC**: Utilizing the RTIC monotonic timers and task prioritization to manage multiple hardware events without the overhead of a traditional RTOS kernel.
- **USB Connectivity**: Implementation of USB stacks for communication and control, making it easier to interface the microcontroller with a host PC.
- **Peripheral Interfacing**: Examples of using I2C for displays, GPIO management, and shared bus access using `shared-bus-rtic` to allow multiple tasks to safely access the same hardware bus.
- **Mathematical Utilities**: Integration of `micromath` for efficient fixed-point or floating-point operations and `heapless` for static memory management, avoiding the need for a dynamic heap.

## Hardware Target

The project is specifically tailored for the **STM32F411CEU6 Black Pill**. This board is favored in the hobbyist and prototyping community for its small form factor, high performance (100MHz Cortex-M4), and affordable price point. The memory layout is configured via `memory.x`, defining 512KB of Flash and 128KB of RAM, ensuring the linker places code and data correctly for this specific MCU.

## Getting Started

As a Rust project, it utilizes the standard Cargo build system. The configuration in `.cargo` and `Cargo.toml` is set up for cross-compilation to the `thumbv7em-none-eabihf` target. Developers can use `probe-rs` or `cargo-embed` to flash the firmware and view `defmt` logs in real-time. The inclusion of `panic-probe` ensures that if the system encounters a critical error, the stack trace is printed over the debug interface before the system halts.
