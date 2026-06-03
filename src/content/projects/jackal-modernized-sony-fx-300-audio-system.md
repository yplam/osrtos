---
title: 'Jackal: Modernized Sony FX-300 Audio System'
summary: A sophisticated multi-mode audio system built by upcycling a 1978 Sony FX-300
  chassis. It utilizes a distributed architecture with a Teensy 4.0 for main control,
  an ESP32 for Bluetooth A2DP, and an Arduino Nano for peripheral management, supporting
  FM radio, SD playback, and NFC-triggered automation.
slug: jackal-modernized-sony-fx-300-audio-system
codeUrl: https://github.com/t0mg/jackal
star: 31
lastUpdated: '2025-03-02'
rtos: ''
topics:
- a2dp-bluetooth
- arduino
- esp32
- i2c
- i2s-audio
- ili9341
- nfc
- pn532
- rda5807m
- teensy40
isShow: true
image: /202601/jackal.webp
createdAt: '2026-01-28'
updatedAt: '2026-01-28'
relatedProjects:
- esp32-mp3
- esp32fmradio
- radiojkk32-multifunctional-internet-radio-player
- high-fidelity-esp32-bluetooth-audio-sink-with-premium-codecs
- esp32-custom-hardware-synthesizer
- si4732-radio
---

## Overview

The Jackal project is a remarkable example of upcycling vintage hardware with modern embedded technology. Originally a 1978 Sony FX-300 portable TV and radio, the device has been completely gutted and rebuilt into a high-fidelity, multi-mode audio system. This project goes far beyond a simple Bluetooth speaker conversion; it is a sophisticated engineering feat that integrates three different microcontrollers to manage audio routing, a modern user interface, and complex peripheral control.

## System Architecture

The heart of the system is a **Teensy 4.0**, chosen for its high-performance ARM Cortex-M7 processor and the versatile Teensy Audio library. It acts as the central hub, managing the audio pipeline via an SGTL5000 codec on the Teensy Audio board. The Teensy also serves as the I2C controller for the entire system, coordinating with two other specialized microcontrollers:

*   **Bluetooth Sink (ESP32):** An M5Stack Atom (ESP32-based) handles the Bluetooth A2DP sink functionality. It provides 16-bit 44.1kHz audio via I2S to the Teensy and communicates metadata and playback status over I2C.
*   **IO Board (Arduino Nano):** A dedicated Arduino Nano manages the physical interface. It reads the original potentiometers and buttons of the 1978 chassis and interfaces with a PN532 NFC reader. By offloading these tasks, the main controller remains free to handle real-time audio processing and high-frame-rate display updates.

## Key Features & Capabilities

The Jackal supports a wide array of audio sources and modern features:

*   **Bluetooth Audio:** High-quality streaming with metadata display and playback control.
*   **FM Radio:** Integrated via an RDA5807 module, supporting RDS data and a "favorites" function.
*   **SD Card Playback & Recording:** Supports 16-bit 44.1kHz WAV files. It features a unique NFC-triggered playlist system where folder names on the SD card match NFC tag IDs for instant playback.
*   **Advanced Audio Processing:** The system includes a real-time FFT visualizer running at 30fps, a 5-band equalizer, and a bitcrusher effect for real-time audio manipulation.
*   **User Interface:** A 3.2" ILI9341 IPS display provides a rich UI, including a functional VU meter for volume and dedicated setup screens for time and date settings.

## Technical Implementation

The project demonstrates excellent use of inter-processor communication. The Teensy manages the display and audio routing, while the Arduino Nano handles the "slow" IO and the NFC module via software serial to avoid logic level complexity. The system is powered by a 10,000 mAh battery, making it a truly portable, modern homage to 1970s industrial design.

Beyond the core audio features, the project includes several polished touches, such as a boot animation and sound effects from a 1979 movie, MTP mode for managing SD card files over USB, and a hidden "Pong" mode accessible via a secret button combination during boot. The repository is organized into three subfolders—`main-board`, `bluetooth-sink`, and `io-board`—reflecting the distributed nature of the firmware.
