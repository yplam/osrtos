---
title: ESP8266 Sound Effects I2S Web Trigger
summary: A web-controlled sound effects player for the ESP8266 platform using an I2S
  DAC. It plays 16-bit PCM WAV files stored in the SPIFFS flash file system and features
  a WebSocket-based web interface for remote triggering.
slug: esp8266-sound-effects-i2s-web-trigger
codeUrl: https://github.com/bbx10/SFX-I2S-web-trigger
star: 62
lastUpdated: '2016-09-16'
rtos: ''
libraries:
- spiffs
topics:
- audio-player
- esp8266
- esp8266-arduino
- i2s
- i2s-dac
- speaker
- spiffs
- wav-files
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- esp32-web-server-using-spiffs
- esp32-i2s-microphone-stream
- z906-remote
- esp8266-web-server-and-spiffs-integration
- radiojkk32-multifunctional-internet-radio-player
- esp32-monaco-editor-spiffs
---

## Overview

The SFX-I2S-web-trigger is an embedded audio project designed for the ESP8266 microcontroller. It allows users to remotely trigger sound effects through a web browser, making it an ideal solution for interactive installations, IoT audio notifications, or even remote-controlled pranks. Unlike many other sound trigger projects that rely on expensive dedicated MP3 decoder boards, this project utilizes a cost-effective I2S DAC with a built-in 3W Class D amplifier to deliver high-quality audio directly from the MCU.

## Hardware Architecture

The system is built around the ESP8266, specifically tested with the Adafruit Feather Huzzah due to its integrated lithium battery charger. The core of the audio output is the MAX98357A I2S 3W Class D Amplifier. This breakout board converts digital audio data from the ESP8266's I2S controller directly into an amplified analog signal capable of driving a 4 Ohm or 8 Ohm speaker.

**Key Hardware Components:**
- **ESP8266 Module**: Handles WiFi connectivity, web serving, and I2S data streaming.
- **MAX98357A I2S DAC**: A mono amplifier that simplifies the circuit by eliminating the need for an external analog stage.
- **SPIFFS Storage**: Utilizes the onboard flash (typically 4MB) to store WAV files.

## Technical Implementation

### Audio Streaming via I2S
Audio files are stored as uncompressed 16-bit PCM WAV files. The project includes a custom `wavspiffs` handler that parses RIFF/WAV headers to extract sample rates and bit depths. The data is then streamed to the I2S interface using non-blocking writes. This is critical for maintaining the web server's responsiveness while audio is playing. The system supports various sample rates, including 11025, 22050, and 44100 Hz.

### Web Interface and Connectivity
The project features a responsive web interface built with HTML5 and WebSockets. By using WebSockets instead of standard HTTP GET requests, the trigger latency is significantly reduced, providing an "instant-play" feel. 

**Software Stack:**
- **WiFiManager**: Eliminates hardcoded credentials by providing a captive portal for WiFi configuration.
- **WebSockets**: Facilitates real-time communication between the browser and the ESP8266.
- **mDNS**: Allows users to access the device via `http://espsfxtrigger.local` instead of tracking IP addresses.

## Getting Started

To use the system, audio files must be prepared as mono 16-bit PCM WAVs and named sequentially (e.g., `T0.wav`, `T1.wav`). These files are uploaded to the ESP8266's flash memory using the SPIFFS upload tool. Once the firmware is flashed, the device can be powered by a lithium battery, making it entirely portable.

```cpp
// Example of the non-blocking I2S write logic used in the project
bool ICACHE_FLASH_ATTR i2s_write_lr_nb(int16_t left, int16_t right){
  int sample = right & 0xFFFF;
  sample = sample << 16;
  sample |= left & 0xFFFF;
  return i2s_write_sample_nb(sample);
}
```

## Use Cases

Because of its small footprint and battery-powered capability, the SFX-I2S-web-trigger is highly versatile. It can be integrated into props for cosplay, used as a remote doorbell, or hidden within objects to create interactive sound environments triggered from a smartphone.
