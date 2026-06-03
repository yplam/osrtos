---
title: IoT Framework for NodeMCU
summary: A base IoT framework for NodeMCU (ESP8266) built on Mongoose OS and integrated
  with AWS IoT. It features a modular architecture supporting JavaScript-based application
  logic, OTA updates, and Remote Procedure Calls (RPC).
slug: iot-framework-for-nodemcu
codeUrl: https://github.com/felipeandres254/nodemcu
star: 0
version: v1.1.0
lastUpdated: '2021-02-01'
rtos: mongoose-os
libraries:
- spiffs
topics:
- esp8266
- iot
- mongoose-os
- nodemcu
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- mongoose-os
- mongoose-os-configurable-sensor-node
- esp8266-mywidget
- leilei-mongoose-os-sensing-device
- mongoose-os-button-switch-for-aws-iot
- esp8266starter
---

## Overview

This project provides a robust base IoT framework specifically designed for the NodeMCU (ESP8266) platform. By leveraging the power of Mongoose OS and AWS IoT, it offers a streamlined development environment for building connected devices. The framework is structured to handle the complexities of cloud connectivity, device management, and firmware updates, allowing developers to focus on application-specific logic.

## Technical Architecture

The framework is built upon Mongoose OS, an open-source Operating System for the Internet of Things. It utilizes the mJS engine, which allows developers to write application logic in JavaScript, significantly lowering the barrier to entry for IoT development. The project is configured via a `mos.yml` manifest, which manages dependencies, hardware configuration, and filesystem settings.

### Key Components

- **Mongoose OS Core**: Provides the underlying RTOS capabilities, including networking, filesystem management, and hardware abstraction.
- **AWS IoT Integration**: Built-in support for AWS IoT Core, enabling secure communication via MQTT and device shadow management.
- **JavaScript Runtime**: The application logic resides in the `fs` directory, with `init.js` serving as the entry point which subsequently loads `main.js`.
- **Filesystem**: Uses SPIFFS for on-device storage, with a dedicated partition for web assets and configuration files.

## Features and Capabilities

The framework includes several pre-configured libraries and scripts to accelerate development:

- **Over-The-Air (OTA) Updates**: Includes custom scripts to perform remote firmware and filesystem updates via AWS IoT.
- **Remote Procedure Calls (RPC)**: Supports executing commands on the device remotely, equivalent to running local `mos` commands.
- **Hardware Support**: Pre-configured for I2C, PWM, ADC, and SPI, with specific GPIO mappings for the NodeMCU board.
- **Web Server**: Includes an HTTP server library with a defined document root in the `/web` directory for hosting local configuration or status pages.

## Getting Started

To begin development, the project requires a Mongoose OS (mos) toolchain and a WSL environment for running the provided utility scripts. Configuration is handled primarily through the `mos.yml` file, where users can define their WiFi credentials and hardware parameters.

```yaml
config_schema:
  - ["wifi.sta.ssid", "WIFI_SSID"]
  - ["wifi.sta.pass", "WIFI_PASS"]
  - ["i2c.sda_gpio", 5]
  - ["i2c.scl_gpio", 4]
```

Once configured, the project can be built using the `mos build` command. The repository includes a `scripts` directory containing PowerShell and shell scripts for installation and OTA management, facilitating a smooth transition from local development to remote deployment.
