---
title: SI4732 Radio
summary: A custom firmware project for a home-built radio receiver based on the ESP32-S2
  and SI4732 module. It features a high-resolution Sharp LS027B7DH01 LCD and utilizes
  the Arduino framework with libraries like U8g2 and PU2CLR SI4735 for multi-band
  radio reception.
slug: si4732-radio
codeUrl: https://github.com/joaquimorg/si4732-radio
star: 31
lastUpdated: '2025-06-06'
rtos: freertos
libraries:
- u8g2
topics:
- esp32
- si4732
isShow: true
image: /202601/si4732-radio.webp
createdAt: '2026-01-23'
updatedAt: '2026-01-23'
relatedProjects:
- tinyradio9-for-wt32-sc01-plus
- esp32fmradio
- espri-esp-radio-interface
- ehradio
- elekstube-ips-custom-firmware
- qn8066-fm-dsp-rx-tx-arduino-library
---

## Overview

The SI4732 Radio project is a custom firmware implementation designed for a DIY radio receiver. Built around the powerful ESP32-S2 Mini and the versatile SI4732 radio module, this project transforms simple hardware into a sophisticated receiver platform. It is heavily inspired by the ATS_MINI project by G8PTN and incorporates advanced features like a high-resolution memory LCD and digital signal processing for audio visualization.

## Hardware Architecture

The project is designed to run on a specific hardware stack that balances performance and efficiency:

- **Microcontroller**: ESP32-S2 Mini, providing the processing power and GPIO flexibility needed for complex UI and radio control.
- **Radio Module**: SI4732, a high-performance multi-band receiver chip capable of handling FM, AM, and SSB signals.
- **Display**: Sharp LS027B7DH01 LCD, a 2.7-inch memory display with a resolution of 400x240. This display is known for its extremely low power consumption and high visibility in sunlight.
- **Input**: A 360-degree rotary encoder module for frequency tuning and menu navigation.

## Technical Implementation

The firmware is developed using the PlatformIO ecosystem and the Arduino framework. By leveraging the ESP32's underlying FreeRTOS capabilities, the system manages multiple tasks including user interface rendering, encoder polling, and radio chip communication.

Key libraries integrated into the project include:
- **U8g2**: Used for driving the Sharp LCD, providing a robust API for text and monochrome graphics.
- **PU2CLR SI4735**: A comprehensive library for controlling the SI4732/SI4735 family of radio chips, enabling access to advanced features like RDS and SSB patches.
- **arduinoFFT**: Utilized for processing audio data, likely for real-time spectrum visualization on the high-resolution display.
- **ESP32RotaryEncoder**: Ensures smooth and interrupt-driven handling of the tuning knob.

## Project Heritage

This firmware is a significant adaptation of G8PTN's ATS_MINI. It also draws from the work of Ralph Xavier and Ricardo (PU2CLR), whose libraries and research into the Silicon Labs radio chips have become standard in the amateur radio community. The project serves as a bridge between classic radio hobbyism and modern embedded development, providing a complete open-source platform for radio enthusiasts to build their own high-quality receivers.
