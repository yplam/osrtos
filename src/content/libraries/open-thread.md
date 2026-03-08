---
title: Open Thread
slug: open-thread
summary: OpenThread is an open-source, OS-agnostic implementation of the Thread networking
  protocol designed for low-power wireless mesh networking in home and commercial
  automation. It features a highly portable architecture with a narrow platform abstraction
  layer, supporting System-on-Chip (SoC), Network Co-Processor (NCP), and Radio Co-Processor
  (RCP) designs while maintaining a small memory footprint.
codeUrl: https://github.com/openthread/openthread
siteUrl: https://openthread.io/
star: 3903
version: thread-reference-20250612
lastUpdated: '2026-03-08'
components:
- Network
- Wireless
- IPv6
- 6LoWPAN
- Thread
- Cryptography
- UDP
- CoAP
- DNS
- DHCP
- DTLS
- TLS/SSL
- Shell
platforms:
- ARM
- ARM Cortex-M
- POSIX
- Linux
- QEMU
licenses:
- BSD 3-Clause
libraryType: Wireless
createdAt: '2025-12-25'
updatedAt: '2026-03-08'
---

### Features


- Full implementation of the Thread 1.4.0 specification for reliable and secure mesh networking.

- Support for multiple device roles including Leader, Router, Router-Eligible End Device (REED), and Sleepy End Device (SED).

- Comprehensive IPv6 networking layer with support for raw data interfaces and ICMPv6.

- 6LoWPAN adaptation layer for efficient transmission of IPv6 packets over IEEE 802.15.4.

- IEEE 802.15.4 MAC layer with integrated security, frame filtering, and energy scanning.

- Mesh Link Establishment (MLE) for discovering, configuring, and securing links between neighbors.

- Distance-vector routing protocol for robust mesh topology management and path optimization.

- Border Router support for bidirectional IPv6 reachability between Thread and Ethernet/Wi-Fi networks.

- Integrated UDP socket support for application-layer communication.

- Built-in CoAP client and server for lightweight RESTful interaction over the mesh.

- DHCPv6 client and server for automated address configuration and prefix delegation.

- DNSv6 client for hostname resolution within and outside the Thread network.

- Spinel protocol support for standardized communication between a host and a co-processor.

- OT Daemon for managing Radio Co-Processor (RCP) network interfaces in user-space environments.

- Child Supervision and Periodic Parent Search for maintaining connectivity in dynamic environments.

- Jam Detection to identify and report radio frequency interference affecting network performance.

- Support for Thread Commissioner to securely authenticate and add new devices to the network.

- Narrow Platform Abstraction Layer (PAL) for high portability across different RTOS and hardware architectures.



### Architecture

OpenThread is designed with a highly modular and portable architecture that separates the core protocol stack from the underlying hardware and operating system. The system is built around a narrow Platform Abstraction Layer (PAL), which defines the interfaces for radio, timer, non-volatile storage, and entropy sources. This design allows OpenThread to run on a wide variety of platforms, ranging from bare-metal microcontrollers to full-featured POSIX-based operating systems.

The stack is organized into several functional layers. At the base is the IEEE 802.15.4 MAC layer, which handles radio communication and security. Above this, the 6LoWPAN adaptation layer compresses IPv6 headers for efficient transmission. The core of the stack includes Mesh Link Establishment (MLE) for network configuration and the Mesh Routing layer for path management. Application-level services like UDP, CoAP, and DNSv6 are integrated directly into the stack to provide a complete networking solution for IoT devices.

#### Core Components
- **Thread Stack Core**: Implements MLE, Mesh Routing, and Thread-specific management logic.
- **IPv6/6LoWPAN**: Handles IPv6 addressing, fragmentation, and header compression.
- **Co-Processor Protocols**: Includes Spinel for NCP/RCP communication and the OT Daemon for host-side management.
- **Platform Abstraction Layer (PAL)**: Provides a standardized interface for hardware-specific drivers.

### Use Cases

This library is ideal for:

- **Smart Home Devices**: Powering battery-operated sensors, smart locks, and thermostats that require long battery life and reliable mesh connectivity.
- **Commercial Building Automation**: Creating large-scale, self-healing wireless networks for lighting control and environmental monitoring.
- **Border Routers**: Bridging Thread mesh networks to existing IP infrastructure like Wi-Fi or Ethernet for cloud connectivity.
- **Industrial IoT**: Deploying robust, secure wireless communication in environments where traditional star-topology networks fail.
- **Matter-over-Thread**: Serving as the underlying transport layer for Matter-certified smart home products.

### Getting Started

Developers can begin by exploring the comprehensive documentation and guides available at [openthread.io](https://openthread.io). The repository includes various examples and simulation environments, such as the POSIX-based simulator, which allows for testing Thread networks on a local machine without physical hardware. For hardware integration, the **Porting Guide** provides a step-by-step walkthrough for implementing the Platform Abstraction Layer on new silicon. 

To build the library, developers typically use the provided CMake build system, which supports various configuration options for different device roles (e.g., FTD, MTD) and architectures (SoC, NCP, RCP). Detailed API references for C and C++ are available to assist in building applications directly on top of the OpenThread stack, covering everything from UDP socket management to network commissioning.
