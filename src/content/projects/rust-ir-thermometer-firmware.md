---
title: Rust IR Thermometer Firmware
summary: A Rust-based firmware for an infrared thermometer utilizing the STM32L151CBT6
  microcontroller and the MLX90614 sensor. It leverages the RTIC framework for real-time
  task management and supports features like data logging to EEPROM, LCD display,
  and UART streaming.
slug: rust-ir-thermometer-firmware
codeUrl: https://github.com/geomatsi/rust-ir-thermo
star: 11
version: v0.1
lastUpdated: '2020-08-28'
rtos: rtic
topics:
- embedded-rust
- firmware
- rtic
- rust
- stm32l151
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- pomia-rs
- airgradient-pro-rust-firmware
- stm32f103-thermometer-and-data-logger
- pinetime-rs
- sensilo-ble-sensor-node
- b-l475e-iot01a-discovery-board-support-crate
---

## Overview

This project provides a robust Rust-based firmware for an infrared thermometer built around the STM32L151CBT6 microcontroller and the MLX90614 IR sensor. Designed for reliability and efficiency, the firmware utilizes the Real-Time Interrupt-driven Concurrency (RTIC) framework to manage hardware interactions and user interface tasks. The system features a multi-mode menu system, data persistence via EEPROM, and an LCD for real-time feedback.

## Hardware Architecture

The system is built on the STM32L1 series (Cortex-M3), chosen for its low-power capabilities. The hardware design includes:

- **MLX90614**: An infrared thermometer for non-contact temperature measurements.
- **AT24 EEPROM**: Used for storing measurement sessions and configuration.
- **HD44780 LCD**: Provides a visual interface for the user.
- **I2C Bus Sharing**: Both the EEPROM and the IR sensor share the I2C1 bus, managed safely using the `shared-bus-rtic` crate.
- **Power Management**: Includes a battery voltage monitor with a red LED indicator for low voltage (below 2.5V) and a green heartbeat LED.

One notable hardware constraint is the absence of JTAG/SWD connectors; the firmware is instead loaded using the STM32 serial bootloader via UART.

## Software Implementation

The firmware is written entirely in Rust, taking advantage of the language's safety guarantees and the `embedded-hal` ecosystem. The core of the application is the RTIC framework, which provides a prioritized task-based concurrency model. This ensures that time-critical operations, such as sensor polling or watchdog feeding, occur with minimal latency.

Key software components include:
- **Drivers**: Specialized crates for the HD44780 LCD, MLX90614 sensor, and AT24 EEPROM.
- **Watchdog**: An independent watchdog is implemented to automatically reboot the system in the event of a software lockup.
- **I2C Flexibility**: The project supports both hardware I2C and a software bit-banging implementation, selectable via Cargo features (`i2c_hw` or `i2c_bb`).

## User Interface and Operating Modes

The device features a single-button interface where navigation is handled through short presses and selection through long presses. The firmware supports several sophisticated operating modes:

- **Shot & ShortMem**: Single measurements, with the option to save results to EEPROM.
- **Cont & ContMem**: Continuous measurements at 1-second intervals, with optional EEPROM logging.
- **View & Stream**: Allows the user to review stored measurements on the LCD or stream them over UART for external processing and scripting.
- **Battery**: A dedicated mode for checking the current battery voltage.

## Development and Tooling

To accommodate the UART-only programming method, the project includes a custom Cargo runner. This script automates the generation of `ihex` binaries using `cargo-binutils` and handles the flashing process via `stm32flash`. Developers can also utilize `cargo-bloat` and `cargo-size` to monitor the firmware's memory footprint, which is critical for maintaining the 128KB Flash and 16KB RAM constraints of the STM32L151CBT6.
