---
title: OBD2 to MQTT for Home Assistant
summary: An ESP32-based firmware that extracts vehicle data via an ELM327 OBD2 adapter
  and transmits it to an MQTT broker over cellular networks. Designed for Home Assistant
  integration, it supports a wide range of LilyGO T-Call and Waveshare modules with
  integrated GSM/LTE and GPS capabilities.
slug: obd2-to-mqtt-for-home-assistant
codeUrl: https://github.com/adlerre/obd2-mqtt
siteUrl: https://adlerre.github.io/obd2-mqtt/
star: 198
version: v0.41.0
lastUpdated: '2026-03-02'
rtos: freertos
libraries:
- littlefs
- nimble
- h2zero-esp-nimble-cpp
topics:
- a7670
- cellular
- elm327
- esp32
- gps
- home-assistant
- mqtt
- obd2
- sim7000g
- sim7070g
- sim800
isShow: true
image: /202603/obd2mqtt.webp
createdAt: '2026-03-07'
updatedAt: '2026-03-07'
---

## Overview

OBD2 to MQTT is a comprehensive firmware solution for ESP32-based microcontrollers designed to bridge the gap between a vehicle's On-Board Diagnostics (OBD2) system and Home Assistant. By utilizing cellular modems and Bluetooth-based ELM327 adapters, the project allows car owners to monitor real-time vehicle telemetry—such as fuel levels, engine load, battery voltage, and GPS location—remotely via an MQTT broker.

The project is particularly well-suited for users who want to integrate their vehicle into a smart home ecosystem without relying on expensive, proprietary third-party tracking services. It leverages the power of the ESP32 to handle both local Bluetooth communication with the car and long-range cellular communication with the cloud.

## Hardware Ecosystem

The firmware is highly versatile, supporting a variety of hardware configurations, primarily focusing on LilyGO T-Call and T-SIM series boards. Supported modules include:

- **T-Call SIM800L/SIM800C**: Cost-effective 2G-based solutions for basic data transmission.
- **T-Call A7670 series**: Modern 4G LTE modules with robust SSL/TLS support and optional integrated GPS.
- **T-SIM7000G / T-SIM7070G**: Low-power NB-IoT and Cat-M1 modules for efficient cellular connectivity.
- **Waveshare ESP32-S3 A7670E**: High-performance ESP32-S3 based 4G modules.

Communication with the vehicle is handled via an ELM327 OBD Bluetooth adapter. The system supports both classic Bluetooth and Bluetooth Low Energy (BLE) adapters, ensuring compatibility with a wide range of OBD2 dongles.

## Technical Implementation

Built on the Arduino framework using PlatformIO, the project utilizes several key embedded technologies:

- **MQTT over Cellular**: Uses the TinyGSM library to manage cellular connections and PubSubClient for MQTT communication. On modern A7670-based hardware, it supports full SSL/TLS encryption for secure data transfer.
- **Web-Based Configuration**: Upon first boot or via a physical trigger, the ESP32 starts a Wi-Fi Access Point. Users can connect via a browser to configure Wi-Fi credentials, MQTT settings, cellular APN data, and OBD sensor profiles.
- **LittleFS Storage**: All configuration data and sensor profiles are stored in the ESP32's internal flash memory using the LittleFS filesystem.
- **OTA Updates**: The project includes a built-in Over-The-Air (OTA) updater, allowing users to refresh firmware and filesystem binaries without removing the device from the vehicle.

## Custom Sensor Logic

One of the most powerful features of this project is its flexible sensor definition system. Sensors are defined in JSON profiles and categorized into two types:

### READ States
These are used to poll specific PIDs from the vehicle. Users can define the service, PID code, and expected response format. For example, a Revolutions Per Minute (RPM) sensor might be defined as:

```json
{
  "type": 0,
  "valueType": "int",
  "enabled": true,
  "name": "rpm",
  "pid": {
    "service": 1,
    "pid": 12,
    "scaleFactor": "1.0 / 4.0"
  }
}
```

### CALC States
Calculated states allow users to derive new data from existing sensors using a built-in mathematical expression parser. This is used for complex metrics like fuel consumption per 100km or total distance driven. The parser supports variables, timestamps (`$millis`), and standard mathematical functions.

## Power Management and Reliability

Since the device is intended to stay in a vehicle, power management is critical. The firmware includes an automatic sleep timeout that triggers when the ignition is off or no data is being received. It can enter deep sleep to prevent draining the car's battery and wake up periodically or upon detecting external power. Additionally, the system monitors signal quality and OBD connection health, automatically attempting to recover from network drops or adapter disconnections.
