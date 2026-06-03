---
title: Room Control System
summary: An open-source IoT automation platform for real-time control and monitoring
  of electrical appliances using ESP8266 microcontrollers. The system features a Node.js
  backend with MQTT and WebSockets for low-latency communication, AI-driven voice
  control, and historical data logging via SQLite.
slug: room-control-system
codeUrl: https://github.com/lovnishverma/roomcontrol
siteUrl: https://roomcontrol.onrender.com/
star: 10
lastUpdated: '2025-07-11'
rtos: ''
libraries:
- sqlite
topics:
- expressjs
- iot
- mqtt
- nodejs
- research-project
- smarthome
isShow: false
createdAt: '2026-01-24'
updatedAt: '2026-01-24'
relatedProjects:
- smart-lighting-system-using-esp32
- esp8266-home-automation
- iot-project-on-hvac
- smart-home-automation-with-freertos-and-esp32
- hydroponicone
- chronothermostat-an-aws-powered-iot-climate-control-system
---

## Overview

The Room Control System is a next-generation, open-source IoT-based automation platform designed to control and monitor electrical appliances in real-time. Unlike traditional smart home systems that rely on proprietary clouds and apps, this solution is cost-effective, cloud-independent, and fully customizable. It empowers users with decentralized control over their smart environments, making it ideal for home automation, smart classrooms, and industrial monitoring.

Built on a modern tech stack leveraging MQTT, WebSockets, SQLite, and Express.js, the system delivers seamless automation and real-time feedback. It is specifically designed to run on low-power embedded hardware like the ESP8266 and ESP32, while the server component can be self-hosted on a Raspberry Pi, VPS, or personal server.

## Technical Architecture

The project consists of two primary components: the embedded firmware and the central control server.

### Embedded Firmware (ESP8266)

The firmware is written in C++ using the Arduino framework. It manages the hardware interface, specifically controlling a relay module for appliance switching and a buzzer for audible feedback. The ESP8266 connects to the local Wi-Fi network and communicates with the central server using the MQTT protocol. 

Key aspects of the firmware include:
- **Secure MQTT Communication**: Uses `PubSubClient` and `WiFiClientSecure` to interact with a HiveMQ Cloud broker.
- **Local Web Server**: Provides a fallback mDNS-enabled web interface for direct local control.
- **Hardware Feedback**: Implements a beep notification system for command confirmation.

### Central Control Server (Node.js)

The backend is built with Express.js and serves as the orchestration layer. It handles user authentication, command routing, and data persistence.
- **Real-Time Communication**: Uses Socket.IO (WebSockets) to provide instant status updates to the web dashboard.
- **Data Persistence**: Utilizes SQLite to log every action, timestamp, and user activity, providing a comprehensive historical audit trail.
- **Security**: Implements bcrypt for password hashing and session-based authentication to ensure only authorized users can control the hardware.

## Key Features

- **AI-Powered Voice Control**: Direct command execution via browser-based voice recognition, removing the need for external smart speakers like Alexa or Google Home.
- **MQTT-Based Messaging**: Efficient and secure messaging protocol suitable for low-bandwidth IoT applications.
- **Automated Scheduling**: Users can predefine ON/OFF times for smart appliances using server-side cron jobs.
- **Offline Support**: The system is designed to function within a local network without requiring an active internet connection if a local MQTT broker is used.
- **Historical Logging**: A dedicated interface to view past commands and device states, stored in a local SQLite database.

## Hardware Integration

The system is designed to be hardware-agnostic within the ESP8266/ESP32 ecosystem. The default configuration uses:
- **GPIO 4 (D2)**: Relay Module control.
- **GPIO 5 (D1)**: Buzzer feedback.

```cpp
// Example of the command handling logic in the ESP8266 firmware
void callback(char* topic, byte* payload, unsigned int length) {
  if (length == 1) {
    relayState = (payload[0] == '0');
    digitalWrite(relayPin, relayState ? HIGH : LOW);
    beep();
  }
}
```

## Getting Started

To deploy the system, the Node.js server must be configured with environment variables for the MQTT broker and session secrets. The ESP8266 firmware requires the Wi-Fi credentials and MQTT broker details to be flashed via the Arduino IDE. Once both components are active, the web interface provides a mobile-friendly dashboard to toggle appliances, view logs, and issue voice commands.
