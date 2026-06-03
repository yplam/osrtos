---
title: Internet of Things Home Challenges
summary: A collection of Wireless Sensor Network (WSN) and IoT challenges developed
  for the Politecnico di Milano. The project utilizes TinyOS and the nesC programming
  language to simulate communication between motes using Cooja and TOSSIM, with integrations
  for MQTT, Node-RED, and ThingSpeak.
slug: internet-of-things-home-challenges
codeUrl: https://github.com/TheFalco/IoT_Challenges
star: 1
lastUpdated: '2020-07-18'
rtos: tinyos
topics:
- challanges
- cooja-simulator
- iot
- motes
- mqtt
- nodered
- polimi
- tinyos
- tossim
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- iot-labs-with-contiki-os
- home-automation-simulation-using-contiki-os
- homeiot-smart-home-automation-system
- cooja-using-contiki
- mtds-projects-iot-and-distributed-systems
- tinyos-nesc-telosb-programs
---

## Overview

The Internet of Things Home Challenges repository is a collection of educational projects developed as part of the "Internet of Things" course at Politecnico di Milano. These challenges focus on the practical implementation of Wireless Sensor Networks (WSN) and IoT architectures, utilizing the TinyOS operating system and the nesC programming language.

The project demonstrates various aspects of embedded networking, from low-level mote-to-mote radio communication to high-level cloud integration using MQTT and Node-RED. By leveraging simulation environments like Cooja and TOSSIM, the challenges provide a robust framework for testing embedded logic without requiring physical hardware for every iteration.

## Technical Implementation and Structure

The repository is organized into specific challenges, each targeting a different layer of IoT development:

### Wireless Sensor Network Simulations

The first two challenges focus on the foundational aspects of WSNs. Using the **Cooja** simulation environment, the project implements a network of three TinyOS (sky) motes. These motes are programmed in **nesC**, a component-based, event-driven programming language designed specifically for the TinyOS platform. The simulation focuses on radio communication protocols and the interaction between nodes in a constrained environment.

In the second challenge, the focus shifts to **TOSSIM**, a discrete event simulator for TinyOS networks. This simulation models the behavior of two motes communicating with each other, providing a high-fidelity look at how TinyOS code executes on actual hardware platforms.

### Cloud Integration and Data Forwarding

The fifth challenge represents a more complex IoT pipeline. It simulates three TinyOS motes where specific nodes (Motes 2 and 3) generate random sensor data and transmit it to a central sink (Mote 1). The sink node acts as a gateway, forwarding the received data to **Node-RED**.

This challenge highlights the integration of embedded systems with modern IoT middleware. The data flow includes:
- **Data Generation**: Random values produced by simulated TinyOS motes.
- **Gateway Processing**: Mote 1 receives and "forwards" data to an external processing engine.
- **Logic and Routing**: Node-RED processes the incoming stream.
- **Cloud Visualization**: Values below a specific threshold (70) are published to **ThingSpeak** via the **MQTT** protocol for visualization and logging.

## Development Environment

The project relies on the TinyOS ecosystem, which is a standard for research and education in wireless sensor networks. By using nesC, the challenges emphasize the use of asynchronous events and tasks, which are critical for power-efficient embedded development. The inclusion of simulation configurations for Cooja and TOSSIM makes this repository a valuable reference for students and developers looking to understand the lifecycle of an IoT packet from a simulated radio interface to a cloud-based dashboard.
