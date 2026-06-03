---
title: LiveKit ESP32 SDK
summary: An ESP-IDF based SDK for integrating ESP32-S3 and ESP32-P4 devices with the
  LiveKit real-time communication platform. It provides bidirectional audio with Opus
  encoding, H.264 video publishing, and support for AI agents and remote method calls.
slug: livekit-esp32-sdk
codeUrl: https://github.com/livekit/client-sdk-esp32
siteUrl: https://livekit.github.io/client-sdk-esp32/
star: 78
version: v0.3.4
lastUpdated: '2025-12-17'
rtos: freertos
libraries:
- lwip
topics:
- agents
- c
- embedded
- esp32
- real-time
- webrtc
isShow: false
createdAt: '2026-01-12'
updatedAt: '2026-01-12'
relatedProjects:
- onesdk-a-unified-ai-access-sdk-for-the-client-side
- elatoai-realtime-voice-ai-on-esp32
- openrouter-esp-idf-client
- ameba-freertos-pro2-sdk
- golioth-zephyr-sdk
- esp32-rtspserver
---

The LiveKit ESP32 SDK allows developers to bring high-quality real-time communication to embedded hardware. By leveraging the power of the LiveKit platform, ESP32-based devices can participate in video calls, stream audio, and interact with AI agents. This SDK is designed specifically for the ESP-IDF environment, targeting modern chips like the ESP32-S3 and ESP32-P4.

## Core Capabilities

The SDK handles the complexities of media encoding and network synchronization, allowing developers to focus on application logic. Key features include:

- **Bidirectional Audio**: Support for Opus encoding and decoding, including Acoustic Echo Cancellation (AEC) to ensure clear voice communication.
- **Video Publishing**: Hardware-accelerated H.264 encoding for streaming video from the device to the LiveKit room.
- **AI Agent Integration**: Seamless interaction with cloud-based AI agents built with the LiveKit Agents framework.
- **Real-time Data**: Support for low-latency data packets and Remote Method Calls (RPC), enabling complex interactions between the device and other participants.

## Technical Architecture

The SDK follows a modular approach to media management. Instead of forcing a specific hardware configuration, it puts the application in control of the media pipeline. Developers configure a "capturer" for input (using the `esp_capture` component) and a "renderer" for output (using the `av_render` component). This architecture provides the flexibility to use various I2S audio interfaces, MIPI CSI or DVI cameras, and LCD displays supported by the `esp_lcd` driver.

## Getting Started

To use LiveKit in an ESP-IDF project, the system must be initialized early in the application lifecycle. The SDK provides a straightforward API for managing room connections and media tracks.

```c
#include "livekit.h"

void app_main(void)
{
    // Initialize the LiveKit system
    livekit_system_init();
    
    // Configure room options and media tracks
    livekit_room_handle_t room_handle = NULL;
    livekit_room_options_t room_options = {
        .publish = {
            .kind = LIVEKIT_MEDIA_TYPE_AUDIO,
            .audio_encode = {
                .codec = LIVEKIT_AUDIO_CODEC_OPUS,
                .sample_rate = 16000,
                .channel_count = 1
            },
            .capturer = my_capturer_handle
        },
        .on_state_changed = my_connection_callback
    };

    if (livekit_room_create(&room_handle, &room_options) == LIVEKIT_ERR_NONE) {
        livekit_room_connect(room_handle, "wss://your-livekit-server.com", "your-token");
    }
}
```

## Real-time Interaction with RPC

One of the most powerful features for embedded developers is the Remote Method Call (RPC) system. This allows remote participants—such as a web-based dashboard or an AI agent—to invoke functions directly on the ESP32. For example, an AI agent can call a function to toggle a GPIO pin or read a sensor value, effectively turning the ESP32 into a voice-controlled physical interface.

```c
static void toggle_led(const livekit_rpc_invocation_t* invocation, void* ctx)
{
    gpio_set_level(LED_GPIO, !current_level);
    livekit_rpc_return_ok("LED Toggled");
}

// Register the handler on the room
livekit_room_rpc_register(room_handle, "toggle_led", toggle_led);
```

Currently in Developer Preview, this SDK provides a robust foundation for building multi-modal AI interfaces, live streaming devices, and IoT hardware that requires sophisticated real-time media capabilities.
