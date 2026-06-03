---
title: Ferros
summary: A Rust library providing smart type-safe wrappers for seL4 microkernel development
  with a focus on compile-time resource tracking. It ensures memory safety and capability
  management through Rust's type system, targeting ARM-based embedded platforms like
  i.MX6 and TX1.
slug: ferros
codeUrl: https://github.com/auxoncorp/ferros
siteUrl: https://auxon.io
star: 119
version: vGUM2
lastUpdated: '2022-01-24'
rtos: sel4
topics:
- rust
- sel4
- userland
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- selfe-sys-rust-bindings-for-sel4
- freertos-rust
- sel4twinkle-alloc-rs
- rttrust-rust-wrapper-for-rt-thread
- rust-fel4-workspace-for-raspberry-pi-3
- rust-support-for-rt-thread
---

## Overview

Ferros is a sophisticated Rust library designed to bring extra assurances and safety to development on the seL4 microkernel. By leveraging Rust's powerful type system, Ferros provides smart, type-safe wrappers around core seL4 features, with a specific emphasis on compile-time resource tracking. It builds upon the `selfe-sys` library to offer a high-level interface that prevents common pitfalls in microkernel-based system development.

## Key Features

### Context-Aware Automatic Capability Management
In traditional seL4 development, managing capabilities—the mechanism for controlling access to kernel objects like notifications, endpoints, and pages—requires navigating complex addressing schemes known as CPointers. This process is often error-prone, with few safeguards against misinterpreting object types or using invalid pointers.

Ferros solves this by tracking capabilities using a smart pointer type called `Cap`. These pointers are parameterized at the type level, identifying both the kind of kernel object they point to and their validity within a specific execution context (e.g., `Cap<Endpoint, Local>` or `Cap<Notification, Child>`). This ensures that capability operations are verified by the compiler before the code ever runs on hardware.

### Compile-Time Resource Management
Managing finite resources like CNode slots, raw memory in `Untyped` instances, and virtual memory space is a critical challenge in RTOS development. Ferros tracks these resources at compile time using Rust's type parameters. For example, `CNode` objects include a `FreeSlots` parameter, and `Untyped` objects include a `BitSize` parameter.

When a function consumes a subset of these resources, it returns a new instance of the object with the corresponding type parameters decremented. If a developer attempts to allocate more resources than are available, the error is caught at compile time rather than resulting in a runtime failure or system crash.

### Isolation and Communication
Beyond basic building blocks, Ferros provides higher-level primitives for system architecture:
- **Isolated Subprocesses**: Tools for creating fully isolated virtual address spaces (VSpaces).
- **Typed Communication**: Several options for well-typed synchronous and asynchronous communication, including IPC and shared memory implementations.

## Technical Implementation

Ferros is designed for embedded targets, specifically ARMv7 (such as the i.MX6 Sabre) and ARMv8/AArch64 (such as the NVIDIA Jetson TX1). It utilizes `cargo-xbuild` for cross-compilation and integrates with `qemu-system-arm` for testing. The library makes heavy use of the `typenum` crate to perform type-level integers and arithmetic for resource tracking.

### Quick Start Example

The following snippet demonstrates how Ferros uses the `smart_alloc!` macro to handle memory distribution with compile-time checks:

```rust
// Create the top-level CNode wrapper with type-level-tracked remaining slot capacity
let (root_cnode, local_slots) = root_cnode(&raw_boot_info);

// The smart_alloc macro synthesizes allocation code with statically verified bounds
smart_alloc!(|slots from local_slots, ut from uts| {
    // Create a page table kernel object. 
    // The type system ensures enough Untyped memory and CNode slots exist.
    let example_page_table: LocalCap<UnmappedPageTable> = retype(ut, slots)?;

    // Wrap raw boot info to assist in virtual memory operations
    let boot_info = BootInfo::wrap(raw_boot_info, ut, slots);
    let (root_page_table, boot_info) = boot_info.map_page_table(root_page_table)?;
});
```

## Target Platforms

Ferros includes specific configurations for several embedded platforms via its `sel4.toml` configuration:
- **Saber (ARMv7)**: i.MX6 platform support with FPU enabled.
- **TX1 (ARMv8)**: AArch64 support with hypervisor features.
- **QEMU**: Support for ARM-based emulation for rapid testing and integration.
