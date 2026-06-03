---
title: Nebaura Labs Mote
summary: Mote is an open-source ESP32-S3 voice companion device designed to bring
  personal AI into the physical world. It features real-time speech-to-text via Deepgram,
  natural voice synthesis through ElevenLabs, and an animated face display. The project
  includes a complete firmware stack, a gateway server, and a mobile application for
  configuration.
slug: nebaura-labs-mote
codeUrl: https://github.com/Nebaura-Labs/mote
siteUrl: https://nebaura.studio
star: 32
lastUpdated: '2026-01-18'
rtos: freertos
libraries:
- tft-espi
topics:
- ai
- aiagents
- clawd
- clawdbot
- clawdhub
- desktop-ai-assistant
- esp32
- open-source
isShow: false
createdAt: '2026-02-01'
updatedAt: '2026-02-01'
relatedProjects:
- starmoon-open-source-conversational-ai-device
- opentoys
- diy-ai-voice-assistant-for-esp32-s3
- stackchan-minimal
- xiaoclaw-ai-voice-assistant-with-local-agent-brain
- kalo-esp32-voice-chat-ai-friends
---

## Bringing AI to Life with Mote

Mote is an ambitious open-source project from Nebaura Labs that transforms the digital experience of interacting with AI into a physical presence. Built around the powerful ESP32-S3 microcontroller, Mote serves as a voice-enabled companion device featuring an expressive animated face, high-quality audio interaction, and seamless cloud integration. It is designed to connect to personal AI instances, specifically through the clawd.bot platform, providing a tactile and visual interface for modern LLMs.

## Hardware Architecture

At the heart of Mote is the ESP32-S3 N16R8, chosen for its dual-core performance, 16MB of Flash, and 8MB of PSRAM—essential for handling the large audio buffers required for smooth voice playback. The device's physical interface is centered around a 2-inch IPS LCD (ST7789), which displays a character that reacts dynamically to the conversation state (idle, listening, thinking, or speaking).

The audio subsystem is particularly robust for a DIY-friendly project:
- **Input**: An INMP441 I2S MEMS microphone provides clear audio capture.
- **Output**: A MAX98357A I2S amplifier drives 3W speakers.
- **Power**: Integrated LiPo battery support with USB-C charging and voltage monitoring via a 100kΩ voltage divider on GPIO 2.

## The Voice Pipeline

Mote implements a sophisticated real-time voice chat flow. Unlike simple command-response systems, Mote streams audio continuously over WebSockets to a gateway server. This server acts as an orchestrator, piping audio to Deepgram Nova-2 for low-latency transcription.

Once a user's command is captured—aided by Voice Activity Detection (VAD) running locally on the ESP32—the text is processed by an AI instance. The response is then synthesized via ElevenLabs using the `pcm_16000` format. To ensure smooth playback despite network jitter, the firmware utilizes a 60-second ring buffer residing in the ESP32's PSRAM, allowing for approximately 1MB of buffered audio.

## Software and Firmware Stack

The project is organized as a monorepo, ensuring that the firmware, the gateway server, and the mobile configuration app stay in sync.

### Firmware
The firmware is developed using the Arduino framework and PlatformIO, running on the FreeRTOS-based ESP-IDF core. It manages the complex task of balancing I2S audio streaming, WebSocket communication, and SPI display updates. Key components include:
- `audio.cpp`: Manages the I2S peripherals and the PSRAM ring buffer.
- `voice_client.cpp`: Handles the WebSocket connection and protocol.
- `mote_face.cpp`: Controls the ST7789 display and animations using the TFT_eSPI library.
- `ble_config.cpp`: Provides a BLE service for initial WiFi and server setup.

### Gateway and Mobile App
The gateway server, built with TanStack Start, handles the heavy lifting of API integrations with Deepgram and ElevenLabs. For users, the React Native (Expo) mobile app provides a user-friendly way to configure WiFi credentials, link API keys, and pair with the device via BLE using the `react-native-ble-plx` library.

## Getting Started with Development

For developers looking to build or modify Mote, the project provides a clear path. The firmware can be compiled and flashed using PlatformIO. All GPIO pins are configurable in the firmware headers, making it adaptable to different hardware revisions.

```cpp
// Example Audio Buffer Configuration
#define AUDIO_SAMPLE_RATE       16000   // 16kHz for voice
#define AUDIO_RING_BUFFER_SIZE  (16000 * 60)  // 60 seconds in PSRAM
#define VAD_THRESHOLD           300     // RMS energy threshold
```

## Customization and Community

Mote is released under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International license, encouraging personal use and community experimentation. Whether you are interested in designing new face animations, optimizing the VAD algorithms, or integrating different AI backends, Mote provides a solid, open-source foundation for the next generation of personal AI hardware.
