---
title: Rust feL4 Workspace for Raspberry Pi 3
summary: A development workspace for building Rust applications on the seL4 microkernel
  specifically for the Raspberry Pi 3 platform. It provides hardware abstraction layers
  for the BCM2837 SoC, DMA-backed graphics libraries, and various driver examples
  for embedded systems development.
slug: rust-fel4-workspace-for-raspberry-pi-3
codeUrl: https://github.com/jonlamb-gh/rpi3-rust-fel4-workspace
star: 6
lastUpdated: '2018-12-08'
rtos: sel4
topics:
- aarch64
- cargo-fel4
- dma
- embedded-hal
- fel4
- gpu
- gpu-memory
- graphics
- raspberry-pi-3
- rpi3
- rust
- rust-embedded
- sel4
- sel4-microkernel
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- sel4twinkle-alloc-rs
- selfe-sys-rust-bindings-for-sel4
- freertos-port-for-raspberry-pi
- freertos-rust
- stm32f4-rtic-playground
- ferros
---

The rpi3-rust-fel4-workspace project provides a comprehensive environment for developing secure, high-performance applications in Rust on the seL4 microkernel. Targeting the Raspberry Pi 3 (BCM2837), this workspace bridges the gap between the formal security guarantees of seL4 and the memory safety of the Rust programming language.

## Hardware Abstraction and Drivers

At the core of the workspace are several crates designed to interface directly with the Raspberry Pi 3 hardware. The `bcm2837` crate provides low-level device register definitions, while `bcm2837-hal` implements common `embedded-hal` traits. This allows developers to use standard Rust embedded ecosystem tools to interact with the SoC's peripherals.

Beyond basic GPIO and UART, the project includes specialized drivers and examples:
- **Ethernet Support**: An example driver for the ENC28J60 Ethernet controller via SPI.
- **DMA and Graphics**: A double-buffered, DMA-backed graphics display library capable of rendering to the GPU memory.
- **System Services**: Integration with `sel4twinkle-alloc-rs` for memory management within the seL4 environment.

## Project Structure and Examples

The workspace is organized into several modular components that demonstrate different capabilities of the system:
- **clock-display**: A practical example of rendering a simple clock using the graphics stack.
- **dma-example**: Demonstrates high-speed data transfer to GPU memory using the DMA engine.
- **mbox-device-example**: Shows how to communicate with the Raspberry Pi VideoCore firmware via the mailbox interface.
- **hello-world**: A minimal entry point for verifying the toolchain and kernel boot process.

## Tooling and Deployment

Building for seL4 in Rust typically requires specialized tooling. This project utilizes a modified version of `cargo-fel4` specifically patched to support the Raspberry Pi 3 and custom root tasks. 

For deployment, the project is designed to be loaded via U-Boot. The documentation provides specific environment configurations for 64-bit U-Boot, allowing images to be transferred over TFTP and executed directly on the hardware. For those without physical hardware, the environment supports simulation via QEMU, including options to enable graphical output for testing the framebuffer and display examples.

## Technical Environment

The project assumes a 64-bit execution environment (AArch64). The configuration files provided for the SD card setup (including `config.txt` and `u-boot.bin`) ensure the Raspberry Pi 3 is correctly initialized into 64-bit mode with the necessary UART and Bluetooth overlays for a stable development console. This setup creates a robust foundation for experimenting with microkernel-based systems and Rust-based firmware.
