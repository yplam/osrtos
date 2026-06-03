---
title: USB CDC-ECM for STM32F072
summary: A USB CDC-ECM implementation for the STM32F072 microcontroller featuring
  embedded virtual DHCP, DNS, and web servers. It utilizes a customized lwIP 1.4.1
  stack to provide network connectivity over USB, fitting within the limited RAM and
  Flash constraints of the Cortex-M0 platform.
slug: usb-cdc-ecm-for-stm32f072
codeUrl: https://github.com/majbthrd/stm32ecm
star: 74
lastUpdated: '2020-04-06'
rtos: ''
libraries:
- lwip
topics:
- cdc-ecm
- ecm
- lwip
- stm32
- stm32f072
- usb
- usb-cdc-ecm
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- ip-over-usb
- d21ecm-usb-cdc-ecm-for-samd21
- stm32-bluepill-rndis-device-with-lwip
- d21eem-usb-cdc-eem-for-samd21
- d21rndis-usb-rndis-for-samd21
- stm32duino-lwip
---

## Overview

The stm32ecm project provides a second-generation implementation of the USB Communication Device Class Ethernet Control Model (CDC-ECM) for the STM32F072 microcontroller. Originally developed to address a lack of open-source implementations for this specific USB class, this project enables an STM32 device to appear as a standard network interface when connected to a host computer.

Unlike simpler USB-to-serial implementations, this project includes a full network stack integration, allowing the microcontroller to host its own virtual network services. It comes equipped with embedded virtual DHCP, DNS, and web servers, making it a self-contained networking peripheral.

## Key Features

- **CDC-ECM Implementation**: Provides a standard Ethernet-over-USB interface compatible with Linux and older macOS hosts.
- **Embedded Network Services**: Includes a built-in DHCP server for automatic IP assignment, a DNS server, and a web server for device interaction.
- **lwIP Integration**: Utilizes a tailored version of lwIP 1.4.1, optimized for low-memory environments.
- **Resource Efficiency**: Despite the high memory demands of TCP/IP, the implementation is tuned to fit within the 16KB of RAM and 128KB of Flash available on the STM32F072.
- **Interactive Web Interface**: Features a demonstration web server accessible at 192.168.7.1, showing real-time data like "Device Time" and providing user controls that trigger local code execution.

## Technical Implementation

The project is built upon the STM32 HAL (Hardware Abstraction Layer) and the lwIP TCP/IP stack. The core of the USB functionality resides in `usbd_ecm.c`, which manages the virtual Ethernet packet flow. 

Incoming packets from the host arrive via bulk endpoints in 64-byte chunks. These are accumulated into a buffer and passed to the lwIP stack via a receive callback. Conversely, outgoing packets are segmented into 64-byte chunks for transmission back to the host. The project uses a specific memory management strategy to handle the constraints of the Cortex-M0 architecture, including custom configurations for the lwIP pool size and TCP window settings.

## Hardware and Software Requirements

The project specifically targets the **STM32F072** microcontroller. While the code is written to be compatible with GCC and Clang, the current build configuration is provided for **Rowley Crossworks for ARM**. 

In terms of host compatibility, the CDC-ECM implementation is known to function with:
- Linux hosts
- Mac OS X Lion 10.7.5

Note that newer versions of macOS (such as El Capitan and High Sierra) may have compatibility issues with this specific implementation. For developers looking for broader cross-platform support, the author suggests looking into the TinyUSB project as a modern alternative.

## Getting Started

Developers can explore `main.c` to understand the integration between the USB stack and the application logic. The project demonstrates how to map web server interactions to physical device actions, such as using the "User Controls" on the embedded web page to execute functions in `app.c`. This makes it an excellent starting point for creating USB-connected instrumentation, configuration interfaces, or IoT gateways that do not require specialized host-side drivers.
