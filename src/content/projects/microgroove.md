---
title: Microgroove
summary: An open-source 8-track MIDI sequence generator built on the Raspberry Pi
  Pico using the Rust RTIC framework. It features multiple sequence generation engines
  including random melodies, Euclidean rhythms, and Mutable Instruments' Grids algorithms,
  with support for scales, swing, and complex track interplay.
slug: microgroove
codeUrl: https://github.com/afternoon/microgroove
star: 17
lastUpdated: '2024-04-03'
rtos: rtic
topics:
- midi
- rtic
- rust
- sequencer
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- modular-music-cv-gate-sequencer-for-stm32
- europi
- midi2piousbhub
- pico2dexed
- pico-rtic-template
- gingoduino
---

Microgroove is an open-source hardware MIDI sequence generator designed to bring generative sequencing techniques—often found in modular synthesis and software environments—to a standalone desktop MIDI setup. Built around the Raspberry Pi Pico, it provides an 8-track environment where users can generate and manipulate sequences in real-time using a variety of algorithmic "Machines."

## Generative Sequencing Philosophy

The project is inspired by modular tools like the Turing Machine and Mutable Instruments Grids, as well as the workflow of Elektron hardware. Microgroove uses a "Machine" concept where different algorithms generate rhythm and melody independently. 

Users can explore several generation methods:
- **Random Melodies**: Generates unpredictable note patterns.
- **Euclidean Rhythms**: Creates mathematically distributed trigger patterns.
- **Grids Rhythms**: Implements rhythms based on the popular Mutable Instruments Grids module.
- **Quantization**: Melodies can be constrained to specific scales and keys.
- **Groove & Swing**: Includes MPC-style swing and the ability to create call-and-response structures between tracks.

## Technical Architecture

The firmware is written in Rust and utilizes the **RTIC (Real-Time Interrupt-driven Concurrency)** framework. This choice allows for highly accurate timing (down to a few microseconds), which is critical for musical applications where jitter can be audible. 

The software follows a Model-View-Controller (MVC) architecture, split into two distinct crates:
1. **microgroove_sequencer**: A platform-independent library implementing the data model (Sequencer, Track, Step, Note) and the generation logic. This separation allows the core logic to be unit-tested on a standard PC.
2. **microgroove_app**: The hardware-specific binary crate that handles the OLED display (View) and user input/MIDI processing (Controller).

## Hardware Design

Microgroove is designed to be DIY-friendly, utilizing standard components that can be assembled on a breadboard or protoboard. The core components include:
- **Raspberry Pi Pico**: The primary microcontroller.
- **128x64 Monochrome OLED**: For visual feedback and parameter editing.
- **Rotary Encoders & Mechanical Keys**: Six encoders and four Cherry MX-compatible keys provide a tactile interface similar to professional grooveboxes.
- **MIDI I/O**: Simple optoisolated MIDI input and buffered MIDI output circuits, compatible with both TRS minijacks and classic DIN jacks.

The project also includes a laser-cut case design, which can be customized via Tinkercad, making it a complete hardware project from electronics to enclosure.

## Development and Extensibility

Because the project is open-source and written in Rust, it serves as a platform for experimentation. Developers can easily create new "Machines" by implementing the `Machine` trait and adding them to the generation pipeline. The build system uses `cargo-embed` for flashing and supports serial debugging, providing a modern development experience for embedded audio projects.
