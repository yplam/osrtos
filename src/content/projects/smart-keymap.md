---
title: Smart Keymap
summary: A library for building advanced keyboard firmware that uses the Nickel configuration
  language to define complex keymap behaviors. It supports Rust-based firmware using
  the RTIC and Embassy frameworks, as well as C-based firmware for WCH RISC-V microcontrollers.
  The project enables sophisticated features like layers, tap-hold keys, and chords
  across various hardware platforms including RP2040, STM32F4, and CH32X.
slug: smart-keymap
codeUrl: https://github.com/rgoulter/smart-keymap
siteUrl: https://rgoulter.com/smart-keymap/features.html
version: v0.12.0
lastUpdated: '2025-12-27'
licenses:
- Apache-2.0
image: /202604/smart-keymap_0.avif
rtos: rtic
topics:
- ch32x035
- keyboard-firmware
- nickel
- rp2040
- rtic
- rust
isShow: true
createdAt: '2026-04-03T05:30:57+00:00'
updatedAt: '2026-04-03T05:30:57+00:00'
---

Smart Keymap is a library designed to handle the complex behavioral logic of "smart keyboards"—devices that go beyond simple typing to offer layers, tap-hold functionality, chords, and customized effects. By decoupling keymap declaration from the underlying firmware framework, it allows developers to build powerful keyboard software using the Nickel configuration language and the Rust programming language.

### Concise Keymaps with Nickel
The core innovation of the project is the use of Nickel for declaring keymaps. Nickel is a configuration language described as "JSON + functions," designed with a strong emphasis on correctness and modularity. This allows for highly concise and expressive keymap definitions, where complex behaviors like TapHold and TapDance can be defined through functional merges and contracts rather than verbose C arrays or rigid JSON structures.

Beyond software, the project emphasizes support for the affordable and capable CH32X035, a 32-bit RISC-V MCU. By providing a library that can be built as a static native library, Smart Keymap enables high-end firmware features on low-budget hardware designs that traditionally relied on simpler, less flexible frameworks.

### Flexible Integration
Smart Keymap is designed to be integrated into various firmware environments. It can be used as a standard Rust crate, making it ideal for projects utilizing Rust-based embedded frameworks like RTIC or Embassy. Alternatively, it can be compiled as `libsmart_keymap`, a C-compatible library that can be integrated into existing USB HID examples written in C, such as those provided by WCH for their RISC-V microcontrollers.

### Hardware Implementations and Examples
Several hardware projects demonstrate the library's versatility across different form factors and connectivity methods. The **CH32X-36** and **CH32X-48** are examples of low-budget, SMT-based keyboards that leverage the CH32X035's power.


![CH32X-48 low-budget PCBA ortholinear keyboard](/202604/smart-keymap_1.avif)

Wireless capabilities are also supported, as evidenced by the **WABBLE-60**, a 5x12 ortholinear BLE keyboard powered by the CH58x series. This implementation shows how the library can handle HID reports for Bluetooth stacks.

![WABBLE-60 BLE RISC-V powered ortholinear keyboard](/202604/smart-keymap_3.avif)

For split keyboard enthusiasts, the **MiniF4-36** utilizes the STM32F4 for a reversible PCB design, running either RTIC or Embassy-based firmware.

![MiniF4-36 split reversible PCB with STM32F4](/202604/smart-keymap_4.avif)

### Comparison with Other Firmware
Smart Keymap functions as a library of behavior logic rather than a full-stack framework like QMK or ZMK. This architecture is most similar to Keyberon, where the developer implements the firmware's hardware-specific parts while the library manages the key state machine. 

The primary difference lies in the configuration interface. While QMK uses C or JSON and ZMK uses Devicetree, Smart Keymap uses Nickel to provide a more functional and modular approach to defining how a keyboard responds to user input.

### Technical Implementation
The heart of the library is the `key` module and its `System` trait. Implementors are aggregated to create a composite system that processes key presses and releases to output HID keyboard reports. 

When building firmware, users typically define their keymap in a `.ncl` file. The build system then uses environment variables to inject this custom keymap into the compilation process, ensuring that the final binary contains the specific layout and behaviors required for the target hardware. This process is supported across multiple toolchains, including Cargo for Rust targets and CMake/Make for C-based RISC-V targets.
