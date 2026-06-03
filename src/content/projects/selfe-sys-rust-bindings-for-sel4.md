---
title: 'selfe-sys: Rust Bindings for seL4'
summary: A generated thin wrapper around libsel4.a for the Rust programming language,
  providing access to seL4 microkernel syscalls and constants. It includes a suite
  of tools for configuring and building seL4-based applications, supporting platforms
  like ARM and x86_64.
slug: selfe-sys-rust-bindings-for-sel4
codeUrl: https://github.com/auxoncorp/selfe-sys
star: 13
lastUpdated: '2022-01-24'
rtos: sel4
topics:
- rust
- sel4
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- ferros
- rttrust-rust-wrapper-for-rt-thread
- fel4-test-project
- rust-fel4-workspace-for-raspberry-pi-3
- freertos-rust
- rust-support-for-rt-thread
---

## Overview

`selfe-sys` is a specialized Rust library designed to provide a thin, zero-overhead wrapper around `libsel4.a`, the core library for the seL4 microkernel. As seL4 is renowned for its formal verification and high-security guarantees, `selfe-sys` serves as a critical bridge for developers looking to leverage Rust's memory safety features within the seL4 ecosystem. 

The project is more than just a set of bindings; it is a comprehensive toolkit that manages the complexities of seL4's configuration-heavy build process. Because seL4's API changes based on the target architecture and kernel configuration, `selfe-sys` uses automated code generation to ensure that the Rust bindings always match the specific kernel being targeted.

## The selfe Ecosystem

The repository is organized into several subcrates that handle different aspects of the seL4 development lifecycle:

*   **selfe-sys**: The primary crate containing syscalls, constants, and type definitions generated from the seL4 kernel source. It defines `seL4_Word` and `seL4_CPtr` as Rust `usize` for better ergonomics without performance penalties.
*   **selfe-config**: A build dependency library and binary tool (`selfe`) that manages `sel4.toml` files. This allows developers to define their kernel configuration in a declarative format and automates the retrieval and compilation of the seL4 source code.
*   **selfe-runtime**: A minimal runtime library required for any process that links against `libsel4.a`.
*   **selfe-start**: A library providing the necessary Rust `lang-items` for `no_std` root tasks, which are the first userspace processes to run on the microkernel.

## Technical Implementation

The core of `selfe-sys` relies on `bindgen` to create Rust interfaces from seL4's C headers. This process is highly dynamic; the exact contents of the package depend on the configuration flags set in the project's `sel4.toml`. This ensures that if a feature is disabled in the kernel to reduce the attack surface, the corresponding bindings are also absent in the Rust code, preventing invalid API calls.

To maintain high assurance, the project includes three layers of testing:
1.  **Compile-time tests** to verify the structure of the generated output.
2.  **Layout tests** produced by bindgen to ensure C and Rust data structures align perfectly in memory.
3.  **Property-based tests** (using `proptest`) to validate the behavior of bitfield-based structures, which are common in seL4 for representing capabilities and fault messages.

## Usage Example

Integrating `selfe-sys` into a Rust project allows for direct interaction with the microkernel. Below is a basic example of using the generated bindings to suspend a thread:

```rust
extern crate selfe_sys;

use selfe_sys::{seL4_CapInitThreadTCB, seL4_TCB_Suspend};

fn main() {
    // Suspend the initial thread's TCB
    let _suspend_error = unsafe {
        seL4_TCB_Suspend(seL4_CapInitThreadTCB as usize)
    };
}
```

## Hardware and Platform Support

`selfe-sys` is designed for cross-compilation across various embedded and server-grade architectures. It provides default configurations for several popular seL4 targets, including:

*   **SABRE Lite (i.MX6)**: A common ARMv7-A development board.
*   **PC99**: Standard x86_64 platforms.
*   **NVIDIA Tegra TX1**: For AArch64 targets.
*   **QEMU Virt**: For virtualized ARM environments.

By utilizing `cargo-xbuild` or `xargo`, developers can target these platforms while the `selfe` tool handles the underlying CMake and Ninja build requirements of the seL4 kernel itself.
