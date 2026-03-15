---
title: ESPMonitor - IoT Environmental Monitoring System
summary: A comprehensive IoT solution for real-time environmental monitoring using
  ESP32 or ESP8266 microcontrollers. It tracks temperature, humidity, and water levels,
  transmitting data via HTTP to a Flask-based server with SQLite storage and a responsive
  web dashboard. Features include remote threshold management and local LED alerts.
slug: espmonitor-iot-environmental-monitoring-system
codeUrl: https://github.com/calderbuild/ESPMonitor
star: 11
lastUpdated: '2025-11-04'
rtos: ''
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
createdAt: '2026-03-15'
updatedAt: '2026-03-15'
---

## Overview

ESPMonitor is a complete, end-to-end IoT solution designed for real-time environmental monitoring. Built to support both ESP32 and ESP8266 microcontrollers, the system provides a robust framework for collecting sensor data and visualizing it through a modern web interface. The project bridges the gap between embedded hardware and web-based data management, offering features like historical data logging, statistical analysis, and remote device configuration.

## System Architecture

The system follows a classic IoT architecture consisting of three primary layers:

1.  **The Edge Layer (ESP32/ESP8266):** Microcontrollers act as the data collectors. They interface with DHT11/DHT22 sensors for temperature and humidity, and analog sensors for water level monitoring. The firmware is written in C++ using the Arduino framework, handling WiFi connectivity, sensor sampling, and HTTP communication.
2.  **The Server Layer (Flask):** A Python-based Flask server serves as the central hub. It provides a RESTful API to receive data from the edge devices, manages a SQLite database for persistent storage, and handles threshold logic.
3.  **The Presentation Layer (Web Dashboard):** A responsive web interface built with HTML5, CSS3, and Vanilla JavaScript. It polls the server for real-time updates, displays historical trends, and allows users to update device thresholds remotely.

## Key Features and Capabilities

ESPMonitor is designed with both functionality and reliability in mind. Key capabilities include:

- **Dual-Board Support:** Optimized for both the high-performance ESP32 and the cost-effective ESP8266.
- **Real-Time Monitoring:** Data is sampled and transmitted every 5 seconds, ensuring the dashboard reflects current environmental conditions.
- **Remote Threshold Control:** Users can adjust temperature, humidity, and water level thresholds via the web UI. The embedded devices poll for these updates every 10 seconds and apply them locally.
- **Local and Remote Alerts:** When a threshold is exceeded, the ESP device triggers a local LED alarm, while the web dashboard provides visual warnings by flashing the corresponding data cards.
- **Data Persistence:** All sensor readings are stored in a SQLite database, enabling 24-hour statistical analysis (min/max/average) and historical record browsing.

## Technical Implementation

The firmware utilizes the `ArduinoJson` library for structured data exchange and the `HTTPClient` library for robust network communication. On the server side, Flask 3.0 provides the routing for the API endpoints. The system is designed to be fault-tolerant; the ESP devices include logic to automatically reconnect to WiFi if the signal is lost, and the server-side implementation uses parameterized queries to ensure database security.

### Hardware Configuration

The project provides clear wiring guidelines for standard sensors:
- **DHT Sensors:** Connected to GPIO 4 for data.
- **Water Level Sensor:** Connected to GPIO 34 (ADC) on ESP32 or A0 on ESP8266.
- **Alert LED:** Utilizes the built-in LED (GPIO 2) for immediate feedback.

### API Endpoints

The Flask backend exposes several RESTful endpoints for system integration:
- `POST /api/sensor-data`: Receives JSON payloads from the microcontrollers.
- `GET /api/thresholds`: Provides current alarm settings to both the hardware and the UI.
- `GET /api/latest-data`: Returns the most recent readings for dashboard visualization.
- `GET /api/stats`: Provides calculated 24-hour metrics.

## Getting Started

Deploying ESPMonitor involves configuring the `config.h` file in the `esp32` directory with your WiFi credentials and server URL. The server can be deployed locally or on cloud platforms like Railway, as the repository includes pre-configured deployment manifests. Once the Flask server is running and the firmware is uploaded, the system automatically begins the data collection and synchronization cycle.
