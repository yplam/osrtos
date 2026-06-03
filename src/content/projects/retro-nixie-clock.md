---
title: Retro Nixie Clock
summary: A Rust-based Nixie clock firmware for the STM32F103 'BluePill' microcontroller
  using the RTIC framework. It drives Nixie valves via a BCD-to-decimal decoder and
  provides a secondary display on an I2C OLED, utilizing the STM32's internal RTC
  for timekeeping.
slug: retro-nixie-clock
codeUrl: https://github.com/VersBinarii/retro-clock
star: 3
lastUpdated: '2022-04-07'
rtos: rtic
topics:
- clock
- cortex-m
- embedded
- embedded-hal
- embedded-rust
- nixie-tubes
- rtc
- rtic
- rust
- stm32f103
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- pinetime-rs
- pomia-rs
- iv-11-vfd-tube-clock
- rust-ir-thermometer-firmware
- esphome-for-nixie2
- elekstube-ips-custom-firmware
---

## Overview

The Retro Clock project is a modern firmware implementation for a classic Nixie tube display, built using the Rust programming language. It targets the popular STM32F103 "BluePill" development board, leveraging the Real-Time Interrupt-driven Concurrency (RTIC) framework to manage hardware tasks with high efficiency and safety. 

By combining the aesthetic appeal of vintage Nixie valves with the reliability of modern ARM Cortex-M microcontrollers, this project serves as both a functional timepiece and a demonstration of embedded Rust capabilities. The system manages timekeeping through the STM32's internal Real-Time Clock (RTC) peripheral and provides a user interface for time adjustment via physical buttons.

## Hardware Architecture

The system is designed around a specific hardware stack to bridge the gap between low-voltage logic and high-voltage Nixie tubes:

- **Microcontroller**: STM32F103C8T6 (BluePill), providing the processing power and RTC peripheral.
- **Nixie Driver**: A 74LS145 BCD-to-decimal decoder is used to drive the Nixie valves, allowing the microcontroller to control the digits using a binary-coded decimal interface.
- **Secondary Display**: A small I2C-based OLED screen (SSD1306) provides a digital readout of the time and system status, complementing the Nixie display.
- **Sensors**: The project includes support for the BME280 sensor, likely for environmental monitoring (temperature/humidity/pressure) alongside the time display.

## Software Implementation

The firmware is written entirely in Rust, taking advantage of the `stm32f1xx-hal` for hardware abstraction and `embedded-graphics` for managing the OLED output. The use of the RTIC framework ensures that time-sensitive tasks, such as updating the display and handling user input, are managed through a robust priority-based interrupt system.

### User Interface and Operation

The clock features a straightforward physical interface for time management:
- **Edit Mode**: A long press on the 'Ok' button enters the configuration mode.
- **Digit Selection**: Once in edit mode, short presses on the 'Ok' button cycle through the available digits.
- **Adjustment**: 'Left' and 'Right' buttons are used to increase or decrease the value of the selected digit.
- **Confirmation**: A final long press on the 'Ok' button saves the new time to the RTC.

## Technical Configuration

The project is configured for the STM32F103C8T6's memory layout, specifically targeting 64KB of Flash and 20KB of RAM. The build process is managed via Cargo, with release profiles optimized for size (`opt-level = "z"`) and single codegen units to ensure the smallest possible binary footprint for the embedded target. Debugging and programming are facilitated through OpenOCD configurations for ST-Link v2 interfaces.
