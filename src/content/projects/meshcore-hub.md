---
title: MeshCore Hub
summary: A Python-based orchestration platform for MeshCore mesh networks. It provides
  a complete stack including a serial-to-MQTT interface, data collector, REST API,
  and web dashboard for monitoring and managing LoRa-based mesh devices.
slug: meshcore-hub
codeUrl: https://github.com/ipnet-mesh/meshcore-hub
siteUrl: https://meshcore.dev/
star: 17
version: v0.5.4
lastUpdated: '2026-02-03'
rtos: ''
libraries:
- sqlite
topics:
- api
- claude-ai
- dashboard
- database
- distributed
- meshcore
- mqtt
- statistics
isShow: false
createdAt: '2026-02-04'
updatedAt: '2026-02-04'
relatedProjects:
- pymc-repeater
- bluetooth-mesh-sensor-network
- meshcore-mqtt-gateway
- smart-dc-maintenance
- crose-china-rose-lightweight-data-engine
- swarmsense-iot-platform-with-mongoose-os
---

## Overview

MeshCore Hub is a comprehensive management and orchestration platform designed for MeshCore mesh networks. Built on Python 3.13+, it serves as the central nervous system for LoRa-based mesh deployments, providing the necessary infrastructure to monitor, collect data from, and interact with remote nodes. The project is structured as a monorepo containing several decoupled components that communicate primarily through an MQTT broker, allowing for both simple local setups and large-scale distributed community deployments.

## Architecture and Components

The system is divided into four primary layers that work in tandem to bridge the gap between physical mesh hardware and user-facing applications:

*   **Interface Layer**: This component connects directly to MeshCore companion nodes via Serial or USB. It acts as a bridge, translating mesh events into MQTT messages and vice versa. It supports both 'Receiver' modes (events to MQTT) and 'Sender' modes (MQTT to device commands).
*   **Collector**: A backend service that subscribes to MQTT events and persists them to a database. It handles message storage, advertisement tracking, telemetry data, and trace paths. It also manages data retention and automatic cleanup of inactive nodes.
*   **API Service**: A FastAPI-powered REST API that allows users and external applications to query historical network data, manage node metadata (tagging), and dispatch commands back to the mesh network.
*   **Web Dashboard**: A user-friendly interface for visualizing network status, node locations, and message history, providing a real-time overview of the mesh environment.

## Key Features

MeshCore Hub is designed with flexibility and scalability in mind. It supports multi-node configurations, allowing users to connect multiple receiver nodes to increase geographic RF coverage. Data persistence is a core focus, with the system storing everything from simple text messages to complex telemetry and signal-to-noise ratio (SNR) data from trace paths.

One of the most powerful features is the **Node Tagging** system. This allows operators to attach custom metadata to nodes, such as friendly names, roles (e.g., gateway, repeater), and GPS coordinates. This data can be seeded via YAML files or managed through the administrative interface.

## Technical Implementation

The project utilizes a modern Python stack, leveraging `FastAPI` for the web and API layers, `SQLAlchemy 2.0` with `aiosqlite` for asynchronous database operations, and `paho-mqtt` for robust message brokering. The interface layer integrates with the `meshcore` Python library to communicate with hardware like the Heltec V3 or T-Beam running MeshCore companion firmware.

For deployment, the project is fully containerized. It uses Docker Compose profiles to allow users to selectively run components. For example, a community member might only run the `receiver` profile on a Raspberry Pi to contribute coverage to a central server running the `core` infrastructure.

## Getting Started

Setting up a MeshCore Hub typically involves flashing the USB Companion firmware onto a compatible ESP32-based LoRa device and connecting it to a host running the Hub software. The system supports a variety of configuration options via environment variables, including webhook integrations for forwarding advertisements or messages to external HTTP endpoints. Developers can interact with the system through the built-in Swagger UI or ReDoc documentation provided by the API service.
