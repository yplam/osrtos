---
title: Barebones Watch Face for PineTime
summary: A minimalist Rust-based watch face for the PineTime smartwatch running the
  Apache Mynewt RTOS. It utilizes the LVGL graphics library to display time, date,
  and system status indicators like Bluetooth connectivity and battery power.
codeUrl: https://github.com/lupyuen/barebones-watchface
siteUrl: https://lupyuen.github.io/barebones-watchface/lvgl.html
isShow: false
rtos: apache-mynewt
libraries:
- lvgl
topics:
- barebones
- barebones-watch-face
- bluetooth
- lvgl
- mynewt
- nrf52
- pinetime
- rust-mynewt
- watchface
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- pinetime-rs
- bosmoment-pinetime-firmware-applications
- infinitime
- zephyrwatch
- pinetime-zephyr-firmware
- hypnos
---

The PineTime smartwatch has become a favorite playground for embedded developers, particularly those interested in the intersection of Rust and real-time operating systems. The **barebones-watchface** project provides a clean, minimalist starting point for developers looking to build their own custom interfaces for the PineTime using the Apache Mynewt RTOS and the LVGL graphics library.

### A Minimalist Approach to Smartwatch UI

As the name suggests, this project avoids unnecessary complexity. It serves as a functional template that implements the core requirements of a wearable interface without the bloat. Despite its "barebones" nature, it includes several essential features for a modern smartwatch:

*   **Bluetooth LE Time Sync**: Automatically synchronizes the watch time with a connected smartphone.
*   **Date and Time Display**: A clear, readable layout for everyday use.
*   **Bluetooth Connectivity Indicator**: Visual feedback on the status of the wireless connection.
*   **Power Indicator**: Real-time monitoring of the battery level.

### The Technical Stack

The project is built on a robust stack designed for safety and efficiency. It leverages the **Apache Mynewt RTOS**, which provides the underlying scheduling and hardware abstraction, and **NimBLE** for Bluetooth Low Energy communication. The user interface is rendered using **LVGL** (Light and Versatile Graphics Library), a popular choice in the embedded world for creating high-quality UIs with low memory footprints.

Because the project is written in **Rust**, it benefits from memory safety and modern tooling. It utilizes the `pinetime-watchface` framework, which simplifies the process of creating watch faces by providing safe wrappers around the underlying C-based RTOS and graphics libraries.

### Integration and Development

Integrating this watch face into the standard PineTime Rust firmware is straightforward. Developers can add it as a dependency in their `Cargo.toml` and declare the type in their main application logic:

```rust
/// Declare the Watch Face Type
type WatchFaceType = barebones_watchface::BarebonesWatchFace;
```

One of the most impressive aspects of this project is its accessibility. Thanks to a GitHub Actions workflow, the watch face is automatically compiled into WebAssembly. This allows developers to preview their changes directly in a web browser using a WASM-based simulator before ever flashing the code to physical hardware. This significantly tightens the feedback loop for UI design and debugging.

### Getting Started

For those looking to dive deeper, the project is well-documented through a series of articles by Lee Lup Yuen, which guide users through creating their own PineTime watch faces in Rust and publishing them to crates.io. Whether you are a seasoned embedded engineer or a Rust enthusiast looking to get into hardware, this repository provides a solid foundation for wearable development.
