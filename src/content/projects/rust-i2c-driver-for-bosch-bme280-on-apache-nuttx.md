---
title: Rust I2C Driver for Bosch BME280 on Apache NuttX
summary: A project demonstrating how to use Rust to communicate with a Bosch BME280
  sensor via I2C on the Apache NuttX RTOS. It implements a NuttX-specific version
  of the Rust Embedded HAL and provides examples for the Pine64 PineCone BL602 and
  ESP32 platforms.
slug: rust-i2c-driver-for-bosch-bme280-on-apache-nuttx
codeUrl: https://github.com/lupyuen/rust-i2c-nuttx
siteUrl: https://lupyuen.github.io/articles/rusti2c
star: 9
lastUpdated: '2022-03-21'
rtos: nuttx
topics:
- bl602
- bme280
- i2c
- nuttx
- pinecone
- rust
- rust-embedded
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rust-embedded-hal-for-apache-nuttx-rtos
- apache-nuttx-driver-for-bosch-bme280-sensor
- rust-test-app-for-apache-nuttx-os
- rust-stub-library-for-apache-nuttx
- st7789-and-lvgl-demo-for-apache-nuttx-rtos
- hynitron-cst816s-touch-controller-driver-for-apache-nuttx
---

## Overview

This project explores the integration of Rust with the Apache NuttX RTOS, specifically focusing on I2C communication with the Bosch BME280 environmental sensor. By bridging the gap between Rust's safety-oriented ecosystem and the POSIX-compliant NuttX environment, the project enables developers to use standard Rust embedded drivers on hardware platforms like the Pine64 PineCone (BL602) and ESP32.

## Bridging C and Rust

At its core, the project demonstrates how to port low-level C structures and IOCTL calls to Rust. In NuttX, I2C operations are typically handled via the `I2CIOC_TRANSFER` command. The project maps C structures such as `i2c_msg_s` and `i2c_transfer_s` to Rust using `#[repr(C)]` to ensure memory layout compatibility. This allows Rust code to safely interact with the underlying NuttX I2C character driver.

## NuttX Embedded HAL

A significant contribution of this repository is the implementation of the **Rust Embedded HAL for NuttX**. By wrapping NuttX-specific `ioctl()` commands into the standard `embedded-hal` traits (`Read`, `Write`, `WriteRead`), it becomes possible to use existing, platform-agnostic Rust drivers. 

For example, the project successfully utilizes the standard `bme280` crate from crates.io. Once the HAL is initialized with the correct device path (e.g., `/dev/i2c0`), the sensor driver can be used as follows:

```rust
// Init the BME280 Driver using the NuttX HAL
let mut bme280 = bme280::BME280::new(
    i2c,   // NuttX I2C Port
    0x77,  // I2C Address
    nuttx_embedded_hal::Delay
);

// Measure Temperature, Pressure and Humidity
let measurements = bme280.measure().expect("measure failed");
```

## Handling Hardware Quirks

The project provides deep insights into hardware-specific challenges, particularly regarding the BL602 RISC-V SoC. The BL602 I2C driver has unique requirements for "Sub Addresses." The implementation includes specific workarounds to ensure that register IDs and data are transmitted correctly, verified through extensive logic analyzer testing. This includes a specific sequence where a dummy read is used to force the hardware to complete a write operation correctly.

## Target Platforms

While primarily tested on the **Pine64 PineCone (BL602)**, the project is designed with portability in mind. It includes configurations for:
- **BL602 (RISC-V 32-bit)**: Utilizing a custom Rust target for hardware floating-point support.
- **ESP32**: Demonstrating the versatility of the NuttX driver model across different architectures.

## Getting Started

The repository is structured as a NuttX application. It includes a `run.sh` script that automates the build process, which involves compiling the Rust code as a static library (`librust.a`) and linking it into the NuttX firmware image. Users can then execute the `rust_i2c` command from the NuttX Shell (NSH) to see real-time sensor data including relative humidity, temperature, and atmospheric pressure.
