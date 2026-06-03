---
title: FT900 IoT and Smart Home Framework
summary: A comprehensive IoT framework and collection of demo applications for the
  FTDI/Bridgetek FT900 series microcontrollers. It provides secure connectivity to
  AWS, Google Cloud, and Azure using MQTT over TLS, alongside integrations for Amazon
  Alexa Voice Service and various REST-based cloud services.
slug: ft900-iot-and-smart-home-framework
codeUrl: https://github.com/richmondu/FT900
star: 4
version: Eclipse_Toolchain_2.6.0_Alpha_Release_4_021119
lastUpdated: '2020-02-18'
rtos: freertos
libraries:
- lwip
topics:
- alexa
- avs-sdk
- aws
- azure
- certificates
- esp32
- freertos
- ft900
- gcp
- iot
- jwt
- lwip
- mbedtls
- mcu
- micropython
- mqtt
- oauth
- rabbitmq
- sas
- sigv4
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- mbed-to-aws-iot-example
- fctc-art-pi-code-iot-from-chip-to-cloud
- mongoose-os
- mongoose-os-samples-for-esp32
- mbed-to-google-cloud-iot
- mbed-to-azure-iot-hub
---

## Overview

The FT900 IoT and Smart Home project is a robust framework designed for the FTDI/Bridgetek FT900 series of memory-constrained microcontrollers. It serves as a bridge between low-power embedded hardware and modern cloud ecosystems, enabling developers to build sophisticated IoT devices, smart home hubs, and voice-controlled endpoints. The repository includes a variety of production-ready demos ranging from secure MQTT connectivity to complex voice service integrations.

## Key Features

### Amazon Alexa Integration
One of the standout components of this project is the Alexa Virtualization feature. It allows the FT900 (or ESP32) to function as an Amazon Echo Dot-like device. By utilizing a Raspberry Pi as an edge gateway hub running the Amazon Alexa Voice Service (AVS) SDK, multiple FT900 MCUs can simultaneously access Alexa. This architecture enables in-house devices to receive audio content, dialogue responses, and visual display cards, making it a powerful foundation for smart home automation systems like the PanL Hub.

### Multi-Cloud Connectivity
The framework provides extensive support for the "Big Three" cloud providers, ensuring secure communication through MQTT over TLS:
- **Amazon AWS IoT Core**: Utilizes X.509 certificate authentication and integrates with AWS Greengrass for local gateway functionality.
- **Google Cloud IoT Core**: Implements JWT (JSON Web Token) authentication.
- **Microsoft Azure IoT Hub**: Supports both SAS (Shared Access Signature) and X.509 certificate-based authentication.

### Secure Web Services
Beyond MQTT, the project demonstrates secure HTTPS connectivity with SigV4 and OAuth authentication. This allows embedded devices to interact directly with REST APIs for services such as:
- **Amazon SNS**: For sending SMS or email notifications.
- **Amazon Lambda**: For invoking serverless functions directly from the MCU.
- **Amazon DynamoDB**: For logging sensor data to a NoSQL database.
- **Twitter**: For posting automated status updates from embedded sensors.

## Technical Implementation

The project is built on a solid foundation of open-source embedded technologies. It leverages **Amazon FreeRTOS** for task management and scheduling, ensuring reliable performance on memory-constrained hardware. Networking is handled by the **lwIP** stack, which has been optimized and patched within this project for better stability.

Security is a primary focus, with the integration of **mbedTLS**. The project provides specific configurations to balance the security-memory footprint tradeoff, which is critical for microcontrollers. It includes implementations for X.509 certificate handling, JWT/SAS token generation, and various ciphersuites optimized for the FT900 architecture.

## Hardware and Development

While primarily targeting the FTDI/Bridgetek FT900 series, the project also includes support for the ESP32, particularly in the Alexa client demonstrations. For developers using the FT900, the repository provides IoT project templates compatible with the FT900 Eclipse IDE, streamlining the transition from demo code to custom application development.
