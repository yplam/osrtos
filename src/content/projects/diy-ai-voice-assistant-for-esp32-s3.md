---
title: DIY AI Voice Assistant for ESP32-S3
summary: A free, DIY AI voice assistant built using the ESP32-S3 development board
  and HuggingFace Spaces. It integrates voice recording via I2S, cloud-based STT/LLM/TTS
  processing, and local audio playback using the Arduino framework. The project leverages
  PSRAM for efficient audio handling and features a TFT display for status updates.
slug: diy-ai-voice-assistant-for-esp32-s3
codeUrl: https://github.com/derdacavga/Esp32-Ai-Voice-Assistant
star: 34
lastUpdated: '2025-11-22'
rtos: freertos
libraries:
- littlefs
- spiffs
topics:
- ai
- chatgpt
- esp32
- gemini
- huggingface
- llm
- tts
isShow: false
createdAt: '2026-01-21'
updatedAt: '2026-01-21'
relatedProjects:
- esp32-voice-assistant
- kalo-esp32-voice-assistant
- opentoys
- bbtalkie
- nebaura-labs-mote
- starmoon-open-source-conversational-ai-device
---

## Overview

The DIY AI Voice Assistant project provides a complete blueprint for building a private, cost-effective voice assistant using the ESP32-S3 microcontroller. Unlike commercial alternatives that often require monthly subscriptions or paid API tokens, this system utilizes free tools and open-source models hosted on HuggingFace Spaces. The project bridges the gap between low-power embedded hardware and resource-intensive AI processing by offloading complex tasks like Speech-to-Text (STT), Large Language Model (LLM) inference, and Text-to-Speech (TTS) to a cloud-based Docker container.

## Hardware Architecture

The system is centered around the **ESP32-S3**, chosen specifically for its high performance and I2S capabilities. A critical requirement for this project is the presence of **8MB PSRAM**, which is used to buffer voice recordings before they are transmitted to the server. 

**Key hardware components include:**
- **Microphone:** An INMP441 I2S MEMS microphone for high-quality audio capture.
- **Audio Output:** A MAX98357A I2S Audio Amplifier paired with an 8-ohm speaker for clear voice responses.
- **Display:** An ST7789 TFT display provides visual feedback, indicating when the assistant is ready, recording, or processing.
- **User Input:** A simple tactile button acts as a push-to-talk trigger, simplifying the interaction model and avoiding the need for complex wake-word detection on the edge.

## Cloud-Based AI Processing

The "brain" of the assistant resides in a HuggingFace Space. By deploying a custom Docker container, the project creates a unified endpoint that handles the entire AI pipeline:
1. **STT (Speech-to-Text):** Converts the incoming audio stream from the ESP32 into text.
2. **LLM (Large Language Model):** Processes the text to generate a relevant and intelligent response.
3. **TTS (Text-to-Speech):** Converts the generated response back into an audio file.

This architecture allows the ESP32-S3 to remain responsive while the heavy lifting is performed by server-side hardware, all within the free tier of HuggingFace's infrastructure.

## Firmware and Software Logic

The firmware is developed using the Arduino framework, making it accessible to hobbyists and professional developers alike. The logic follows a streamlined cycle:
- **Recording:** When the button is held, the ESP32 captures audio via I2S and stores it in PSRAM.
- **Transmission:** Upon release, the audio data is sent via an HTTP POST request to the HuggingFace server.
- **Reception & Playback:** The server returns an audio file which the ESP32 downloads to its local filesystem (LittleFS or SPIFFS) and plays back through the I2S amplifier.

## Getting Started

Setting up the project involves two main phases: server deployment and firmware configuration. Users must create a HuggingFace Space using the provided `Dockerfile`, `app.py`, and `requirements.txt`. Once the server is running, the ESP32 firmware must be updated with the local WiFi credentials and the specific HuggingFace Space URL. 

Developers should ensure that the ESP32 board settings in the Arduino IDE have PSRAM enabled and a partition scheme that includes SPIFFS or LittleFS to accommodate the temporary storage of audio responses. This project serves as an excellent starting point for those looking to explore the intersection of IoT hardware and modern generative AI.
