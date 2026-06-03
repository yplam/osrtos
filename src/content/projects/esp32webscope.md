---
title: ESP32WebScope
summary: A dual-core ESP32 application that functions as both a waveform generator
  and a web-based oscilloscope. It utilizes I2S for high-speed ADC sampling and WebSockets
  to provide a real-time visual interface for signal analysis directly in a browser.
codeUrl: https://github.com/guohaomeng/ESP32WebScope
isShow: false
rtos: freertos
libraries:
- spiffs
topics:
- esp32
- oscilloscope
- platformio
- signal-generator
- spiffs
- websocket
star: 18
lastUpdated: '2022-11-28'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- esp-scope
- m5cardputer-audio-spectrum-display
- esp32-64-band-audio-spectrum-analyser
- oscilloscope-rp2040
- esp-can-analyzer
- esp32-remote-control-with-websocket
---

ESP32WebScope is an integrated tool designed for the ESP32 platform that transforms a single microcontroller into a functional low-frequency oscilloscope and waveform generator. By leveraging the dual-core architecture of the ESP32, the project manages to handle high-speed data acquisition and web-based communication simultaneously without significant performance degradation.

## Core Functionality and Architecture

The project is split into two primary modules: the Waveform Generator and the Oscilloscope. To ensure stability, these hardware-intensive tasks are pinned to specific CPU cores. 

### Waveform Generator
The generator operates on **Core 1**, utilizing hardware timer interrupts to drive the ESP32's internal DAC (Digital-to-Analog Converter). It supports frequencies ranging from 0 to 1500Hz and can produce sine, square, and sawtooth waves. Users can dynamically adjust parameters such as offset voltage and peak-to-peak values. By default, the output is routed to DAC Channel 1 (GPIO25).

### Oscilloscope
The oscilloscope functionality also runs on **Core 1** to maintain timing precision. It uses the I2S peripheral to perform ADC sampling, which allows for much higher sampling rates than standard analogRead calls. The system supports sampling rates from 1kHz up to 550kHz. While it samples 2048 points per round, it processes and displays 256 points, with adjustable sampling intervals to allow for horizontal axis magnification. It currently supports both rising and falling edge software triggers.

## Communication and Web Interface

Communication is handled on **Core 0**, ensuring that network traffic does not jitter the signal generation or sampling timing. The system initializes both an HTTP server and a WebSocket server:

- **HTTP Server**: Serves static web assets (HTML, CSS, JS) stored in the ESP32's flash memory via SPIFFS. These files are Gzip-compressed to save space and improve loading times.
- **WebSocket Server**: Facilitates bi-directional, real-time communication. The client sends commands to adjust generator and scope parameters, while the ESP32 streams sampled data back to the browser for rendering.

## Getting Started

To deploy ESP32WebScope, you will need the PlatformIO IDE. The project structure requires a two-step upload process:

1.  **Upload Filesystem Image**: The web interface files located in the `data` directory must be compiled into a binary image and uploaded to the ESP32's flash memory. In PlatformIO, this is done via the `Build Filesystem Image` and `Upload Filesystem Image` tasks.
2.  **Upload Firmware**: Once the filesystem is prepared, the main application code can be compiled and flashed to the board.

By default, the oscilloscope listens on GPIO35 (ADC1_CHANNEL_7). For testing purposes, the project also includes a 50kHz PWM signal output to verify the I2S sampling performance at high frequencies. While some waveform distortion occurs at the extreme limits of the I2S+ADC sampling rate, the system remains capable of accurately calculating signal frequency and displaying the general wave shape.
