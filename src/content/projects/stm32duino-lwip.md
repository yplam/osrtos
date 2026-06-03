---
title: STM32duino LwIP
summary: A specialized port of the Lightweight TCP/IP (LwIP) stack for STM32 microcontrollers,
  modified to comply with Arduino library specifications. It provides a full-scale
  TCP/IP implementation optimized for resource-constrained embedded systems with limited
  RAM and ROM.
slug: stm32duino-lwip
codeUrl: https://github.com/stm32duino/LwIP
siteUrl: https://savannah.nongnu.org/projects/lwip/
star: 122
version: 2.1.3
lastUpdated: '2023-11-08'
rtos: ''
libraries:
- lwip
topics:
- lwip
- tcp
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lwip-for-esp8266
- lwip-tcp-ip-stack-on-stm32-microcontroller
- lwip-ptp-precision-time-protocol-for-lwip
- modbus-tcp-for-stm32f407
- rtems-lwip-stm32-integration
- usb-cdc-ecm-for-stm32f072
---

## Overview

LwIP (Lightweight TCP/IP) is a widely recognized open-source TCP/IP stack designed specifically for embedded systems. Originally developed by Adam Dunkels at the Swedish Institute of Computer Science (SICS), it has become a standard in the industry for providing robust networking capabilities to microcontrollers with limited resources. 

The **STM32duino LwIP** repository provides a specialized version of this stack, tailored for the STM32duino ecosystem. This version is based on the STMicroelectronics fork of LwIP (`stm32_mw_lwip`), specifically modified to fit the Arduino library structure. It serves as a foundational component for other high-level networking libraries, such as the STM32Ethernet library, enabling STM32-based boards to communicate over standard network protocols.

## Key Features and Protocol Support

Despite its "lightweight" moniker, LwIP is a feature-rich implementation of the TCP/IP protocol suite. It is designed to provide a full-scale TCP implementation while maintaining a small memory footprint, typically requiring only tens of kilobytes of free RAM and approximately 40 kilobytes of code ROM. 

**Core protocols supported include:**
- **Transport Layer:** Full TCP (with congestion control, RTT estimation, and fast recovery) and UDP.
- **Network Layer:** IPv4 and IPv6 (dual-stack support), ICMP, IGMP, and ND.
- **Application Layer Add-ons:** DHCP client, DNS client (including mDNS), SNMP agent (v1, v2c, and v3), MQTT client, HTTP/HTTPS server and client, SMTP, SNTP, and TFTP.
- **Link Layer:** ARP, PPPoS, PPPoE, and 6LowPAN (over IEEE 802.15.4 or BLE).

## Technical Architecture and APIs

One of the strengths of LwIP is its flexibility in how it interfaces with the underlying system. It offers multiple APIs to cater to different performance and complexity requirements:

- **Raw API:** A callback-based API that provides the highest performance and lowest memory overhead by allowing zero-copy data processing. It is ideal for high-throughput applications but requires a deeper understanding of the stack's internal state machine.
- **Netconn/Socket API:** For developers familiar with standard network programming, LwIP provides an optional Berkeley-like socket API. This is generally easier to use but requires an underlying operating system or RTOS to handle threading.

## Integration and Ecosystem

This specific port is maintained by the STM32duino team to ensure seamless integration with STM32 microcontrollers within the Arduino IDE or PlatformIO environments. It leverages the hardware acceleration features provided by STMicroelectronics' own LwIP modifications, such as hardware checksum offloading where available.

While LwIP can run in a "NO_SYS" mode (bare-metal), it is also highly compatible with real-time operating systems. The stack includes hooks for integration with RTOSs like FreeRTOS, providing thread-safe message passing and synchronization primitives through its `sys_arch` layer. This makes it suitable for everything from simple standalone sensors to complex, multi-threaded IoT gateways.

## Getting Started

For most users, this library is used as a dependency for the `STM32Ethernet` library. However, advanced users can interact with the LwIP stack directly to implement custom protocols or optimize network performance. The library follows the standard Arduino structure, with source files located in the `src` directory and metadata defined in `library.properties`. Because it is based on LwIP v2.1.3, users can refer to the extensive upstream documentation provided by the Savannah project for detailed API references and configuration options.
