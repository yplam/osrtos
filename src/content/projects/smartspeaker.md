---
title: SmartSpeaker
summary: An embedded smart speaker implementation based on the STM32F407VET6 microcontroller
  and FreeRTOS. It integrates the WM8978 audio codec for high-quality sound processing
  and an ESP8266 for WiFi connectivity to access Baidu Cloud voice recognition services.
slug: smartspeaker
codeUrl: https://github.com/lovelyterry/SmartSpeaker
star: 290
lastUpdated: '2024-10-08'
rtos: freertos
topics:
- esp8266
- freertos
- speech-recognition
- stm32
- wm8978
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32n6-getting-started-for-audio-ai
- esp32-voice-assistant
- erikaos-online-weather-station
- diy-ai-voice-assistant-for-esp32-s3
- speech2touch
- kalo-esp32-voice-assistant
---

## Overview

SmartSpeaker is an open-source project that demonstrates the implementation of a voice-controlled assistant using a microcontroller rather than a traditional embedded Linux system. Built on the STM32F407VET6 platform and managed by FreeRTOS, this project mimics the functionality of devices like the Amazon Echo or Tmall Genie. It handles the entire pipeline of a smart speaker, including audio capture, voice activity detection (VAD), cloud-based speech-to-text, and audio playback.

## Hardware Architecture

The system relies on three primary components to manage its core functions:
- **STM32F407VET6**: Acts as the main controller, managing tasks, file systems, and peripheral communication.
- **WM8978**: A high-performance audio codec used for both Digital-to-Analog (DAC) and Analog-to-Digital (ADC) conversion, facilitating audio recording and playback.
- **ESP8266**: Serves as the network interface, providing WiFi connectivity to communicate with cloud services.
- **SD Card**: Provides essential storage for recording voice clips and storing music files.

## Technical Implementation

The software architecture is modular, leveraging FreeRTOS for task scheduling and synchronization. Key modules include:

### Audio Processing
The project includes drivers for the WM8978 and utilizes the HelixMP3Decoder library for playing compressed audio files. It features a custom Voice Activity Detection (VAD) algorithm based on short-time zero-crossing rates and wave energy, allowing the device to start recording automatically when it detects speech.

### Networking and Cloud Integration
Network operations are handled via the ESP8266. The system connects to Baidu Cloud's voice recognition API to process recorded audio. Users must configure their WiFi credentials in `network.c` and provide a Baidu developer token in `netvoc.c` to enable these features.

### Shell Interface
One unique feature of this project is its integrated Shell. By providing basic `getchar`, `putchar`, and `puts` functions, the project implements a command-line interface accessible via a serial terminal (like Xshell). This allows users to interact with the STM32 in a manner similar to a Linux terminal, executing commands and monitoring system status in real-time.

### Visual Feedback
The system includes an LED module that provides visual feedback based on voice recognition results. During music playback, the system performs spectrum analysis on the audio data to dynamically change LED colors in sync with the music.

## Project Structure

- **Audio**: Contains WM8978 drivers, recording logic, and the Helix MP3 decoder.
- **Fatfs**: Implements the Fatfs file system on the SD card.
- **Network**: Manages ESP8266 serial encapsulation and cloud communication protocols.
- **Peripherals**: Contains low-level STM32 drivers, many of which are optimized for FreeRTOS integration.
- **Shell**: Implements the human-machine interaction layer for serial commands.
