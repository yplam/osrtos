---
title: Droners
summary: A Rust-based drone flight controller firmware targeting the STM32F411 microcontroller.
  It utilizes the Real-Time Interrupt-driven Concurrency (RTIC) framework and leverages
  the embedded-hal ecosystem for sensor interfacing and motor control.
codeUrl: https://github.com/justdimaa/droners
isShow: false
rtos: rtic
libraries: []
topics:
- flight-controller
- quadcopter
- rtic
- stm32
star: 8
lastUpdated: '2021-04-18'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- bitcraze-crazyflie-2-0-2-1-mbed-os-firmware
- flight-controller-rev2
- fpv-drone-stm32f411-flight-controller
- avem
- protoflight
- rust-for-arduino-portenta-h7
---

Droners is an experimental drone firmware project written in Rust, specifically designed for the STM32F411 microcontroller. While the project is currently in its early stages—as noted by the developer's disclaimer that it is "not ready for deploying"—it provides an interesting look into how modern systems programming languages can be applied to flight control systems.

The project is built upon the **RTIC (Real-Time Interrupt-driven Concurrency)** framework. RTIC is a concurrency framework for ARM Cortex-M microcontrollers that provides a hardware-accelerated task scheduler, ensuring minimal overhead and guaranteed deadlock-free execution through its priority-based resource management. This makes it an excellent choice for flight controllers where timing and reliability are critical.

## Technical Architecture

The firmware is structured to handle the high-frequency demands of flight stabilization. Key components include:

- **Sensor Integration**: Using the `embedded-sensors` crate, the project integrates support for the MPU925x inertial measurement unit (IMU) and U-blox GPS modules. These are essential for orientation tracking and navigation.
- **Motor Control**: The `src/esc.rs` module handles the logic for Electronic Speed Controllers, translating flight commands into signals for the motors.
- **Hardware Abstraction**: It leverages the `stm32f4xx-hal` to interact with the STM32F411's peripherals like timers, I2C, and SPI, ensuring that the code remains modular and follows the `embedded-hal` traits.

## Hardware and Development

The project targets the STM32F411, a popular choice for small flight controllers (like the Blackpill) due to its balance of performance and power efficiency. The repository includes a `.vscode` configuration and an SVD file for the STM32F411, suggesting a development workflow centered around Cortex-Debug for real-time debugging and hardware inspection.

The presence of an `stm32f4.ioc` file indicates that STM32CubeMX was likely used to plan the pinout and clock configuration, which was then manually implemented using the Rust HAL. This hybrid approach allows developers to use visual tools for hardware planning while benefiting from Rust's safety features for implementation.

## Getting Started

As a Rust project, Droners uses the standard Cargo build system. To explore the codebase or attempt a build, you would typically need the `thumbv7em-none-eabihf` target installed via rustup:

```bash
# Add the target for STM32F411
rustup target add thumbv7em-none-eabihf

# Build the project
cargo build --release
```

The project uses a `memory.x` linker script to define the device's flash and RAM layout, ensuring the linker places code and data in the correct memory regions for the STM32F411 chip. While it is not yet flight-ready, it serves as a robust foundation for anyone looking to build safety-critical embedded applications in Rust.
