---
title: Mongoose OS & AWS IoT UART and Thing Shadow Example
summary: A Mongoose OS application for the ESP8266 that integrates with AWS IoT. It
  demonstrates reading data from UART 0 and synchronizing device metadata and pin
  states using AWS IoT Thing Shadows, with logic implemented in JavaScript (mJS).
slug: mongoose-os-aws-iot-uart-and-thing-shadow-example
codeUrl: https://github.com/bravokeyl/mos-aws
siteUrl: https://mongoose-os.com
star: 0
lastUpdated: '2017-06-12'
rtos: mongoose-os
topics:
- aws-iot
- esp8266
- iot
- mongoose-os
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- mongoose-os-environmental-sensors-application
- losant-mqtt-example-for-mongoose-os
- losant-mqtt-mongoose-os-example
- mongoose-os-programs-and-examples
- mongoose-os-button-switch-for-aws-iot
- iot-framework-for-nodemcu
---

## Overview

This project provides a practical example of integrating an ESP8266 microcontroller with AWS IoT using Mongoose OS. It specifically focuses on two primary functions: bridging UART data to the cloud and managing device state through AWS IoT Thing Shadows. 

The application is built using Mongoose OS, an IoT firmware development framework that allows developers to write logic in JavaScript (via the mJS engine) while maintaining the performance of a C-based core. This makes it an excellent choice for rapid prototyping of connected devices without the complexity of traditional C-only development.

## Key Features

The application implements several core IoT patterns essential for modern connected devices:

- **UART to Cloud Bridge**: It monitors UART 0 on the ESP8266 and forwards incoming data to AWS IoT. This is useful for connecting legacy serial sensors or industrial equipment to the cloud for remote monitoring.
- **Thing Shadow Integration**: It synchronizes device metadata and the state of two GPIO pins with the AWS IoT Thing Shadow service. This allows for remote monitoring and state management of the device's physical pins.
- **JavaScript Logic**: By utilizing the `mjs` library, the project demonstrates how to handle hardware events and cloud communication using high-level scripting, which simplifies the development of business logic.

## Technical Architecture

The project configuration is managed through the `mos.yml` file, which defines the hardware architecture (ESP8266), the required libraries, and the device configuration schema. This file acts as the manifest for the Mongoose OS build system.

### Dependencies

The project relies on a suite of Mongoose OS libraries to handle networking and hardware abstraction:
- **aws**: Provides the core AWS IoT integration and connectivity.
- **mjs**: The JavaScript engine for embedded logic.
- **rpc-mqtt** and **rpc-uart**: Enable Remote Procedure Calls over MQTT and UART respectively, allowing for interactive debugging and control.
- **rpc-service-gpio**: Allows for remote interaction with the device's pins via the MOS tool or cloud commands.

### Configuration

The `mos.yml` file includes a `config_schema` that pre-defines MQTT settings, including the AWS IoT endpoint and SSL certificate paths. It also handles WiFi credentials and debug levels, making it easy to provision the device for a specific network environment without hardcoding sensitive information into the source code.

## Getting Started

To deploy this application, users typically use the `mos` tool. The process involves flashing the firmware, configuring WiFi via the command line or UI, and running the `aws-iot-setup` command to provision the device on AWS. This command automates the creation of the IoT Thing, the attachment of policies, and the installation of the necessary certificates on the ESP8266.

Once running, the device's activity can be monitored through the AWS IoT MQTT test console by subscribing to the `mos/#` topic. This provides a real-time view of the data being sent from the UART interface and the state updates being pushed to the Thing Shadow.
