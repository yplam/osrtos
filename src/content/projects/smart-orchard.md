---
title: Smart Orchard
summary: An IoT application for smart orchard monitoring and management based on the
  Contiki-NG operating system. It features a network of CoAP-enabled sensors and actuators,
  a border router for cloud connectivity, and a Java-based backend for data processing
  and control. The system is designed to be simulated in the Cooja environment, allowing
  for extensive testing of network topologies and automated irrigation logic.
slug: smart-orchard
codeUrl: https://github.com/lorepas/smart-orchard
star: 0
lastUpdated: '2021-09-09'
rtos: contiki-ng
topics:
- c
- californium
- contiki-ng
- java
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- smartorchard
- smart-heating-iot-system
- homeiot-smart-home-automation-system
- smart-dc-maintenance
- home-automation-simulation-using-contiki-os
- smart-farming-iot-system
---

The Smart Orchard project represents a modern approach to precision agriculture, leveraging Internet of Things (IoT) technologies to provide farmers with real-time insights into their crops. By integrating low-power wireless sensors and actuators, the system enables automated monitoring and intervention, such as smart irrigation management.

### System Architecture

The project is built upon the Contiki-NG operating system, a leading OS for the Industrial IoT. The architecture consists of three primary layers:

1.  **The Sensor/Actuator Layer**: These are the "motes" or end-nodes deployed in the field. In this project, they are implemented as CoAP servers. Specifically, the `coap_server_sprinkler.c` component handles both environmental sensing and the control of irrigation hardware (sprinklers).
2.  **The Border Router**: This node acts as the gateway between the low-power wireless mesh network (6LoWPAN) and the traditional IP network. It facilitates communication between the field nodes and the cloud-based management application.
3.  **The Cloud/Management Layer**: A Java-based application built with Maven that communicates with the motes via the CoAP protocol. This application provides the logic for data aggregation and remote command execution.

### Communication Protocol

The system relies heavily on CoAP (Constrained Application Protocol), a specialized web transfer protocol for use with constrained nodes and networks. By using CoAP, the project ensures efficient data transfer over low-power wireless links while maintaining compatibility with RESTful web services. The Java backend acts as a CoAP client or manager, interacting with the resources exposed by the sprinkler nodes.

### Simulation and Development

A significant portion of the project is designed for simulation within the Cooja environment. Cooja allows developers to test network topologies and node behavior without requiring physical hardware. The repository includes a `simulation.csc` file, which pre-configures a network consisting of a border router and multiple sensor-actuator nodes.

To bridge the simulated network with the host machine, the project uses a serial socket connection. This allows the Java application running on the host (or in a container) to interact with the simulated motes as if they were physical devices connected via a hardware gateway.

### Getting Started

Deployment involves a multi-step process:
- **Mote Firmware**: Compiling the border router and CoAP server code for the Cooja target using the Contiki-NG toolchain.
- **Network Setup**: Running the simulation in Cooja and establishing the router connection using `make TARGET=cooja connect-router-cooja`.
- **Backend Execution**: Compiling the Java application using Maven (`mvn package`) and running the resulting JAR file to start the monitoring service.

This integrated approach provides a robust framework for developing and testing smart agriculture solutions in a virtualized environment before moving to physical hardware deployment.
