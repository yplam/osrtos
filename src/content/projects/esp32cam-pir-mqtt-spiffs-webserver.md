---
title: ESP32Cam PIR MQTT SPIFFS Webserver
summary: A feature-rich ESP32-Cam application that integrates PIR motion sensing,
  DS18B20 temperature monitoring, and MQTT-based control. It supports photo uploads
  to a PHP server, live video streaming, and persistent configuration storage using
  SPIFFS.
codeUrl: https://github.com/JJFourie/ESP32Cam-MQTT-SPIFFS-PIR
isShow: false
rtos: ''
libraries:
- spiffs
topics:
- esp32-cam
- mqtt
- photo-upload
- pir-sensor
- spiffs
- temperature-sensor
- video-streaming
star: 26
lastUpdated: '2021-01-17'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- esp32-cam-mjpeg-streaming-and-sd-capture
- home-assistant-security-camera-with-esp32-cam
- esp32-mjpeg-multiclient-streaming-server
- esp32-cam-micropython
- esp32-webserver-with-firebase-integration
- esp32-thermal-camera-viewer
---

The ESP32Cam PIR MQTT SPIFFS Webserver project is a comprehensive implementation of a smart security and environmental monitoring node. Originally conceived as a simple gate monitor to detect movement and trigger a garden light, it has evolved into a sophisticated IoT device capable of photo capture, video streaming, and environmental sensing.

### Core Functionality and Features
At its heart, the project utilizes an ESP32-Cam board paired with an AM312 PIR sensor. When motion is detected, the system triggers a photo capture and uploads the image to a remote PHP web server. Simultaneously, the event is broadcast via MQTT, allowing for immediate notifications or further automation in platforms like Home Assistant or Node-Red.

Beyond security, the device acts as a weather station by integrating a DS18B20 temperature sensor. It periodically publishes ambient temperature readings to MQTT topics. For real-time monitoring, the ESP32-Cam hosts a local webserver that provides a live video stream, compatible with tools like MotionEye or standard web browsers.

### Technical Architecture
One of the standout features of this project is its robust configuration management. Camera settings (such as quality, brightness, and resolution) and application settings are maintained via MQTT. To ensure these settings survive a device restart, they are stored locally in SPIFFS (Serial Peripheral Interface Flash File System) using JSON 6 format. This allows users to fine-tune the camera's performance remotely without needing to re-flash the firmware.

### Hardware and Wiring
The project is designed for the ESP32-Cam board and requires a few external components:
- **AM312 PIR Sensor**: For low-power motion detection.
- **DS18B20 Temperature Sensor**: For environmental monitoring (requires a 4K7 pull-up resistor).
- **External 5V Power Source**: Recommended for stable operation during Wi-Fi and camera activity.

**Pin Connections:**
| ESP32-Cam Pin | Description |
| --- | --- |
| GPIO 2 | DS18B20 Data Pin |
| GPIO 13 | AM312 Data Pin |
| 3.3V Out | Sensor Power |
| Gnd | Common Ground |
| 5V | Power Source (+) |

### MQTT Integration and Ecosystem
The device is designed to be a first-class citizen in a home automation ecosystem. It supports a wide array of MQTT interactions:
- **Publishing**: Movement events, periodic status updates (WiFi strength, SoC temperature, uptime), and current configuration states.
- **Subscribing**: Remote triggers for photo capture, camera setting updates, and system commands like restarts.

In a typical deployment, Node-Red can be used to pick up the uploaded photos from the PHP server and forward them to a Telegram bot, while Home Assistant provides a dashboard for viewing the live stream and historical temperature data.

### Getting Started
The project is built using the Arduino framework within the PlatformIO ecosystem. Key dependencies include `PubSubClient` for MQTT communication, `ArduinoJson` for configuration handling, and the `DallasTemperature` library for sensor readings. Users need to configure their network credentials in `NetworkSettings.h` and define their MQTT topics in `configuration.h` before deployment.
