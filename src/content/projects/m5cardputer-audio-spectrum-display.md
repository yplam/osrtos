---
title: M5Cardputer Audio Spectrum Display
summary: A real-time audio analysis application for the M5Cardputer that provides
  a spectrum analyzer, oscilloscope, and musical tuner. It utilizes the ESP32-S3's
  I2S interface for high-speed microphone sampling and implements fixed-point FFT
  and wavelet-based pitch tracking for efficient signal processing.
slug: m5cardputer-audio-spectrum-display
codeUrl: https://github.com/cyberwisk/m5Cardputer_audiospectrum
star: 22
lastUpdated: '2024-03-16'
rtos: freertos
topics:
- esp32
- m5cardputer
- m5stack
- spectrum-analyzer
isShow: true
image: /202603/audiospectrum.webp
createdAt: '2026-03-17'
updatedAt: '2026-03-17'
---

## Overview

The M5Cardputer Audio Spectrum Display is a versatile audio analysis tool ported to the M5Cardputer platform. Originally based on work for the M5StickC, this project transforms the ESP32-S3 powered handheld into a real-time signal visualizer. It leverages the built-in PDM microphone to capture audio data and provides three distinct modes of operation: a multi-band spectrum analyzer, a real-time oscilloscope, and a high-precision musical tuner.

## Key Features

The application is designed to provide immediate visual feedback for audio signals through three specialized interfaces:

- **Spectrum Analyzer**: Displays audio intensity across eight frequency bands (ranging from 125Hz to 16kHz) using a color-coded bar graph with peak-hold functionality.
- **Oscilloscope**: Provides a time-domain representation of the captured audio waveform, allowing users to see the raw signal shape and amplitude.
- **Musical Tuner**: Uses advanced pitch tracking to identify the fundamental frequency of an input signal, displaying the note name, octave, and cent deviation for precise instrument tuning.

## Technical Implementation

The project is built on the Arduino framework but utilizes several low-level ESP32 features to ensure high performance. Audio data is captured via the I2S (Inter-IC Sound) peripheral, which is configured for PDM (Pulse Density Modulation) to interface with the M5Cardputer's internal microphone. 

To maintain a responsive UI while performing intensive mathematical calculations, the project employs FreeRTOS multitasking. The core logic is split across two tasks:
1. **The Main Loop**: Handles user input (button presses to cycle modes) and high-speed I2S data acquisition.
2. **The Calculation Task**: Pinned to a separate CPU core, this task performs the heavy lifting of signal processing, including the Fast Fourier Transform (FFT) and pitch detection, before updating the display sprite.

### Signal Processing Libraries

Efficiency is achieved through the use of specialized signal processing implementations:
- **fix_fft**: A fixed-point Fast Fourier Transform library that avoids the overhead of floating-point math, making it ideal for real-time visualization on microcontrollers.
- **dywapitchtrack**: An implementation of the Dynamic Wavelet Algorithm for pitch tracking. This provides more robust frequency detection than simple zero-crossing methods, which is essential for the Tuner mode.

## Hardware Support

This project is specifically tailored for the **M5Cardputer**, utilizing its 240x135 TFT display and integrated microphone. The display logic uses the `LGFX_Sprite` class to provide flicker-free updates by buffering frames in RAM before pushing them to the screen. The code is optimized for the ESP32-S3, taking advantage of its dual-core architecture to balance sampling and rendering.

## Getting Started

To use the device, users can cycle through the different visualization modes using the main button (BtnA). The system automatically handles DC offset removal and noise floor filtering to ensure that the visualizations remain clean even in quiet environments. The spectrum analyzer uses a logarithmic scale for frequency mapping, providing a more natural representation of how humans perceive sound across the 8-band display.
