---
title: KALO ESP32 Voice Chat AI Friends
summary: A standalone ESP32-based voice assistant that enables natural conversations
  with multiple custom AI personalities. It integrates ElevenLabs for speech-to-text,
  GroqCloud or OpenAI for LLM processing, and OpenAI for text-to-speech, supporting
  real-time web searches and email archiving of chat history.
slug: kalo-esp32-voice-chat-ai-friends
codeUrl: https://github.com/kaloprojects/KALO-ESP32-Voice-Chat-AI-Friends
star: 40
lastUpdated: '2026-01-19'
rtos: freertos
topics:
- audio
- deepgram
- elevenlabs
- email
- esp32
- groq
- groq-api
- i2s
- i2s-audio
- inmp441
- max98357
- openai-chatgpt
- openai-tts
- recording
- sd-card
- smtp
- speechtotext
- stt
- texttospeech
- tts
isShow: true
image: /202601/kalo.webp
createdAt: '2026-01-24'
updatedAt: '2026-01-24'
relatedProjects:
- kalo-esp32-voice-assistant
- esp32-voice-assistant
- diy-ai-voice-assistant-for-esp32-s3
- nebaura-labs-mote
- starmoon-open-source-conversational-ai-device
- xiaoclaw-ai-voice-assistant-with-local-agent-brain
---

## Overview

The KALO ESP32 Voice Chat AI Friends project is a sophisticated embedded system that transforms an ESP32 microcontroller into a multi-lingual, voice-interactive AI companion. Building upon its predecessor, the KALO-ESP32-Voice-ChatGPT, this iteration introduces the concept of "AI Friends"—customizable chatbot personalities that users can summon by name. Each friend can be configured with unique system prompts and distinct text-to-speech (TTS) voices, allowing for a diverse range of interactions, from a helpful "good old friend" to an "annoyed guy" or a "vegan food specialist."

## Key Features & Capabilities

At its core, the system leverages a high-performance pipeline to minimize latency and maximize conversational fluidity. It utilizes the ElevenLabs Scribe API for rapid speech-to-text (STT) transcription, which is significantly faster than traditional methods, especially for longer sentences. For the "brain" of the device, it supports both OpenAI and GroqCloud API services. The integration of GroqCloud is a notable upgrade, offering approximately double the response speed of standard LLM providers by utilizing models like Meta's Llama 3.1.

One of the standout features is the "Live Information" request capability. By using the keyword "GOOGLE" during a conversation, the device can trigger a real-time web search via OpenAI's search-enabled models. This allows the AI to provide up-to-date information on weather, news, or election results, seamlessly integrating these facts into the ongoing chat history. Additionally, the project includes a feature to archive conversations by sending the complete chat history to a user's email via the ReadyMail library.

## Technical Implementation

The project is designed for hardware flexibility. While it can run on standard ESP32 modules with an SD card for storage, it is optimized for the ESP32-S3 with PSRAM. Using PSRAM allows for faster audio processing and eliminates the need for an external SD card. The audio path uses I2S digital microphones (like the INMP441) and I2S amplifiers (such as the MAX98357A) to ensure high-quality voice capture and playback.

The software architecture is implemented in native C++ within the Arduino environment, avoiding the need for intermediate servers, Python scripts, or complex websocket bridges. It handles the entire workflow locally: recording variable-length WAV files, managing API requests, and streaming high-quality TTS audio. Status is communicated to the user through a multi-color RGB LED, which indicates different states such as recording, transcribing, thinking, or speaking.

## Hardware & DIY Support

For developers and DIY enthusiasts, the project provides comprehensive support, including Gerber files for a custom PCB (the KALO AI Board). This hardware template simplifies the assembly of a portable AI assistant, making it accessible for those looking to build their own dedicated voice-chat device. The code supports various GPIO pin assignments by default, including configurations for the DFRobot FireBeetle 2 ESP32-S3.

## Getting Started

To deploy the project, users need to provide their own API keys for ElevenLabs (or Deepgram), OpenAI, and GroqCloud. The main sketch requires basic configuration of WiFi credentials and hardware pin assignments. The project is modular, with different functionalities split into separate `.ino` files (e.g., `lib_audio_recording.ino`, `lib_OpenAI_Chat.ino`) to facilitate customization of AI personalities and audio settings. 

Integration with the `ESP32-audioI2S` library is central to the project's audio capabilities, enabling the streaming of high-quality, human-like voices. For those using hardware without PSRAM, the project maintains a legacy library archive to ensure compatibility with older memory-constrained modules.
