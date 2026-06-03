---
title: 'X-CUBE-AZRTOS-G0: Azure RTOS Software Expansion for STM32Cube'
summary: A comprehensive software expansion package for the STM32G0 series, integrating
  Microsoft Azure RTOS into the STM32Cube ecosystem. It provides a full suite of middleware
  including ThreadX, NetXDuo, FileX, LevelX, and USBX, along with hardware-specific
  drivers and ready-to-run examples for evaluation boards.
slug: x-cube-azrtos-g0-azure-rtos-software-expansion-for-stm32cube
codeUrl: https://github.com/STMicroelectronics/x-cube-azrtos-g0
siteUrl: https://wiki.st.com/stm32mcu/wiki/STM32CoreMW_overview
star: 7
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
- stm32g0
- threadx
- usbx
- x-cube
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- x-cube-azrtos-wb-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-g4-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-h7-azure-rtos-software-expansion
- x-cube-azrtos-l5-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-l4-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-f7-azure-rtos-software-expansion-for-stm32cube
---

## Overview

X-CUBE-AZRTOS-G0 is a software expansion package designed to bring the full power of Microsoft Azure RTOS to the STM32G0 series of microcontrollers. By integrating these professional-grade middleware components into the STM32Cube ecosystem, STMicroelectronics provides developers with a streamlined path for building tiny, smart, and connected devices. 

This package serves as a bridge between the STM32G0 hardware abstraction layer (HAL) and the Azure RTOS suite, ensuring that the RTOS and its associated stacks are optimized for the specific performance and power characteristics of the G0 series.

## Core Middleware Components

The package includes a comprehensive set of middleware stacks that cover the essential needs of modern embedded applications:

- **ThreadX**: A highly reliable, industrial-grade Real-Time Operating System (RTOS) that provides advanced scheduling, communication, and synchronization primitives.
- **NetXDuo**: An advanced, industrial-grade IPv4 and IPv6 network stack designed specifically for deeply embedded real-time and IoT applications.
- **FileX & LevelX**: FileX provides a full FAT file system support, while LevelX offers Flash Wear Leveling for both NOR and NAND memories, ensuring data integrity and longevity for storage media.
- **USBX**: A high-performance USB host and device stack that supports multiple classes, enabling complex USB connectivity scenarios.

## Industrial-Grade Reliability

One of the primary advantages of using Azure RTOS via the X-CUBE-AZRTOS-G0 package is access to pre-certified software. Microsoft has secured numerous safety and security certifications for these components, including:
- **Safety**: IEC 61508 SIL4, IEC 62304 Class C, and ISO 26262 ASIL D.
- **Security**: EAL4+ for TLS/DTLS and FIPS 140-2 for software cryptographic libraries.

These certifications make the package suitable for mission-critical applications in industrial, medical, and automotive sectors.

## Hardware Support and Projects

The repository is structured to facilitate quick prototyping and development. It includes ready-to-run applicative examples for popular evaluation platforms:
- **NUCLEO-G0B1RE**: A versatile development board for the STM32G0B1RE MCU.
- **STM32G0C1E-EV**: A full-featured evaluation board for the STM32G0C1E MCU.

The project structure follows the standard STM32Cube organization, containing `Drivers` (CMSIS, HAL, and BSP), `Middlewares` (the Azure RTOS stacks), and `Projects` (example applications). Examples range from basic thread creation and synchronization to complex USB Power Delivery (USBPD) and Mass Storage Class (MSC) implementations.

## Getting Started

Developers can leverage X-CUBE-AZRTOS-G0 using several industry-standard toolchains, including IAR Embedded Workbench (EWARM), STM32CubeIDE, and Keil MDK-ARM. The package is also compatible with STM32CubeMX, allowing for graphical configuration of the RTOS and middleware components, which significantly reduces the initial setup time and learning curve for new users.
