---
title: Digital Synth PRA32-U2
summary: A 4-voice polyphonic synthesizer designed for the Raspberry Pi Pico 2 and
  RP2350 microcontroller. It features built-in chorus and delay effects, MIDI control
  via USB or UART, and support for high-quality I2S DACs or PWM audio output.
slug: digital-synth-pra32-u2
codeUrl: https://github.com/risgk/digital-synth-pra32-u2
star: 14
version: v2.0.0
lastUpdated: '2026-01-07'
rtos: ''
topics:
- audio
- midi
- pra32
- raspberry-pi-pico-2
- rp2350
- synthesizer
isShow: true
image: /202601/pra32-u2-pico-audio-pack.webp
createdAt: '2026-01-27'
updatedAt: '2026-01-27'
relatedProjects:
- esp32-soundfont-sf2-sampler-synthesizer
- stm32f4-digital-synthesizer
- usbsid-pico
- esp32-custom-hardware-synthesizer
- pico2dexed
- esp32-s3-soundfont-sf2-sampler-synthesizer
---

## Overview

The Digital Synth PRA32-U2 is a sophisticated 4-voice polyphonic synthesizer specifically optimized for the Raspberry Pi Pico 2 and its RP2350 microcontroller. Serving as an upgraded successor to the original PRA32-U, this project transforms the RP2350 into a fully functional MIDI sound module. It combines a versatile synthesis engine with integrated digital effects, making it a compact yet powerful tool for electronic music production and embedded audio experimentation.

## Hardware and Audio Architecture

The project is built around the high-performance RP2350, leveraging its processing power to handle real-time synthesis and effects. For audio output, the system primarily targets I2S DACs, such as the Pimoroni Pico Audio Pack or Texas Instruments PCM510x series modules. It operates at a 48 kHz sampling rate with 16-bit depth. 

While I2S is the recommended output method for high-fidelity sound, the project also includes an optional PWM audio mode. This allows users to generate sound directly from the microcontroller pins with a simple RC filter, though it is currently noted as a secondary option due to potential signal discontinuity issues. To ensure optimal performance during audio processing, the system clock is typically overclocked to 153.6 MHz.

## Synthesis Engine and Effects

The PRA32-U2 features a classic subtractive synthesis architecture enhanced with modern digital capabilities:

- **Oscillators**: Two oscillators per voice. Oscillator 1 supports Saw, Square, Triangle, Sine, and Pulse waves, along with specialized Wave Tables. Oscillator 2 includes Saw, Square, Triangle, Sine, and White Noise options.
- **Filter and Envelope**: A resonant filter with Low Pass and High Pass modes, controlled by dedicated Envelopes (EG) and LFOs. The filter implementation includes soft clipping for added character.
- **Modulation**: A flexible LFO with multiple waveforms (including Sample & Hold) that can target pitch, filter cutoff, or oscillator shape.
- **Built-in FX**: The signal chain concludes with integrated Chorus and Delay effects, providing spatial depth and texture without requiring external processing.

## MIDI Control and Editing

As a MIDI sound module, the PRA32-U2 is designed to be played and controlled via external hardware or software. It supports:

- **USB MIDI**: Default operation as a USB MIDI device using the Adafruit TinyUSB stack.
- **UART MIDI**: Optional support for traditional DIN/TRS MIDI connections via UART pins, which can help avoid USB-related electrical noise.
- **Web-Based Editor**: The project includes a dedicated HTML/Web MIDI application (`pra32-u2-editor.html`). This editor allows users to modify parameters, manage user presets, and even perform "Random Synth" generation to discover new sounds.

## The PRA32-U2/P Control Panel

For users seeking a standalone hardware instrument, the project offers the **PRA32-U2/P** configuration. This version adds a physical user interface consisting of:
- A 128x64 OLED display (SSD1306).
- Tactile switches for navigation and playback.
- Potentiometers for real-time parameter manipulation.
- An 8-step monophonic sequencer with internal or external clock synchronization.

## Technical Implementation

The project is developed using the **Arduino IDE** and the **Arduino-Pico core** by Earle F. Philhower, III. It relies on the standard Arduino MIDI Library for message handling. The repository provides the complete source code, including Ruby scripts for generating wave tables and a C++ utility for generating sample WAV files on a PC for debugging purposes. For those who prefer not to compile from source, prebuilt UF2 files are available for immediate deployment to Raspberry Pi Pico 2 hardware.
