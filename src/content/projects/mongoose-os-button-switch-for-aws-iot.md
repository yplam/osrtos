---
title: Mongoose OS Button Switch for AWS IoT
summary: A Mongoose OS application designed for the NodeMCU (ESP8266) that publishes
  MQTT messages to AWS IoT when the flash button is pressed. It features a configurable
  pin layout and secure certificate management for cloud connectivity.
slug: mongoose-os-button-switch-for-aws-iot
codeUrl: https://github.com/kriansa/mongoose-button-switch
siteUrl: https://mongoose-os.com
star: 0
lastUpdated: '2018-03-27'
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
- losant-mqtt-example-for-mongoose-os
- losant-mqtt-mongoose-os-example
- iot-framework-for-nodemcu
- mongoose-os-aws-iot-uart-and-thing-shadow-example
- mqtt-wake-on-lan-for-esp8266
- mongoose-os-configurable-sensor-node
---

The Mongoose OS Button Switch project is a streamlined implementation of an IoT edge device using the ESP8266 platform. Specifically targeting the NodeMCU board, this application demonstrates how to bridge physical inputs—like the onboard flash button—to cloud-based services via the MQTT protocol.

At its core, the project leverages Mongoose OS, an open-source operating system specifically designed for the Internet of Things. By utilizing the built-in MQTT and WiFi libraries of the Mongoose ecosystem, the application establishes a secure connection to AWS IoT, allowing real-time state changes to be published to the cloud.

## Hardware and Pin Configuration

The application is pre-configured to work with the standard NodeMCU layout. It monitors GPIO 0, which is typically tied to the "Flash" button on these boards. Additionally, it defines a pin for an LED (GPIO 2), providing a visual feedback mechanism. These settings are not hardcoded but are defined within the `mos.yml` configuration schema, allowing them to be overridden or modified remotely without requiring a full firmware re-flash.

## Cloud Integration with AWS IoT

Security is a primary focus for this project. It is designed to work with AWS IoT certificates, which are stored securely within the device's internal filesystem (`fs` folder). The configuration management system uses a layered approach, where settings are defined in JSON files (like `conf2.json` and `conf3.json`), ensuring that sensitive credentials and device-specific configurations are handled appropriately during the deployment process.

## Technical Architecture

The project structure follows the standard Mongoose OS layout:

- **src/**: Contains the C source code for the application logic.
- **fs/**: Holds the device filesystem, including configuration files and security certificates.
- **mos.yml**: The manifest file that defines the project version, dependencies, and custom configuration schema.

By using the `mos` toolchain, developers can build the firmware and deploy it to the ESP8266 over a serial connection. The integration of the RPC (Remote Procedure Call) services for configuration and filesystem management allows for robust debugging and remote management once the device is deployed.

## Key Features

- **Event-Driven Input**: Monitors GPIO state changes to trigger MQTT publications.
- **Secure Communication**: Built-in support for TLS/SSL via the Mongoose OS CA bundle.
- **Flexible Configuration**: Uses the Mongoose OS configuration database for easy adjustments to pin assignments and server settings.
- **Cloud-Ready**: Specifically tailored for AWS IoT Core integration.

This project serves as an excellent starting point for developers looking to understand the workflow of Mongoose OS and how to implement secure, cloud-connected button triggers for IoT applications.
