---
title: X-CUBE-AZRTOS-G4 Azure RTOS Software Expansion for STM32Cube
summary: A comprehensive software expansion package that integrates the Microsoft
  Azure RTOS suite into the STM32Cube ecosystem for STM32G4 microcontrollers. It provides
  a full middleware stack including ThreadX, NetXDuo, FileX, LevelX, and USBX, along
  with hardware-specific porting and ready-to-run examples.
slug: x-cube-azrtos-g4-azure-rtos-software-expansion-for-stm32cube
codeUrl: https://github.com/STMicroelectronics/x-cube-azrtos-g4
siteUrl: https://wiki.st.com/stm32mcu/wiki/STM32CoreMW_overview
star: 13
version: v2.0.0
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
- stm32g4
- threadx
- usbx
- x-cube
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- x-cube-azrtos-f4-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-g0-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-l4-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-wb-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-h7-azure-rtos-software-expansion
- x-cube-azrtos-f7-azure-rtos-software-expansion-for-stm32cube
---

## Bridging Azure RTOS and STM32G4 Hardware

X-CUBE-AZRTOS-G4 is a specialized software expansion package designed to bring the full power of Microsoft Azure RTOS to the STMicroelectronics STM32G4 series of microcontrollers. By integrating these professional-grade middleware components into the STM32Cube environment, developers can leverage a highly reliable and market-proven RTOS suite while benefiting from the extensive STM32 development tools and hardware abstraction layers.

The package is designed to reduce the learning curve for developers moving to Azure RTOS on STM32 hardware. It includes not only the core stacks but also the necessary porting layers and initialization code required to run these services on Cortex-M4 based STM32G4 devices.

## A Complete Middleware Suite

The expansion package covers the essential pillars of modern embedded development through the Azure RTOS ecosystem:

*   **ThreadX**: A professional-grade, highly reliable RTOS that provides advanced scheduling, communication, and synchronization primitives.
*   **NetXDuo**: An industrial-grade dual IPv4 and IPv6 network stack optimized for performance, supporting various IoT protocols.
*   **FileX and LevelX**: A full-featured file system and Flash Translation Layer (FTL) that supports both NAND and NOR Flash memories, ensuring robust data management.
*   **USBX**: A comprehensive USB Host and Device stack supporting multiple classes, including CDC, HID, and Mass Storage.

One of the standout features of this integration is the inclusion of safety and security pre-certifications. Microsoft has obtained certifications such as IEC 61508 SIL4 and ISO 26262 ASIL D for safety, as well as EAL4+ and FIPS 140-2 for security, making this package suitable for industrial and automotive applications.

## Hardware Support and Development Tools

X-CUBE-AZRTOS-G4 is specifically tailored for the STM32G4 series. It provides ready-to-run applicative examples for popular evaluation platforms, including the NUCLEO-G474RE and the STM32G474E-EVAL board. These examples demonstrate practical implementations of thread synchronization, message queues, low-power configurations, and USB device classes like CDC-ACM and HID.

The package is compatible with major development toolchains, including:
*   STM32CubeIDE
*   IAR Embedded Workbench (EWARM)
*   Keil Microcontroller Development Kit (MDK-ARM)

## Practical Applications and Examples

To help developers get started quickly, the repository includes several pre-configured projects. These range from basic RTOS concepts like thread creation and synchronization to complex middleware usage. For instance, the `Fx_NoR_Write_Read_File` application demonstrates how to create a FAT file system on NOR flash using FileX and LevelX, while various USBX examples show how to emulate USB-to-UART bridges or HID mouse devices. 

Additionally, the package includes a CMSIS-RTOS V2 wrapper for ThreadX, allowing developers familiar with the ARM CMSIS standard to use a consistent API while benefiting from the underlying ThreadX kernel performance.
