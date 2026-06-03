---
title: IP over USB
summary: An STM32 embedded firmware demonstration of a virtual network using the lwIP
  stack over a USB CDC-NCM interface. It supports both bare-metal and FreeRTOS implementations,
  providing DNS, DHCP, and HTTP services to a connected PC. The project targets STM32F4
  and STM32L4 discovery boards and includes DFU support for USB-based reprogramming.
slug: ip-over-usb
codeUrl: https://github.com/IntergatedCircuits/IPoverUSB
star: 77
lastUpdated: '2021-01-16'
rtos: freertos
libraries:
- lwip
topics:
- cdc-ncm
- ip-over-usb
- lwip
- stm32
- usb
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- usb-cdc-ecm-for-stm32f072
- lwip-tcp-ip-stack-on-stm32-microcontroller
- stm32-bluepill-rndis-device-with-lwip
- stm32h745-ethernet-with-lwip-and-freertos
- d21eem-usb-cdc-eem-for-samd21
- d21rndis-usb-rndis-for-samd21
---

## Overview

IP over USB is a specialized firmware project designed for STM32 microcontrollers that demonstrates how to implement a virtual network interface over a USB connection. By utilizing the Communication Device Class Network Control Model (CDC-NCM) protocol, the project allows an embedded device to appear as a standard network adapter to a host PC. This setup enables standard networking tools and web browsers to interact with the microcontroller as if it were a server on a local network.

The project serves as both a starting point for IP-over-USB applications and a low-cost platform for developing and testing IP stacks. It provides a complete environment including a web server, DNS, and DHCP services, all running locally on the MCU.

## Technical Architecture

The project is built with flexibility in mind, offering two distinct software configurations to suit different application requirements:

1.  **Bare-Metal Implementation**: This version uses the lwIP native (callback-based) API. It is ideal for resource-constrained scenarios where the overhead of an operating system is not desired.
2.  **RTOS Implementation**: This version integrates FreeRTOS and utilizes the lwIP netconn API. This approach is better suited for complex applications that require multi-threading or more sophisticated task management.

At its core, the project leverages the **USBDevice** library, which provides a high-performance NCM implementation. This implementation features double-buffering and an efficient, simple API to ensure high throughput and low CPU utilization during network transfers.

## Key Features

-   **lwIP 2.1.0 Integration**: A robust TCP/IP stack implementation that includes a custom dummy DHCP server, allowing the host PC to receive an IP address automatically for out-of-the-box operation.
-   **DNS Server**: A local DNS implementation that enables users to access the device via a friendly domain name (e.g., http://www.lwip.home) rather than a static IP address.
-   **USB DFU Support**: The firmware includes a standard Device Firmware Upgrade (DFU) interface, allowing the device to be rebooted into ROM for easy reprogramming over the same USB connection.
-   **Efficient Data Handling**: The NCM implementation is designed for efficiency, making it a viable solution for high-bandwidth embedded networking tasks.

## Hardware Support and Portability

The project is primarily configured for the **STM32F4DISCOVERY** and **32L476GDISCOVERY** boards. However, due to its modular design and use of the STM32_XPD (eXtensible Peripheral Drivers) layer, it is easily portable to other STM32 targets. The build system supports switching between different MCU series (such as STM32F4 or STM32L4) via simple Makefile parameters.

## Getting Started

To use the project, developers can build the image using the provided Makefile and flash it to a supported STM32 board. Once connected to a PC via USB, the device is recognized as a network interface. Because of the built-in DHCP and DNS servers, the device is immediately accessible through a web browser at a predefined local URL. This makes it an excellent platform for developing embedded web interfaces, IoT gateways, or remote diagnostic tools.
