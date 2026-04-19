---
title: 'XiaoClaw: AI Voice Assistant with Local Agent Brain'
summary: XiaoClaw is an integrated firmware for the ESP32-S3 that combines voice interaction
  with a local AI agent. It utilizes the ESP-IDF framework and FreeRTOS to provide
  a complete system for voice I/O, LLM-powered reasoning, tool calling, and autonomous
  task execution.
slug: xiaoclaw-ai-voice-assistant-with-local-agent-brain
codeUrl: https://github.com/beancookie/xiaoclaw
siteUrl: https://beancookie.github.io/xiaoclaw/
lastUpdated: '2026-04-18'
licenses:
- MIT
rtos: freertos
libraries:
- lvgl
- spiffs
- lwip
topics:
- assistant
- chatbot
- edge-ai-agents
- embedded
- esp32
- idf-esp
- openclaw
- own-your-data
- personal
- xiaozhi-esp32
isShow: true
image: /202604/5883-02.webp
createdAt: '2026-04-19T08:49:01+00:00'
updatedAt: '2026-04-19T08:49:01+00:00'
---

XiaoClaw represents a significant step forward in bringing sophisticated artificial intelligence to the edge. Designed specifically for the ESP32-S3, it transforms a standard microcontroller into a unified voice assistant capable of not just responding to queries, but reasoning through complex tasks using a local agent brain. By combining the voice interaction capabilities of the `xiaozhi-esp32` framework with the `mimiclaw` agent engine, XiaoClaw creates a seamless bridge between human speech and LLM-driven execution.

## A Dual-Layer Architecture

The project is structured around two primary functional layers connected by a dedicated bridge. The **Voice I/O Layer** handles the "senses" of the device: offline wake word detection via ESP-SR, streaming audio for Automatic Speech Recognition (ASR), and Text-to-Speech (TTS) playback. It supports various audio codecs like OPUS and manages visual feedback through OLED or LCD displays.

The **Agent Brain Layer** serves as the cognitive core. This is where the Large Language Model (LLM) integration happens, supporting providers like Anthropic Claude and OpenAI GPT. Unlike simple voice-to-text systems, this layer implements a modular ReAct agent loop. This allows the assistant to think, call tools, observe results, and refine its responses autonomously.

## Hardware and Performance

XiaoClaw is optimized for high-performance ESP32-S3 development boards. To handle the demands of audio processing and agent reasoning, the project recommends at least 16MB of Flash (32MB preferred) and 8MB of PSRAM. It boasts extensive hardware compatibility, supporting over 70 different boards including the ESP32-S3-BOX3, M5Stack CoreS3, and LILYGO T-Circle-S3.

The firmware is designed to be resource-efficient, utilizing a multi-tasking layout on FreeRTOS. Audio I/O and the application main loop run on Core 0, while the intensive LLM processing and agent logic are offloaded to Core 1, ensuring that voice interactions remain responsive even during complex reasoning tasks.

## The Agent's Toolbox

One of XiaoClaw's most powerful features is its extensive tool-calling system. The agent can interact with the physical and digital world through a variety of built-in tools:

*   **Hardware Control**: Directly read from or write to GPIO pins based on board-specific policies.
*   **Web Integration**: Perform web searches via Tavily or Brave to fetch real-time information.
*   **Automation**: Schedule tasks using a built-in cron scheduler.
*   **Model Context Protocol (MCP)**: Connect to remote MCP servers to dynamically discover and utilize new tools without reflashing the firmware.

## Scripting and Customization

For developers looking to add custom logic, XiaoClaw supports Lua scripting. Scripts stored on the SPIFFS partition can be executed by the agent to perform complex HTTP requests, process data, or interact with hardware. This makes it easy to integrate the assistant with external APIs or local home automation systems.

```lua
-- Example: A simple Lua script for the agent to use
local response, status = http_get("https://api.example.com/status")
print("System Status:", status)
return response
```

## Advanced Memory and Session Management

XiaoClaw treats memory as a first-class citizen. It uses a plain-text SPIFFS-based system for long-term memory and personality definitions. The session management system is particularly robust, featuring cursor-based history tracking and automatic history compression (consolidation). When a conversation becomes too long, older messages are archived to preserve memory while maintaining the context necessary for the LLM to function effectively. This ensures the assistant maintains a consistent "soul" and remembers user preferences over time.
