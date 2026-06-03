---
title: Mongoose OS Programs and Examples
summary: A collection of applications and configuration examples for Mongoose OS targeting
  ESP32 and ESP8266 microcontrollers. The project features implementations for MQTT,
  Google Cloud Platform (GCP) IoT Core integration, RPC services, and hardware interfacing
  for various sensors.
slug: mongoose-os-programs-and-examples
codeUrl: https://github.com/nivu/mos_programs
star: 2
lastUpdated: '2020-03-03'
rtos: mongoose-os
topics:
- esp32
- esp8266
- iot
- javascript
- mongoose-os
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- mongoose-os-samples-for-esp32
- losant-mqtt-example-for-mongoose-os
- losant-mqtt-mongoose-os-example
- mongoose-os-playground
- mongoose-os-app-skeleton
- esp32-experiments
---

## Overview

This repository serves as a comprehensive collection of programs and configuration templates for Mongoose OS, an open-source Internet of Things (IoT) firmware development framework. The project focuses on leveraging the capabilities of ESP32 and ESP8266 microcontrollers to build connected devices with a strong emphasis on cloud integration and remote management.

## Key Components and Features

The repository contains several specialized directories and configuration files that highlight the versatility of Mongoose OS:

- **Cloud Integration**: Extensive support for Google Cloud Platform (GCP) IoT Core is evident through configuration scripts that automate the setup of MQTT bridges, SNTP synchronization, and device registry management. 
- **RPC Framework**: The inclusion of `rpc_singleNode_control_inbuiltServer` demonstrates the use of Mongoose OS's Remote Procedure Call (RPC) mechanism, allowing for remote control and monitoring of device states over various transports like WebSocket or MQTT.
- **Hardware Interfacing**: A dedicated `esp32_pin_map.cpp` file provides a clear mapping for ESP32 GPIOs, including definitions for SPI interfaces and multiple sensor connections (S0-S3, TC1-TC3), suggesting use cases in complex data acquisition systems.
- **Connectivity Management**: The project includes a `wifi-setup-web-master` component, which typically provides a captive portal or web interface for end-users to configure network credentials without hardcoding them into the firmware.
- **Scripting Support**: References to `mjs` in the configuration files indicate the use of the embedded JavaScript engine, allowing for rapid prototyping and logic implementation without full C/C++ recompilation.

## Technical Implementation

The project utilizes the standard Mongoose OS configuration architecture. The `Config.Get.json` file reveals a sophisticated setup including:

- **MQTT Configuration**: Pre-configured for local or cloud brokers with support for SSL/TLS and clean sessions.
- **System Monitoring**: Watchdog timer (WDT) settings and debug logging levels are tuned for stability.
- **Network Services**: Integrated HTTP server, DNS Service Discovery (DNS-SD), and SNTP for time synchronization.

## Hardware Support

While Mongoose OS is cross-platform, this repository specifically targets:
- **ESP32**: Utilized for more complex tasks requiring multiple SPI channels and extensive GPIO mapping.
- **ESP8266**: Used for simpler IoT nodes, as seen in the default device IDs within the configuration files.

## Getting Started

To use these programs, developers typically require the `mos` tool installed on their local machine. The repository includes command-line snippets for configuring GCP IoT Core, which can be executed via the `mos` CLI to provision devices and set up the necessary IAM policies and Pub/Sub topics on the Google Cloud side. The presence of `arduino-examples` also suggests that some components may be compatible with or inspired by the Arduino ecosystem, providing a bridge for developers transitioning to the Mongoose OS environment.
