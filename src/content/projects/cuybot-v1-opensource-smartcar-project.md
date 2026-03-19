---
title: CUYBOT V1 OpenSource Smartcar Project
summary: An open-source firmware for the Cuybot smart car platform based on the ESP32-C3.
  It utilizes FreeRTOS for efficient task management and features WebSocket communication
  for real-time monitoring and control. The project integrates obstacle avoidance,
  line following, and PWM-based motor control for educational robotics applications.
slug: cuybot-v1-opensource-smartcar-project
codeUrl: https://github.com/deaafrizal/cuybot-rtos
star: 41
version: v1-rev1-v0.7
lastUpdated: '2024-11-30'
rtos: freertos
topics:
- arduino
- esp32
- iot
- microcontroller
- raspberry-pi
- robotics
isShow: false
createdAt: '2026-03-19'
updatedAt: '2026-03-19'
---

## Overview

Cuybot V1 is an open-source smart car project designed to bridge the gap between robotics, IoT, and web development. Built around the ESP32-C3 Supermini MCU, it provides a comprehensive platform for developers to learn firmware development, hardware troubleshooting, and full-stack software integration. The project is specifically tailored for those who want to focus on software logic without getting bogged down by complex wiring or soldering.

## Core Architecture and RTOS Integration

At the heart of Cuybot is FreeRTOS, which handles task management and resource efficiency. By leveraging an RTOS, the firmware can concurrently manage sensor readings, motor control loops, and network communication without blocking critical operations. This ensures that the robot remains responsive even when performing complex calculations or handling high-frequency WebSocket data. The use of FreeRTOS allows for a clean separation of concerns between the autonomous navigation logic and the communication stack.

## Key Features and Capabilities

The project comes equipped with several pre-built features that demonstrate the power of the ESP32 platform:

- **Real-time Control via WebSockets**: The system uses the WebSocket protocol to provide low-latency monitoring and control from a web interface, allowing for instantaneous feedback and manual overriding.
- **Autonomous Navigation**: Integrated ultrasonic sensors enable obstacle avoidance logic, while dual-side infrared sensors support automatic line-following modes.
- **Precision Motor Control**: Utilizing PWM (Pulse Width Modulation), the firmware provides smooth acceleration and deceleration for the dual-channel motor driver, supporting up to 4WD configurations.
- **Integrated Protection**: The hardware design includes circuit protection and an auto-cut-off charging system for the single 18650 battery setup.
- **Notification System**: An active buzzer provides audible feedback based on specific logic conditions or sensor triggers.

## Technical Specifications

The Cuybot board is an all-in-one PCB design that minimizes messy wiring, making it ideal for educational environments. Key hardware components include:

- **MCU**: ESP32-C3 Supermini running at 160MHz
- **Sensors**: Ultrasonic sensor for distance measurement and dual IR sensors with adjusters for track following
- **Indicators**: Programmable MicroLED and an active buzzer
- **Connectivity**: Type-C charging and support for parallel serial logging

## Development Environment

The project is built using the PlatformIO ecosystem within the Arduino framework. The configuration supports both wired updates via USB-CDC and wireless updates through OTA (Over-The-Air) protocols. The firmware relies on several key libraries for its functionality, including `ESPAsyncWebServer` for the backend interface and `NewPing` for optimized ultrasonic sensor handling.

## Getting Started

To begin developing with Cuybot, users can clone the repository and open it in VS Code with the PlatformIO extension. The `platformio.ini` file is pre-configured for the ESP32-C3, requiring only the selection of the correct serial port for deployment. Because the project is designed for "software-dominant" developers, the firmware structure is modular, allowing users to easily switch between obstacle avoidance, line following, or manual control modes by modifying the task logic in the source files.
