---
title: LwIP HTTP Server Netconn RTOS Application
summary: A technical demonstration of an HTTP server running on an STM32F429 microcontroller
  using the LwIP TCP/IP stack and FreeRTOS. It utilizes the Netconn API to serve both
  static content and dynamic RTOS runtime statistics to web browsers. The project
  is specifically tailored for the NUCLEO-F429ZI development board using the STM32Cube
  HAL framework.
slug: lwip-http-server-netconn-rtos-application
codeUrl: https://github.com/jvedder/lwip_rtos_http_server
star: 9
lastUpdated: '2020-07-16'
rtos: freertos
libraries:
- lwip
topics:
- http-server
- lwip
- mqtt-client
- nucleo-f429zi
- rtos
- stm32
- stm32f429zi
- tinkering
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- stm32f429-nucleo-lwip-and-freertos-template
- stm32h745-ethernet-with-lwip-and-freertos
- stm32-https-wolfssl-demo
- mqtt-client-and-https-server-using-mbedtls
- lwip-tcp-ip-stack-on-stm32-microcontroller
- stm32-lwip-mqtt-demo
---

## Overview

The LwIP HTTP Server Netconn RTOS project is a comprehensive example of integrating a network stack with a real-time operating system on ARM Cortex-M4 hardware. Specifically designed for the STM32F429xx series, this application demonstrates how to leverage the LwIP (Lightweight IP) stack's Netconn API to build a functional web server. Unlike the simpler raw API, the Netconn API used here requires an underlying RTOS—in this case, FreeRTOS—to handle multi-threaded execution and blocking I/O operations.

## Key Features and Capabilities

The server provides a dual-page interface to connected clients:
- **Static Home Page**: Serves fixed content providing information about the STM32F4 microcontroller and the LwIP stack configuration.
- **Dynamic Statistics Page**: A real-time dashboard that refreshes every second to display current RTOS runtime statistics, demonstrating the server's ability to generate content on-the-fly based on system state.
- **DHCP Support**: The application includes a DHCP client that can automatically acquire an IP address from a local server, though it can also be configured for static IP operation.
- **Netconn API Integration**: Demonstrates the sequential API of LwIP, which is often preferred for its ease of use in multi-threaded environments compared to the callback-based raw API.

## Technical Implementation

The project is built upon the STM32Cube HAL (Hardware Abstraction Layer), which manages the low-level peripherals of the STM32F429. A critical aspect of the implementation is the management of interrupt priorities. Because the Ethernet Link Interrupt Service Routine (ISR) relies on the HAL time base to configure the MAC, the Ethernet interrupt priority must be set lower (numerically higher) than the System Tick interrupt. This ensures that the system clock continues to increment even while the Ethernet driver is processing link changes.

For file management, the project uses a custom ROM-based filesystem. A Perl script, `makefsdata.pl`, is included to convert HTML and image assets into C arrays stored in Flash memory. This allows the server to host web pages without requiring external storage like an SD card.

## Hardware and Environment

The application is optimized for the **NUCLEO-F429ZI** development board. Hardware setup typically involves connecting the board to a PC via a crossover Ethernet cable or to a local network switch using a standard straight-through cable. The project includes a linker script (`STM32F429ZITx_FLASH.ld`) configured for the 2MB Flash and 192KB RAM available on the target MCU.

## Getting Started

To deploy the server, developers need a compatible toolchain (such as System Workbench for MCU or other GCC-based ARM environments). The main configuration points are:
- `lwipopts.h`: For tuning the TCP/IP stack parameters.
- `FreeRTOSConfig.h`: For adjusting task priorities and heap management.
- `main.h`: Where the `USE_DHCP` definition can be toggled.

Once running, the server can be accessed by navigating to the board's IP address in any standard web browser. If DHCP is disabled, the default configuration expects the remote PC to be on the same subnet (e.g., 192.168.0.11).
