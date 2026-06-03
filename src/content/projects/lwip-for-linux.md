---
title: lwIP for Linux
summary: A port of the lwIP (Lightweight IP) TCP/IP stack version 2.0.2 to Ubuntu
  Linux. It utilizes libpcap for network interface access and provides a testing environment
  for developing and debugging networking applications in a desktop environment.
slug: lwip-for-linux
codeUrl: https://github.com/haohd/lwip-linux
star: 34
lastUpdated: '2022-10-17'
rtos: ''
libraries:
- lwip
topics:
- linux
- lwip
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lwip-contrib-unix-port
- udp-ping-pong-on-lwip-and-dpdk
- lwip-kcp-integration
- tinyhttpd-lwip-dpdk
- lwip-ptp-precision-time-protocol-for-lwip
- lwip-tcp-ip-stack-on-stm32-microcontroller
---

## Overview

lwIP (Lightweight IP) is a widely used open-source TCP/IP stack designed specifically for embedded systems. Its primary goal is to reduce RAM usage while providing a full-scale TCP stack, making it a staple in the microcontroller world. The `lwip-linux` project provides a specialized environment to run lwIP version 2.0.2 on Ubuntu Linux. This allows developers to test, simulate, and debug networking logic in a desktop environment before deploying the code to actual embedded hardware.

## Technical Implementation

To bridge the gap between the lwIP stack and the Linux host's network interfaces, this project utilizes `libpcap`. By using libpcap, lwIP can send and receive raw packets directly, effectively bypassing the standard Linux kernel networking stack for the traffic it manages. This architecture is particularly useful for protocol development or for simulating complex network scenarios without the overhead of physical hardware debugging.

The project is configured to link against several standard Linux libraries to support its execution:
- **libpcap**: For packet capture and injection.
- **librt**: For POSIX real-time extensions.
- **libpthread**: For multi-threading support.

## Testing and Configuration

The repository includes built-in test applications to verify the stack's functionality. These tests are controlled via the `./lwip-2.0.2/test/linux/lwip.h` header file using the `TEST_ID` macro.

### Echo Server Test
By setting `TEST_ID` to `ECHO_SERVER`, the application acts as a standard echo service. It listens on port 6677, allowing users to connect via tools like Putty or Telnet to verify two-way communication.

### TCP Client Test
Setting `TEST_ID` to `TCP_CLIENT` configures the application to initiate a connection to a remote server. The remote address defaults to `192.168.2.12` at port `6677`, though these can be modified via the `TCP_REMOTE_SERVER_ADDR` and `TCP_REMOTE_SERVER_PORT` macros respectively.

## Port Constraints and Usage

This specific Linux port of lwIP implements certain constraints on port allocation that developers should be aware of:
- **Local Server Ports**: The implementation supports 32 local server ports in the range of 6677 to 6709.
- **Local Client Ports**: For client-side operations, the stack allocates ports in the range of 49152 to 49184.

## Getting Started

The project is structured as an Eclipse C/C++ project, but it maintains a standard Makefile-based build system. To compile the project, users navigate to the `Debug` folder and run `make`. Because the application requires direct access to network interfaces via libpcap, the resulting binary must be executed with root privileges (e.g., using `sudo`).
