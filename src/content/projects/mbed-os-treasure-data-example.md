---
title: Mbed OS Treasure Data Example
summary: An example application demonstrating how to transmit sensor data from Mbed
  OS to the Treasure Data cloud platform. It features integration with the mbed-simulator
  and supports SHT31 temperature/humidity sensors and C12832 LCD displays.
slug: mbed-os-treasure-data-example
codeUrl: https://github.com/takuti/mbed-os-example-treasure-data
star: 0
lastUpdated: '2018-10-31'
rtos: mbed-os
topics:
- iot
- mbed-os
- treasuredata
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- mqtt-demo-for-stm32-iot-discovery-board-with-thingsboard
- mbed-to-ibm-watson-iot-platform
- mongoose-os-environmental-sensors-application
- mbed-to-aws-iot-example
- mbed-to-azure-iot-hub
- mongoose-os-environment-logger
---

## Overview

This project provides a practical example of connecting Mbed OS-based IoT devices to Treasure Data, a powerful enterprise data management platform. By bridging the gap between embedded hardware and cloud-based data analytics, this example allows developers to stream real-time sensor readings directly into a managed database for long-term storage and analysis.

The project is specifically designed to work with the `mbed-simulator`, enabling developers to test their cloud connectivity and data ingestion logic in a web browser before deploying to physical hardware. This approach significantly reduces the development cycle for IoT applications by providing a virtualized environment for debugging network interactions.

## Key Features and Hardware Support

The application is configured to interact with specific hardware components, either physically or through simulation. The `simconfig.json` defines the following peripherals:

- **SHT31 Sensor**: A digital temperature and humidity sensor connected via I2C.
- **C12832 LCD**: A 128x32 pixel graphics display used for local status updates and data visualization.

The core logic involves reading environmental data from the SHT31 sensor and formatting it for transmission to Treasure Data's REST API. This demonstrates a common IoT pattern: local sensing, local feedback (via LCD), and remote data logging.

## Technical Implementation

The project utilizes Mbed OS's networking capabilities to establish a connection and send HTTP requests to Treasure Data. Users must configure their specific environment by modifying the `main.cpp` file with their database credentials and API keys:

```cpp
const char *td_database = "TARGET_DATABASE_NAME";
const char *td_table = "sensor_data";
const char *td_apikey = "YOUR_API_KEY";
```

## Simulation and Development

One of the most interesting aspects of this repository is its deep integration with the `mbed-simulator`. By using `emsdk` and `mbed-cli`, the project can be compiled into WebAssembly and run inside a standard web browser. This setup includes a custom configuration for the simulator's viewer, allowing users to select the "Treasure Data" demo from a dropdown menu and observe the data flow in real-time.

This workflow is particularly useful for teams who want to verify their Treasure Data schema and API integration without needing to manage physical wiring or network hardware during the initial prototyping phase.
