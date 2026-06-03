---
title: STM32H745 Ethernet with LWIP and FreeRTOS
summary: A reference implementation for enabling Ethernet connectivity on the STM32H745
  dual-core microcontroller using LWIP and FreeRTOS. It features a functional DHCP
  client and an HTTP test server running on the NUCLEO-H745ZI-Q development board.
slug: stm32h745-ethernet-with-lwip-and-freertos
codeUrl: https://github.com/AnielShri/STM32H745_Ethernet
star: 34
version: rtos_v1.1
lastUpdated: '2020-04-28'
rtos: freertos
libraries:
- lwip
topics:
- ethernet
- freertos
- lwip
- stm32
- stm32h7
- stm32h745
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- lwip-tcp-ip-stack-on-stm32-microcontroller
- udp-echo-server-for-stm32f407-and-enc28j60
- rtems-lwip-stm32-integration
- stm32f429-nucleo-lwip-and-freertos-template
- transfer-files-over-ethernet-with-stm32-and-freertos
- stm32f7-https-client
---

## Overview

The STM32H745_Ethernet project provides a practical implementation of a networking stack on the high-performance STM32H745 microcontroller. Specifically targeting the NUCLEO-H745ZI-Q development board, this repository demonstrates how to successfully integrate the LWIP (Lightweight IP) stack with the FreeRTOS real-time operating system using the STM32CubeIDE environment.

Getting Ethernet and LWIP to function correctly on the STM32H7 series can be challenging due to the complex memory architecture and dual-core nature of the chip. This project serves as a verified starting point for developers looking to implement robust networking in their embedded applications.

## Technical Implementation

The project is built using STM32Cube firmware version 1.7 and utilizes the standard STM32 HAL (Hardware Abstraction Layer). The architecture is designed to handle network traffic efficiently within an RTOS environment, ensuring that the networking tasks do not block other critical system operations.

**Key components include:**
- **FreeRTOS Integration**: A working RTOS environment with a basic 'blinky' task to verify scheduler health.
- **LWIP Stack**: Configured to work both with and without an RTOS, providing flexibility for different application requirements.
- **DHCP Support**: Automatic IP address acquisition from a router, simplifying network deployment.
- **HTTP Server**: A functional demo server that allows users to navigate to a local IP address to view a demo page.

## Hardware Support

The project is specifically tested on the **NUCLEO-H745ZI-Q**. This board features the STM32H745 dual-core MCU (Cortex-M7 and Cortex-M4), though the networking stack typically resides on the M7 core to leverage its high performance for packet processing. The implementation utilizes the onboard LAN8742 PHY for physical Ethernet connectivity.

## Documentation and Troubleshooting

One of the most valuable aspects of this repository is the included documentation that addresses common pitfalls when working with the STM32H7 Ethernet peripheral. The project provides specific guides for:

- **LWIP Configuration**: Step-by-step instructions for setting up LWIP in both standalone (No-RTOS) and RTOS-enabled modes.
- **SysTick Issues**: Solutions for common bugs where the SysTick timer fails to increment, which is critical for RTOS scheduling.
- **DHCP Stability**: Fixes for scenarios where the board fails to acquire a DHCP IP address if the Ethernet cable is not connected at startup.

## Getting Started

To use this project, developers should clone the repository and open it within STM32CubeIDE. The project includes a `.ioc` file, which allows for easy modification of peripheral settings and pin assignments through the CubeMX graphical interface. Once flashed to a Nucleo board, the system will attempt to join the network via DHCP, after which the HTTP server becomes accessible via the assigned IP address.
