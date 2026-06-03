---
title: RT-Thread Board Support Package for Kendryte K210
summary: A Board Support Package (BSP) for the Kendryte K210 SoC, a dual-core 64-bit
  RISC-V processor featuring hardware accelerators for machine vision and hearing.
  It integrates the RT-Thread RTOS to provide a robust development environment for
  AIoT applications.
slug: rt-thread-board-support-package-for-kendryte-k210
codeUrl: https://github.com/BernardXiong/K210
star: 16
lastUpdated: '2018-12-23'
rtos: rt-thread
topics:
- ai
- risc-v
- risc-v64
- rt-thread
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- kendryte-k210-freertos-sdk
- micropython-for-kendryte-k210-lobo-port
- stm32l475-pandora-board-bsp-for-rt-thread
- rt-thread-bsp-for-stm32f407vet6
- maixpy-v4
- rt-thread-smart-porting-for-risc-v-qemu-and-k210
---

## Overview

The Kendryte K210 is a high-performance system-on-chip (SoC) designed to integrate machine vision and machine hearing capabilities into the IoT landscape. Built on a TSMC ultra-low-power 28nm process, it features a dual-core 64-bit RISC-V processor (RV64GC) running at 400MHz. This project provides the Board Support Package (BSP) required to run the RT-Thread real-time operating system on the K210, enabling developers to leverage a mature RTOS ecosystem for artificial intelligence and edge computing tasks.

## Hardware Capabilities

The K210 is more than a standard microcontroller; it is specifically optimized for AI workloads. Key hardware features include:

- **Dual-core RISC-V CPU**: 64-bit architecture with FPU support.
- **KPU (Neural Network Processor)**: A hardware accelerator for convolutional neural networks, providing high-performance inference for vision tasks.
- **APU (Audio Processor)**: Dedicated hardware for machine hearing and voice processing.
- **Memory**: 8MB of on-chip SRAM, providing sufficient space for complex firmware and AI models.
- **Security**: Built-in AES and SHA256 hardware accelerators, along with support for firmware encryption.
- **Flexible I/O**: A Field Programmable IO Array (FPIOA) that allows mapping peripherals to various pins, simplifying PCB design.

## RT-Thread Integration

By porting RT-Thread to the K210, this project brings a standardized software environment to the RISC-V platform. The integration includes support for the RT-Thread kernel, the Finsh shell for command-line interaction, and essential device drivers. 

At the time of development, the BSP supported high-speed UART for shell access and basic system initialization. The project utilizes the SCons build system and Kconfig for modular configuration, allowing developers to enable or disable kernel features and components through a menu-driven interface.

## Development and Build Environment

Compiling firmware for the K210 involves using the RT-Thread Env tool or SCons directly. The project requires a RISC-V toolchain and the RT-Thread source code. Because the RT-Thread repository is extensive, this BSP is designed to be placed alongside the main RT-Thread tree. 

### Configuration Requirements

For stable operation on the K210's dual-core architecture, specific configuration settings are mandated within the RT-Thread environment:
- **Alignment size**: Must be set to 8 for 64-bit data access.
- **Stack sizes**: The idle thread requires at least 1024 bytes, while the main thread is recommended at 4096 bytes.
- **Console**: The high-speed UART (`uarths`) is used as the default console device.

## Deployment

Once compiled, the resulting binary (`rtthread.bin`) is flashed to the K210 hardware using the K-Flash utility. Upon reset, the system initializes the dual-core environment and provides the RT-Thread startup logo via the serial console, giving developers immediate access to the Finsh shell for debugging and system management.

Note: This specific repository serves as a historical reference for the K210 port; the official development and maintenance of the K210 BSP have since moved to the main RT-Thread upstream repository.
