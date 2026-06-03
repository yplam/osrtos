---
title: IMXRT1060-EVK Sample Project
summary: A comprehensive sample project for the NXP i.MX RT1060 Evaluation Kit (EVK)
  featuring a dual-stage architecture with a dedicated bootloader and a feature-rich
  application. It integrates Amazon FreeRTOS with a full middleware stack including
  lwIP networking, LVGL graphics, and FatFs storage for ARM Cortex-M7 development.
slug: imxrt1060-evk-sample-project
codeUrl: https://github.com/tkashi-github/IMXRT1060-EVK
star: 4
lastUpdated: '2020-05-17'
rtos: freertos
libraries:
- littlefs
- lvgl
- lwip
- tensorflow-micro
topics:
- bootloader
- cortex-m7
- fatfs
- flac
- freertos
- imxrt
- lvgl
- lwip
- mmc
- rt1060
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- stm32l475-freertos-iot-project
- lvgl-demo-embarcadores
- practice-project-for-stm32f746g-discovery
- stm32f107-makefile-freertos-template
- zephyr-lvgl-sample-for-nrf52840-mdk
- sk-mstm32f107-demo-board-example
---

## Overview

The IMXRT1060-EVK Sample Project is a robust development template designed for the NXP i.MX RT1060 Evaluation Kit. This repository provides a complete firmware ecosystem, demonstrating how to leverage the high-performance ARM Cortex-M7 crossover processor for complex embedded applications. The project is structured into two distinct sub-projects: a bootloader for system management and a main application that showcases the platform's multimedia and connectivity capabilities.

## System Architecture

The project is divided into two primary components, each serving a specific role in the device lifecycle:

### IMXRT1060-EVK_BOOT
This component acts as the system's entry point. It provides essential low-level services including:
- **Console Interface**: A serial-based command-line interface for system interaction.
- **File System Support**: Integration with StorageTask for managing files on MMC or compatible cards.
- **Update Mechanism**: Logic to load secondary binaries from the file system and jump to the main application, facilitating field updates via BIN files.

### IMXRT1060-EVK_APL
The main application project demonstrates the full potential of the i.MX RT1060. It includes:
- **Graphical User Interface**: Powered by LVGL (Light and Versatile Graphics Library) for high-performance embedded visuals.
- **Networking**: A full TCP/IP stack using lwIP for LAN connectivity.
- **Monitoring**: Real-time temperature monitoring and touch screen interaction tasks.
- **Storage**: Advanced file system management for data logging or asset loading.

## Technical Stack

This project is built upon the MCUXpresso Software Development Kit (SDK) version 2.6.0 and utilizes several industry-standard libraries and protocols:

- **RTOS**: Amazon FreeRTOS provides the multitasking kernel, ensuring deterministic behavior for time-critical tasks like GUI updates and network processing.
- **Hardware Abstraction**: CMSIS-5 and KSDK peripheral drivers provide a standardized interface to the i.MX RT1062 hardware.
- **Connectivity**: lwIP handles the networking requirements, while the SDK includes support for USB stacks and Wi-Fi (QCA/Wiced).
- **Storage**: FatFs and LittleFS are included for robust file management across different storage media.
- **Machine Learning**: The project includes hooks for TensorFlow Lite and CMSIS-NN, enabling edge AI capabilities on the Cortex-M7 core.

## Development Environment

The project is tailored for use with **MCUXpresso IDE** (specifically version 11.0.0). It includes several utility batch files (`WriteDebugApl.bat`, `WriteDebugBoot.bat`) to streamline the process of flashing and debugging using either the built-in LinkServer (Redlink) or external SEGGER J-Link probes. 

Developers can update the main application by placing a CRC-verified binary (`IMXRT1060-EVK_APL_crc16.bin`) onto the root of the file system, which the bootloader will then identify and flash, demonstrating a practical approach to firmware lifecycle management.
