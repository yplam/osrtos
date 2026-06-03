---
title: nRF52811 Solum Tag Firmware
summary: A Rust-based firmware project for the Solum EL029H4WRC electronic shelf label
  featuring the nRF52811 SoC. It enables custom code execution on the tag, including
  e-paper display control for text and images using the embedded-graphics ecosystem.
  The project demonstrates how to use a Raspberry Pi Pico as a debug probe for flashing
  and debugging via SWD.
slug: nrf52811-solum-tag-firmware
codeUrl: https://github.com/tracyspacy/nrf52811-solum-tag
star: 62
lastUpdated: '2025-02-08'
rtos: ''
topics:
- eink
- embedded
- epaper
- rust
- rust-embedded
isShow: true
image: /202601/nrf52811-solum.webp
createdAt: '2026-01-29'
updatedAt: '2026-01-29'
relatedProjects:
- open-display-firmware
- pomia-rs
- pinetime-rs
- rust-ir-thermometer-firmware
- epd-nrf5-e-paper-display-calendar-and-photo-frame
- readmepaper-esp32-7-color-e-paper-display-project
---

## Overview

The nRF52811 Solum Tag project provides a framework for repurposing Solum EL029H4WRC electronic shelf labels (ESL) into custom embedded devices, such as conference badges or low-power information displays. By leveraging the Rust programming language and the nRF52811 hardware abstraction layer, this project allows developers to bypass the original factory firmware and implement custom logic on the tag's ARM Cortex-M4 microcontroller.

## Hardware and Connectivity

The project targets the Solum EL029H4WRC price tag, which is powered by the Nordic Semiconductor nRF52811 chip. Because these tags lack a USB interface, the project utilizes the Serial Wire Debug (SWD) pins located on the PCB. A unique aspect of this implementation is the use of a Raspberry Pi Pico as an affordable debug probe. By flashing the Pico with the `debugprobe` firmware, it acts as a bridge between the host computer and the tag's debug interface.

### Pin Configuration

To interface with the tag, four primary connections are required between the Raspberry Pi Pico and the Solum tag:
- **VCC**: Power supply (3.3V)
- **GND**: Ground
- **CLK**: SWD Clock
- **DIO**: SWD Data I/O

## Technical Implementation

The firmware is written in Rust, utilizing the `cortex-m-rt` runtime and the `nrf52811-hal` for peripheral access. The project integrates several key crates from the Rust embedded ecosystem:

- **embedded-graphics**: Used for drawing primitives and managing display buffers.
- **epd-spectra**: A driver specifically for the e-paper display found on these tags.
- **tinybmp**: Enables the rendering of BMP images on the e-ink screen.
- **defmt**: Provides efficient logging and deferred formatting for debugging over RTT.

The memory layout is defined in `memory.x`, specifying 192KB of Flash and 24KB of RAM, which is the standard configuration for the nRF52811 without a SoftDevice (Nordic's Bluetooth stack).

## Capabilities and Roadmap

The current implementation successfully demonstrates the core requirements for an interactive tag:
- Rendering text using the `profont` typeface.
- Displaying monochrome or multi-color BMP images.
- Flashing via `probe-rs` for a streamlined development workflow.

Future development goals for the project include activating the onboard LEDs, enabling wireless updates (OTA), and potentially integrating with the OpenEPaperLink ecosystem for Zigbee-based communication. This makes it an excellent starting point for developers interested in low-power e-paper applications and Rust-based embedded development.
