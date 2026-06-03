---
title: RP2040-FreeRTOS Template
summary: A comprehensive base project and demonstration suite for running FreeRTOS
  on the Raspberry Pi RP2040 microcontroller. It provides a structured environment
  for developing embedded applications with the Raspberry Pi Pico SDK, featuring examples
  for task scheduling, inter-task communication, and hardware interrupts.
slug: rp2040-freertos-template
codeUrl: https://github.com/smittytone/RP2040-FreeRTOS
siteUrl: https://blog.smittytone.net/2022/02/24/how-to-use-freertos-with-the-raspberry-pi-pico/
star: 144
version: 1.6.0
lastUpdated: '2025-08-25'
rtos: freertos
topics:
- freertos
- pico
- raspberry-pi
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- raspberry-pi-pico-freertos-sample-application
- pico-rtic-template
- pico-zephyr-project
- rp2040-projects-by-armstrong-subero
- cmsis-rp2040
- wiznet-freertos-sdk-for-raspberry-pi-pico-ethernet
---

The RP2040-FreeRTOS project serves as a robust starting point for developers looking to leverage the power of a Real-Time Operating System on the Raspberry Pi RP2040 microcontroller. By integrating the FreeRTOS kernel with the Raspberry Pi Pico SDK, this repository provides a ready-to-use template that simplifies the initial setup of multi-threaded embedded applications.

## Project Architecture and Applications

This repository is organized into several distinct applications, each demonstrating different facets of FreeRTOS functionality. This modular approach allows developers to see practical implementations of RTOS primitives before building their own custom logic.

### Core Template Application
Written in C, the primary template provides a foundational example of inter-task communication. It implements a simple flip-flop mechanism using the on-board LED and an external GPIO-connected LED. One task manages the board LED's state and sends updates to a FreeRTOS queue (`xQueue`), while a second task monitors the queue to synchronize the external LED. This demonstrates the basic pattern of decoupled task execution and safe data passing.

### Advanced Demonstrations
Beyond the basic template, the project includes several C++ applications that explore more complex scenarios:

- **Scheduling Demo**: This application integrates external hardware, specifically an MCP9808 temperature sensor and an HT16K33-based LED display, to showcase how FreeRTOS manages multiple tasks with different priorities and timing requirements.
- **IRQ Demo**: Building on the scheduling example, this app demonstrates the integration of hardware interrupts (IRQs) with FreeRTOS. It uses the temperature sensor to trigger interrupts, which then interact with the RTOS via semaphores or task notifications.
- **Software Timers**: A dedicated application introduces FreeRTOS software timers, showing how to manage timed events without requiring additional hardware peripherals.

## Technical Implementation

The project utilizes a modern CMake-based build system, making it compatible with various development environments. It includes workspace configurations for both Visual Studio Code and Xcode. The build process is designed to be flexible, supporting both Debug and Release configurations. In Debug mode, the system enables UART-based debugging code, which is optimized out in Release builds to improve performance.

To ensure compatibility with the latest hardware, the template has been updated for Pico SDK 2.2.0. It supports both the original RP2040 and the newer RP2350-based Pico 2 boards through the use of environment variables like `PICO_BOARD`.

## Getting Started

The repository is designed to be cloned and used immediately. Because it relies on submodules for the FreeRTOS kernel and the Pico SDK, users must initialize these components during the setup process. The included `deploy.sh` script further streamlines the workflow by handling the build and deployment of `.uf2` files to the target device. 

Whether you are building a simple sensor node or a complex control system, this template provides the necessary scaffolding—including a pre-configured `FreeRTOSConfig.h`—to get your RP2040 project running with a professional RTOS architecture.
