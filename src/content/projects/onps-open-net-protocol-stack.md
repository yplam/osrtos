---
title: onps (Open Net Protocol Stack)
summary: onps is an open-source, independently developed network protocol stack designed
  for resource-constrained microcontrollers. It provides a complete implementation
  of the Ethernet, PPP, TCP, and IP protocol families, featuring a simplified Berkeley
  Sockets API and zero-copy data handling. The stack is optimized for integration
  with RTOS environments like RT-Thread, uC/OS, and FreeRTOS.
slug: onps-open-net-protocol-stack
codeUrl: https://github.com/Neo-T/OpenNPStack
siteUrl: http://www.onps.org.cn
star: 37
version: v1.1.0.230726
lastUpdated: '2024-01-08'
rtos: rt-thread
topics:
- dhcp
- lwip
- net
- onps
- sntp
- tcp
- udp
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- esp-open-rtos
- lwip-ptp-precision-time-protocol-for-lwip
- wiznetinterface-library
- rtos-wot
- lwip-for-esp8266
- stm32duino-lwip
---

## Overview

onps (Open Net Protocol Stack) is a high-performance, open-source network protocol stack developed specifically for resource-constrained embedded systems. Born from over twenty years of industry experience and a decade-long ambition to create a robust alternative to existing stacks like LwIP, onps offers a complete implementation of the Ethernet/PPP/TCP/IP protocol suite. It is designed to be lightweight, efficient, and easy to integrate into modern Real-Time Operating Systems (RTOS).

Unlike many legacy stacks that were built for the "super-loop" or foreground-background era, onps was architected from the ground up to run on top of popular RTOS environments such as RT-Thread, uC/OS-II/III, FreeRTOS, and LiteOS-M. This modern approach ensures that the stack handles concurrency and task synchronization natively within the OS framework.

## Key Features

### Simplified Berkeley Sockets
onps implements a Berkeley Sockets layer that maintains the familiar API structure while simplifying the underlying complexity. It abstracts away tedious operations like select/poll models and manual blocking/non-blocking management. Developers can use standard-style functions such as `socket()`, `connect()`, `send()`, and `recv()` without needing to dive into the protocol stack's internals.

### Zero-Copy Architecture
To meet the extreme memory constraints of microcontrollers, onps utilizes a write-time zero-copy technology. By employing a buffer list (buf list) chain, data is passed from the user layer down through the protocol layers to the hardware driver without unnecessary memory duplication. This significantly reduces RAM usage and CPU overhead during high-speed transmissions.

### Advanced Memory Management
The stack includes a built-in memory management unit (MMU) based on the Buddy algorithm. This provides reliable and secure dynamic memory allocation, maximizing memory utilization while minimizing fragmentation—a critical requirement for long-running embedded devices.

### Comprehensive Protocol Support
Beyond standard TCP and UDP, onps provides a rich set of networking tools and protocols:
- **Link Layer**: Ethernet-II, ARP, and a full PPP implementation (LCP/IPCP/CHAP/PAP).
- **Network/Transport**: IPv4, ICMP, TCP, and UDP.
- **Application Tools**: DHCP client, DNS query, SNTP network timing, Ping, and Telnet.
- **Routing**: Support for both static and dynamic routing tables.

## Technical Implementation

The project is organized into modular directories for easy navigation:
- `bsd/`: Implementation of the socket interface.
- `ethernet/`: Ethernet-specific protocols and DHCP.
- `ip/`: Core IP, ICMP, TCP, and UDP logic.
- `mmu/`: Buddy memory management and buffer list implementation.
- `ppp/`: Point-to-Point Protocol implementation for serial-based networking.
- `port/`: The OS adaptation layer, which is the primary focus for developers porting the stack to new hardware or RTOS.

## Getting Started

onps is highly portable and supports mainstream ARM Cortex-M MCUs (such as STM32F1 and STM32F4) and RISC-V platforms (like the WCH CH32V307). It is compatible with popular IDEs including Keil MDK and IAR.

For developers using RT-Thread, onps is available as a package, making integration as simple as selecting it in the `menuconfig` interface. For other systems, the primary porting task involves implementing the functions defined in the OS adapter layer (`port/os_adapter.c`), which handles task creation, semaphores, and mutexes. The repository provides several verified examples for STM32 and CH32V307 platforms to accelerate the development process.
