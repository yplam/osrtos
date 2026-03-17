---
title: Smart Medibox
summary: An ESP32-based IoT medical assistant that manages medication schedules through
  alarms, monitors storage conditions with temperature and humidity sensors, and features
  an automated light-shielding curtain. It integrates with a Node-Red dashboard via
  MQTT and includes a web-based WiFi configuration portal.
slug: smart-medibox
codeUrl: https://github.com/chathura-de-silva/Smart-Medibox
star: 24
version: v1.3
lastUpdated: '2024-05-03'
rtos: freertos
topics:
- adafruit
- arduino
- cpp
- dht11
- embedded
- esp32
- iot
- medibox
- medicine
- medicine-alarm
- medicine-box
- medicine-reminder
- nodered
- smart
- smart-medibox
isShow: true
image: /202603/medibox.webp
createdAt: '2026-03-15'
updatedAt: '2026-03-15'
---

The Smart Medibox is an integrated IoT device designed to streamline medication management for users who require regular prescriptions. Developed for the ESP32 platform, this project combines hardware sensing, real-time feedback, and remote monitoring to ensure that medicine is taken on time and stored in optimal conditions.

At its core, the Smart Medibox serves three primary functions: time-based reminders, environmental monitoring, and automated light control. The system uses an SSD1306 OLED display to provide a user interface, allowing patients to interact with menus and view status updates directly on the device.

### Hardware and Environmental Monitoring

The project utilizes a standard ESP32 Devkit V1 as the central controller. To monitor the storage environment, it employs a DHT11 temperature and humidity sensor. If the temperature or humidity exceeds safe thresholds for the stored medication, the device triggers a visual warning on the OLED display and can notify the user via the connected dashboard. For user interaction, the Medibox includes a set of push buttons for navigating menus and confirming alarms, while a buzzer and LED provide the physical reminder signals when it is time for a dose.

### Intelligent Light Control

One of the more unique features of the Smart Medibox is its motorized curtain system, driven by an SG90 micro servo. Many medications are light-sensitive, and the Medibox addresses this by monitoring ambient light levels using two LDRs. The system calculates the necessary motor angle using a specific formula that accounts for the maximum light intensity detected and a configurable offset, ensuring the curtain provides adequate shading. Users can choose between simple linear mapping or a more accurate non-linear mapping for the LDR sensors, depending on their precision requirements.

### Connectivity and Configuration

The Smart Medibox is designed for ease of use, even when network conditions change. It features a dedicated WiFi Configuration Mode. If the device cannot connect to a saved network within ten seconds, it automatically initiates its own Wireless Access Point. Users can connect to this hotspot via a smartphone, navigate to a local IP address (typically 192.168.4.1), and enter new credentials through a web portal. This ensures the device remains connected without requiring the user to re-flash the firmware.

For remote monitoring, the project integrates with Node-Red. Using the PubSubClient library, the Medibox communicates via MQTT to send sensor data and receive configuration parameters. The provided Node-Red flow includes a dashboard for visualizing temperature, humidity, and light levels in real-time, allowing caregivers to monitor the device from anywhere.

### Software Architecture

The codebase is organized into a modular structure using PlatformIO and the Arduino framework. Global constants, function declarations, and variable initializations are separated into dedicated header files, while the main logic resides in `main.cpp`. The main loop handles three concurrent responsibilities: updating the system clock and checking for active alarms, polling for user input to navigate the menu system, and monitoring sensor data for environmental warnings. This polling-based architecture ensures the device remains responsive to both sensor changes and user interactions.
