---
title: Pico RTIC Template
summary: A Rust-based project template for the Raspberry Pi Pico (RP2040) using the
  Real-Time Interrupt-driven Concurrency (RTIC) framework. It provides a pre-configured
  environment with advanced debugging tools and examples for timer-based tasks and
  GPIO interrupts.
slug: pico-rtic-template
codeUrl: https://github.com/adoble/pico-rtic-template
star: 2
lastUpdated: '2023-01-18'
rtos: rtic
topics:
- embedded
- pico
- rtic
- rust
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32-rtic-project-template
- rp2040-freertos-template
- rust-embedded-examples
- rust-for-arduino-portenta-h7
- stm32h743zi-rust-playground
- stm32f4-rtic-playground
---

## Overview

The Pico RTIC Template provides a streamlined starting point for developers building Rust applications on the Raspberry Pi Pico (RP2040) using the Real-Time Interrupt-driven Concurrency (RTIC) framework. RTIC is a hardware-accelerated multitasking framework that enables highly efficient, low-latency, and memory-safe embedded applications by leveraging the ARM Cortex-M nested vectored interrupt controller (NVIC).

This template simplifies the initial setup by integrating essential tools from the `knurling-rs` ecosystem. It includes `defmt` for highly efficient logging, `panic-probe` for debugging panics over RTT, and `flip-link` for stack overflow protection. These tools collectively enhance the developer experience, making it easier to monitor and debug firmware in real-time without the overhead of traditional serial logging.

## Core Functionality

The template comes with a functional example that demonstrates two fundamental embedded patterns:
- **Timer-based Tasks**: The on-board LED (GPIO 25) is toggled using a hardware timer, showcasing RTIC's ability to schedule periodic tasks with precise timing.
- **Interrupt Handling**: The system is configured to process an external interrupt when GPIO 17 is pulled low (e.g., via a push button). This demonstrates the framework's reactive nature and its efficient management of hardware interrupts.

## Integrated Tooling and Workflow

One of the primary advantages of this template is its pre-configured build and debug environment. It utilizes `probe-run` as the default runner, allowing developers to flash and debug their code with a single `cargo run` command. The project is also compatible with `elf2uf2-rs` for those who prefer flashing via the RP2040's USB bootloader mode.

For debugging, the template supports CMSIS-DAP probes. A unique feature of the RP2040 ecosystem is the ability to use a second Raspberry Pi Pico as a debug probe, and this template provides guidance on setting up such a configuration using firmware like DapperMime or rust-dap. This makes professional-grade debugging accessible without requiring expensive external hardware.

## Technical Configuration

The project is structured to ensure safety and performance. The `memory.x` file defines the RP2040's memory layout, while the `Cargo.toml` manifest includes dependencies for the `rp-pico` board support package (BSP) and the `cortex-m-rtic` framework. The build profile is optimized for performance even in debug mode, ensuring that timing-sensitive RTIC tasks behave predictably during development.

Developers can easily customize logging verbosity via the `DEFMT_LOG` environment variable, allowing for granular control over the information streamed from the device. This makes the template suitable for both rapid prototyping and more complex system development where performance and safety are paramount.
