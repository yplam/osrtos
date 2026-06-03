---
title: RTIC Blinky for nRF52840
summary: A basic blinky application implemented for the nRF52840 microcontroller using
  the RTIC (Real-Time Interrupt-driven Concurrency) framework. It demonstrates hardware-driven
  LED toggling using the nRF52840's timer peripheral on the nRF52840-DK development
  kit.
slug: rtic-blinky-for-nrf52840
codeUrl: https://github.com/90degs2infty/rtic-blinky
star: 0
lastUpdated: '2023-07-11'
rtos: rtic
topics:
- nrf52
- nrf52840
- nrf52840-dk
- rtic
- rust
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32f429-rtic-and-smoltcp-example-application
- pinetime-rs
- blinky-pico-2-dual-core-bare-metal
- lpc43xx-freertos-led-blinking-example
- stm32f4-rtic-playground
- pico-rtic-template
---

## Overview

`rtic-blinky` is a foundational example project designed for the nRF52840-DK development kit. It serves as a practical implementation of the [RTIC (Real-Time Interrupt-driven Concurrency)](https://rtic.rs/2/book/en/) framework, specifically targeting the ARM Cortex-M architecture. The project demonstrates how to manage hardware peripherals and concurrency in a safe, efficient manner using Rust.

## Hardware and Functionality

The project is tailored for the Nordic Semiconductor nRF52840 SoC. Unlike a standard "delay-loop" blinky, this implementation is driven by the chip's internal timer peripheral. The logic is programmed to alternate between two onboard LEDs (LED1 and LED2). Each LED blinks twice before the system switches control to the other, providing a clear visual representation of the task switching and timing capabilities provided by the RTIC framework.

## Technical Stack

The project utilizes a modern Rust-based embedded stack, ensuring both memory safety and high performance:

- **RTIC 2.0**: A hardware-accelerated RTOS for ARM Cortex-M that provides a concurrency model based on priority-based preemptive scheduling.
- **nRF52840-HAL**: A Hardware Abstraction Layer that provides high-level APIs for interacting with the nRF52840's GPIO and timers.
- **defmt**: A highly efficient logging framework that minimizes the binary footprint and CPU overhead of serial debugging.
- **flip-link**: Used during the build process to provide zero-cost stack overflow protection by flipping the standard memory layout.

## Project Structure and Tooling

The repository is based on the `defmt-app-template`, which is the standard for modern Rust embedded development. It includes a specific `rust-toolchain.toml` targeting the nightly compiler to leverage the latest features in the embedded ecosystem. 

To facilitate a smooth development workflow, the project uses `probe-run` for flashing and immediate logging output. It also includes custom Cargo aliases, such as `rb` (run --bin), to simplify the execution of the blinky firmware. 

## Getting Started

To run the project, developers need the `flip-link` and `probe-run` utilities installed via Cargo. Once the repository is cloned, the application can be deployed to an attached nRF52840-DK using the following command:

```console
$ DEFMT_LOG=info cargo rb blinky
```

This command compiles the code, flashes the device, and opens a logging terminal where `defmt` messages are displayed in real-time, allowing for easy monitoring of the blink cycles and system state.
