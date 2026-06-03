---
title: STM32F407VG FreeRTOS FATFS SDIO SD Card Demo
summary: A demonstration project for the STM32F407VG microcontroller that implements
  SD card read/write functionality using the FATFS file system and SDIO interface.
  It utilizes FreeRTOS for task management and is configured for use with Keil or
  IAR development environments.
slug: stm32f407vg-freertos-fatfs-sdio-sd-card-demo
codeUrl: https://github.com/avaan/STM32F407VG-freeRTOS-FATFS-SDIO-SD-CARD
star: 35
lastUpdated: '2019-04-17'
rtos: freertos
topics:
- fatfs
- freertos
- iar-workbench
- keil-uvision
- stm32f4-discovery
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32-fatfs-and-freertos-integration
- stm32-fatfs-on-sd-card-using-freertos
- esp32-fatfs-storage-example
- stm32h743-cmake-template
- practice-project-for-stm32f746g-discovery
- stm32l475-freertos-iot-project
---

## Overview

This project provides a working implementation of the FATFS file system on an STM32F407VG microcontroller, specifically targeting the STM32F4-Discovery board. It demonstrates how to integrate SD card read and write operations within a FreeRTOS environment using the SDIO (Secure Digital Input Output) peripheral. 

Managing file systems on embedded devices often involves complex timing and synchronization, especially when multiple tasks need to access the storage medium. This project addresses these challenges by combining the widely used FATFS middleware with the FreeRTOS real-time operating system, ensuring thread-safe and efficient file operations.

## Hardware Requirements

The project is designed to run on the following hardware configuration:
- **STM32F4-Discovery Board**: Featuring the STM32F407VG microcontroller.
- **MicroSD Card Reader**: Connected via the SDIO interface.
- **SD Card**: Formatted with the FAT32 file system.

## Technical Implementation

The system architecture leverages several key components of the STM32 ecosystem:

### Peripheral Configuration
The project uses the SDIO peripheral in 4-bit wide bus mode to maximize data throughput. DMA (Direct Memory Access) is configured for both transmission (SDIO_TX) and reception (SDIO_RX) to offload the CPU during heavy data transfers. Specifically, DMA2 Stream 3 and Stream 6 are utilized for these operations.

### Middleware Integration
- **FreeRTOS**: The project is configured with multiple tasks. The CubeMX configuration reveals a primary task (`firstTask`) and a secondary task (`myTask02`), along with a mutex (`myMutex01`) to handle resource synchronization.
- **FATFS**: The FatFs middleware is integrated to provide a standard API for file system access. It is configured with a maximum sector size of 4096 bytes to support various SD card geometries.

### Development Environment
The project includes configuration files for both Keil MDK-ARM and IAR Embedded Workbench. It was generated using STM32CubeMX, providing a clean separation between hardware abstraction layers (HAL), middleware, and user application code.

## Project Structure

The repository follows the standard STM32Cube project layout:
- **Inc/Src**: Contains the application logic, including `main.c`, `freertos.c`, and `fatfs.c`.
- **Drivers**: Includes the STM32F4xx HAL drivers and CMSIS core files.
- **Middlewares**: Contains the source code for FreeRTOS and the FatFs library.
- **freeRtos+FatFSDemo.ioc**: The STM32CubeMX project file, allowing users to modify peripheral settings or clock configurations easily.

## Key Features

- **Asynchronous I/O**: Uses DMA to handle SD card data transfers without blocking the CPU.
- **Thread Safety**: Implements FreeRTOS mutexes to prevent race conditions during file system access.
- **Standardized API**: Utilizes the FATFS library, making it easy to port file-handling logic to other platforms.
- **Ready-to-Use**: Provides a verified configuration for the STM32F407VG, reducing the setup time for developers needing SD card support in their RTOS-based projects.
