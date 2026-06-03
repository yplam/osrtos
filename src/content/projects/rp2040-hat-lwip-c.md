---
title: RP2040-HAT-LWIP-C
summary: A C-based implementation of the LwIP networking stack for Raspberry Pi Pico
  and WIZnet Ethernet controllers. It enables high-performance networking on RP2040
  microcontrollers using W5100S and W5500 chips via the Pico SDK.
slug: rp2040-hat-lwip-c
codeUrl: https://github.com/Wiznet/RP2040-HAT-LWIP-C
siteUrl: https://docs.wiznet.io/Product/Open-Source-Hardware/wiznet_ethernet_hat
star: 14
version: v1.1.0
lastUpdated: '2024-08-08'
rtos: ''
libraries:
- lwip
topics:
- c
- cpp
- ethernet
- lwip
- raspberry-pi-pico
- rp2040
- w5100s
- w5100s-evb-pico
- w5500
- w5500-evb-pico
- wiznet-ethernet-hat
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- wiznet-freertos-sdk-for-raspberry-pi-pico-ethernet
- wiznetinterface-library
- w5500-lwip-binding-for-freertos
- pico-100base-tx-bit-banged-100-mbit-s-ethernet
- soem-w5500-ethercat-master-for-raspberry-pi
- picoosc
---

## Overview

RP2040-HAT-LWIP-C is a specialized networking project designed to bridge the Raspberry Pi Pico (RP2040) with WIZnet's hardware Ethernet controllers using the LightWeight IP (LwIP) stack. This repository provides the necessary drivers, porting layers, and examples to implement standard networking protocols on embedded hardware that lacks built-in Ethernet MAC/PHY.

While the RP2040 is a powerful microcontroller, it requires external hardware for wired connectivity. This project targets the WIZnet Ethernet HAT and evaluation boards like the W5100S-EVB-Pico and W5500-EVB-Pico, offering a robust C-based environment for developing networked embedded applications.

## Technical Architecture

The project is built upon several key software components that work together to provide a full networking suite:

- **Pico SDK**: The foundational software development kit for the Raspberry Pi Pico.
- **ioLibrary_Driver**: WIZnet's standard driver for their W5x00 series Ethernet chips, handling low-level SPI communication and register management.
- **LwIP (LightWeight IP)**: A widely used open-source TCP/IP stack designed for embedded systems, integrated here via the `pico-extras` library.
- **Porting Layer**: A dedicated `port/` directory that contains MCU-dependent code, including SPI configurations, GPIO interrupt handling, and timer management.

## Hardware Support

The library is optimized for the following hardware configurations:
- **Raspberry Pi Pico** paired with a **WIZnet Ethernet HAT**.
- **W5100S-EVB-Pico**: An integrated development board featuring both the RP2040 and the W5100S chip.
- **W5500-EVB-Pico**: An integrated development board featuring the RP2040 and the W5500 chip.

## Key Features and Examples

The repository includes several practical examples to help developers get started with network programming:

- **DHCP & DNS**: Automatic IP address assignment and domain name resolution.
- **Loopback**: A basic network test to verify data transmission and reception.
- **iPerf**: A tool for measuring network bandwidth and performance on the RP2040 platform.

## Porting and Customization

One of the project's strengths is its modular porting directory. If a developer wishes to use a different MCU or modify the hardware interface, they can focus on the files within the `port/` directory. This includes:

- **SPI Interface**: Customizing `wizchip_read` and `wizchip_write` functions for specific SPI peripherals.
- **Critical Sections**: Managing concurrency through `wizchip_critical_section_lock` and `unlock`.
- **Timers**: Implementing the 1ms timer required by LwIP for handling timeouts and protocol state machines.

## Project Status

Note that this specific repository has been archived by WIZnet. Ongoing development and the latest updates have moved to the [WIZnet-PICO-LWIP-C](https://github.com/WIZnet-ioNIC/WIZnet-PICO-LWIP-C) repository. Users starting new projects are encouraged to use the newer version for improved compatibility and bug fixes.
