---
title: ESP32 RTSP Mic for BirdNET-Go
summary: An ESP32-C6 firmware designed to stream high-quality mono PCM audio from
  an I²S microphone over RTSP for bird sound identification. It features a comprehensive
  Web UI, JSON API for integration, and real-time audio processing including a configurable
  high-pass filter. The project is optimized for the Seeed XIAO ESP32-C6 and the ICS-43434
  digital microphone.
slug: esp32-rtsp-mic-for-birdnet-go
codeUrl: https://github.com/Sukecz/birdnetgo-esp32-rtsp-mic
star: 34
version: v1.3.0
lastUpdated: '2025-11-02'
rtos: freertos
libraries:
- lwip
topics:
- audio
- audio-streaming
- bird-net
- birdnet
- birdnet-go
- birdnetgo
- esp32
- ics43434
- mic
- rtsp
- rtsp-stream
- streammic
- xiao
- xiaoc6
isShow: false
createdAt: '2026-01-19'
updatedAt: '2026-01-19'
relatedProjects:
- esp32-i2s-microphone-stream
- audio-stream-server-for-m5cardputer
- esp32-cam-mjpeg-streaming-and-sd-capture
- birdnet-for-stm32
- esp32-rtspserver
- m5cardputer-audio-spectrum-display
---

## High-Performance Audio Streaming for Avian Monitoring

The ESP32 RTSP Mic for BirdNET-Go is a specialized firmware solution designed to turn an ESP32-C6 microcontroller into a high-quality audio source for bird sound analysis. By leveraging the I²S digital audio interface and the RTSP protocol, this project provides a reliable, low-latency stream of 16-bit PCM audio specifically tuned for integration with BirdNET-Go, a popular tool for automated bird vocalization identification.

## Hardware and Architecture

The project is optimized for the **Seeed Studio XIAO ESP32-C6**, a compact RISC-V based SoC with built-in Wi-Fi 6 capabilities. It utilizes the **ICS-43434** digital MEMS microphone, which provides a direct I²S output, bypassing the noise-prone analog stages found in cheaper microphone modules. 

The system architecture focuses on stability and audio fidelity. It captures mono audio at 48 kHz, applies real-time digital signal processing, and packages the data into an RTSP stream (PCM L16) accessible at `rtsp://<device-ip>:8554/audio`. This standardized approach allows the device to be used not just with BirdNET-Go, but with any RTSP-compatible client or NVR software.

## Key Features and Capabilities

Beyond simple audio streaming, the firmware includes a robust set of features for long-term outdoor deployment:

- **Web-Based Management**: A built-in Web UI (available in English and Czech) provides live status monitoring, level meters with clipping warnings, and full configuration of audio and system parameters.
- **Real-Time Audio Processing**: A configurable 2nd-order high-pass biquad filter (approx. 12 dB/octave) allows users to cut out low-frequency rumble from wind or traffic, which is essential for cleaning up spectrograms for bird identification.
- **Thermal Protection**: To ensure reliability in outdoor enclosures, the system includes a configurable shutdown limit (default 80 °C) with a persistent thermal latch that requires manual acknowledgement after a trip.
- **Auto-Recovery**: The firmware monitors packet rates and can automatically restart the audio pipeline if degradation is detected, ensuring the stream remains active without manual intervention.
- **Integration Ready**: A JSON API is available for automation and integration with home automation systems or custom monitoring dashboards.

## Technical Implementation

The project is built using the Arduino framework on top of the ESP32's FreeRTOS-based environment. It utilizes the `lwIP` stack for networking and handles RTSP keep-alive (GET_PARAMETER) to maintain stable connections with modern streaming clients. For onboarding, it employs a WiFi Manager that exposes a temporary Access Point on first boot, allowing users to configure network credentials without hardcoding them into the firmware.

## Getting Started

To deploy the system, developers can flash the firmware using PlatformIO or the Arduino IDE. On the first run, the device will enter onboarding mode. Once connected to the local network, the Web UI is accessible on port 80. For optimal results, it is recommended to maintain a Wi-Fi RSSI better than -75 dBm and use a shielded cable for the I²S microphone to reduce electromagnetic interference.
