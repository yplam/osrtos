---
title: STM32 RTIC Project Template
summary: A specialized project template for building embedded applications on STM32
  microcontrollers using the Rust RTIC framework. It provides a pre-configured environment
  with modern tooling for logging, stack protection, and seamless hardware debugging.
slug: stm32-rtic-project-template
codeUrl: https://github.com/VersBinarii/stm32-rtic-template
siteUrl: https://knurling.ferrous-systems.com
star: 3
lastUpdated: '2022-02-06'
rtos: rtic
topics:
- arm
- embedded
- embedded-rust
- rtic
- rust
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- pico-rtic-template
- stm32h743zi-rust-playground
- stm32-makefile-freertos-project-template
- stm32-base-project-template
- rust-for-arduino-portenta-h7
- stm32f030-cmake-cmsis-project-skeleton
---

## Overview

The STM32 RTIC Template is a robust starting point for developers looking to build high-performance, real-time embedded applications in Rust. It leverages the Real-Time Interrupt-driven Concurrency (RTIC) framework to manage tasks and hardware interrupts efficiently on ARM Cortex-M microcontrollers. This template is designed to streamline the initial setup process, which can often be complex in embedded Rust development, by providing a pre-configured structure that integrates seamlessly with the Knurling-rs tooling suite.

## Modern Embedded Tooling

One of the primary advantages of this template is its integration with high-quality tools that improve the developer experience:

- **defmt**: A highly efficient logging framework that minimizes the binary size and CPU overhead of log messages by deferred formatting.
- **probe-run**: A custom runner that allows developers to flash and run their code on the target hardware with a single command, while also capturing logs and backtraces directly in the terminal.
- **flip-link**: A linker wrapper that provides stack overflow protection by flipping the memory layout, ensuring that stack overflows result in an immediate hardware exception rather than silent data corruption.

## Technical Configuration

The template is built around the `cortex-m-rtic` crate, providing a declarative syntax for defining hardware tasks and software tasks. It includes a `memory.x` linker script and a `.cargo/config.toml` file that are easily adjustable for different STM32 chips and Cortex-M architectures (such as M0, M3, M4, or M7).

### Hardware Abstraction

While the template is generic, it is optimized for use with STM32 Hardware Abstraction Layers (HALs). Users can easily swap in the specific HAL for their target board, such as `stm32f4xx-hal` or `nrf52840-hal`, by updating the `Cargo.toml` dependencies. This flexibility allows the template to serve as a foundation for a wide variety of ARM-based projects.

## Development Workflow

The project structure supports both unit testing and integration testing on the target hardware. It includes a dedicated `tests/` directory and a library crate configuration that allows for testing private APIs. By using `cargo-generate`, developers can quickly instantiate a new project from this template, set their specific chip target, and begin writing application logic immediately.

### Example Setup

To get started, developers typically adjust the compilation target in the Cargo configuration:

```toml
# .cargo/config.toml
[build]
target = "thumbv7em-none-eabihf" # For Cortex-M4F with FPU
```

And define the memory layout for their specific microcontroller in `memory.x`:

```
/* Example Linker script */
MEMORY
{
  FLASH : ORIGIN = 0x08000000, LENGTH = 512K
  RAM : ORIGIN = 0x20000000, LENGTH = 128K
}
```

This template effectively bridges the gap between bare-metal Rust and a fully-featured real-time operating environment, making it an ideal choice for professional firmware development.
