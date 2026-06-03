---
title: 'H747-Camera: Dual-Core STM32H747 Camera and Display System'
summary: A dual-core embedded project for the STM32H747 microcontroller utilizing
  AzureRTOS (ThreadX). It integrates camera input via DCMI, display output via LTDC/DSI
  using GUIX, and USB mass storage support through USBX and FileX.
slug: h747-camera-dual-core-stm32h747-camera-and-display-system
codeUrl: https://github.com/c4chris/H747-Camera
star: 3
version: v20240507.0
lastUpdated: '2024-05-28'
rtos: threadx-rtos
libraries:
- filex
- guix
topics:
- azure-filex
- azure-guix
- azure-rtos
- azure-threadx
- azure-usbx
- stm32
- stm32h7
- stm32h747
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- azurertos-dual-core-implementation-for-stm32h747
- h747-weighing-station
- stm32l476g-discovery-rtos-sensor-project
- stm32h743-cmake-template
- practice-project-for-stm32f746g-discovery
- stm32n6-camera-capture-application
---

## Overview

The H747-Camera project is a sophisticated implementation of a dual-core embedded system targeting the STM32H747 microcontroller. By leveraging the high-performance capabilities of the ARM Cortex-M7 and Cortex-M4 cores, the project demonstrates a complex integration of camera data acquisition, graphical user interface (GUI) rendering, and file system management. 

The system is built using the AzureRTOS (ThreadX) ecosystem, providing a robust real-time foundation for both cores. The project utilizes STM32CubeMX for hardware configuration and peripheral initialization, including DCMI for camera interfacing, LTDC and DSI for display control, and USBX for mass storage connectivity.

## Dual-Core Architecture

The project effectively splits tasks between the two processing cores to optimize performance and responsiveness:

### Cortex-M4: Data and Storage Management
The M4 core acts as the primary handler for data acquisition and external storage. Its responsibilities include:
- **Camera Interface**: Managing the Digital Camera Interface (DCMI) in continuous DMA mode to capture video frames.
- **Storage**: Initializing USBX and FileX to mount USB mass storage devices and perform data write operations.
- **Sensor Acquisition**: Reading data from the I2C4 bus and placing it into shared memory for consumption by the M7 core.
- **System Monitoring**: Handling UART communications for status logging and managing system LEDs.

### Cortex-M7: User Interface and Graphics
The higher-performance M7 core is dedicated to the user-facing aspects of the system:
- **Graphical Interface**: Running the GUIX framework to display status messages and interactive elements.
- **Touch Integration**: Retrieving touchscreen data from shared memory (populated by the M4) and posting PEN events to the GUIX event queue.
- **Display Control**: Managing the LTDC and DSI peripherals to drive the attached display module.

## Middleware Integration

A key highlight of this project is the extensive use of the AzureRTOS middleware stack. The integration includes:

- **ThreadX**: Provides the RTOS kernel for both cores, managing task scheduling and synchronization.
- **GUIX**: Used for the graphical interface, with the display layout generated via GUIX Studio and integrated as a Git submodule.
- **FileX & USBX**: Enables the M4 core to interact with USB flash drives, providing a path for data logging or image storage.

## Hardware Configuration

The project is configured for the STM32H747XIH6, a high-end MCU in the STM32H7 series. The hardware setup involves complex memory protection unit (MPU) settings to manage access permissions across the SDRAM banks and internal memory regions, ensuring stable operation during high-bandwidth DMA transfers from the camera and to the display. Peripherals such as the FMC (Flexible Memory Controller) are used to interface with external SDRAM, which is essential for buffering high-resolution camera frames and display layers.
