---
title: IoT Project on HVAC
summary: An ESP8266-based HVAC control system that monitors temperature, humidity,
  and atmospheric pressure. It features a real-time web dashboard using SPIFFS and
  asynchronous web serving, with automated relay control to maintain environmental
  parameters within defined thresholds.
slug: iot-project-on-hvac
codeUrl: https://github.com/Ariful17/IoT-Project-on-HVAC
star: 0
lastUpdated: '2023-10-02'
rtos: ''
libraries:
- spiffs
topics:
- bmp280
- dht11
- esp8266
- hvac-control
- iot
- spiffs
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- iot-industrial-operation-and-room-condition-monitor
- espmonitor-iot-environmental-monitoring-system
- espmonitor-iot-environment-monitoring-system
- chronothermostat-an-aws-powered-iot-climate-control-system
- esp8266-dht22-spiffs-web-server
- temperature-controlled-ventilation-system-for-indoor-environments
---

## Overview

This project implements an automated Heating, Ventilation, and Air-Conditioning (HVAC) monitoring and control system designed for closed environments. Built on the ESP8266 platform, the system tracks three critical environmental parameters: temperature, relative humidity, and atmospheric pressure. By utilizing a combination of sensors and solid-state relays, the system can take corrective actions—such as heating, cooling, humidifying, or pressurizing—to keep the environment within user-defined safety thresholds.

## Hardware Components

The system is designed around the following hardware stack:
- **ESP8266**: The core microcontroller providing Wi-Fi connectivity and processing power.
- **DHT11**: A digital sensor for measuring temperature and relative humidity.
- **BMP280**: A precision sensor used for measuring atmospheric pressure and providing secondary temperature readings.
- **Solid State Relays**: Used to interface with high-voltage HVAC equipment for automated control.
- **Buck Module**: For efficient power regulation across the system components.

## Technical Implementation

The firmware is developed using the Arduino framework and leverages an asynchronous web server to provide a responsive user interface. A key feature of the implementation is the use of the Serial Peripheral Flash File System (SPIFFS) to store and serve the web dashboard's static assets, including HTML and CSS files.

### Real-Time Monitoring and Dashboard

The project includes a web-based dashboard that visualizes sensor data in real time using the Highcharts library. The ESP8266 serves an `index.html` file from its internal flash memory. The dashboard communicates with the hardware via several asynchronous endpoints:
- `/temperature`: Returns current Celsius readings.
- `/humidity`: Returns relative humidity percentages.
- `/pressure`: Returns atmospheric pressure in kPa.
- `/tempchng`, `/humchng`, `/pressurechng`: Provide status strings and warnings if thresholds are exceeded.

### Control Logic

The system operates on a feedback loop within the main execution block. It continuously evaluates sensor data against predefined limits:
- **Temperature**: If the temperature exceeds 26°C or falls below 20°C, the system triggers specific relay outputs (D7) to engage cooling or heating elements.
- **Humidity**: If relative humidity rises above 60% or falls below 40%, the system activates humidification or dehumidification hardware via relay D6.
- **Pressure**: If pressure deviates from the 90 kPa to 101 kPa range, the system manages pressurization via relay D5.

## Software Structure

The project is organized into a main Arduino sketch (`HVAC_project.ino`) and a web interface (`index.html`). The firmware handles the initialization of the I2C and OneWire sensors, sets up the Wi-Fi connection, and configures the SPIFFS file system. The use of `ESPAsyncWebServer` ensures that the device remains responsive even while handling multiple sensor readings and web requests simultaneously.
