---
title: Simplebus2 MQTT Bridge
summary: An ESP32-C3 based bridge that integrates Comelit Simplebus2 intercom systems
  into smart home environments via MQTT. It supports doorbell notifications, remote
  door opening, and automatic 'Ring-to-Open' functionality. The project includes custom
  hardware schematics, 3D-printable enclosures, and a web-based configuration interface.
slug: simplebus2-mqtt-bridge
codeUrl: https://github.com/Elektroarzt/simplebus2-mqtt-bridge
star: 25
lastUpdated: '2025-03-12'
rtos: freertos
topics:
- comelit
- doorbell
- esp-home
- esp32
- home-assistant
- intercom
- iobroker
- mqtt
- node-red
- simplebus
- simplebus2
- smart-home
- smarthome
isShow: true
image: /202602/simplebus2-mqtt-bridge.webp
createdAt: '2026-02-18'
updatedAt: '2026-02-18'
relatedProjects:
- doorman-s3
- genius-gateway
- mitsubishi-ecodan-air-to-water-bridge-for-cn105-to-mqtt
- esphome-modbus-tcp-to-rtu-bridge
- comfosense-touch-zehnder-comfoair-q350-mqtt-bridge-controller
- esp32-jarolift-controller
---

## Overview

The Simplebus2 MQTT Bridge is a specialized hardware and software solution designed to bring legacy Comelit intercom systems into the modern smart home ecosystem. By interfacing with the proprietary Simplebus2 protocol, this bridge allows users to receive doorbell notifications and control door locks through standard MQTT brokers, making it compatible with platforms like Home Assistant, OpenHAB, or Node-RED.

The project is built around the Seeed Studio XIAO ESP32C3, a compact and powerful microcontroller that provides both the processing power for signal decoding and the wireless connectivity required for MQTT communication.

## Core Functionality

The bridge implements several critical features for intercom automation:
- **Doorbell Monitoring**: Distinguishes between calls from the main entrance and the individual apartment door.
- **Remote Access**: Allows for opening the main entrance door via an MQTT command.
- **Ring-to-Open**: An automated feature that can be scheduled or toggled, which automatically triggers the door release upon receiving a ring signal.
- **Teach-in Mode**: Simplifies setup by allowing the device to "learn" the specific intercom address from the bus without manual DIP switch translation.

## Hardware and Signal Conditioning

Because the Simplebus2 protocol operates on a two-wire bus with specific voltage levels and a 25 kHz signal, the project includes a custom PCB design. The hardware features a sophisticated signal conditioning stage to ensure reliable communication:

- **Active Filtering**: A Sallen-Key high-pass filter and low-pass filter stage to isolate the 25 kHz payload.
- **Adjustable Gain**: An operational amplifier (OPV) with software-adjustable gain to compensate for varying cable lengths and signal degradation.
- **Comparator Stage**: A hardware comparator that converts the analog bus signal into a digital pulse train for the ESP32's GPIO.

The device is designed to be powered directly from the bus voltage, eliminating the need for external power supplies or batteries in most installations.

## Software and Configuration

The firmware is developed using the Arduino framework, running on the ESP32's underlying FreeRTOS implementation. It features a robust WiFi Manager that launches a temporary access point named "Config_MQTT_SimpleBus2" for initial setup. Through a web-based interface, users can configure MQTT credentials, adjust hardware parameters like amplifier gain and comparator thresholds, and perform Over-the-Air (OTA) firmware updates.

For users who prefer the ESPhome ecosystem, the project is compatible with a companion project that allows for native Home Assistant integration, leveraging the same hardware design.

## Mechanical Design

The repository provides 3D-printable enclosure designs for two common installation scenarios:
- **Flush-Mounted Box**: A streamlined enclosure designed to fit behind the intercom unit inside a standard wall junction box.
- **DIN Rail Mount**: An alternative bottom shell with a built-in clip for installation in electrical distribution boards.

The housings include thoughtful features such as an external USB-C port for debugging, a light guide for the status LED, and a mechanical axis for the physical configuration button.
