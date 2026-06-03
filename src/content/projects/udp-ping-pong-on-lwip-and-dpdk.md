---
title: UDP Ping-Pong on lwIP and DPDK
summary: A high-performance UDP benchmarking tool that integrates the lwIP network
  stack with DPDK. It allows for low-latency network testing on Linux by bypassing
  the kernel stack while maintaining a full TCP/IP implementation via lwIP.
slug: udp-ping-pong-on-lwip-and-dpdk
codeUrl: https://github.com/yasukata/udpingpong-lwip-dpdk
star: 4
lastUpdated: '2022-12-26'
rtos: ''
libraries:
- lwip
topics:
- dpdk
- lwip
- udp
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- tinyhttpd-lwip-dpdk
- lwip-for-linux
- lwip-kcp-integration
- lwip-contrib-unix-port
- lwip-ptp-precision-time-protocol-for-lwip
- udp-echo-server-for-milandr-1986ve3
---

## Overview

The `udpingpong-lwip-dpdk` project is a specialized networking application designed to perform UDP ping-pong latency and throughput benchmarks. It uniquely combines two powerful networking technologies: **DPDK (Data Plane Development Kit)** for high-speed, kernel-bypass packet I/O, and **lwIP (Lightweight IP)**, a widely used open-source TCP/IP stack often found in embedded systems.

By running lwIP on top of DPDK, the project allows developers to utilize a full-featured network stack without the overhead of the standard Linux kernel networking subsystem. This approach is particularly useful for high-performance networking applications where low latency and high packet rates are critical.

## Technical Architecture

The application is built to run on Linux (specifically tested on Ubuntu 20.04) but operates at a systems level that mimics high-performance embedded network appliances. 

### Integration of lwIP and DPDK

The project uses DPDK as the underlying hardware abstraction layer to send and receive raw Ethernet frames. lwIP is then layered on top to handle the protocol logic (ARP, IP, UDP). The integration is managed through a custom `main.c` that initializes the DPDK Environment Abstraction Layer (EAL) and hooks the lwIP stack into the DPDK poll mode drivers. This setup allows the application to process packets directly from the NIC, significantly reducing the context-switching overhead associated with the standard Linux socket API.

### Build System

One of the most convenient features of this repository is its self-contained build system. The provided `Makefile` is designed to:
1.  Download specific versions of lwIP (2.1.3), lwIP contrib (2.1.0), and DPDK (22.11.1).
2.  Extract and compile these dependencies locally within the project directory.
3.  Configure DPDK using `meson` and `ninja`.
4.  Link the final application against the locally built libraries.

This ensures that the environment is consistent and does not require pre-installed system-wide DPDK libraries or root permissions for the installation phase.

## Application Behavior

The project produces a single binary named `app` that can be configured to run in either server or client mode.

### Server Mode

In server mode, the application listens on a specified UDP port. Upon receiving a packet, it immediately reflects the data back to the sender. This "ping-pong" behavior is used to measure the round-trip time and processing overhead of the stack.

### Client Mode

The client initiates the ping-pong sequence by transmitting a set number of packets, referred to as "ping-pong balls" or the queue depth. Each packet contains a unique integer ID in its payload. As the client receives reflected packets from the server, it tracks the IDs and prints the total number of received packets every second, providing a real-time view of the network performance.

## Configuration and Usage

Network parameters such as IP addresses, gateways, netmasks, and ports are configured via command-line arguments. The application also supports DPDK-specific flags for EAL configuration, such as CPU core masking (`-l`) and PCIe device allow-listing (`--allow`).

Example server command:
```bash
sudo LD_LIBRARY_PATH=./dpdk/install/lib/x86_64-linux-gnu ./app -l 0-1 --proc-type=primary --file-prefix=pmd1 --allow=0000:04:00.1 -- -a 10.0.0.2 -g 10.0.0.1 -m 255.255.255.0 -p 10000
```

Example client command:
```bash
sudo LD_LIBRARY_PATH=./dpdk/install/lib/x86_64-linux-gnu ./app -l 0-1 --proc-type=primary --file-prefix=pmd1 --allow=0000:04:00.1 -- -a 10.0.0.3 -g 10.0.0.1 -m 255.255.255.0 -s 10.0.0.2 -p 10000 -q 8 -l 32
```

The project serves as an excellent reference for developers looking to implement high-performance networking tools or porting embedded-style network stacks to modern high-speed hardware.
