---
title: ClawPuter
summary: ClawPuter is an interactive pixel-art desktop companion for the M5Stack Cardputer
  (ESP32-S3) featuring a lobster character with rich animations and real-time weather
  integration. It leverages the OpenClaw AI gateway for streaming chat, voice-to-text
  via Groq Whisper, and bidirectional synchronization with a macOS desktop app.
slug: clawputer
codeUrl: https://github.com/bryant24hao/ClawPuter
lastUpdated: '2026-03-19'
licenses:
- MIT
rtos: freertos
libraries:
- lwip
topics:
- ai-chat
- arduino
- cardputer
- desktop-pet
- esp32
- esp32-s3
- m5stack
- openclaw
- pixel-art
- weather
isShow: true
image: /202604/clawputer.webp
createdAt: '2026-04-19T08:51:51+00:00'
updatedAt: '2026-04-19T08:51:51+00:00'
---

ClawPuter is a unique intersection of hardware, pixel art, and generative AI. Originally conceived as a physical manifestation for the OpenClaw AI project, it transforms the M5Stack Cardputer into a living desktop companion. The heart of the project is a pixel-art lobster that resides on the device's 240x135 IPS display, reacting to its environment and the user in real-time.

### The Lobster Companion

The lobster is governed by a state machine that drives various animations, including idling, sleeping, talking, and stretching. One of the more creative features is the "time-travel sky." By walking the lobster left or right using the Cardputer's keyboard, users can shift the background sky color and celestial bodies to visualize the past or future, while a real-time NTP clock remains anchored at the bottom to provide the actual time.

Interaction is deepened through a moisture system. This virtual hydration mechanic is directly influenced by real-world weather data fetched from the Open-Meteo API. Humidity affects the decay speed of the lobster's moisture levels; for example, rain or high humidity pauses decay, while walking or dry climates accelerate it. This creates a virtual pet dynamic where users must "spray" the lobster to restore its health, preventing dehydration effects like slowed movement or locked chat features.

### AI Integration and Voice Capabilities

ClawPuter connects to an OpenClaw Gateway over a local network, enabling sophisticated AI interactions. It supports streaming responses using Server-Sent Events (SSE), allowing text to appear token-by-token with accompanying typing sound effects. The system is compatible with reasoning models like Claude and GPT, automatically filtering "thinking" content and displaying a status indicator during the model's reasoning phase.

Beyond text, the project includes several advanced multimedia features:
- **Pixel Art Generation**: Users can issue commands like `/draw` to generate 8x8 or 16x16 pixel art. The AI returns hex-encoded data that the Cardputer renders as a high-resolution color grid inline with chat messages.
- **Voice Input**: Using a push-to-talk system via the Fn key, the device records audio, encodes it, and sends it to a local Python proxy. This proxy relays the data to the Groq Whisper API for transcription.
- **TTS Voice Replies**: AI responses are spoken through the Cardputer's built-in speaker. A notable technical detail is the automatic switching of GPIO 43, which is shared between the microphone and the speaker.

### Desktop Synchronization and Ecosystem

The project extends beyond the handheld device with a dedicated macOS companion app written in Swift. Using UDP broadcasts at 5Hz, the Cardputer syncs its state, position, and weather data with a transparent desktop pet on the Mac. This allows for bidirectional control; users can trigger animations, send text, or forward system notifications from their Mac to the Cardputer screen.

### Technical Architecture

Built on the ESP32-S3 using the Arduino framework and FreeRTOS, ClawPuter is designed for resilience. It features a dual-WiFi system that automatically falls back to a secondary network, such as a phone hotspot, if the primary connection fails. A runtime setup wizard allows users to configure WiFi credentials and API tokens directly on the device, stored in Non-Volatile Storage (NVS) to persist across reboots. The project also includes a weather simulation mode, allowing developers to preview all eight supported weather types and their associated background effects and character accessories.
