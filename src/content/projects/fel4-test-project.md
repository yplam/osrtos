---
title: feL4 Test Project
summary: A demonstration project showcasing Rust applications running on the seL4
  microkernel using the feL4 framework. It implements inter-thread communication between
  Rust-based threads on ARM and x86 platforms, utilizing the cargo-fel4 build system.
slug: fel4-test-project
codeUrl: https://github.com/jonlamb-gh/fel4-test-project
star: 0
version: 0.0.1
lastUpdated: '2018-07-26'
rtos: sel4
topics:
- rust
- sel4
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- rust-sel4-toy-system-for-i-mx6-sabre-lite
- sel4twinkle-alloc-rs
- selfe-sys-rust-bindings-for-sel4
- solox-amp-rust
- rust-test-app-for-apache-nuttx-os
- rust-fel4-workspace-for-raspberry-pi-3
---

## Overview

The feL4 test project is a demonstration of running Rust code as user-space threads on top of the seL4 microkernel. By leveraging the feL4 framework, the project simplifies the integration of Rust's safety and modern tooling with the high-assurance security properties of seL4. The project serves as a template and proof-of-concept for developers looking to build secure, embedded systems using Rust on microkernel architectures.

## Technical Architecture

The project is structured around the feL4 ecosystem, which provides the necessary glue between the Rust ecosystem and the seL4 kernel. It utilizes `libsel4-sys` for low-level kernel bindings and `wee_alloc` as a lightweight heap allocator suitable for resource-constrained environments. 

The core logic demonstrates Inter-Process Communication (IPC) between two distinct threads, referred to as `thread_a` and `thread_b`. These threads exchange messages using seL4 endpoints, showcasing how Rust can manage kernel capabilities and perform synchronous or asynchronous communication within the seL4 security model.

## Hardware and Platform Support

The project is highly configurable and supports multiple architectures through the `fel4.toml` configuration file. Supported targets include:

- **ARMv7**: Specifically targeting the i.MX6 Sabre Lite platform.
- **AArch64**: Targeting the NVIDIA Jetson TX1.
- **x86_64**: Supporting standard PC platforms via simulation.

The build system uses `Xargo` and `cargo-fel4` to manage cross-compilation for these custom targets, ensuring that the Rust standard library (or a subset thereof) is correctly compiled for the underlying seL4 environment.

## Key Features

- **Rust on seL4**: Demonstrates the use of idiomatic Rust for writing root tasks and user-space threads.
- **Automated Simulation**: Includes built-in support for simulating the resulting system image using QEMU via `cargo fel4 simulate`.
- **Capability Management**: Shows how to handle seL4 endpoint capabilities (`ep_cap`) and badges within a Rust context.
- **Debug Tooling**: The project includes logic for dumping Thread Control Blocks (TCBs) and handling thread faults, which is essential for debugging low-level microkernel applications.

## Getting Started

The project relies on the `cargo-fel4` toolchain. The typical workflow involves preparing the repository dependencies, building the project for a specific target (like ARMv7), and then running it in a simulator to observe the boot sequence and thread interaction.

```bash
# Prepare the environment
./scripts/prepare-repos

# Build the project
cargo fel4 build

# Run in simulation
cargo fel4 simulate
```

Upon execution, the system initializes the seL4 kernel, bootstraps the root task, and spawns the Rust threads. The output logs provide detailed information about the bootinfo structure, untyped memory regions, and the eventual IPC exchange between the application threads.
