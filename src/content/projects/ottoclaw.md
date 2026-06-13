---
title: OttoClaw
summary: OttoClaw is an AI-powered desktop humanoid robot system built on the ESP32-S3
  and FreeRTOS. It features a local lightweight agent that handles conversation, memory,
  and autonomous physical movements through six servos without relying on cloud servers,
  utilizing LVGL for its graphical interface and SPIFFS for local data persistence.
slug: ottoclaw
codeUrl: https://github.com/FlashCat-Jordan/OttoClaw
siteUrl: https://www.shanmaotech.cn/ottodiy
version: v2.0
lastUpdated: '2026-06-12'
licenses:
- NOASSERTION
image: /202606/OttoClaw_0.avif
rtos: freertos
libraries:
- lvgl
- spiffs
- lwip
topics:
- ai-agent
- dingtalk
- embedded
- esp32
- esp32s3
- freertos
- humanoid-robot
- iot
- llm
- open-source-hardware
- robot
isShow: true
createdAt: '2026-06-13T05:24:02+00:00'
updatedAt: '2026-06-13T05:24:02+00:00'
---

OttoClaw is a localized AI desktop humanoid robot system developed by FlashCat Technology. Built on the ESP32-S3 platform, it represents a departure from traditional AI toys by running a lightweight agent entirely on the edge. The system is designed to be a quiet, non-intrusive companion that expresses itself through physical movement and digital messaging rather than voice, making it ideal for desk environments where silence is preferred.


## Core Philosophy and Emotional Intelligence

At the heart of the project is the concept of an AI with autonomous emotional expression. Unlike robots that react only to direct user triggers, OttoClaw features 22 distinct emotional states—including happiness, shyness, anger, and boredom—that fluctuate based on the context of conversations. These emotions are manifested through a 1.54-inch LCD screen and physical gestures, such as swaying when happy or hiding its face when shy.

Complementing this is a sophisticated personality and growth system. The robot builds a relationship with the user over time, progressing through five stages from "Stranger" to "Kinship." This bond is visualized via heart icons on the display, and the robot’s responses evolve as it gathers more information about the user’s preferences and history.

![22 AI-driven emotional states](/202606/OttoClaw_2.avif)

## Technical Architecture and Local Execution

The system is engineered for efficiency and privacy, running a pure C and FreeRTOS stack on a single ESP32-S3 chip. By operating at 0.5W, it can remain online 24/7 without the overhead of heavy operating systems like Linux. All session data, personality traits, and long-term memories are stored locally in the device's SPIFFS partition, ensuring that interactions remain private and do not depend on a proprietary cloud backend.

![Local edge execution on ESP32-S3](/202606/OttoClaw_4.avif)

The software architecture utilizes a dual-core approach: one core handles network I/O and communication protocols, while the second core runs the AI Agent loop. The robot supports the Anthropic tool-use and ReAct cycle patterns, allowing the Large Language Model (LLM) to autonomously decide when to call specific tools or perform physical actions.

## AI-Driven Physical Expression

A standout feature is the AI Servo Sequences system. Instead of relying purely on pre-scripted animations, the AI interprets semantic meaning to design new postures. When a user asks for a specific gesture, the LLM calculates the necessary angles for the six servos to achieve that pose. This allows the robot to "imagine" and execute physical movements that match its current dialogue or emotional state, such as leaning forward to show interest or raising its hands to celebrate.

![AI Servo Sequences for physical expression](/202606/OttoClaw_6.avif)

## Hardware Integration and Ecosystem

The hardware is based on the Shanmao OttoRobot AI development board, a comprehensive platform that integrates a microphone, display, speaker with amplifier, power management, capacitive touch, and 6-way servo control. The project is fully open-source, providing PCB designs, BOM lists, and 3D-printable STL files for the chassis.

Interaction is primarily handled through DingTalk via a Stream-mode connection, which avoids the need for a public server or complex port forwarding. This setup allows for a secure, text-based interface that fits seamlessly into a professional or study workflow. For developers, the system also offers a WebSocket API and a serial CLI for advanced configuration and monitoring.

## Getting Started

Deploying the system involves flashing the firmware to an ESP32-S3 board and configuring the device through a mobile-friendly captive portal. Users can choose between OpenAI-compatible or Anthropic-compatible LLM providers. Once connected to Wi-Fi and configured with an API key, the robot automatically begins its relationship-building process, recording daily notes and user preferences to its local storage to maintain continuity across reboots.
