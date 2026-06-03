---
title: loxHueBridge
summary: A bidirectional interface connecting the Loxone Miniserver with the Philips
  Hue Bridge (V2 API) and MQTT. It provides local, real-time control using Hue's Event
  Interface (SSE) and supports status reporting via UDP and MQTT. Designed for deployment
  on platforms like Raspberry Pi using Docker.
slug: loxhuebridge
codeUrl: https://github.com/bausi2k/loxhuebridge
star: 18
version: v2.1.0
lastUpdated: '2026-01-30'
rtos: ''
libraries:
- sqlite
topics:
- hue
- loxone
- mqtt
- node
isShow: false
createdAt: '2026-02-03'
updatedAt: '2026-02-03'
relatedProjects:
- lixee-box
- simplebus2-mqtt-bridge
- comfosense-touch-zehnder-comfoair-q350-mqtt-bridge-controller
- mitsubishi-ecodan-air-to-water-bridge-for-cn105-to-mqtt
- esphome-modbus-tcp-to-rtu-bridge
- dtugateway-for-hoymiles-hms-inverters
---

## Overview

loxHueBridge is a high-performance, bidirectional interface designed to bridge the gap between the Loxone Miniserver and the Philips Hue Bridge (V2 API). By utilizing the modern Hue Event Interface (SSE), the project enables real-time status updates and local control without the latency associated with cloud-based solutions. It acts as a middleware that translates Loxone UDP commands into Hue API calls and reports Hue events back to Loxone and MQTT brokers.

## Key Features

The project is built with a focus on speed, stability, and ease of integration for smart home enthusiasts. Key capabilities include:

- **Real-Time Synchronization**: Uses Server-Sent Events (SSE) to push status changes from Hue lights and sensors to Loxone and MQTT instantly.
- **Smart Mapping and Setup**: Features a web-based interface for automatic Hue Bridge discovery, pairing, and "click-and-select" device mapping.
- **Persistent Logging**: Integrated SQLite database for high-performance log searching and filtering that persists across reboots.
- **Loxone Integration**: Supports controlling lights (switching, dimming, RGB, and color temperature) via Virtual Outputs and receiving sensor data (motion, brightness, temperature, battery) via UDP inputs.
- **MQTT Support**: Parallel status reporting to MQTT brokers, making it compatible with Home Assistant, ioBroker, and other automation platforms.
- **Stability Mechanisms**: Includes an integrated watchdog to monitor connections and an intelligent command queue to prevent Hue Bridge overload (Error 429).

## Technical Implementation

loxHueBridge is developed using Node.js 24+, leveraging the native `node:sqlite` module for efficient data handling. The architecture is designed to be lightweight and responsive, making it ideal for deployment on low-power hardware such as the Raspberry Pi, or within containerized environments like Synology or Unraid via Docker.

The communication with Loxone is handled through UDP for inputs (sensors) and HTTP for outputs (lights). The bridge also supports advanced Hue features like the Tap Dial Switch, mapping buttons and rotary dial events (clockwise/counter-clockwise) directly to Loxone inputs.

## Getting Started

The recommended installation method is via Docker, which simplifies dependency management and deployment. A typical `docker-compose.yml` sets up the container with host networking to ensure seamless UDP communication with the Loxone Miniserver.

```yaml
services:
  loxhuebridge:
    image: ghcr.io/bausi2k/loxhuebridge:latest
    container_name: loxhuebridge
    restart: always
    network_mode: "host"
    environment:
      - TZ=Europe/Vienna
    volumes:
      - ./data:/app/data
```

Once running, users can access a web dashboard at port 8555 to perform the initial setup, including Hue Bridge pairing and Loxone configuration. The dashboard also provides a "Smart Import" feature, allowing users to export XML templates that can be directly imported into Loxone Config to automatically create the necessary Virtual I/O peripherals.
