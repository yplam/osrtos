---
title: 'rttrust: Rust Wrapper for RT-Thread'
summary: A Rust language wrapper and binding for the RT-Thread real-time operating
  system. It provides idiomatic Rust APIs for kernel objects, threads, timers, and
  IPC mechanisms, specifically targeting STM32F4 series microcontrollers.
slug: rttrust-rust-wrapper-for-rt-thread
codeUrl: https://github.com/tcz717/rttrust
star: 10
lastUpdated: '2020-08-31'
rtos: rt-thread
topics:
- embedded
- rt-thread
- rust
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rust-support-for-rt-thread
- freertos-rust
- b-l475e-iot01a-discovery-board-support-crate
- selfe-sys-rust-bindings-for-sel4
- freertos-wrapper-for-rt-thread
- ferros
---

## Overview

rttrust is a specialized Rust wrapper designed for the [RT-Thread](https://github.com/RT-Thread/rt-thread) real-time operating system. By providing a bridge between Rust's safety guarantees and RT-Thread's robust kernel, rttrust enables developers to write embedded firmware using modern Rust tooling while leveraging the extensive features of the RT-Thread ecosystem. 

The project focuses on creating a safe and ergonomic interface for core RTOS functionalities, allowing for more reliable embedded development on supported hardware platforms like the STM32F4xx series.

## Key Features and Supported APIs

rttrust provides coverage for several essential RT-Thread kernel components. The project is actively mapping C-based RT-Thread APIs into Rust structures, with current support including:

- **Kernel Objects**: Fundamental management of RT-Thread system objects.
- **Threading and Timers**: Idiomatic Rust interfaces for creating and managing threads and system timers.
- **Inter-Thread Communication (IPC)**: Support for critical sections via spin locks (`rt_enter_critical`), semaphores, and mutexes. Work is ongoing to expand this to events, mailboxes, and message queues.
- **Device Management**: Capabilities for device registration and access, facilitating interaction with hardware peripherals.
- **Advanced Rust Integration**: The project includes a custom allocator and support for standard Rust macros like `print!` and `println!`, making the development experience feel closer to standard Rust environments.

## Technical Implementation

The project utilizes `bindgen` during the build process to generate FFI (Foreign Function Interface) bindings directly from the RT-Thread header files. This ensures that the Rust wrappers stay synchronized with the underlying C implementation. The build system is configured via `build.rs`, which handles the complexity of cross-compilation for ARM Cortex-M targets.

rttrust is designed for `no-std` environments, making it suitable for bare-metal execution where a standard library is not available. It specifically targets the `thumbv7em-none-eabihf` architecture, which corresponds to ARM Cortex-M4F processors found in the STM32F4 family.

## Requirements and Getting Started

To use rttrust, developers need a specific toolchain setup tailored for embedded Rust development:

- **Rust Nightly**: Required for certain unstable features used in the wrapper.
- **Target**: The `thumbv7em-none-eabihf` target must be installed via rustup.
- **External Tools**: `libclang` is required for `bindgen` to parse C headers, and `gcc-arm-none-eabi` is needed for the underlying cross-compilation tasks.

Configuration of the RTOS kernel is handled through a standard `rtconfig.h` file, allowing developers to enable or disable RT-Thread components such as the FinSH shell, device drivers, or specific memory management schemes (like `RT_USING_SMALL_MEM` or `RT_USING_HEAP`) just as they would in a traditional C project.
