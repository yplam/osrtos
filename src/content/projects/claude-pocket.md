---
title: Claude Pocket
summary: Claude Pocket is a voice-activated AI assistant firmware for the M5Stack
  Cardputer ADV, powered by Anthropic's Claude and OpenAI's Whisper and TTS APIs.
  It features a custom C++ implementation that handles voice activity detection, streaming
  transcription, and real-time audio playback on hardware without external PSRAM.
slug: claude-pocket
codeUrl: https://github.com/Nachtfux/claude-pocket
version: v0.2.0
lastUpdated: '2026-05-27'
licenses:
- MIT
image: /202606/claude-pocket_0.avif
rtos: freertos
libraries:
- littlefs
- platformio-platformio-core
topics:
- anthropic-api
- arduino
- cardputer
- claude
- embedded
- esp32
- m5stack
- openai-tts
- openai-whisper
- voice-assistant
isShow: true
createdAt: '2026-06-18T08:45:45+00:00'
updatedAt: '2026-06-18T08:45:45+00:00'
relatedProjects:
- xiaoclaw-ai-voice-assistant-with-local-agent-brain
- diy-ai-voice-assistant-for-esp32-s3
- echokit-firmware
- nebaura-labs-mote
- esp32-voice-assistant
- starmoon-open-source-conversational-ai-device
---

## Overview

Claude Pocket is a portable, voice-first interface for Anthropic's Claude AI, specifically designed for the M5Stack Cardputer ADV. Originally conceived during the "Code with Claude" event in London, this project transforms a compact, keyboard-equipped microcontroller into a fully functional voice assistant. By pressing a single button, users can speak to the device, which then transcribes the audio, generates a response using Claude 3.5 Sonnet, and speaks back using high-quality text-to-speech.

The project is notable for its direct integration with APIs, bypassing the need for cloud middleware. It communicates straight from the device to Anthropic and OpenAI endpoints, making it a powerful example of what can be achieved on modern ESP32-S3 hardware when memory and network constraints are handled with precision.

## Hardware and Architecture

The primary target for Claude Pocket is the M5Stack Cardputer ADV, which utilizes the StampS3A module (ESP32-S3). The hardware suite includes:

*   **Display**: 1.14" ST7789V2 LCD
*   **Audio**: ES8311 codec, NS4150 amplifier, and a 1 W speaker
*   **Input**: Onboard MEMS microphone and a full TCA8418-driven keyboard
*   **Power**: 1750 mAh battery

The user interface is themed with Anthropic’s brand palette, featuring an "Ivory" background and a signature orange "spark" animation that indicates the assistant's state, such as understanding, thinking, or speaking.

## Engineering for Limited Memory

One of the most significant technical achievements of Claude Pocket is its ability to function on the StampS3A, which lacks PSRAM. After the Wi-Fi stack, mbedTLS, and graphics libraries are initialized, the device is left with approximately 90 KB of heap memory. This is insufficient for traditional in-memory audio buffering of high-quality speech.

To overcome this, the developer implemented a flash-based buffering system using LittleFS. Microphone samples are written directly to a file on the internal flash memory (`/rec.pcm`) during recording. When the recording is complete, the file is streamed to the Whisper API in 1 KB chunks. Similarly, the Text-to-Speech (TTS) response is fully downloaded to flash before playback begins. This decoupling ensures that network jitter or TLS record gaps do not cause audio underruns or system crashes.

## Key Features

Beyond the core voice assistant, the firmware includes a variety of specialized applications:

*   **Claude Pocket Assistant**: The main voice interface featuring a 10-message conversation history and Voice Activity Detection (VAD) that automatically stops recording when the user finishes speaking.
*   **Orbit Fighter**: A unique, Claude-themed side-scrolling shooter. Players battle through biomes like "STAGING" and "PROD" while fighting bosses named REGEX_TYRANT and CONTEXT_OVERFLOW.
*   **Voice-to-Voice Translator**: A dedicated mode that uses Claude to translate speech between languages (defaulting to German and English), utilizing specific system prompts to ensure concise translation output.
*   **Internet Radio**: Streams HTTP/HTTPS radio stations using the libhelix-mp3 and libhelix-aac libraries, demonstrating the device's capability as a general-purpose media player.
*   **Weather and Utilities**: Includes an IP-based geolocation weather app and a comprehensive settings menu for Wi-Fi roaming, volume control, and system diagnostics.

## Implementation Details

The conversation logic is built around the `claude-sonnet-4-6` model. To maintain context, the assistant stores a small JSON-based history array. Each turn in the conversation is appended to this array, allowing for follow-up questions that rely on previous context. To prevent memory exhaustion and runaway API costs, the system enforces a 30-second cap on both recording and spoken responses.

Audio playback is managed through a sophisticated buffer pool. Since the `M5.Speaker.playRaw` function uses pointers to sample data rather than making copies, the project utilizes 16 rotating memory slabs. This allows the system to prepare new audio data while the speaker is still draining previous slabs, eliminating the audible doubling or echoing effects often found in simpler implementations.
