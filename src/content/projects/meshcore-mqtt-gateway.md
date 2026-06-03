---
title: MeshCore MQTT Gateway
summary: A powerful gateway firmware that bridges MeshCore LoRa mesh networks with
  MQTT brokers, enabling bidirectional message flow between LoRa devices and MQTT-based
  applications. It features full repeater functionality, secure TLS connectivity,
  and an interactive serial configuration menu for ESP32-based LoRa hardware.
slug: meshcore-mqtt-gateway
codeUrl: https://github.com/jmead/Meshcore-Repeater-MQTT-Gateway
star: 24
version: v1.0.5
lastUpdated: '2025-11-20'
rtos: freertos
topics:
- meshcore
- mqtt
isShow: false
createdAt: '2026-01-23'
updatedAt: '2026-01-23'
relatedProjects:
- esp32-reticulum-network-stack-gateway-node
- losant-mqtt-mongoose-os-example
- esp32-mesh-control
- meshtnc
- mitsubishi-ecodan-air-to-water-bridge-for-cn105-to-mqtt
- losant-mqtt-example-for-mongoose-os
---

## Overview

The MeshCore MQTT Gateway is a specialized firmware designed to act as a bridge between LoRa-based mesh networks and the broader internet via the MQTT protocol. Developed for the ESP32 platform, it allows LoRa devices to communicate with cloud services, dashboards, and other MQTT-enabled applications while simultaneously serving as a repeater to extend the range of the local mesh network.

## Key Features

One of the standout features of this gateway is its robust configuration system. Unlike many embedded projects that require hardcoding credentials, this firmware provides an interactive serial menu. By connecting the device to a computer and pressing 'c', users can configure WiFi settings, MQTT broker details, LoRa radio parameters, and repeater logic in real-time. These settings are then persisted in the ESP32's Non-Volatile Storage (NVS), ensuring they survive reboots.

**Core capabilities include:**
- **Full MeshCore Repeater Functionality**: Acts as a mesh network repeater, extending network range.
- **MQTT Bridging**: Forwards LoRa mesh messages to an MQTT broker and vice versa.
- **Secure Connectivity**: Supports MQTT over TLS (port 8883) with NTP clock synchronization for certificate validation.
- **ISO-Coded Topic Hierarchy**: Uses a structured topic prefix system (e.g., MESHCORE/AU/NSW) for organized data routing.
- **Persistent Configuration**: Settings are stored in NVS, eliminating the need for hardcoded credentials.

## Hardware Compatibility

The project is built using the Arduino framework and PlatformIO, targeting a variety of ESP32-based LoRa development boards. Supported hardware includes:
- **LilyGo LoRa32 V2.1** (specifically the 1.6 version)
- **Heltec WiFi LoRa 32** (V2 and V3)
- **TTGO T-Beam** (SX1276)
- **Generic ESP32 devkits** paired with SX127x or SX126x radio modules

## Technical Implementation

The firmware leverages several high-performance libraries to manage its complex tasks. It uses `RadioLib` for flexible LoRa radio control, `PubSubClient` for MQTT communication, and `ArduinoJson` for handling structured data. For security, the gateway implements NTP to ensure accurate time for TLS handshakes and allows for custom CA certificate uploads via the serial interface.

The gateway organizes data into several MQTT topics:
- `{prefix}/raw`: Raw hex packets for debugging or custom processing.
- `{prefix}/messages`: Decoded JSON messages containing the sender, receiver, and payload.
- `{prefix}/adverts`: Node information including names and GPS coordinates.
- `{prefix}/gateway/{clientId}/stats`: Real-time performance metrics like uptime and packet counts.

## Getting Started

To deploy the gateway, developers can use PlatformIO to build and upload the firmware to their target ESP32 board. Once flashed, the device is configured through a serial monitor at 115200 baud. The interactive menu allows for the setup of WiFi credentials, MQTT broker addresses, and LoRa parameters (frequency, spreading factor, and bandwidth) specific to the user's region.

```cpp
// Example of how MeshCore is integrated into the gateway logic
void handleLoRaReceive() {
    if (MeshCore.available()) {
        uint8_t buffer[256];
        size_t length = MeshCore.receive(buffer, sizeof(buffer));
        int rssi = MeshCore.getLastRssi();
        float snr = MeshCore.getLastSnr();
        
        // Forward to MQTT handler
        handleLoRaPacket(buffer, length, rssi, snr);
    }
}
```

## Community and Integration

As part of the MeshCore ecosystem, this gateway is designed to work seamlessly with other MeshCore-compatible nodes. It supports remote commands via MQTT, allowing users to send messages back into the LoRa mesh or trigger gateway restarts remotely. The project is currently in beta, with an active roadmap including features like a web configuration interface, OTA updates, and message encryption.
