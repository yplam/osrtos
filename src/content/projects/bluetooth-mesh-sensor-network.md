---
title: Bluetooth Mesh Sensor Network
summary: A comprehensive IoT system for monitoring environmental data using a Bluetooth
  Mesh network of Nordic Thingy:52 devices running Zephyr RTOS. It features a Raspberry
  Pi gateway that bridges Bluetooth Mesh traffic to a ThingsBoard dashboard via secure
  MQTT, providing real-time visualization and remote control.
codeUrl: https://github.com/lucamoroz/Bluetooth-Mesh-Sensor-Network
siteUrl: https://iot.wussler.it/
isShow: false
rtos: zephyr
libraries: []
topics:
- bluetooth-mesh
- platformio
- raspberry-pi-3
- thingy52
- zephyr
- zephyr-rtos
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- patient-monitoring-system-using-96boards
- apache-mynewt-sensor-network-for-stm32-blue-pill
- home-smart-mesh-sdk-for-thingy53
- chronothermostat-an-aws-powered-iot-climate-control-system
- swarmsense-iot-platform-with-mongoose-os
- espmonitor-iot-environmental-monitoring-system
---

The Bluetooth Mesh Sensor Network project is a sophisticated IoT implementation designed for environmental monitoring. Developed as a group project at TU Wien, it demonstrates a full-stack approach to IoT, spanning from low-power embedded firmware to cloud-based data visualization. The system is built to monitor temperature, humidity, pressure, and CO2 levels across multiple rooms while providing a secure, asynchronous, and energy-efficient communication architecture.

## System Architecture

The project is divided into three primary layers:

1.  **The Mesh Nodes (Nordic Thingy:52):** These devices serve as the physical sensors. Running the Zephyr RTOS, they form a Bluetooth Mesh network. They implement specific mesh models: the **Sensor Model** for transmitting environmental telemetry and the **Generic OnOff Model** to allow remote control of the onboard LEDs for status notifications.
2.  **The Gateway (Raspberry Pi 3):** Acting as the bridge, the Raspberry Pi runs a Node.js application that communicates with the mesh network via a GATT Proxy. It handles the decryption of Bluetooth Mesh packets using network and application keys, ensuring data privacy before forwarding the information.
3.  **The Dashboard (ThingsBoard):** A centralized management platform where users can visualize sensor data in real-time and send RPC (Remote Procedure Call) commands back through the gateway to control the mesh nodes.

## Technical Implementation

### Embedded Firmware with Zephyr
The sensor nodes utilize the Nordic Thingy:52 platform. By leveraging the Zephyr RTOS, the project implements a robust Bluetooth Mesh stack. One node typically acts as a Proxy, allowing the Raspberry Pi (which may not support the full mesh stack natively) to interact with the network via standard Bluetooth Low Energy (BLE) GATT connections.

### Secure Gateway Communication
The Raspberry Pi gateway is a critical component that manages the translation between Bluetooth Mesh and MQTT. It uses the `noble` and `bluetooth-hci-socket` libraries to interface with the Bluetooth hardware. Security is a priority; the gateway handles AES-CMAC for mesh packet verification and utilizes TLS certificates for the MQTT connection to ThingsBoard, ensuring that data is protected both in the local mesh and over the internet.

### Data Flow and Visualization
Communication is entirely asynchronous, powered by MQTT. When a sensor node publishes data to the mesh, the gateway picks it up, decrypts it, and publishes it to a specific ThingsBoard topic. Conversely, when a user toggles a switch on the dashboard, an MQTT message is sent to the gateway, which then transmits a Generic OnOff Set message into the mesh network to update the physical device state.

## Getting Started

The repository provides the necessary configuration files for all components. The `things` directory contains PlatformIO projects for the sensor and proxy nodes, while the `raspberrypi` folder includes the Node.js bridge source code. For the dashboard, exported ThingsBoard configurations and Nginx reverse-proxy settings are included to facilitate a quick setup of the monitoring environment.
