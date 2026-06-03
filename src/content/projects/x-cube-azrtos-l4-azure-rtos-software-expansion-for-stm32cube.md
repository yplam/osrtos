---
title: X-CUBE-AZRTOS-L4 Azure RTOS Software Expansion for STM32Cube
summary: A comprehensive software expansion package for STM32Cube that integrates
  Microsoft Azure RTOS with the STM32L4 series of microcontrollers. It includes middleware
  components like ThreadX, NetXDuo, FileX, LevelX, and USBX, along with ready-to-run
  examples for evaluation boards.
slug: x-cube-azrtos-l4-azure-rtos-software-expansion-for-stm32cube
codeUrl: https://github.com/STMicroelectronics/x-cube-azrtos-l4
siteUrl: https://www.st.com/x-cube-azrtos-l4
star: 9
version: v2.0.0
lastUpdated: '2023-05-19'
rtos: threadx
libraries:
- eclipse-threadx-levelx
- filex
topics:
- azure-rtos
- filex
- levelx
- netxduo
- stm32l4
- threadx
- usbx
- x-cube
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- x-cube-azrtos-l5-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-f7-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-g4-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-wb-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-f4-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-g0-azure-rtos-software-expansion-for-stm32cube
---

The X-CUBE-AZRTOS-L4 package represents a significant bridge between the STM32Cube ecosystem and Microsoft's Azure RTOS suite. Specifically designed for the STM32L4 series of ultra-low-power microcontrollers, this expansion package simplifies the process of building high-performance, connected, and secure embedded applications.

### A Professional-Grade Middleware Suite
At the heart of this package is **ThreadX**, a highly reliable and market-proven Real-Time Operating System. ThreadX is known for its small footprint and fast execution, making it ideal for the resource-constrained environments typical of the STM32L4 series. Beyond the kernel, the package integrates several critical middleware components:

- **NetXDuo**: An industrial-grade dual IPv4 and IPv6 TCP/IP network stack designed specifically for deeply embedded applications, supporting many IoT protocols.
- **FileX and LevelX**: A high-performance FAT-compatible file system and a Flash Wear Leveling solution that supports both NOR and NAND flash memories.
- **USBX**: A comprehensive USB Host and Device stack that supports a wide range of classes, from Mass Storage (MSC) to Human Interface Devices (HID) and Communication Classes (CDC).

### Seamless STM32Cube Integration
One of the primary advantages of X-CUBE-AZRTOS-L4 is its deep integration with the STM32Cube environment. It provides STM32CubeMX configuration files, allowing developers to configure Azure RTOS components through a graphical user interface. This integration generates the necessary initialization code, significantly reducing the setup time and the learning curve for new users.

For developers transitioning from other environments, the package includes a **CMSIS-RTOS V2 wrapper** and a **FreeRTOS wrapper**. These layers allow existing codebases to run on top of ThreadX with minimal modifications, providing a flexible path for migration.

### Safety and Security
Azure RTOS is distinguished by its extensive certifications. It holds safety pre-certifications for IEC 61508 SIL4, IEC 62304 Class C, and ISO 26262 ASIL D. On the security front, it boasts EAL4+ for TLS/DTLS and FIPS 140-2 for software cryptographic libraries. This makes the X-CUBE-AZRTOS-L4 package an excellent choice for industrial, medical, and automotive applications where reliability is paramount.

### Hardware Support and Examples
The package includes ready-to-run applicative examples for popular ST evaluation boards, including:
- **NUCLEO-L4R5ZI**
- **STM32L4R9I-Discovery**

These examples cover a broad spectrum of use cases, such as thread synchronization using semaphores and mutexes, low-power configuration, memory protection unit (MPU) usage, and complex USB composite device implementations. Whether you are building a simple sensor node or a complex USB-to-Ethernet bridge, the provided projects serve as a robust foundation for development.

### Getting Started
Developers can leverage the STM32CubeIDE, IAR EWARM, or Keil MDK-ARM toolchains to build and debug their applications. The repository structure is organized into Drivers (HAL/BSP), Middlewares (Azure RTOS stacks), and Projects, ensuring a clean separation of concerns and easy navigation. Detailed documentation is available via the STM32 MCU Wiki, providing further guidance on advanced configurations and optimization techniques.
