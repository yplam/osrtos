---
title: Oscilloscope RP2040
summary: A high-performance oscilloscope firmware for the Raspberry Pi Pico (RP2040)
  that implements the OpenHantek6022 protocol. It supports dual-channel capture at
  up to 2 MS/s and integrates with a modified version of the OpenHantek6022 desktop
  software for visualization.
slug: oscilloscope-rp2040
codeUrl: https://github.com/dgatf/oscilloscope_rp2040
star: 15
version: v1.1
lastUpdated: '2025-10-28'
rtos: ''
topics:
- openhantek
- oscilloscope
- raspberry-pi-pico
- rp2040
isShow: true
image: /202603/oscilloscope-rp2040.webp
createdAt: '2026-03-19'
updatedAt: '2026-03-19'
---

## Overview

The Oscilloscope RP2040 project transforms the Raspberry Pi Pico into a functional dual-channel oscilloscope. By implementing the OpenHantek6022 protocol, it allows the RP2040 to interface directly with the OpenHantek6022 desktop application, providing a low-cost solution for signal visualization and analysis. The project leverages the RP2040's hardware capabilities, including its high-speed ADC and PIO, to achieve sampling rates suitable for many hobbyist and entry-level electronics tasks.

## Technical Specifications and Performance

The firmware supports two channels with a maximum sampling rate of 2 MS/s. To achieve this performance, the RP2040 is overclocked to 240MHz. While the RP2040 features a 12-bit ADC, the data is scaled to 8-bit values to maintain compatibility with the OpenHantek protocol. 

One notable technical constraint is the USB Full Speed (12 Mbps) limitation of the RP2040. At sampling rates of 1 MS/s and higher, some samples may be dropped due to bus bandwidth limits. Additionally, because the ADC is overclocked alongside the CPU, users should be aware of potential impacts on absolute accuracy at the highest sampling tiers.

## Hardware Integration

The project is designed to be flexible, offering both a direct-connection mode and an enhanced mode using an external circuit. 

**Standard Pinout:**
- **Channel 1:** GPIO 26
- **Channel 2:** GPIO 27
- **Calibration Signal:** GPIO 22
- **Debug Output:** GPIO 16 (57600 bps)

In the basic configuration, the input voltage must remain between 0V and 3.3V. For users requiring professional features like AC/DC coupling and a wider input range (±5V), the project provides a schematic for an optional external circuit. This circuit utilizes common components like the LM358 op-amp and CD4066 IC switch to center and scale signals for the RP2040's ADC.

## Software and Calibration

To use the oscilloscope, users must install a modified version of OpenHantek6022 specifically forked to support the RP2040. Because the hardware lacks physical gain stages in its basic form, the project uses a software-based calibration approach. A provided `RP2040_0_calibration.ini` file maps the 0-3.3V hardware range to the ±5V range expected by the software, setting appropriate offsets and gains.

## Mechanical Design

Beyond the firmware and electronics, the repository includes a complete 3D-printable case design. The case is designed to house the Pico and the necessary headers for probes. Files are provided in FreeCAD (FCStd) format for modification, as well as STL and G-code formats for immediate printing. The design emphasizes portability and protection for the microcontroller during bench testing.
