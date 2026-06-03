---
title: pinetime-rs
summary: A Rust-based firmware for the PineTime smartwatch utilizing the RTIC (Real-Time
  Interrupt-driven Concurrency) framework. It targets the nRF52832 microcontroller
  and includes drivers for the ST7789 display and external SPI flash.
slug: pinetime-rs
codeUrl: https://github.com/jonlamb-gh/pinetime-rs
siteUrl: https://wiki.pine64.org/index.php/PineTime
star: 2
lastUpdated: '2021-10-10'
rtos: rtic
topics:
- bare-metal
- no-std
- nrf52832
- pinetime
- rtic
- rust
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- pinetime-tock
- pinetime-zephyr-firmware
- infinitime
- rust-ir-thermometer-firmware
- pomia-rs
- bosmoment-pinetime-firmware-applications
---

Pinetime-rs is a project dedicated to bringing the safety and performance of the Rust programming language to the PineTime smartwatch. By utilizing the Real-Time Interrupt-driven Concurrency (RTIC) framework, the project provides a robust foundation for building embedded applications on the nRF52832 microcontroller.

The PineTime is a popular open-source smartwatch based on the Nordic nRF52832 SoC, featuring a heart rate sensor, accelerometer, and a 1.3-inch IPS capacitive touch display. This repository serves as a comprehensive firmware implementation, drawing inspiration from other community projects like InfiniTime while focusing on the unique memory safety guarantees provided by Rust.

### Architecture and Concurrency

At the heart of pinetime-rs is the RTIC framework. RTIC is a concurrency framework for building real-time systems. It provides a task-based programming model where tasks are triggered by interrupts or software events. This approach ensures that high-priority tasks can preempt lower-priority ones with minimal overhead, making it ideal for the resource-constrained environment of a smartwatch. The project uses `cortex-m-rtic` to manage hardware resources and task priorities efficiently.

The project is organized as a Rust workspace, separating concerns into several specialized crates:
- **pinetime-common**: Shared utilities and types used across the project.
- **pinetime-drivers**: Hardware abstraction layers and drivers for PineTime-specific components like the ST7789 display controller.
- **pinetime-graphics**: Logic for rendering UI elements and managing the display buffer.

### Hardware Integration

The firmware interacts with the nRF52832 hardware using the `nrf52832-hal`. Key hardware features addressed in the project include:
- **Display**: Support for the ST7789 LCD via SPI.
- **Persistence**: Integration with external SPI NOR flash for file systems or persistent storage.
- **Debugging**: Utilization of RTT (Real-Time Transfer) for logging and debugging via `rtt-target` and `panic-rtt-target`, allowing for real-time monitoring without the overhead of standard UART.

### Development and Simulation

One of the standout features of the pinetime-rs ecosystem is the inclusion of a simulator. Located in the `host-tools/pinetime-simulator` crate, this tool allows developers to test graphics and logic on their development machines without needing to flash the physical hardware constantly. This significantly speeds up the UI development cycle.

For deployment, the project supports modern Rust embedded tools such as `probe-run` and `cargo-embed`. The configuration in `Embed.toml` simplifies the process of flashing and debugging via SWD (Serial Wire Debug), providing a seamless "cargo run" experience for embedded development.

### Future Directions

The project maintains an active roadmap, including improvements to the system time RTC implementation, integration with the MCUboot bootloader for safer firmware updates, and the implementation of low-power HAL features to extend battery life. There is also ongoing work to implement a shared-bus architecture for SPI peripherals, allowing the display and external flash to coexist efficiently on the same bus using libraries like `tickv` for persistent storage.
