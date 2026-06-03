---
title: MQTT-like Application for TinyOS
summary: A lightweight publish-subscribe protocol implementation for wireless sensor
  networks using TinyOS. It features a broker-based architecture supporting CONNECT,
  SUBSCRIBE, and PUBLISH operations with basic Quality of Service (QoS) levels, designed
  for resource-constrained environments.
slug: mqtt-like-application-for-tinyos
codeUrl: https://github.com/AntoineLeCalvez/MQTT-like-application
star: 4
lastUpdated: '2017-06-24'
rtos: tinyos
topics:
- iot
- iot-application
- mqtt
- mqtt-broker
- mqtt-client
- mqtt-protocol
- nesc
- tinyos
- tossim
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- lightweight-publish-subscribe-application-protocol-for-tinyos
- gocontroll-mqtt
- low-power-wireless-networking-for-iot-lpiot
- tinyos-cooja-simulator-application
- mongoose-os-button-switch-for-aws-iot
- cse160-network-protocols-project-skeleton
---

## Overview

This project implements a lightweight publish-subscribe application protocol, heavily inspired by MQTT, specifically designed for Wireless Sensor Networks (WSN). Developed as part of an Internet of Things course at Politecnico di Milano, the application leverages the TinyOS operating system to provide efficient communication between resource-constrained sensor nodes. The system is designed to handle typical IoT data such as temperature, humidity, and luminosity readings through a centralized broker architecture.

## Protocol Features

The protocol supports core MQTT-like functionalities tailored for low-power wireless environments. It defines specific message structures for several key operations:

- **CONNECT**: Allows a node to register itself with the broker.
- **SUBSCRIBE**: Enables nodes to express interest in specific sensor data topics.
- **PUBLISH**: Allows nodes to send sensor readings to the broker.
- **FORWARD**: Used by the broker to distribute published data to all subscribed nodes.

To maintain simplicity and efficiency, the protocol focuses on three primary environmental topics: Temperature, Humidity, and Luminosity. It also implements two levels of Quality of Service (QoS): `QOS_LOW` and `QOS_HIGH`, allowing for a trade-off between reliability and resource consumption.

## Technical Implementation

The system is built using nesC, the component-based programming language used by TinyOS. The core logic is encapsulated within components such as `mqttAppC` (the top-level configuration) and `mqttC` (the module implementation). 

The header file `mqtt.h` is central to the project, defining the network-transparent structures (`nx_struct`) used for communication. These structures ensure that data is correctly serialized and deserialized across different node architectures. The broker maintains the network state using internal arrays to track:
- **Connected Nodes**: A list of currently active nodes.
- **Subscriptions**: A mapping of which nodes are subscribed to which topics.
- **Message Tracking**: Last published message IDs to avoid redundant forwarding and loops.

## Simulation and Validation

Validation is performed using TOSSIM, the standard simulator for TinyOS applications. The repository includes a comprehensive Python script (`RunSimulationScript.py`) that automates the simulation process. This script performs several critical tasks:

- **Topology Configuration**: Defines the physical layout and radio gains between nodes using a `topology.txt` file.
- **Noise Modeling**: Applies realistic radio interference models using the `meyer-heavy.txt` noise trace.
- **Event Scheduling**: Boots multiple nodes at specific intervals to simulate a staggered network startup.
- **Debug Monitoring**: Captures and filters output across various channels, including radio transmission, reception, and internal protocol state changes.

## Getting Started

To build the project, a TinyOS development environment is required. The provided `Makefile` defines the main component as `mqttAppC`. Users can run the simulation by executing the Python script, which initializes the TOSSIM environment and runs the simulation events. This allows developers to observe the protocol's behavior, such as how the broker handles multiple subscriptions and how data is forwarded through the simulated radio field.
