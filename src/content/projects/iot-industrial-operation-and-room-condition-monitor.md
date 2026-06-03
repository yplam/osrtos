---
title: IoT Industrial Operation and Room Condition Monitor
summary: An IoT-based monitoring system using an Arduino and NodeMCU to track industrial
  parameters like temperature, humidity, gas levels, and production counts. It features
  a web-based dashboard hosted on the NodeMCU via SPIFFS and provides real-time warnings
  when sensor thresholds are exceeded.
slug: iot-industrial-operation-and-room-condition-monitor
codeUrl: https://github.com/Ariful17/IoT-project-on-industrial-operation-and-room-condition
star: 0
lastUpdated: '2022-10-19'
rtos: ''
libraries:
- spiffs
topics:
- arduino
- hvac
- industry
- iot
- nodemcu
- sensor
- spiffs
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- iot-project-on-hvac
- espmonitor-iot-environmental-monitoring-system
- espmonitor-iot-environment-monitoring-system
- conveyor-belt-fault-detection-system
- iot-agricultural-data-monitoring-system
- smart-dc-maintenance
---

## Overview

The IoT Industrial Operation and Room Condition Monitor is a dual-microcontroller system designed to provide real-time environmental and operational data for industrial settings. By combining the sensor-handling capabilities of an Arduino with the networking power of a NodeMCU (ESP8266), the project creates a robust monitoring solution that alerts users to hazardous conditions or production anomalies.

The system monitors a wide array of parameters, including temperature, humidity, atmospheric pressure, gas concentrations (LPG, CO, and smoke), electrical current, and a production counter. Data is presented through a dynamic web interface hosted directly on the NodeMCU, allowing for remote monitoring within a local network.

## System Architecture

The project utilizes a distributed architecture where tasks are split between two primary components:

1.  **Arduino (Data Collection):** The Arduino acts as the primary sensor hub. It interfaces with an MQ2 gas sensor, an ACS712 current sensor, and an IR-based counter. It processes these analog and digital signals and packages the data into a JSON format.
2.  **NodeMCU (Communication & Visualization):** The NodeMCU receives the JSON data from the Arduino via a serial connection. It also handles its own set of sensors, specifically the DHT11 for temperature/humidity and the BMP280 for pressure. Most importantly, it runs an asynchronous web server to serve a dashboard to connected clients.

## Sensor Integration and Data Handling

The project integrates several specialized sensors to provide a comprehensive view of the environment:
- **DHT11 & BMP280:** Provide environmental metrics for climate control.
- **MQ2 Gas Sensor:** Detects LPG, Carbon Monoxide, and Smoke, crucial for fire safety and air quality monitoring.
- **ACS712-30A:** Monitors the current consumption of industrial machinery.
- **IR Sensor:** Functions as a production counter to track throughput.

Data is exchanged between the microcontrollers using the `ArduinoJson` library over a `SoftwareSerial` link. This allows for structured, extensible data transmission, ensuring that the NodeMCU always has the latest readings from the Arduino's sensors.

## Web Interface and SPIFFS

A standout feature of this project is the use of the SPIFFS (Serial Peripheral Interface Flash File System) on the ESP8266. The NodeMCU hosts a standalone `webpage.html` file within its internal flash memory. When a user navigates to the device's IP address, the `ESPAsyncWebServer` serves this file.

The dashboard uses JavaScript and AJAX (XMLHttpRequest) to poll the NodeMCU for updated sensor values every second. This creates a dynamic, real-time experience without requiring a full page refresh. The interface also includes visual indicators and icons for each data point, making it easy to read at a glance.

## Automated Alerts and Logic

Beyond simple monitoring, the system includes built-in logic to trigger warnings. The NodeMCU evaluates incoming data against preset thresholds. For example:
- **Temperature:** Triggers a warning if values exceed 45°C or fall below 20°C.
- **Humidity:** Alerts the user if relative humidity goes outside the 45%-90% range.
- **Gas Safety:** Immediately flags high concentrations of LPG, CO, or smoke to act as a fire alarm system.
- **Production:** Notifies the operator if the production count exceeds a specific limit.

These warnings are sent to the web interface, providing immediate feedback to industrial operators so they can take corrective actions, such as toggling ventilation or thermal conditioning systems.
