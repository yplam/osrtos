---
title: STM32F407 Weather Clock & CMake Development Template
summary: A professional-grade bare-metal firmware project for STM32F407 microcontrollers,
  implementing a weather clock with ESP32C3 connectivity and ST7789 display support.
  It features a modern build system using CMake, Ninja, and GCC 13.2, providing a
  high-performance alternative to traditional embedded IDEs.
slug: stm32f407-weather-clock-cmake-development-template
codeUrl: https://github.com/MengMing-Embedded-STM32/WeatherClock_STM32f407zgt6
version: v1.0-bare-metal
lastUpdated: '2025-12-08'
rtos: cmsis
topics:
- freertos
- stm32
- weather-clock
isShow: false
createdAt: '2026-04-26T06:21:22+00:00'
updatedAt: '2026-04-26T06:21:22+00:00'
---

Developing for the STM32F407 series often involves navigating legacy IDEs and fragmented toolchains. This project provides a production-grade template specifically tailored for a Weather Clock application, designed to be extensible for any STM32F407xx project. It moves away from traditional Keil-based workflows in favor of a high-performance environment using GCC 13.2, Ninja, and VS Code.

### Project Overview

The core of the project is a weather clock that processes calendar and meteorological data. This information is typically retrieved through an ESP32C3 communication module and rendered on an ST7789 LCD screen. By utilizing the STM32 Standard Peripheral Library (SPL) alongside CMSIS, the project maintains a lightweight footprint while providing direct control over the hardware. It also integrates the cJSON library for efficient data parsing, which is essential for handling the JSON payloads typical of modern weather APIs.

### Modern Build System

One of the standout features is the robust build configuration. The project uses CMake 3.16+ to support single-repository, multi-project expansions. Key technical features include:

- **Cross-Compilation Toolchain**: Pre-configured for arm-none-eabi-gcc 13.2.
- **Ninja Build Support**: Enables lightning-fast compilation compared to traditional Makefiles.
- **IntelliSense Integration**: Automated `compile_commands.json` generation ensures that clangd provides perfect code completion and navigation.
- **One-Click Debugging**: Seamless integration with the Cortex-Debug extension for VS Code allows developers to compile, flash via OpenOCD, and start a debugging session with a single keypress (F5).

### Architecture and Hardware

The repository is structured logically to separate core system files from application logic. The `Drivers/` directory houses the CMSIS core and a streamlined version of the SPL, while the `User/` directory is the designated location for application-specific code. This modularity makes it easy to swap out the SPL for HAL or LL libraries if needed, or to integrate an RTOS like FreeRTOS, for which the template already provides structural support.

Targeting the STM32F407ZGT6 (Cortex-M4), the project is compatible with popular development boards from vendors like Wildfire (野火) and Punched Atom (正点原子). It includes specific configurations for external crystal frequencies (HSE_VALUE), which can be easily adjusted in the `Config.cmake` file to match different hardware layouts.

### Developer Experience

For developers looking to build reliable embedded systems, this project addresses common environmental pain points. It includes strict `.gitignore` rules to keep the repository clean, global UTF-8 configuration to prevent character encoding issues in commit messages, and guidance on using Zadig for WinUSB driver management with ST-Link. It serves as both a functional weather clock firmware and a solid foundation for professional, modern STM32 development.
