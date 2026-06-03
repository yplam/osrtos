---
title: STM32 FTP Server
summary: An FTP server implementation for the STM32F4-Discovery board utilizing FreeRTOS
  and the LwIP TCP/IP stack. It provides a functional FTP service with support for
  passive mode, directory navigation, and file management via FatFS.
slug: stm32-ftp-server
codeUrl: https://github.com/rauschenbach/ftp_test
star: 4
lastUpdated: '2021-09-30'
rtos: freertos
libraries:
- lwip
topics:
- freertos
- ftpd
- ftpd-server
- lwip
- stm32f4
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- transfer-files-over-ethernet-with-stm32-and-freertos
- ftp-server-with-littlefs-for-wfi32-iot-board
- stm32f429-nucleo-lwip-and-freertos-template
- multiftpserver-library
- udp-echo-server-for-stm32f407-and-enc28j60
- stm32h745-ethernet-with-lwip-and-freertos
---

## Overview

The STM32 FTP Server project is a functional implementation of an FTP service designed for embedded systems, specifically targeting the STM32F4-Discovery development board. By combining the FreeRTOS real-time operating system with the LwIP (Lightweight IP) stack, the project enables network-based file access and management on microcontrollers. The implementation is built to handle various FTP client behaviors and includes specific optimizations for embedded constraints.

## Technical Architecture

The system is structured around several key embedded components:

- **FreeRTOS**: Manages task scheduling, including dedicated threads for the FTP server logic (`ftpd_thread`) and optional DHCP management.
- **LwIP Stack**: Handles the TCP/IP networking layer using the Socket API. The configuration is optimized for STM32 hardware, including support for checksum offloading and specific memory pool settings.
- **FatFS**: Provides the underlying file system support, allowing the FTP server to interact with storage media like SD cards or internal flash.

## Key Features

### FTP Protocol Support
The server implements a wide range of standard FTP commands, including:
- **Passive Mode (PASV)**: Allows the server to assign a data port (defaulting to 10000) for incoming client connections, which is essential for compatibility with modern firewalls and NATs.
- **Directory Navigation**: Includes support for `CWD ..` and `CDUP` commands for navigating the file system hierarchy.
- **File Operations**: Support for standard file transfers, as well as `RENAME FROM` and `RENAME TO` commands.
- **Keep-Alive**: Implementation of the `NOOP` command to prevent connection timeouts during inactivity.

### Client Compatibility
The project has been tested against several popular FTP clients, including FileZilla, Total Commander, FAR Manager, and web browsers like Chrome. It includes specific logic to handle the varying ways these clients send commands, such as handling different path formats and multiple connection attempts from FileZilla.

### Network and Memory Management
Because the project targets resource-constrained hardware, significant attention is paid to memory usage. The developer notes emphasize monitoring the stack and heap, especially when integrating libraries like FatFS. The project also includes a watchdog-like timer mechanism to monitor network connectivity and restart the FTP socket if the connection drops.

## Hardware Integration

While primarily developed for the **STM32F4-Discovery**, the codebase contains references to the CC3200, indicating a focus on portability across different ARM Cortex-M microcontrollers. The hardware setup includes:
- Ethernet configuration via `ETH_BSP_Config()`.
- USART1 initialization for debugging and logging.
- LED status indicators for system activity and task monitoring.

## Getting Started

The core logic is initialized within `main.c`, where the hardware is configured and the FreeRTOS scheduler is started. The FTP task is created with a specific stack size (8x the minimal stack) to ensure stability during complex file operations. Configuration for the network stack and RTOS can be found in `lwipopts.h` and `FreeRTOSConfig.h` respectively. Users looking to implement this should ensure their FatFS configuration supports long filenames if required by their specific application.
