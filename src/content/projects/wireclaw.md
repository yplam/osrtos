---
title: WireClaw
summary: An AI-powered automation agent for ESP32 microcontrollers that translates
  natural language commands into local, persistent hardware rules. It features a dual-loop
  architecture for cloud-independent execution and integrates with Telegram, NATS,
  and serial devices.
slug: wireclaw
codeUrl: https://github.com/M64GitHub/WireClaw
siteUrl: https://wireclaw.io
lastUpdated: '2026-02-23'
rtos: freertos
libraries:
- littlefs
topics:
- ai-agent
- arduino
- embedded
- esp32
- firmware
- gpio
- home-automation
- ionode
- iot
- llm
- nats
- openclaw
- platformio
- rules-engine
- sensors
- telegram
isShow: false
createdAt: '2026-04-17T02:25:08+00:00'
updatedAt: '2026-04-17T02:25:08+00:00'
---

WireClaw represents a fascinating shift in how we interact with embedded hardware. Instead of writing C++ code to toggle a GPIO pin or poll a sensor, WireClaw allows users to speak to their hardware in plain language. By deploying an AI agent directly onto a $5 ESP32 microcontroller, it bridges the gap between high-level intent and low-level execution, creating a system where the AI acts as the engineer and the microcontroller acts as the reliable executor.

### The Dual-Loop Architecture

The core of WireClaw’s reliability lies in its dual-loop design. It distinguishes between the "setup phase" and the "execution phase." 

1.  **The AI Loop**: This handles the heavy lifting of conversation. When you send a message via Telegram, Serial, or NATS, WireClaw communicates with a Large Language Model (LLM)—either a cloud-based one like Gemini via OpenRouter or a local instance like Ollama. The AI interprets your request and executes tool calls to configure the device. 
2.  **The Rule Loop**: Once the AI defines what needs to happen (e.g., "Turn on the fan if the temperature exceeds 30°C"), it creates a local rule. This rule is stored in the ESP32’s flash memory and runs continuously in the main loop. Critically, this loop requires no internet connection and no LLM calls. It is a deterministic, local automation engine that ensures your hardware reacts instantly to sensor changes even if the cloud goes down.

### Hardware and Connectivity

WireClaw is optimized for the modern ESP32 ecosystem, specifically supporting the ESP32-C6, ESP32-S3, and ESP32-C3. These chips provide the necessary processing power and memory (at least 4MB of flash is required) to handle the TLS stack for secure API communication and the local file system requirements.

The project leverages several communication channels to make the hardware accessible:
- **Telegram**: Users can chat with their devices from anywhere in the world, receiving alerts and sending commands.
- **NATS**: This enables a distributed mesh of devices. A WireClaw device can subscribe to subjects, treat incoming data as "virtual sensors," and even trigger actions on other devices across the network.
- **Serial Bridge**: It can act as a gateway for "dumber" hardware, such as Arduinos, GPS modules, or CO2 sensors, by interfacing over UART and treating their data as inputs for its rule engine.

### Practical Automation Examples

The power of WireClaw is best seen in its ability to handle complex logic through simple requests. Because it understands context, you can give it personality or preferences:

```text
You: "When the chip temperature goes above 28, set the LED orange. When it drops back down, set it cyan."
```

WireClaw translates this into a `rule_create` call with specific thresholds and actions. It also features persistent memory, meaning you can tell it your favorite color or the name of a specific room, and it will remember that information across reboots, injecting it into future AI conversations as system context.

### Technical Implementation

Built on the Arduino framework using PlatformIO, WireClaw makes extensive use of the ESP32's capabilities. It uses **LittleFS** for persistent storage of rules, configuration, and conversation history. Time synchronization is handled via NTP, allowing for scheduled rules (e.g., "Send me a report at 08:00"). 

The system is designed to be user-friendly from the start. It includes a web-based flasher and a built-in setup portal. If the device cannot find a WiFi network, it creates its own access point, allowing users to configure API keys and credentials directly from a mobile browser. 

WireClaw effectively turns a standard microcontroller into an agentic node in an IoT ecosystem, where the complexity of C++ programming is replaced by the flexibility of natural language, without sacrificing the reliability of local, edge-based execution.
