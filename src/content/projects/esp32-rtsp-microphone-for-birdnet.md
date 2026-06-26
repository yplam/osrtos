---
title: ESP32 RTSP Microphone for BirdNET
summary: A high-performance network microphone firmware for Seeed Studio XIAO ESP32
  boards that streams 16-bit PCM audio via RTSP. It is designed for integration with
  BirdNET-Go and BirdNET-Pi for automated bird sound identification and includes a
  Web UI, MQTT telemetry, and OTA support.
slug: esp32-rtsp-microphone-for-birdnet
codeUrl: https://github.com/Sukecz/esp32-birdnet-mic
siteUrl: https://esp32mic.msmeteo.cz/
version: v1.10.0
lastUpdated: '2026-06-11'
licenses:
- MIT
image: /202606/esp32-birdnet-mic_0.avif
rtos: freertos
libraries:
- lwip
topics:
- audio
- audio-streaming
- bird-net
- birdnet
- birdnet-go
- birdnet-pi
- birdnetgo
- birdnetpi
- esp32
- esp32c3
- esp32c6
- esp32s3
- esp35c5
- ics43434
- mic
- rtsp
- rtsp-stream
- streammic
- xiao
- xiaoc6
isShow: true
createdAt: '2026-06-18T08:46:32+00:00'
updatedAt: '2026-06-18T08:46:32+00:00'
relatedProjects:
- esp32-rtsp-mic-for-birdnet-go
- esp32-i2s-microphone-stream
- audio-stream-server-for-m5cardputer
- esp32-rtspserver
- birdnet-for-stm32
- ehradio
---

## High-Quality Audio Streaming for Wildlife Monitoring

The `esp32-birdnet-mic` project is a specialized firmware designed to turn Seeed Studio XIAO ESP32 modules into high-performance network microphones. Primarily targeted at users of BirdNET-Go and BirdNET-Pi, this project simplifies the process of capturing and streaming ambient bird sounds for automated identification. By utilizing I2S MEMS microphones, the system provides 16-bit PCM/L16 mono audio, ensuring the clarity required for complex acoustic analysis.

## Advanced Audio Processing and Streaming

At its core, the firmware implements a robust audio pipeline. It uses a dedicated audio producer task that captures data from the I2S interface and passes it through a ring buffer to the RTSP packet output. This architecture, built on FreeRTOS, prevents audio drops and ensures a stable stream even when the network experiences minor fluctuations.

Users can configure two independent RTSP streams, which is particularly useful for feeding different analysis engines or monitoring tools simultaneously. The firmware supports both TCP and UDP transports, allowing it to adapt to the specific requirements of the target software—TCP for BirdNET-Go and UDP for BirdNET-Pi.

## Hardware Compatibility and Optimization

The project is optimized for the Seeed Studio XIAO ESP32 family, including the C3, S3, C5, and C6 variants. While the XIAO ESP32-C6 is the primary reference platform, the firmware includes runtime hardware validation to support the unique pinouts and RF configurations of other models.

A notable feature for the XIAO ESP32-C6 is the automatic management of the external antenna RF switch, ensuring maximum Wi-Fi range and stability. For environments where RF interference might affect audio quality, the firmware allows users to adjust the Wi-Fi TX power directly from the web interface, reducing coupling noise into the microphone wiring.

## Features for Long-Term Deployment

Designed for 24/7 operation, the firmware includes several reliability and integration features:

- **Web-Based Management**: A full English Web UI on port 80 for live status monitoring, log viewing, and configuration.
- **Smart Home Integration**: MQTT telemetry and Home Assistant MQTT Discovery allow users to monitor device health, temperature, and stream status within their existing automation dashboards.
- **Audio Enhancements**: A configurable high-pass filter (defaulting to 500 Hz) helps eliminate low-frequency rumble and environmental noise.
- **Thermal Protection**: Includes a persistent latching thermal protection system to prevent hardware damage in extreme outdoor conditions.
- **Scheduling**: Support for stream schedules and deep sleep modes to conserve power or limit data usage to specific times of day.

## Getting Started

Deploying the microphone is streamlined through a dedicated web flasher. Once flashed, the device boots into a captive portal mode (ESP32-RTSP-Mic-AP), allowing users to input their Wi-Fi credentials. After connecting to the local network, the device becomes accessible via a unique mDNS hostname (e.g., `esp32mic-a1b2c3.local`).

### Example RTSP Usage

Once the device is active, the audio streams can be accessed using standard tools like `ffplay` or VLC:

```bash
ffplay -rtsp_transport tcp rtsp://<device-ip>:8554/audio1
```

This URL can then be plugged directly into BirdNET-Go or BirdNET-Pi to begin real-time bird sound identification. The firmware defaults to 48 kHz mono 16-bit PCM, providing a balanced profile that avoids the common UDP stuttering observed in some ffmpeg-based clients.
