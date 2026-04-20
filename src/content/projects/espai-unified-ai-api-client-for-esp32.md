---
title: 'ESPAI: Unified AI API Client for ESP32'
summary: ESPAI is a lightweight C++17 library for ESP32 microcontrollers that provides
  a unified interface for interacting with major AI providers including OpenAI, Anthropic,
  Google Gemini, and local Ollama instances. It features non-blocking asynchronous
  requests via FreeRTOS, real-time streaming responses, and built-in conversation
  history management with automatic pruning. The library is optimized for constrained
  environments, offering secure TLS verification and a modular architecture for building
  intelligent IoT devices.
slug: espai-unified-ai-api-client-for-esp32
codeUrl: https://github.com/enkei0x/espai
version: v0.9.0
lastUpdated: '2026-02-23'
licenses:
- MIT
rtos: freertos
topics:
- ai
- anthropic
- arduino
- arduino-library
- chatgpt
- claude
- embedded
- esp32
- esp32-arduino
- function-calling
- gemini
- iot
- llm
- ollama
- openai
- platformio
- streaming
isShow: false
createdAt: '2026-04-20T08:25:49+00:00'
updatedAt: '2026-04-20T08:25:49+00:00'
---

## Integrating Modern AI into Embedded Systems

Bringing the power of Large Language Models (LLMs) to the edge has traditionally been a complex task for embedded developers. Managing various API schemas, handling secure HTTPS connections, and maintaining conversation context within the limited memory of a microcontroller often requires significant boilerplate code. ESPAI simplifies this process by providing a unified, lightweight C++17 client specifically designed for the ESP32 family, including the S2, S3, and C3 variants.

By abstracting the differences between providers like OpenAI, Anthropic (Claude), Google Gemini, and local Ollama instances, ESPAI allows developers to write code once and switch backends with minimal changes. This flexibility is crucial for building resilient IoT devices that can failover between cloud providers or transition to local processing for privacy and offline functionality.

## Core Capabilities and Architecture

ESPAI is built on a layered architecture that separates the transport layer from the provider logic. It leverages the ESP32's native networking capabilities while providing high-level abstractions for complex AI workflows. 

### Multi-Provider Support

The library supports a wide array of backends through a single interface. Whether you are using GPT-4o, Claude 3.5 Sonnet, or a local Llama 3 model running on an Ollama server, the interaction remains consistent. It even supports OpenAI-compatible endpoints, making it compatible with services like Groq, DeepSeek, and Together AI.

### Asynchronous and Streaming Operations

One of the standout features of ESPAI is its integration with FreeRTOS to provide non-blocking asynchronous requests. In an embedded environment, blocking the main loop for several seconds while waiting for an AI response can break critical tasks like sensor polling or display updates. ESPAI's `chatAsync` allows the system to remain responsive, using callbacks or polling to handle results when they arrive.

Furthermore, for applications requiring low latency—such as voice assistants—ESPAI supports real-time streaming via Server-Sent Events (SSE). This allows the device to process and display response tokens as they are generated, rather than waiting for the entire completion.

### Intelligent Tool Calling

ESPAI enables "agentic" workflows through a unified tool-calling schema. You can define local C++ functions (like `get_temperature` or `toggle_led`) and register them with the AI client. The model can then decide to call these functions based on user input, enabling the AI to interact directly with the physical world through the ESP32's GPIOs and sensors.

## Efficient Memory Management

Developing for microcontrollers requires strict attention to RAM. ESPAI is optimized for these constraints, with provider instances consuming only around 200 bytes of RAM. While SSL connections typically require a one-time overhead of approximately 40 KB, the library provides options to disable unused providers at compile-time to save flash space. Developers can also use streaming to reduce peak memory usage, avoiding the need to buffer long responses in their entirety.

## Getting Started with ESPAI

The library is designed to be intuitive for anyone familiar with the Arduino ecosystem. After connecting to WiFi, a basic chat request can be implemented in just a few lines:

```cpp
#include <WiFi.h>
#include <ESPAI.h>

using namespace ESPAI;

OpenAIProvider openai("sk-your-api-key");

void setup() {
    Serial.begin(115200);
    WiFi.begin("SSID", "PASS");

    // Prepare a simple message
    std::vector<Message> messages = { Message(Role::User, "What is the ESP32?") };

    // Send the request
    Response response = openai.chat(messages, ChatOptions());

    if (response.success) {
        Serial.println(response.content);
    }
}
```

For more advanced use cases, the library includes a `Conversation` class that manages history, handles system prompts, and automatically prunes old messages to stay within token limits. This makes it easy to build stateful chatbots that remember previous interactions without manually managing the message buffer.

## Reliability and Security

Security is a first-class citizen in ESPAI. The library includes embedded root CA certificates to ensure proper TLS verification out of the box, protecting API keys and data in transit. Additionally, with over 450 unit tests, the codebase is designed for production reliability, ensuring that refactors and updates maintain the stability required for deployed IoT hardware.
