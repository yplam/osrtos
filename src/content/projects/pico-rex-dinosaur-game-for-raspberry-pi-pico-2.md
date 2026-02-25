---
title: 'Pico-Rex: Dinosaur Game for Raspberry Pi Pico 2'
summary: A Rust-based implementation of the classic Dinosaur Game designed for the
  Raspberry Pi Pico 2 (RP2350). The project leverages the Embassy async framework
  and an SSD1306 OLED display to create a responsive, low-power gaming experience.
slug: pico-rex-dinosaur-game-for-raspberry-pi-pico-2
codeUrl: https://github.com/ImplFerris/pico-rex
star: 11
lastUpdated: '2024-12-23'
rtos: ''
topics:
- embedded-systems
- oled
- pico
- raspberry-pi
- rp2350
- rust
- ssd1306
isShow: true
image: /202602/pico-rex.webp
createdAt: '2026-02-25'
updatedAt: '2026-02-25'
---

## Bringing the Dino Game to the RP2350

Pico-Rex is a charming recreation of the famous "No Internet" Dinosaur Game, specifically tailored for the Raspberry Pi Pico 2. Built using the Rust programming language, this project demonstrates the power of modern asynchronous programming in the embedded world by utilizing the Embassy framework.

The game runs on the RP2350, the high-performance successor to the RP2040, featuring dual ARM Cortex-M33 cores (or Hazard3 RISC-V cores). Pico-Rex takes advantage of this hardware to drive a 128x64 SSD1306 OLED display via I2C, providing a crisp visual interface for the prehistoric protagonist.

## Technical Architecture

The core of Pico-Rex is built on the **Embassy** framework, a collection of tools for writing async Rust on microcontrollers. By using async/await syntax, the game can handle display updates, user input, and game logic concurrently without the complexity of traditional manual state machines or heavy RTOS task switching.

Key components of the software stack include:
- **embassy-rp**: The Hardware Abstraction Layer (HAL) for the RP2350, providing async drivers for peripherals.
- **embedded-graphics**: A hardware-agnostic graphics library used to draw the dinosaur, obstacles, and score.
- **ssd1306**: A driver crate for the OLED display that integrates seamlessly with the embedded-graphics ecosystem.

## Hardware and Connectivity

Setting up Pico-Rex requires minimal components, making it an excellent project for those looking to explore the RP2350's capabilities. The circuit involves connecting an OLED display via I2C and a single push button for jumping.

| Pico Pin | Component |
|----------|-----------|
| GPIO 18  | SDA (OLED) |
| GPIO 19  | SCL (OLED) |
| 3.3V     | VCC (OLED) |
| GND      | GND (OLED) |
| GPIO 15  | Push Button |

## Development and Build System

The repository includes a robust build configuration designed for the RP2350. It features custom linker scripts (`memory.x` and `rp235x_riscv.x`) to manage the memory layout of the new chip, which includes 512KB of SRAM and support for external flash. The project is configured to support both the ARM and RISC-V architectures available on the RP2350 platform, managed through a `build.rs` script that ensures the correct linker scripts are available during the compilation process.

## Future Roadmap

While the game is currently playable, the developer has outlined several planned improvements to enhance the experience:
- Implementing a running animation for the T-Rex to improve visual fidelity.
- Adding a start menu for a more polished user experience.
- Further optimizing the game loop for even smoother performance.

Pico-Rex serves as a great example of how Rust's safety and modern concurrency primitives can be applied to create fun, interactive embedded applications on the latest generation of microcontrollers.
