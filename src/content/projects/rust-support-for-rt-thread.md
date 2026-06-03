---
title: Rust Support for RT-Thread
summary: A comprehensive Rust support layer for RT-Thread, providing safe bindings
  for core RTOS features like thread management, synchronization, and message queues.
  It integrates seamlessly with the RT-Thread SCons build system and supports ARM
  Cortex-M and Cortex-A architectures.
slug: rust-support-for-rt-thread
codeUrl: https://github.com/rust-for-rtthread/rtt_rust
star: 15
version: v0.1.0
lastUpdated: '2023-04-09'
rtos: rt-thread
topics:
- embedded
- rt-thread
- rust
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rttrust-rust-wrapper-for-rt-thread
- freertos-rust
- cmsis-rtos2-compatibility-layer-for-rt-thread
- rust-stub-library-for-apache-nuttx
- arduino-rt-thread-library
- micro-ros-for-rt-thread
---

## Overview

The `rtt_rust` project provides a robust support layer for using the Rust programming language within the RT-Thread RTOS ecosystem. By bridging the gap between Rust's memory safety and RT-Thread's real-time capabilities, this project allows developers to build embedded applications that benefit from Rust's modern tooling and safety guarantees while leveraging the mature RT-Thread kernel.

## Key Features

The support layer is designed to be modular and integrates directly into the standard RT-Thread development workflow. Key capabilities currently supported include:

- **Application Lifecycle**: Support for automatic application startup and integration with the RT-Thread Shell (MSH).
- **Thread Management**: Basic thread operations and system delay functions.
- **Synchronization Primitives**: Safe wrappers for system semaphores and mutexes.
- **Inter-thread Communication**: Integration with RT-Thread message queues.
- **Build System Integration**: A custom Python-based build script (`rust_build.py`) that handles the complexities of linking Rust static libraries into the SCons-based RT-Thread build process.

## Technical Architecture

The project is divided into several core components:
- **rtt_rs2**: The core support layer containing the primary Rust bindings for RT-Thread APIs.
- **rtt_main**: A procedural macro crate that simplifies application entry points using the `#[rtt_main]` attribute.
- **rust_build.py**: A sophisticated build utility that manages `bindgen` for header generation, handles target architecture mapping (supporting Cortex-M3, M4, M7, and Cortex-A), and manages the `rust_dummy` project used for linking.

## Getting Started

To use Rust in an RT-Thread project, developers typically place their Rust library in the `applications` directory. The project utilizes a `Cargo.toml` file to manage dependencies on the core support layers. 

A minimal application entry point looks like this:

```rust
#![no_std]

extern crate alloc;

use alloc::string::String;
use rtt_main::rtt_main;
use rtt_rs2::param::Param;
use rtt_rs2::println;

#[rtt_main(appname="demo", run=true, cmd=true, desc="demo app.")]
fn main(param: Param) {
    for i in param {
        println!("{}", String::from_utf8_lossy(&*i))
    }
}
```

## Build Requirements

Because this project targets embedded systems, it requires a specific toolchain setup:
- RT-Thread 3.0 or higher.
- Rust nightly toolchain with `rust-src` component.
- The `toml` Python package for build script execution.
- The `RTT_PATH` environment variable must be set to point to the RT-Thread root directory to allow `bindgen` to locate the necessary C headers.

This integration allows developers to use standard Rust tools like `cargo` for dependency management while maintaining full compatibility with the RT-Thread kernel and its existing C-based ecosystem.
