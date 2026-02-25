---
title: 'ESP32 Rex: Dinosaur Game in Rust'
summary: A Rust-based implementation of the classic Dinosaur Game for the ESP32, utilizing
  the Embassy async framework for efficient task management. It features an SSD1306
  OLED display and a push-button interface, showcasing the capabilities of the Rust
  embedded ecosystem including embedded-graphics and esp-hal.
slug: esp32-rex-dinosaur-game-in-rust
codeUrl: https://github.com/ImplFerris/esp32-rex
star: 17
lastUpdated: '2024-12-23'
rtos: ''
topics:
- dinosaur-game
- embedded
- embedded-systems
- esp-hal
- esp32
- esp32-rust
- oled-display-ssd1306
- rust
- rustlang
isShow: true
image: /202602/esp32-rex.webp
createdAt: '2026-02-25'
updatedAt: '2026-02-25'
---

## Overview

ESP32 Rex is a creative implementation of the iconic "No Internet" Dinosaur game, written entirely in Rust for the ESP32 microcontroller. By leveraging the modern async capabilities of the Embassy framework, the project provides a responsive and efficient gaming experience on resource-constrained hardware. It serves as an excellent example of how to build interactive applications using the Rust embedded ecosystem.

## Hardware and Circuitry

The project is designed to run on the ESP32 WROOM Dev Kit 1. It utilizes a standard 128x64 SSD1306 OLED display connected via the I2C protocol. For user interaction, a single push button is used to make the dinosaur jump.

**The wiring configuration is as follows:**
- **OLED Display**: SDA is connected to GPIO 21, and SCL to GPIO 22.
- **Input**: A push button is connected between GPIO 4 and Ground.
- **Power**: The display is powered by the 3.3V rail of the ESP32.

## The Power of Async Rust with Embassy

At the heart of ESP32 Rex is the Embassy framework. Embassy allows developers to write asynchronous code for microcontrollers, making it easier to manage concurrent tasks like handling user input, updating game logic, and refreshing the display without the complexity of traditional RTOS threading or manual state machines.

The project utilizes `esp-hal` for hardware abstraction and `esp-hal-embassy` to integrate the ESP32's peripherals with the Embassy executor. This setup ensures that the CPU can efficiently wait for timers or I/O events, reducing power consumption and simplifying the code structure.

## Graphics and Rendering

The game's visuals are handled by the `embedded-graphics` crate, a standard in the Rust embedded ecosystem. This library provides a rich set of primitives for drawing shapes and images. The `ssd1306` driver crate acts as the bridge between the graphics library and the physical OLED hardware, translating drawing commands into I2C signals. The game logic manages the dinosaur's position, obstacle generation, and collision detection, all rendered in real-time on the 128x64 screen.

## Technical Configuration

The project is configured with specific Rust profiles to ensure optimal performance on the ESP32. In the `Cargo.toml`, the development profile is set to use `opt-level = "s"` because standard Rust debug builds are often too slow for real-time embedded applications. The release profile is further optimized with Link Time Optimization (LTO) and single codegen units to produce the smallest and fastest binary possible.

## Getting Started

To build the project, you need the Rust toolchain with ESP32 support (using the `esp` channel). The build process is managed by Cargo, with a custom `build.rs` script ensuring the correct linker arguments are passed to the compiler. Once the hardware is wired according to the pinout, the game can be flashed to the ESP32, bringing the prehistoric runner to life on your breadboard.
