---
title: IoTea
summary: An automated plant care and monitoring system built on the ESP32 and ESP-EYE
  hardware platforms. It utilizes Mongoose OS and AWS IoT to provide remote vitals
  tracking, automated watering, and image-based plant health analysis via a Telegram
  bot interface.
slug: iotea
codeUrl: https://github.com/seanfhear/IoTea
star: 8
lastUpdated: '2021-04-16'
rtos: mongoose-os
topics:
- aws-iot-core
- image-processing
- iot
- mongoose-os
- mqtt
- plants
- telegram-bot
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- smart-plant-monitoring-system
- esphome-plant-watering
- lilygo-higrow-esp32-plant-monitoring-sensor-firmware-hardware-v1
- lilygo-higrow-esp32-plant-monitoring-sensor-firmware
- smart-farming-iot-system
- chronothermostat-an-aws-powered-iot-climate-control-system
---

## Overview

IoTea is a comprehensive IoT solution designed for automated plant management and monitoring. By combining embedded hardware, cloud connectivity, and image processing, the project provides a sophisticated way to maintain plant health remotely. The system is built around the ESP32 microcontroller family and leverages modern IoT frameworks to bridge the gap between physical sensors and user-facing applications.

## System Architecture

The project is divided into several specialized modules that work in tandem to provide a complete plant care ecosystem:

- **Main Board Firmware**: Running on an ESP32, this component manages the core physical interactions, including reading plant vitals (sensors), controlling a stepper motor for positioning, and operating a water pump for irrigation.
- **Camera Firmware**: Utilizing the ESP-EYE development board, this module captures images of the plant for visual monitoring and health analysis.
- **Telegram Bot**: Serves as the primary user interface, allowing users to interact with their plants, receive updates, and trigger actions manually.
- **Automation & Image Processing**: A backend layer that handles automated watering logic and processes plant images to detect growth or health issues.

## Technical Stack

IoTea is built on a robust technical foundation that emphasizes connectivity and ease of development. The firmware is developed using **Mongoose OS**, an IoT firmware development framework that allows for rapid prototyping and reliable deployment. It utilizes **mJS**, a restricted JavaScript engine, for high-level logic while maintaining the performance of the **ESP-IDF** (Espressif IoT Development Framework) for low-level operations.

Connectivity is handled through **AWS IoT**, which provides a secure channel for telemetry data and command-and-control messages. This cloud integration enables the system to scale and remain accessible from anywhere in the world. The project also incorporates **Serverless** architecture and **Jupyter Notebooks** for the image processing and automation components, showcasing a modern approach to full-stack IoT development.

## Key Features

- **Automated Irrigation**: Intelligent watering based on sensor data and predefined automation rules.
- **Remote Monitoring**: Real-time access to plant vitals and visual status through a Telegram bot.
- **Health Analysis**: Image processing capabilities to analyze plant status over time.
- **Modular Design**: Clear separation between firmware, automation logic, and user interface components, making the system easier to maintain and extend.

## Hardware Implementation

The project targets the Espressif ecosystem, specifically the **ESP32** for general control and the **ESP-EYE** for vision-related tasks. These boards are chosen for their integrated Wi-Fi and Bluetooth capabilities, low power consumption, and strong community support. The hardware setup includes various peripherals such as pumps, stepper motors, and environmental sensors to create a fully interactive physical environment.
