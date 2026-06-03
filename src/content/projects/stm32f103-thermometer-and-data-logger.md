---
title: STM32F103 Thermometer and Data Logger
summary: Firmware for STM32F103 microcontrollers that measures temperature using DS18B20
  sensors and logs data to flash memory. It features an OLED display interface, RTC
  support, and a custom UI menu system built on the CMSIS framework.
slug: stm32f103-thermometer-and-data-logger
codeUrl: https://github.com/alexeychurchill/Thermometer
star: 1
lastUpdated: '2021-03-28'
rtos: cmsis
topics:
- 1-wire
- cmsis
- cortex-m3
- ds18b20
- ssd1306
- stm32f103
- thermometer
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rust-ir-thermometer-firmware
- stm32-pid-temperature-control-implementation
- ryattn-audio-relay-attenuator
- stm32f103-cmsis-libraries-and-projects
- openept-energy-profiler-probe-firmware
- stm32-weather-station
---

## Overview

The Thermometer project is a specialized firmware designed for the STM32F103 microcontroller, a popular ARM Cortex-M3 platform. Its primary objective is to provide a reliable system for measuring ambient temperature, displaying it in real-time, and logging historical data to non-volatile flash memory for later analysis. The project is structured to be more than just a simple sensor reader, incorporating a full user interface and planned USB connectivity for data retrieval.

## Hardware and Interfacing

The system is built around the STM32F103xB series. For temperature sensing, it utilizes the DS18B20 digital thermometer, interfaced via a custom 1-Wire driver. The project includes a dedicated 1-Wire implementation for STM32, which handles the timing-sensitive communication required by the protocol. 

Visual output is handled by an OLED display. The display logic is modular, supporting various screens such as initialization, real-time temperature monitoring, time display, and a settings menu. The project also includes support for a Real-Time Clock (RTC) to ensure that temperature logs are accurately timestamped.

## Software Architecture

The firmware is structured as a bare-metal application leveraging the CMSIS (Cortex Microcontroller Software Interface Standard) for hardware abstraction. The source code is organized into several logical layers:

- **Drivers**: Low-level interfaces for I2C, UART, 1-Wire, and the DS18B20 sensor.
- **UI Layer**: A sophisticated UI stack including a menu system, text rendering, and a mode dispatcher that manages transitions between different screens (e.g., temperature view, time view, and settings).
- **System Services**: Modules for RTC management, timekeeping, and a polling timer for task scheduling.

## Data Logging and USB Integration

A core feature of the device is its logging capability. The firmware is designed to record temperature data at specific intervals into flash memory (targeting W25Q series chips). 

One of the most ambitious aspects of the project is the planned USB integration. The developer intends to implement a USB Mass Storage Class (MSC) interface with FAT16 emulation. This would allow the device to appear as a standard USB drive when connected to a PC, enabling users to download temperature logs as files without needing specialized driver software or custom protocols.

## Build System and Tooling

The project uses CMake, providing a cross-platform build environment compatible with modern IDEs like CLion. A unique aspect of the build process is the integration of a Python-based font generation utility (`SSD1306Fnt`). This tool converts TrueType fonts into C-header files during the build process, allowing for customized typography on the OLED screen, including support for Cyrillic characters and specific glyph heights for better readability.
