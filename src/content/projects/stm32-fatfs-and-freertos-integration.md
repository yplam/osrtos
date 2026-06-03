---
title: STM32 FatFs and FreeRTOS Integration
summary: An example project for STM32 microcontrollers demonstrating the integration
  of FreeRTOS with the FatFs file system. It features multi-tasking, thread-safe SD
  card access via SPI, and provides tasks for LED blinking, SD card information retrieval,
  and file management.
slug: stm32-fatfs-and-freertos-integration
codeUrl: https://github.com/Bsm-B/Stm32-FatFs-FreeRTOS
star: 34
lastUpdated: '2022-08-02'
rtos: freertos
topics:
- fatfs
- freertos
- sd
- spi
- stm32
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32f407vg-freertos-fatfs-sdio-sd-card-demo
- stm32-fatfs-on-sd-card-using-freertos
- esp32-fatfs-storage-example
- practice-project-for-stm32f746g-discovery
- ff-iso-stm32-multitasking-fatfs-sdio
- stm32h743-cmake-template
---

## Overview

This project provides a practical implementation of the FatFs file system within a FreeRTOS-managed environment on the STM32 platform. Specifically targeting the Arm® Cortex®-M0 architecture (STM32F072), it demonstrates how to handle concurrent file system operations safely using RTOS primitives like mutexes. The project serves as a robust template for developers looking to add SD card storage capabilities to their multitasking embedded applications.

## System Architecture and Tasks

The application is structured into three distinct tasks, each operating at different priority levels to showcase the multitasking capabilities of FreeRTOS:

- **Blink Task**: A simple heartbeat task that toggles an LED, providing a visual indicator that the RTOS scheduler is running correctly.
- **SDinfo Task**: This task focuses on metadata and diagnostics. It retrieves information about the SD card, including total memory capacity, free space, and a detailed list of files and folders (including timestamps, types, and paths).
- **SDManager Task**: The core functional task responsible for file manipulation. It handles creating, reading, writing, and searching for folders and files on the storage medium.

## Thread Safety and Synchronization

One of the critical challenges in using a file system with an RTOS is ensuring thread safety. This project addresses this by implementing safe access to the SD card via mutexes. This prevents race conditions when multiple tasks attempt to access the SPI bus or the FatFs middleware simultaneously, ensuring data integrity during write operations.

## Hardware Configuration

The project was developed using the STM32F072 Discovery kit and a Waveshare SD card module. A notable technical detail is the use of SPI1 for the SD card interface. On the STM32F072 Discovery board, SPI2 is pre-allocated to the onboard ST MEMS motion sensor, necessitating the redirection of the SD card handle to SPI1. 

**The pin configuration used is as follows:**
- **MISO**: PB4
- **MOSI**: PB5
- **SCLK**: PA5
- **CS**: PB3

Communication with the developer is handled via a USB-UART converter (PL2303HX), allowing the system to output status messages and file system information to a terminal emulator.

## Technical Implementation

The project utilizes the CMSIS-RTOS API Version 1, providing a standardized abstraction layer over the FreeRTOS kernel. The FatFs application interface is used to manage the MMC/SD memory card over the SPI bus. This setup allows for high-level file operations (like `f_open`, `f_read`, and `f_write`) while the underlying driver handles the low-level SPI communication with the hardware.
