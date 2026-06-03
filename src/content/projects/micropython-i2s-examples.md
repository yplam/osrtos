---
title: MicroPython I2S Examples
summary: A comprehensive collection of MicroPython example code for implementing the
  I2S protocol on various microcontrollers. It enables audio playback of WAV files
  and microphone recording on STM32, ESP32, RP2040, and i.MX RT platforms.
slug: micropython-i2s-examples
codeUrl: https://github.com/miketeachman/micropython-i2s-examples
star: 296
lastUpdated: '2025-01-26'
rtos: ''
libraries:
- micropython
topics:
- audio
- esp32
- i2s
- i2s-dac
- i2s-microphone
- i2s-protocol
- micropython
- pyboard
- raspberry-pi-pico
- teensy40
- teensy41
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- micropython-samples-and-drivers
- micropython-examples-for-01studio-development-boards
- sparkfun-python-examples
- stm32-cortex-m4-code-examples
- awesome-micropython
- maixpy-scripts
---

## Overview

The MicroPython I2S Examples repository is a vital resource for developers looking to integrate audio capabilities into their MicroPython-based projects. The I2S (Inter-IC Sound) protocol is the industry standard for connecting digital audio devices, such as microphones, DACs, and amplifiers, to microcontrollers. This project provides a standardized way to handle streaming audio across multiple hardware architectures, including STM32, ESP32, Raspberry Pi Pico (RP2), and NXP i.MX RT (mimxrt).

## Hardware and Platform Support

One of the project's strengths is its broad hardware compatibility. It has been extensively tested on a variety of popular development boards and audio peripherals:

- **Microcontrollers**: Pyboard D/V1.1, ESP32 (Huzzah, Lolin D32), Raspberry Pi Pico, and Teensy 4.0/4.1.
- **Microphones**: INMP441, MSM261S4030H0, and the Adafruit SPH0645LM4H (including a specific software workaround for its non-standard timing).
- **DACs and Amplifiers**: MAX98357A, UDA1334A, PCM5102, and the Teensy audio shield.

## Key Features and Examples

The repository includes several practical examples that serve as both learning tools and functional drivers for embedded audio applications:

### Audio Playback
The `play_tone.py` example allows users to generate pure sine wave tones, which is the simplest way to verify I2S wiring and DAC functionality. For more complex applications, the `easy_wav_player.py` and `wavplayer.py` files provide a high-level interface for playing WAV files stored on an SD card. This includes support for standard playback controls like `pause()`, `resume()`, and `stop()`.

### Audio Recording
Developers can record audio from I2S MEMS microphones directly to a WAV file on an SD card. This is particularly useful for IoT sensing, voice memo applications, or edge computing projects involving sound analysis.

### Master Clock Generation
While most modern I2S peripherals generate their own clock, some high-end audio codecs require a Master Clock (MCK). The project demonstrates how to use `machine.PWM` to generate this signal on ports that do not natively support MCK output in their I2S class.

## Technical Implementation: The Bucket Analogy

To help developers understand the streaming nature of I2S, the project uses a "buckets and water" analogy. Unlike SPI or I2C, which are transactional, I2S is a continuous stream. The implementation uses an internal buffer (`ibuf`) as a large reservoir. 

In a playback scenario, the user fills a smaller "bucket" (the user buffer) from a WAV file and pours it into the `ibuf`. The I2S hardware then drains this reservoir at a constant, fixed rate. If the user fails to refill the reservoir fast enough, an "underflow" occurs, resulting in audible gaps. This explanation is crucial for developers tuning buffer sizes for different SD card speeds and sample rates.

## Configuration and Tuning

Every example includes dedicated sections for audio and I2S configuration. Because I2S performance is heavily dependent on timing and memory management, the project provides specific guidelines for buffer sizing:
- **Internal Buffer (ibuf)**: Generally recommended to be 2x to 4x the size of the user buffer to mitigate slow SD card write speeds.
- **User Buffer**: Typically sized around 5kB to balance heap usage with processing efficiency.

## Getting Started

To use these examples, users must ensure they are running MicroPython v1.20 or later, as this version includes the standardized I2S class. The repository provides detailed wiring tables for each supported board, ensuring that even beginners can correctly map signals like BCLK (Bit Clock), WSEL (Word Select), and DIN/DOUT (Data In/Out) to the appropriate GPIO pins.
