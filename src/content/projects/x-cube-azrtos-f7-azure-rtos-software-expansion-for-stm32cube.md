---
title: X-CUBE-AZRTOS-F7 Azure RTOS Software Expansion for STM32Cube
summary: A comprehensive software expansion package that integrates the Microsoft
  Azure RTOS suite with the STM32F7 series of microcontrollers. It provides a full
  middleware stack including ThreadX, NetXDuo, FileX, LevelX, and USBX, along with
  ready-to-run examples for STM32F7 evaluation boards.
slug: x-cube-azrtos-f7-azure-rtos-software-expansion-for-stm32cube
codeUrl: https://github.com/STMicroelectronics/x-cube-azrtos-f7
siteUrl: https://wiki.st.com/stm32mcu/wiki/STM32CoreMW_overview
star: 10
version: v1.1.0
lastUpdated: '2023-05-24'
rtos: threadx
libraries:
- filex
- eclipse-threadx-levelx
topics:
- azure-rtos
- filex
- levelx
- netxduo
- stm32cube-mcu-component
- stm32f7
- threadx
- usbx
- x-cube
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- x-cube-azrtos-h7-azure-rtos-software-expansion
- x-cube-azrtos-l4-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-l5-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-f4-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-g4-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-wb-azure-rtos-software-expansion-for-stm32cube
---

## Overview

The X-CUBE-AZRTOS-F7 expansion package provides a full integration of the Microsoft Azure RTOS suite within the STM32Cube environment, specifically tailored for the high-performance STM32F7 series of microcontrollers. By combining ST's extensive hardware abstraction layers and tools with Microsoft's industrial-grade middleware, developers can rapidly build sophisticated, connected, and secure embedded applications.

## The Azure RTOS Ecosystem on STM32

Azure RTOS is a professional-grade middleware suite that has been market-proven in billions of devices. This package brings several key components to the STM32F7 platform:

- **ThreadX**: A highly reliable, advanced RTOS known for its small footprint and fast execution. It includes features like preemption-threshold and advanced thread management.
- **NetXDuo**: An industrial-grade dual IPv4 and IPv6 TCP/IP network stack designed specifically for deeply embedded real-time and IoT applications, supporting Ethernet and WiFi media.
- **FileX and LevelX**: A high-performance FAT-compatible file system and a Flash Wear Leveling (FTL) library that supports NAND and NOR flash memories.
- **USBX**: A high-performance USB host and device stack supporting multiple classes such as MSC, HID, CDC_ACM, and CDC_ECM.

## Safety and Security

One of the standout features of using Azure RTOS is the inheritance of Microsoft's extensive certifications. The suite comes with safety pre-certifications for IEC 61508 SIL4, IEC 62304 Class C, and ISO 26262 ASIL D. On the security side, it offers EAL4+ for TLS/DTLS and FIPS 140-2 for software cryptographic libraries. STMicroelectronics provides a granted production license for these components when used on supported STM32 hardware.

## Hardware and Toolchain Support

The package is optimized for the STM32F7 series, which features the ARM Cortex-M7 core. It includes ready-to-run examples for several popular evaluation platforms:

- **STM32F767ZI-Nucleo**
- **STM32F769I-Discovery**
- **STM32F735G-DK**
- **STM32F747I-DK**
- **STM32F743I-EVAL**

Developers can use their preferred professional toolchains, including IAR Embedded Workbench (EWARM), MDK-ARM (Keil), and the free STM32CubeIDE.

## Practical Applications

To help developers get started quickly, X-CUBE-AZRTOS-F7 includes a variety of applicative examples. These range from basic thread creation and low-power configuration in ThreadX to complex networking scenarios like a Web HTTP server or TCP/UDP echo clients using NetXDuo. USB functionality is demonstrated through Mass Storage Class (MSC) host examples and Human Interface Device (HID) mouse/keyboard emulations.

The repository is structured to follow the standard STM32Cube organization, with clear separation between Drivers (HAL/BSP), Middlewares (Azure RTOS stacks), and Projects (board-specific examples), ensuring a smooth transition for developers already familiar with the STM32 ecosystem. It also includes a CMSIS-RTOS wrapper for ThreadX, allowing developers to use standardized APIs while benefiting from the underlying ThreadX kernel.
