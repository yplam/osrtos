---
title: STM32F429 RTIC and smoltcp Example Application
summary: A Rust-based example application for the STM32F429 microcontroller utilizing
  the RTIC (Real-Time Interrupt-driven Concurrency) framework and the smoltcp TCP/IP
  stack. It demonstrates Ethernet connectivity, PHY initialization, and UDP communication
  on embedded hardware.
slug: stm32f429-rtic-and-smoltcp-example-application
codeUrl: https://github.com/jonlamb-gh/stm32f429-smoltcp-rtic
star: 0
lastUpdated: '2022-04-02'
rtos: rtic
topics:
- no-std
- rtic
- rust
- smoltcp
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32h743zi-rust-playground
- stm32f429-mqtt-client-with-rtic-and-smoltcp
- stm32f4-rtic-playground
- rust-embedded-examples
- sk-mstm32f107-demo-board-example
- b-l475e-iot01a-discovery-board-support-crate
---

## Overview

The stm32f429-smoltcp-rtic project serves as a robust example of modern embedded development using the Rust programming language. It brings together two powerful components of the Rust embedded ecosystem: **RTIC (Real-Time Interrupt-driven Concurrency)** and **smoltcp**, a standalone, event-driven TCP/IP stack. The project is specifically designed for the STM32F429ZITx microcontroller, showcasing how to implement networking capabilities in a memory-safe and concurrent environment.

## Technical Architecture

The application is built upon the RTIC framework, which provides a hardware-accelerated task scheduler for ARM Cortex-M microcontrollers. RTIC ensures data-race-free execution and efficient interrupt handling, making it ideal for real-time networking applications where timing and reliability are critical.

For the networking layer, the project utilizes `smoltcp`. Unlike traditional stacks like lwIP, `smoltcp` is written in pure Rust and is designed for bare-metal systems without a heap. It handles the complexities of the TCP/IP protocol suite while maintaining a small footprint. The hardware interface is managed via the `stm32-eth` crate, which provides the necessary drivers for the STM32 Ethernet MAC and SMI (Station Management Interface) to communicate with the PHY.

## Key Features

- **Ethernet & PHY Management**: The project includes logic for resetting and configuring the Ethernet PHY, waiting for a link, and managing the hardware-level Ethernet interface.
- **TCP/IP Stack Integration**: Implements IPv4, ICMP, UDP, and TCP sockets. The example specifically demonstrates binding to a UDP port and receiving data.
- **Real-Time Scheduling**: Uses RTIC's monotonic timers to handle network polling, link checks, and clock management.
- **Modern Tooling**: Leverages `probe-rs` (via `Embed.toml`) for seamless flashing and RTT (Real-Time Transfer) for high-speed logging and debugging.

## Execution Flow

When the program starts, it initializes the system clock and the Ethernet peripheral. The console output provides a detailed look at the startup sequence:

```text
INFO - Starting
INFO - Setup: ETH
INFO - Setup: PHY
DEBUG - Reset PHY
DEBUG - Reset complete Bmcr { ... }
INFO - Setup: waiting for link
INFO - Setup: TCP/IP
INFO - IP: 192.168.1.39 MAC: 02-00-05-06-07-08
INFO - Setup: net clock timer
INFO - Setup: net link check timer
INFO - Setup: net poll timer
INFO - Initialized
INFO - Binding to UDP port 12345
INFO - Got 5 bytes from 192.168.1.abc:36291
```

This log illustrates the transition from hardware initialization to a functional network node capable of processing UDP packets. The use of `rtt-logger` ensures that these debug messages are transmitted efficiently to the host machine without significantly impacting the real-time performance of the microcontroller.

## Hardware and Memory Layout

The project targets the STM32F429 series, specifically utilizing 2MB of Flash and 192KB of RAM. The memory layout is strictly defined in the `memory.x` linker script, ensuring that the Rust compiler and linker correctly place the code and data sections for the ARM Cortex-M4 core. This level of control is essential for ensuring the stability of embedded firmware.
