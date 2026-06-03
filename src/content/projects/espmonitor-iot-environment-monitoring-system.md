---
title: ESPMonitor - IoT Environment Monitoring System
summary: A comprehensive IoT environment monitoring solution built for ESP32 and ESP8266
  microcontrollers. It provides real-time tracking of temperature, humidity, and water
  levels, featuring a Flask-based backend with SQLite storage and a responsive web
  dashboard for data visualization and remote threshold management.
slug: espmonitor-iot-environment-monitoring-system
codeUrl: https://github.com/JasonRobertDestiny/ESPMonitor
star: 11
lastUpdated: '2025-11-04'
rtos: freertos
libraries:
- sqlite
topics:
- arduino
- dht11
- dht22
- environmental-monitoring
- esp32
- flask
- iot
- realtime-monitoring
- rest-api
- sensors
- sqlite
- web-dashboard
isShow: false
createdAt: '2026-01-17'
updatedAt: '2026-01-17'
relatedProjects:
- espmonitor-iot-environmental-monitoring-system
- iot-industrial-operation-and-room-condition-monitor
- iot-project-on-hvac
- smart-farming-iot-system
- iot-agricultural-data-monitoring-system
- air-quality-monitor
---

ESPMonitor is a versatile, full-stack IoT framework designed for real-time environmental surveillance. By bridging the gap between low-power microcontrollers and modern web technologies, it offers a robust platform for monitoring temperature, humidity, and water levels in various settings, from home automation to industrial greenhouses.

The system architecture is divided into three distinct layers: the edge devices (ESP32 or ESP8266), a central Flask server, and a browser-based monitoring dashboard. This decoupled design ensures that the system is both scalable and easy to maintain.

### Hardware Integration and Firmware

At the edge, the project supports both the powerful ESP32 and the cost-effective ESP8266. The firmware, written in C++ using the Arduino framework, handles sensor data acquisition from DHT11/22 sensors and analog water level probes. A key feature of the firmware is its local intelligence; it doesn't just send data but also monitors thresholds locally to trigger immediate hardware alerts via an onboard LED.

The firmware implements a dual-interval communication strategy:
- **Data Uplink**: Sensor readings are POSTed to the server every 5 seconds using JSON formatting.
- **Configuration Downlink**: The device polls the server every 10 seconds to fetch updated threshold values, allowing for remote control without reflashing the firmware.

### Backend and Data Management

The server-side is powered by Python and Flask, providing a RESTful API for the edge devices. Data is persisted in a SQLite database, which is automatically initialized upon the first run. This backend manages real-time data ingestion, historical data storage for trend analysis, and 24-hour statistical calculations including minimum, maximum, and average values.

### Web Dashboard

The user interface is a responsive web application built with vanilla JavaScript and CSS. It provides a real-time view of the environment through interactive cards that change color and pulse when thresholds are exceeded. Users can view historical logs, check 24-hour statistics, and update sensor thresholds directly from the browser. The dashboard is designed to be mobile-friendly, allowing for monitoring on the go.

### Getting Started

Setting up ESPMonitor involves configuring the `config.h` file with WiFi credentials and the server's IP address. Once the firmware is uploaded via the Arduino IDE, the Flask server can be launched with a simple Python command. The system is designed to be "plug-and-play" within a local network; the ESP32 automatically connects to WiFi and begins its data transmission cycle as soon as it is powered on.

For developers looking to extend the system, the modular codebase allows for easy addition of new sensors, such as light or air quality sensors, or integration with external notification services like email or mobile push alerts. The project also includes detailed guides for deploying to cloud platforms like Railway for remote access outside of a local network.
