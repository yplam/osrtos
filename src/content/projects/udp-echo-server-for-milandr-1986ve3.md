---
title: UDP Echo Server for Milandr 1986VE3
summary: A test project for the Milandr 1986VE3 microcontroller implementing a UDP
  echo server using FreeRTOS and the LwIP stack. It features support for the 5600VG1U
  external Ethernet controller and demonstrates static IP configuration and socket-based
  networking.
slug: udp-echo-server-for-milandr-1986ve3
codeUrl: https://github.com/rauschenbach/udp_rtos_test
star: 2
lastUpdated: '2018-11-20'
rtos: freertos
libraries:
- lwip
topics:
- 1986ve3
- freertos
- lwip
- milandr
- sokets
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- udp-echo-server-for-stm32f407-and-enc28j60
- lwip-tcp-ip-stack-on-stm32-microcontroller
- stm32h745-ethernet-with-lwip-and-freertos
- transfer-files-over-ethernet-with-stm32-and-freertos
- embedded-proto-mbed-os-to-server-example
- stm32f429-nucleo-lwip-and-freertos-template
---

## Overview

This project provides a reference implementation of a UDP echo server for the Milandr 1986VE3 (MDR1986VE3) microcontroller. It integrates the FreeRTOS real-time operating system with the LwIP TCP/IP stack to handle network communication over an external Ethernet controller. The project serves as a robust starting point for developers working with Russian-made Milandr microcontrollers and networking requirements.

## Hardware Integration

The system is designed to interface with the 5600VG1U (5600ВГ1У) external Ethernet chip. A specific hardware requirement noted in the project is the connection of the Ethernet chip's ~IRQ output to the microcontroller pin via a transistor switch. The external bus configuration is handled within the system initialization files, specifically `sys/system_MDR1986VE3.c`.

## Software Architecture

The application leverages a standard RTOS-based networking architecture:

- **FreeRTOS**: Manages task scheduling and synchronization. The configuration is tuned for the Milandr hardware, using a 1000Hz tick rate and a 20KB heap.
- **LwIP Stack**: Configured for UDP operation with the socket API enabled. The implementation includes a custom port for the 5600VG1U controller found in `library/lwip/port/ethernetif/eth5_if.c`.
- **UDP Echo Server**: A dedicated task that listens for incoming UDP packets and reflects them back to the sender, demonstrating basic socket functionality.

## Technical Improvements

A significant focus of this implementation is reliability under load. The developer transitioned from using binary semaphores to counting semaphores within the interrupt service routines. This change was implemented to prevent packet loss during high-frequency operations, allowing the system to maintain stability as the CPU clock frequency increases beyond 40MHz.

## Configuration and Debugging

The project is configured for static IP assignment. For development and troubleshooting, the system supports debugging via semihosting, which can be toggled in the `globdefs.h` file and the IAR Embedded Workbench project options. 

Key configuration files include:
- `FreeRTOSConfig.h`: Defines kernel parameters like priorities and stack sizes.
- `lwipopts.h`: Configures the TCP/IP stack, including memory pool sizes and protocol support (UDP is enabled, while TCP is disabled in this specific test).

## Getting Started

The main entry point in `main.c` initializes the hardware, sets up the CPU clock, and starts the LwIP TCP/IP thread. It then launches the Ethernet task and the ARP timer before starting the FreeRTOS scheduler. This structured approach ensures that the network stack is fully ready before the application logic begins processing packets.
