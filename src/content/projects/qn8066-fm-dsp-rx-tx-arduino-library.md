---
title: QN8066 FM DSP RX/TX Arduino Library
summary: A versatile C++ library for the QN8066 FM transceiver, enabling high-quality
  FM radio transmission and reception with RDS support. It targets a broad range of
  Arduino-compatible hardware including ATmega328, ESP32, STM32, and ATtiny, providing
  low-level I2C control and high-level functional abstraction.
slug: qn8066-fm-dsp-rx-tx-arduino-library
codeUrl: https://github.com/pu2clr/QN8066
siteUrl: https://pu2clr.github.io/QN8066/
version: 1.3.7
lastUpdated: '2025-12-09'
licenses:
- MIT
image: /202604/QN8066_7.avif
rtos: ''
topics:
- arduino
- fm
- qn8066
- radio
- rds
- transmitter
isShow: true
createdAt: '2026-04-02T23:26:50+00:00'
updatedAt: '2026-04-02T23:26:50+00:00'
---

The QN8066 FM DSP RX/TX Arduino Library is designed to provide an accessible and robust interface for the Quintic QN8066, a highly integrated digital FM transceiver. Developed with hobbyists, electronics technicians, and radio amateurs in mind, the project aims to simplify the creation of FM-based applications. By abstracting the complexities of the device's registers into a clean C++ object-oriented API, it allows developers to focus on application logic rather than low-level bit manipulation.

## Technical Capabilities and Features

The library implements most functions offered by the QN8066 IC, utilizing the I²C communication protocol. Key features include full support for the FM band (64 MHz to 108 MHz), high sensitivity, and an integrated stereo decoder. Advanced Digital Signal Processing (DSP) capabilities are leveraged to improve signal quality and mitigate noise. 

One of the standout features is its cross-platform compatibility. The library can be compiled for a vast array of boards, ranging from resource-constrained ATtiny85 and ATmega328 chips to high-performance ARM Cortex-M, STM32, ESP32, and Raspberry Pi Pico modules. It also includes comprehensive support for Radio Data System (RDS), allowing users to transmit program services and radio text.

## Hardware Architecture and Integration

The QN8066 is a sophisticated device containing several critical functional blocks: an RF Front-End for signal capture, a PLL Synthesizer for stable frequency generation, and dedicated audio processing units for both analog and digital formats.


Integrating the QN8066 into an Arduino project requires careful attention to electrical specifications. The device operates at a typical voltage range of 2.7V to 3.6V. Crucially, the logic signals (SCL, SDA, CEN) are not 5V tolerant. When using a 5V microcontroller like the Arduino Nano or Uno, a logic level shifter is required to prevent damage to the IC. For simpler integration, 3.3V boards such as the Arduino Pro Mini (8MHz version) or ESP32 are recommended.

![QN8066 and Arduino ATmega328 Interface Circuit](/202604/QN8066_2.avif)

### Clock Reference Selection

A unique aspect of the QN8066 is its dependence on an external reference clock injected via the XCLK pin. While the library defaults to a 32.768 kHz reference, it provides the flexibility to use various active crystal frequencies or signal generators. Users can configure dividers within the software to accommodate different clock sources, such as 1.31 MHz or 32.768 MHz oscillators. Note that the device requires an active signal source; passive crystals are not supported.

![Homemade breadboard setup with QN8066](/202604/QN8066_3.avif)

## Practical Implementation and DIY Kits

For those looking for a quick start, the library is compatible with popular "DIY Kit 5W-7W FM Transceiver" modules found on various marketplaces. These kits often combine the QN8066 with a power amplifier stage. However, high-power transmission introduces specific challenges, such as RF interference affecting the I2C bus.

![DIY Kit 5W-7W FM Transceiver Module](/202604/QN8066_7.avif)

Experimental results suggest that PWM signals used for power control can interfere with I2C communication. A recommended workaround involves disabling the PWM signal briefly while sending I2C commands and then re-enabling it. Additionally, proper shielding and grounding are essential when operating at higher power levels to maintain system stability and prevent the QN8066 from becoming unresponsive to the microcontroller.

## Software Design and Examples

The library is structured to be memory-efficient, utilizing modern compiler optimizations like Link Time Optimization (LTO) to ensure the final binary remains lean even in resource-constrained environments. It includes an extensive index of examples covering:

*   **Basic Transmission**: Minimalist setups for serial monitor control.
*   **RDS Broadcasting**: Dynamic text and real-time clock integration.
*   **Advanced Interfaces**: Implementations using OLED, LCD16x2, and Nokia 5110 displays.
*   **IoT Integration**: Web-based control interfaces for ESP32 and ESP8266, including Access Point and Web Socket modes.
*   **Receiver Modes**: Full FM receiver implementations with rotary encoder tuning and persistent station storage in EEPROM.

By providing these templates, the library enables developers to transition quickly from basic frequency tuning to complex, networked broadcast systems.
