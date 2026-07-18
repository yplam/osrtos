---
title: Voice-Controlled Ground and Aerial Robot
summary: A multi-modal robotic control system that translates spoken commands into
  physical actions using an ESP32-S3 for audio capture and an Arduino UNO for motor
  execution. The project integrates high-level AI services including Deepgram for
  transcription, GPT-4o for intent analysis, and 60db for text-to-speech feedback.
slug: voice-controlled-ground-and-aerial-robot
codeUrl: https://github.com/Unieggy/voice-controlled-ground-aerial-robot
lastUpdated: '2026-06-16'
image: /202607/voice-controlled-ground-aerial-robot_0.avif
rtos: freertos
libraries:
- spiffs
topics:
- edge-ai
- embedded-systems
- voice-control
isShow: true
createdAt: '2026-07-15T05:07:56+00:00'
updatedAt: '2026-07-15T05:07:56+00:00'
---

Building a robot that understands natural language is a complex orchestration of hardware and software. The Voice-Controlled Ground and Aerial Robot project simplifies this by distributing the workload across four coordinated environments. By combining the low-latency processing of the ESP32-S3 with the reasoning capabilities of large language models (LLMs) and the reliable motor control of the Arduino UNO, this repository provides a full-stack blueprint for voice-interactive hardware.

## System Architecture

The project is designed as a distributed pipeline where each component handles a specific layer of the interaction:

1.  **ESP32-S3 (The Ears):** This module captures high-quality audio using an INMP441 I2S microphone. It temporarily stores recordings on the local SPIFFS partition before uploading them via HTTP to a central server.
2.  **Node.js Server (The Bridge):** Acting as the central hub, this server accepts raw WAV files and utilizes the Deepgram API for rapid speech-to-text (STT) transcription. It also handles text-to-speech (TTS) via the 60db platform, allowing the robot to speak back to the user.
3.  **Java Client (The Brain):** This component processes the transcribed text using OpenAI's GPT-4o. Rather than just looking for keywords, it uses the LLM to understand intent, choosing the appropriate control bytes to send back through a Socket.IO room.
4.  **Arduino UNO (The Muscle):** The UNO receives serial commands (via Bluetooth or UART) and translates them into physical movement. It manages a TB6612 motor driver for wheels or propellers and controls four SG90 servos for mechanical adjustments.

## Hardware and Communication

The hardware stack is built around accessible yet powerful components. The ESP32-S3 Dev Module is the primary interface for network connectivity and audio processing. For physical movement, the system supports a variety of configurations, from ground-based wheels to aerial propellers, managed by the Arduino UNO. Communication between the high-level brain (Java) and the low-level controller (Arduino) typically occurs via a Bluetooth HC-05 pair, ensuring the robot remains untethered.

## Command and Control

The system uses a concise serial protocol to ensure low-latency response times. Once the Java client determines an action based on the user's voice, it emits simple character codes that the Arduino interprets:

| Byte | Action   | Effect            |
| ---- | -------- | ----------------- |
| `F`  | Forward  | Move forward      |
| `B`  | Backward | Move backward     |
| `L`  | Left     | Pivot left        |
| `R`  | Right    | Pivot right       |
| `S`  | Stop     | Brake both motors |

## Intelligent Feedback

One of the standout features of this project is its pluggable text-to-speech system. Using the 60db provider, the robot can generate natural-sounding responses to confirm commands or provide status updates. The Node.js server supports multiple transport layers for audio generation, including standard HTTP, chunked streaming, and WebSockets, allowing developers to balance between audio quality and response speed.

## Future Development

The project roadmap includes several advanced features to further bridge the gap between hobbyist robotics and professional platforms. Planned updates include replacing the Bluetooth HC-05 with ESP-NOW for lower latency, adding a WebSocket-based dashboard for real-time transcript monitoring, and integrating SLAM (Simultaneous Localization and Mapping) using RPLIDAR and micro-ROS for autonomous navigation.
