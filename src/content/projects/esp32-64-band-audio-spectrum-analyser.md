---
title: ESP32 64-Band Audio Spectrum Analyser
summary: A real-time audio frequency visualizer built on the ESP32 microcontroller
  using the Arduino framework and Kiss FFT library. It processes audio signals through
  ADC or I2S inputs to display 64 frequency bands on an SSD1322 OLED screen.
slug: esp32-64-band-audio-spectrum-analyser
codeUrl: https://github.com/varungujjar/esp32-audio-spectrum-analyser
star: 17
lastUpdated: '2025-01-26'
rtos: freertos
topics:
- audio-processing
- cpp
- esp32
- fft
- multiprocessing
- platformio
- rtos
- ssd1322
- wemos-lolin-esp32
isShow: true
image: /202601/spectrum.webp
createdAt: '2026-01-29'
updatedAt: '2026-01-29'
relatedProjects:
- m5cardputer-audio-spectrum-display
- esp32-custom-hardware-synthesizer
- esp-scope
- esp32-i2s-microphone-stream
- sonosesp-esp32-p4-sonos-controller
- esp32webscope
---

## Overview

The ESP32 64-Band Audio Spectrum Analyser is a high-performance audio visualization project designed for the ESP32 microcontroller. By leveraging the dual-core processing power of the ESP32, the system performs real-time Fast Fourier Transform (FFT) analysis on incoming audio signals, translating sound into a dynamic visual representation across 64 distinct frequency bands. 

This project is particularly well-suited for audio enthusiasts looking to add a professional-grade visual element to their desk setup or home audio system. It supports multiple visualization modes and hardware configurations, making it a versatile tool for real-time signal analysis.

## Technical Implementation

The core of the project relies on the **Kiss FFT** library to handle the computationally intensive task of frequency analysis. Audio data is captured via the ESP32's internal Analog-to-Digital Converter (ADC) for line-in signals or through I2S for digital audio input. The software then processes these samples to calculate the magnitude of various frequency components.

The project is built using the **PlatformIO IDE** and the **Arduino framework**, ensuring a modular and maintainable codebase. It utilizes the Adafruit GFX and SSD1306/SSD1322 library stacks to drive high-resolution OLED displays, providing smooth animations and low-latency visual feedback.

## Key Features

- **High-Resolution Visualization**: Supports 32, 42, or 64 band column modes to suit different display preferences.
- **Dynamic Peak Handling**: Includes two modes of peak holders with adjustable peak delay times, allowing for a more aesthetic and readable frequency response.
- **Hardware Flexibility**: Designed around the ESP32 Wemos Mini form factor, featuring an onboard audio gain adjuster for fine-tuning line-in signal levels.
- **Multiple Input Methods**: Capable of processing standard analog line-in signals or integrating with Bluetooth audio via the ESP32-A2DP library.

## Hardware and Design

The repository includes comprehensive resources for building the physical device, including:
- **Schematics**: Detailed wiring diagrams for connecting the ESP32 to the OLED display and audio input circuitry.
- **PCB Gerber Files**: Production-ready files for creating a custom printed circuit board to house the components.
- **OLED Support**: While configured for SSD1322 256x64 screens for a wide-aspect visual, the code is adaptable to other common display controllers.

## Software Configuration

The project's environment is managed via `platformio.ini`, which defines dependencies such as the `arduino-audio-tools` and `ESP32-A2DP` libraries. This setup allows the device to function not just as a wired analyzer, but potentially as a wireless Bluetooth audio sink that visualizes the stream as it plays. The use of the `esp32_exception_decoder` filter in the build configuration ensures that developers can easily debug the firmware during customization.
