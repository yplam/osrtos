---
title: X-CUBE-AZRTOS-WB Azure RTOS Software Expansion for STM32Cube
summary: A comprehensive software expansion package for the STM32Cube ecosystem that
  integrates Microsoft Azure RTOS for the STM32WB series of microcontrollers. It provides
  a full suite of middleware including ThreadX, NetXDuo, FileX, LevelX, and USBX,
  along with hardware-specific drivers and ready-to-run examples.
slug: x-cube-azrtos-wb-azure-rtos-software-expansion-for-stm32cube
codeUrl: https://github.com/STMicroelectronics/x-cube-azrtos-wb
siteUrl: https://wiki.st.com/stm32mcu/wiki/STM32CoreMW_overview
star: 9
version: v2.0.0
lastUpdated: '2023-06-20'
rtos: threadx
libraries:
- filex
- eclipse-threadx-levelx
topics:
- azure-rtos
- filex
- levelx
- netxduo
- stm32wb
- threadx
- usbx
- x-cube
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- x-cube-azrtos-g0-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-h7-azure-rtos-software-expansion
- x-cube-azrtos-l5-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-g4-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-l4-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-f7-azure-rtos-software-expansion-for-stm32cube
---

## Overview

X-CUBE-AZRTOS-WB is a specialized software expansion package designed to bring the full power of Microsoft Azure RTOS to the STMicroelectronics STM32WB series of microcontrollers. By integrating these professional-grade middleware components into the STM32Cube ecosystem, developers can leverage a highly reliable and market-proven suite of services for building tiny, smart, and connected devices.

The STM32WB series, known for its wireless capabilities, benefits significantly from this integration, as it provides a structured environment for managing complex real-time tasks, networking, and file system operations. The package is designed to reduce the learning curve for developers transitioning to Azure RTOS by providing pre-configured projects and hardware abstraction layers specifically tuned for STM32 hardware.

## Core Middleware Components

The package includes several key components of the Azure RTOS suite, each serving a specific role in embedded development:

- **ThreadX**: A professional-grade Real-Time Operating System (RTOS) that provides advanced scheduling, communication, and synchronization primitives. It is known for its small footprint and high performance.
- **NetXDuo**: An industrial-grade dual IPv4 and IPv6 TCP/IP network stack designed specifically for deeply embedded, real-time, and IoT applications. It includes numerous IoT protocols for cloud connectivity.
- **FileX and LevelX**: FileX provides a full-featured FAT file system support, while LevelX offers Flash Translation Layer (FTL) services, enabling wear leveling and bad block management for NAND and NOR flash memories.
- **USBX**: A high-performance USB host and device stack that supports multiple classes, allowing developers to easily implement USB functionality in their products.

## Hardware Support and Integration

X-CUBE-AZRTOS-WB is optimized for the STM32WB series and includes ready-to-run applicative examples for popular evaluation boards, such as the **P-NUCLEO-WB55.Nucleo** and the **STM32WB5MM-DK**. These examples demonstrate practical implementations of thread creation, synchronization, message queues, and low-power configurations.

A significant advantage of this package is its integration with **STM32CubeMX**. This allows developers to configure the Azure RTOS middleware through a graphical user interface, which then generates the necessary initialization code. This integration supports both standard RTOS models and standalone modes for specific components like FileX and USBX.

## Safety and Security

One of the primary reasons for choosing Azure RTOS in industrial and medical applications is its extensive list of certifications. The suite comes with safety pre-certifications including IEC 61508 SIL4, IEC 62304 Class C, and ISO 26262 ASIL D. On the security side, it holds EAL4+ for TLS/DTLS and FIPS 140-2 for software cryptographic libraries, making it a robust choice for secure IoT deployments.

## Getting Started

Developers can explore the `Projects` directory to find examples tailored to their specific hardware. For instance, the `Tx_Thread_Creation` application demonstrates basic task management, while `Ux_Device_CDC_ACM` shows how to implement a Virtual COM Port bridge. Most projects are provided with support for major toolchains, including IAR Embedded Workbench (EWARM), STM32CubeIDE, and MDK-ARM (Keil).

By using this package, developers inherit the production and distribution rights for Azure RTOS on STM32WB microcontrollers, ensuring a smooth path from prototyping to mass production.
