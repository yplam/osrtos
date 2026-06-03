---
title: B-L475E-IOT01A Discovery Board Support Crate
summary: A Rust-based Board Support Package (BSP) for the STMicroelectronics B-L475E-IOT01A
  Discovery kit. It provides hardware abstractions and examples for the STM32L475
  microcontroller, integrating with the RTIC framework for real-time applications.
codeUrl: https://github.com/gdobato/b-l475e-iot01a-discovery
isShow: false
rtos: rtic
libraries: []
topics:
- arm
- rtic
- rust
- stm32
- stm32l475
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- stm32l475-pandora-board-bsp-for-rt-thread
- rust-for-arduino-portenta-h7
- rust-embedded-examples
- stm32-rtic-project-template
- stm32f4-rtic-playground
- rt-thread-bsp-for-stm32f407vet6
---

The `b-l475e-iot01a-discovery` crate is a dedicated Board Support Package (BSP) designed for developers working with the STMicroelectronics B-L475E-IOT01A Discovery kit, also known as the IoT Node. This board is a popular choice for prototyping Internet of Things (IoT) applications, featuring an STM32L475 microcontroller and a variety of sensors and connectivity options.

### Bridging the Gap with Rust
This project aims to provide a safe and ergonomic interface for the board's hardware using the Rust programming language. By building upon the `stm32l4xx-hal` (Hardware Abstraction Layer) and the `cortex-m` ecosystem, it allows developers to interact with the board's peripherals without needing to manage low-level register access manually. This approach leverages Rust's memory safety guarantees to prevent common embedded programming errors like null pointer dereferences or race conditions.

### Core Features and Architecture
The crate includes several essential components for embedded development:
- **LED Abstractions**: Simple interfaces to control the onboard LEDs, as seen in the `src/led.rs` implementation, making it easy to provide visual feedback from the hardware.
- **Panic Handling**: A custom panic strategy tailored for embedded systems, ensuring that errors are handled gracefully or reported via debugging interfaces.
- **RTIC Integration**: The project includes support for Real-Time Interrupt-driven Concurrency (RTIC), a powerful framework for building real-time systems in Rust. This is evidenced by the inclusion of `cortex-m-rtic` in the development dependencies, allowing for efficient, priority-based task scheduling.
- **Debugging Support**: Integration with `rtt-target` allows for high-speed logging and debugging via Segger RTT, which is much faster than traditional UART-based logging.

### Getting Started
To use this crate, you'll need a Rust environment configured for cross-compilation to the `thumbv7em-none-eabihf` target. The project recommends using `cargo-embed` for flashing and `cargo-binutils` for inspecting binaries. 

```bash
# Add the target for the STM32L475
rustup target add thumbv7em-none-eabihf

# Install necessary tools
cargo install cargo-embed cargo-binutils
```

Building the provided examples, such as the classic "blinky," is straightforward and demonstrates how to initialize the board and toggle peripherals:

```bash
cargo build --example blinky
```

### Flashing and Debugging
One of the highlights of this BSP is its seamless integration with modern flashing tools. Using the `Embed.toml` configuration, developers can flash their code directly to the board using an ST-Link or J-Link probe with a single command:

```bash
cargo embed --example blinky
```

This workflow significantly reduces the friction typically associated with embedded development, allowing for rapid iteration and testing on physical hardware. By providing a solid foundation for the B-L475E-IOT01A, this crate enables developers to focus on their application logic rather than the intricacies of the underlying hardware registers.
