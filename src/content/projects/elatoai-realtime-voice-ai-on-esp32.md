---
title: 'ElatoAI: Realtime Voice AI on ESP32'
summary: An end-to-end platform for deploying state-of-the-art AI voice agents on
  ESP32-S3 hardware. It utilizes a Deno-based edge server to bridge microcontrollers
  with APIs from OpenAI, Gemini, and Eleven Labs, featuring Opus audio compression
  and Secure WebSockets for low-latency speech-to-speech interaction.
slug: elatoai-realtime-voice-ai-on-esp32
codeUrl: https://github.com/akdeb/ElatoAI
siteUrl: https://elatoai.com
star: 1300
lastUpdated: '2026-01-09'
rtos: freertos
libraries:
- platformio-platformio-core
- lwip
topics:
- agents
- ai
- arduino
- deno
- elevenlabs
- esp32
- gemini
- grok
- hardware
- humeai
- openai
- realtime
- realtime-api
- speech-to-speech
- supabase
- websocket
isShow: true
image: /202601/elatoai.webp
createdAt: '2026-01-12'
updatedAt: '2026-01-12'
relatedProjects:
- esp32-voice-assistant
- livekit-esp32-sdk
- echokit-firmware
- xiaoclaw-ai-voice-assistant-with-local-agent-brain
- nebaura-labs-mote
- starmoon-open-source-conversational-ai-device
---

## Bringing Conversational AI to the Edge

ElatoAI is an ambitious open-source project designed to bridge the gap between advanced Large Language Models (LLMs) and embedded hardware. By targeting the ESP32-S3 microcontroller, the project enables developers to create physical devices—such as interactive toys or voice assistants—capable of holding natural, real-time conversations. The system supports a wide array of industry-leading AI models, including OpenAI Realtime API, Gemini Live, xAI Grok, and Eleven Labs, providing a versatile foundation for voice-driven applications.

## System Architecture

The project is built on a robust three-tier architecture designed to minimize latency and maximize reliability:

1.  **IoT Client (ESP32-S3):** The hardware layer handles audio capture and playback. It uses the Arduino framework and PlatformIO for development, leveraging the Opus codec for efficient audio streaming and Secure WebSockets (WSS) for encrypted communication.
2.  **Edge Server (Deno):** Acting as a high-performance middleware, the Deno-based edge functions manage the complex WebSocket handshakes between the hardware and the AI providers. This layer handles tool calling, session management, and API orchestration.
3.  **Frontend Management (Next.js):** A web-based dashboard allows users to configure their AI agents, manage device settings, and view conversation histories stored in a Supabase database.

## Technical Implementation and Hardware

At the heart of the embedded implementation is the ESP32-S3-DevKitC-1. The firmware is optimized to run without the requirement of external PSRAM, making it accessible for a wider range of hardware configurations. To achieve high-quality audio with minimal bandwidth, ElatoAI employs the Opus codec at a 12kbps bitrate with a 24kHz sampling rate. This ensures that even on standard WiFi connections, the round-trip latency remains under two seconds globally.

The project utilizes several key libraries within the Arduino ecosystem:
- **Arduino Audio Tools & LibOpus:** For handling the audio pipeline and encoding/decoding.
- **WebSockets:** For maintaining the persistent, full-duplex connection to the edge server.
- **ESPAsyncWebServer:** To provide a captive portal for easy WiFi configuration.
- **ArduinoJson:** For parsing real-time transcripts and control signals from the AI.

## Key Features for Embedded Developers

ElatoAI is more than just a voice wrapper; it includes a suite of features essential for production-grade IoT devices:
- **OTA Updates:** Support for Over-the-Air firmware updates to keep devices current.
- **Captive Portal:** A user-friendly WiFi management system that allows end-users to connect the device to their local network without hardcoding credentials.
- **Server-Side VAD:** Voice Activity Detection is handled intelligently to ensure smooth turn-taking in conversations.
- **Device Management:** Secure authentication and registration via Supabase, allowing for remote volume control and factory resets from the web dashboard.

## Getting Started with PlatformIO

Setting up the firmware requires a PlatformIO environment. The project is configured for the `esp32-s3-devkitc-1` board. Below is the core configuration used to build the project:

```ini
[env:esp32-s3-devkitc-1]
platform = espressif32 @ 6.10.0
board = esp32-s3-devkitc-1
framework = arduino
monitor_speed = 115200

lib_deps =
    bblanchon/ArduinoJson@^7.1.0
    links2004/WebSockets@^2.4.1
    ESP32Async/ESPAsyncWebServer@^3.7.6
    https://github.com/esp-arduino-libs/ESP32_Button.git#v0.0.1
    https://github.com/pschatzmann/arduino-audio-tools.git#v1.0.1
    https://github.com/pschatzmann/arduino-libopus.git#a1.1.0
```

By combining modern web technologies with efficient embedded C++, ElatoAI provides a blueprint for the next generation of AI-integrated hardware.
