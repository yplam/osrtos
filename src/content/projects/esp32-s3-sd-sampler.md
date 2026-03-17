---
title: ESP32-S3 SD Sampler
summary: A polyphonic music synthesizer for the ESP32-S3 that plays PCM WAV samples
  directly from a microSD card. It features 15-20 stereo voices, ADSR envelopes, built-in
  reverb, and MIDI control, utilizing custom SDMMC routines for high-speed data access
  without preloading samples into RAM.
slug: esp32-s3-sd-sampler
codeUrl: https://github.com/copych/ESP32_S3_Sampler
star: 55
version: bookmark
lastUpdated: '2025-11-25'
rtos: freertos
topics:
- arduino
- audio
- esp32-s3
- esp32s3
- music
- sampler
- synth
- synthesizer
- wav
isShow: true
image: /202603/s3sampler.webp
createdAt: '2026-03-17'
updatedAt: '2026-03-17'
---

## High-Performance Polyphonic Sampling on the ESP32-S3

The ESP32-S3 SD Sampler is a sophisticated music synthesizer project that transforms the ESP32-S3 microcontroller into a powerful polyphonic sampler. Unlike many hobbyist sampling projects that attempt to preload audio data into limited RAM or PSRAM, this project streams PCM WAV samples directly from a microSD card. This architecture allows the device to handle massive sample sets—potentially several gigabytes in size—limited only by the capacity of the SD card itself.

By utilizing custom SDMMC routines with a 4-bit wide bus, the sampler achieves the throughput necessary for real-time polyphony. It analyzes the File Allocation Table (FAT) at startup to create a high-speed lookup table, ensuring immediate access to audio data without the latency typically associated with standard file system overhead.

## Key Features and Audio Capabilities

The sampler is designed for high-fidelity audio output and expressive musical performance. It supports 44100Hz, 16-bit stereo audio and can manage between 15 and 20 simultaneous stereo voices depending on the performance of the SD card used. 

**Core technical features include:**
- **Direct SD Streaming:** Optimized read-only access to FAT32 formatted cards.
- **WAV Support:** Compatible with both 16-bit and 24-bit WAV files.
- **Velocity Layering:** Supports up to 16 velocity layers per note for realistic instrument dynamics.
- **Integrated FX:** Features a built-in Reverb effect and per-note configurable ADSR envelopes.
- **MIDI Integration:** Full support for MIDI Note On/Off, Sustain (CC64), Pitchbend, and various CC messages for real-time control of ADSR and Reverb parameters.

## Flexible Configuration with SAMPLER.INI

One of the project's most user-friendly aspects is its configuration system. Each sample set is contained within a directory and managed by a plain-text `sampler.ini` file. This file allows users to define how samples are mapped across the keyboard, set global ADSR parameters, and configure filename templates for automatic mapping.

For example, a `sampler.ini` can define whether a set is melodic or percussive, set amplification levels, and specify how velocity layers are spread across the 0-127 MIDI range. It even supports exclusive groups, allowing for realistic behavior in drum kits where certain sounds (like an open and closed hi-hat) should mutually exclusive.

## Technical Implementation and Hardware

The project is built using the Arduino framework for the ESP32-S3. It leverages the dual-core architecture of the S3 to handle both the high-speed SDMMC data streaming and the real-time audio synthesis and effects processing. 

While the project is currently specific to the S3 variant due to its specific memory segmentation and performance characteristics, it represents a significant optimization of the ESP32 platform's capabilities. The hardware requirements are minimal, typically consisting of an ESP32-S3 development board, a microSD card slot, and an external I2S DAC for high-quality audio output.

## Getting Started

To build the sampler, developers need the Arduino IDE and the ESP32 Arduino core (version 2.0.17 is recommended). The project relies on a few external libraries for string handling and MIDI processing:
- **FixedString:** For efficient memory management of string data.
- **Arduino MIDI Library:** For handling incoming musical data.
- **FastLED (Optional):** For projects incorporating RGB LED visual feedback.

Once the firmware is uploaded, users simply need to format their microSD card to FAT32 and copy their sample folders (including the `sampler.ini` and WAV files) to the root directory. The system's ability to analyze file allocation on the fly ensures that even large, multi-velocity piano or drum libraries can be played with minimal latency.
