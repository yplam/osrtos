---
title: X-CUBE-AZRTOS-F4 Azure RTOS Software Expansion for STM32Cube
summary: A comprehensive software expansion package for the STM32F4 series that integrates
  the Microsoft Azure RTOS suite into the STM32Cube ecosystem. It provides a full
  middleware stack including ThreadX, NetXDuo, FileX, LevelX, and USBX, optimized
  for STM32 microcontrollers.
slug: x-cube-azrtos-f4-azure-rtos-software-expansion-for-stm32cube
codeUrl: https://github.com/STMicroelectronics/x-cube-azrtos-f4
siteUrl: https://wiki.st.com/stm32mcu/wiki/STM32CoreMW_overview
star: 49
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
- stm32f4
- threadx
- usbx
- x-cube
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- x-cube-azrtos-g4-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-f7-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-l4-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-wb-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-h7-azure-rtos-software-expansion
- x-cube-azrtos-l5-azure-rtos-software-expansion-for-stm32cube
---

## Overview

X-CUBE-AZRTOS-F4 is a professional-grade software expansion for the STM32Cube ecosystem, specifically designed to bring the full power of Microsoft Azure RTOS to the STM32F4 series of microcontrollers. By bridging the gap between STMicroelectronics' hardware abstraction layers and Microsoft's industrial-grade middleware, this package enables developers to build sophisticated, connected, and highly reliable embedded applications with reduced development time.

The package is more than just a collection of libraries; it is a full integration that includes ready-to-run examples for popular evaluation boards like the NUCLEO-F429ZI and STM32469I-DISCO. This integration ensures that the RTOS, networking, file system, and USB stacks are pre-configured to work seamlessly with STM32 hardware peripherals.

## Core Middleware Components

The expansion package includes several key components of the Azure RTOS suite:

- **ThreadX**: A highly reliable, market-proven Real-Time Operating System (RTOS) that provides advanced scheduling, communication, and synchronization primitives.
- **NetXDuo**: An industrial-grade dual IPv4 and IPv6 TCP/IP network stack designed specifically for deeply embedded real-time and IoT applications. It includes support for numerous protocols such as MQTT, SNTP, and HTTP.
- **FileX and LevelX**: FileX provides a full FAT file system support, while LevelX offers Flash Translation Layer (FTL) capabilities, enabling wear leveling and bad block management for NAND and NOR flash memories.
- **USBX**: A high-performance USB host and device stack that supports multiple classes, including MSC, HID, CDC-ACM, and DFU.

## Hardware Integration and Toolchains

X-CUBE-AZRTOS-F4 is built to leverage the STM32F4 series' performance. It includes drivers for CMSIS, HAL, and BSP, ensuring that the middleware can communicate effectively with the underlying silicon. The project supports major industrial toolchains, including IAR Embedded Workbench (EWARM), STM32CubeIDE, and Keil MDK-ARM.

One of the significant advantages of this package is its compatibility with STM32CubeMX. This allows developers to use a graphical interface to configure Azure RTOS components, generate initialization code, and manage dependencies between different middleware layers.

## Safety and Security

Azure RTOS components within this package come with impressive credentials from Microsoft, including safety pre-certifications for IEC 61508 SIL4, IEC 62304 Class C, and ISO 26262 ASIL D. On the security side, it features EAL4+ for TLS/DTLS and FIPS 140-2 for software cryptographic libraries, making it suitable for critical industrial and medical applications.

## Practical Applications

The repository provides a wide array of applicative examples that demonstrate real-world usage scenarios:

- **Thread Management**: Examples showing thread creation, synchronization using mutexes and semaphores, and message queue handling.
- **Networking**: TCP/UDP echo servers/clients, WebServers, and MQTT clients with TLS encryption.
- **Storage**: SD card file operations using FileX and NOR flash management using LevelX.
- **USB Connectivity**: Implementation of USB HID (mouse/keyboard), Mass Storage (MSC), and Communication Class (CDC) for both host and device modes.
- **Low Power**: Demonstrations on configuring ThreadX for low-power operation modes to extend battery life in portable devices.
