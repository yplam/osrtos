---
title: 'littlefs2: Idiomatic Rust API for littlefs'
summary: A high-level, idiomatic Rust wrapper for the littlefs microcontroller filesystem.
  It provides a no_std compatible interface for embedded systems, supporting features
  like inline files, custom attributes, and dynamic wear-leveling while following
  the patterns of Rust's standard filesystem API.
slug: littlefs2-idiomatic-rust-api-for-littlefs
codeUrl: https://github.com/trussed-dev/littlefs2
siteUrl: https://docs.rs/littlefs2
star: 88
version: 0.6.1
lastUpdated: '2025-10-16'
rtos: ''
libraries:
- littlefs
topics:
- embedded
- filesystem
- littlefs
- no-std
- rust
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- littlefs-python
- littlefs-mbed-rp2040
- littlefs-for-esp-idf
- pico-vfs-a-virtual-file-system-for-raspberry-pi-pico
- 107-arduino-littlefs
- arduino-littlefs-spimemory-wrapper
---

## Overview

`littlefs2` provides an idiomatic Rust interface for [littlefs](https://github.com/littlefs-project/littlefs), a filesystem designed specifically for microcontrollers. Developed by Chris Haster, littlefs is renowned in the embedded world for its power-loss resilience, dynamic wear-leveling, and small footprint. The `littlefs2` crate brings these capabilities to the Rust ecosystem, offering a safe and ergonomic API that feels familiar to anyone who has used `std::fs` in standard Rust environments.

The "2" in the name refers to the support for the littlefs on-disk format version 2, which introduced significant improvements such as inline files (storing small files directly in directory entries to save space), custom attributes, and enhanced performance.

## Key Features and Capabilities

One of the primary goals of `littlefs2` is to provide a `no_std` compatible filesystem solution that doesn't sacrifice safety or ease of use. Key features include:

- **Power-Loss Resilience**: Designed to handle random power failures without corrupting the filesystem state.
- **Wear Leveling**: Dynamic wear leveling ensures that flash memory is used evenly, extending the life of the hardware.
- **Rust Idioms**: The library follows the patterns of the Rust standard library's filesystem module where reasonable, making it intuitive for Rust developers.
- **Attribute Support**: Full support for custom attributes, allowing developers to attach metadata to files and directories.
- **Flexible Storage Backend**: Through the `Storage` trait, developers can implement the backend for any block device, whether it's internal flash, external SPI flash, or even RAM for testing.

## Technical Architecture

The project is structured into three distinct layers to maximize flexibility and reuse:

1.  **littlefs2-sys**: This crate provides the low-level C bindings to the original `lfs.c` implementation. It handles the bridge between Rust and the underlying C logic.
2.  **littlefs2-core**: This layer contains core types and traits that are independent of a specific implementation version. It allows other crates to depend on littlefs types without being tied to a specific version of the backend.
3.  **littlefs2**: The main crate that re-exports core types and provides the high-level, safe API for mounting filesystems, opening files, and managing directories.

## Embedded Considerations

Because `littlefs2` is built for embedded systems, it addresses several platform-specific challenges. It is fully `no_std` compatible, though it provides an `alloc` feature for environments where a heap is available. For bare-metal environments without a C library, the `c-stubs` feature can be activated to provide necessary symbols like `strcpy` that the underlying C code requires.

The library also makes extensive use of crates like `heapless` and `generic-array` to manage buffers and paths without requiring dynamic allocation, which is critical for high-reliability embedded firmware.

## Getting Started

To use `littlefs2`, developers must implement the `Storage` trait for their specific hardware. This trait defines the block size, read/write/erase operations, and lookahead sizes. Once implemented, mounting a filesystem is straightforward:

```rust
use littlefs2::fs::Filesystem;

// Assuming 'storage' implements the Storage trait
let mut ram_storage = storage;
let mut alloc = Filesystem::alloc();

// Mount the filesystem
let fs = Filesystem::mount(&mut alloc, &mut ram_storage)
    .expect("Failed to mount filesystem");

// Open a file and write data
fs.open_file_with_options_and_then(
    |options| options.read(true).write(true).create(true),
    &path!("/example.txt"),
    |file| {
        file.write(b"Hello, littlefs!")
    }
).expect("Failed to write file");
```

By providing a bridge between the robust C-based littlefs and the safety of Rust, `littlefs2` has become a cornerstone for many Rust-based embedded projects, particularly those within the [Trussed](https://trussed.dev/) ecosystem.
