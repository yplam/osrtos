---
title: Seeed Home Assistant Discovery
summary: A comprehensive solution for connecting Seeed Studio XIAO development boards
  to Home Assistant using WiFi or Bluetooth Low Energy. It supports real-time bidirectional
  communication via WebSockets on ESP32 devices and ultra-low power sensor reporting
  via the BTHome v2 protocol on both ESP32 and nRF52840 platforms.
slug: seeed-home-assistant-discovery
codeUrl: https://github.com/limengdu/Seeed-Homeassistant-Discovery
siteUrl: https://limengdu.github.io/Seeed-Homeassistant-Discovery/
star: 175
version: firmware-2025.12.17-897645f
lastUpdated: '2025-12-17'
rtos: freertos
libraries:
- nimble
topics:
- arduino
- esp32
- home-assistant
- platformio
- seeedstudio
- seeeduino-xiao
- wifi
isShow: false
createdAt: '2026-01-12'
updatedAt: '2026-01-12'
relatedProjects:
- xiao-esp32c6-sketches
- seeed-studio-xiao-esp32-project-collection
- smart-iot-sensor-with-xiao-esp32c6
- supladevice-library
- micropython-smarthome-node-pysmartnode
- esphome-ikea-vindriktning
---

## Overview

Seeed Home Assistant Discovery is a specialized framework designed to bridge the gap between Seeed Studio's XIAO series development boards and the Home Assistant ecosystem. Unlike traditional methods that rely on complex MQTT broker setups or YAML-based configurations like ESPHome, this project provides a pure C++/Arduino-based approach. It allows developers to integrate sensors, switches, and even camera streams into Home Assistant with just a few lines of familiar Arduino code.

The project is split into three main components: a custom Home Assistant integration, a WiFi-focused Arduino library for ESP32 devices, and a BLE-focused library that supports both ESP32 and nRF52840 microcontrollers. This dual-protocol support ensures that developers can choose between high-speed, bidirectional WiFi communication or ultra-low-power Bluetooth broadcasting depending on their application's power budget.

## Key Features

### Simplified Communication
One of the primary advantages of Seeed HA Discovery is the removal of middleware. By utilizing WebSockets for WiFi and the BTHome v2 protocol for BLE, the system achieves:
- **No MQTT Requirement**: Eliminates the need to maintain an MQTT broker.
- **Local Communication**: Data stays within the local network, ensuring privacy and reducing latency.
- **Auto Discovery**: Home Assistant automatically recognizes devices as soon as they connect to the network or start broadcasting.

### WiFi and BLE Versatility
The framework supports two distinct modes of operation:
- **WiFi Mode**: Targeted at ESP32-C3, C5, C6, and S3 chips. It provides bidirectional communication, allowing for real-time sensor reporting and downstream control commands (e.g., toggling a relay). It also supports advanced features like MJPEG camera streaming for the XIAO ESP32-S3 Sense.
- **BLE Mode**: Utilizes the BTHome v2 protocol, which is natively supported by Home Assistant. This mode is ideal for battery-powered sensors using the XIAO nRF52840 or ESP32 series, offering ultra-low power consumption through passive advertising.

### The Arduino Advantage
For developers who find YAML configurations restrictive, Seeed HA Discovery offers full access to the Arduino ecosystem. This means users can easily integrate any third-party Arduino library for specialized sensors, displays, or complex logic that might be difficult to implement in ESPHome. It also offers faster compilation times and better backward compatibility with stable Arduino APIs.

## Hardware Support

The project is optimized for the Seeed Studio XIAO ecosystem, including:
- **XIAO ESP32-C3/C6/S3**: Standard WiFi and BLE support.
- **XIAO ESP32-C5**: Support for 2.4GHz and 5GHz dual-band WiFi.
- **XIAO ESP32-S3 Sense**: Support for live camera streaming via OV2640.
- **XIAO nRF52840**: Dedicated BLE support for ultra-low power applications.

## Getting Started

### WiFi Sensor Example
Connecting a temperature and humidity sensor via WiFi is straightforward. The library handles the WebSocket connection and Home Assistant discovery internally.

```cpp
#include <SeeedHADiscovery.h>

SeeedHADiscovery ha;
SeeedHASensor* tempSensor;

void setup() {
    ha.setDeviceInfo("Living Room", "ESP32-C3", "1.0.0");
    ha.begin("SSID", "PASSWORD");

    tempSensor = ha.addSensor("temperature", "Temperature", "temperature", "°C");
}

void loop() {
    ha.handle();
    tempSensor->setValue(25.5);
    delay(5000);
}
```

### BLE Low Power Example
For battery-operated devices, the BLE library allows for passive broadcasting that Home Assistant picks up automatically.

```cpp
#include <SeeedHADiscoveryBLE.h>

SeeedHADiscoveryBLE ble;
SeeedBLESensor* tempSensor;

void setup() {
    ble.begin("XIAO Sensor");
    tempSensor = ble.addTemperature();
}

void loop() {
    tempSensor->setValue(24.0);
    ble.advertise();
    delay(10000); // Sleep or delay for power saving
}
```

## Advanced Functionality

Starting with version 2.3, the project introduced **Home Assistant State Subscription**. This allows devices to subscribe to the state of other entities within Home Assistant. For example, a XIAO board with an e-paper display can subscribe to a weather entity or a power meter entity in Home Assistant and update its display whenever the state changes. This turns the XIAO from a simple sensor node into a functional dashboard or status indicator.
