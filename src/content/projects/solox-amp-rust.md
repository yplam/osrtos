---
title: solox-amp-rust
summary: An Asymmetric Multi-Processing (AMP) experiment using the seL4 microkernel
  and Rust on the i.MX6 SoloX SoC. It demonstrates running seL4 on the Cortex-A9 core
  to manage system resources and boot a bare-metal Rust firmware on the Cortex-M4
  core.
slug: solox-amp-rust
codeUrl: https://github.com/jonlamb-gh/solox-amp-rust
star: 5
version: 0.0.1
lastUpdated: '2018-09-03'
rtos: sel4
topics:
- arm
- cortex-a9
- cortex-m4
- fel4
- imx6
- no-std
- openamp-rpmsg
- rust
- rust-embedded
- sel4
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- sel4twinkle-alloc-rs
- rust-sel4-toy-system-for-i-mx6-sabre-lite
- fel4-test-project
- cortex-m33-trustzone-experiments-on-qemu-an505
- azurertos-dual-core-implementation-for-stm32h747
- rust-test-app-for-apache-nuttx-os
---

## Overview

solox-amp-rust is an experimental project exploring Asymmetric Multi-Processing (AMP) using the seL4 microkernel and the Rust programming language. The project targets the i.MX6 SoloX SoC, specifically the Nitrogen6 SoloX board, which features a heterogeneous architecture consisting of an ARM Cortex-A9 core and an ARM Cortex-M4 core.

The project demonstrates a sophisticated boot sequence where the seL4 kernel and its root task run on the high-performance A9 core, while a bare-metal Rust application is deployed to the low-power M4 core. This setup is ideal for systems requiring both the security and isolation of a microkernel and the real-time responsiveness of a dedicated microcontroller.

## System Architecture

The system is divided between the two cores with a clear separation of responsibilities:

*   **Cortex-A9 Core**: Runs the seL4 microkernel, a root task, and various user-space threads. The A9 is responsible for initial system initialization, memory management, and device I/O.
*   **Cortex-M4 Core**: Runs a bare-metal Rust project (cortex-m). It is treated as a peripheral or a co-processor by the A9 core.

### The Boot Sequence

1.  **U-Boot**: Performs the initial bootstrapping of the A9 core and loads the master ELF binary.
2.  **seL4 Kernel**: Starts on the A9 core.
3.  **seL4 Root Task**: Initializes memory, devices, and I/O for a specific worker thread.
4.  **seL4 Thread**: Extracts the M4 core firmware from a CPIO archive linked into the master ELF binary.
5.  **M4 Startup**: The seL4 thread initializes the M4 core's clock, copies the firmware into Tightly Coupled Memory (TCM), and releases the M4 from reset.

## Technical Implementation Details

One of the primary challenges in this project is managing the memory map differences between the two cores. The i.MX6 SoloX uses an ARM IP Bus (AIPS) where there is a `0x4000_0000` offset between the A9's address space and the M4's. To run the Cortex-M4, the A9 must fill the Tightly Coupled Memory (TCML), which is aliased at address zero for the M4 but mapped to `0x007f8000` in the A9's address space.

The project uses `cargo-fel4` for the build process, with a custom `build.rs` script to invoke the M4 firmware build separately. This is necessary because the A9 and M4 target different architectures (ARMv7-A vs. ARMv7-M), and standard Rust dependencies cannot easily mix targets in a single crate.

## Hardware and Memory Considerations

The project provides specific insights into the i.MX6 SoloX hardware, such as the L2 cache configuration. In this implementation, the L2 cache memory is repurposed as OCRAM for the M4 core. This is a common technique in embedded systems to provide the microcontroller core with fast, local storage when the standard cache is not required by the application logic.

## Getting Started

Building the project requires a specific toolchain, including `cargo-fel4` and `xargo`. The repository includes scripts to apply local patches to the seL4 platform support to ensure compatibility with the SoloX. Once built, the resulting image can be loaded via TFTP in U-Boot. The repository provides example U-Boot environment variables and commands to facilitate the deployment of both the A9 kernel image and the M4 firmware.
