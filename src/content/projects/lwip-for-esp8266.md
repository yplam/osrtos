---
title: lwIP for ESP8266
summary: A specialized port of the lwIP TCP/IP protocol suite for the ESP8266 platform.
  It provides a full-featured network stack optimized for resource-constrained embedded
  systems, supporting TCP, UDP, DHCP, and DNS on the Xtensa LX106 architecture.
slug: lwip-for-esp8266
codeUrl: https://github.com/pfalcon/lwip-esp8266
siteUrl: http://www.nongnu.org/lwip/
star: 18
lastUpdated: '2017-05-20'
rtos: ''
libraries:
- lwip
topics:
- esp8266
- lwip
- upstream
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- stm32duino-lwip
- lwip-ptp-precision-time-protocol-for-lwip
- lwip-contrib-unix-port
- lwirax
- ipv6-for-esp8266-freertos-sdk
- onps-open-net-protocol-stack
---

## Overview

lwIP (Lightweight IP) is a widely-used, independent implementation of the TCP/IP protocol suite designed specifically for embedded systems. This repository provides a port of lwIP tailored for the ESP8266, a popular low-cost Wi-Fi microchip with full TCP/IP stack capability. The primary focus of this implementation is to minimize RAM usage while maintaining a full-scale TCP implementation, making it an ideal fit for the ESP8266's limited memory environment.

In the context of the ESP8266, this project allows developers to use an open-source version of the network stack, often used in conjunction with the `esp-open-sdk` toolchain. It serves as a critical component for developers building custom firmware who require fine-grained control over networking behavior beyond what is provided by the standard vendor SDKs.

## Key Features

The lwIP stack is feature-rich despite its small footprint. It includes support for a wide array of standard protocols necessary for modern IoT and networked devices:

- **Core Protocols**: Full support for IP (Internet Protocol), including packet forwarding across multiple network interfaces, ICMP for network maintenance, and IGMP for multicast traffic.
- **Transport Layer**: A robust TCP implementation featuring congestion control, RTT estimation, and fast recovery/retransmit, alongside UDP (including experimental UDP-lite extensions).
- **Application Support**: Built-in clients for DHCP (Dynamic Host Configuration Protocol), DNS (Domain Name Resolver), and AutoIP (IPv4 link-local addressing).
- **Specialized APIs**: Offers both a raw/native API for maximum performance and lower memory overhead, as well as an optional Berkeley-like socket API for easier porting of existing applications.
- **Additional Protocols**: Support for ARP (Address Resolution Protocol) for Ethernet and PPP (Point-to-Point Protocol).

## Technical Implementation

The project is configured to be built using the `xtensa-lx106-elf` toolchain. The build system, centered around `Makefile.esp8266`, defines specific flags for the ESP8266 environment, such as `ICACHE_FLASH` to manage code execution from flash memory and mappings for system functions like `os_memset` and `os_strlen` provided by the ESP8266 SDK.

The stack is designed to operate within tens of kilobytes of free RAM and roughly 40 kilobytes of code ROM. This efficiency is achieved through careful memory management and a design that avoids unnecessary data copying between layers of the stack.

## Development and Integration

This repository includes the core lwIP source code along with ESP8266-specific fixups and build configurations. The output of the build process is typically a static library (`liblwip_open.a`), which can be linked into ESP8266 firmware projects. 

For developers looking to integrate this into their workflow, the project provides targets to install headers and the compiled library into the `esp-open-sdk` sysroot. This allows for a seamless development experience when building applications that depend on a standard networking interface on the ESP8266 platform.
