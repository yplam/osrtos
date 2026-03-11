---
title: EuroPi
summary: A fully user-reprogrammable Eurorack module based on the Raspberry Pi Pico.
  It allows users to process control voltages and digital signals using MicroPython,
  featuring 6 CV outputs, an OLED display, and a comprehensive firmware API for custom
  synth script development.
slug: europi
codeUrl: https://github.com/Allen-Synthesis/EuroPi
siteUrl: https://allen-synthesis.github.io/EuroPi/
star: 517
version: v0.21.2
lastUpdated: '2025-12-07'
rtos: ''
libraries:
- micropython
topics:
- eurorack
- hardware
- micropython
- modular
- python
- raspberry-pi
- raspberry-pi-pico
- synthesiser
isShow: true
image: /202512/europi.webp
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
---

## Bridging Eurorack and Python with EuroPi

The EuroPi is an open-source, user-reprogrammable Eurorack module that brings the flexibility of Python programming to the modular synthesizer world. Built around the Raspberry Pi Pico, the EuroPi allows users to define their own module behavior—whether it's a complex sequencer, a multi-stage envelope generator, a quantizer, or a random voltage source—simply by writing MicroPython scripts.

By leveraging the RP2040 microcontroller, EuroPi provides a high-performance platform for real-time CV processing while remaining accessible to hobbyists and developers who may not be familiar with traditional C++ embedded development.

## Hardware Capabilities

The EuroPi hardware is designed to be a versatile utility for any Eurorack system. It features a robust set of I/O and control interfaces:

- **Outputs**: Six 0-10V Control Voltage (CV) outputs, each accompanied by an indicator LED for visual feedback.
- **Inputs**: One 0-12V CV input and one digital input for external clocking, gates, or triggers.
- **Controls**: Two knobs with 12-bit resolution and two push buttons for manual interaction.
- **Display**: A 128x32 OLED display for menu navigation, parameter visualization, and feedback.
- **Expansion**: An I2C header on the rear allows for future expansion with additional sensors or output modules.

The hardware has seen significant improvements over its prototype phase, now featuring full 0-10V unipolar output ranges, hardware debouncing for buttons, and integrated 12V to 5V regulation. The module is also diode-protected to prevent back-powering your rack when connected via USB for programming.

## The Software Ecosystem

At the heart of the EuroPi is its MicroPython-based firmware. The project provides a dedicated `europi.py` library that abstracts the hardware layer, making it trivial to read inputs and set output voltages. 

For example, setting a voltage on an output is as simple as:

```python
from europi import cv1, k1

# Set CV output 1 based on the position of knob 1
voltage = k1.read_voltage()
cv1.voltage(voltage)
```

This high-level API allows developers to focus on the logic of their synthesis algorithms rather than bit-banging registers or managing ADC timings. The project also maintains a `contrib` directory, a rich repository of community-created scripts ranging from Euclidean sequencers to harmonic LFOs.

## Development and Contribution

EuroPi is a community-driven project. It encourages users to not only write their own scripts but also contribute to the core firmware and documentation. The project follows a structured contribution process, ensuring that new scripts are well-documented with Markdown files and adhere to consistent coding styles. 

For those looking to extend the module's functionality, the firmware includes an experimental directory for shared code like quantizers, screensavers, and custom fonts. This modular approach to software allows the EuroPi to evolve far beyond its initial design, effectively becoming a "chameleon" module in any rack.

## Getting Started

Setting up a EuroPi involves flashing the MicroPython UF2 to the Raspberry Pi Pico and uploading the core library files. The project provides a comprehensive calibration script to ensure that the 12-bit ADCs and DACs are accurately mapped to real-world voltages. Once calibrated, users can load any script from the community library or begin crafting their own unique modular tools.
