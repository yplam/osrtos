---
title: STM32 BluePill RNDIS Device with LwIP
summary: A project that transforms an STM32 BluePill (F103) into an RNDIS network
  device using the LwIP stack. It features integrated DHCP and DNS servers, allowing
  the microcontroller to be controlled via a web browser over a USB connection.
slug: stm32-bluepill-rndis-device-with-lwip
codeUrl: https://github.com/viteo/STM32-BluePill-RNDIS
star: 19
lastUpdated: '2021-12-20'
rtos: ''
libraries:
- lwip
topics:
- bluepill
- bluepill-board
- lwip
- rndis
- stm32
- stm32f103
- stm32f103c8t6
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- ip-over-usb
- d21rndis-usb-rndis-for-samd21
- usb-cdc-ecm-for-stm32f072
- d21ecm-usb-cdc-ecm-for-samd21
- d21eem-usb-cdc-eem-for-samd21
- transfer-files-over-ethernet-with-stm32-and-freertos
---

## Overview

The STM32-BluePill-RNDIS project demonstrates how to transform a standard STM32F103 "BluePill" development board into a functional RNDIS (Remote Network Driver Interface Specification) device. By leveraging the USB peripheral of the STM32, the board appears as a network adapter to a host computer, enabling TCP/IP communication without requiring external Ethernet hardware.

## Key Features

At the heart of this project is the LwIP (Lightweight IP) stack, which provides the necessary networking protocols for embedded systems. The implementation includes several high-level features that make it easy to interact with the hardware:

- **RNDIS Connectivity**: The device is recognized as a network interface when plugged into a host machine via USB.
- **DHCP Server**: Automatically assigns an IP address to the host connection, simplifying the setup process.
- **DNS Server**: Allows the device to be accessed using readable addresses like `http://run.stm` or `http://run` instead of just an IP address.
- **Web Interface**: A built-in HTTP server hosts an `index.html` page, providing a graphical way to control hardware parameters, such as toggling the onboard LED (PC13).

## Technical Implementation

The firmware is built for the STM32F103C8T6 microcontroller, utilizing the STM32 Standard Peripheral Library. It integrates the `lrndis` library for USB-to-Ethernet encapsulation and the LwIP stack for network management. 

### Memory and Hardware Configuration

According to the project's linker script (`FLASH.ld`) and STM32CubeMX configuration (`.ioc`), the system is optimized for the BluePill's 64KB of Flash and 20KB of RAM. The system clock is boosted to 72MHz using the external high-speed oscillator (HSE) to provide the timing precision required for USB communication.

### Application Logic

The `main.c` file illustrates a straightforward bare-metal execution model. After initializing the system clocks, USB stack, and LwIP, the application enters a continuous loop:

```c
while (1)
{
    if (rndis_data_pending())
        LwIP_Pkt_Handle();
}
```

This loop ensures that network packets are processed as soon as they are received via the RNDIS interface. The project also includes CGI and SSI support for the web server, enabling dynamic interaction between the web page and the microcontroller's GPIOs.

## Getting Started

By default, the device uses the IP address `192.168.7.1`. Once connected, the host machine should automatically receive a network configuration from the BluePill's DHCP server. Users can then navigate to the device's IP or its DNS name in any standard web browser to interact with the board. This project serves as an excellent template for creating USB-tethered IoT devices or embedded systems that require a simple, driverless configuration interface.
