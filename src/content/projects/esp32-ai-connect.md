---
title: ESP32_AI_Connect
summary: An Arduino library for ESP32 microcontrollers that provides a unified interface
  to interact with major AI providers like OpenAI, Google Gemini, Anthropic Claude,
  and DeepSeek. It supports advanced features such as tool calling, real-time streaming
  responses, and connection resilience through auto-retry logic.
slug: esp32-ai-connect
codeUrl: https://github.com/AvantMaker/ESP32_AI_Connect
siteUrl: https://www.avantmaker.com
star: 18
version: v0.5.16
lastUpdated: '2025-12-15'
rtos: freertos
topics:
- ai
- aiot
- deepseek
- deepseek-api
- esp32
- esp32-arduino
- gemini
- gemini-api
- iot
- llm
- llm-api
- llm-api-integration
- openai
- openai-api
isShow: false
createdAt: '2026-01-31'
updatedAt: '2026-01-31'
relatedProjects:
- espai-unified-ai-api-client-for-esp32
- openrouter-esp-idf-client
- xiaomi-cybergear-arduino-library
- supladevice-library
- autonetwork-library
- blynk-async-esp32-bt-wf
---

## Overview

ESP32_AI_Connect is a powerful Arduino library designed to bridge the gap between ESP32 microcontrollers and the world's leading Large Language Models (LLMs). By providing a standardized interface, it allows developers to integrate sophisticated AI capabilities into IoT devices without needing to manage the specific API nuances of different providers. Whether you are building a voice assistant, an intelligent sensor node, or an automated controller, this library simplifies the process of sending prompts and receiving structured or streaming responses.

## Multi-Platform AI Integration

One of the standout features of ESP32_AI_Connect is its broad support for various AI ecosystems. Instead of writing separate code for different APIs, developers can use a single client to communicate with:

- **OpenAI**: GPT-4o, GPT-4o-mini, and other models.
- **Google Gemini**: Gemini 1.5 Flash, Pro, and more.
- **Anthropic Claude**: Claude 3.5 Sonnet, Opus, etc.
- **DeepSeek**: DeepSeek-Chat and related models.
- **OpenAI-Compatible Platforms**: Support for HuggingFace, OpenRouter, and Qwen by providing custom endpoints.

## Advanced Capabilities for Embedded Systems

Beyond simple text generation, the library includes features specifically optimized for the constraints and requirements of embedded hardware:

### Tool Calling (Function Calling)
Tool calls enable a two-way interaction where the AI model can request specific actions from the ESP32. This allows the AI to effectively "control" the hardware—for example, asking the device to read a DHT22 sensor or toggle a GPIO pin—by returning structured JSON that the library helps parse and process.

### Real-Time Streaming
For applications requiring immediate feedback, the library supports streaming chat. This feature delivers responses word-by-word as they are generated. To ensure reliability, the streaming implementation is built on FreeRTOS primitives, providing thread-safe operations and allowing users to interrupt the AI response if needed.

### Connection Resilience
IoT deployments often face intermittent network issues. ESP32_AI_Connect includes an optional auto-retry mechanism with exponential backoff. It performs WiFi health checks before requests and can automatically refresh stale connections, making it suitable for long-running home automation projects.

## Technical Implementation

The library is designed with memory efficiency in mind, utilizing shared JSON buffers via the ArduinoJson library to minimize heap fragmentation. It offers a modular configuration file (`ESP32_AI_Connect_config.h`) where developers can enable or disable specific AI platforms and features to save flash memory and RAM.

### Basic Usage Example

Integrating the library into an existing project is straightforward. Below is a basic example of initializing a client and sending a prompt:

```cpp
#include <ESP32_AI_Connect.h>
#include <WiFi.h>

const char* apiKey = "your_API_KEY";
ESP32_AI_Connect aiClient("openai", apiKey, "gpt-4o-mini");

void setup() {
  Serial.begin(115200);
  WiFi.begin("SSID", "PASSWORD");
  
  // Configure AI parameters
  aiClient.setChatTemperature(0.7);
  aiClient.setChatMaxTokens(200);

  // Send a message
  String response = aiClient.chat("Hello! How can you help me today?");
  Serial.println(response);
}

void loop() {}
```

## Getting Started

ESP32_AI_Connect is available through the Arduino Library Manager. It requires the **ArduinoJson** library (version 7.0.0 or higher) as a dependency. Detailed documentation, including guides for tool calling and streaming implementation, can be found in the project's documentation folder, providing step-by-step instructions for building sophisticated AI-powered embedded applications.
