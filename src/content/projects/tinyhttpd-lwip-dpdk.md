---
title: TinyHTTPD lwIP-DPDK
summary: A high-performance web server benchmark tool that integrates the lwIP TCP/IP
  stack with DPDK for user-space networking on Linux. It provides a baseline for comparing
  user-space networking performance against the standard Linux kernel TCP stack, achieving
  significantly higher throughput in TCP ping-pong workloads.
slug: tinyhttpd-lwip-dpdk
codeUrl: https://github.com/yasukata/tinyhttpd-lwip-dpdk
star: 46
lastUpdated: '2024-04-25'
rtos: ''
libraries:
- lwip
topics:
- dpdk
- lwip
- tcp
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- udp-ping-pong-on-lwip-and-dpdk
- lwip-contrib-unix-port
- lwip-for-linux
- lwip-kcp-integration
- lwip-ptp-precision-time-protocol-for-lwip
- straight-httpd-embedded-web-server-simulator
---

## Overview

The `tinyhttpd-lwip-dpdk` project is a specialized benchmark tool designed to evaluate the performance of the lwIP (Lightweight IP) stack when paired with DPDK (Data Plane Development Kit). By running lwIP in user-space and utilizing DPDK's poll-mode drivers, the project bypasses the Linux kernel's networking stack to achieve high-throughput, low-latency TCP communication. This setup is particularly useful for developers looking to understand the overhead of traditional kernel stacks versus user-space networking frameworks.

## Architecture and Integration

The project serves as a bridge between two major networking technologies. lwIP, traditionally used in resource-constrained embedded systems, provides a full TCP/IP implementation. DPDK provides the fast-path framework for accessing network hardware directly from user-space. 

The core of the application resides in `main.c`, which initializes the DPDK Environment Abstraction Layer (EAL) and configures the network interfaces. The integration is handled by mapping lwIP's `linkoutput` function to DPDK's `rte_eth_tx_burst`. Conversely, packets received via `rte_eth_rx_burst` are wrapped into lwIP `pbuf` structures and passed into the stack via `netif->input`. This architecture allows the application to handle network traffic with minimal context switching.

## Performance and Benchmarking

The primary objective of this repository is to establish a baseline for "ping-pong" style TCP workloads. The author provides a comparison against a standard Linux TCP stack implementation using `epoll`. In tests involving concurrent connections ranging from 1 to 128, the lwIP-on-DPDK configuration demonstrated throughput improvements between 51.7% and 483.5% over the native Linux kernel stack. At peak performance with 64 concurrent connections, the system reached over 1.1 million requests per second.

## Technical Implementation

To achieve these results, the project requires a Linux environment on x86-64 CPUs. It leverages several critical DPDK and lwIP features:

- **Hugepages**: Essential for DPDK's memory management to reduce TLB misses and ensure contiguous memory for packet buffers.
- **Poll Mode Drivers (PMD)**: The system eliminates interrupt overhead by constantly polling the NIC for new data.
- **Virtual Devices**: Support for `net_tap` devices allows users to test the stack without dedicated physical hardware by bridging a TAP interface to the DPDK application.
- **Custom lwIP Configuration**: The `lwipopts.h` file is tuned for high-performance scenarios, with significant memory allocations for the heap and pbuf pools, reflecting the high-speed nature of the DPDK environment.

## Getting Started

The build process is highly automated via a `Makefile` that handles the downloading and compilation of specific versions of lwIP (2.1.3) and DPDK (22.03). This ensures a reproducible environment without requiring the user to manually manage complex dependencies. 

```c
// Example of the low-level output bridge between lwIP and DPDK
static err_t low_level_output(struct netif *netif, struct pbuf *p)
{
    // ... packet preparation ...
    assert((tx_mbufs[tx_idx] = rte_pktmbuf_alloc(pktmbuf_pool)) != NULL);
    rte_memcpy(rte_pktmbuf_mtod(tx_mbufs[tx_idx], void *), bufptr, p->tot_len);
    if (++tx_idx == MAX_PKT_BURST)
        tx_flush();
    return ERR_OK;
}
```

Once built, the application can be launched with standard DPDK EAL arguments followed by application-specific flags for IP addressing, gateway configuration, and port selection. For those without spare physical NICs, the project documentation provides detailed instructions on setting up a bridge and a TAP device to confirm reachability and run initial benchmarks.
