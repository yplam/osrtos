---
title: RT-Thread BSP for MH1903X
summary: A Board Support Package (BSP) for the Megahunt MH1903X series of security
  chips, enabling the RT-Thread real-time operating system. It provides drivers for
  essential on-chip peripherals including GPIO, UART, RTC, and PWM, along with support
  for the Flash Abstraction Layer (FAL) and OTA updates.
slug: rt-thread-bsp-for-mh1903x
codeUrl: https://github.com/fanwenl/RTT_MH1903
star: 10
lastUpdated: '2022-06-29'
rtos: rt-thread
topics:
- bootloader
- mh1903
- rt-fota
- rt-thread
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rt-thread-bsp-for-stm32f407vet6
- stm32l475-pandora-board-bsp-for-rt-thread
- iotsharp-pandora-stm32l475-bsp
- bsp-for-wireless-tag-wt32-sc01-plus-sc01-esp-idf-5-x-lvgl-9-x
- dhtxx-sensor-driver-for-rt-thread
- stm32-m-nuttx-custom-board-mod
---

## Overview

The RTT_MH1903 project is a comprehensive Board Support Package (BSP) designed to run the RT-Thread real-time operating system on the Megahunt MH1903X series of microcontrollers. Specifically targeting the MH1903S, this project leverages the chip's SC300 security core—a high-performance architecture capable of running at speeds up to 204MHz. 

The MH1903X series is notable for its focus on security and financial applications, featuring hardware-accelerated encryption modules for DES, TDES, AES, RSA, ECC, and SHA algorithms. This BSP provides the necessary glue code and drivers to bring the RT-Thread ecosystem to this specialized hardware, making it suitable for secure IoT devices and financial terminal equipment.

## Key Features and Peripheral Support

This BSP currently supports a robust set of on-chip peripherals, allowing developers to interact with the hardware through standard RT-Thread device interfaces. Supported features include:

- **GPIO**: Full support for pin management.
- **UART**: Support for all four hardware serial ports (UART0/1/2/3).
- **RTC**: Real-Time Clock support utilizing both external crystals and internal low-speed clocks.
- **WDT & PWM**: Watchdog timer for system reliability and Pulse Width Modulation for control applications.
- **Flash Management**: Integrated support for the Flash Abstraction Layer (FAL), facilitating complex partition management and wear leveling.

## Security and OTA Capabilities

Given the security-centric nature of the MH1903X, the project includes several specialized packages to enhance its capabilities. It integrates `tinycrypt` for software-based cryptographic operations and utilizes `rt-fota` for robust Firmware-Over-The-Air updates. The inclusion of compression libraries like `fastlz` and `quicklz` allows for efficient firmware storage and transmission during the update process.

The project structure includes a dedicated bootloader directory, providing a complete solution from secure startup to application execution. The bootloader supports firmware signature verification, ensuring that only authorized code runs on the device.

## Technical Implementation

The project is built on RT-Thread version 4.1.0. It utilizes the standard RT-Thread build system, offering flexibility for developers across different environments. It includes:

- **MDK5 (Keil)**: Ready-to-use project files (`project.uvprojx`) for developers preferring the ARM Keil environment.
- **SCons**: A Python-based build system for command-line compilation and automated CI/CD pipelines.
- **FAL Partitioning**: A pre-configured partition table that defines areas for the bootloader, application code, font data, download buffers, and file systems.

## Getting Started

To begin development, users can open the provided Keil MDK5 project files located in the root directory for the main application or within the `bootloader/mdk` directory for the bootloader. Alternatively, the project provides batch scripts (`build_app.bat`, `rebuild_app.bat`) for quick command-line builds. 

Upon successful compilation and flashing, the system provides a diagnostic output via the serial console (115200-8-1-N), initializing the Flash Abstraction Layer and launching the RT-Thread FinSH shell, where users can interact with the system in real-time.
