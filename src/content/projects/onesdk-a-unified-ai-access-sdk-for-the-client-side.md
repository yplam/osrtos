---
title: 'OneSDK: A Unified AI Access SDK for the Client-side'
summary: An integrated development kit for deploying Large Language Model (LLM) capabilities
  like voice agents and text chat on client-side and embedded platforms. It supports
  device management via MQTT and runs on systems including ESP32, FreeRTOS, Linux,
  and Windows.
slug: onesdk-a-unified-ai-access-sdk-for-the-client-side
codeUrl: https://github.com/volcengine/onesdk
star: 13
lastUpdated: '2025-09-10'
rtos: freertos
libraries:
- warmcat-libwebsockets
topics:
- ai-agents
- edge-computing
- embedded-systems
- esp32
- iot
- llm
- mcp
- mqtt
- websockets
isShow: false
createdAt: '2026-01-30'
updatedAt: '2026-01-30'
relatedProjects:
- livekit-esp32-sdk
- espai-unified-ai-api-client-for-esp32
- kendryte-k210-freertos-sdk
- openrouter-esp-idf-client
- elatoai-realtime-voice-ai-on-esp32
- xiaoclaw-ai-voice-assistant-with-local-agent-brain
---

OneSDK is a comprehensive integrated development kit designed to bring advanced AI capabilities to client-side and embedded devices. Developed by Volcengine, it provides a unified interface for accessing Large Language Models (LLMs), enabling features like real-time voice conversations, streaming text chats, and intelligent agents directly on edge hardware.

## Core Architecture and Protocol Support

The SDK is built with portability and efficiency in mind, utilizing `libwebsockets` as its foundational layer to implement a variety of essential protocols. This allows the SDK to handle HTTP, WebSocket, and MQTT communication seamlessly. By abstracting these protocols, OneSDK enables developers to focus on AI logic rather than low-level networking. 

OneSDK is designed to be cross-platform, supporting a wide range of environments from resource-constrained microcontrollers to general-purpose operating systems:
- **Embedded Platforms**: Espressif ESP32, FreeRTOS, and uc-OS2.
- **General Platforms**: Linux (amd64/arm64), macOS (Intel/Apple Silicon), and Windows (x64/x86).

## Key Features

### Device Intelligence
OneSDK provides robust support for modern AI interactions:
- **Text Chat**: Supports both streaming and non-streaming large model text interactions.
- **Image Generation**: Includes capabilities for image recognition and text-to-image generation.
- **Voice Chat Agents**: Integrates with Realtime (WebSocket) APIs to support low-latency voice-driven intelligent agents.

### Device Operations and Management
Beyond AI, the SDK includes a full suite of IoT management tools:
- **OTA Upgrades**: Supports both full package and differential package updates to minimize bandwidth usage.
- **Device Management**: Allows developers to monitor token quotas and cloud console interactions.
- **Remote Access**: Includes support for SSH connections from the console and centralized logging for device operation monitoring.

### Security
Security is a primary focus, with support for device-side identity authentication using "one key per device" or "one key per product type" schemes, alongside support for device certificates.

## Technical Implementation

The project uses a CMake-based build system (requiring version 3.10 to 3.26.x) to manage its modular components. The build configuration allows developers to toggle specific features like AI functionality, IoT support, or real-time capabilities depending on the target hardware's constraints. For example, on ESP32, the SDK integrates as an ESP-IDF component, requiring standard system libraries like `nvs_flash`, `esp_wifi`, and `mbedtls`.

## Getting Started

For developers on Linux or macOS, the build process is streamlined via a `build.sh` script. Windows developers are provided with both `build.bat` and `build.ps1` scripts, supporting both Visual Studio (MSVC) and MinGW-w64 toolchains. 

```cmd
# Quick Windows Build Example
git clone --recursive https://github.com/volcengine/onesdk.git
cd onesdk
build.bat
```

The repository also includes various examples in the `examples/` directory, covering chatbot implementations, function calling, and real-time WebSocket clients, providing a clear starting point for integrating AI into embedded products.
