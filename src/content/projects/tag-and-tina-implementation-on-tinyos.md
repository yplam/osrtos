---
title: TAG and Tina Implementation on TinyOS
summary: An implementation of the TAG and Tina routing algorithms for Wireless Sensor
  Networks using TinyOS. It facilitates the creation and maintenance of routing trees
  among sensor motes to perform efficient data aggregation tasks such as SUM, MAX,
  MIN, and AVG.
slug: tag-and-tina-implementation-on-tinyos
codeUrl: https://github.com/parisgiakoum/TAG-and-Tina-implementation-on-tinyOS---Wireless-Sensor-Networks
star: 2
lastUpdated: '2019-01-04'
rtos: tinyos
topics:
- nesc
- network
- pytyon
- sensors
- tag
- tina
- tinyos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- compass-multihop-framework-for-tinyos
- distributed-wavelet-transform-for-tinyos
- cse160-network-protocols-project-skeleton
- tinyos-cooja-simulator-application
- atmega128rfa1-tinyos-kth-wsn-project
- loadng-implementation-on-contiki-os
---

## Overview

Wireless Sensor Networks (WSNs) often consist of numerous tiny, battery-powered devices that must collaborate to monitor environmental conditions. Efficiently collecting data from these nodes while conserving energy is a primary challenge. This project implements two significant data aggregation protocols—TAG (Tiny Aggregation) and Tina (Temporal Integrity Aggregation)—on the TinyOS platform. 

The application creates and maintains a routing tree between wireless sensor motes, allowing for hierarchical data collection. By performing aggregation within the network, the system reduces the number of transmissions required, significantly extending the operational life of the sensor nodes.

## Key Features

The implementation provides a robust framework for managing sensor data through several core capabilities:

- **Routing Tree Management**: Automatically establishes and maintains a parent-child hierarchy among motes to route data toward a central sink (Node 0).
- **Data Aggregation**: Supports a wide variety of aggregation functions, including SUM, MAX, MIN, COUNT, AVG (Average), and VAR (Variance).
- **Tina Protocol Support**: Implements the Tina extension, which uses a temporal coherency threshold (tct) to suppress transmissions if the sensor value has not changed significantly since the last report.
- **Multi-Query Support**: Capable of handling extended TAG modes with multiple simultaneous queries.
- **Simulation Ready**: Includes comprehensive support for TOSSIM, the TinyOS simulator, allowing for large-scale network testing before physical deployment.

## Technical Implementation

The project is written in NesC, the component-based programming language used by TinyOS. The architecture is centered around the `SRTreeC` module, which handles the logic for routing message propagation and measurement collection. 

### Core Components

- **SRTreeC.nc**: The main implementation file that manages the state machine for the routing tree. It handles timer-driven events for sending routing updates and collecting measurements from child nodes.
- **SimpleRoutingTree.h**: Defines the packet structures and constants used across the network, including the `Routing4field` and `ChildInfo` structures.
- **PacketQueue**: A custom queue implementation (`PacketQueueC.nc`) is used to manage incoming and outgoing messages, ensuring that the system remains responsive even during high network activity.

### Communication Flow

Nodes initialize by finding a parent through broadcasted routing messages. Once a parent is assigned, nodes calculate their depth in the tree. Periodically, nodes sample their sensors and aggregate their own data with values received from their children. This aggregated result is then passed up the tree. In Tina mode, the node compares the current aggregate with the previously sent value; if the difference is within the `tct` percentage, the transmission is skipped to save power.

## Simulation and Testing

For developers without access to physical hardware like Iris or MicaZ motes, the repository includes a suite of simulation tools. Using TOSSIM and Python-based scripts (`mySimulation.py`, `findTopology.py`), users can define network topologies and observe the behavior of the routing tree in a controlled environment. The project also supports serial communication for real-time debugging on physical motes using the `SERIAL_EN` and `PRINTFDBG_MODE` flags.
