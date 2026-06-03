---
title: Smart Farming IoT System
summary: A comprehensive end-to-end IoT solution for precision agriculture featuring
  ESP32-based environmental monitoring and automated irrigation control. The system
  integrates 4G LTE connectivity, MQTT communication via HiveMQ Cloud, and a modern
  web dashboard for real-time data visualization and remote management.
slug: smart-farming-iot-system
codeUrl: https://github.com/agungferdi/Smart_Farming
star: 32
lastUpdated: '2025-12-28'
rtos: freertos
libraries:
- u8g2
topics:
- cpp
- esp32
- hono
- mqtt
- nextjs
- postgresql
- typescript
isShow: false
createdAt: '2026-01-20'
updatedAt: '2026-01-20'
relatedProjects:
- hydroponicone
- smart-plant-monitoring-system
- iot-agricultural-data-monitoring-system
- espmonitor-iot-environment-monitoring-system
- espmonitor-iot-environmental-monitoring-system
- chronothermostat-an-aws-powered-iot-climate-control-system
---

## Overview

The Smart Farming IoT System is a sophisticated, full-stack solution designed to modernize agricultural management through real-time environmental monitoring and automated control. At its core, the project utilizes the ESP32 microcontroller to bridge the gap between physical soil conditions and cloud-based data analytics. By integrating a wide array of sensors and actuators, the system provides farmers with the tools to optimize water usage, monitor crop health, and manage irrigation remotely.

## System Architecture

The project is built on a distributed architecture that ensures reliability and low-latency communication. The hardware layer consists of ESP32 devices acting as MQTT publishers, sending sensor data to HiveMQ Cloud. A Node.js backend, built with the Hono framework and TypeScript, subscribes to these data streams and persists them in a Supabase PostgreSQL database. On the user-facing side, a Next.js 14 dashboard provides a real-time interface for monitoring and manual override commands, which are sent back to the ESP32 via MQTT.

## Hardware and Sensing Capabilities

The system is designed for remote deployment, featuring a SIM7670C 4G LTE module to provide connectivity in areas without reliable WiFi. The sensing suite is comprehensive, covering multiple environmental vectors:

- **Atmospheric Monitoring**: DHT22/DHT11 sensors for ambient temperature and humidity.
- **Soil Analysis**: Capacitive soil moisture sensors and DS18B20 waterproof probes for soil temperature profiling.
- **Weather Detection**: Rain sensors to identify precipitation events.
- **Resource Management**: Water level sensors to monitor reservoir status and prevent pump dry-running.

Local feedback is provided via an SSD1306 OLED display using the u8g2 library, allowing for quick status checks in the field without needing a mobile device.

## Automated Irrigation and Control

One of the standout features of the system is its intelligent automation logic. The ESP32 manages a 12V water pump via a relay module based on several conditions:
- **Moisture Thresholds**: Irrigation triggers automatically when soil moisture drops below a defined level.
- **Environmental Compensation**: Watering schedules can be adjusted based on soil temperature.
- **Rain Override**: The system automatically halts irrigation if rain is detected, conserving water.
- **Safety Interlocks**: The water level sensor acts as a fail-safe, disabling the pump if the water source is depleted.

## Communication and Data Flow

The project utilizes a structured MQTT topic hierarchy for efficient message routing. Sensor data is published to `sf/esp32-01/sensor` in a structured JSON format, while commands are received on `sf/devices/relay/command`. This allows for a highly responsive system where relay toggles and status updates happen in near real-time.

```cpp
// Example MQTT Topics Used by the ESP32
#define SENSOR_TOPIC "sf/esp32-01/sensor"
#define RELAY_TOPIC "sf/esp32-01/relay"
#define COMMAND_TOPIC "sf/devices/relay/command"
#define STATUS_TOPIC "sf/esp32-01/status"
```

## Getting Started

The project is organized into three main directories: `iot-devices` (PlatformIO project for ESP32), `iot-backend` (Node.js API), and `iot-dashboard` (Next.js frontend). To deploy the system, developers need to configure the `config.h` file in the ESP32 project with their WiFi and HiveMQ credentials, set up the Supabase database using the provided Prisma schemas, and deploy the web components to a platform like Vercel or Northflank. The modular nature of the code makes it easy to adapt for different agricultural needs or to scale with additional sensor nodes.
