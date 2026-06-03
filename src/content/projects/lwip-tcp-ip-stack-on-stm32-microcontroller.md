---
title: LwIP TCP/IP Stack on STM32 Microcontroller
summary: A reference project demonstrating the integration of the lwIP TCP/IP stack
  with FreeRTOS on STM32F767 microcontrollers. It provides two implementation versions
  for lwIP 2.0.3 and 2.1.2, featuring DHCP client functionality and ICMP support for
  the Nucleo-144 development board.
slug: lwip-tcp-ip-stack-on-stm32-microcontroller
codeUrl: https://github.com/hnkr/stm32_lwip
star: 31
lastUpdated: '2020-01-13'
rtos: freertos
libraries:
- lwip
topics:
- embedded
- embedded-c
- embedded-software
- embedded-systems
- ethernet
- jlink
- lwip
- microcontroller
- ping
- stm32
- tcp-ip
- tcp-socket
- tcpdump
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32h745-ethernet-with-lwip-and-freertos
- rtems-lwip-stm32-integration
- stm32-lwip-mqtt-demo
- sk-mstm32f107-demo-board-example
- stm32f429-nucleo-lwip-and-freertos-template
- udp-echo-server-for-stm32f407-and-enc28j60
---

## Overview

The `stm32_lwip` repository provides a practical implementation of the lwIP (lightweight IP) TCP/IP stack on STM32 microcontrollers. Specifically targeting the STM32F767 on a Nucleo-144 development board, this project serves as a reference for developers looking to integrate networking capabilities into their embedded systems using FreeRTOS.

The repository is organized into two distinct project versions: `lwip_203` and `lwip_212`. The first was generated using the STM32CubeIDE configurator (CubeMX) and utilizes lwIP version 2.0.3. The second version, `lwip_212`, updates the stack to version 2.1.2 while maintaining the same core functionality. Both projects are built upon the FreeRTOS real-time operating system, ensuring that network processing can occur concurrently with other system tasks.

## Core Functionality

When the firmware starts, the system initializes the hardware and the FreeRTOS scheduler. A status indicator (LD3 RED LED) begins blinking to signal that the application is running. The primary network feature demonstrated is the DHCP (Dynamic Host Configuration Protocol) client. Upon connection to a network, the board sends out DHCP Discovery packets to request an IP address from a local server.

Once a DHCP server assigns an IP address to the board, the system becomes reachable over the network. Users can verify connectivity using standard tools like `ping` (ICMP). This setup demonstrates the full path from physical Ethernet connection to high-level protocol handling.

## Technical Implementation

The project is designed to be used with STM32CubeIDE. Developers can build the project using the standard IDE workflow and flash the resulting firmware via ST-LINK or J-Link. The use of FreeRTOS allows the lwIP stack to run in its own thread, which is the standard approach for handling complex networking tasks in embedded environments.

### Key Components
- **Microcontroller**: STM32F767 (ARM Cortex-M7)
- **Development Board**: Nucleo-144
- **RTOS**: FreeRTOS
- **Network Stack**: lwIP (v2.0.3 and v2.1.2)
- **Development Environment**: STM32CubeIDE

## Testing and Debugging

For network debugging, the project suggests using `tcpdump` to capture and analyze traffic. By monitoring the network interface with specific flags (such as `-vv`), developers can observe the DHCP handshake in real-time and verify that the STM32 is communicating correctly with the network infrastructure. This visibility is crucial for troubleshooting timing issues or configuration mismatches in the TCP/IP stack.

This repository is an excellent starting point for embedded developers who need to understand how to bridge the gap between low-level Ethernet drivers and high-level TCP/IP protocols within a multi-threaded RTOS environment.
