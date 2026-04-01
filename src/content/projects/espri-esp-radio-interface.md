---
title: ESPRI (ESP Radio Interface)
summary: ESPRI is an ESP32-based interface designed to extend the functionality of
  ham radios, such as the Quansheng UV-K5. Built using the ESP-IDF framework and FreeRTOS,
  it provides features like wireless UART, AFSK/Morse beacons, audio recording to
  SD cards, and a web-based control panel.
slug: espri-esp-radio-interface
codeUrl: https://github.com/kamilsss655/ESPRI
version: v1.3.2
lastUpdated: '2025-03-21'
licenses:
- Apache-2.0
image: /202603/espri.webp
rtos: freertos
libraries:
- lwip
- spiffs
topics:
- c
- electronics
- embedded
- esp32
- ham-radio
isShow: true
createdAt: '2026-03-31T23:35:02+00:00'
updatedAt: '2026-03-31T23:35:02+00:00'
---

## Overview

ESPRI, short for ESP Radio Interface, is an open-source project designed to bridge the gap between traditional ham radios and modern digital capabilities. By integrating an ESP32 microcontroller with a radio via the standard Kenwood connector, ESPRI transforms basic handheld transceivers into versatile digital tools. Originally developed with the Quansheng UV-K5 in mind, the project provides a comprehensive hardware and software stack to handle everything from wireless programming to automated beaconing.

At its core, ESPRI acts as a physical and logical interface layer. It leverages the ESP32's Wi-Fi and Bluetooth capabilities to provide a wireless gateway to the radio's UART interface, while also handling analog audio processing for advanced features like digital mode modulation and demodulation.

## Hardware Architecture

The project revolves around a custom PCB—the ESPRI "hat"—which mounts onto an ESP32 board like the Lolin Lite. This interface board contains the necessary analog circuitry to manage audio levels and PTT (Push-To-Talk) triggering. The connection to the host radio is established through a Kenwood-style connector, a standard found on many popular handheld radios.

Recent hardware revisions (V2.2) include support for uSD cards, allowing the device to act as a standalone digital voice recorder or a broadcast source for pre-recorded audio files. The design is compact enough to be attached directly to the back of a radio, creating a portable digital workstation.

## Software Features and Capabilities

ESPRI is built on the Espressif IoT Development Framework (ESP-IDF) and utilizes FreeRTOS for task management. One of its standout features is the integrated web server, which hosts a Single Page Application (SPA). This web panel allows users to control the radio from any browser-enabled device without needing dedicated mobile apps.

### Beacon and Audio Modes

The firmware includes several automated modes useful for amateur radio operators:
- **Morse Code Beacon**: Automatically transmits CW messages with configurable speed and content.
- **AFSK Beacon**: Supports Audio Frequency Shift Keying for digital identification or data bursts.
- **WAV Playback and Recording**: Users can record incoming audio directly to the uSD card or internal SPIFFS storage and broadcast those files back over the air.
- **DSP Processing**: The ESP32 handles real-time digital signal processing, including an Auto Gain Control (AGC) algorithm and DSP filters to improve audio quality.

### Real-time Communication

The system utilizes WebSockets for real-time communication between the ESP32 and the web interface. This ensures that system logs, status notifications, and radio telemetry are updated instantly on the user's dashboard. The JSON-based API also allows for potential integration with third-party software or custom mobile clients.

## Technical Implementation

The project demonstrates a sophisticated use of the ESP32's peripherals. It utilizes the I2S interface for high-quality audio handling and the PWM audio component for signal generation. Networking is handled via LWIP, providing a stable environment for the web server even in field conditions where the ESP32 acts as a standalone Access Point.

For storage, ESPRI employs a dual approach: SPIFFS is used for system files and the web interface, while the SD card interface handles larger audio assets. This separation ensures that the core system remains stable even if the external storage is removed or formatted.

## Future Roadmap

The project is evolving toward becoming a full wireless modem. Development is underway to implement custom digital modes that are modulated and demodulated entirely on the ESP32 chip. This would allow any standard analog radio to participate in advanced messaging networks, similar to systems like Meshtastic, but utilizing the power and range of traditional ham radio frequencies.
