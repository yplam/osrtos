---
title: ESP32 SD Sampler
summary: A polyphonic music synthesizer for the ESP32-S3 and ESP32-P4 that streams
  PCM WAV samples directly from an SD card. It utilizes a custom FAT32 lookup system
  to bypass RAM limitations, enabling the playback of massive multi-velocity sample
  sets with built-in ADSR envelopes and reverb effects.
slug: esp32-sd-sampler
codeUrl: https://github.com/copych/ESP32_SD_Sampler
version: bookmark
lastUpdated: '2026-03-30'
licenses:
- MIT
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
image: /202604/esp32_sd_sampler.webp
createdAt: '2026-04-28T23:35:58+00:00'
updatedAt: '2026-04-28T23:35:58+00:00'
---

The ESP32 SD Sampler is a sophisticated polyphonic music synthesizer designed to overcome one of the most significant hurdles in embedded audio: memory constraints. While many micro-controller-based samplers attempt to preload audio data into RAM or PSRAM, this project takes a different approach by streaming PCM WAV samples directly from a microSD card. This architecture allows the sampler to handle massive, multi-gigabyte sample sets that would be impossible to fit into traditional memory chips.

## Direct Streaming Architecture

At the heart of the ESP32 SD Sampler is a custom SDMMC implementation designed for high-speed, low-latency data retrieval. By using a 4-bit wide bus and analyzing the File Allocation Table (FAT) at startup, the system creates its own sample lookup table. This allows the engine to access data immediately without the overhead of standard file system calls during playback. 

To ensure smooth performance, the project requires that the SD card be freshly formatted in FAT32 with minimal fragmentation. This optimization enables the sampler to achieve a polyphony of 15 to 20 stereo voices, depending on the specific MCU and the technical specifications of the microSD card used. The engine reads approximately seven sectors per request, balancing buffer sizes with the fast internal RAM available on the ESP32-S3 and P4.

## Sound Shaping and Synthesis

The sampler is not just a file player; it is a full-featured synthesis engine. It supports 16 and 24-bit WAV files at a 44100Hz sample rate. Each voice is processed through a digital ADSR (Attack, Decay, Sustain, Release) envelope generator, providing precise control over the dynamic contour of the sound. 

Beyond basic playback, the project includes a built-in Reverb FX engine and digital signal processing for signal mixing, attenuation, and amplitude limiting. It also supports velocity layering—up to 16 layers per note—allowing for highly expressive instruments, such as grand pianos or complex drum kits, where the timbre changes based on how hard a key is struck.

## Configuration and MIDI Control

One of the most user-friendly aspects of the project is the `SAMPLER.INI` configuration system. Instead of hardcoding sample mappings, users can define how samples are spread across the keyboard using a simple plain-text file. This file manages global parameters, velocity limits, and per-note configurations like tuning (speed), ADSR constants, and instrument groupings (useful for exclusive groups like open and closed hi-hats).

The sampler responds to standard MIDI messages, making it compatible with external controllers and sequencers. Supported MIDI controls include:

* **Note On/Off**: Triggering samples with velocity sensitivity.
* **Sustain (CC64)**: Managing note hold behavior.
* **Pitchbend**: Real-time frequency modulation.
* **ADSR Controls**: CC mappings for Attack (73), Release (72), Decay (75), and Sustain Level (76).
* **Reverb Parameters**: Dedicated CCs for Reverb time, level, and send.

## Hardware and Build Requirements

Designed primarily for the ESP32-S3 and the newer ESP32-P4, the project leverages the specific memory segmentation and performance characteristics of these chips. While the core logic is built on the Arduino framework, it interfaces deeply with ESP-IDF components for I2S audio output and SDMMC hardware abstraction. 

Setting up the project requires the Arduino IDE and a few specific libraries: `FixedString` for efficient memory-safe string handling, the `Arduino MIDI library`, and optionally `FastLED` if the user wishes to incorporate RGB status indicators. Because the sampler relies on high-speed streaming, the quality of the microSD card and the avoidance of certain buggy ESP32 Arduino core versions (specifically 3.1.2 and 3.1.3) are critical for a stable build.
