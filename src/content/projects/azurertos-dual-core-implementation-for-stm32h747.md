---
title: AzureRTOS Dual-Core Implementation for STM32H747
summary: A dual-core embedded application for the STM32H747I-DISCO board utilizing
  AzureRTOS (ThreadX) and GUIX. It demonstrates a distributed architecture where the
  Cortex-M4 manages I2C sensor data and peripherals while the Cortex-M7 handles the
  graphical user interface and display logic.
slug: azurertos-dual-core-implementation-for-stm32h747
codeUrl: https://github.com/c4chris/H747-Test
star: 11
lastUpdated: '2021-06-20'
rtos: threadx-rtos
libraries:
- guix
topics:
- azure-rtos
- board
- ltdc-display
- stm32
- stm32h7
- threadx
isShow: true
image: /202512/H747-Test.webp
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
---

## Overview

The H747-Test project is a sophisticated demonstration of the dual-core capabilities of the STM32H747 microcontroller. By leveraging the AzureRTOS suite, specifically ThreadX and GUIX, the project implements a distributed task model across the ARM Cortex-M7 and Cortex-M4 cores. The project was built using STM32CubeMX and incorporates elements from the high-performance LCD DSI command mode examples provided by STMicroelectronics.

## System Architecture

The project is divided into two distinct firmware images, each running its own instance of the ThreadX RTOS. This separation allows for efficient task management and real-time responsiveness by offloading low-level peripheral handling to the M4 core while reserving the M7 core for heavy lifting such as graphics rendering and complex logic.

### Cortex-M4: Peripheral Management
The Cortex-M4 core acts as the primary interface for hardware sensors and communication. Its responsibilities include:
- **I2C Data Acquisition**: Reading data from I2C1 and I2C4 (including the touch-screen interface).
- **Inter-Core Communication**: Placing retrieved sensor data into shared memory locations accessible by the M7 core.
- **Status Indication**: Toggling an orange LED and outputting system logs via UART.

### Cortex-M7: UI and Logic
The Cortex-M7 core focuses on the user experience and high-level processing:
- **Display Management**: Initializing the LCD display through Board Support Package (BSP) calls.
- **GUIX Integration**: Running the GUIX framework to manage the graphical interface.
- **Event Handling**: Retrieving touch data from shared memory to post PEN events for the GUI, and updating display values based on sensor data provided by the M4 core.
- **Visual Feedback**: Toggling blue and green LEDs based on touch events (PEN_DOWN and PEN_UP).

## Graphical User Interface

The interface is designed using GUIX Studio, allowing for a professional-grade UI with minimal manual coding. The project specifically utilizes the Cascadia Code font, which was converted into a GUIX-compatible format using GUIX Studio's font generation tools. The UI includes a timer-driven update mechanism that periodically refreshes displayed values with the latest data from the shared memory buffer.

## Technical Implementation Details

The project serves as an excellent reference for developers looking to implement shared-memory communication between cores on the STM32H7 series. By using AzureRTOS on both cores, it provides a unified development experience while maintaining the strict timing requirements necessary for both sensor polling and smooth UI animations. The integration of GUIX as a git submodule ensures that the graphics stack remains modular and easy to update.
