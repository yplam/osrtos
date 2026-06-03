---
title: 'X-CUBE-AZRTOS-L5: Azure RTOS Software Expansion for STM32Cube'
summary: A comprehensive software expansion for the STM32Cube ecosystem that integrates
  Microsoft Azure RTOS with the STM32L5 series of microcontrollers. It provides a
  full suite of middleware including ThreadX, NetXDuo, FileX, LevelX, and USBX, along
  with ready-to-run examples for evaluation boards.
slug: x-cube-azrtos-l5-azure-rtos-software-expansion-for-stm32cube
codeUrl: https://github.com/STMicroelectronics/x-cube-azrtos-l5
siteUrl: https://www.st.com/X-CUBE-AZRTOS-L5
star: 1
version: v2.0.0
lastUpdated: '2023-08-10'
rtos: threadx
libraries:
- eclipse-threadx-levelx
- filex
topics:
- azure-rtos
- filex
- levelx
- netxduo
- stm32l5
- threadx
- usbx
- x-cube
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- x-cube-azrtos-l4-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-wb-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-f7-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-g0-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-g4-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-h7-azure-rtos-software-expansion
---

## Bridging STM32Cube and Azure RTOS

The X-CUBE-AZRTOS-L5 software expansion package represents a powerful collaboration between STMicroelectronics and Microsoft, bringing the professional-grade Azure RTOS suite into the STM32Cube ecosystem. Specifically tailored for the STM32L5 series of microcontrollers, this package simplifies the development of tiny, smart, and connected devices by providing a pre-integrated stack of highly reliable middleware.

By leveraging the STM32L5's architecture, which is based on the ARM Cortex-M33 core with TrustZone security, X-CUBE-AZRTOS-L5 allows developers to build secure and robust applications. The package includes not just the RTOS kernel, but a full complement of networking, file system, and USB stacks, all optimized for STM32 hardware.

## The Azure RTOS Middleware Suite

The core of this expansion is the integration of several key Microsoft Azure RTOS components:

*   **ThreadX**: A professional-grade, highly reliable RTOS known for its small footprint and fast performance. It provides advanced scheduling, communication, and synchronization primitives.
*   **NetXDuo**: An industrial-grade dual IPv4 and IPv6 TCP/IP network stack designed specifically for deeply embedded applications, supporting numerous IoT protocols.
*   **FileX and LevelX**: A high-performance FAT-compatible file system (FileX) paired with a flash wear-leveling library (LevelX) to support NAND and NOR flash memories.
*   **USBX**: A high-performance USB host and device stack that supports multiple classes, enabling complex USB connectivity scenarios.

## Hardware Support and Security

X-CUBE-AZRTOS-L5 is designed to run on the STM32L5 series, with specific support for popular evaluation platforms:
*   **NUCLEO-L552ZE-Q**: A versatile development board for prototyping.
*   **STM32L562E-DK**: A discovery kit that showcases the full capabilities of the L5 series.

A standout feature of this package is its support for **TrustZone** and the **Memory Protection Unit (MPU)**. Examples are provided that demonstrate how to run ThreadX threads in non-secure contexts while invoking secure functions, ensuring a clear separation between sensitive and general-purpose code. Additionally, the package includes Low Power features, allowing developers to utilize ThreadX macros to optimize energy consumption for battery-operated devices.

## Development and Integration

To ensure a smooth developer experience, STMicroelectronics has integrated these stacks into the **STM32CubeMX** configuration tool. This allows for graphical configuration of the Azure RTOS components and automatic generation of initialization code. The package supports major toolchains including IAR Embedded Workbench (EWARM), STM32CubeIDE, and Keil MDK-ARM.

### Example Applications

The repository includes a wide variety of ready-to-run applications to help developers get started quickly:

*   **Thread Management**: Demonstrations of thread creation, synchronization using semaphores/mutexes, and message queues.
*   **USB Connectivity**: CDC_ACM (Virtual COM Port) and HID Mouse emulations.
*   **File Systems**: SD card file operations and NOR flash management using FileX and LevelX.
*   **Advanced Features**: TrustZone-enabled LED toggling and MPU-protected modules.

## Safety and Licensing

Azure RTOS comes with significant industry credentials, including safety pre-certifications for IEC 61508 SIL4, IEC 62304 Class C, and ISO 26262 ASIL D. For security, it offers EAL4+ for TLS/DTLS and FIPS 140-2 for software cryptography. STMicroelectronics provides a granted production license for Azure RTOS when used on officially listed STM32 microcontrollers, making it a commercially viable path for professional product development.
