---
title: LeCyborg AI-Powered Third-Arm Prosthesis
summary: LeCyborg is an AI-powered third-arm prosthesis that uses EMG sensors and
  imitation learning to assist users. Built on the LeRobot framework, it features
  an ESP32-based wearable sensor system and a SO100 robotic arm controlled by an Action
  Chunking with Transformers (ACT) policy.
slug: lecyborg-ai-powered-third-arm-prosthesis
codeUrl: https://github.com/Mr-C4T/LeCyborg
star: 24
lastUpdated: '2025-09-25'
rtos: freertos
topics:
- 3d-printing
- ai
- electronics
- esp32
- lerobot
- python
- robotics
- sensor
isShow: true
image: /202602/myoware_LeCyborg.webp
createdAt: '2026-02-01'
updatedAt: '2026-02-01'
relatedProjects:
- watchbot-system
- echolens-ai-powered-smart-glasses
- roarm-m2-robotic-arm-control-firmware
- scara-drawing-robot
- gesture-detecting-macro-keyboard
- minimal-self-perceiving-embodiment-for-large-language-models
---

## Overview

LeCyborg is a pioneering project in the field of physical AI and human-robot augmentation. Developed for the LeRobot Worldwide Hackathon 2025 by Hugging Face, where it secured 13th place, the project introduces a wearable "third-arm" prosthesis. Unlike traditional prosthetics that rely on rigid thresholds, LeCyborg utilizes an EMG (electromyography) sensor and an imitation learning policy (ACT) to understand user intent and provide contextual assistance.

The system is built on top of the LeRobot library, integrating muscle activity data directly into the robot's observation space. This allows the AI model to learn when a user wants the arm to activate based on muscle contractions, creating a more natural and intuitive control mechanism.

## Hardware Architecture

The project features a sophisticated hardware stack designed for both prototyping and professional implementation. The core components include:

- **SO100 Robotic Arm**: A wearable arm attached to a backpack.
- **Vision System**: Equipped with both a wrist-mounted camera and a context camera (Intel RealSense) to provide visual feedback to the AI policy.
- **EMG Sensor**: A MyoWare sensor used to record muscle activity.

For the sensor electronics, the project offers two paths:
1. **Prototyping**: An ESP32 DOIT DevKit housed in a 3D-printed case, powered by a 1S LiPo battery.
2. **Custom PCB**: A compact, professional design based on the ESP32-C3 XIAO, featuring wireless transmission via ESP-NOW or Bluetooth Serial.

## Software and AI Integration

LeCyborg leverages the Action Chunking with Transformers (ACT) policy to process multi-modal data. The project includes a modified recording script, `custom_record.py`, which synchronizes the EMG sensor data with camera feeds and robotic joint states. This data is labeled as `observation.sensor` within the LeRobot dataset format.

One of the key innovations is **Contextual Activation**. During the dataset recording phase, the teleoperator only activates the robot when the user's muscle is contracted. This teaches the AI policy to associate specific muscle signals with the intent to move, allowing the model to learn context-aware activation rather than relying on simple on/off triggers.

## Getting Started and Usage

The project is designed to run on Ubuntu 22 or 24. The ESP32 firmware is provided as an Arduino sketch (`LeCyborg-esp32.ino`), requiring the `BluetoothSerial` library. Once the sensor is flashed and paired via Bluetooth, a shell script handles the RFCOMM binding to make the sensor data available to Python scripts.

Users can record their own datasets, train models using the standard LeRobot training pipeline, and run inference to evaluate the policy's performance. The project also emphasizes interpretability, providing tools for visual attention mapping to understand how the AI policy weights visual inputs versus EMG sensor data during operation.
