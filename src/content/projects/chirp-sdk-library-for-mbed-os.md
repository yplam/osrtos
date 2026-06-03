---
title: Chirp SDK Library for Mbed OS
summary: A library providing the Chirp SDK for Mbed OS, enabling data-over-sound communication
  for ARM Cortex-M microcontrollers. It allows devices to exchange data using acoustic
  signals within the Mbed OS ecosystem.
codeUrl: https://github.com/chirp/chirp-mbed-os-lib
isShow: false
rtos: mbed-os
libraries: []
topics:
- cortex-m4
- data-over-sound
- mbed
- mbed-os
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- spektrum-receiver-library-for-mbed
- mbed-os-libraries
- micro-ros-for-rt-thread
- picoosc
- spirit-motor-driver-library
- arm-cortex-m-hilbert-transform
---

## Bringing Data-over-Sound to Mbed OS

The `chirp-mbed-os-lib` repository provides the official integration of the Chirp SDK for Mbed OS. Chirp is a specialized technology that enables devices to exchange data using sound waves, often referred to as acoustic machine-to-machine (M2M) communication. By utilizing this library, developers can enable ARM Cortex-M based devices to transmit and receive digital information using near-ultrasonic or audible frequencies.

## Why Use Acoustic Communication?

Data-over-sound offers a unique set of advantages for embedded systems. Unlike traditional radio frequency (RF) technologies like Wi-Fi, Bluetooth, or Zigbee, acoustic communication does not require complex pairing processes or specialized antennas. It can operate in environments where RF interference is high or where wireless signals are restricted. Because sound is contained by physical walls, it also provides a natural security layer for localized data exchange.

## Technical Integration

This library is specifically tailored for **Mbed OS**, a popular real-time operating system designed for IoT and embedded applications on ARM microcontrollers. By packaging the Chirp SDK as an Mbed-compatible library, it simplifies the process of adding audio-based data transfer to existing projects. 

The library typically manages the heavy lifting of Digital Signal Processing (DSP), converting data payloads into modulated sound patterns that can be played through a speaker and captured via a microphone. On the receiving end, the SDK processes the incoming audio stream to decode the original data.

## Hardware and Ecosystem

As an Mbed OS library, it targets a wide range of ARM Cortex-M microcontrollers supported by the Mbed ecosystem. To utilize the library effectively, the target hardware generally requires:

*   An analog-to-digital converter (ADC) connected to a microphone for receiving data.
*   A digital-to-analog converter (DAC) or PWM output connected to a speaker or buzzer for transmitting data.
*   Sufficient processing power to handle the real-time audio modulation and demodulation provided by the SDK.

This library serves as a bridge between the high-level Chirp communication protocols and the low-level hardware abstraction layers provided by Mbed OS, allowing developers to focus on their application logic rather than the complexities of acoustic physics.
