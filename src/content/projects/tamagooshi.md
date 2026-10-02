---
title: Tamagooshi
summary: An ESP32-based pixel-art virtual pet platform for M5Stack devices that reflects
  live metrics from sources like Datadog and PostHog. The system uses a Python-powered
  hub to communicate over BLE or MQTT, allowing the mascot to react to technical telemetry
  or AI agent activity. It is built using the Arduino framework on FreeRTOS and features
  a modular configuration system for custom assets and HID functionality.
slug: tamagooshi
codeUrl: https://github.com/addu390/tamagooshi
siteUrl: https://gooshi.me
version: v0.1.0-beta
lastUpdated: '2026-08-04'
licenses:
- MIT
rtos: freertos
libraries:
- h2zero-esp-nimble-cpp
- platformio-platformio-core
topics:
- claude
- esp32
- m5stack
- m5stick
- tamagotchi
isShow: false
createdAt: '2026-08-06T11:22:51+00:00'
updatedAt: '2026-08-06T11:22:51+00:00'
relatedProjects:
- pixel-pets
- deskpet
- deskpet-for-m5stack-cardputer
- raising-hell-cardputer-adv-edition
- esp32-virtual-cat-project
- tamafi-wifi-powered-virtual-pet
---

Tamagooshi is a reimagining of the classic virtual pet for the modern developer workflow. Built specifically for M5Stack devices like the StickC Plus and StickS3, it transforms abstract data—such as Datadog metrics, PostHog events, or the activity of AI coding agents—into the mood and behavior of a pixel-art mascot. It serves as a glanceable, physical manifestation of a developer's environment and productivity.

The project is a comprehensive ecosystem comprising firmware, a Python-based backend hub, and a desktop simulator. The firmware is built on the ESP32 using the Arduino framework, leveraging FreeRTOS for task management and NimBLE for efficient Bluetooth Low Energy communication.

### A Metric-Driven Mood System
The core innovation of Tamagooshi is its ability to turn live metrics into a "mood." By connecting to a local hub over BLE or MQTT, the device receives real-time updates from professional monitoring tools. If error rates in Datadog spike, the pet might become distressed; if PostHog conversion rates are high, it might celebrate. This creates a tangible feedback loop for developers, providing a sense of the system's health without needing to check a dashboard.

### AI Agent Integration
Beyond passive monitoring, Tamagooshi integrates with modern AI development tools. It can follow sessions from coding agents like Claude and Cursor, providing a physical presence for digital assistants. Users can even approve or deny requests directly from the device, turning the M5Stack into a dedicated physical interface for AI-assisted workflows. This integration is handled via the Python hub, which manages the communication between the AI APIs and the hardware.

### Hardware and Simulation
The project targets the M5Stack StickC Plus, StickC Plus SE, and StickS3. These compact devices feature vibrant displays and built-in buttons, making them ideal for a pocketable companion. For developers without hardware or those wanting to iterate quickly on UI logic, a desktop simulator is provided. This simulator renders the exact same interface as the hardware, allowing for rapid development and testing without constant flashing.

### Modular Configuration and "Brands"
Tamagooshi uses a modular "brand" system defined by a `config.yaml` file. This architecture allows users to customize the mascot, themes, and included apps or games. By scoping configurations to specific brands, the firmware remains lightweight, only including the assets required for that specific build. The project even includes a "Mascot Mixer" tool to generate custom sprite sheets, ensuring that every device can have a unique identity.

### HID Capabilities and Extensibility
A unique feature of the firmware is its support for Bluetooth HID (Human Interface Device) modes. The device can function as a gamepad, media controller, keyboard, or mouse. This allows the Tamagooshi to serve a dual purpose: a companion on your desk that can also control your music or navigate a presentation. The system is designed to be extensible, with support for custom apps and games that can leverage the device's IMU, microphone, and display.
