---
title: X-CUBE-SUBG2 Firmware Package
summary: An STM32Cube expansion package providing drivers and middleware for the S2-LP
  low-power sub-1GHz transceiver. It features Point-to-Point communication examples
  and a full 6LoWPAN stack based on Contiki-NG for IoT networking. The software supports
  various STM32 Nucleo boards and X-NUCLEO expansion shields.
slug: x-cube-subg2-firmware-package
codeUrl: https://github.com/STMicroelectronics/x-cube-subg2
star: 7
version: v5.0.0
lastUpdated: '2023-12-13'
rtos: contiki-ng
topics:
- 6lowpan
- contiki-ng
- iot
- rpl
- stm32
- wsn
- x-cube
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32cuben6-mcu-firmware-package
- x-cube-azrtos-wl-azure-rtos-software-expansion-for-stm32wl
- x-cube-azrtos-h7-azure-rtos-software-expansion
- x-cube-azrtos-wb-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-g4-azure-rtos-software-expansion-for-stm32cube
- x-cube-azrtos-g0-azure-rtos-software-expansion-for-stm32cube
---

## Overview

The X-CUBE-SUBG2 software package is a comprehensive expansion for the STM32Cube ecosystem, specifically designed to enable sub-1GHz wireless communication. It provides the necessary drivers and middleware to run STM's S2-LP ultra-low-power radio transceiver on STM32 microcontrollers. By leveraging STM32Cube technology, the package ensures high portability across different MCU families, allowing developers to integrate long-range, low-power wireless connectivity into their IoT applications with minimal effort.

## Key Features and Capabilities

The package is built to support a variety of communication patterns, ranging from simple proprietary protocols to standardized mesh networking. 

**Core functionality includes:**
- **Point-to-Point (P2P) Communication**: Simple examples for transferring data directly between two nodes.
- **6LoWPAN Networking**: Integration of the Contiki-NG middleware (v4.6) to provide a full IPv6 stack over low-power wireless personal area networks.
- **Command Line Interface (CLI)**: A dedicated example for configuring the S2-LP radio via the S2-LP DK GUI.
- **Multi-GPIO Demonstration**: Examples showing how to utilize multiple GPIOs for FIFO TX/RX operations.
- **Packet Sniffing**: A serial sniffer tool that captures RF packets and forwards them to Wireshark for protocol analysis.

## Technical Architecture

X-CUBE-SUBG2 is structured to sit on top of the STM32Cube Hardware Abstraction Layer (HAL). This architecture allows the same application code to run on different STM32 hardware by simply swapping the underlying HAL and Board Support Package (BSP) layers. 

The inclusion of Contiki-NG is a significant highlight, providing a robust environment for 6LoWPAN communication. This includes sample applications for UDP Clients and Servers, as well as a Border Router implementation which acts as a bridge between the 6LoWPAN radio network and traditional IPv6 networks.

## Hardware Support

The firmware is optimized for use with ST's expansion board ecosystem. It is specifically designed for the following hardware combinations:
- **Expansion Boards**: X-NUCLEO-S2868A1 (868 MHz), X-NUCLEO-S2868A2 (868 MHz), or X-NUCLEO-S2915A1 (915 MHz).
- **Base Boards**: STM32 Nucleo boards, specifically tested with NUCLEO-F401RE, NUCLEO-L152RE, and NUCLEO-L053R8.

These expansion boards utilize the Arduino UNO R3 connector standard, making them compatible with a wide range of Nucleo development platforms. The package also supports custom board configurations, providing flexibility for final product development beyond the initial evaluation phase.

## Development and Tools

The project supports major embedded development toolchains, including IAR Embedded Workbench, Keil MDK-ARM, and STM32CubeIDE. Because it is an STM32Cube expansion, it integrates with STM32CubeMX, allowing developers to configure the radio parameters and generate initialization code through a graphical interface. For networking tasks, the package includes utilities like `wpcapslip6` to facilitate the connection between the embedded border router and PC-based network analysis tools.
