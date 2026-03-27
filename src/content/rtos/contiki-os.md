---
title: Contiki OS
slug: contiki-os
summary: Contiki is a lightweight, open-source operating system designed for resource-constrained
  microcontrollers in the Internet of Things (IoT). It features a modular, event-driven
  architecture that supports standardized low-power wireless communication protocols
  while maintaining an extremely small memory footprint.
codeUrl: https://github.com/contiki-os/contiki
siteUrl: http://www.contiki-os.org/
star: 3792
version: '3.0'
lastUpdated: '2018-11-03'
components:
- Network
- Wireless
- IPv6
- TCP
- UDP
- 6LoWPAN
- CoAP
- FileSystem
- Shell
- Profiling
- Simulator
- Cryptography
platforms:
- ARM
- MSP430
- AVR
- x86
- POSIX
- Native
- Simulator
licenses:
- BSD 3-Clause
libraries:
- uIP
- Rime
createdAt: '2018-11-03'
updatedAt: '2026-03-27'
---

### Features


- Event-driven kernel with optional per-process multi-threading capabilities.

- Protothreads mechanism providing lightweight, stackless threading to minimize memory overhead.

- Full IPv6 and IPv4 networking stacks including TCP, UDP, and ICMP support.

- Implementation of 6LoWPAN for efficient IPv6 communication over low-power wireless links.

- RPL (IPv6 Routing Protocol for Low-Power and Lossy Networks) for mesh networking.

- Support for the CoAP (Constrained Application Protocol) for RESTful web services.

- Dynamic loading and unloading of individual programs or services at runtime.

- Integrated power profiling tools to monitor and optimize energy consumption.

- Coffee flash file system designed specifically for flash memory constraints.

- ContikiMAC and TSCH radio duty-cycling mechanisms for ultra-low power operation.

- Cross-layer network simulation through the integrated Cooja simulator.

- Support for a wide range of 8-bit, 16-bit, and 32-bit microcontroller architectures.

- Rime stack providing a set of custom lightweight communication primitives.

- Shell interface for interactive system management and debugging.

- Standardized hardware abstraction layer for easy porting to new platforms.



Contiki utilizes a modular, event-driven architecture centered around a lightweight kernel. To manage concurrency without the high memory overhead of traditional multi-threading, Contiki introduces **Protothreads**, which are stackless threads that allow for blocking operations using a very small amount of RAM per process. The system is designed to be highly portable, separating the core OS logic from the hardware-specific drivers through a well-defined abstraction layer.

The system's networking subsystem is its most significant component, featuring the uIP stack for standard TCP/IP communication and the Rime stack for low-level, low-power wireless primitives. These stacks interact with various MAC and RDC (Radio Duty Cycling) layers to ensure that the radio, typically the most power-hungry component, is active only when necessary. This modularity allows developers to swap networking protocols based on the specific requirements of their IoT application.

#### Core Components
- **Kernel**: Event-driven core managing process scheduling and timers.
- **Protothreads**: Lightweight threading library for memory-efficient concurrency.
- **uIP Stack**: Small-footprint TCP/IP implementation supporting IPv4 and IPv6.
- **6LoWPAN**: Adaptation layer for IPv6 over IEEE 802.15.4.
- **Coffee FS**: A file system optimized for the wear-leveling and page-access requirements of flash memory.
- **Cooja**: A cross-layer simulator that allows for the emulation of entire Contiki networks.

### Use Cases
This RTOS is ideal for:
- **Smart City Infrastructure**: Powering networked street lighting and sound monitoring systems where long-term battery operation and mesh networking are required.
- **Industrial Monitoring**: Deploying sensor networks in factories for vibration or temperature tracking using standardized industrial wireless protocols.
- **Utility Metering**: Enabling networked electrical power meters to communicate consumption data over large-scale residential mesh networks.
- **Environmental Sensing**: Supporting radiation or construction site monitoring where devices must remain autonomous for years on small batteries.

### Getting Started
To begin developing with Contiki, developers typically start by setting up the toolchain for their target hardware, such as the MSP430 or ARM Cortex-M. The repository includes a variety of examples in the `examples/` directory, ranging from simple 'Hello World' applications to complex web servers and mesh networking demos. For simulation-based development, the Cooja simulator (found in `tools/cooja`) is the primary tool for testing network behavior before deploying to physical hardware. Note that while this repository contains the historical Contiki-OS, new projects are often encouraged to look at **Contiki-ng**, the next-generation evolution of the platform, for updated hardware support and modern features.
