---
title: 42 Smart Cluster Sign
summary: An autonomous IoT information display for 42 school clusters using an ESP32-C3
  and a 7.5-inch e-paper screen. It synchronizes with the 42 Intra API to display
  exam schedules, supports remote management via Telegram, and features OTA updates.
slug: 42-smart-cluster-sign
codeUrl: https://github.com/RomanAlexandroff/42-Smart-Cluster-Sign
star: 12
lastUpdated: '2025-12-09'
rtos: freertos
libraries:
- spiffs
topics:
- 42school
- digital
- esp32
- esp32-c3
- espressif
- iot-device
- telegram
- wifi
isShow: true
image: /202603/smart-cluster-sign.webp
createdAt: '2026-03-02'
updatedAt: '2026-03-02'
---

## Overview

The 42 Smart Cluster Sign is a specialized IoT solution designed to manage student flow in 42 school clusters. By providing a clear, automated visual indicator of room availability, it prevents accidental interruptions during critical exam periods. The device acts as a self-sufficient information hub that keeps students informed without requiring manual updates from school staff.

## Hardware and Design

The architecture is built around the **Seeed Studio XIAO ESP32C3**, a compact microcontroller that offers Wi-Fi connectivity and integrated battery management. This is paired with a **Good Display 7.5" e-paper screen** (GDEY075Z08), which provides a high-resolution (800x480) tri-color (black/red/white) output. The choice of e-paper is strategic, as it allows the device to remain highly readable under various lighting conditions while consuming minimal power—only drawing current when the display content changes.

The electronics are housed in a modified **IKEA RÖDALM photo frame**, with a custom 3D-printed internal frame to secure the components. Power is provided by a 4000mAh Li-ion battery, enabling the sign to operate autonomously for several months on a single charge.

## Intelligent Automation

The primary function of the sign is its ability to autonomously fetch exam data from the 42 Intra API. It processes this information to transition through several distinct states:

- **Normal State**: Displays the cluster number and "free to enter" pictograms.
- **Pre-exam Warning**: Adds an informational note about upcoming exams early in the day so students can plan their work ahead.
- **1-hour Countdown**: Switches to a full-screen countdown one hour before an exam starts to help students vacate the room.
- **Exam in Progress**: Displays a high-contrast red warning sign to indicate an ongoing exam, attracting attention through a drastically changed color palette.
- **Post-exam**: Automatically resets to the normal display once the exam window closes.

## Connectivity and Remote Management

The software stack is built on the Arduino framework and includes several robust features for remote operation:

- **Telegram Bot Integration**: Leveraging the `UniversalTelegramBot` library, the sign can be monitored and controlled remotely. This allows administrators to update security tokens or receive "low battery" notifications without physical intervention.
- **Over-The-Air (OTA) Updates**: The inclusion of `ArduinoOTA` allows for wireless firmware updates, making it easy to deploy new features or bug fixes without needing a physical cable.
- **Watchdog Timer**: A built-in hardware watchdog ensures the system remains operational by automatically rebooting the microcontroller if the software hangs.
- **Deep Sleep**: The system spends most of its time in a low-power sleep state, waking up only for scheduled checks or display updates to maximize battery life.

## Development and CI/CD

Professional development practices are evident in the inclusion of a **Jenkinsfile** for continuous integration. This pipeline uses the Arduino CLI to compile the sketch for the ESP32-C3 target, ensuring that the code is always buildable. The project also utilizes the **SPIFFS** filesystem for managing internal data and configuration partitions.

For developers interested in contributing, the repository lists several opportunities, ranging from assembly-level timing optimizations to refactoring global variables and implementing Slack integration as an alternative to the current Telegram functionality.
