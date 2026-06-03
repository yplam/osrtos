---
title: Rust Embedded HAL for Apache NuttX RTOS
summary: A Rust crate providing Embedded HAL interfaces for the Apache NuttX RTOS.
  It implements standard traits for GPIO, I2C, SPI, and Delay, allowing Rust applications
  to interact with NuttX device drivers using the embedded-hal ecosystem.
slug: rust-embedded-hal-for-apache-nuttx-rtos
codeUrl: https://github.com/lupyuen/nuttx-embedded-hal
siteUrl: https://docs.rs/nuttx-embedded-hal/latest/nuttx_embedded_hal/
star: 15
lastUpdated: '2022-05-09'
rtos: nuttx
topics:
- bl602
- bl604
- embedded
- gpio
- i2c
- nuttx
- pinecone
- pinedio
- rtos
- rust
- spi
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rust-i2c-driver-for-bosch-bme280-on-apache-nuttx
- rust-stub-library-for-apache-nuttx
- rust-test-app-for-apache-nuttx-os
- bl602-gpio-expander-for-apache-nuttx
- pinedio-stack-bl604-on-apache-nuttx-rtos
- rust-embedded-examples
---

## Bridging Rust and Apache NuttX

The `nuttx-embedded-hal` crate provides a crucial bridge between the Rust `embedded-hal` ecosystem and the Apache NuttX RTOS. By implementing standard Rust traits for hardware abstraction, this project enables developers to write portable Rust code that runs seamlessly on NuttX-supported hardware. It leverages the NuttX device file system (e.g., `/dev/gpio`, `/dev/i2c`) to provide a familiar interface for Rust developers while maintaining the robustness of the underlying RTOS.

## Core Capabilities

The library currently supports several essential hardware interfaces required for embedded development:

- **GPIO Control**: Provides both `InputPin` and `OutputPin` traits. It allows developers to open standard NuttX GPIO devices and perform digital I/O operations.
- **I2C Communication**: Implements blocking I2C traits, enabling communication with sensors and peripherals over buses like `/dev/i2c0` with configurable frequencies.
- **SPI Interface**: Supports SPI transfers through the NuttX SPI test driver, facilitating high-speed communication with external chips.
- **Delay Provider**: Implements the `DelayMs` trait to provide standard timing functions within the Rust environment.

## Technical Implementation

This crate is designed for `no-std` environments, making it suitable for deeply embedded systems where dynamic memory allocation might be restricted. It utilizes the `heapless` crate for static-friendly data structures and depends on the standard `embedded-hal` version 0.2.7 traits.

One of the unique aspects of this implementation is how it maps Rust traits to the NuttX character driver model. For instance, when using I2C, the crate handles the underlying file descriptors and ioctl calls required by NuttX, presenting them to the user as a standard Rust `I2c` struct.

## Usage Examples

### GPIO Output

Interacting with a GPIO pin is straightforward. The following example demonstrates how to toggle a pin using the standard `OutputPin` trait:

```rust
// Open /dev/gpio1 for GPIO Output
let mut gpio = nuttx_embedded_hal::OutputPin
    ::new("/dev/gpio1")
    .expect("open gpio failed");

// Set Pin to High
gpio.set_high()
    .expect("set gpio failed");
```

### I2C Communication

For I2C, the library abstracts the complexity of bus addressing and register access:

```rust
// Open I2C Port /dev/i2c0 at 400 kHz
let mut i2c = nuttx_embedded_hal::I2c::new(
    "/dev/i2c0",
    400000,
).expect("open failed");

// Read register 0xD0 from I2C Address 0x77
let mut buf = [0 ; 1];
i2c.write_read(0x77, &[0xD0], &mut buf).expect("read failed");
```

## Hardware and Driver Requirements

To use certain features like SPI, specific drivers must be present in the NuttX configuration. For example, the SPI implementation expects the SPI Test Driver (`/dev/spitest0`) to be installed. Similarly, GPIO pins must be exported via the NuttX GPIO driver to be accessible by the crate. This design ensures that the Rust layer remains thin and efficient, relying on the proven driver model of Apache NuttX.
