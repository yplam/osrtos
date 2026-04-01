---
title: ESP32 PCM1808 Sound Recorder
summary: A high-quality sound recording application for the ESP32 that utilizes the
  PCM1808 ADC to capture audio via the I2S interface. The project records 32-bit monoral
  sound at 44.1kHz and saves the output directly to an SD card in WAV format.
slug: esp32-pcm1808-sound-recorder
codeUrl: https://github.com/marcopyre/esp32_pcm1808_SoundRecorder
lastUpdated: '2024-05-29'
licenses:
- MIT
image: /202604/esp32_pcm1808_SoundRecorder_0.avif
rtos: freertos
topics:
- adc
- arduino
- esp32
- i2s
- i2s-adc
- pcm1808
- platformio
isShow: true
createdAt: '2026-04-01T01:20:17+00:00'
updatedAt: '2026-04-01T01:20:17+00:00'
---

Capturing high-quality audio on embedded systems often requires moving beyond internal ADCs to dedicated external hardware. This project, a fork of the original work by MhageGH, provides a streamlined solution for recording high-fidelity sound using an ESP32 and the PCM1808 analog-to-digital converter (ADC).

## High-Fidelity Audio Capture

The core of the project is the integration between the ESP32 and the PCM1808. By using the I2S (Inter-IC Sound) protocol, the system can transfer digital audio data with high precision. Unlike standard 8-bit or 12-bit internal converters, this setup is configured to generate 32-bit monoral WAV files at a sampling rate of 44.1kHz. This makes it suitable for applications ranging from environmental noise monitoring to basic voice recording where clarity is paramount.

## Hardware Integration

The system is designed to run on the popular ESP32-DevKitC, making it accessible for rapid prototyping. The hardware stack includes:

- **ESP32-DevKitC**: The primary microcontroller handling the I2S stream and file system operations.
- **PCM1808 ADC**: An external high-performance converter that translates analog microphone signals into digital I2S data.
- **Micro SD Slot**: Connected via SPI (or equivalent wiring) to store the captured audio files.
- **Passive Components**: The design suggests the use of 10kΩ resistors for signal stability.

## Functionality and Usage

The firmware is built using the Arduino framework within the PlatformIO ecosystem. It is designed for "plug-and-play" operation: once the hardware is wired correctly and an SD card is inserted, the device begins recording sound immediately upon power-up. 

The recorded data is processed and wrapped in a standard WAV header, ensuring that the resulting files are immediately playable on any modern computer or mobile device without the need for proprietary conversion tools.

## Technical Implementation

By leveraging the `arduino-esp32` core, the project utilizes the underlying FreeRTOS capabilities of the ESP32 to manage the timing-sensitive I2S data stream while simultaneously handling the overhead of writing to an SD card. The use of PlatformIO ensures that the build environment is reproducible, with the `platformio.ini` file specifying the `esp32doit-devkit-v1` board and a monitor speed of 115200 baud for debugging.

This project serves as an excellent starting point for developers looking to implement digital audio recording on the ESP32 platform, providing a clear example of I2S peripheral configuration and WAV file management.
