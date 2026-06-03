---
title: MaixFace
summary: MaixFace is an AI-powered face recognition and access control system designed
  for the Maixduino (K210) platform. It supports persistent face feature storage on
  SD cards, remote enrollment via network interfaces, and HTTP-based event triggering
  for IoT automation. The project is built using MaixPy and is compatible with ESP32
  or PC-based servers for remote management.
slug: maixface
codeUrl: https://github.com/LUNGMEN-GOV/MaixFace
siteUrl: https://www.lung.men
star: 20
lastUpdated: '2025-11-07'
rtos: ''
libraries:
- micropython
- sipeed-maixpy
topics:
- access-control
- ai
- embedded
- esp32
- face-recognition
- iot
- maixduino
- python
- vision
isShow: false
createdAt: '2026-01-17'
updatedAt: '2026-01-17'
relatedProjects:
- esp-dl-micropython-binding
- maixpy-v4
- freebees-access-control-for-esp32
- esp32-cam-mcp-server
- watchbot-system
- smarttrack-rfid-attendance-system
---

## Overview

MaixFace is a modular, open-source framework for embedded AI vision control systems. Developed by LUNGMEN ELECTRONICS, it leverages the power of the Maixduino and its K210 AI chip to provide a robust face recognition solution. Unlike many basic examples, MaixFace focuses on practical deployment needs, such as non-volatile storage for face features and remote management capabilities.

The project is an evolution of Sipeed’s official face recognition programs, introducing critical features for real-world access control. By integrating an SD card, the system can store face data persistently, ensuring that recognized users remain in the system even after a power cycle.

## Key Features and Capabilities

MaixFace is packed with features designed for both efficiency and automation:

- **Persistent Face Storage**: Uses an SD card to store face features, moving beyond volatile memory limitations.
- **Remote Enrollment**: Faces can be enrolled over a network interface, allowing for centralized management without physical access to the device.
- **Intelligent Power Management**: To save power and extend display life, the system automatically turns off the screen after 10 seconds of inactivity. It features instant wake-up the moment a face is detected.
- **IoT Integration**: Upon successful recognition, the system sends HTTP data packets (POST/GET) to a configured server. This can trigger actions like unlocking doors, logging timestamps, or sending mobile notifications.

## Technical Architecture

The system is primarily written in Python using the **MaixPy** framework, making it accessible for rapid prototyping and modification. The core logic is split across several key files:

- `main.py`: Handles the main application loop, sensor initialization, and high-level logic.
- `face_storage.py`: Manages the reading and writing of face feature data to the SD card.
- `models/`: Contains the pretrained AI models for face detection, landmark identification, and feature extraction.

For networking, MaixFace can be paired with an **ESP32** or a PC-based server. The repository includes example code for an ESP32 server to handle remote enrollment requests and process recognition events. This allows the Maixduino to focus on the heavy lifting of AI inference while the ESP32 handles network communication.

## Hardware Requirements

To deploy MaixFace, you will need:
- A **Maixduino** board (featuring the K210 AI chip).
- A compatible camera module, such as the **OV2640**.
- An SD card for persistent data storage.
- (Optional) An ESP32 or similar microcontroller to act as a network gateway or server.

## Getting Started

Setting up MaixFace involves flashing the MaixPy firmware to your Maixduino and using the MaixPy IDE to upload the Python scripts and model files. Once the hardware is ready, users can configure network parameters like Wi-Fi SSIDs and server endpoints directly within the script.

For those who prefer a standalone setup, the system supports manual enrollment via the board's BOOT button, allowing for quick testing without a dedicated web server. The project provides a comprehensive starting point for anyone looking to build professional-grade AI vision hardware for home automation or security.
