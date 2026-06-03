---
title: X-CUBE-AZRTOS-H7 Azure RTOS Software Expansion
summary: A comprehensive software expansion package for the STM32Cube ecosystem that
  integrates the Microsoft Azure RTOS suite with STM32H7 microcontrollers. It provides
  a full middleware stack including ThreadX, NetXDuo, FileX, LevelX, and USBX, along
  with hardware-specific drivers and ready-to-run examples for evaluation boards.
slug: x-cube-azrtos-h7-azure-rtos-software-expansion
codeUrl: https://github.com/STMicroelectronics/x-cube-azrtos-h7
siteUrl: https://wiki.st.com/stm32mcu/wiki/STM32CoreMW_overview
star: 179
version: v3.4.0
lastUpdated: '2025-07-01'
rtos: threadx
libraries:
- filex
- eclipse-threadx-levelx
topics:
- azure-rtos
- filex
- levelx
- netxduo
- stm32h7
- threadx
- usbx
- x-cube
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- x-cube-azrtos-f7-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-wb-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-g0-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-g4-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-l5-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-l4-azure-rtos-software-expansion-for-stm32cube
---

## Overview

X-CUBE-AZRTOS-H7 is a software expansion package designed to bring the full power of Microsoft Azure RTOS to the STMicroelectronics STM32H7 series of microcontrollers. By integrating Azure RTOS into the STM32Cube environment, ST provides developers with a professional-grade, highly reliable middleware suite that is optimized for performance on high-end STM32 hardware. 

This package is particularly significant for developers building tiny, smart, and connected devices that require the deterministic performance of a real-time operating system combined with industrial-grade networking, file system, and USB support. It effectively bridges the gap between the STM32Cube hardware abstraction layers and the advanced services provided by Azure RTOS.

## Core Middleware Components

The expansion package covers the primary pillars of the Azure RTOS suite, each tailored for the STM32H7 architecture:

- **ThreadX**: A professional-grade RTOS providing advanced scheduling, communication, and synchronization primitives. It features a small footprint and fast execution, making it ideal for resource-constrained yet high-performance applications.
- **NetXDuo**: An industrial-grade dual IPv4 and IPv6 networking stack. It includes a wide array of IoT protocols and is optimized for the Ethernet peripherals found on STM32H7 MCUs.
- **FileX and LevelX**: FileX provides a full FAT file system support, while LevelX offers Flash Wear Leveling for both NOR and NAND memories, ensuring longevity and reliability for data storage.
- **USBX**: A comprehensive USB Host and Device stack that supports multiple classes, including MSC, HID, CDC, and more.

## Hardware Integration and Support

X-CUBE-AZRTOS-H7 is not just a collection of libraries; it includes the necessary porting layers and drivers to ensure these stacks run efficiently on STM32H7 silicon. The repository includes CMSIS, HAL, and BSP drivers specifically for the H7 series. 

To reduce the learning curve, the package provides ready-to-run applicative examples for several popular evaluation boards:
- **NUCLEO-H723ZG**
- **STM32H735G-DK**
- **STM32H747I-DISCO**
- **STM32H743I-EVAL**

## Safety and Security

One of the standout features of the Azure RTOS integration is the inheritance of Microsoft's extensive certifications. The suite comes with safety pre-certifications including IEC 61508 SIL4, IEC 62304 Class C, and ISO 26262 ASIL D. On the security side, it offers EAL4+ for TLS/DTLS and FIPS 140-2 for software cryptographic libraries. This makes the expansion package a strong candidate for medical, industrial, and automotive applications where compliance is mandatory.

## Getting Started with Applications

The repository is structured to help developers move quickly from evaluation to development. The `Projects` directory contains a vast array of examples, ranging from basic thread creation and synchronization to complex USB composite devices and encrypted MQTT clients. 

For instance, developers can explore:
- **Thread Management**: Demonstrations of thread creation, preemption thresholds, and message queues.
- **Networking**: TCP/UDP echo servers, Web servers, and SNTP clients.
- **Storage**: SD card file operations using FileX and NOR/NAND flash management using LevelX.
- **USB**: Comprehensive examples for HID, MSC, CDC_ACM, and even specialized classes like Video and Printer.

By leveraging the STM32CubeMX tool, developers can also configure these components graphically, further simplifying the initialization and integration process into their custom projects.
