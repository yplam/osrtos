---
title: Rust seL4 Toy System for i.MX6 Sabre Lite
summary: A demonstration system built on the seL4 microkernel using the Ferros Rust-based
  userland framework. It targets the i.MX6 Sabre Lite platform and implements a multi-process
  architecture including a TCP/IP stack, persistent storage, and an interactive console.
slug: rust-sel4-toy-system-for-i-mx6-sabre-lite
codeUrl: https://github.com/jonlamb-gh/ferros-sabrelite-toy-system
star: 3
lastUpdated: '2021-11-15'
rtos: sel4
topics:
- bounded-registers
- ferros
- imx6
- no-std
- rust
- sel4
- smoltcp
- tickv
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- fel4-test-project
- solox-amp-rust
- advanced-operating-system-2017-sos
- sel4twinkle-alloc-rs
- ferros
- sel4-hobd-prototype-system
---

## Overview

This project demonstrates a sophisticated embedded system built on the seL4 microkernel using Rust. It leverages **Ferros**, a Rust-based userland that provides compile-time assurances for seL4 development, ensuring that the system's capability-based security model is enforced through Rust's type system. The system is designed specifically for the i.MX6 Sabre Lite platform, supporting both physical hardware and simulation via QEMU.

## System Architecture

The project implements a multi-process architecture where the root task orchestrates several specialized driver and application processes. This design follows the principle of least privilege, isolating different system components into their own address spaces. The process tree includes:

- **IOMUX Driver**: Manages pin multiplexing and hardware configuration.
- **ENET Driver**: Handles the Ethernet hardware interface.
- **TCP/IP Driver**: Implements the network stack (using smoltcp) to provide IP connectivity.
- **Persistent Storage**: Manages non-volatile data using the TickV key-value library.
- **Console Application**: Provides a user-facing command-line interface via Telnet.

## Key Features

### Secure Microkernel Foundation
By using seL4, the system benefits from a formally verified microkernel that provides strong isolation between components. Ferros extends this by allowing developers to define the system's resource distribution and communication paths in Rust, catching configuration errors at compile time rather than runtime.

### Networking Stack
The system includes a functional TCP/IP stack that supports ICMP (ping) and UDP communication. In a simulated environment, the system can be bridged to the host network, allowing users to interact with the embedded console over Telnet or send UDP packets to the host machine.

### Persistent Storage with TickV
For data persistence, the system integrates TickV, a small, file-system-less key-value store designed for flash memory. This allows the system to store and retrieve configuration or state information across reboots, accessible through a dedicated storage sub-menu in the console.

## Interactive Console

Once booted, the system exposes an interactive console. Users can navigate through different sub-menus to interact with system services. For example, the storage menu allows for appending, getting, and invalidating keys, while the network menu supports sending UDP data to remote addresses.

```text
/storage> help
AVAILABLE ITEMS:
  append <key> <value>
  get <key>
  invalidate <key>
  gc
  exit
```

## Technical Implementation

The project is built using the Rust nightly toolchain and the `selfe` build system. It targets the `armv7-unknown-linux-gnueabihf` triple for the i.MX6's Cortex-A9 cores. The build process involves compiling the seL4 kernel, the Rust root task, and the various process ELFs, which are then bundled into a bootable image. 

For those interested in exploring seL4 development with Rust, this repository serves as a practical reference for implementing drivers (like the i.MX6 ENET) and managing complex process hierarchies in a capability-based environment.
