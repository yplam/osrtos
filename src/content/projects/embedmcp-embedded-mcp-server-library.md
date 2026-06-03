---
title: EmbedMCP - Embedded MCP Server Library
summary: A lightweight C99 library for creating Model Context Protocol (MCP) servers
  on resource-constrained embedded systems. It enables developers to transform existing
  C functions into AI-accessible tools with minimal code changes, supporting multiple
  transports and various RTOS environments like FreeRTOS and Zephyr.
slug: embedmcp-embedded-mcp-server-library
codeUrl: https://github.com/AaronWander/EmbedMCP
star: 15
lastUpdated: '2025-09-10'
rtos: freertos
topics:
- ai
- aiot
- embedded-c
- embedded-systems
- embeded-linux
- freertos
- mcp
- mcp-server
- raspberrypi3
- rtos
isShow: false
createdAt: '2026-01-13'
updatedAt: '2026-01-13'
relatedProjects:
- libwebsockets
- espai-unified-ai-api-client-for-esp32
- nanofish
- simpleftpserver-library
- jsonx-lightweight-embedded-json-serializer
- openrouter-esp-idf-client
---

## Overview

EmbedMCP is a lightweight C library designed to bridge the gap between traditional embedded C codebases and modern AI systems. By implementing the Model Context Protocol (MCP), it allows developers to expose their existing, battle-tested C functions as tools that AI models can discover and invoke. This is particularly useful for industrial IoT, robotics, and edge computing where local hardware control needs to be interfaced with Large Language Models (LLMs).

Built with a focus on efficiency and portability, EmbedMCP follows the C99 standard and maintains a zero-dependency architecture. It is designed to run on systems with as little as 64KB of RAM and 100KB of flash memory, making it suitable for a wide range of microcontrollers and real-time operating systems.

## Key Features

- **Simple Integration**: The library is designed for "copy-and-paste" integration. Developers can include a single header file and start registering functions immediately.
- **Universal HAL**: A platform abstraction layer allows the library to run on over 15 platforms, including popular RTOSs like FreeRTOS, Zephyr, ThreadX, and embOS, as well as standard Linux/POSIX environments.
- **Smart Memory Management**: The library handles the complexities of JSON parsing and parameter cleanup. It follows clear ownership rules, automatically freeing input parameters and dynamic arrays after function execution.
- **Multiple Transports**: Support for both Streamable HTTP (for concurrent web-based clients) and STDIO (for direct integration with tools like Claude Desktop).
- **Flexible Registration**: Provides "magic macros" for wrapping simple functions and manual registration for complex data structures and arrays.

## Technical Architecture

EmbedMCP is modularized into several components: protocol handling, transport layers, application logic, and a hardware abstraction layer (HAL). This modularity ensures that the core logic remains independent of the underlying communication medium or operating system.

### Function Registration

One of the library's strengths is its ability to wrap standard C functions into MCP-compliant tools. For simple arithmetic or status functions, a single macro can generate the necessary wrapper code:

```c
#include "embed_mcp/embed_mcp.h"

// A standard business function
double add_numbers(double a, double b) {
    return a + b;
}

// Generate a wrapper with a macro
EMBED_MCP_WRAPPER(add_wrapper, add_numbers, DOUBLE, DOUBLE, a, DOUBLE, b)

int main() {
    embed_mcp_config_t config = {
        .name = "MathServer",
        .version = "1.0.0",
        .port = 8080
    };

    embed_mcp_server_t *server = embed_mcp_create(&config);

    // Register the tool
    const char* names[] = {"a", "b"};
    const char* descs[] = {"First number", "Second number"};
    mcp_param_type_t types[] = {MCP_PARAM_DOUBLE, MCP_PARAM_DOUBLE};

    embed_mcp_add_tool(server, "add", "Add two numbers",
                       names, descs, types, 2, MCP_RETURN_DOUBLE, add_wrapper, NULL);

    embed_mcp_run(server, EMBED_MCP_TRANSPORT_STREAMABLE_HTTP);
    return 0;
}
```

## Platform Support

EmbedMCP is highly portable and supports a variety of environments:

- **RTOS**: FreeRTOS, Zephyr, ThreadX, embOS.
- **Microcontrollers (MCUs)**: STM32, ESP32, and Nordic nRF series.
- **Single Board Computers (SBCs)**: Raspberry Pi, BeagleBone, and Orange Pi.

## Use Cases

- **Industrial IoT**: Exposing sensor drivers directly to AI models for real-time data analysis and equipment monitoring.
- **Predictive Maintenance**: Allowing an AI to query machine state and historical data via standard C drivers to predict failures.
- **Robotics**: Interfacing high-level AI decision-making with low-level C-based motor control and pathfinding algorithms.
- **Smart Devices**: Enabling voice assistants or smart hubs to interact with local hardware features without complex middleware layers.
