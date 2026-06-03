---
title: Smart Moon Transportation System
summary: An intelligent wireless sensor network designed for monitoring and controlling
  regolith transport on the Moon. Built on Contiki-NG, it utilizes CoAP and MQTT protocols
  to manage sensor data while addressing extreme lunar conditions and dust hazards.
slug: smart-moon-transportation-system
codeUrl: https://github.com/terranovafr/SmartMoonTransportationSystem
star: 0
lastUpdated: '2023-07-12'
rtos: contiki-ng
topics:
- contiki-ng
- iot
- isru
- moon
- regolith
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- smart-orchard
- apache-mynewt-sensor-network-for-stm32-blue-pill
- smartorchard
- smart-dc-maintenance
- bluetooth-mesh-sensor-network
- low-power-wireless-networking-for-iot-lpiot
---

The Smart Moon Transportation System (SMTS) is a sophisticated wireless sensor network (WSN) project designed to tackle the unique challenges of lunar exploration. Specifically, it focuses on the extraction and transportation of lunar regolith—a vital resource for In-Situ Resource Utilization (ISRU) activities such as mineral processing and construction. Transporting this material on the Moon is fraught with difficulties, including extreme temperature fluctuations and hazardous lunar dust. SMTS provides a framework to monitor these conditions and control the transport process to ensure efficiency and safety.

### System Architecture

The project is built on a multi-tier architecture that integrates embedded nodes with backend data management and visualization tools. At the heart of the system is Contiki-NG, a popular open-source operating system for the Internet of Things. 

The network consists of several key components:
- **Sensor Nodes**: These are categorized into CoAP and MQTT nodes. CoAP (Constrained Application Protocol) nodes are typically used for low-power, local communication, while MQTT nodes handle data publishing to a central broker.
- **Border Router**: A Contiki-NG Border Router acts as the gateway between the 6LoWPAN wireless sensor network and the outside IPv6 network.
- **Collector**: A Java-based application that gathers data from the network and stores it in a database.
- **Persistence Layer**: A MySQL database (SMTS) stores historical sensor data, including dust levels, temperature, and regolith samples.
- **Visualization**: A Grafana dashboard provides real-time monitoring and analytics for the entire transportation system.

### Embedded Implementation and Simulation

The project targets the Texas Instruments CC2650 Launchpad, a versatile wireless microcontroller. For development and testing without physical hardware, the system is fully compatible with the Cooja simulator. The repository includes a pre-configured `.csc` simulation file that sets up a network with a Border Router, CoAP nodes, and MQTT nodes.

The simulation environment uses the Unit Disk Graph Medium (UDGM) to model radio propagation, allowing developers to test network topology and protocol behavior under various conditions. The use of `tunslip6` enables the simulation to bridge with the host machine's network, allowing the Java collector to interact with simulated nodes as if they were physical devices.

### Data Management and Protocols

SMTS leverages two primary IoT protocols to ensure robust data delivery:
- **MQTT**: Used for publishing telemetry data. The system requires a Mosquitto MQTT broker to handle messages from the sensor nodes.
- **CoAP**: Used for resource-oriented interaction with the sensors, allowing for efficient querying of sensor states.

The database schema is specifically designed to track three primary metrics essential for lunar operations:
1. **Dust**: Monitoring dust concentration to minimize hazards to mechanical parts and human health.
2. **Temperature**: Tracking the extreme thermal environment of the lunar surface to prevent equipment failure.
3. **Regolith**: Measuring the quantity of material being transported to ensure accuracy in ISRU operations.

### Getting Started

Setting up the SMTS requires a combination of embedded development tools and standard server software. After cloning the project into the Contiki-NG examples folder, users must set up the MySQL database using the provided SQL script and start the Mosquitto service. The Java collector serves as the bridge between the network and the database.

For those using physical hardware, the project provides specific `make` commands to flash the CC2650 nodes. The Border Router is connected via `tunslip6`, which creates a tunnel interface to route traffic between the PC and the WSN. Once the system is running, the Grafana dashboard can be imported to visualize the incoming data streams, providing a comprehensive view of the lunar transport operation.
