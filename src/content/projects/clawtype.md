---
title: Clawtype
summary: A Rust-embedded firmware for the SparkFun ProMicro RP2040 that implements
  a variant of the Chordite chorded keyboard. It leverages the Embassy async framework
  to provide HID keyboard and mouse functionality with support for IMU-based motion
  sensing and LCD displays.
slug: clawtype
codeUrl: https://github.com/akavel/clawtype
star: 63
version: has-usb-key
lastUpdated: '2025-05-13'
rtos: ''
libraries:
- u8g2
topics:
- keyboard
- rust-embedded
- wearable-computing
isShow: true
image: /202601/clawtype.webp
createdAt: '2026-01-20'
updatedAt: '2026-01-20'
relatedProjects:
- smart-keymap
- m5-keyboard-and-mouse-emulator
- rust-ir-thermometer-firmware
- pomia-rs
- puntero34-pointer-peripheral
- nimble-hid-keyboard-and-mouse-example-for-esp32
---

## Overview

Clawtype is an open-source, embedded firmware project written in Rust, designed specifically for the SparkFun ProMicro RP2040. It serves as a modern implementation of a chorded keyboard, specifically a variant of the [Chordite](http://chordite.com/) design. Unlike traditional keyboards where each key represents a single character, a chorded keyboard allows users to input characters or commands by pressing combinations of keys simultaneously, much like playing chords on a piano.

The project is not just a software repository; it is part of a complete hardware ecosystem that includes structural designs for 3D-printed parts, allowing users to build a wearable or handheld input device that functions as both a keyboard and a mouse.

## Technical Architecture

Clawtype is built using the modern Rust embedded ecosystem, prioritizing safety and concurrency. The core of the firmware is powered by the **Embassy** framework, an asynchronous RTOS-like runtime for embedded systems. This allows the firmware to handle multiple tasks—such as scanning key matrices, processing IMU data, updating a display, and managing USB communication—efficiently without the complexity of traditional manual state machines.

### Key Components:
- **Embassy RP**: Provides the hardware abstraction layer (HAL) for the RP2040 microcontroller, utilizing its dual-core ARM Cortex-M0+ architecture.
- **USB HID Support**: Using `embassy-usb` and `usbd-hid`, the device enumerates as a standard Human Interface Device (HID), making it plug-and-play compatible with Windows, macOS, Linux, and Android without requiring custom drivers.
- **Motion Sensing**: The project integrates the `mpu6050-dmp` library, enabling the device to use an InvenSense MPU6050 IMU for mouse cursor control through physical movement.
- **Visual Feedback**: Support for Nokia 5110 LCD displays is included, utilizing `embedded-graphics` and `u8g2-fonts` to provide users with status information or configuration menus.

## Chorded Input and Macros

The heart of Clawtype is its chord engine. The firmware maps specific combinations of finger positions to keystrokes. This approach allows for a full QWERTY-capable input system using only a handful of physical buttons. The repository includes dedicated modules for handling complex chord maps and macros, allowing for highly customizable input schemes that can be tailored to the user's ergonomic needs.

## Hardware and Design

While the firmware is the brain of the project, Clawtype is designed to be paired with specific 3D-printed ergonomics. The design focuses on a "claw" grip that fits the natural contours of the hand, making it suitable for mobile computing or accessibility use cases. The use of the SparkFun ProMicro RP2040 provides a compact form factor with sufficient I/O and processing power to handle the asynchronous requirements of the firmware.

## Getting Started

As a Rust project, Clawtype uses the standard `cargo` build system. It targets the `thumbv6m-none-eabi` architecture. Developers looking to customize the firmware can explore the `chords/` and `macros/` directories to define their own input logic. The project utilizes `defmt` for high-performance logging over RTT, which is essential for debugging real-time chord processing without significantly impacting timing.
