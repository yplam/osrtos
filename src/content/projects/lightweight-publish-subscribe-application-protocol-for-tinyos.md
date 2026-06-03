---
title: Lightweight Publish-Subscribe Application Protocol for TinyOS
summary: A TinyOS-based implementation of a lightweight publish-subscribe protocol
  similar to MQTT, designed for star-shaped network topologies. It features a PAN
  coordinator acting as a broker, supporting connection management, topic subscriptions,
  and data publishing with integration into Node-RED and ThingSpeak.
slug: lightweight-publish-subscribe-application-protocol-for-tinyos
codeUrl: https://github.com/giubbilo/IoT_Project
star: 0
lastUpdated: '2024-03-26'
rtos: tinyos
topics:
- internet-of-things
- tinyos
- tossim
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- mqtt-like-application-for-tinyos
- compass-multihop-framework-for-tinyos
- tinyos-social-distancing-application
- openthread-rtos
- tinyos-cooja-simulator-application
- cse160-network-protocols-project-skeleton
---

## Overview

This project implements a lightweight publish-subscribe application protocol, heavily inspired by the MQTT standard, specifically designed for resource-constrained environments using TinyOS. Developed as part of an Internet of Things course at Politecnico di Milano, the system demonstrates how to manage message brokering and sensor data distribution in a star-shaped network topology.

The architecture consists of eight client nodes connected to a single PAN (Personal Area Network) coordinator. In this setup, the PAN coordinator serves as the MQTT broker, managing connections, handling subscriptions, and routing published data to the appropriate subscribers. The system is validated through simulations using TOSSIM and integrated with modern IoT visualization tools like Node-RED and ThingSpeak.

## Protocol Features

The protocol implements several core features essential for IoT communication:

### Connection Management
Upon activation, nodes must perform a handshake with the PAN coordinator. Each node sends a `CONNECT` message and waits for a `CONNACK` reply. To ensure reliability in lossy wireless environments, the implementation includes retransmission logic for both messages. The broker is designed to ignore any messages from nodes that have not yet established a valid connection.

### Subscription Model
Once connected, nodes can subscribe to specific data topics. The project supports three primary environmental topics: **TEMPERATURE**, **HUMIDITY**, and **LUMINOSITY**. Subscriptions are handled via `SUBSCRIBE` messages containing the node ID and the requested topic (represented as integers). The broker acknowledges these requests with a `SUBACK` message, again utilizing retransmission handling to ensure the subscription state is synchronized.

### Data Publication
Nodes can publish random numerical data to their chosen topics using `PUBLISH` messages. The protocol operates at QoS level 0. When the PAN coordinator receives a publication, it identifies all nodes currently subscribed to that specific topic and forwards the message to them. 

## Technical Implementation and Tools

The project is built using **nesC**, the component-based language used by **TinyOS**. This allows for efficient memory management and event-driven execution on embedded hardware like the Micaz motes. 

For testing and validation, the project utilizes **TOSSIM**, the TinyOS simulator, which allows for the execution of the same code that would run on physical hardware. A Python-based simulation script (`RunSimulationScript.py`) manages the execution flow and logs the interactions between the nodes.

## External Integration

A key aspect of this project is its integration with the broader IoT ecosystem. The PAN coordinator is not just a local broker; it acts as a gateway to the cloud:

- **Node-RED**: Acts as the middleware that receives data from the TinyOS simulation environment.
- **ThingSpeak**: Serves as the final data visualization layer. The PAN coordinator periodically transmits received topic data to ThingSpeak via MQTT, where it is displayed on public charts for real-time monitoring of the simulated sensor network.

## Getting Started

To run the project, users need a TinyOS environment with TOSSIM installed. The workflow involves launching Node-RED to import the provided flow, compiling the nesC source code using the `make micaz sim` command, and then executing the Python simulation script. This end-to-end pipeline demonstrates the full lifecycle of IoT data from a simulated embedded sensor to a cloud-based dashboard.
