---
title: Owl - Always-on Wearable AI
summary: An open-source platform for always-on wearable AI that captures and processes
  life experiences using LLMs. It supports custom hardware like the ESP32S3 and Sony
  Spresense alongside consumer devices like the Apple Watch, providing a full stack
  from firmware to mobile interfaces.
slug: owl-always-on-wearable-ai
codeUrl: https://github.com/OwlAIProject/Owl
star: 629
lastUpdated: '2024-03-17'
rtos: freertos
libraries:
- sqlite
topics:
- ai
- ble
- bluetooth
- esp32
- llama2
- mistral
- nrf52840
- ollama
- wearable
- whisper
isShow: true
image: /202602/owl.webp
createdAt: '2026-03-01'
updatedAt: '2026-03-01'
---

## Overview

Owl is an ambitious open-source project exploring the frontier of human-computer interaction through always-on wearable AI. The project aims to create a system that observes and listens to a user's daily life, leveraging Large Language Models (LLMs) and Vision Language Models (VLMs) to provide memory augmentation, proactive life assistance, and distributed knowledge gathering. By combining low-power wearable hardware with sophisticated AI backends, Owl creates a continuous stream of context that can be used to summarize conversations, track locations, and eventually process visual data.

## Hardware Ecosystem

The project supports a diverse range of capture devices, catering to both DIY developers and users of consumer hardware. 

### The "Bee" Reference Device
Owl recently introduced "Bee," a custom reference hardware device designed specifically for AI wearables. Bee is a compact, 1.2-inch diameter wearable featuring an impressive fifty-hour battery life, designed to be worn throughout the day to provide constant context to a personal AI assistant.

### Development Boards and Consumer Gear
Beyond the Bee, Owl provides firmware and setup instructions for several other platforms:
- **XIAO ESP32S3 Sense**: A popular ESP32-based development board used for streaming audio via Bluetooth Low Energy (BLE).
- **Sony Spresense**: Utilized for its LTE-M capabilities, allowing for wide-area connectivity.
- **Apple Watch**: A consumer-grade option that supports both real-time streaming and "spooled" audio uploads, where data is recorded locally and uploaded when a connection is available.

## Technical Architecture

The Owl system is divided into three primary components: the capture device, the AI server, and the presentation client.

### Data Capture and Streaming
For devices like the ESP32S3, audio is captured at 16 KHz and encoded to AAC to minimize power consumption during transmission. These packets are broadcast via BLE to an iOS gateway. In contrast, the Apple Watch implementation can store raw PCM data locally, uploading chunks of audio asynchronously to the server. This dual approach allows Owl to function in both high-connectivity environments and network-constrained scenarios.

### The AI Server
The backend is a Python-based FastAPI application that manages the heavy lifting of AI inference. It supports a flexible range of models:
- **Local Inference**: Integration with Ollama allows users to run models entirely on their own hardware.
- **Cloud Services**: Support for GPT-4, Deepgram (for transcription), and Whisper.
- **Conversation Processing**: The server utilizes Voice Activity Detection (VAD) and speaker verification to segment audio into distinct conversations, which are then transcribed, summarized, and stored in a database (managed via SQLModel and SQLite).

### Presentation Clients
Users interact with their captured data through native iOS and web interfaces. These clients provide real-time notifications when a conversation has been processed, displaying transcripts, summaries, and location data. The iOS app also serves as a bridge for BLE-based wearables, forwarding audio data to the server in real-time.

## Privacy and Security

Given the sensitive nature of an "always-on" microphone, Owl emphasizes transparency and user control. The project encourages hosting personal servers to keep data within the user's own infrastructure. It provides detailed guides for setting up secure connections using HTTPS and reverse proxies like ngrok to ensure that audio data and transcripts remain encrypted during transit.
