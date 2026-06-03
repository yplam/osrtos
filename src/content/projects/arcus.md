---
title: Arcus
summary: Arcus is a Rust-based firmware for the Raspberry Pi Pico (RP2040) designed
  for advanced LED lighting control. It leverages the RTIC framework for real-time
  task management and utilizes the RP2040's PIO blocks to drive light shows and process
  infrared remote signals.
codeUrl: https://github.com/LU15W1R7H/arcus
isShow: false
rtos: rtic
libraries: []
topics:
- embedded
- rust
- arm
- rp2040
- rtic
- infrared
- interrupts
- led
- microcontroller
- nix
- openocd
- pico
- sk6812
- uart
- ws2812b
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- pico-rtic-template
- rust-ir-thermometer-firmware
- rust-for-arduino-portenta-h7
- arduino-pico
- raspberry-pi-pico-freertos-sample-application
- pomia-rs
---

## Lighting Up the RP2040 with Arcus

Arcus is a sophisticated firmware project written in Rust, designed to transform the Raspberry Pi Pico into a powerful LED controller. By leveraging the unique hardware features of the RP2040 microcontroller, Arcus provides a robust platform for creating and managing complex lighting effects, or "shows," with high precision and responsiveness.

### Built on RTIC and Rust

At its core, Arcus is built using the Real-Time Interrupt-driven Concurrency (RTIC) framework. This choice ensures that the system remains responsive even when handling multiple concurrent tasks, such as processing infrared (IR) remote signals, managing UART communications, and updating LED states. The use of Rust provides memory safety and modern concurrency primitives, which are essential for stable embedded development. The project also utilizes the `rp2040-monotonic` crate for precise timing and scheduling.

### Advanced Light Shows

The project features a modular "show" system located in `src/show/`. This architecture allows for a wide variety of visual patterns, including:

- **Clock**: Time-based lighting displays.
- **Gradient**: Smooth transitions between colors using fixed-point math.
- **Snake and Spotlight**: Dynamic, moving light patterns that traverse the LED strip.
- **Random and Uniform**: Simple yet effective fill patterns for ambient lighting.
- **Quick and Demo**: Pre-configured sequences for testing and display purposes.

These shows are managed by a central controller that handles color calculations (using the `fixed` and `cordic` crates for fixed-point trigonometry) and hardware output abstraction.

### Hardware Integration

Arcus makes extensive use of the RP2040's specific hardware capabilities:

- **PIO (Programmable I/O)**: Used for high-speed communication with LED strips, ensuring the strict timing accuracy required by protocols like WS2812B.
- **Infrared Control**: The project includes a dedicated input module for IR remotes (using the `infrared` crate), allowing users to switch shows or adjust settings wirelessly.
- **UART Interface**: A serial interface is provided for debugging and manual control. The repository includes scripts for connecting via `minicom` over Bluetooth or Picoprobe.

### Getting Started

To run Arcus, you will need a standard ARM development toolchain, including `arm-none-eabi-gdb` and the RP2040 fork of `openocd`. The project includes several helper scripts in the `script/` directory to simplify loading the firmware via GDB, OpenOCD, or UF2.

Once the hardware is connected, you can start the OpenOCD server and run the project using Cargo:

```bash
openocd
cargo run
```

For monitoring the UART output, a baud rate of 115200 is used. You can connect to the device using the following command:

```bash
minicom -b 115200 -o -D /dev/ttyACM0
```

Arcus represents a great example of how modern language features and specialized MCU hardware can come together to create a high-performance, maintainable embedded application.
