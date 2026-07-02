---
title: Airfrog
summary: A tiny, wireless co-processor and debugger for ARM microcontrollers based
  on the ESP32-C3. It enables remote telemetry, live re-programming, and wireless
  debugging via SWD using the Rust Embassy framework.
slug: airfrog
codeUrl: https://github.com/piersfinlayson/airfrog
siteUrl: https://piers.rocks/u/airfrog
star: 46
version: v0.1.2
lastUpdated: '2025-09-07'
rtos: ''
topics:
- embassy-rs
- esp32
- rust
- swd
- wifi
isShow: true
image: /202601/airfrog-rev-b-side.webp
createdAt: '2026-01-26'
updatedAt: '2026-01-26'
relatedProjects:
- cmsis-dap-over-tcp-for-esp32
- espradio-tinygo-wireless-networking-for-esp32
- esp32-bus-expander
- xiao-debug-mate
- ghost-esp
- airgradient-pro-rust-firmware
---

## Overview

Airfrog is a compact, open-source wireless co-processor designed specifically for ARM microcontrollers. Built around the affordable ESP32-C3 RISC-V module, it acts as a bridge between your network and a target MCU's Serial Wire Debug (SWD) interface. This allows developers to perform tasks like flashing firmware, debugging, and reading memory without any physical tether to the target hardware.

Measuring just 16x28mm—roughly the size of a postage stamp—Airfrog is designed to be integrated directly into projects or used as a standalone wireless probe. It provides a low-cost ($3 BOM) alternative to traditional wired debuggers while adding advanced co-processing capabilities.

## Key Features & Capabilities

The primary appeal of Airfrog lies in its versatility. It isn't just a programmer; it's a "stealth" co-processor. Because it connects directly to the SWD pins of an ARM MCU (such as the STM32F4), it can access the target's hardware resources—RAM, flash, and peripherals—without the target MCU's knowledge or cooperation. 

**Core use cases include:**
- **Wireless Debugging**: Full integration with tools like `probe-rs`, allowing for a seamless GDB-like experience over WiFi.
- **Remote Telemetry**: Streaming data from a running device's RAM over WiFi to a dashboard or MQTT broker without using target CPU cycles.
- **Live Re-programming**: Updating firmware on the fly while the device is operational, which is ideal for devices in hard-to-reach locations.
- **Stealth Control**: Controlling or monitoring devices without physical access or modifying the target's existing firmware logic.

## Technical Implementation

On the software side, Airfrog is a showcase of modern embedded Rust. It is built from the ground up using the **Embassy** framework, an asynchronous executor that provides high performance and reliability. By leveraging `esp-hal`, the project maintains a completely open-source stack with no closed-source dependencies.

The firmware provides three distinct ways to interact with the target out of the box:
1. **Web Interface**: A built-in web server for manual control, status monitoring, and memory viewing.
2. **REST API**: For easy integration with web-based tooling and automation scripts.
3. **Binary API**: Airfrog's highest performance network interface for high-speed data transfer and intensive debugging tasks.

The hardware is equally impressive in its simplicity. The 2-layer PCB is designed for easy hand-soldering with 0603 passives. It operates on 5V and includes an onboard 3.3V regulator to power both the ESP32-C3 and the SWD logic levels, ensuring compatibility with standard 3.3V ARM targets.

## Integration and Extensibility

Airfrog is designed to be part of a larger ecosystem. It integrates directly with `probe-rs`, meaning existing Rust-based debugging workflows can transition to wireless without changing the developer's primary tooling. Furthermore, the project is structured as a workspace of modular Rust crates, including `airfrog-core` and `airfrog-swd`. This modularity makes it easy for developers to build custom firmware for specific co-processing tasks, such as creating a dedicated wireless bridge for a specific industrial sensor or retro-computing project.

Whether you are looking to add WiFi capabilities to a legacy ARM system or need a low-cost, wireless alternative to expensive JTAG/SWD probes, Airfrog provides a robust, open-source foundation for embedded connectivity.
