---
title: LiXee-Box
summary: A multi-protocol Zigbee gateway and energy management hub built on the ESP32-S3
  platform. It integrates Zigbee devices, Linky smart meters, and energy sensors into
  home automation systems via MQTT and a local web interface.
slug: lixee-box
codeUrl: https://github.com/fairecasoimeme/LiXee-Box
siteUrl: https://faire-ca-soi-meme.fr/domotique/2025/08/18/lixee-box-mesurer-analyser-economiser-pour-une-bonne-gestion-energetique/
star: 11
version: v2.15
lastUpdated: '2026-01-30'
rtos: freertos
libraries:
- littlefs
- lwip
topics:
- api
- gateway
- lixee
- mqtt
- web
- zigate
- zigbee
isShow: true
image: /202602/LiXee_ZiWiFi32_face.webp
createdAt: '2026-02-04'
updatedAt: '2026-02-04'
relatedProjects:
- genius-gateway
- zigbee-gas-counter
- simplebus2-mqtt-bridge
- q-sensor-multi-functional-zigbee-air-quality-sensor
- energyme-home
- beelight-zigbee-light-environment-sensor
---

## Overview

LiXee-Box is a comprehensive multi-protocol gateway designed to serve as a central hub for energy management and home automation. Built primarily for the LiXee-ZiWifi32 hardware, it transforms the device into a powerful bridge between Zigbee peripherals and modern home automation platforms like Home Assistant, Jeedom, and Domoticz. The project focuses heavily on energy monitoring, supporting French Linky meters, production counters, and various utility sensors (gas, water).

## Hardware Architecture

The application is optimized for the **LiXee-ZiWifi32 Lite**, which features an **ESP32-S3-WROOM-N16R8** microcontroller (16MB Flash, 8MB PSRAM). For Zigbee connectivity, it utilizes a **JN5189** module running the ZiGate v2 firmware. This dual-processor approach allows the ESP32 to handle the web interface, MQTT communication, and complex energy calculations, while the JN5189 manages the Zigbee mesh network.

## Key Features

### Energy Management and Monitoring
LiXee-Box provides advanced energy tracking capabilities beyond simple data relaying:
- **Linky Integration**: Full support for ZLinky_TIC to retrieve real-time consumption and production data.
- **Sub-metering**: Users can associate Zigbee plugs or modules (using the Simple Metering cluster) to isolate specific appliances like electric vehicles, heating, or pools.
- **Presence Correlation**: By integrating Zigbee occupancy sensors, the system can overlay presence data on energy graphs to identify consumption anomalies during absences.
- **Production Tracking**: Support for photovoltaic injection monitoring, allowing for automated load shedding or device triggering when surplus energy is detected.

### Zigbee Device Management
The gateway supports a wide range of standard Zigbee clusters, including On/Off, Window Covering, Temperature/Humidity, and Electrical Measurement. It features a template-based system for device recognition. If a device is not natively supported, users can create custom JSON templates to define statuses, actions, and reporting configurations.

### Automation Engine
LiXee-Box includes a built-in rule engine that allows for local automation without requiring an external controller. Rules are defined in a JSON structure and can be triggered by timers or specific Zigbee events. These rules support multiple conditions (logical AND/OR) and actions, such as toggling devices or sending notifications.

## Connectivity and Integration

The system is designed to be "cloud-optional," providing a local web interface for configuration and monitoring. For broader integration, it features:
- **MQTT Discovery**: Fully compatible with Home Assistant's MQTT discovery, allowing Zigbee devices to appear automatically in the HA dashboard.
- **WebPush API**: Support for sending notifications to web services.
- **REST API**: A comprehensive local API for retrieving system status, device lists, and Linky data programmatically.

## Technical Implementation

The project is built using the Arduino framework for ESP32 and managed via PlatformIO. It leverages several high-performance libraries to handle its asynchronous nature:
- **ESPAsyncWebServer**: Provides the responsive local management site.
- **AsyncMqttClient**: Handles non-blocking communication with MQTT brokers.
- **TaskScheduler**: Manages periodic tasks like sensor polling and rule evaluation.
- **LittleFS**: Used for robust file system management on the ESP32's flash memory.

## Getting Started

Initial configuration is handled via a WiFi Access Point mode (SSID: `LIXEEGW-XXXX`) or through the LiXee-Assist mobile application using Bluetooth Low Energy (BLE). Once connected to the local network, the gateway can be accessed via `http://lixee-gw`. Firmware updates can be performed directly through the web interface or via `esptool` for developers needing to flash the bootloader and partition tables manually.
