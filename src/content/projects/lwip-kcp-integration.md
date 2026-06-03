---
title: lwIP KCP Integration
summary: An integration of the KCP fast reliable ARQ protocol with the lwIP (Lightweight
  IP) stack. It provides example implementations for UDP, TCP, and KCP echo services,
  specifically ported for Unix-like environments using TAP interfaces.
slug: lwip-kcp-integration
codeUrl: https://github.com/yxgi5/lwip_kcp
star: 2
lastUpdated: '2019-02-01'
rtos: ''
libraries:
- lwip
topics:
- kcp
- lwip
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lwip-contrib-unix-port
- udp-ping-pong-on-lwip-and-dpdk
- lwip-for-linux
- lwip-ptp-precision-time-protocol-for-lwip
- lwip-for-esp8266
- lwip-tcp-ip-stack-on-stm32-microcontroller
---

## Overview

This project provides an integration of the KCP protocol into the lwIP (Lightweight IP) stack. KCP is a fast and reliable ARQ (Automatic Repeat-reQuest) protocol that can reduce average latency by 30%-40% compared to TCP, at the cost of 10%-20% more bandwidth waste. By combining KCP with lwIP, this repository offers a networking solution suitable for low-latency embedded applications or simulations running on Unix-like systems.

## Key Features

The repository includes several echo service examples to demonstrate the functionality of different protocols within the lwIP environment:

- **UDP Echo**: Implemented via `udp_client` and `minimal` examples.
- **TCP Echo**: Accessible via `telnet` on port 7 and the `minimal` example.
- **KCP Echo**: Demonstrated through the `kcp_client` and `kcpecho` applications.

The project is structured around the `contrib/ports/unix/` directory, indicating that it is designed to run on Unix-based platforms using a TAP network interface. This setup is common for developing and testing lwIP-based applications before deploying them to actual embedded hardware.

## Technical Implementation

The build system uses a customized Makefile structure, specifically modifying `Common.mk` and `Filelists.mk`. These modifications allow for specific GCC compilation parameters tailored to different parts of the stack and ensure the correct linking of required libraries. 

To facilitate network communication on a host machine, the project utilizes a TAP interface. The repository includes a `setup-tapif` script to initialize the virtual network interface and a `relauch.sh` script to restart the environment if the program crashes during execution.

## Getting Started

To use the project, users typically need to configure their environment using the provided setup scripts. The build process is managed via standard Makefiles, and the resulting binaries can be tested against the echo services mentioned above. For example, to test the TCP echo service, one would connect to the local lwIP instance (defaulting to 192.168.0.2) on port 7.

This integration serves as a valuable reference for developers looking to implement high-performance, low-latency networking in resource-constrained environments where lwIP is the standard stack but TCP's congestion control or latency characteristics are undesirable.
