---
title: STM32F7 LXI Device
summary: An LXI (LAN eXtensions for Instrumentation) compatible device firmware for
  the STM32F746ZG Nucleo board. It integrates FreeRTOS and LwIP to provide a web interface,
  SCPI command parsing over TCP/IP, and LXI discovery protocols.
slug: stm32f7-lxi-device
codeUrl: https://github.com/mnemocron/STM32F7_LXI_Device
siteUrl: https://www.nongnu.org/lwip/2_0_x/ip4__addr_8h.html
star: 27
version: v0.1.0
lastUpdated: '2021-12-31'
rtos: freertos
libraries:
- lwip
topics:
- echo-server
- httpd
- lwip
- lxi
- lxi-device
- lxi-tools
- scpi
- tcp-server
- vxi11
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- lwip-tcp-ip-stack-on-stm32-microcontroller
- stm32h745-ethernet-with-lwip-and-freertos
- udp-echo-server-for-stm32f407-and-enc28j60
- stm32f429-nucleo-lwip-and-freertos-template
- rtems-lwip-stm32-integration
- ip-over-usb
---

## Overview

The STM32F7 LXI Device project provides a robust implementation of the LXI (LAN eXtensions for Instrumentation) standard on the STM32F746ZG (Nucleo-144) platform. By combining the high-performance ARM Cortex-M7 core with the LwIP TCP/IP stack and FreeRTOS, this project enables developers to create network-connected test and measurement equipment that adheres to industry-standard discovery and communication protocols.

## Key Features

The firmware implements several critical components of the LXI specification, ensuring that the device can be discovered and controlled by standard instrumentation tools. Key capabilities include:

- **Network Management**: Support for DHCP IP address management, AutoIP, and manual configuration (IP, Netmask, Gateway).
- **Web Interface**: An integrated HTTP server using CGI and SSI to provide a web-based configuration and status interface.
- **LXI Discovery**: Implementation of the Sun-RPC Protocol based on UDP (Portmap) to respond to discovery broadcasts from tools like the official LXI Discovery Tool and lxi-tools.
- **SCPI Parsing**: Integration of a SCPI (Standard Commands for Programmable Instruments) parser to handle instrument control commands over TCP/IP.
- **Hardware Integration**: Unique EUI48 MAC address retrieval from external EEPROM and persistent storage of user settings.

## Technical Architecture

The project is built using STM32CubeIDE and leverages a multi-layered software stack:

### RTOS and Networking
FreeRTOS manages the system tasks, ensuring that the Ethernet connection and SCPI processing do not block other system operations. The LwIP stack handles the networking layer, providing the foundation for the HTTP server and the custom RPC server used for LXI identification.

### LXI Identification and Discovery
For a device to be LXI-compliant, it must respond to specific discovery protocols. This project implements a `rpc_server.c` that handles UDP/RPC/Portmap broadcasts. When a discovery tool sends a `GETPORT` command, the device replies, allowing the tool to subsequently request the `/lxi/identification.xml` file via the web server. This XML file contains the mandatory identification metadata required by the LXI standard.

### SCPI Command Handling
The SCPI implementation is centralized in `scpi-def.c`. This module defines the command tree, handles argument preprocessing, and executes callback functions. This structure allows for a clean separation between the networking logic and the instrument-specific command logic.

## File Structure and Development

- **Core/Src**: Contains the main application logic, including `scpi-def.c` for command definitions and `rpc_server.c` for discovery protocols.
- **LWIP/App**: Handles the initialization of the network stack with support for various IP assignment methods.
- **Tools/fs**: Contains the source files for the web interface. The project uses the `makefsdata` utility to convert these files into a C-based filesystem (`fs_data_custom.c`) that LwIP's httpd can serve from internal flash.

## Getting Started

The project targets the Nucleo-F746ZG board. Developers can import the project into STM32CubeIDE to begin customization. The firmware is designed to be resilient; for instance, the MCU continues to run even if the Ethernet connection is lost and will automatically reconnect when the cable is plugged back in. To customize the web interface, users modify the files in the `Tools/fs` directory and run the provided `fsdata.sh` script to regenerate the internal filesystem.
