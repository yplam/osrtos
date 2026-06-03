---
title: Rust Test App for Apache NuttX OS
summary: A demonstration and test application for running Rust on the Apache NuttX
  real-time operating system. It features hardware integration for SPI, GPIO, and
  SX1262 LoRa modules on RISC-V (BL602) and ESP32 platforms.
slug: rust-test-app-for-apache-nuttx-os
codeUrl: https://github.com/lupyuen/rust_test
siteUrl: https://lupyuen.github.io/articles/rust2
star: 8
lastUpdated: '2022-03-21'
rtos: nuttx
topics:
- bl602
- lora
- nuttx
- pinecone
- pinedio
- riscv32
- rust
- rust-embedded
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- lora-test-app-for-semtech-sx1262-and-apache-nuttx
- lorawan-test-app-for-apache-nuttx
- lvgl-test-app-for-apache-nuttx
- bl602-adc-and-temperature-sensor-test-app
- rust-stub-library-for-apache-nuttx
- rust-embedded-hal-for-apache-nuttx-rtos
---

The Rust Test App serves as a practical implementation for developers looking to integrate the Rust programming language with the Apache NuttX RTOS. This project demonstrates how to build and run Rust applications within the NuttX environment, specifically targeting embedded platforms like the BL602 (RISC-V) and ESP32.

### Bridging Rust and NuttX

The project addresses the complexities of cross-compiling Rust for specific embedded targets. It utilizes a custom Rust target specification (`riscv32imacf-unknown-none-elf.json`) to ensure compatibility with the NuttX build configuration, particularly regarding hardware floating-point support (ilp32f). The integration is managed through a combination of C entry points (`rust_test_main.c`) and Rust libraries, allowing for a seamless transition between the RTOS kernel and Rust application logic.

### Hardware Interaction and Testing

One of the primary goals of this test app is to validate hardware abstraction layers. The included logs demonstrate successful interaction with several peripherals:

- **SPI Communication**: Testing data transfer over SPI interfaces.
- **GPIO Control**: Reading and writing to general-purpose I/O pins.
- **LoRa Integration**: Initializing and communicating with the SX1262 LoRa transceiver, including register access and message transmission.

### Target Platforms

While the project is designed to be portable, it provides specific configurations and instructions for:

- **BL602**: A RISC-V SoC where the app tests SPI and LoRa functionality.
- **ESP32**: Support for the popular Xtensa-based microcontroller.

### Build and Execution

The repository includes a comprehensive `run.sh` script that automates the build process. This script handles the compilation of the Rust library, the linking process with the NuttX firmware, and the flashing of the resulting binary to the target hardware. Once deployed, the application can be invoked directly from the NuttX Shell (NSH) using the `rust_test` command.

```bash
nsh> rust_test
Hello from Rust!
Hello World!
test_spi
...
test_sx1262
Sending LoRa message...
Done!
```

For developers interested in the technical details of the implementation, the project is accompanied by an in-depth article, "Rust on Apache NuttX OS," which explains the underlying architecture and the steps required to set up the development environment.
