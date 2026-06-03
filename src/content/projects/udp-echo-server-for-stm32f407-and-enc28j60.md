---
title: UDP Echo Server for STM32F407 and ENC28J60
summary: A UDP echo server implementation for the STM32F407 Discovery board using
  FreeRTOS and the lwIP TCP/IP stack. It interfaces with an ENC28J60 Ethernet controller
  via SPI and features DHCP support and interrupt-driven packet processing.
slug: udp-echo-server-for-stm32f407-and-enc28j60
codeUrl: https://github.com/rauschenbach/udp_echo_server
star: 7
lastUpdated: '2018-11-26'
rtos: freertos
libraries:
- lwip
topics:
- enc28j60
- freertos
- lwip
- stm32
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- udp-echo-server-for-milandr-1986ve3
- stm32h745-ethernet-with-lwip-and-freertos
- lwip-tcp-ip-stack-on-stm32-microcontroller
- modbus-tcp-for-stm32f407
- transfer-files-over-ethernet-with-stm32-and-freertos
- stm32-ftp-server
---

## Overview

This project implements a UDP echo server designed for the STM32F407 Discovery board. It bridges the gap for developers needing Ethernet connectivity on this specific board without sacrificing High-Speed USB functionality. On the STM32F407, the standard RMII/MII pins often conflict with the HS-USB pins; by utilizing an external ENC28J60 Ethernet controller over SPI, this project provides a reliable networking solution for applications like seismic data transmission where high-speed throughput is less critical than pin availability.

## Technical Architecture

The system is built on a robust foundation using FreeRTOS for task scheduling and the lwIP stack for network protocol management. The ENC28J60 controller is interfaced via the SPI2 peripheral. To ensure stable operation, the CPU frequency is tuned to 144 MHz, allowing the SPI clock to remain below the 20 MHz limit required by the Ethernet controller (typically operating around 18 MHz in this configuration).

### Networking and lwIP Integration

The project utilizes lwIP to provide standard networking features, including DHCP for automatic IP address assignment. During development, specific adjustments were made to the lwIP stack to handle checksum generation, as certain hardware definitions in `lwipopts.h` were not processed correctly by the IAR compiler. This required manual patches to `icmp.c` and `ip.c` within the lwIP source to ensure outgoing packets were correctly formed.

### Interrupt-Driven Performance

While early versions of the project relied on a polling loop for packet processing, the current implementation uses an efficient interrupt-driven model. When a packet is received, the ENC28J60 triggers an external interrupt (configured on pin PA0), which then releases a FreeRTOS semaphore. This signals the Ethernet task to process the incoming data, significantly reducing CPU overhead and improving responsiveness.

## Hardware Configuration

The ENC28J60 is connected to the STM32F407 via the following pinout:
- **SCK**: PB10
- **MISO**: PB14
- **MOSI**: PB15
- **CS**: PB12
- **RESET**: PB0
- **INT**: PA0 (formerly PB2)

## Key Features

- **FreeRTOS Integration**: Manages concurrent tasks for the Ethernet driver, DHCP client, and a heartbeat LED.
- **lwIP Stack**: Full UDP support with a functional echo server implementation.
- **DHCP Support**: Automatic network configuration upon connection.
- **Stability Fixes**: Includes logic to clear the `RXERIE` bit in the ENC28J60 `EIE` register to prevent lockups caused by receive buffer overflows.
- **Optimized SPI**: Carefully calculated clock dividers to maintain high performance within hardware limits.

## Getting Started

The core logic resides in `main.c`, which initializes the peripherals and starts the FreeRTOS scheduler. The Ethernet driver is located in `library/lwip/port/enc28j60.c`, containing the low-level SPI communication and interrupt configuration. Developers looking to adapt this for their own projects can find the network configuration settings in `lwipopts.h` and the RTOS kernel settings in `FreeRTOSConfig.h`.
