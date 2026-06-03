---
title: Embedded Graphical Interface for PID Control
summary: A real-time PID control system for DC motors featuring a graphical user interface
  built with LVGL. It runs on the STM32F746G-Discovery board using FreeRTOS for task
  management and CMSIS DSP for control logic.
slug: embedded-graphical-interface-for-pid-control
codeUrl: https://github.com/JON95Git/pid-stm32f746
star: 42
lastUpdated: '2022-06-21'
rtos: freertos
libraries:
- lvgl
topics:
- freertos
- lvgl
- pid-control
- stm32
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- lvgl-demo-embarcadores
- stm32l476g-discovery-rtos-sensor-project
- azurertos-dual-core-implementation-for-stm32h747
- elevourer-portable-intelligent-electronic-load
- reflow-oven-with-micropython-lvgl
- stm32-pid-temperature-control-implementation
---

## Overview

This project implements a sophisticated embedded graphical interface for PID (Proportional-Integral-Derivative) control, specifically designed to regulate the speed of a DC motor. Developed for the STM32F746G-Discovery board, the application provides a user-friendly way to interact with control loops that are typically managed via command-line interfaces or hard-coded values.

The system leverages the high-performance ARM Cortex-M7 core of the STM32F746G to handle both the real-time control calculations and a rich, multi-screen graphical user interface. By combining a real-time operating system with modern graphics libraries, it demonstrates a complete solution for industrial-style control monitoring.

## Key Features

The application is divided into three primary functional screens, each serving a specific role in the control process:

*   **Parameter Tuning Screen**: Allows users to update or clear PID variables (Kp, Ki, Kd) and define the target setpoint through interactive buttons and controls.
*   **System Monitor**: Provides real-time widgets to monitor input and output values, specifically the PWM duty cycle sent to the MOSFET driver and the current RPM of the motor.
*   **Data Visualization**: Features a dynamic graph to visualize system performance and stability over time.

## Technical Implementation

The project is built on a robust software stack designed for high-performance embedded systems:

*   **FreeRTOS**: Manages the multi-threaded environment, ensuring that the PID control loop maintains high priority and timing accuracy while the GUI remains responsive.
*   **LVGL (Light and Versatile Graphics Library)**: Used to create the graphical interface. The project utilizes version 7.0, taking advantage of its widgets, themes, and hardware acceleration support for the STM32's DMA2D (Chrom-ART Accelerator).
*   **CMSIS DSP**: The control logic is implemented using the standard ARM CMSIS DSP library, which provides optimized functions for PID calculations on Cortex-M processors.
*   **STM32 HAL**: Provides the hardware abstraction layer for peripherals including timers (for PWM and encoder input), ADC (for sensor feedback), and LTDC (for display driving).

## Hardware Requirements

The project is tailored for the **STM32F746G-Discovery** board. To complete the control loop, the following external hardware is utilized:
- A DC motor (200RPM, 3-6V)
- An IRF520 MOSFET driver
- An RPM sensor based on the LM393
- A 20-step encoder disc
- A low-pass filter for signal conditioning

## Build and Development

The development environment is based on the GNU toolchain for ARM. The project includes a standard Makefile and is configured for a Linux host. It utilizes STM32CubeMX for peripheral initialization and OpenOCD for flashing and debugging. The source code is organized into a clean directory structure, separating the core application logic (`app/`), the PID implementation (`app/pid/`), and the GUI components (`app/gui/`).
