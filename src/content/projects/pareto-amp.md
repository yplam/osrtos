---
title: Pareto Amp
summary: Pareto Amp is open-source firmware for networked I2S audio amplifier systems
  based on ESP32 and ESP32-S3 microcontrollers. Built with ESP-IDF and FreeRTOS alongside
  LwIP and SPIFFS, it features Bluetooth A2DP sinking, USB audio streaming, Snapclient
  playback, hardware and software parametric equalization, and an integrated web control
  interface. It targets custom audio hardware including the Amped and Louder board
  series.
slug: pareto-amp
codeUrl: https://github.com/geelenaudio/paretoamp
siteUrl: https://geelen.audio
version: v0.2.1
lastUpdated: '2026-11-01'
licenses:
- GPL-3.0
rtos: freertos
libraries:
- lwip
- spiffs
isShow: true
image: /202611/sonnocotta-amp.webp
createdAt: '2026-11-05T02:08:51+00:00'
updatedAt: '2026-11-05T02:08:51+00:00'
---

Pareto Amp is a unified firmware platform designed for high-fidelity networked I2S audio solutions. Developed to power compact, connected digital amplifier boards, it integrates local and wireless audio streaming capabilities with parametric equalization into a unified ESP-IDF and FreeRTOS codebase.

### Multi-Source Audio Streaming

The firmware transforms ESP32 and ESP32-S3 microcontrollers into versatile audio hubs by supporting several concurrent playback paths:

- **Bluetooth A2DP Sink**: Direct high-quality streaming from mobile phones and tablets using Classic Bluetooth on ESP32-WROVER targets.
- **USB Audio Class (UAC)**: Native playback gadget support on ESP32-S3 boards, allowing the device to enumerate directly as a computer sound card.
- **Snapclient Network Audio**: Built-in Snapcast client integration designed for synchronized multi-room playback when paired with a local `snapserver` and `librespot` instance.
- **Embedded Web Control**: An on-device web application for controlling master volume, selecting input sources, configuring network settings, and adjusting parametric EQ curves.

### Parametric Equalization: Software vs. Hardware

Audio output and equalization processing are tailored to the underlying hardware architecture of each board:

- **Software PEQ (Amped variants)**: Employs a 10-band software parametric equalizer and software volume control for boards equipped with DACs like the PCM5100A. To manage CPU budget on Core 1 of the dual-core ESP32, the stereo filter cascade runs ganged curves across both channels.
- **Hardware PEQ (Louder variants)**: Leverages onboard Texas Instruments TAS58xx smart amplifiers (such as the TAS5805M and TAS5825M). The firmware offloads signal processing directly to the amplifier's internal DSP, offering up to 15 bands of hardware parametric EQ per channel with optional independent left/right unlinking and hardware-level volume attenuation.

### Supported Hardware Targets

A single source repository supports multiple board revisions across two Espressif silicon generations:

- **Amped-ESP32**: ESP32-WROVER-N8R8 module with PCM5100A DAC and software PEQ.
- **Amped-ESP32-S3**: ESP32-S3 variant with software PEQ and UAC USB sound card support.
- **Louder-ESP32-Plus**: ESP32-WROVER-N8R8 module combined with a TAS58xx integrated Class-D amplifier.
- **Louder-ESP32-S3**: ESP32-S3 combined with TAS58xx hardware DSP processing and USB audio capabilities.

### Network Provisioning and Flashing

First-boot provisioning features a validate-then-commit onboarding process. When unconfigured, the device serves an open Wi-Fi access point with a captive portal for network selection. Web-based flashing via Web Serial or CLI programming using standard tools like `esptool` and PlatformIO enables quick deployment across all supported targets.
