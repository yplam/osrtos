---
title: Polymath-Studio One-Handed Keyboard (PS-OHK)
summary: The Polymath-Studio One-Handed Keyboard (PS-OHK) is an open-source hardware
  and firmware project designed for efficient one-handed typing. It features a custom
  layout based on linguistic patterns and hand ergonomics, targeting CH55x microcontrollers
  with firmware built using the SDCC compiler.
slug: polymath-studio-one-handed-keyboard-ps-ohk
codeUrl: https://github.com/blueOkiris/ps-ohk
star: 13
lastUpdated: '2024-09-10'
rtos: ''
topics:
- accessibility
- arduino
- ch552g
- convenience
- keyboard
- mcu
- one-handed-keyboard
- pcb
isShow: true
image: /202603/psohk.webp
createdAt: '2026-03-12'
updatedAt: '2026-03-12'
---

## Overview

The Polymath-Studio One-Handed Keyboard, or **PS-OHK** (pronounced "psawk"), is a specialized input device designed to provide a high-performance typing experience using only one hand. Unlike many one-handed solutions that rely on complex layers or non-standard key counts, the PS-OHK utilizes a standard key count and a layout optimized for the natural shape and movement of the human hand.

## Design Philosophy

The project is built around four core pillars to ensure that the transition from a standard QWERTY keyboard is as seamless as possible while maximizing efficiency:

1.  **Common Letter Frequency**: The layout prioritizes the most frequently used letters in the English language, placing them in the most accessible positions.
2.  **Phonetic Relationships**: Keys are organized based on the relationships between sounds, aiding in muscle memory retention.
3.  **Ergonomics**: The physical design and key mapping are tailored specifically to the shape and reach of a left hand.
4.  **Practicality**: It maintains a standard key count to ensure it can function as a primary input device without requiring specialized modifiers for basic characters.

## Technical Implementation

The PS-OHK firmware is designed for the **CH55x** series of microcontrollers, which are popular 8051-based chips known for their built-in USB capabilities. The development environment is managed through a Nix shell, ensuring reproducible builds across different systems.

### Build System and Toolchain

The project utilizes a robust open-source toolchain:
- **SDCC (Small Device C Compiler)**: Used to compile the C-based firmware for the 8051 architecture.
- **ch55xtool**: A Python-based utility used for flashing the compiled binary to the microcontroller.
- **GNU Make**: Orchestrates the build and upload process.
- **Arduino-CLI**: Included in the dependencies for auxiliary tasks or potential framework compatibility.

## Hardware and Enclosure

Beyond the firmware, the repository includes comprehensive design files for the physical hardware. This includes:
- **PCB Designs**: Breakout boards for components like the PCA9505DGGY.
- **Enclosure**: 3D-printable or manufacturable housing designs located in the `enclosure` directory.
- **Hand-Specific Layouts**: Dedicated configurations for left-handed use, with deprecated right-hand versions available for reference.

## Getting Started

To build the firmware, users typically navigate to the firmware directory and run `make`. The flashing process involves a specific hardware sequence: holding the program button while plugging the device into a USB port, then executing the upload command within a three-second window. This bootloader entry method is characteristic of the CH55x family's factory bootloader.
