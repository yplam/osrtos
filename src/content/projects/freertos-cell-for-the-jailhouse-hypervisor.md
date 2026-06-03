---
title: FreeRTOS Cell for the Jailhouse Hypervisor
summary: A specialized implementation of FreeRTOS designed to run as a non-root 'inmate'
  cell within the Jailhouse partitioning hypervisor. It enables the execution of hard
  real-time tasks on ARM-based multicore systems, specifically targeting the Banana
  Pi board, while maintaining isolation from a primary Linux environment.
slug: freertos-cell-for-the-jailhouse-hypervisor
codeUrl: https://github.com/siemens/freertos-cell
star: 53
lastUpdated: '2023-03-22'
rtos: freertos
topics:
- arm
- freertos
- hypervisor
- jailhouse
- linux
- real-time
- realtime
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- rt-hypervisor
- freertos-for-raspberry-pi-3-64-bit
- raspberry-pi-rtos-rpi-rtos
- freertos-port-for-risc-v
- str-xenomai-real-time-systems-practices
- xenomai-3-for-raspberry-pi-2-and-3
---

## Overview

The FreeRTOS Cell project by Siemens provides a bridge between the popular FreeRTOS real-time operating system and the Jailhouse partitioning hypervisor. Jailhouse is a Linux-based hypervisor that splits a multicore system into isolated compartments called "cells." This project allows developers to run FreeRTOS within one of these cells, enabling a hybrid system where a general-purpose OS like Linux handles high-level tasks while FreeRTOS manages time-critical, hard real-time operations on the same hardware.

## Technical Architecture

In the Jailhouse ecosystem, FreeRTOS acts as an "inmate." Unlike traditional virtualization where a guest OS might be unaware of the hypervisor, this implementation is specifically tailored to the constraints and interfaces provided by Jailhouse on ARM platforms. 

The system targets ARM SoCs with virtualization extensions and a Generic Interrupt Controller (GIC). The current implementation is optimized for the Banana Pi board, utilizing its Cortex-A7 processor. The project includes custom boot stubs and linker scripts to ensure the FreeRTOS binary is correctly positioned in memory, as Jailhouse inmates typically start execution at address zero within their assigned memory region.

### Key Components

- **Hardware Initialization**: The project handles low-level setup including the MMU (Memory Management Unit) with identity mapping for DDR and specific mappings for peripheral I/O. It also initializes the GIC v2 for interrupt management.
- **Timer Integration**: It utilizes the ARM generic timer (CNTV_CTL_EL0) to drive the FreeRTOS tick, ensuring precise scheduling within the virtualized environment.
- **Isolation**: By running under Jailhouse, the FreeRTOS cell is almost entirely isolated from the Linux root cell. It manages its own dedicated hardware resources, such as specific UART interfaces and GPIO pins for LED control.
- **FPU Support**: The implementation includes support for the VFP (Vector Floating Point) unit, allowing real-time tasks to perform complex mathematical calculations.

## Demo Application

The repository includes a comprehensive `main.c` that serves as both a test suite and a demonstration. The demo features several concurrent tasks:

- **Blink Task**: A simple task that toggles the green LED on the Banana Pi.
- **UART Task**: Manages serial communication, providing a dedicated console for the FreeRTOS environment separate from the Linux console.
- **Floating Point Task**: Demonstrates the stability of the FPU context switching within the RTOS.
- **Task Notifications**: Showcases inter-task communication using FreeRTOS's lightweight notification system.

## Porting and Requirements

While the project is currently configured for the Banana Pi, it provides a blueprint for porting FreeRTOS to other Jailhouse-supported ARM platforms. Successful porting requires modifying serial interface access, ensuring the target SoC has a GIC, and verifying that the hypervisor can manage CPU online/offline states effectively. 

The build system is based on a standard Makefile and expects an ARM cross-compiler toolchain (e.g., `arm-linux-gnueabihf-`). The project also provides the necessary Jailhouse cell configuration files (`.c` files) to define the resource allocation for the hypervisor.
