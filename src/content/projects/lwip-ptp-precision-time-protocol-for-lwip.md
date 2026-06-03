---
title: 'lwIP-PTP: Precision Time Protocol for lwIP'
summary: A port of the Precision Time Protocol (PTP) for the lwIP TCP/IP stack, enabling
  high-precision time synchronization for embedded systems. Based on the Linux PTP
  implementation and optimized for resource-constrained microcontrollers, it supports
  master/slave scenarios and integrates with the lightweight lwIP networking stack.
slug: lwip-ptp-precision-time-protocol-for-lwip
codeUrl: https://github.com/tsmarques/lwip-ptpd
siteUrl: http://www.nongnu.org/lwip/
star: 7
lastUpdated: '2021-08-13'
rtos: ''
libraries:
- lwip
topics:
- c
- embedded
- firmware
- lwip
- ptp
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- flexptp
- lwip-for-esp8266
- stm32duino-lwip
- lwip-tcp-ip-stack-on-stm32-microcontroller
- lwip-kcp-integration
- rtems-lwip-stm32-integration
---

## Overview

The `lwip-ptpd` project provides an implementation of the Precision Time Protocol (PTP) integrated with the lwIP (Lightweight IP) stack. This project is a port of the Linux PTP implementation, specifically adapted for embedded environments where resources like RAM and ROM are at a premium. It builds upon previous work done for the STM32 F4 platform, offering a solution for developers needing high-accuracy time synchronization in networked embedded devices.

### Precision Time Protocol in Embedded Systems

PTP, defined by the IEEE 1588 standard, is designed to synchronize clocks throughout a computer network. In local area networks, it achieves clock accuracy in the sub-microsecond range, making it suitable for measurement and control systems. This implementation focuses on simple master/slave scenarios, providing the necessary protocol logic to synchronize an embedded device's internal clock with a network master.

### The lwIP Foundation

At its core, this project utilizes lwIP, a widely-used open-source TCP/IP stack designed specifically for embedded systems. lwIP's primary goal is to provide a full-scale TCP implementation while minimizing resource usage. This makes it an ideal fit for microcontrollers with only tens of kilobytes of free RAM and limited code space (around 40 KB of ROM).

By integrating PTP into lwIP, this project allows embedded developers to leverage a robust networking stack that includes:

- **IP Protocols**: IPv4 and IPv6 support including packet forwarding over multiple interfaces.
- **Transport Layer**: UDP (including UDP-lite) and TCP with congestion control and RTT estimation.
- **Network Management**: DHCP, AutoIP/APIPA (Zeroconf), and IGMP/MLD for multicast traffic.
- **Application Layer**: Support for HTTP, MQTT, SNMP, and DNS.

### Technical Implementation and Portability

The implementation is designed to be lightweight and highly portable. It includes hooks for RTOS integration, such as `sys_mbox_trypost_fromisr()`, which is particularly useful when running on kernels like FreeRTOS. The build system is managed via CMake, facilitating easy integration into modern embedded development workflows.

While the project was tested primarily for STM32-based scenarios, the underlying lwIP stack is highly portable across various architectures, including ARM Cortex-M, RISC-V, and AVR. Developers can use the provided source to implement PTP synchronization in their own custom hardware by providing the necessary hardware-specific timing and Ethernet MAC drivers.

### Applications

This library is particularly useful for:

- **Industrial Automation**: Control systems requiring synchronized actions across multiple nodes.
- **Data Acquisition**: Distributed systems where timestamps must be consistent for accurate data analysis.
- **IoT Gateways**: Devices that need to maintain accurate time without a constant connection to a heavy NTP server.
- **Robotics**: Coordination of multiple sensors and actuators over an Ethernet backbone.
