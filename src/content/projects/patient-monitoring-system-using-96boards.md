---
title: Patient Monitoring System using 96Boards
summary: A comprehensive patient monitoring system leveraging BLE Mesh networking
  on 96Boards hardware. It utilizes the Zephyr RTOS on Carbon nodes to collect temperature
  and CO2 data, which is then transmitted via a Dragonboard410c gateway to ThingSpeak
  for visualization and Twilio for emergency alerts.
slug: patient-monitoring-system-using-96boards
codeUrl: https://github.com/96boards-projects/patient_monitoring
star: 4
lastUpdated: '2018-01-26'
rtos: zephyr
topics:
- 96boards
- bluetooth-mesh
- iot
- zephyr
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- bluetooth-mesh-sensor-network
- apache-mynewt-sensor-network-for-stm32-blue-pill
- espmonitor-iot-environmental-monitoring-system
- smart-dc-maintenance
- mqtt-demo-for-stm32-iot-discovery-board-with-thingsboard
- espmonitor-iot-environment-monitoring-system
---

## Overview

The Patient Monitoring System is an end-to-end IoT solution designed to monitor health metrics in real-time using a Bluetooth Low Energy (BLE) Mesh network. Built on the 96Boards ecosystem, the project demonstrates how to collect environmental and health data from multiple sensor nodes and aggregate it through a central gateway for cloud visualization and emergency alerting.

The system architecture is divided into three primary layers: the sensor nodes (Server nodes), the aggregator (Client node), and the cloud-connected gateway. By utilizing BLE Mesh, the system can cover larger areas than traditional point-to-point Bluetooth connections, making it ideal for hospital or home care environments.

## Technical Architecture

The project utilizes a sophisticated hardware and software stack to ensure reliable data delivery and processing:

### Sensor Nodes (BLE Mesh Servers)
Each sensor node is built on the **96Boards Carbon** board. These boards run the **Zephyr RTOS** and are equipped with TMP112 temperature sensors and CCS811 air quality sensors. The Carbon board features a dual-chip architecture: an STM32 handles the application logic and sensor interfacing, while an nRF51 co-processor manages the BLE radio. Communication between these chips is handled via the HCI SPI interface.

### Aggregator (BLE Mesh Client)
Another 96Boards Carbon board acts as the Mesh Client. It collects data from all provisioned server nodes in the network. This node serves as the bridge between the mesh network and the gateway, outputting aggregated data over a serial interface.

### Gateway and Cloud Integration
A **Dragonboard410c** acts as the system gateway. Running a Linux distribution (Debian), it executes a Python script that reads serial data from the Mesh Client and uploads it to **ThingSpeak**. ThingSpeak provides a real-time dashboard with Google Gauge visualizations for temperature and CO2 levels. Additionally, the system integrates with **Twilio** to send SMS alerts if a patient presses an emergency button connected to a sensor node.

## Key Features

- **Scalable BLE Mesh Networking**: Supports multiple sensor nodes with standardized provisioning and configuration.
- **Real-time Health Monitoring**: Tracks ambient temperature and CO2 concentration.
- **Emergency Alerting**: Integrated physical push-button for immediate SMS notifications via Twilio.
- **Cloud Dashboard**: Visual data representation using ThingSpeak and Google Gauge plugins.
- **Zephyr RTOS Integration**: Leverages Zephyr's robust Bluetooth mesh stack for reliable industrial-grade communication.

## Software Implementation

The firmware for the Carbon boards is developed using the Zephyr RTOS. The build process involves flashing the nRF51 co-processor with an `hci_spi` image and the STM32 with the specific Mesh Server or Client application.

```shell
# Example: Building the Sensor Server for 96b_carbon
$ cd zephyr/samples/bluetooth/ble_mesh_srv
$ mkdir build && cd build
$ cmake -DBOARD=96b_carbon ..
$ make
```

Provisioning is handled via the `meshctl` utility from the BlueZ stack, allowing for secure network configuration, AppKey binding, and model subscription/publication settings. This ensures that only authorized nodes can participate in the patient data stream.

## Hardware Requirements

- **Dragonboard410c**: The central gateway for cloud connectivity.
- **96Boards Carbon**: Used for both Mesh Server and Client nodes.
- **TMP112 & CCS811**: High-accuracy temperature and gas sensors.
- **Push Button**: For emergency trigger functionality.

This project serves as a robust reference for developers looking to implement mesh-based sensor networks in healthcare or industrial IoT scenarios using open hardware standards.
