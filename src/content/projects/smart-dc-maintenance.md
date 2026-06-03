---
title: Smart-DC-Maintenance
summary: An IoT-based monitoring system for datacenters that tracks rack environmental
  conditions and worker biometric signals. Built on Contiki-NG for TI CC2650 microcontrollers,
  it utilizes a hybrid CoAP and MQTT network architecture with a Java collector and
  Grafana dashboard.
slug: smart-dc-maintenance
codeUrl: https://github.com/balditommaso/Smart-DC-Maintenance
star: 0
lastUpdated: '2022-10-07'
rtos: contiki-ng
topics:
- c
- contiki-ng
- grafana
- iot
- java
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- smartorchard
- smart-orchard
- iot-industrial-operation-and-room-condition-monitor
- bluetooth-mesh-sensor-network
- espmonitor-iot-environment-monitoring-system
- smart-heating-iot-system
---

Smart-DC-Maintenance is an integrated IoT solution designed to enhance the safety and efficiency of datacenter environments. Developed as part of the Internet of Things course at the University of Pisa, the project addresses two primary concerns: the environmental health of server racks and the physiological well-being of the technicians working among them. By leveraging a mesh network of microcontrollers, the system provides real-time telemetry and automated monitoring.

## System Architecture

The project implements a sophisticated multi-tier architecture that bridges low-power wireless sensor networks with modern web-based visualization tools. The core components include:

- **The Microcontroller Network**: Utilizing the Contiki-NG RTOS, the system deploys various nodes to monitor environmental factors like temperature, humidity, and oxygen levels. 
- **Hybrid Communication**: The system uses a dual-protocol approach. Environmental sensors operate within a CoAP (Constrained Application Protocol) network, while biometric signals and status updates are handled via MQTT. 
- **RPL Border Router**: To enable connectivity between the 6LoWPAN mesh network and the internet, the project includes an RPL (Routing Protocol for Low-Power and Lossy Networks) border router.
- **Java Collector**: A central Java application acts as the master node, coordinating data flow between the microcontroller network and the database.
- **Visualization**: A Grafana-based dashboard provides a professional interface for monitoring telemetry signals in real-time.

## Technical Implementation

The firmware is designed to run on the Texas Instruments CC2650 Launchpad (cc26x0-cc13x0 target). The project structure is modular, with dedicated directories for the CoAP network, MQTT network, and the border router. 

One of the interesting aspects of this project is the use of different communication patterns for different data types. CoAP is used for the resource-constrained sensor nodes (temperature, humidity, oxygen), while MQTT is utilized for biometric tracking, likely to take advantage of its pub/sub model for event-driven health alerts.

## Hardware and Deployment

The project targets the CC2650 Launchpad, a popular platform for 6LoWPAN and IEEE 802.15.4 development. The repository includes a `flash.sh` script that simplifies the deployment process by automating the compilation of the border router, MQTT clients, and various CoAP servers using the Contiki-NG build system.

```bash
# Example of the build process for a CoAP temperature node
cd CoAP-network/temperature
make TARGET=cc26x0-cc13x0 BOARD=/launchpad/cc2650 coap-server
```

## Monitoring and Data Flow

Data originates at the sensor nodes, passes through the RPL Border Router, and is captured by the Java Collector. This collector manages the storage of telemetry into a database, which Grafana then queries to generate visual representations of the datacenter's status. This end-to-end pipeline demonstrates a complete IoT lifecycle from raw sensor data on a microcontroller to actionable insights on a web dashboard.
