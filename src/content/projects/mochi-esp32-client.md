---
title: Mochi ESP32 Client
summary: An ESP32-based animatronics client that renders expressive eye animations
  on an SSD1306 OLED and plays robot sounds via a buzzer. It functions as a networked
  peripheral that receives AI-generated animation and audio data from a remote server
  over WiFi.
slug: mochi-esp32-client
codeUrl: https://github.com/dzonder/mochi-esp32
star: 24
lastUpdated: '2025-09-18'
rtos: freertos
topics:
- dasai-mochi
- esp32
- genai
- mochi
isShow: false
createdAt: '2026-02-04'
updatedAt: '2026-02-04'
relatedProjects:
- xiaozhi-ai-desk-buddy-esp32-s3
- ani-emo-eye
- sesame-robot-micro
- nebaura-labs-mote
- pixlpal-m1-firmware
- fluxgarage-roboeyes-library
---

## Overview

The Mochi ESP32 Client is the hardware-side implementation of the Mochi animatronics project, inspired by the quirky robot designs popularized by Huy Vector. This project transforms an ESP32 microcontroller into an expressive companion capable of displaying smooth eye animations and playing robotic jingles. By offloading the heavy lifting of emotion generation to a GenAI-powered server, the ESP32 remains focused on real-time rendering and hardware interaction.

## How It Works

The system operates on a client-server architecture. While the ESP32 handles the physical interface, a dedicated [Mochi server](https://github.com/dzonder/mochi-server) uses Google's Gemini AI to generate unique facial expressions and sound patterns. 

The communication flow is bidirectional:
1. **Input**: A touch sensor connected to the ESP32 triggers a request to the server.
2. **Processing**: The server generates new animation frames and sound frequencies.
3. **Output**: The server sends POST requests to the ESP32's `/draw` and `/play` endpoints. The ESP32 then decodes this data to update the OLED display and drive the buzzer.

## Technical Implementation

Built using the **Arduino framework** and managed via **PlatformIO**, the project targets the **ESP32-C3** (specifically the devkitm-1). It leverages asynchronous networking to ensure that the device remains responsive while waiting for or receiving data from the server.

### Key Components:
- **Display**: Uses the `Adafruit SSD1306` and `GFX` libraries to render eye movements on a 128x64 OLED screen.
- **Networking**: Implements `ESPAsyncWebServer` to handle incoming animation and sound data without blocking the main execution loop.
- **Audio**: Generates quirky robot sounds using Pulse Width Modulation (PWM) on a standard buzzer.
- **Simulation**: The repository includes a `diagram.json` and `wokwi.toml`, allowing developers to simulate the hardware setup (ESP32, OLED, buzzer, and button) in the Wokwi web-based simulator.

## Hardware Configuration

The project is designed to be flexible, with hardware pins defined in a central `src/config.h` file. The default configuration utilizes I2C for the display (SDA on pin 8, SCL on pin 9) and digital pins for the touch sensor and buzzer. This modularity allows users to adapt the code to various ESP32 development boards and custom PCB layouts.

## Getting Started

To deploy the Mochi client, developers need to configure their WiFi credentials and the target server URL in `src/config.h`. Once flashed via PlatformIO, the ESP32 acts as a web server on the local network. Touching the sensor initiates the interaction, making it an ideal project for those interested in combining IoT, AI, and robotics.
