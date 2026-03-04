---
title: 'Starmoon: Open-Source Conversational AI Device'
summary: A compact, open-source AI-enabled device powered by the ESP32-S3 for real-time
  voice interaction. It features voice-enabled emotional intelligence, custom AI characters,
  and a self-hostable backend architecture using FastAPI and Docker.
slug: starmoon-open-source-conversational-ai-device
codeUrl: https://github.com/StarmoonAI/Starmoon
siteUrl: https://www.starmoon.app/
star: 544
lastUpdated: '2025-02-25'
rtos: freertos
topics:
- esp32
- gpt
- iot
- llm
- openai
- robotics
- stt
- tts
- voice-assistant
isShow: true
image: /202603/starmoon.webp
createdAt: '2026-03-04'
updatedAt: '2026-03-04'
---

## Overview

Starmoon represents a shift in how we interact with artificial intelligence, moving away from screen-dominated interfaces toward a more natural, voice-centric experience. It is a compact, wearable or desktop-ready device designed to understand emotions and provide supportive, personalized conversations. By leveraging the ESP32-S3 microcontroller and modern AI models, Starmoon offers a cost-effective entry point into the world of hardware-based AI companions.

## Hardware Architecture

The heart of the Starmoon device is the Seeed Studio XIAO ESP32S3, though it is compatible with standard ESP32-S3 development boards. The hardware design focuses on high-quality audio capture and playback, utilizing the INMP441 MEMS microphone for input and the MAX98357A I2S amplifier paired with a 3525 micro-speaker for output. This I2S-based audio pipeline ensures clear voice communication. The physical interface is kept minimal to reduce screen time, featuring an RGB LED for status indication and a single button for interaction.

## Software and AI Integration

The project is divided into three primary components: firmware, backend, and frontend. 

- **Firmware**: Developed using the Arduino framework within the PlatformIO ecosystem, the firmware manages I2S audio streaming, WiFi connectivity, and hardware peripherals. It is designed to run on the ESP32-S3, utilizing its native I2S capabilities for low-latency audio processing.
- **Backend**: A robust Python-based stack using FastAPI for the core API, Celery for task processing, and Redis for messaging. It handles the heavy lifting of processing voice data, performing emotional analysis, and interfacing with Large Language Models (LLMs).
- **Frontend**: A React-based dashboard that allows users to customize AI characters and view "Trends" – insights into the emotional tone of their conversations over time.

## Emotional Intelligence and Privacy

One of Starmoon's standout features is its focus on emotional intelligence. Rather than just processing commands, the system is designed to analyze the user's emotional state in real-time, offering empathetic responses. Because the project is fully open-source, users have the option to deploy the entire stack locally. This self-hosting capability ensures that sensitive conversational data remains private and under the user's control.

## Customization and Roadmap

Users can define custom AI characters through the web interface, tailoring the companion's personality to their needs, whether for learning assistance or emotional support. The project's roadmap includes ambitious features such as wake-word detection, audio interruption (allowing for more natural flow), local LLM integration, and long-term memory using MemGPT.

## Getting Started

To build a Starmoon device, developers need to flash the firmware using PlatformIO and set up the backend services, which are conveniently containerized using Docker. The hardware assembly requires basic soldering skills to connect the I2S components to the ESP32-S3 pins. Once powered on, the device creates a WiFi portal for initial configuration, where users can input their API keys and network credentials. The project provides a clear pin mapping for both the XIAO ESP32S3 and standard devkits to facilitate the DIY assembly process.
