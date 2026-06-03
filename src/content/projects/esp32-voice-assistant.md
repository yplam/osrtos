---
title: ESP32 Voice Assistant
summary: An end-to-end conversational AI assistant using an ESP32 for real-time audio
  capture and playback. It leverages a Python backend for Speech-to-Text (Whisper),
  Language Modeling (Gemini), and Text-to-Speech (Piper) via WebSocket streaming.
  The system targets ESP32 hardware with I2S peripherals for high-quality voice interaction.
slug: esp32-voice-assistant
codeUrl: https://github.com/arpy8/ESP32_Voice_Assistant
star: 30
lastUpdated: '2025-11-17'
rtos: freertos
libraries:
- lwip
topics:
- ai
- esp32
- faster-whisper
- gemini
- llm
- piper-tts
- tts
- voice-assistant
isShow: true
image: /202601/arpy8_assistant.webp
createdAt: '2026-01-20'
updatedAt: '2026-01-20'
relatedProjects:
- elatoai-realtime-voice-ai-on-esp32
- kalo-esp32-voice-assistant
- diy-ai-voice-assistant-for-esp32-s3
- starmoon-open-source-conversational-ai-device
- kalo-esp32-voice-chat-ai-friends
- xiaoclaw-ai-voice-assistant-with-local-agent-brain
---

The ESP32 Voice Assistant is a sophisticated integration of low-power embedded hardware and modern AI inference. By offloading heavy computation to a Python-based server, the project enables an ESP32 to function as a fully conversational AI agent, capable of understanding speech and responding with a natural neural voice.

## System Architecture

The system architecture is split between the edge device and a backend server. On the hardware side, an ESP32-WROOM-32 serves as the central controller. It interfaces with an INMP441 MEMS microphone via I2S to capture high-precision 16 kHz PCM audio. When the user presses a tactile button, the ESP32 begins streaming this audio data in real-time over a WebSocket connection. 

The AI backend, which can be hosted locally or on a VPS, acts as the brain of the operation. It utilizes a multi-stage pipeline to process the user's request:

1.  **Speech-to-Text (STT)**: Faster-Whisper (specifically the 'tiny' model) transcribes the incoming audio stream into text with high efficiency on CPU hardware.
2.  **Large Language Model (LLM)**: Google Gemini 2.5 Flash processes the transcription to generate a contextual and intelligent response.
3.  **Text-to-Speech (TTS)**: Piper TTS synthesizes the text response into natural-sounding speech.

Once the response is generated, the server streams 8-bit PCM audio back to the ESP32. The microcontroller then outputs this audio through its internal DAC (GPIO 25), which is amplified by an LM386 module to drive a physical speaker.

## Hardware Implementation

The project utilizes several key components to achieve high-quality audio interaction:
- **ESP32-WROOM-32**: Handles Wi-Fi connectivity, I2S microphone input, and DAC output.
- **INMP441 Microphone**: A high-precision omnidirectional microphone that provides digital audio via I2S.
- **LM386 Audio Amplifier**: Boosts the signal from the ESP32's internal DAC to drive a 2-inch midrange speaker.
- **Power Management**: Includes a TP4056 charging module and a 1000mAh LiPo battery for portable operation.

## Technical Highlights

One of the project's technical highlights is its use of binary WebSocket streaming, which keeps latency low—often under 100ms for the transport layer. This ensures the interaction feels fluid rather than disjointed. The project also includes a watchdog script to ensure the Python server remains online, making it a robust solution for home automation or personal assistant prototypes.

The firmware is built using the Arduino core for ESP32, which runs on top of FreeRTOS, allowing for efficient management of the Wi-Fi stack and I2S timing. The backend is designed for modern Python environments, utilizing `uv` for dependency management and supporting Docker for easy deployment.
