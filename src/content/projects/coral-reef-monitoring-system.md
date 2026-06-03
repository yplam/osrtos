---
title: Coral Reef Monitoring System
summary: An IoT-based environmental monitoring system designed to track ocean temperatures
  for coral reef preservation. It utilizes Contiki OS and the Cooja simulator with
  Sky-Websense motes, employing ICMPv6 for routing and HTTP for data exchange.
codeUrl: https://github.com/siddharthprakash1/Coral-Reef-Monitoring-System
isShow: false
rtos: contiki-os
libraries: []
topics:
- contiki-os
- cooja-simulator
- iot-application
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- smartorchard
- aquarium-app
- espmonitor-iot-environmental-monitoring-system
- smart-dc-maintenance
- smart-orchard
- home-automation-simulation-using-contiki-os
---

Coral reefs are among the most diverse and valuable ecosystems on Earth, but they are increasingly threatened by rising ocean temperatures. To address this, the Coral Reef Monitoring System provides a simulated IoT framework for tracking environmental health in real-time. By leveraging low-power wireless sensor networks, this project demonstrates how technology can be used to safeguard fragile marine habitats.

## Technical Overview

The system is built upon **Contiki OS**, a popular open-source operating system for the Internet of Things. Because physical deployment in underwater environments is challenging and expensive, the project utilizes the **Cooja simulator** to model the network. The simulation environment mimics the behavior of **Sky-Websense motes**, which act as the primary temperature sensors distributed across the reef.

In this architecture, a border router serves as the central server. It receives temperature data from the distributed motes, allowing for centralized analysis. The communication stack is modern and robust, utilizing **ICMPv6** for network formation and routing, ensuring that data packets find their way from the sensor nodes to the server even in complex mesh topologies.

## Key Features and Capabilities

- **Simulated Temperature Measurement**: Uses Sky-Websense motes to generate and transmit temperature data reflecting ocean conditions.
- **Wireless Communication**: Implements a functional sensor network where nodes communicate wirelessly with a central border router.
- **Protocol Integration**: Employs HTTP for data exchange and external system integration, making the data accessible to web-based platforms.
- **Traffic Analysis**: Includes support for Wireshark, allowing developers to inspect network traffic and verify the integrity of temperature data packets.

## Network Architecture

The project focuses on the intersection of networking and environmental science. By using ICMPv6, the system establishes a self-healing routing structure typical of 6LoWPAN networks. The data collected by the sensors is transmitted via HTTP, which facilitates easy integration with external monitoring websites or dashboards. The repository even includes captured network traffic in `.pcap` format, providing a baseline for analyzing how these low-power devices interact under various conditions.

## Getting Started

To explore the simulation, you will need a working environment with Contiki OS and the Cooja simulator installed. The workflow generally involves:

1.  **Cloning the Repository**: Obtain the simulation files and documentation.
2.  **Environment Setup**: Ensure the Contiki toolchain is configured.
3.  **Simulation Configuration**: Open the provided `.csc` (Cooja Simulation Configuration) file to load the network layout and node parameters.
4.  **Execution**: Build and run the simulation to observe real-time data flow between the motes and the server.

This project serves as an excellent starting point for researchers and students interested in environmental IoT, providing a tangible example of how RTOS-based sensor networks can contribute to global conservation efforts.
