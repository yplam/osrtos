---
title: OpenToys
summary: OpenToys is an open-source framework for building local voice AI companions
  and robots using ESP32-S3 hardware and Apple Silicon for edge processing. It leverages
  Whisper ASR, Qwen3-TTS, and MLX-optimized LLMs to provide a fully offline, multilingual
  conversational experience without cloud dependencies. The project includes a desktop
  control application built with Tauri and React, alongside specialized Arduino-based
  firmware.
slug: opentoys
codeUrl: https://github.com/akdeb/open-toys
siteUrl: https://www.elatoai.com
version: v1.0.0
lastUpdated: '2026-04-02'
image: /202604/open-toys_3.avif
rtos: freertos
libraries:
- lwip
topics:
- arduino
- esp32
- mistral
- mlx
- qwen3-5
- qwen3-tts
- robots
- voice-cloning
- websockets
- whisper
isShow: true
createdAt: '2026-04-19T00:06:21+00:00'
updatedAt: '2026-04-19T00:06:21+00:00'
---

OpenToys is an open-source platform designed to bring high-performance, local voice AI to toys, companions, and robots. By shifting the computational heavy lifting to local Apple Silicon hardware, the project enables sophisticated conversational capabilities without the need for cloud subscriptions, data harvesting, or persistent internet connectivity. This approach ensures that user data stays on-device while providing a free, low-latency AI experience.

### Why OpenToys?

The project addresses several key concerns in the smart toy industry, primarily privacy and longevity. Because it is fully local, there is no risk of data leaving the home. It supports a wide array of languages and accents, including English, Chinese, Spanish, French, Japanese, and more. One of its standout features is voice cloning, allowing users to clone specific characters or personal voices with less than 10 seconds of audio. The system is highly customizable, allowing developers to build unique personalities using an ESP32-S3 microcontroller.

### App Design and User Experience

The OpenToys ecosystem revolves around a desktop application that manages the AI models and communicates with the hardware. The interface allows users to select different personalities, configure settings, and flash firmware directly to connected devices. 


Through the app, users can create "Cards & Stories"—experiences with distinct personalities that can tell stories, play games, or engage in educational dialogue. These personalities are defined in a structured JSON format, making it easy to expand the toy's repertoire of behaviors.

### Technical Stack

The architecture is split between a high-power host (Mac) and a low-power edge device (ESP32-S3). 

- **Speech-to-Text (STT):** Utilizes Whisper Turbo ASR for fast, accurate transcription.
- **Text-to-Speech (TTS):** Employs Qwen3-TTS and Chatterbox-turbo for natural-sounding voice synthesis.
- **Large Language Models (LLMs):** Supports various models from the `mlx-community` (such as Qwen3, Llama, and Mistral) optimized for Apple Silicon.
- **Frontend/Backend:** The desktop app is built with Tauri, React, and Rust, while the local AI backend utilizes a Python 3.11 runtime.
- **Firmware:** The ESP32-S3 firmware is developed using the Arduino framework, incorporating WebSockets for real-time communication and Opus encoding for efficient audio streaming.

### DIY Hardware and Firmware

The hardware component is based on the ESP32-S3, chosen for its built-in AI acceleration and robust connectivity. A typical setup includes an I2S microphone (INMP441), an I2S amplifier (MAX98357A), a speaker, and basic control elements like LEDs and buttons.


Key pin connections for the standard setup involve GPIO 14, 4, and 1 for the microphone (Data, Word Select, and Clock) and GPIO 5, 6, and 7 for the speaker. The firmware manages several critical tasks: 
- **Networking:** Includes a WiFi captive portal named `ELATO` for easy network configuration.
- **Storage:** Uses Non-Volatile Storage (NVS) to persist WiFi credentials and authentication tokens.
- **Visual Feedback:** A multi-color LED system communicates the device state, such as listening (yellow), speaking (blue), or processing (red).

### Flashing and Setup

OpenToys simplifies the deployment process by bundling firmware images directly within the desktop app. Users can connect their ESP32-S3 to their Mac and initiate the flash process via the settings menu. Once flashed, the device creates a soft AP for setup. After the initial configuration, the toy automatically reconnects to the local network to communicate with the OpenToys desktop server.

### Safety and Limitations

While OpenToys prioritizes privacy, it acknowledges the inherent limitations of current AI technology. Users should be aware of potential hallucinations where the LLM provides incorrect information. The project is intended as a tool for exploration and education, and parental supervision is recommended when used by children to ensure appropriate interactions.
