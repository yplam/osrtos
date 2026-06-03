---
title: Smart Heating IoT System
summary: A complete IoT home automation system for smart heating using the Contiki-NG
  operating system and CoAP protocol. It features a sensor-actuator network integrated
  with a Java-based cloud application built on the Californium framework for remote
  monitoring and control.
slug: smart-heating-iot-system
codeUrl: https://github.com/seraogianluca/smart-heating
star: 2
lastUpdated: '2021-09-08'
rtos: contiki-ng
topics:
- californium
- contiki-ng
- iot
- smart-heating-control
- smart-home
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- homeiot-smart-home-automation-system
- smartorchard
- smart-orchard
- home-automation-simulation-using-contiki-os
- chronothermostat-an-aws-powered-iot-climate-control-system
- smart-dc-maintenance
---

## Overview

The Smart Heating project is a comprehensive IoT solution designed for home automation, specifically focusing on climate control. The system implements a full-stack architecture that bridges low-power wireless sensor networks with cloud-based management tools. By leveraging the CoAP (Constrained Application Protocol), the system allows for efficient communication between resource-constrained devices and high-level applications.

## System Architecture

The project is divided into three primary layers that work together to provide a seamless smart heating experience:

### IoT Device Layer
At the edge of the network, IoT devices act as sensors and actuators. These nodes are responsible for collecting environmental data and performing physical actions, such as adjusting heating elements. These devices are built using **Contiki-NG**, a leading open-source operating system for the Internet of Things. Contiki-NG provides the necessary network stacks and power management features required for long-term deployment in residential environments.

### Network Connectivity
Communication within the device network is managed through an RPL (Routing Protocol for Low-Power and Lossy Networks) border router. This component serves as the gateway, connecting the local 6LoWPAN mesh network to the external internet, allowing the cloud application to reach individual nodes.

### Cloud Application Layer
The system includes a cloud-resident application developed with the **Californium (Cf)** framework. This Java-based application handles device registration at bootstrap, aggregates sensor data, and provides a command-line interface (CLI) for users. Through this interface, users can monitor real-time data and send commands back to the actuators to change their status.

## Simulation and Development

To facilitate development and testing, the project is fully integrated with the Cooja simulator. The repository includes a `smart-heating.csc` configuration file that defines a simulation environment with multiple motes, including a border router and several sensor nodes. This allows developers to verify the RPL routing and CoAP interactions in a virtualized environment before deploying to physical hardware.

## Key Features

- **CoAP Integration**: Uses a RESTful approach for constrained environments, making it easy to interact with sensors as if they were web resources.
- **Automated Registration**: IoT devices automatically register with the cloud application upon startup, simplifying the commissioning process.
- **Remote Actuation**: Supports bidirectional communication, enabling not just data collection but also remote control of home heating hardware.
- **Scalable Networking**: Utilizes RPL to maintain a robust mesh network of devices.

## Getting Started

The project is designed to be run within a Contiki-NG environment. Developers can load the provided simulation file into Cooja to see the network in action. Once the simulation is running, the border router must be connected to the host network using the `connect-router-cooja` target. The Java-based cloud application can then be compiled and executed to begin interacting with the simulated motes.
