---
title: Trezor Firmware
summary: The official firmware for Trezor hardware wallets, supporting both the Trezor
  Model T and Trezor One. It features a modular architecture including a MicroPython-based
  core for modern devices and a legacy C implementation, backed by custom cryptographic
  and storage libraries.
slug: trezor-firmware
codeUrl: https://github.com/trezor/trezor-firmware
siteUrl: https://docs.trezor.io
star: 1650
version: v0-working3
lastUpdated: '2025-12-15'
rtos: ''
libraries:
- nanopb
- micropython
topics:
- bitcoin
- c
- cryptocurrency
- cryptography
- firmware
- micropython
- python
- rust
- trezor
- wallet
isShow: true
image: /202601/trezor.webp
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- colibri-wallet
- bitcoin-card-wallet
- stick-firmware
- m5-crystal
- micropython-and-lvgl-firmware-for-esp32
- tenstorrent-system-firmware
---

## Overview

The Trezor Firmware repository is a monorepo containing the source code for the world's first hardware wallets. It serves as the foundational software for the Trezor Model T and the original Trezor One, providing the secure environment necessary for managing private keys and signing cryptocurrency transactions. The project is designed with a heavy emphasis on security, transparency, and reproducibility, ensuring that users can verify the code running on their devices.

## Architecture and Components

The repository is organized into several key modules that cater to different hardware generations and functional requirements:

- **Trezor Core**: Located in the `core` directory, this is the modern firmware implementation for the Trezor Model T. It is built on top of a customized MicroPython environment, allowing for high-level application logic to be written in Python while performance-critical tasks remain in C and Rust.
- **Legacy Firmware**: The `legacy` directory contains the original C-based firmware implementation for the Trezor One. This version is optimized for the more constrained hardware resources of the original device.
- **Crypto Library**: A stand-alone, highly optimized cryptography library used by both the Core and Legacy implementations. It handles the heavy lifting of elliptic curve cryptography and hashing algorithms.
- **Storage**: The `storage` module implements NORCOW (NOR Copy-On-Write), a specialized storage system designed for embedded flash memory to ensure data integrity and wear leveling.

## Technical Implementation

Trezor's approach to firmware development is unique in the embedded space. By leveraging MicroPython for the Trezor Core, the project enables faster development of complex features like touch-screen interfaces and multi-asset support without sacrificing the security of the underlying C-based cryptographic primitives. 

The project uses Google Protocol Buffers (Protobuf) for communication between the device and host computers. This ensures a strictly defined API (the Trezor Protocol) that can be easily implemented across different client libraries, such as the included Python `trezorctl` tool.

## Development and Build System

The project maintains a sophisticated build environment to ensure security and consistency:

- **Nix Integration**: The use of `shell.nix` provides a reproducible development environment, pinning specific versions of compilers (like `gcc-arm-embedded`) and tools to ensure that every developer and CI runner produces identical binaries.
- **Build Tools**: A comprehensive `Makefile` manages everything from code style checks (`clang-format`, `black`, `pylint`) to code generation for Protobuf and coin definitions.
- **Continuous Integration**: The repository includes extensive unit tests and style checks to maintain code quality across the various languages used (C, Python, and Rust).

## Security and Contributions

As a security-centric project, Trezor maintains a strict vulnerability disclosure policy and encourages community audits. The project follows a structured contribution process, requiring conventional commits and adherence to rigorous code style standards. For developers looking to add support for new assets, the repository provides a clear path through the `common/defs` directory, which houses JSON-based coin definitions and support tables.
