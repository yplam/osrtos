---
title: STM32F429 MQTT Client with RTIC and smoltcp
summary: A Rust-based MQTT client implementation for the STM32F429 microcontroller
  using the RTIC framework. It integrates the smoltcp network stack and minimq MQTT
  client to provide a robust, memory-safe networking solution for embedded ARM Cortex-M
  systems.
slug: stm32f429-mqtt-client-with-rtic-and-smoltcp
codeUrl: https://github.com/jonlamb-gh/stm32f429-smoltcp-mqtt-rtic
star: 2
lastUpdated: '2022-04-06'
rtos: rtic
topics:
- mqtt
- no-std
- rtic
- rust
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32f429-rtic-and-smoltcp-example-application
- stm32-lwip-mqtt-demo
- stm32h743zi-rust-playground
- freertos-mqtt-client-demo
- stm32-rtic-project-template
- stm32f429-nucleo-lwip-and-freertos-template
---

The `stm32f429-smoltcp-mqtt-rtic` project is a sophisticated example of building modern, memory-safe embedded applications using the Rust programming language. It targets the STM32F429 microcontroller, specifically the STM32F429ZITx, providing a complete implementation of an MQTT client that leverages a high-performance networking stack and a real-time concurrency framework.

At the heart of the project is **RTIC (Real-Time Interrupt-driven Concurrency)**, a hardware-accelerated concurrency framework for ARM Cortex-M microcontrollers. RTIC ensures efficient task scheduling and resource management, allowing the system to handle networking events and application logic with minimal overhead and guaranteed safety against data races.

### Networking with smoltcp

The project utilizes **smoltcp**, a standalone, event-driven TCP/IP stack designed for bare-metal real-time systems. Unlike many traditional stacks, smoltcp is written in Rust and avoids heap allocation, making it ideal for resource-constrained environments. In this implementation, smoltcp handles:
- Ethernet MAC/PHY interface via the `stm32-eth` crate.
- IPv4 networking.
- TCP and UDP socket management.
- ICMP for diagnostic tools like ping.

### MQTT and Configuration

For messaging, the project employs **minimq**, a lightweight MQTT client. This allows the device to connect to an external broker, subscribe to topics, and publish data. A notable feature is the integration of **miniconf**, which provides a way to manage settings (like LED states) over MQTT using JSON-serialized messages. This demonstrates a practical pattern for remote device configuration in IoT deployments.

### Hardware Setup and Execution

The firmware is designed to run on the STM32F429, utilizing its onboard Ethernet peripheral. The setup process involves initializing GPIOs, configuring the Ethernet hardware and PHY, and setting up the TCP/IP stack with a MAC address and IP configuration. Once the network is ready, the system establishes a connection to the specified MQTT broker.

Users can configure the network settings via environment variables before flashing the device:

```bash
export MAC_ADDRESS="02:00:00:03:02:00"
export IP_ADDRESS="192.168.1.10"
export BROKER_IP_ADDRESS="192.168.1.5"
cargo run --release
```

The project uses `probe-rs` (configured via `Embed.toml`) for flashing and `rtt-target` for real-time logging, providing a seamless development experience where logs are streamed directly from the target hardware to the host console.

### Technical Stack

- **Language**: Rust (2021 edition)
- **RTOS**: RTIC 1.0
- **HAL**: stm32f4xx-hal
- **Network Stack**: smoltcp 0.8
- **MQTT**: minimq 0.5
- **Serialization**: Serde and serde-json-core

This repository serves as an excellent reference for developers looking to implement robust, networked embedded systems with Rust, showcasing how to integrate multiple complex crates into a cohesive, functional firmware image.
