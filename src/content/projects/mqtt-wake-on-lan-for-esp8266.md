---
title: MQTT Wake-on-LAN for ESP8266
summary: An ESP8266 application that enables remote Wake-on-LAN functionality via
  MQTT. Built on Mongoose OS, it allows users to trigger magic packets for network
  devices through a secure MQTT broker like Losant.
slug: mqtt-wake-on-lan-for-esp8266
codeUrl: https://github.com/jamezrin/mosmqtt_wakeonlan
star: 3
lastUpdated: '2020-02-04'
rtos: mongoose-os
topics:
- esp8266
- esp8266mqtt
- espressif
- iot
- iot-application
- iot-platform
- losant
- mongoose-os
- mongoose-os-app
- wake-on-lan
- wakeonlan
- wol
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- losant-mqtt-example-for-mongoose-os
- electricitydisplay-mqtt-remote-control-for-esp8266-esp32
- losant-mqtt-mongoose-os-example
- coffee-bin-mqtt
- mongoose-os-button-switch-for-aws-iot
- esp8266-home-automation
---

The mosmqtt_wakeonlan project provides a streamlined solution for remotely powering on computers using the Wake-on-LAN (WoL) protocol. By leveraging the ESP8266 microcontroller and the Mongoose OS framework, this application acts as a bridge between the internet (via MQTT) and a local area network.

## Remote Power Management via MQTT

The core functionality of the project revolves around receiving commands over the MQTT protocol. This allows users to trigger a "Magic Packet"—the standard frame used to wake up sleeping or powered-down computers—from anywhere in the world. By using an MQTT broker like Losant, the system ensures that commands are delivered securely and reliably to the ESP8266 device sitting inside the target network. The project uses the Mongoose OS configuration schema to manage MQTT server settings, including SSL/TLS certificate validation for secure communication.

## Built on Mongoose OS

The project is developed using Mongoose OS, an IoT firmware development framework designed for low-power microcontrollers. This choice provides several advantages:

- **Robust Networking**: Built-in support for WiFi and MQTT with SSL/TLS capabilities.
- **Configuration Management**: A structured `mos.yml` configuration system that handles hardware peripherals and cloud connectivity.
- **Ease of Deployment**: The inclusion of a `reflash.sh` script simplifies the build and flash process, automating the configuration of WiFi credentials and MQTT tokens.
- **Extensibility**: The project supports both C and JavaScript (via the mJS engine), allowing for flexible logic implementation.

## Hardware and Environment

While specifically targeting the ESP8266 due to its cost-effectiveness and reliability, the project structure is compatible with the Mongoose OS ecosystem, potentially allowing for portability to other supported chips like the ESP32. The setup requires a Linux or Mac environment for the build tools and a micro USB cable for flashing the firmware. For local builds, Docker is supported to ensure a consistent toolchain environment.

## Getting Started

To deploy the application, users need to configure their environment variables in a `.env` file, specifying WiFi credentials and MQTT broker details. The project is designed to work seamlessly with the Losant IoT platform, though it can be adapted for other brokers. Once configured, the `mos-tool` handles the local build and flashes the binary to the device. 

For developers looking to extend the project, the repository includes a recommended VS Code configuration to enable IntelliSense for the Mongoose OS API, facilitating easier modification of the source code. The project also integrates with MDash for device management, providing a comprehensive dashboard for monitoring the status of the WoL gateway.
