---
title: Zephyr GRBL
summary: A port of the GRBL CNC firmware to the Zephyr RTOS, targeting STM32 microcontrollers
  like the STM32F405RG. It extends the original GRBL functionality with features such
  as software CDC ACM serial support, SD card integration, and TMC2130 stepper driver
  compatibility.
slug: zephyr-grbl
codeUrl: https://github.com/iwasz/zephyr-grbl
siteUrl: https://hackaday.io/project/177237-corexy-pen-plotter
star: 14
lastUpdated: '2023-07-04'
rtos: zephyr
libraries:
- mcuboot
topics:
- cnc
- grbl
- stm32
- zephyr
- zephyr-rtos
- zephyros
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- smoothieware-for-stm32
- micro-ros-module-for-zephyr
- klipper-esp32
- cannectivity
- bitcraze-crazyflie-2-0-2-1-mbed-os-firmware
- blue-clover-plt-demo-v2-zephyr-firmware
---

## Overview

Zephyr GRBL is a specialized port of the popular GRBL CNC firmware to the Zephyr Real-Time Operating System. Originally developed for a CoreXY pen plotter, this project leverages Zephyr's hardware abstraction layers to run GRBL on more powerful 32-bit microcontrollers, specifically targeting the STM32F4 series. By moving away from the traditional 8-bit AVR architecture, the project gains access to advanced features like software CDC ACM serial ports, SD card support for standalone operation, and modern stepper driver integration.

## Key Features and Capabilities

The port maintains the core motion control logic of GRBL while introducing several enhancements enabled by the Zephyr ecosystem:

- **Broad Hardware Support**: While primarily tested on the STM32F405RG and STM32F446RE, the use of Zephyr's device tree and driver model makes it portable to other STM32 variants with minimal configuration changes.
- **Integrated Storage**: Support for SD cards over SPI using Zephyr's disk access and FAT file system modules.
- **Advanced Stepper Control**: Integration with TMC2130 stepper drivers, including support for SPI-based configuration.
- **User Interface**: Support for SSD1306-based OLED displays to provide status updates and feedback.
- **USB Connectivity**: Implementation of a software CDC ACM serial port, allowing the device to appear as a standard COM port without dedicated USB-to-serial hardware.

## Technical Implementation

One of the most significant technical hurdles in porting GRBL to Zephyr was the timing-critical nature of stepper pulse generation. The project introduces a custom `hw_timer` module, derived from Zephyr's PWM driver. This module is designed to fire callbacks on timer update events, providing the high-precision interrupts required for the Bresenham line algorithm used in GRBL's motion control.

To ensure compatibility with Zephyr's scheduler, the main GRBL loop was modified to include `k_yield()` calls. This allows lower-priority threads, such as logging, shell access, and USB management, to execute without interfering with the high-priority motion control tasks. The project also utilizes Zephyr's NVS (Non-Volatile Storage) for settings and the Interrupt UART API for efficient communication.

## Porting Details

The porting process involved several key modifications to the original GRBL source:
- Adding `extern "C"` blocks to headers to support C++ interoperability.
- Mapping AVR-specific GPIO register code to Zephyr's GPIO API.
- Implementing a custom PWM-to-timer callback bridge for step generation.
- Porting EEPROM logic to Zephyr's NVS system.
- Adapting the UART code to use Zephyr's ring buffers and interrupt-driven APIs.

## Getting Started

The project follows the standard Zephyr build workflow using `west`. It is configured to build for the `plotter_f405rg` board definition provided in the repository. Users can communicate with the firmware using standard G-code senders or via the integrated shell. Example commands for unlocking the machine ($X), homing, and performing manual jogs are supported, making it a functional base for various CNC and plotter applications.
