---
title: UniPG mbed-os Samples
summary: A collection of sample projects for mbed-os demonstrating various RTOS features
  and hardware integrations. It includes examples for WiFi connectivity using ESP8266,
  Zigbee communication with XBee modules, and core RTOS concepts like Threads and
  EventQueues.
slug: unipg-mbed-os-samples
codeUrl: https://github.com/maiorfi/lablet-unipg-2
star: 0
lastUpdated: '2018-05-21'
rtos: mbed-os
topics:
- educational
- mbed-os
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- mbed-os-unipg-samples-1
- mongoose-os-samples-for-esp32
- esp32-freertos-examples
- chibios-rt-examples-for-stm32f401re-nucleo
- mongoose-os-programs-and-examples
- freertos-coremqtt-agent-demos
---

## Overview

The UniPG mbed-os Samples repository provides a practical set of examples for developers working with the mbed-os ecosystem. Designed as a learning resource for embedded systems programming, the project demonstrates how to leverage the Real-Time Operating System (RTOS) capabilities of mbed-os alongside various communication modules and sensors.

## Key Features and Samples

The repository is organized into specific branches, each focusing on a different aspect of embedded development. This structure allows users to explore isolated features without the complexity of a monolithic application.

### RTOS Fundamentals
One of the core components of the project is the demonstration of RTOS primitives. The samples show how to effectively use:
- **Threads**: Managing concurrent execution paths.
- **EventQueue**: Handling events in a thread-safe manner, which is essential for responsive embedded applications.
- **Timers and InterruptIn**: Interacting with hardware timing and external signals efficiently.

### Wireless Connectivity
The project includes practical implementations for both WiFi and Zigbee communication:
- **WiFi with ESP8266**: A sample demonstrating how to send and receive data over WiFi using the popular ESP8266 module. It utilizes the `easy_connect` library to simplify network configuration.
- **Zigbee with XBee**: An example of environmental monitoring where sensor data is transmitted using XBee Zigbee radio modules. This highlights the project's utility in IoT and sensor network prototyping.

## Technical Implementation

The project is built on mbed-os, a platform specifically designed for ARM Cortex-M microcontrollers. The repository includes a `.mbedignore` file that optimizes the build process by excluding unused features such as BLE, LoRaWAN, and various filesystem components, ensuring a leaner binary for the targeted samples.

Dependency management is handled via the `mbed-os.lib` file, which tracks the specific version of the mbed-os framework required for compatibility. This ensures that the samples remain functional even as the underlying framework evolves.

## Getting Started

To use these samples, developers typically clone the repository and switch to the branch corresponding to the feature they wish to explore. Running the `mbed update` command within the project directory synchronizes the necessary libraries and the mbed-os core. The project is compatible with standard mbed development workflows, including the use of the mbed CLI and VS Code for debugging and deployment.
