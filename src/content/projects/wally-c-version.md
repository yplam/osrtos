---
title: Wally (C++ Version)
summary: Wally is a bilingual voice-powered AI companion built on the ESP32 platform
  using the ESP-IDF framework. It features offline voice wake-up, real-time LLM-driven
  conversations via the XiaoZhi platform, and visual feedback through an LVGL-powered
  OLED display.
slug: wally-c-version
codeUrl: https://github.com/JLW-7/Wally
star: 114
lastUpdated: '2026-01-07'
rtos: freertos
libraries:
- lvgl
topics:
- bambu-lab
- c
- chatbot
- cosyvoice
- cplusplus
- cute
- esp-idf
- esp32
- penguin
- python
- unihiker
- voice-assistant
- wally
- xiaozhi-esp32
isShow: true
image: /202601/wally-in-use.webp
createdAt: '2026-01-12'
updatedAt: '2026-01-12'
relatedProjects:
- xiaozhi-ai-desk-buddy-esp32-s3
- esp32-voice-assistant
- diy-ai-voice-assistant-for-esp32-s3
- xiaozhi-ai-chatbot
- starmoon-open-source-conversational-ai-device
- kalo-esp32-voice-chat-ai-friends
---

## Overview

Wally is a warm and reliable voice assistant designed in the shape of a penguin. More than just a decorative object, Wally serves as a bilingual AI companion capable of handling reminders, productivity tasks, and emotional support through natural conversation. Built on the ESP32 microcontroller, Wally integrates advanced voice recognition and large language model (LLM) capabilities to provide a seamless interactive experience.

## Technical Architecture

The project is built using the **ESP-IDF** (Espressif IoT Development Framework), which runs on **FreeRTOS**. This foundation allows for efficient task management, handling concurrent operations like voice streaming, display updates, and network communication. 

Wally leverages the **XiaoZhi** intelligent assistant platform for its backend logic. This enables the device to access powerful LLMs such as Qwen and DeepSeek for real-time streaming responses. The firmware is optimized for the ESP32-S3, taking advantage of its hardware acceleration for AI and signal processing.

### Key Features

- **Voice Wake-Up**: Utilizing the **ESP-SR** (Espressif Speech Recognition) engine, Wally supports offline wake-word detection. Users can trigger the device by saying "Hi, Wally" or "Hi Wall-E."
- **Bilingual Interaction**: The system is designed for fluent voice chat in both English and Mandarin, making it a versatile tool for multi-lingual environments.
- **Visual Feedback**: An integrated OLED display provides real-time visualization of replies. Using the **LVGL** (Light and Versatile Graphics Library), the project displays various emojis and text to enhance the interaction and provide emotional context to the AI's responses.
- **Custom Hardware**: The physical shell was designed in Tinkercad and 3D printed, housing a custom internal structure that includes the ESP32 board, battery, and audio components.

## Hardware and Build Configuration

The project configuration is managed through standard ESP-IDF files. The `sdkconfig.defaults` and `sdkconfig.defaults.esp32s3` files reveal a sophisticated setup:
- **Memory Management**: Extensive use of SPIRAM (Octal 80MHz) to handle the memory-intensive requirements of voice processing and LLM streaming.
- **Display Optimization**: LVGL is configured with compressed font support and placeholder features to save flash space while maintaining a high-quality UI.
- **Audio Handling**: The system uses I2S for audio output and includes specific configurations to prevent FIFO overflows during high-speed data transmission.

## Getting Started

Wally includes a built-in network configuration mode. By entering a specific button combination on the internal board, the device enters an Access Point (AP) mode named "Xiaozhi." Users can connect via a smartphone to a web-based configuration page to input Wi-Fi credentials. Once connected, Wally communicates with the XiaoZhi cloud to process voice commands and generate synthesized speech via engines like Volcano Engine or CosyVoice.
