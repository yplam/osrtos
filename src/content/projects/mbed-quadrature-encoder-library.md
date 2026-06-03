---
title: Mbed Quadrature Encoder Library
summary: A library for interfacing quadrature encoders with Mbed-compatible microcontrollers.
  Developed using the PlatformIO IDE, it provides software-based decoding of encoder
  signals for motion control and positioning applications.
slug: mbed-quadrature-encoder-library
codeUrl: https://github.com/vmanoj1996/mbed-encoder
star: 0
lastUpdated: '2019-03-07'
rtos: mbed-os
topics:
- encoder
- mbed-os
- platformio
- quadrature
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- spektrum-receiver-library-for-mbed
- micropython-rotary-encoder-driver
- stm32-uid-helper-for-mbed
- xiaomi-cybergear-arduino-library
- spirit-motor-driver-library
- rotary-encoder-with-i-c-interface
---

## Overview

The Mbed Quadrature Encoder library provides a straightforward solution for reading rotary encoders on Mbed-compatible hardware. Quadrature encoders are essential components in robotics and industrial automation, providing feedback on the position, speed, and direction of rotating shafts. This project implements the logic required to decode these signals in software, making it accessible for microcontrollers that may lack dedicated hardware encoder peripherals.

## Technical Implementation

The library is based on established software decoding techniques for quadrature signals. As detailed in the referenced EDN design documentation, decoding a quadrature encoder involves monitoring two square wave signals (Channel A and Channel B) that are 90 degrees out of phase. By tracking the state changes of these signals, the software can determine both the distance traveled (by counting pulses) and the direction of rotation (by checking which signal leads the other).

This implementation is specifically tailored for the Mbed ecosystem. While it was developed using the PlatformIO IDE, it follows standard Mbed conventions, allowing it to be integrated into various ARM Cortex-M based development boards supported by the Mbed framework.

## Key Features

- **Software-Based Decoding**: Implements encoder logic without requiring specialized hardware timers or quadrature encoder interface (QEI) peripherals.
- **Mbed Compatibility**: Designed to work across the wide range of microcontrollers supported by the Mbed OS and Mbed 2 frameworks.
- **PlatformIO Ready**: Optimized for modern embedded workflows using PlatformIO, though it remains adaptable for other build systems.
- **Demonstration Code**: Includes a dedicated demo project (`mbed_encoder_demo`) to help developers quickly verify their hardware setup and understand the API.

## Getting Started

To use the library, developers typically include the files found in the `library` directory into their project. The core logic involves initializing the input pins for the encoder channels and periodically checking the state or using interrupts to trigger updates. 

Because this project was written on PlatformIO, users of the Mbed Online IDE should be aware that some file structure adjustments might be necessary for a direct import. The project structure separates the reusable library logic from the demonstration application, following best practices for embedded software organization.

## Use Cases

This library is particularly useful for:
- **Robotics**: Tracking wheel odometry for mobile robots.
- **User Interfaces**: Interfacing with rotary knobs for menu navigation in embedded devices.
- **Motor Control**: Providing feedback for closed-loop DC motor control systems where high-precision hardware counters are unavailable or already in use.
