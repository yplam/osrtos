---
title: 'X-CUBE-AZRTOS-WL: Azure RTOS Software Expansion for STM32WL'
summary: A comprehensive software expansion package integrating Microsoft Azure RTOS
  with the STM32Cube ecosystem for STM32WL microcontrollers. It provides a full suite
  of industrial-grade middleware including ThreadX, NetXDuo, FileX, and LevelX, optimized
  for low-power wireless IoT development.
slug: x-cube-azrtos-wl-azure-rtos-software-expansion-for-stm32wl
codeUrl: https://github.com/STMicroelectronics/x-cube-azrtos-wl
siteUrl: https://www.st.com/X-CUBE-AZRTOS-WL
star: 5
version: v2.0.0
lastUpdated: '2023-05-19'
rtos: threadx
libraries:
- filex
- eclipse-threadx-levelx
topics:
- azure-rtos
- filex
- levelx
- netxduo
- stm32wl
- threadx
- usbx
- x-cube
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- x-cube-azrtos-f4-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-wb-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-g4-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-l4-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-l5-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-g0-azure-rtos-software-expansion-for-stm32cube
---

## Integration of Azure RTOS into the STM32WL Ecosystem

X-CUBE-AZRTOS-WL represents a significant bridge between the STM32Cube ecosystem and Microsoft Azure RTOS, specifically tailored for the STM32WL series of microcontrollers. This expansion package enables developers to leverage a professional-grade, highly reliable middleware suite that is market-proven for tiny, smart, and connected devices. By providing a smooth integration with STM32CubeMX, it reduces the learning curve for developers moving into the Azure RTOS environment while maintaining the familiar STM32 development workflow.

## Core Middleware Components

The package includes a full stack of Azure RTOS components, each serving a critical role in embedded system development:

*   **ThreadX**: A deterministic and advanced Real-Time Operating System (RTOS) that provides priority-based preemptive scheduling, fast interrupt response, and memory management.
*   **NetXDuo**: An industrial-grade dual IPv4 and IPv6 network stack designed specifically for deeply embedded, real-time, and IoT applications. It includes numerous IoT protocols and is optimized for performance.
*   **FileX and LevelX**: A high-performance FAT-compatible file system (FileX) paired with a Flash Translation Layer (LevelX) that supports NAND and NOR flash memories, ensuring robust data management on embedded storage.
*   **USBX**: A high-performance USB host, device, and OTG stack with support for multiple classes.

## Hardware Support and Optimization

While the middleware is generic, this package provides the specific porting layers required for the STM32WL series hardware. It includes CMSIS, HAL, and BSP drivers, ensuring that the RTOS can interact efficiently with the underlying silicon. The primary evaluation target is the NUCLEO-WL55JC board, for which several ready-to-run applicative examples are provided.

One of the standout features of this integration is the support for low-power modes. The STM32WL series is designed for long-range wireless communication where power efficiency is paramount. The package includes examples demonstrating how to configure the ThreadX LowPower feature to maximize battery life without sacrificing RTOS responsiveness.

## Safety and Security Certifications

Azure RTOS is notable for its extensive pre-certifications, making it suitable for regulated industries. It holds safety certifications including IEC 61508 SIL4, IEC 62304 Class C, and ISO 26262 ASIL D. On the security front, it features EAL4+ for TLS/DTLS and FIPS 140-2 for software cryptographic libraries. These certifications, combined with ST's granted production license for STM32 hardware, provide a solid foundation for commercial and industrial product development.

## Practical Applications and Examples

To help developers get started quickly, the repository includes several application examples that demonstrate core RTOS concepts:

*   **Thread Management**: Examples for thread creation, destruction, and priority adjustment.
*   **Synchronization**: Demonstrations of binary semaphores and mutexes for resource management.
*   **Inter-thread Communication**: Usage of Message Queues and event queue chaining.
*   **Memory Protection**: Utilizing the Memory Protection Unit (MPU) to load and unload modules safely.
*   **Standalone File Systems**: Creating FAT file systems on internal SRAM using FileX without requiring the full RTOS stack.

Developers can use STM32CubeMX to generate the initialization code for these components, further streamlining the setup process for new projects.
