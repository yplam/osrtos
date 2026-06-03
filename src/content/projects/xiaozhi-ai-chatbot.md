---
title: XiaoZhi AI Chatbot
summary: An open-source AI chatbot firmware for ESP32 microcontrollers that enables
  voice interaction using large language models like Qwen and DeepSeek. It features
  offline wake-up, streaming ASR/TTS, and utilizes the Model Context Protocol (MCP)
  for IoT device control and cloud-side capability expansion.
slug: xiaozhi-ai-chatbot
codeUrl: https://github.com/78/xiaozhi-esp32
siteUrl: https://xiaozhi.me
star: 22862
version: v2.1.0
lastUpdated: '2026-01-02'
rtos: freertos
libraries:
- lvgl
- lwip
topics:
- chatbot
- esp32
- mcp
isShow: true
image: /202601/sensecap_watcher.webp
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- xiaoclaw-ai-voice-assistant-with-local-agent-brain
- opentoys
- starmoon-open-source-conversational-ai-device
- wally-c-version
- diy-ai-voice-assistant-for-esp32-s3
- esp32-voice-assistant
---

## Overview

XiaoZhi is a sophisticated open-source AI chatbot project designed for the ESP32 platform. It serves as a voice interaction entry point, leveraging the power of large language models (LLMs) such as Qwen and DeepSeek to provide a conversational experience. Unlike simple voice assistants, XiaoZhi is built around the Model Context Protocol (MCP), allowing it to act as a bridge between AI intelligence and physical hardware control.

The project is highly versatile, supporting a wide range of ESP32 chips including the ESP32-C3, ESP32-S3, and the high-performance ESP32-P4. It is designed to be accessible to both beginners—who can use pre-compiled firmware—and advanced developers looking to customize the interaction flow or hardware integration.

## Key Features

XiaoZhi packs a comprehensive suite of features tailored for modern AI hardware:

- **Voice Interaction Stack**: Implements a streaming architecture combining Automatic Speech Recognition (ASR), Large Language Models (LLM), and Text-to-Speech (TTS) for low-latency conversations.
- **Offline Capabilities**: Utilizes Espressif's ESP-SR for offline voice wake-up and 3D Speaker for speaker recognition and identification.
- **Multi-Protocol Communication**: Supports both WebSocket and a hybrid MQTT+UDP protocol for robust data and audio transmission.
- **Audio Processing**: Uses the OPUS codec for high-quality, efficient audio streaming.
- **IoT Control via MCP**: Implements the Model Context Protocol on both the device side (for controlling LEDs, servos, and GPIOs) and the cloud side (for smart home integration and desktop operations).
- **Rich Visuals**: Supports OLED and LCD displays using the LVGL library to show emojis, battery status, and chat backgrounds.
- **Connectivity**: Compatible with standard Wi-Fi and ML307 Cat.1 4G modules for mobile applications.

## Technical Implementation

The project is built on the **ESP-IDF** (v5.4+) framework, utilizing **FreeRTOS** for task management. The firmware is optimized for memory efficiency, particularly for constrained devices like the ESP32-C3, by employing techniques such as compressed fonts and selective LVGL widget compilation. 

For audio, the system manages I2S interfaces for microphones and speakers, handling the complexities of full-duplex audio streaming. The integration of the MCP protocol is a standout feature, providing a standardized way for the LLM to call "tools" on the device, such as adjusting volume or querying sensor data.

## Hardware Support

XiaoZhi is compatible with over 70 open-source hardware designs. Notable supported platforms include:
- Espressif ESP32-S3-BOX3
- M5Stack CoreS3 and AtomS3R
- Waveshare ESP32-S3-Touch-AMOLED
- LILYGO T-Circle-S3
- Various DIY breadboard configurations using standard components like the INMP441 microphone and MAX98357A amplifier.

## Ecosystem and Development

The project is supported by a broad ecosystem, including multiple server-side implementations in Python, Java, and Go. This allows users to host their own backends or connect to the official XiaoZhi cloud service. Additionally, a web-based "Custom Assets Generator" allows developers to easily create and deploy custom wake words, fonts, and UI elements without deep-diving into the codebase.
