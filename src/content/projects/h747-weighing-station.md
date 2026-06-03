---
title: H747 Weighing Station
summary: A dual-core weighing station application for the STM32H747 Discovery board
  using AzureRTOS ThreadX. It features a GUIX-based touchscreen interface on the Cortex-M7
  core and sensor data acquisition via I2C on the Cortex-M4 core, utilizing shared
  memory for inter-core communication.
slug: h747-weighing-station
codeUrl: https://github.com/c4chris/H747-WeighingStation
star: 2
version: '0.4'
lastUpdated: '2022-06-26'
rtos: threadx-rtos
libraries:
- guix
topics:
- azure-guix
- azure-rtos
- azure-usbx
- hdmi
- ltdc-display
- rtos
- stm32
- stm32h7
- threadx
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- azurertos-dual-core-implementation-for-stm32h747
- h747-camera-dual-core-stm32h747-camera-and-display-system
- stm32l476g-discovery-rtos-sensor-project
- stm32-weather-station
- lvgl-demo-embarcadores
- erikaos-real-time-watch
---

## Overview

The H747 Weighing Station is a sophisticated embedded project that leverages the dual-core architecture of the STM32H747 microcontroller to create a functional weighing system with a modern graphical user interface. By utilizing AzureRTOS ThreadX on both the Cortex-M7 and Cortex-M4 cores, the project demonstrates an efficient separation of concerns: high-level UI and USB management on the M7, and low-level sensor data acquisition on the M4.

## System Architecture

The project is built on a multi-core strategy where each core handles specific tasks within the ThreadX RTOS environment. This ensures that time-critical sensor readings do not interfere with the responsiveness of the graphical user interface.

### Cortex-M4: Data Acquisition
The M4 core acts as the system's sensor hub. It is responsible for:
- Reading data from multiple I2C interfaces (I2C1 and I2C4) connected to load cells.
- Processing raw sensor data and placing it into shared memory accessible by the M7 core.
- Providing diagnostic feedback via UART and a dedicated orange status LED.

### Cortex-M7: User Interface and Connectivity
The M7 core handles the complex tasks of human-machine interaction and display management:
- **USBX Host Mode**: Manages HID devices, specifically handling input from a mouse or an HDMI touchscreen monitor.
- **GUIX Framework**: Drives the graphical display, rendering a user interface designed in GUIX Studio. It periodically retrieves the processed weight data from shared memory to update the screen.
- **Display Output**: Configured via LTDC and DSI to drive an HDMI touchscreen monitor.

## Hardware Implementation

The project is designed around the STM32H747 Discovery board. To interface with the physical load cells, the author developed custom hardware components including:
- **I2C Dual Interface Boards**: Small interface boards that connect load cells to the I2C bus.
- **FFC Interface Board**: Facilitates connections using flat flexible cables for a clean hardware setup.

The visual presentation is enhanced by the use of the Cascadia Code font, which was integrated into the GUIX project to provide a clean, readable display for the weight values.

## Technical Configuration

The project was initially scaffolded using STM32CubeMX, which handled the complex clock configurations and peripheral assignments required for a dual-core H7 system. Key middleware components include:
- **AzureRTOS ThreadX**: Providing the multitasking kernel for both cores.
- **AzureRTOS USBX**: Enabling the USB Host HID functionality on the M7.
- **AzureRTOS GUIX**: Powering the high-performance 2D graphics.

Communication between the two cores is achieved through shared memory, a common pattern in H7 development that allows the M4 to pass sensor updates to the M7 without the overhead of complex messaging protocols. This ensures the UI remains fluid while the M4 continues to sample the load cells at a consistent rate.
