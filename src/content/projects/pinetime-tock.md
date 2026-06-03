---
title: PineTime Tock
summary: An out-of-tree port of the Tock operating system to the PineTime smart watch.
  It enables the execution of Tock's secure, Rust-based kernel on the nRF52832 hardware,
  supporting development and debugging via JLink.
slug: pinetime-tock
codeUrl: https://github.com/JayKickliter/pinetime-tock
siteUrl: https://www.tockos.org
star: 3
lastUpdated: '2020-03-30'
rtos: tock
topics:
- embedded-rust
- pine64
- pinetime
- smart-watch
- tock
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- pinetime-rs
- tock-for-stm32
- pinetime-zephyr-firmware
- wasp-os
- infiniemu
- infinitime
---

The PineTime Tock project provides an out-of-tree port of the Tock operating system specifically tailored for the Pine64 PineTime smart watch. Tock is a modern operating system designed for running multiple untrusted applications on low-power microcontrollers, leveraging the memory safety features of the Rust programming language. This port allows developers to utilize Tock's unique architecture—which separates the kernel from user-level applications—on a wearable platform.

The PineTime hardware is built around the Nordic Semiconductor nRF52832 SoC, featuring an ARM Cortex-M4 processor. By porting Tock to this device, the project enables a secure environment where drivers and the kernel are written in Rust, while applications can be developed in C or Rust with hardware-level isolation.

## Development and Debugging

The repository includes the necessary board definitions and scripts to facilitate a standard Tock development workflow. Building the kernel is handled through a Makefile interface within the `board/pinetime` directory. For developers looking to troubleshoot or inspect system behavior, the project provides integrated support for JLink debugging.

Standard debugging procedures involve:
- Compiling the kernel with debug symbols using the provided Makefile.
- Launching a JLink GDB server in a separate shell.
- Connecting via `arm-none-eabi-gdb` or the `cgdb` text user interface for a more interactive experience.

## Hardware Resources

To assist with development, the project references essential PineTime documentation, including official schematics and port assignments. These resources are critical for developers writing new drivers or interacting with the watch's peripherals—such as the display, heart rate sensor, or accelerometer—within the Tock kernel environment. The port assignment documentation is particularly useful for mapping the nRF52832 GPIOs to the specific hardware components of the watch.

## Project Structure

The repository is organized to maintain a clean separation between the kernel and userland, following the standard Tock "out-of-tree" development pattern:
- **board/**: Contains the PineTime-specific board support package (BSP) and kernel configuration.
- **tock/**: The core Tock OS source code, typically managed as a submodule.
- **libtock-c/**: The C library used for developing user-space applications that run on top of the Tock kernel.
- **scripts/**: Utility scripts for flashing, starting GDB servers, and debugging the hardware.

This architecture allows the PineTime port to evolve independently of the main Tock repository while still leveraging the core kernel's security and concurrency features.
