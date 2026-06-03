---
title: Practice Project for STM32F746G-DISCOVERY
summary: A comprehensive practice repository for the STM32F746G-Discovery development
  board, utilizing FreeRTOS and the STM32 HAL. The project demonstrates the integration
  of complex peripherals including the LCD-TFT controller, SD card storage via FatFs,
  and USB Host functionality.
slug: practice-project-for-stm32f746g-discovery
codeUrl: https://github.com/David-Croose/Practice_F746GDISCOVERY
star: 0
lastUpdated: '2019-09-03'
rtos: freertos
topics:
- cubemx
- fatfs
- freertos
- stboard
- stm32f746g-discovery
- stm32f746ngh6
- usb
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32-fatfs-and-freertos-integration
- stm32-fatfs-on-sd-card-using-freertos
- stm32l475-freertos-iot-project
- stm32h743-cmake-template
- stm32f407vg-freertos-fatfs-sdio-sd-card-demo
- stm32-usb-mass-storage-with-fatfs
---

## Overview

This repository serves as a practical implementation and exploration of the STM32F746G-Discovery development board's capabilities. Centered around the high-performance STM32F746NGH6 microcontroller, the project leverages the STM32 HAL (Hardware Abstraction Layer) and FreeRTOS to manage a wide array of onboard peripherals and external interfaces. It represents a typical high-end embedded application involving display controllers, file systems, and networking stacks.

## Hardware and Architecture

The STM32F746G-Discovery is a feature-rich platform based on the ARM Cortex-M7 core, capable of running at high clock speeds with advanced DSP and FPU instructions. This project utilizes the board's extensive hardware suite, as configured through the included STM32CubeMX `.ioc` file:

- **Display & Graphics**: Configuration for the LTDC (LCD-TFT Display Controller) and DMA2D (Chrom-ART Accelerator) to drive the integrated 480x272 color LCD. The setup includes pixel format configurations (RGB565) and blending factors.
- **External Memory**: Integration of the FMC (Flexible Memory Controller) for SDRAM management, essential for frame buffering and large data structures.
- **Connectivity**: Support for Ethernet via RMII (using the LAN8742A PHY) and USB OTG FS configured as a Host, specifically targeting the CDC (Communication Device Class).
- **Storage**: SD card support using the SDMMC interface, enabling high-speed data access.
- **Audio & Specialized I/O**: Interfaces for SAI (Serial Audio Interface), SPDIFRX, and multiple ADC channels for analog signal processing.

## RTOS and Middleware

The system architecture is built upon FreeRTOS, providing a robust foundation for multitasking and real-time responsiveness. The configuration highlights several key RTOS features:

- **Task Management**: A default task is established with a significant stack size (4096 words) to handle complex operations.
- **Synchronization**: The project is configured to use recursive mutexes and counting semaphores, facilitating complex resource sharing between tasks.
- **Memory Management**: Uses the `heap_4.c` allocation scheme with a total heap size of 32KB.
- **Middleware Integration**: The project integrates the ST USB Host library for peripheral connectivity and the FatFs middleware for file system management on the SD card.

## Project Structure

The repository follows the standard STM32CubeMX project organization, making it familiar to developers in the ST ecosystem:

- **Core/**: Contains the main application logic (`main.c`), interrupt handlers (`stm32f7xx_it.c`), and hardware initialization code for various peripherals like GPIO, ADC, and UART.
- **Drivers/**: Includes the STM32F7xx HAL drivers and CMSIS (Cortex Microcontroller Software Interface Standard) files provided by STMicroelectronics.
- **Middlewares/**: Houses the FreeRTOS kernel, the FatFs library, and the ST USB Host library.
- **FATFS/ & USB_HOST/**: Contains target-specific configuration files and application-level code for handling the file system and USB host state machine.

This project provides a solid template for developers looking to understand the integration of complex middleware on the STM32F7 series, serving as a bridge between simple peripheral drivers and full-featured embedded applications.
