---
title: Midi Player for NUCLEO-F446RE
summary: A MIDI file player implemented on the STM32 NUCLEO-F446RE board using Mbed
  OS. It features an actor-based software architecture, an OLED display for file navigation,
  and a rotary encoder for user input, outputting MIDI events via UART.
slug: midi-player-for-nucleo-f446re
codeUrl: https://github.com/lrutten/midiplayer
star: 1
version: v2020-06-29
lastUpdated: '2020-06-29'
rtos: mbed-os
topics:
- mbed-os
- midi
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- modular-music-cv-gate-sequencer-for-stm32
- esp32-host-midi
- ryattn-audio-relay-attenuator
- audio-recorder
- esp32-mp3
- mongoose-os-app-on-stm32f446re
---

## Overview

This project implements a dedicated MIDI file player designed for the STM32 NUCLEO-F446RE development board. By leveraging Mbed OS, the system provides a robust environment for reading MIDI data from an SD card and transmitting it to external musical instruments via a standard 5-pin DIN connector. The user interface is managed through a 128x64 OLED display and a rotary encoder, allowing users to browse the file system and select tracks for playback.

## Software Architecture: The Actor Model

One of the most interesting aspects of this project is its software design. Rather than a traditional procedural approach, the firmware is built as an actor system. In this architecture, major system components are encapsulated as "Actors" by inheriting from a base `Actor` class. 

Key actors include:
- **Controller**: Manages the high-level logic of the player, including file selection and playback state.
- **RotaryButton**: Handles user input. Interestingly, due to the physical characteristics of contact bounce, this actor uses a polling solution within its own dedicated thread rather than an interrupt-driven approach, ensuring reliable input detection.

## Memory-Efficient MIDI Parsing

Handling MIDI files on a microcontroller with limited resources (the F446RE has 128KB of SRAM) requires careful memory management. The project includes a custom MIDI parser designed to avoid buffering large chunks of MIDI events in memory. 

Instead of loading the entire file, the parser reads the MIDI stream and utilizes a lambda function as a callback. When specific MIDI events—such as Note On, Note Off, or Controller changes—are detected, the lambda is triggered to handle the event immediately. This streaming approach allows the system to handle complex MIDI files that would otherwise exceed the available RAM. The parser also correctly handles the MIDI "Running Status" mechanism and processes tempo changes to ensure accurate timing during playback.

## Hardware Integration

The system integrates several hardware peripherals to create a complete standalone device:

- **OLED Display**: A 128x64 SH1106-based display is used to show the file list from the SD card. The project utilizes Adafruit GFX libraries for rendering the interface.
- **SD Card Reader**: Connected via the SPI port (PA_5, PA_6, PA_7, and PB_6), allowing the system to access `.mid` files stored in the root directory.
- **MIDI Output**: Events are serialized and sent via the UART interface, which is physically connected to a MIDI DIN connector.
- **Rotary Encoder**: Provides the primary user interface for scrolling through files and initiating playback with a push-button action.

## Technical Implementation

The project is configured for the Mbed OS environment, specifically targeting the `NUCLEO_F446RE`. The `mbed_app.json` configuration file enables the SD card component and defines the specific SPI pin mappings required for the hardware setup. The build process is managed via a Makefile that supports compiling with GCC ARM, deploying to the board, and debugging using GDB and OpenOCD.
