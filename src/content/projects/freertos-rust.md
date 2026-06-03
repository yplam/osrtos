---
title: FreeRTOS-rust
summary: A Rust wrapper and build system for the FreeRTOS kernel that enables embedded
  development with native FreeRTOS scheduling. It provides a safe Rust interface for
  kernel primitives and automates the compilation of C-based FreeRTOS sources through
  Cargo build scripts.
slug: freertos-rust
codeUrl: https://github.com/lobaro/FreeRTOS-rust
star: 460
version: v0.2.0
lastUpdated: '2025-12-18'
rtos: freertos
topics:
- embedded
- freertos
- nrf9160
- rtos
- rust
- stm32
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- rttrust-rust-wrapper-for-rt-thread
- rust-support-for-rt-thread
- freertos-cpp
- rust-stub-library-for-apache-nuttx
- ferros
- stm32-rtic-project-template
---

## Bridging Rust and FreeRTOS

FreeRTOS-rust provides a seamless way to use the FreeRTOS real-time operating system within Rust-based embedded applications. While Rust offers modern memory safety and concurrency guarantees, FreeRTOS remains the industry standard for microcontrollers. This project bridges that gap by providing high-level Rust bindings and a robust build system that integrates the C-based kernel directly into the Rust compilation workflow.

This project evolved from the original `freertos.rs` with several key improvements designed to simplify the developer experience. Unlike its predecessor, FreeRTOS-rust allows the application's `main()` entry point to be written entirely in Rust, enables starting the FreeRTOS scheduler from Rust code, and utilizes the FreeRTOS heap as the global memory allocator for the Rust runtime.

## How the Integration Works

The project is split into two primary components: `freertos-rust`, which provides the API for tasks, queues, and semaphores, and `freertos-cargo-build`, a build-dependency that automates the compilation of the FreeRTOS C source files. 

During the build process, the `freertos-cargo-build` crate uses the `cc` crate to compile the original FreeRTOS kernel sources into a static archive. This archive is then linked against the Rust application. This approach eliminates the need for complex Clang skeleton projects or manual Makefile management. Developers simply specify the path to the FreeRTOS kernel, the location of their `FreeRTOSConfig.h`, and the specific port directory (e.g., ARM Cortex-M3) in their `build.rs` file.

## Technical Implementation

One of the most powerful features of FreeRTOS-rust is its integration with the Rust memory model. By using `MemMang/heap/heap_x.c` as the global allocator, Rust's `alloc` crate can function correctly on embedded targets, allowing for the use of collections like `Vec` or `Box` while remaining synchronized with the RTOS's memory management. 

### Build Configuration Example

Setting up a project involves configuring the builder in `build.rs` to point to the kernel source and the specific hardware port:

```rust
fn main() {
    let mut b = freertos_cargo_build::Builder::new();

    // Path to FreeRTOS kernel
    b.freertos("path/to/FreeRTOS-Kernel");
    b.freertos_config("src");       // Location of FreeRTOSConfig.h
    b.freertos_port("GCC/ARM_CM3"); // Port directory
    b.heap("heap_4.c");             // Choose the allocator

    b.compile().unwrap();
}
```

## Hardware and Platform Support

FreeRTOS-rust is designed to be portable across any architecture supported by FreeRTOS. The repository includes verified examples for a variety of platforms, demonstrating its flexibility:

*   **Cortex-M33**: nRF9160
*   **Cortex-M3**: STM32F103C8
*   **Cortex-M4**: STM32F411CE (Blackpill)
*   **Desktop Simulation**: Support for Windows (MSVC/MingW) and Linux ports, allowing for logic testing on a host machine before deploying to hardware.

Additionally, the community has contributed ports for specific boards like the STM32F3DISCOVERY, showcasing the growing ecosystem around Rust on FreeRTOS.

## Getting Started

To use this project, developers need the FreeRTOS Kernel source (often added as a git submodule) and a compatible C toolchain, such as `arm-none-eabi-gcc` for ARM targets. The project requires a nightly Rust toolchain for some examples, particularly when dealing with specific hardware features or experimental build configurations. Detailed setup instructions for various targets, including debugging configurations for IDEs like CLion, are provided in the project's documentation.
