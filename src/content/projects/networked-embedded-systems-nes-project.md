---
title: Networked Embedded Systems (NES) Project
summary: A wireless sensor network project developed for the Contiki-os RTOS, targeting
  Tmote-sky hardware. It implements a system with three sensor nodes and one actuator
  node (CU) using unicast and broadcast communication via the Rime stack.
slug: networked-embedded-systems-nes-project
codeUrl: https://github.com/valeriot90/NES
star: 0
lastUpdated: '2021-12-01'
rtos: contiki-os
topics:
- c
- contiki-os
- iot-application
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- low-power-wireless-networking-for-iot-lpiot
- tinyos-cooja-simulator-application
- iot-labs-with-contiki-os
- knu-usn-automatic-ventilation-system
- motesync
- apache-mynewt-sensor-network-for-stm32-blue-pill
---

## Overview

The Networked Embedded Systems (NES) project is an academic implementation of a wireless sensor network (WSN) designed for the Contiki-os operating system. Developed for the Tmote-sky platform, the project demonstrates the integration of multiple sensor nodes with a central actuator node, utilizing both unicast and broadcast communication protocols.

## System Architecture

The network consists of four distinct nodes, each serving a specific role within the system:
- **Sensor Nodes (Node 1, Node 2, Node 3)**: These nodes act as the data sources in the network, simulating or reading environmental data.
- **Control Unit (CU)**: This node acts as the actuator or central controller, managing the data received from the sensors and potentially triggering actions based on that data.

The project utilizes the Rime communication stack, a lightweight networking stack provided by Contiki specifically designed for low-power wireless networks. By setting `CONTIKI_WITH_RIME = 1` in the build configuration, the project leverages Rime's primitives for efficient data transmission without the overhead of a full IP stack.

## Communication Patterns

The implementation employs two primary communication methods to manage data flow:
- **Unicast**: Used for point-to-point communication, typically for sending specific sensor readings from individual nodes to the Control Unit.
- **Broadcast**: Used for one-to-many communication, allowing nodes to announce their presence, synchronize, or share data across the entire network neighborhood.

## Simulation and Deployment

While designed for Tmote-sky hardware, the project is structured for simulation within the Cooja environment, the standard simulator for Contiki-os. The simulation setup requires a specific order of node addition to ensure correct address assignment within the Rime stack:
1. Node 1
2. Node 2
3. Control Unit (CU)
4. Node 3

This ordering is critical for the addressing logic used within the source code, as Contiki often assigns Rime addresses based on the node ID in the simulation environment.

## Technical Implementation

The project is written in C and follows the protothread-based programming model characteristic of Contiki-os. Each node's logic is contained within its respective source file (`Node1.c`, `Node2.c`, `Node3.c`, and `CU.c`), while the `Makefile` handles the compilation process by linking against the Contiki source tree. 

The use of the Rime stack simplifies the networking logic, allowing the developer to focus on the application-level behavior of the sensors and the actuator. The project serves as a practical example of how to structure a multi-node embedded system where different devices must coordinate their activities over a wireless medium.
