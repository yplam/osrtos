---
title: 'Chronothermostat: An AWS-Powered IoT Climate Control System'
summary: A comprehensive IoT chronothermostat system utilizing ESP32 nodes and a Raspberry
  Pi 3 gateway integrated with Amazon Web Services. It features multi-room temperature
  and humidity monitoring, remote control via MQTT, and a web-based GUI for scheduling
  and statistics.
codeUrl: https://github.com/nopesir/ESP32Firmware
isShow: false
rtos: mongoose-os
libraries:
- lwip
- spiffs
- littlefs
- sqlite
topics:
- embedded-systems
- esp32
- javascript
- mjs
- mongoose-os
star: 1
lastUpdated: '2019-10-02'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- iot-project-on-hvac
- bluetooth-mesh-sensor-network
- pellet-stove-aws-iot-bridge-for-esp32
- mongoose-os-environmental-sensors-application
- smart-farming-iot-system
- smart-heating-iot-system
---

Building a modern climate control system requires more than just a simple thermostat; it demands a distributed architecture capable of handling multiple rooms, remote access, and robust data logging. The **Chronothermostat** project is a sophisticated implementation of this concept, leveraging the ESP32 microcontroller and Raspberry Pi 3 to create a seamless IoT environment powered by Amazon Web Services (AWS).

## System Architecture

The project is split into two primary hardware components: the central gateway and the distributed control units. 

- **The Gateway (Raspberry Pi 3):** Acts as the brain of the operation. It hosts a local Mosquitto MQTT broker, a Flask-based backend for system management, and an Angular7 frontend displayed on a touchscreen. It manages the bridge between the local network and the AWS IoT cloud.
- **Control Units (ESP32):** These units are placed in individual rooms. Each ESP32 is paired with a DHT22 temperature and humidity sensor and a double relay module to control cooling and heating systems. 

## Software Stack and Mongoose OS

The ESP32 firmware is built using **Mongoose OS**, an IoT development framework designed for rapid prototyping and reliable deployment. By utilizing Mongoose OS, the project benefits from built-in support for AWS IoT, RPC (Remote Procedure Call) mechanisms, and the ability to use **mJS** (embedded JavaScript) for application logic. 

The firmware is designed for resilience. It supports two primary modes: **Standard Mode**, where it connects to the home wireless LAN, and **Standalone Mode**, where the Raspberry Pi acts as an access point. If the home WiFi fails, the ESP32s are programmed to automatically switch configurations to maintain connectivity with the gateway, ensuring the user's climate settings are preserved even in extreme circumstances.

## Cloud Integration with AWS

AWS serves as the backbone for remote management and data persistence. The system utilizes several AWS services:
- **AWS IoT Core:** Provides a public TLS-encrypted broker and implements the "Device Shadow" functionality, ensuring the state of the thermostat is always synchronized.
- **AWS S3:** Hosts the external web application, allowing users to control their home from anywhere in the world.
- **AWS EC2:** Runs a secondary Mosquitto broker and a Telegram Bot for status updates.
- **AWS Firebird DB:** Used for long-term logging of temperature and humidity data.

## Key Features and User Experience

One of the standout features of this system is its ease of configuration. When a new ESP32 node is added, it enters an Access Point (AP) mode. Users can connect via a smartphone, access a lightweight internal web server at `192.168.4.1`, and submit the necessary WiFi and MQTT credentials via a simple form. 

Once configured, the GUI provides a wealth of information, including:
- Current temperature, humidity, and "perceived" temperature (calculated via a Heat Index formula).
- Weekly scheduling for automated climate control.
- Historical statistics and graphs for daily, weekly, or monthly analysis.
- Manual overrides for specific rooms.

## Technical Implementation Details

The ESP32 firmware manages sensor data through the I2C protocol and controls relays via digital output pins. To ensure system reliability, the project implements a "Last Will and Testament" (LWT) MQTT message. If an ESP32 loses its connection, the broker automatically publishes an 'offline' status, providing immediate feedback to the user interface. 

On the Raspberry Pi side, data persistence is handled through a local SQLite database for logs and a `mosquitto.db` file for retained MQTT messages, ensuring that the system state survives power cycles even without an active internet connection.
